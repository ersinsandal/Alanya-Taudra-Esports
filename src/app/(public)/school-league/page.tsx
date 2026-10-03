import Image from "next/image";
import Link from "next/link";
import { Trophy, Calendar, ChevronRight, Swords, Star } from "lucide-react";
import { ATEEmptyState } from "@/components/ui/empty-state";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Okul Ligi | ATE Digital Arena",
  description: "Alanya okullar arası espor ligi.",
};

export default async function SchoolLeaguePage() {
  const matches = await prisma.match.findMany({
    where: { 
      tournament: { type: 'SCHOOL' }
    },
    orderBy: { scheduledAt: 'asc' },
    take: 6,
    include: {
      teamA: true,
      teamB: true
    }
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#F7F7F7]">
      <div className="h-[40vh] relative flex items-center border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070"
            alt="Okul Ligi" 
            fill 
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-4">
            <Trophy className="w-4 h-4" />
            <span>ALANYA OKUL LİGİ 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-space mb-4">OKULUNU ZİRVEYE TAŞI</h1>
          <p className="text-xl text-[#99999F] max-w-2xl">Lise ve üniversiteler arası amansız rekabet. Takımını kur, okulunu temsil et ve efsane ol.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black font-space flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-yellow-500" />
              LİG PUAN DURUMU
            </h2>
            <ATEEmptyState icon={Trophy} title="Lig Henüz Başlamadı" description="Okul Ligi puan durumu turnuvalar başladıktan sonra burada görüntülenecektir." />
          </div>
          
          <div>
            <h2 className="text-2xl font-black font-space flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-blue-500" />
              FİKSTÜR
            </h2>
            
            {matches.length === 0 ? (
              <ATEEmptyState icon={Calendar} title="Maç Yok" description="Planlanmış maç bulunmuyor." />
            ) : (
              <div className="space-y-4">
                {matches.map((match) => (
                  <div key={match.id} className="bg-[#111111] border border-white/5 rounded-xl p-4">
                    <div className="text-xs text-[#99999F] text-center mb-3">
                      {match.scheduledAt ? new Date(match.scheduledAt).toLocaleDateString('tr-TR') : 'Tarih Belirsiz'}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 text-center font-bold text-sm">{match.teamA.name}</div>
                      <div className="px-3 py-1 bg-white/5 rounded text-xs text-white/50 font-bold mx-2">VS</div>
                      <div className="flex-1 text-center font-bold text-sm">{match.teamB.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
