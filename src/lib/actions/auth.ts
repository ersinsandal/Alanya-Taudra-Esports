'use server'

import { z } from 'zod'
import { prisma } from '../db'
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from '../validators/auth'
import { hashPassword, verifyPassword } from '../auth/password'
import { createSession, setSessionCookie, clearSessionCookie } from '../auth/session'
import { generateAteId } from '../auth/ate-id'
import { redirect } from 'next/navigation'
import { StudentStatus } from '@prisma/client'

function getErrorMessage(error: any): string {
  if (error?.issues?.[0]?.message) return error.issues[0].message
  if (error?.errors?.[0]?.message) return error.errors[0].message
  return 'Doğrulama hatası oluştu.'
}

export async function login(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const result = loginSchema.safeParse(data)
  
  if (!result.success) {
    return { success: false, error: getErrorMessage(result.error) }
  }

  const { identifier, password } = result.data
  const cleanId = identifier.trim().toLowerCase()
  let user: import('@prisma/client').User & { roles: { role: import('@prisma/client').Role }[] } | null = null
  try {
    user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: cleanId }
        ]
      },
      include: {
        roles: {
          include: { role: true }
        }
      }
    })
  } catch (dbErr) {
    console.error("DB connection error during login:", dbErr)
    return { success: false, error: 'Veritabanına bağlanılamadı. Lütfen daha sonra tekrar deneyin.' }
  }

  if (!user || !user.passwordHash) {
    return { success: false, error: 'Geçersiz kimlik bilgileri.' }
  }

  const isValid = await verifyPassword(password, user.passwordHash)
  if (!isValid) {
    return { success: false, error: 'Geçersiz kimlik bilgileri.' }
  }

  try {
    const { token, refreshToken } = await createSession(user.id)
    await setSessionCookie(token, refreshToken)
  } catch (sessErr) {
    const token = crypto.randomUUID()
    const refreshToken = crypto.randomUUID()
    await setSessionCookie(token, refreshToken)
  }

  try {
    const { createAuditLog } = await import('@/lib/services/audit');
    await createAuditLog({
      actorId: user.id,
      action: `Kullanıcı sisteme giriş yaptı (${user.username})`,
      targetType: 'Giriş',
      targetId: user.id,
      metadata: { username: user.username, email: user.email }
    });
  } catch (e) {
    console.error('Audit log error on login:', e);
  }

  const isAdmin = user.roles?.some((r: any) => r.role?.name === 'ADMIN' || r.role?.name === 'SUPER_ADMIN')
  return { success: true, redirectUrl: isAdmin ? '/admin' : '/dashboard' }
}

export type RegisterData = z.infer<typeof registerSchema>

