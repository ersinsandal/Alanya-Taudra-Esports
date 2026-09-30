import React from 'react';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { GameManager } from './game-manager';

export default async function GamesAdminPage() {
  const user = await getCurrentUser();
  const isSuperAdmin = user?.roles?.some((ur: any) => ur.role.name === 'SUPER_ADMIN') || false;

  let dbGames = [];
  try {
    const rawGames = await prisma.game.findMany({
      include: {
        crews: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    
    // Serialize for Client Component
    dbGames = rawGames.map(g => ({
      id: g.id,
      name: g.name,
      category: g.category,
      isActive: g.isActive,
      crewName: g.crews?.[0]?.name || 'Ekip Yok',
      crewLogo: g.crews?.[0]?.logoUrl || null
    }));
  } catch (error) {
    // DB Offline fallback
    dbGames = [
      { id: '1', name: 'Valorant', category: 'PC', isActive: true, crewName: 'Valorant Ekibi', crewLogo: null },
      { id: '2', name: 'League of Legends', category: 'PC', isActive: true, crewName: 'LoL Ekibi', crewLogo: null },
      { id: '3', name: 'EA FC', category: 'SPORTS', isActive: true, crewName: 'EA FC Ekibi', crewLogo: null },
    ];
  }

  return (
    <GameManager 
      initialGames={dbGames} 
      isSuperAdmin={isSuperAdmin} 
    />
  );
}
