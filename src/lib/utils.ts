// IMPORTANT: Ensure 'clsx' is installed as a dependency: npm install clsx
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: Date | string | number, locale: string = 'tr-TR'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeTime(date: Date | string | number): string {
  const rtf = new Intl.RelativeTimeFormat('tr', { numeric: 'auto' })
  const daysDifference = Math.round(
    (new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )
  return rtf.format(daysDifference, 'day')
}

export function slugify(text: string): string {
  const charMap: Record<string, string> = {
    'ğ': 'g', 'Ğ': 'G',
    'ü': 'u', 'Ü': 'U',
    'ş': 's', 'Ş': 'S',
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ç': 'c', 'Ç': 'C',
  }

  const normalizedText = text.replace(/[ğĞüÜşŞıİöÖçÇ]/g, (match) => charMap[match] || match)
  
  return normalizedText
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function generateQRToken(): string {
  return crypto.randomUUID()
}

export function calculateAge(birthDate: Date | string | number): number {
  const today = new Date()
  const birthDateObj = new Date(birthDate)
  let age = today.getFullYear() - birthDateObj.getFullYear()
  const m = today.getMonth() - birthDateObj.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
    age--
  }
  return age
}

export function getAgeRange(age: number): string {
  if (age < 16) return '<16'
  if (age >= 16 && age <= 18) return '16-18'
  if (age >= 19 && age <= 21) return '19-21'
  if (age >= 22 && age <= 25) return '22-25'
  return '26+'
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}
