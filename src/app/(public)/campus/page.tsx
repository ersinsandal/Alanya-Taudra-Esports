import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Trophy, Users, Calendar, MapPin, ChevronRight, Swords } from "lucide-react";
import { ATEEmptyState } from "@/components/ui/empty-state";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Kampüs | ATE Digital Arena",
  description: "Alanya'daki üniversite ve lise espor ekosistemi.",
};

export default async function CampusPage() {
  const teams = await prisma.team.findMany({
    where: { 
      isSchoolTeam: true,
      deletedAt: null 
    },
    include: {
      game: true,
      members: true
    },
    take: 6
  });

  const matches = await prisma.match.findMany({
    where: { scheduledAt: { gte: new Date() } },
    orderBy: { scheduledAt: 'asc' },
    take: 4,
    include: {
      teamA: true,
      teamB: true,
      tournament: true
    }
  });

  return (
    <div className="min-h-screen bg-transparent text-[#F7F7F7]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070"
            alt="Kampüs Espor" 
            fill 
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/50/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <div className="max-w-4xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-red/10 border border-primary-red/20 text-primary-red text-sm font-bold mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>OKUL LİGİ & KAMPÜS</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-space mb-6 tracking-tighter">
              ALANYA'NIN <span className="text-white">ESPOR GELECEĞİ</span>
            </h1>
            <p className="text-lg text-[#99999F] mb-8 max-w-2xl">
              Lise ve üniversiteler arası rekabet başlıyor. Okulunu temsil et, turnuvalara katıl ve okulunun adını zirveye yazdır.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/school-league" className="bg-primary-red hover:bg-deep-red text-white px-8 py-3 rounded-md font-bold transition-all">
                Okul Ligini İncele
              </Link>
              <Link href="/representative" className="bg-panel hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-md font-bold transition-all">
                Okul Temsilcisi Ol
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Puan Durumu & Yaklaşan Maçlar */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Kampüs Takımları */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black font-space flex items-center gap-3">
                    <Users className="w-6 h-6 text-blue-500" />
                    KAMPÜS TAKIMLARI
                  </h2>
                  <Link href="/teams" className="text-sm font-bold text-[#99999F] hover:text-white flex items-center transition-colors">
                    Tümünü Gör <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                
                {teams.length === 0 ? (
                  <ATEEmptyState icon={Users} title="Takım Bulunamadı" description="Henüz kampüs takımı kaydedilmemiş." />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {teams.map((team) => (
                      <div key={team.id} className="bg-panel border border-white/5 rounded-xl p-4 hover:border-white/20 transition-all flex items-center gap-4 group">
                        <div className="w-16 h-16 rounded-lg bg-black border border-white/10 flex items-center justify-center shrink-0">
                          {team.logoUrl ? (
                            <Image src={team.logoUrl} alt={team.name} width={40} height={40} className="object-contain" />
                          ) : (
                            <Users className="w-8 h-8 text-[#99999F]" />
                          )}
                        </div>
                        <div>
                          <div className="text-xs text-[#99999F] mb-1 font-medium">{team.game.name}</div>
                          <h3 className="font-bold text-lg group-hover:text-primary-red transition-colors">{team.name}</h3>
                          <div className="text-xs text-[#99999F] mt-1">{team.members.length} Oyuncu</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Yaklaşan Maçlar */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black font-space flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-purple-500" />
                    YAKLAŞAN KAMPÜS MAÇLARI
                  </h2>
                </div>

                {matches.length === 0 ? (
                  <ATEEmptyState icon={Calendar} title="Maç Yok" description="Planlanmış kampüs maçı bulunmuyor." />
                ) : (
                  <div className="space-y-4">
                    {matches.map((match) => (
                      <div key={match.id} className="bg-panel border border-white/5 rounded-xl p-6 hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm font-bold text-primary-red">{match.tournament?.name || "Özel Maç"}</div>
                          <div className="text-sm text-[#99999F]">
                            {new Date(match.scheduledAt!).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-black border border-white/10" />
                            <span className="font-bold text-lg">{match.teamA.name}</span>
                          </div>
                          <div className="px-6 py-2 bg-white/5 rounded-lg font-space font-black text-white/50">
                            VS
                          </div>
                          <div className="flex-1 flex items-center gap-4 justify-end">
                            <span className="font-bold text-lg">{match.teamB.name}</span>
                            <div className="w-12 h-12 rounded-lg bg-black border border-white/10" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary-red/20 to-accent-red/20 border border-primary-red/20 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-primary-red/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-red">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-space mb-2">Okul Temsilcisi Ol</h3>
                <p className="text-[#99999F] text-sm mb-6">
                  Okulundaki espor faaliyetlerini sen yönet. ATE'nin resmi okul temsilcisi olarak takımını kur.
                </p>
                <Link href="/representative" className="block w-full py-3 bg-primary-red hover:bg-deep-red text-white font-bold rounded-lg transition-colors">
                  Başvuru Yap
                </Link>
              </div>

              <div className="bg-panel border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 font-space">Nasıl Çalışır?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</div>
                    <p className="text-sm text-[#99999F]"><strong className="text-white">Kayıt Ol:</strong> Okulunu veya üniversiteni seçerek platforma katıl.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</div>
                    <p className="text-sm text-[#99999F]"><strong className="text-white">Takım Kur:</strong> Kendi okulundan arkadaşlarınla resmi okul takımını oluştur.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">3</div>
                    <p className="text-sm text-[#99999F]"><strong className="text-white">Rekabet Et:</strong> Okullar arası ligde mücadele et ve ATE puanları topla.</p>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