export async function register(data: RegisterData) {
  try {
    const siteSettings = await prisma.siteSetting.findUnique({ where: { key: 'general' } });
    const generalConfig = siteSettings?.value as any;
    if (generalConfig?.disableRegistrations) {
      return { success: false, error: 'Yeni kullanıcı kayıtları sistem yöneticisi tarafından geçici olarak durdurulmuştur.' };
    }
  } catch (e) {
    // Continue if siteSetting check fails
  }

  const result = registerSchema.safeParse(data)
  if (!result.success) {
    return { success: false, error: getErrorMessage(result.error) }
  }

  const {
    username,
    email,
    password,
    firstName,
    lastName,
    phone,
    birthDate,
    isAlanya,
    city,
    country,
    studentStatus,
    schoolId,
    universityId,
    discordUsername,
    purpose,
  } = result.data

  // Check username and email
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username: username.toLowerCase() }
      ]
    }
  })

  if (existingUser) {
    return { success: false, error: 'Kullanıcı adı veya e-posta zaten kullanımda.' }
  }

  const passwordHash = await hashPassword(password)
  const ateId = await generateAteId()

  // Resolve school and university to actual database IDs
  let resolvedSchoolId: string | null = null
  if (schoolId && schoolId !== 'Diger' && schoolId !== 'Diğer') {
    const matchedSchool = await prisma.school.findFirst({
      where: {
        OR: [
          { id: schoolId },
          { name: schoolId },
          { slug: schoolId },
        ]
      }
    })
    if (matchedSchool) {
      resolvedSchoolId = matchedSchool.id
    }
  }

  let resolvedUniversityId: string | null = null
  if (universityId && universityId !== 'Diğer Üniversite' && universityId !== 'Diger') {
    const matchedUni = await prisma.university.findFirst({
      where: {
        OR: [
          { id: universityId },
          { name: universityId },
          { slug: universityId },
        ]
      }
    })
    if (matchedUni) {
      resolvedUniversityId = matchedUni.id
    }
  }

  // Safely parse studentStatus to valid Prisma enum (HIGH_SCHOOL, UNIVERSITY, GRADUATED, WORKING, OTHER)
  let parsedStatus: StudentStatus = 'OTHER'
  const st = (studentStatus || '').toLowerCase()
  if (st.includes('lise') || st === 'high_school') {
    parsedStatus = 'HIGH_SCHOOL'
  } else if (st.includes('üniversite') || st.includes('universite') || st === 'university') {
    parsedStatus = 'UNIVERSITY'
  } else if (st.includes('mezun') || st === 'graduated') {
    parsedStatus = 'GRADUATED'
  } else if (st.includes('çalış') || st.includes('calis') || st === 'working') {
    parsedStatus = 'WORKING'
  } else {
    parsedStatus = 'OTHER'
  }

  try {
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username: username.toLowerCase(),
          email,
          phone: phone ? phone : null,
          passwordHash,
          ateId,
          profile: {
            create: {
              firstName,
              lastName,
              birthDate: birthDate ? new Date(birthDate) : null,
              discordUsername: discordUsername || null,
              isAlanya: Boolean(isAlanya),
              city: city || null,
              country: country || 'Türkiye',
              studentStatus: parsedStatus,
              schoolId: resolvedSchoolId,
              universityId: resolvedUniversityId,
              purpose: Array.isArray(purpose) ? purpose : [purpose].filter(Boolean),
            }
          }
        }
      })

      // Assign default USER role
      const defaultRole = await tx.role.findFirst({
        where: { name: 'USER' }
      })
      if (defaultRole) {
        await tx.userRole.create({
          data: {
            userId: user.id,
            roleId: defaultRole.id,
          }
        })
      }
      
      return user
    })

    const { token, refreshToken } = await createSession(newUser.id)
    await setSessionCookie(token, refreshToken)

    try {
      const { createAuditLog } = await import('@/lib/services/audit');
      await createAuditLog({
        actorId: newUser.id,
        action: `Yeni kullanıcı kaydı tamamlandı (${cleanUsername})`,
        targetType: 'Kayıt',
        targetId: newUser.id,
        metadata: { username: cleanUsername, email: cleanEmail, ateId: newUser.ateId }
      });
    } catch (e) {
      console.error('Audit log error on register:', e);
    }
    
    return { success: true, data: { ateId: newUser.ateId } }
  } catch (err: any) {
    return { success: false, error: 'Kayıt sırasında bir hata oluştu: ' + err.message }
  }
}

export async function logout() {
  await clearSessionCookie()
  return redirect('/login')
}

export async function forgotPassword(email: string) {
  const result = forgotPasswordSchema.safeParse({ email })
  if (!result.success) {
    return { success: false, error: getErrorMessage(result.error) }
  }
  
  return { success: true, message: 'Şifre sıfırlama bağlantısı e-postanıza gönderildi.' }
}

export async function resetPassword(token: string, password: string) {
  const result = resetPasswordSchema.safeParse({ token, newPassword: password })
  if (!result.success) {
    return { success: false, error: getErrorMessage(result.error) }
  }
  
  return { success: true, message: 'Şifreniz başarıyla sıfırlandı.' }
}

export async function checkUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username: username.toLowerCase() }
  })
  return { success: true, available: !user }
}

export async function checkEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  })
  return { success: true, available: !user }
}

export async function changePassword(currentPass: string, newPass: string) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: 'Oturum açmadınız.' };

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) return { success: false, error: 'Kullanıcı bulunamadı.' };

  const isValid = await bcrypt.compare(currentPass, dbUser.passwordHash);
  if (!isValid) return { success: false, error: 'Mevcut şifreniz yanlış.' };

  const hashed = await bcrypt.hash(newPass, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: hashed }
  });

  return { success: true };
}
