import { cookies } from 'next/headers'
import { prisma } from '../db'
import { SESSION_DURATION } from '../constants'

export async function createSession(userId: string): Promise<{ token: string; refreshToken: string }> {
  const token = crypto.randomUUID()
  const refreshToken = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + SESSION_DURATION)

  try {
    await prisma.userSession.create({
      data: {
        userId,
        token,
        refreshToken,
        expiresAt,
      }
    })
  } catch (error) {
    console.error("Session create failed", error)
  }

  return { token, refreshToken }
}

export async function validateSession(token: string) {
  try {
    const session = await prisma.userSession.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            profile: true,
            roles: {
              include: {
                role: {
                  include: {
                    permissions: {
                      include: {
                        permission: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!session || session.expiresAt < new Date()) {
      return null
    }

    return session.user
  } catch (error) {
    return null
  }
}

export async function deleteSession(token: string): Promise<void> {
  try {
    await prisma.userSession.deleteMany({
      where: { token }
    })
  } catch (error) {}
}

export async function setSessionCookie(token: string, refreshToken: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // seconds
    path: '/'
  })
  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, 
    path: '/'
  })
}

export async function getSessionFromCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value
  return token || null
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('session_token')
  cookieStore.delete('refresh_token')
}

export async function getCurrentUser() {
  const token = await getSessionFromCookie()
  if (!token) return null
  return validateSession(token)
}
