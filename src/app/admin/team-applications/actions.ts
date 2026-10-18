'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { InviteStatus } from '@prisma/client';

export async function updateTeamApplicationStatus(id: string, status: string) {
  try {
    await prisma.teamApplication.update({
      where: { id },
      data: { status: status as InviteStatus }
    });
    revalidatePath('/admin/team-applications');
    return { success: true };
  } catch (error) {
    console.error('Error updating team application:', error);
    return { success: false, error: 'Failed to update application.' };
  }
}
