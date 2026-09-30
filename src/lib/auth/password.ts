import bcryptjs from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash)
}

export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Şifre en az 8 karakter uzunluğunda olmalıdır.')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Şifre en az bir büyük harf içermelidir.')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Şifre en az bir küçük harf içermelidir.')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Şifre en az bir rakam içermelidir.')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
