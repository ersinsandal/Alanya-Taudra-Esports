import { describe, it, expect } from 'vitest'
import { hashPassword, verifyPassword, validatePasswordStrength } from '@/lib/auth/password'
import { loginSchema } from '@/lib/validators/auth'

describe('Auth & Password', () => {
  describe('validatePasswordStrength', () => {
    it('should reject passwords shorter than 8 characters', () => {
      const res = validatePasswordStrength('Short1!')
      expect(res.valid).toBe(false)
      expect(res.errors).toContain('Şifre en az 8 karakter uzunluğunda olmalıdır.')
    })

    it('should require uppercase, lowercase, and numbers', () => {
      expect(validatePasswordStrength('lowercaseonly123').valid).toBe(false)
      expect(validatePasswordStrength('UPPERCASEONLY123').valid).toBe(false)
      expect(validatePasswordStrength('NoNumbersHere!').valid).toBe(false)
    })

    it('should accept strong passwords', () => {
      expect(validatePasswordStrength('ATEStrongPass2025!').valid).toBe(true)
    })
  })

  describe('hashPassword and verifyPassword', () => {
    it('should hash a password and verify it successfully', async () => {
      const password = 'SuperSecretATEPassword2025!'
      const hash = await hashPassword(password)
      expect(hash).not.toBe(password)
      expect(hash.startsWith('$2')).toBe(true)

      const isMatch = await verifyPassword(password, hash)
      expect(isMatch).toBe(true)

      const isWrong = await verifyPassword('WrongPassword123!', hash)
      expect(isWrong).toBe(false)
    })
  })

  describe('loginSchema', () => {
    it('should validate valid email or username', () => {
      const validEmail = loginSchema.safeParse({ identifier: 'admin@ate.gg', password: 'password123' })
      expect(validEmail.success).toBe(true)

      const validUsername = loginSchema.safeParse({ identifier: 'ATE.Raven', password: 'password123' })
      expect(validUsername.success).toBe(true)
    })

    it('should reject missing fields', () => {
      const missingPassword = loginSchema.safeParse({ identifier: 'admin@ate.gg' })
      expect(missingPassword.success).toBe(false)
    })
  })
})
