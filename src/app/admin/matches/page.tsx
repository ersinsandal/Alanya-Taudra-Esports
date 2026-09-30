import React from 'react';
import { prisma } from '@/lib/db';
import { Search, Swords, Clock, MonitorPlay, Edit, BarChart } from 'lucide-react';
import Link from 'next/link';

export default async function MatchesAdminPage() {
  const rawMatches = await prisma.match.findMany({
    orderBy: { scheduledAt: 'desc' },
    include: {
      teamA: true,
      teamB: true,
      tournament: {
        include: { game: true }
      }
    }
  });

  const matches = rawMatches.map((m: any) => ({
    id: m.id,
    teamA: m.teamA?.name || 'Belirsiz',
    teamB: m.teamB?.name || 'Belirsiz',
    game: m.tournament?.game?.name || '-',
    tournament: m.tournament?.name || '-',
    date: m.scheduledAt 
      ? m.scheduledAt.toLocaleDateString('tr-TR') + ' - ' + m.scheduledAt.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      : '-',
    status: m.status // SCHEDULED, LIVE, COMPLETED, CANCELLED
  }));

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'LIVE': return <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-1 rounded text-xs font-bold animate-pulse flex items-center gap-1"><MonitorPlay className="w-3 h-3"/> CANLI</span>;
      case 'SCHEDULED': return <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-1 rounded text-xs font-medium">Planlandı</span>;
      case 'COMPLETED': return <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-1 rounded text-xs font-medium">Tamamlandı</span>;
      case 'CANCELLED': return <span className="bg-gray-500/10 text-gray-500 border border-gray-500/20 px-2 py-1 rounded text-xs font-medium">İptal</span>;
      default: return <span className="bg-gray-500/10 text-gray-400 border border-gray-500/20 px-2 py-1 rounded text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase">Fikstür ve Maçlar</h1>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Takım veya turnuva ara..." 
              className="w-full bg-[#1A1A24] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-secondary focus:outline-none focus:border-primary-red transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-secondary border-b border-white/10 bg-[#0B0B0D]">
                <th className="px-6 py-4 font-medium">Karşılaşma</th>
                <th className="px-6 py-4 font-medium">Turnuva / Oyun</th>
                <th className="px-6 py-4 font-medium">Tarih</th>
                <th className="px-6 py-4 font-medium">Durum</th>
                <th className="px-6 py-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {matches.map((match) => (
                <tr key={match.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white">{match.teamA}</span>
                      <Swords className="w-4 h-4 text-primary-red" />
                      <span className="font-bold text-white">{match.teamB}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{match.tournament}</span>
                      <span className="text-xs text-secondary">{match.game}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-secondary">
                      <Clock className="w-4 h-4" />
                      {match.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(match.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/matches/${match.id}`} className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-400/10 rounded-md hover:bg-blue-400/20 transition-colors" title="Detayları Düzenle">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-1.5 text-emerald-400 hover:text-emerald-300 bg-emerald-400/10 rounded-md hover:bg-emerald-400/20 transition-colors" title="İstatistikleri Gir">
                        <BarChart className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {matches.length === 0 && (
            <div className="text-center py-12 text-secondary">
              Henüz eklenmiş bir maç bulunmuyor.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
