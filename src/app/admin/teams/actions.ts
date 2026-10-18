'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/services/audit';

export async function createTeam(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some((r: any) => ['SUPER_ADMIN', 'ADMIN'].includes(r.role.name))) {
    throw new Error('Bu işlem için yetkiniz yok.');
  }

  const name = formData.get('name') as string;
  const gameId = formData.get('gameId') as string;
  const description = formData.get('description') as string;
  
  if (!name || !gameId) throw new Error('Takım adı ve oyun zorunludur.');

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

  const newTeam = await prisma.team.create({
    data: {
      name,
      slug,
      tag: name.substring(0, 4).toUpperCase(),
      gameId,
      description,
      isOfficial: true,
      createdById: user.id,
    }
  });

  await createAuditLog({
    actorId: user.id,
    action: `Yeni resmi takım oluşturuldu: "${name}"`,
    targetType: 'Takımlar',
    targetId: newTeam.id,
    metadata: { name, gameId, slug }
  });

  revalidatePath('/admin/teams');
  revalidatePath('/admin/audit-logs');
  return { success: true };
}

export async function toggleTeamStatus(teamId: string, isOpen: boolean) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some((r: any) => ['SUPER_ADMIN', 'ADMIN'].includes(r.role.name))) {
    throw new Error('Yetkiniz yok.');
  }

  const team = await prisma.team.update({
    where: { id: teamId },
    data: { isOpen }
  });

  await createAuditLog({
    actorId: user.id,
    action: `Takım alım durumu güncellendi: "${team.name}" -> ${isOpen ? 'Açık' : 'Kapalı'}`,
    targetType: 'Takımlar',
    targetId: teamId,
    metadata: { isOpen, teamName: team.name }
  });

  revalidatePath('/admin/teams');
  revalidatePath(`/admin/teams/${teamId}`);
  revalidatePath('/admin/audit-logs');
  return { success: true };
}

export async function updateApproverRoles(teamId: string, roles: string[]) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some((r: any) => r.role.name === 'SUPER_ADMIN')) {
    throw new Error('Sadece Süper Adminler bu ayarı değiştirebilir.');
  }

  const team = await prisma.team.update({
    where: { id: teamId },
    data: { approverRoles: roles }
  });

  await createAuditLog({
    actorId: user.id,
    action: `Takım onaylayıcı rolleri güncellendi: "${team.name}" -> [${roles.join(', ')}]`,
    targetType: 'Takımlar',
    targetId: teamId,
    metadata: { approverRoles: roles, teamName: team.name }
  });

  revalidatePath(`/admin/teams/${teamId}`);
  revalidatePath('/admin/audit-logs');
  return { success: true };
}

export async function deleteTeam(teamId: string) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some((r: any) => r.role.name === 'SUPER_ADMIN')) {
    throw new Error('Sadece Süper Adminler takım silebilir.');
  }

  const targetTeam = await prisma.team.findUnique({
    where: { id: teamId },
    select: { name: true }
  });

  await prisma.team.delete({
    where: { id: teamId }
  });

  await createAuditLog({
    actorId: user.id,
    action: `Takım silindi: "${targetTeam?.name || teamId}"`,
    targetType: 'Takımlar',
    targetId: teamId,
    metadata: { teamName: targetTeam?.name }
  });

  revalidatePath('/admin/teams');
  revalidatePath('/admin/audit-logs');
  return { success: true };
}
