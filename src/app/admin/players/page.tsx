import React from 'react';
import { prisma } from '@/lib/db';
import { Search, Users, UserCheck, UserX, Gamepad2, Ban, Eye } from 'lucide-react';
import Link from 'next/link';

export default async function PlayersPage() {
  let players = [];
  try {
    const rawUsers = await prisma.user.findMany({
      where: {
        teamMemberships: { some: {} }
      },
      include: {
        profile: {
          include: {
            school: true,
            university: true
          }
        },
        gameProfiles: {
          include: {
            game: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    players = rawUsers.map(u => ({
      id: u.id,
      ateId: u.username || `ATE-${u.id.substring(0,4)}`,
      name: `${u.profile?.firstName || ''} ${u.profile?.lastName || ''}`,
      games: u.gameProfiles.map(gp => gp.game.name),
      school: u.profile?.school?.name || u.profile?.university?.name || '-',
      points: 0,
      status: u.status === 'ACTIVE' ? 'Aktif' : 'Banlı',
      date: u.createdAt.toLocaleDateString('tr-TR')
    }));
  } catch (error) {
    // Fallback for offline DB
    players = [
      { id: '1', ateId: 'ATE-8492', name: 'Alperen Yılmaz', games: ['Valorant', 'CS2'], school: 'Alanya Bahçeşehir', points: 2450, status: 'Aktif', date: '12.08.2024' },
      { id: '2', ateId: 'ATE-8493', name: 'Selin Kaya', games: ['League of Legends'], school: 'Alanya Fen Lisesi', points: 1840, status: 'Aktif', date: '15.08.2024' },
      { id: '3', ateId: 'ATE-8494', name: 'Can Demir', games: ['EA FC'], school: 'ALKÜ', points: 850, status: 'Aktif', date: '01.09.2024' },
    ];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase">Oyuncu Yönetimi</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-panel border border-white/5 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-secondary">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="font-bold uppercase tracking-wider text-xs">Takım Oyuncuları</span>
          </div>
          <span className="text-3xl font-black text-white">{players.length}</span>
        </div>
        <div className="bg-panel border border-white/5 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-secondary">
            <UserCheck className="w-5 h-5 text-green-500" />
            <span className="font-bold uppercase tracking-wider text-xs">Aktif</span>
          </div>
          <span className="text-3xl font-black text-white">{players.filter(p => p.status === 'Aktif').length}</span>
        </div>
        <div className="bg-panel border border-white/5 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-secondary">
            <UserX className="w-5 h-5 text-primary-red" />
            <span className="font-bold uppercase tracking-wider text-xs">Banlı</span>
          </div>
          <span className="text-3xl font-black text-white">{players.filter(p => p.status === 'Banlı').length}</span>
        </div>
      </div>

      <div className="bg-panel rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Oyuncu adı, okul veya ATE ID ara..." 
              className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary-red transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-secondary text-xs uppercase tracking-widest font-bold border-b border-white/5">
                <th className="p-4">ATE ID</th>
                <th className="p-4">Oyuncu Adı</th>
                <th className="p-4">Oyunlar</th>
                <th className="p-4">Okul/Üniversite</th>
                <th className="p-4">Durum</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {players.map(player => (
                <tr key={player.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <span className="text-secondary font-mono text-sm">{player.ateId}</span>
                  </td>
                  <td className="p-4">
                    <p className="text-white font-bold">{player.name}</p>
                    <p className="text-xs text-secondary mt-1">Kayıt: {player.date}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {player.games.length > 0 ? player.games.map((game: string, i: number) => (
                        <span key={i} className="bg-white/5 border border-white/10 px-2 py-1 rounded text-xs text-secondary font-medium">
                          {game}
                        </span>
                      )) : (
                        <span className="text-xs text-secondary/50">-</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-secondary">{player.school}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      player.status === 'Aktif' 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-blue-400 transition-colors" title="İncele">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className={`p-2 hover:bg-white/10 rounded-lg transition-colors ${player.status === 'Aktif' ? 'text-red-400' : 'text-green-400'}`} title={player.status === 'Aktif' ? 'Banla' : 'Banı Kaldır'}>
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
