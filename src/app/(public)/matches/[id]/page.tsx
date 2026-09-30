import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Trophy, Calendar, ExternalLink } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = await db.match.findUnique({
    where: { id },
    include: { teamA: true, teamB: true }
  });

  if (!match) return { title: "Maç Bulunamadı" };

  return {
    title: `${match.teamA?.name || "TBD"} vs ${match.teamB?.name || "TBD"} | ATE Digital Arena`,
  };
}

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const match = await db.match.findUnique({
    where: { id },
    include: {
      teamA: true,
      teamB: true,
      tournament: true,
      maps: { orderBy: { order: "asc" } },
      result: true,
    },
  });

  if (!match) notFound();

  const isLive = match.status === "LIVE";
  const isCompleted = match.status === "COMPLETED";
  const scoreA = match.result?.scoreA ?? 0;
  const scoreB = match.result?.scoreB ?? 0;
  const winnerTeamId = match.result?.winnerTeamId;

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      {/* Match Header */}
      <div className="bg-[#111114] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden mb-12">
        <div className="p-4 border-b border-[rgba(255,255,255,0.05)] bg-[#0B0B0D] flex flex-wrap justify-between items-center text-sm gap-2">
          <div className="flex items-center text-[#99999F]">
            <Trophy className="w-4 h-4 mr-2 text-[#D00000]" />
            {match.tournament?.name || "Özel Karşılaşma"}
            {match.round && <span className="ml-2 px-2 py-0.5 bg-white/5 rounded text-xs">Tur {match.round}</span>}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#99999F] flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {match.scheduledAt ? format(match.scheduledAt, "d MMM yyyy HH:mm", { locale: tr }) : "Tarih Belirsiz"}
            </span>
            {isLive && (
              <span className="flex items-center px-2 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded font-bold animate-pulse">
                CANLI
              </span>
            )}
            {isCompleted && (
              <span className="px-2 py-0.5 bg-white/10 text-white rounded font-bold">
                TAMAMLANDI
              </span>
            )}
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Team A */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#0B0B0D] border-2 border-white/10 flex items-center justify-center mb-4 overflow-hidden relative">
              {match.teamA?.logoUrl ? (
                <Image src={match.teamA.logoUrl} alt={match.teamA.name} fill className="object-cover" />
              ) : (
                <span className="text-4xl font-display font-bold text-white/20">
                  {match.teamA?.tag || "A"}
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white text-center">
              {match.teamA?.name || "TBD"}
            </h2>
            {isCompleted && winnerTeamId === match.teamAId && (
              <span className="mt-2 px-3 py-1 bg-[#D00000] text-white text-xs font-bold uppercase rounded">
                Kazanan
              </span>
            )}
          </div>

          {/* Score / VS */}
          <div className="flex flex-col items-center justify-center shrink-0">
            {isCompleted || isLive ? (
              <div className="flex items-center gap-6">
                <span className={`text-5xl md:text-7xl font-display font-bold ${winnerTeamId === match.teamAId ? 'text-white' : 'text-[#99999F]'}`}>
                  {scoreA}
                </span>
                <span className="text-2xl text-[#99999F]">-</span>
                <span className={`text-5xl md:text-7xl font-display font-bold ${winnerTeamId === match.teamBId ? 'text-white' : 'text-[#99999F]'}`}>
                  {scoreB}
                </span>
              </div>
            ) : (
              <span className="text-4xl font-display font-bold text-[#444]">VS</span>
            )}
            {match.bestOf && (
              <div className="mt-4 text-sm text-[#99999F] font-medium px-3 py-1 bg-white/5 rounded">
                BO{match.bestOf}
              </div>
            )}
          </div>

          {/* Team B */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#0B0B0D] border-2 border-white/10 flex items-center justify-center mb-4 overflow-hidden relative">
              {match.teamB?.logoUrl ? (
                <Image src={match.teamB.logoUrl} alt={match.teamB.name} fill className="object-cover" />
              ) : (
                <span className="text-4xl font-display font-bold text-white/20">
                  {match.teamB?.tag || "B"}
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white text-center">
              {match.teamB?.name || "TBD"}
            </h2>
            {isCompleted && winnerTeamId === match.teamBId && (
              <span className="mt-2 px-3 py-1 bg-[#D00000] text-white text-xs font-bold uppercase rounded">
                Kazanan
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Streams & Maps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111114] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
            <h3 className="font-display font-bold text-white mb-6 text-xl">Harita Sonuçları</h3>
            
            {match.maps && match.maps.length > 0 ? (
              <div className="space-y-3">
                {match.maps.map((mapItem: any, idx: number) => (
                  <div key={mapItem.id} className="flex items-center justify-between p-4 bg-[#0B0B0D] rounded-lg border border-white/5">
                    <div className="text-[#99999F] font-medium">Harita {idx + 1}</div>
                    <div className="font-bold text-white">{mapItem.mapName || "Belirsiz"}</div>
                    <div className="flex gap-4 font-display font-bold text-lg">
                      <span className={mapItem.scoreA > mapItem.scoreB ? "text-white" : "text-[#99999F]"}>
                        {mapItem.scoreA || 0}
                      </span>
                      <span className="text-[#444]">-</span>
                      <span className={mapItem.scoreB > mapItem.scoreA ? "text-white" : "text-[#99999F]"}>
                        {mapItem.scoreB || 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#99999F]">
                Harita detayları henüz girilmedi.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {match.streamUrl && (
            <a 
              href={match.streamUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#D00000] hover:bg-[#FF1F2D] text-white rounded-xl font-bold uppercase transition-colors"
            >
              Yayını İzle <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <div className="bg-[#111114] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
            <h3 className="font-display font-bold text-white mb-4">Maç Detayları</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[#99999F]">Turnuva</span>
                <span className="text-white text-right">{match.tournament?.name || "Özel"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#99999F]">Tarih</span>
                <span className="text-white">
                  {match.scheduledAt ? format(match.scheduledAt, "d MMM yyyy", { locale: tr }) : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#99999F]">Saat</span>
                <span className="text-white">
                  {match.scheduledAt ? format(match.scheduledAt, "HH:mm") : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#99999F]">Format</span>
                <span className="text-white font-medium">BO{match.bestOf}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
