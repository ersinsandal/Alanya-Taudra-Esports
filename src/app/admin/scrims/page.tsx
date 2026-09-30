import React from 'react';
import { prisma } from '@/lib/db';
import { Search, Shield, Flag, Calendar, Crosshair, Swords } from 'lucide-react';
import Link from 'next/link';

export default async function ScrimsAdminPage() {
  let scrims = [];
  try {
    const rawScrims = await (prisma.scrim.findMany as any)({ include: { game: true, hostTeam: true, guestTeam: true }, orderBy: { scheduledAt: 'desc' } });
    
    scrims = rawScrims.map((s: any) => ({
      id: s.id,
      teamA: (s as any).hostTeam?.name || 'Rakip Bekleniyor',
      teamB: (s as any).guestTeam?.name || 'Rakip Bekleniyor',
      game: (s as any).game?.name || '-',
      date: (s as any).scheduledAt?.toLocaleDateString('tr-TR') + ' - ' + (s as any).scheduledAt?.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      format: (s as any).format,
      status: (s as any).status // OPEN, SCHEDULED, LIVE, COMPLETED, CANCELLED
    }));
  } catch (error) {
    scrims = [
      { id: '1', teamA: "ATE VALORANT", teamB: "Taudra Gaming", game: "Valorant", date: "Bugün 20:00", format: "BO3", status: "LIVE" },
      { id: '2', teamA: "ATE CS2", teamB: "Shadows", game: "Counter-Strike 2", date: "Bugün 21:30", format: "BO1", status: "SCHEDULED" },
      { id: '3', teamA: "ATE LOL", teamB: "Akdeniz E-Sports", game: "League of Legends", date: "Dün 19:00", format: "BO3", status: "COMPLETED" },
      { id: '4', teamA: "Dark Tigers", teamB: "Rakip Bekleniyor", game: "Valorant", date: "Yarın 18:00", format: "BO1", status: "OPEN" },
    ];
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'LIVE': return <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-1 rounded text-xs font-bold animate-pulse">CANLI</span>;
      case 'SCHEDULED': return <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-1 rounded text-xs font-medium">Planlandı</span>;
      case 'COMPLETED': return <span className="bg-white/5 text-secondary border border-white/10 px-2 py-1 rounded text-xs font-medium">Tamamlandı</span>;
      case 'OPEN': return <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded text-xs font-medium">Rakip Aranıyor</span>;
      case 'CANCELLED': return <span className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2 py-1 rounded text-xs font-medium">İptal</span>;
      default: return <span className="bg-white/5 text-secondary border border-white/10 px-2 py-1 rounded text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase">Hazırlık Maçı (Scrim) Yönetimi</h1>
      </div>

      <div className="bg-panel rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text"
              placeholder="Takım adı veya oyun ara..."
              className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary-red transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-secondary text-xs uppercase tracking-widest font-bold border-b border-white/5">
                <th className="p-4">Karşılaşma</th>
                <th className="p-4">Oyun / Format</th>
                <th className="p-4">Tarih</th>
                <th className="p-4">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {scrims.map((s: any) => (
                <tr key={s.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white">{s.teamA}</span>
                      <Swords className="w-4 h-4 text-primary-red" />
                      <span className={`font-bold ${s.teamB === 'Rakip Bekleniyor' ? 'text-secondary italic' : 'text-white'}`}>{s.teamB}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-white">{s.game}</p>
                    <p className="text-xs text-secondary mt-1">{(s as any).format}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <Calendar className="w-4 h-4" />
                      {s.date}
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge((s as any).status)}
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
