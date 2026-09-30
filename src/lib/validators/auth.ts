import { z } from 'zod'
import { RESERVED_USERNAMES } from '../constants'

export const loginSchema = z.object({
  identifier: z.string().min(3, 'Geçerli bir kullanıcı adı veya e-posta girin.'),
  password: z.string().min(1, 'Şifre zorunludur.')
})

const usernameRegex = /^[a-zA-Z0-9_-]+$/

export const usernameSchema = z.string()
  .min(3, 'Kullanıcı adı en az 3 karakter olmalıdır.')
  .max(20, 'Kullanıcı adı en fazla 20 karakter olmalıdır.')
  .regex(usernameRegex, 'Sadece harf, rakam, alt çizgi ve tire kullanılabilir.')
  .refine(val => !RESERVED_USERNAMES.includes(val.toLowerCase()), {
    message: 'Bu kullanıcı adı rezerve edilmiştir.'
  })

export const registerSchema = z.object({
  // step1: location
  isAlanya: z.boolean(),
  city: z.string().optional(),
  country: z.string().optional(),
  
  // step2: userType
  studentStatus: z.string(),
  schoolId: z.string().optional(),
  universityId: z.string().optional(),
  
  // step3: personalInfo
  firstName: z.string().min(2, 'Ad en az 2 karakter olmalıdır.'),
  lastName: z.string().min(2, 'Soyad en az 2 karakter olmalıdır.'),
  username: usernameSchema,
  email: z.string().email('Geçerli bir e-posta adresi girin.'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin.'),
  birthDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Geçerli bir tarih girin.'
  }),
  discordUsername: z.string().optional(),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalıdır.'),
  
  // step4: purpose
  purpose: z.array(z.string()).min(1, 'En az bir amaç seçmelisiniz.'),
  
  // step5: gameProfiles
  gameProfiles: z.array(z.string()).optional()
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin.')
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Geçersiz token.'),
  newPassword: z.string().min(8, 'Şifre en az 8 karakter olmalıdır.')
})
