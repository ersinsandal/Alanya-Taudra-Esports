import prisma from '@/lib/db';

export async function createAuditLog(
  actorId: string,
  action: string,
  targetType: string,
  targetId: string,
  metadata?: Record<string, unknown> | null,
  ipAddress?: string
) {
  try {
    await prisma.auditLog.create({
      data: {
        actorId,
        action,
        targetType,
        targetId,
        metadata: metadata ? (metadata as any) : undefined,
        ipAddress,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
}