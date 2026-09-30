import Link from 'next/link';
import { Calendar, Users, Trophy } from 'lucide-react';

interface Tournament {
  id: string;
  name: string;
  game: string;
  date: Date;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  teamCount: number;
  slug: string;
}

interface TournamentsSectionProps {
  tournaments: Tournament[];
}

export function TournamentsSection({ tournaments }: TournamentsSectionProps) {
  const getStatusBadge = (status: Tournament['status']) => {
    switch (status) {
      case 'UPCOMING':
        return <span className="px-2 py-1 text-xs font-medium rounded bg-[#F59E0B]/20 text-[#F59E0B]">Yakında</span>;
      case 'LIVE':
        return <span className="px-2 py-1 text-xs font-medium rounded bg-[#22C55E]/20 text-[#22C55E]">Canlı</span>;
      case 'COMPLETED':
        return <span className="px-2 py-1 text-xs font-medium rounded bg-[rgba(255,255,255,0.1)] text-[#99999F]">Tamamlandı</span>;
    }
  };

  return (
    <section className="py-20 bg-[#050505]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-heading text-3xl font-black text-white uppercase tracking-tight">TURNUVALAR</h2>
            <div className="w-16 h-1 bg-[#D00000] mt-4" />
          </div>
          <Link href="/tournaments" className="text-[#99999F] hover:text-[#F7F7F7] transition-colors hidden sm:block font-medium">
            Tüm Turnuvalar &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.length > 0 ? (
            tournaments.map((tournament) => (
              <div key={tournament.id} className="bg-[#111114] border border-[rgba(255,255,255,0.08)] rounded-lg overflow-hidden flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    {getStatusBadge(tournament.status)}
                    <Trophy className="w-5 h-5 text-[#99999F]" />
                  </div>
                  <h3 className="font-heading font-black text-xl text-[#F7F7F7] mb-2 line-clamp-2">
                    {tournament.name}
                  </h3>
                  <div className="text-[#99999F] text-sm mb-6 flex-1">{tournament.game}</div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-[#99999F] text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{tournament.date.toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#99999F] text-sm">
                      <Users className="w-4 h-4" />
                      <span>{tournament.teamCount} Takım</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/tournaments/${tournament.slug}`}
                    className="block w-full py-2 px-4 border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] text-center rounded transition-colors text-sm font-medium mt-auto"
                  >
                    Detaylar
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 text-center text-[#99999F] bg-[#111114] rounded-lg border border-[rgba(255,255,255,0.08)]">
              Aktif turnuva bulunmuyor.
            </div>
          )}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/tournaments" className="text-[#99999F] hover:text-[#F7F7F7] transition-colors">
            Tüm Turnuvalar &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
