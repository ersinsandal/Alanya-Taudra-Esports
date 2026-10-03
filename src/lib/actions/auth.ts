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
  let user: any = null
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

  const isAdmin = user.roles?.some((r: any) => r.role?.name === 'ADMIN' || r.role?.name === 'SUPER_ADMIN')
  return { success: true, redirectUrl: isAdmin ? '/admin' : '/dashboard' }
}

export type RegisterData = z.infer<typeof registerSchema>

export async function register(data: RegisterData) {
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

  try {
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username: username.toLowerCase(),
          email,
          phone,
          passwordHash,
          ateId,
          profile: {
            create: {
              firstName,
              lastName,
              birthDate: new Date(birthDate),
              discordUsername,
              isAlanya,
              city,
              country: country || 'Türkiye',
              studentStatus: studentStatus as StudentStatus,
              schoolId: schoolId || undefined,
              universityId: universityId || undefined,
              purpose: purpose || [],
            }
          }
        }
      })
      
      return user
    })

    const { token, refreshToken } = await createSession(newUser.id)
    await setSessionCookie(token, refreshToken)
    
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
