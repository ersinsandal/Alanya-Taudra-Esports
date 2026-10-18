import React from 'react';
import { prisma } from '@/lib/db';
import NewTournamentClient from './new-tournament-client';

export default async function NewTournamentPage() {
  const games = await prisma.game.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  return <NewTournamentClient games={games} />;
}
