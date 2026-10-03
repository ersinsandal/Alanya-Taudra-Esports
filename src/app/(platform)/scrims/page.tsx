import Link from "next/link";
import { Plus, Swords, Calendar, Clock, Globe, Shield } from "lucide-react";
import { prisma } from "@/lib/db";
import { ATEEmptyState } from "@/components/ui/empty-state";

export default async function ScrimsPage() {
  const scrims = await prisma.match.findMany({
    where: { 
      tournamentId: null, // Scrimler turnuvaya bagli olmayan ozel maclardir
      scheduledAt: { gte: new Date() } 
    },
    include: {
      teamA: { include: { game: true } },
      teamB: true
    },
    take: 12,
    orderBy: { scheduledAt: 'asc' }
  });

  return (
    <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-[#F7F7F7] flex items-center gap-3">
            <Swords className="w-8 h-8 text-[#FF1F2D]" />
            SCRIM FINDER
          </h1>
          <p className="text-[#99999F] mt-1">Takımın için antrenman maçları bul veya oluştur.</p>
        </div>
        
        <Link 
          href="/scrims/new" 
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF1F2D] text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Scrim Oluştur
        </Link>
      </div>

      <div className="flex gap-4 border-b border-white/10 mb-8">
        <button className="px-4 py-3 text-sm font-medium text-[#FF1F2D] border-b-2 border-[#FF1F2D]">
          AÇIK SCRIMLER
        </button>
        <button className="px-4 py-3 text-sm font-medium text-[#99999F] hover:text-white">
          SCRIMLERİM
        </button>
      </div>

      {scrims.length === 0 ? (
        <ATEEmptyState icon={Swords} title="Açık Scrim Bulunamadı" description="Şu anda oynanmayı bekleyen açık bir antrenman maçı yok. İlk sen oluştur!" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {scrims.map(scrim => (
            <div key={scrim.id} className="bg-[#111111] border border-white/5 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#050505] flex items-center justify-center">
                    <span className="font-bold text-xs">{scrim.teamA?.game?.name?.substring(0,3).toUpperCase() || 'OYN'}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{scrim.teamA?.name || 'Bekleniyor'}</h3>
                    <p className="text-xs text-[#99999F]">Hazırlık Maçı</p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded">
                  AÇIK
                </div>
              </div>

              <div className="flex items-center gap-4 py-3 border-y border-white/5">
                <div className="flex items-center gap-2 text-sm text-[#99999F]">
                  <Calendar className="w-4 h-4" />
                  {scrim.scheduledAt ? new Date(scrim.scheduledAt).toLocaleDateString('tr-TR') : 'Belirtilmedi'}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#99999F]">
                  <Clock className="w-4 h-4" />
                  {scrim.scheduledAt ? new Date(scrim.scheduledAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : '-'}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-[#99999F]">
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  TR / EU
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Anti-Cheat Zorunlu
                </div>
              </div>

              <button className="w-full mt-2 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors border border-white/10">
                Rakip Ol
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
