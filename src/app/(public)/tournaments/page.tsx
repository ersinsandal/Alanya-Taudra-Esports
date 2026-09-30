import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { ATEEmptyState } from "@/components/ui/empty-state";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Trophy, Users, Calendar, Gamepad2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Turnuvalar | ATE Digital Arena",
  description: "ATE Digital Arena turnuvaları ve espor müsabakaları",
};

export default async function TournamentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  
  const where = status && status !== "TUMU" ? { status: status as any } : {};

  let tournaments: any[] = [];
  try {
    tournaments = await db.tournament.findMany({
      where,
      include: {
        game: true,
        _count: {
          select: { teams: true },
        },
      },
      orderBy: { startDate: "asc" },
    });
  } catch (error) {
    console.warn("Tournaments DB fetch failed, using fallback:", error);
  }

  const tabs = [
    { label: "TÜMÜ", value: "TUMU" },
    { label: "YAKLAŞAN", value: "UPCOMING" },
    { label: "KAYIT AÇIK", value: "REGISTRATION_OPEN" },
    { label: "CANLI", value: "LIVE" },
    { label: "TAMAMLANAN", value: "COMPLETED" },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mt-12 mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
          TURNUVALAR
        </h1>
        <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto">
          They played, we ATE. Şehrin en büyük mücadelelerine katıl.
        </p>
      </div>

      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide justify-center">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={`/tournaments${tab.value !== "TUMU" ? `?status=${tab.value}` : ""}`}
            className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-bold transition-colors ${
              (status || "TUMU") === tab.value
                ? "bg-primary-red text-white shadow-[0_0_15px_rgba(255,31,45,0.3)]"
                : "bg-panel text-secondary hover:bg-white/5 hover:text-white border border-white/5"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {tournaments.length === 0 ? (
        <ATEEmptyState
          icon={Trophy}
          title="Turnuva Bulunamadı"
          description="Bu kategoride henüz bir turnuva bulunmuyor."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((t) => (
            <Link
              key={t.id}
              href={`/tournaments/${t.slug}`}
              className="group flex flex-col bg-panel rounded-xl border border-white/5 overflow-hidden hover:border-primary-red/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,31,45,0.15)] hover:-translate-y-2 relative"
            >
              <div className="aspect-video relative bg-[#111114] flex items-center justify-center overflow-hidden">
                {t.coverImage ? (
                  <Image
                    src={t.coverImage}
                    alt={t.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#111114] to-[#1A1A1E] flex items-center justify-center">
                    <Gamepad2 className="w-16 h-16 text-white/5 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-xs font-bold text-white z-10 shadow-lg">
                  {t.status.replace("_", " ")}
                </div>
                
                {t.game && (
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-red/20 text-primary-red border border-primary-red/30 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                      {t.game.name}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-1 flex flex-col relative z-10">
                <h3 className="text-xl font-heading font-black text-white mb-4 line-clamp-2 group-hover:text-primary-red transition-colors uppercase tracking-tight">
                  {t.name}
                </h3>
                
                <div className="mt-auto space-y-3">
                  <div className="flex items-center text-sm font-medium text-secondary">
                    <Calendar className="w-4 h-4 mr-2.5 text-primary-red" />
                    {format(t.startDate, "d MMMM yyyy", { locale: tr })}
                  </div>
                  
                  {t.prizePool && (
                    <div className="flex items-center text-sm font-medium text-secondary">
                      <Trophy className="w-4 h-4 mr-2.5 text-yellow-500" />
                      <span className="text-white font-bold">{t.prizePool}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-secondary pt-4 border-t border-white/5 mt-4">
                    <div className="flex items-center font-bold bg-white/5 px-2 py-1 rounded">
                      <Users className="w-4 h-4 mr-2 text-secondary" />
                      {t._count.teams} / {t.maxTeams || "∞"} Takım
                    </div>
                    <span className="text-primary-red font-bold flex items-center uppercase text-xs tracking-wider">
                      Detaylar <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
