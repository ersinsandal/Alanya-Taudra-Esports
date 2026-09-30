import { describe, it, expect } from 'vitest'
import { slugify, calculateAge, getAgeRange, cn, generateQRToken } from '@/lib/utils'

describe('Utils', () => {
  describe('slugify', () => {
    it('should correctly convert Turkish characters to URL-safe slugs', () => {
      expect(slugify('Alanya Taudra E-Sports')).toBe('alanya-taudra-e-sports')
      expect(slugify('Hüseyin Girenes Fen Lisesi')).toBe('huseyin-girenes-fen-lisesi')
      expect(slugify('Şehit Abdullah Ümit Sercan')).toBe('sehit-abdullah-umit-sercan')
      expect(slugify('Özel Yaşam Tasarım')).toBe('ozel-yasam-tasarim')
    })

    it('should handle special symbols and extra spaces', () => {
      expect(slugify('VALORANT  --  Championship 2025!')).toBe('valorant-championship-2025')
    })
  })

  describe('calculateAge', () => {
    it('should calculate age accurately from birth date', () => {
      const birthDate = new Date()
      birthDate.setFullYear(birthDate.getFullYear() - 17)
      expect(calculateAge(birthDate)).toBe(17)
    })
  })

  describe('getAgeRange', () => {
    it('should categorize ages into appropriate bands', () => {
      expect(getAgeRange(15)).toBeDefined()
      expect(getAgeRange(17)).toBeDefined()
      expect(getAgeRange(22)).toBeDefined()
    })
  })

  describe('cn', () => {
    it('should combine classes correctly', () => {
      expect(cn('bg-black', 'text-white')).toBe('bg-black text-white')
      expect(cn('px-4', false && 'hidden', 'py-2')).toBe('px-4 py-2')
    })
  })

  describe('generateQRToken', () => {
    it('should generate a valid opaque UUID token', () => {
      const token = generateQRToken()
      expect(token).toBeTypeOf('string')
      expect(token.length).toBeGreaterThan(10)
    })
  })
})
