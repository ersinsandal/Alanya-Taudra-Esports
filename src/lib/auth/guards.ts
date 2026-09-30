import { redirect } from 'next/navigation'
import { getCurrentUser } from './session'

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }
  return user
}

export async function requireRole(roleName: string) {
  const user = await requireAuth()
  const hasRole = user.roles.some((ur: any) => ur.role.name === roleName)
  if (!hasRole) {
    throw new Error(`Unauthorized: Requires ${roleName} role.`)
  }
  return user
}

export async function requirePermission(permissionName: string) {
  const user = await requireAuth()
  const can = hasPermissionObj(user, permissionName)
  if (!can) {
    throw new Error(`Unauthorized: Requires ${permissionName} permission.`)
  }
  return user
}

export async function hasPermission(userId: string, permissionName: string): Promise<boolean> {
  const { prisma } = await import('../db')
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
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
  })
  
  if (!user) return false
  return hasPermissionObj(user, permissionName)
}

function hasPermissionObj(user: any, permissionName: string): boolean {
  for (const ur of user.roles) {
    for (const rp of ur.role.permissions) {
      if (rp.permission.name === permissionName) {
        return true
      }
    }
  }
  return false
}
