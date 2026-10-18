'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';
import { TournamentFormat, TournamentStatus } from '@prisma/client';

export async function createTournament(data: any) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some(r => ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].includes(r.role.name))) {
    throw new Error('Yetkisiz işlem');
  }

  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

  const tournament = await prisma.tournament.create({
    data: {
      name: data.name,
      slug,
      gameId: data.gameId,
      description: data.description,
      rules: data.rules,
      coverImage: data.coverImage,
      prizePool: data.prizePool,
      maxTeams: data.maxTeams ? parseInt(data.maxTeams) : null,
      minTeamSize: data.minTeamSize ? parseInt(data.minTeamSize) : null,
      maxTeamSize: data.maxTeamSize ? parseInt(data.maxTeamSize) : null,
      format: data.format as TournamentFormat,
      status: data.status as TournamentStatus,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
    }
  });

  revalidatePath('/admin/tournaments');
  return { success: true, id: tournament.id };
}
