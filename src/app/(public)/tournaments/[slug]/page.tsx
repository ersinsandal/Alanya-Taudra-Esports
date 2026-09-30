import { Metadata } from 'next';
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar, Trophy, Users, Shield, Target, Medal } from "lucide-react";
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tournament = await db.tournament.findUnique({ where: { slug } });
  
  if (!tournament) return { title: 'Turnuva Bulunamadı' };
  
  return {
    title: `${tournament.name} | ATE Digital Arena`,
  };
}

export default async function TournamentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const tournament = await db.tournament.findUnique({
    where: { slug },
    include: {
      game: true,
      teams: {
        include: {
          team: {
            include: {
              members: { include: { user: true } }
            }
          }
        }
      }
    }
  });

  if (!tournament) notFound();

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-[40vh] min-h-[400px] w-full bg-[#0a0a0c] flex items-end">
        {tournament.coverImage ? (
          <Image
            src={tournament.coverImage}
            alt={tournament.name}
            fill
            className="object-cover opacity-50"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-black to-[#111114]" />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent" />
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-red/20 text-primary-red border border-primary-red/30 rounded-md font-bold text-sm uppercase tracking-wider mb-4 backdrop-blur-md">
            {tournament.game?.name || "Espor"}
          </div>
          
          <h1 className="text-5xl md:text-6xl font-heading font-black text-white uppercase tracking-tight mb-4 leading-tight">
            {tournament.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <div className="flex items-center bg-black/50 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md">
              <Calendar className="w-4 h-4 mr-2 text-primary-red" />
              {format(tournament.startDate, "d MMMM yyyy", { locale: tr })} - {format(tournament.endDate || tournament.startDate, "d MMMM yyyy", { locale: tr })}
            </div>
            
            <div className="flex items-center bg-black/50 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md">
              <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
              {tournament.prizePool || "Ödül Havuzu Belirtilmedi"}
            </div>
            
            <div className="flex items-center bg-black/50 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md">
              <Users className="w-4 h-4 mr-2 text-secondary" />
              {tournament.teams.length} / {tournament.maxTeams || "∞"} Takım
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-panel border border-white/5 rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-black text-white uppercase tracking-wide mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-primary-red" /> Turnuva Detayları
              </h2>
              <div className="prose prose-invert max-w-none text-secondary">
                {tournament.description ? (
                  <div dangerouslySetInnerHTML={{ __html: tournament.description }} />
                ) : (
                  <p>Bu turnuva için henüz bir açıklama girilmemiştir.</p>
                )}
              </div>
            </div>

            <div className="bg-panel border border-white/5 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-black text-white uppercase tracking-wide flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-primary-red" /> Katılan Takımlar
                </h2>
                <span className="text-sm font-bold text-secondary bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  {tournament.teams.length} Takım
                </span>
              </div>
              
              {tournament.teams.length === 0 ? (
                <div className="text-center p-8 bg-black/40 border border-white/5 rounded-xl text-secondary">
                  Henüz kayıtlı takım bulunmuyor. İlk katılan siz olun!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tournament.teams.map((t, idx) => (
                    <div key={idx} className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center gap-4 hover:border-white/10 transition-colors">
                      <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center font-black text-white/30 text-xl">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">{t.team.name}</div>
                        <div className="text-xs text-secondary">{t.team.members.length} Oyuncu</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-panel border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-red to-[#850000]" />
              <h3 className="text-xl font-heading font-black text-white uppercase mb-4">Turnuva Durumu</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-secondary text-sm">Durum</span>
                  <span className="text-white font-bold bg-white/10 px-3 py-1 rounded">{tournament.status.replace("_", " ")}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-secondary text-sm">Katılım</span>
                  <span className="text-white font-bold">{tournament.maxTeams ? `${tournament.maxTeams} Takım Sınırı` : 'Sınırsız'}</span>
                </div>
              </div>

              {tournament.status === 'REGISTRATION_OPEN' && (
                <button className="w-full mt-6 py-4 bg-primary-red hover:bg-[#FF1F2D] text-white font-black uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,31,45,0.3)]">
                  Turnuvaya Katıl
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
