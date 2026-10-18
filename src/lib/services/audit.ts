import { prisma } from '@/lib/db';
import { headers } from 'next/headers';

export interface AuditLogInput {
  actorId?: string | null;
  action: string;
  targetType?: string;
  targetId?: string | null;
  metadata?: Record<string, unknown> | null;
  ipAddress?: string | null;
}

export async function createAuditLog(
  paramOrActorId: AuditLogInput | string | null | undefined,
  action?: string,
  targetType?: string,
  targetId?: string | null,
  metadata?: Record<string, unknown> | null,
  ipAddress?: string | null
) {
  try {
    let resolvedActorId: string | null = null;
    let resolvedAction: string = '';
    let resolvedTargetType: string = 'Sistem';
    let resolvedTargetId: string | null = null;
    let resolvedMetadata: Record<string, unknown> | null = null;
    let resolvedIp: string | null = null;

    if (paramOrActorId && typeof paramOrActorId === 'object') {
      // Called with object argument
      resolvedActorId = paramOrActorId.actorId || null;
      resolvedAction = paramOrActorId.action;
      resolvedTargetType = paramOrActorId.targetType || 'Sistem';
      resolvedTargetId = paramOrActorId.targetId || null;
      resolvedMetadata = paramOrActorId.metadata || null;
      resolvedIp = paramOrActorId.ipAddress || null;
    } else {
      // Called with positional arguments
      resolvedActorId = paramOrActorId || null;
      resolvedAction = action || '';
      resolvedTargetType = targetType || 'Sistem';
      resolvedTargetId = targetId || null;
      resolvedMetadata = metadata || null;
      resolvedIp = ipAddress || null;
    }

    if (!resolvedIp) {
      try {
        const headerList = await headers();
        resolvedIp = headerList.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     headerList.get('x-real-ip') || 
                     '127.0.0.1';
      } catch {
        resolvedIp = '127.0.0.1';
      }
    }

    return await prisma.auditLog.create({
      data: {
        actorId: resolvedActorId,
        action: resolvedAction,
        targetType: resolvedTargetType,
        targetId: resolvedTargetId,
        metadata: resolvedMetadata ? (resolvedMetadata as any) : undefined,
        ipAddress: resolvedIp,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
}