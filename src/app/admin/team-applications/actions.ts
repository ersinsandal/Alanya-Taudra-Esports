'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { InviteStatus } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth/session';
import { createAuditLog } from '@/lib/services/audit';

export async function updateTeamApplicationStatus(id: string, status: string) {
  try {
    const user = await getCurrentUser();
    const app = await prisma.teamApplication.update({
      where: { id },
      data: { status: status as InviteStatus },
      include: { team: true, user: true }
    });

    await createAuditLog({
      actorId: user?.id,
      action: `Takım başvurusu durumu güncellendi: ${app.user.username} -> ${app.team.name} (${status})`,
      targetType: 'Takım Başvuruları',
      targetId: id,
      metadata: { username: app.user.username, teamName: app.team.name, status }
    });

    revalidatePath('/admin/team-applications');
    revalidatePath('/admin/audit-logs');
    return { success: true };
  } catch (error) {
    console.error('Error updating team application:', error);
    return { success: false, error: 'Failed to update application.' };
  }
}
