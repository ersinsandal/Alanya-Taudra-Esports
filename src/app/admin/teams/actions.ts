'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

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

  await prisma.team.create({
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

  revalidatePath('/admin/teams');
  return { success: true };
}

export async function toggleTeamStatus(teamId: string, isOpen: boolean) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some((r: any) => ['SUPER_ADMIN', 'ADMIN'].includes(r.role.name))) {
    throw new Error('Yetkiniz yok.');
  }

  await prisma.team.update({
    where: { id: teamId },
    data: { isOpen }
  });

  revalidatePath('/admin/teams');
  revalidatePath(`/admin/teams/${teamId}`);
  return { success: true };
}

export async function updateApproverRoles(teamId: string, roles: string[]) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some((r: any) => r.role.name === 'SUPER_ADMIN')) {
    throw new Error('Sadece Süper Adminler bu ayarı değiştirebilir.');
  }

  await prisma.team.update({
    where: { id: teamId },
    data: { approverRoles: roles }
  });

  revalidatePath(`/admin/teams/${teamId}`);
  return { success: true };
}

export async function deleteTeam(teamId: string) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some((r: any) => r.role.name === 'SUPER_ADMIN')) {
    throw new Error('Sadece Süper Adminler takım silebilir.');
  }

  await prisma.team.delete({
    where: { id: teamId }
  });

  revalidatePath('/admin/teams');
  return { success: true };
}
