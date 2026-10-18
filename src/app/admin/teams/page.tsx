import React from 'react';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import TeamsClient from './teams-client';

export default async function TeamsAdminPage() {
  const user = await getCurrentUser();
  const isSuperAdmin = user?.roles?.some((ur: any) => ur.role.name === 'SUPER_ADMIN') || false;

  const rawTeams = await prisma.team.findMany({
    where: { isOfficial: true },
    include: {
      game: true,
      _count: { select: { members: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  const games = await prisma.game.findMany({
    select: { id: true, name: true }
  });

  const teams = rawTeams.map(t => ({
    id: t.id,
    name: t.name,
    game: t.game.name,
    gameIcon: t.game.icon,
    members: t._count.members,
    status: t.isOpen ? 'Aktif' : 'Pasif',
    isOpen: t.isOpen,
  }));

  return (
    <TeamsClient 
      initialTeams={teams} 
      games={games} 
      isSuperAdmin={isSuperAdmin} 
    />
  );
}
