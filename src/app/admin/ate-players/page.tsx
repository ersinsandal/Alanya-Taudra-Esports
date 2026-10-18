import React from 'react';
import { prisma } from '@/lib/db';
import { Shield, Star, Gamepad2, Info } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'ATE Oyuncuları | ATE Digital Arena',
};

export default async function AtePlayersAdminPage() {
  const officialTeams = await prisma.team.findMany({
    where: { isOfficial: true },
    include: {
      game: true,
      members: {
        include: {
          user: true
        }
      }
    }
  });

  // Flatten into players list
  const players = officialTeams.flatMap(team => 
    team.members.map(m => ({
      id: m.id,
      userId: m.userId,
      username: m.user.username,
      teamId: team.id,
      teamName: team.name,
      gameName: team.game.name,
      role: m.role,
      joinedAt: m.joinedAt.toLocaleDateString('tr-TR')
    }))
  ).sort((a, b) => a.username.localeCompare(b.username));

  // Group by game
  const groupedPlayers = players.reduce((acc, player) => {
    if (!acc[player.gameName]) acc[player.gameName] = [];
    acc[player.gameName].push(player);
    return acc;
  }, {} as Record<string, typeof players>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white uppercase">ATE OYUNCULARI</h1>
      </div>

      {Object.entries(groupedPlayers).map(([game, gamePlayers]) => (
        <div key={game} className="bg-panel border border-white/10 rounded-xl overflow-hidden mb-6">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-space font-bold text-lg text-white flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-primary-red" />
              {game} Takımı
            </h3>
            <span className="text-sm font-medium text-[#99999F]">{gamePlayers.length} Oyuncu</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Oyuncu</th>
                  <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Takım/Rol</th>
                  <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Katılım Tarihi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {gamePlayers.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-medium text-white">{p.username}</td>
                    <td className="p-4 text-sm text-[#99999F]">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{p.teamName}</span>
                        <span>{p.role}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-[#99999F]">{p.joinedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {Object.keys(groupedPlayers).length === 0 && (
        <div className="bg-panel border border-white/10 rounded-xl p-8 text-center text-[#99999F]">
          Resmi ATE takımlarında henüz kayıtlı oyuncu bulunmuyor.
        </div>
      )}
    </div>
  );
}
