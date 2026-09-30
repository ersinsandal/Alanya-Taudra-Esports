import { prisma } from '../db'

export async function generateAteId(): Promise<string> {
  // Try to find the latest ATE ID to increment, or use a count-based approach
  // Since we might have concurrent generation, we'll try random 6-digit with fallback and retry logic
  let isUnique = false
  let ateId = ''
  
  while (!isUnique) {
    const randomNum = Math.floor(100000 + Math.random() * 900000).toString()
    ateId = `ATE-074-${randomNum}`
    
    const existing = await prisma.user.findUnique({
      where: { ateId }
    })
    
    if (!existing) {
      isUnique = true
    }
  }
  
  return ateId
}
