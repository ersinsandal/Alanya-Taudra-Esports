import { prisma } from '../db'

export async function generateAteId(): Promise<string> {
  let isUnique = false
  let ateId = ''
  
  const now = new Date()
  const month = (now.getMonth() + 1).toString().padStart(2, '0') // 01 to 12
  const year = now.getFullYear().toString().slice(-2) // last 2 digits of year, e.g., 26
  const prefix = `${month}${year}` // e.g., 1026
  
  while (!isUnique) {
    // Generate 5 random digits (10000 to 99999)
    const randomNum = Math.floor(10000 + Math.random() * 90000).toString()
    ateId = `ATE-${prefix}-${randomNum}`
    
    const existing = await prisma.user.findUnique({
      where: { ateId }
    })
    
    if (!existing) {
      isUnique = true
    }
  }
  
  return ateId
}
