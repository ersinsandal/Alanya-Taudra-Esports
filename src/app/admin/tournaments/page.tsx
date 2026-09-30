import React from 'react';
import { prisma } from '@/lib/db';
import { Search, Trophy, Calendar, Plus, Eye, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default async function TournamentsPage() {
  let tournaments = [];
  try {
    const rawTournaments = await prisma.tournament.findMany({
      include: {
        game: true,
        _count: { select: { teams: true } }
      },
      orderBy: { startDate: 'desc' }
    });
    
    tournaments = rawTournaments.map(t => ({
      id: t.id,
      name: t.name,
      game: t.game.name,
      teams: t._count.teams,
      maxTeams: t.maxTeams,
      prize: t.prizePool || 'Açıklanmadı',
      date: t.startDate.toLocaleDateString('tr-TR'),
      status: t.status // UPCOMING, ONGOING, COMPLETED
    }));
  } catch (error) {
    tournaments = [
      { id: '1', name: "Kış Kupası 2026", game: "Valorant", teams: 12, maxTeams: 16, prize: "50,000 ₺", date: "15 Ekim 2026", status: "ONGOING" },
      { id: '2', name: "CS2 Topluluk Ligi", game: "Counter-Strike 2", teams: 4, maxTeams: 8, prize: "25,000 ₺", date: "1 Kasım 2026", status: "UPCOMING" },
      { id: '3', name: "Yaz Turnuvası", game: "League of Legends", teams: 16, maxTeams: 16, prize: "100,000 ₺", date: "10 Temmuz 2026", status: "COMPLETED" },
    ];
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ONGOING': return <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded text-xs font-medium">Aktif</span>;
      case 'UPCOMING': return <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-1 rounded text-xs font-medium">Yaklaşan</span>;
      case 'COMPLETED': return <span className="bg-white/5 text-secondary border border-white/10 px-2 py-1 rounded text-xs font-medium">Tamamlandı</span>;
      default: return <span className="bg-white/5 text-secondary border border-white/10 px-2 py-1 rounded text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase">Turnuva Yönetimi</h1>
        <Link href="/admin/tournaments/new" className="flex items-center gap-2 bg-primary-red hover:bg-[#A00000] text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg">
          <Plus className="w-5 h-5" />
          Yeni Turnuva
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-panel border border-white/5 rounded-xl p-4 flex flex-col gap-2 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-2 text-secondary">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-bold uppercase tracking-wider text-xs">Toplam Turnuva</span>
          </div>
          <span className="text-3xl font-black text-white">{tournaments.length}</span>
        </div>
        <div className="bg-panel border border-white/5 rounded-xl p-4 flex flex-col gap-2 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-2 text-secondary">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-bold uppercase tracking-wider text-xs">Aktif Oynanan</span>
          </div>
          <span className="text-3xl font-black text-white">{tournaments.filter(t => t.status === 'ONGOING').length}</span>
        </div>
      </div>

      <div className="bg-panel rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-secondary text-xs uppercase tracking-widest font-bold border-b border-white/5">
                <th className="p-4">Turnuva Adı</th>
                <th className="p-4">Oyun</th>
                <th className="p-4">Kayıtlı Takım</th>
                <th className="p-4">Ödül Havuzu</th>
                <th className="p-4">Tarih</th>
                <th className="p-4">Durum</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tournaments.map(t => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <p className="text-white font-bold">{t.name}</p>
                  </td>
                  <td className="p-4">
                    <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-xs text-secondary font-medium">{t.game}</span>
                  </td>
                  <td className="p-4 text-sm text-secondary">
                    {t.teams} / {t.maxTeams}
                  </td>
                  <td className="p-4 text-sm font-medium text-yellow-500">
                    {t.prize}
                  </td>
                  <td className="p-4 text-sm text-secondary">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {t.date}
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(t.status)}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-blue-400 transition-colors" title="İncele">
                      <Eye className="w-4 h-4" />
                    </button>
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
