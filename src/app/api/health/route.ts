import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  const checks: Record<string, string> = {}

  // Database check
  try {
    await prisma.$queryRaw`SELECT 1`
    checks.database = 'healthy'
  } catch {
    checks.database = 'unhealthy'
  }

  // Redis check (placeholder - will be connected when Redis adapter is set up)
  checks.redis = 'not_configured'

  // Overall status
  const isHealthy = checks.database === 'healthy'

  return NextResponse.json(
    {
      status: isHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      checks,
      version: '1.0.0',
    },
    { status: isHealthy ? 200 : 503 }
  )
}
