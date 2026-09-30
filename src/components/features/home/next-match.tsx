import { Calendar, Clock, Trophy } from 'lucide-react';
import Image from 'next/image';

interface MatchData {
  id: string;
  homeTeam: { name: string; logo: string | null };
  awayTeam: { name: string; logo: string | null };
  tournamentName: string;
  date: Date;
}

interface NextMatchProps {
  match: MatchData | null;
}

export function NextMatch({ match }: NextMatchProps) {
  return (
    <section className="py-12 bg-[#0B0B0D] border-y border-[rgba(255,255,255,0.08)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-8">
            <h2 className="font-space text-2xl font-bold text-[#F7F7F7]">SIRADAKİ MAÇ</h2>
            <div className="w-12 h-1 bg-[#D00000]" />
          </div>

          {!match ? (
            <div className="p-8 text-center text-[#99999F] border border-[rgba(255,255,255,0.08)] rounded-lg bg-[#111114] w-full max-w-2xl">
              Yakında duyurulacak
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl bg-[#111114] p-8 rounded-lg border border-[rgba(255,255,255,0.08)]">
              {/* Home Team */}
              <div className="flex flex-col items-center gap-4 flex-1">
                {match.homeTeam.logo ? (
                  <Image src={match.homeTeam.logo} alt={match.homeTeam.name} width={80} height={80} className="object-contain" />
                ) : (
                  <div className="w-20 h-20 bg-[rgba(255,255,255,0.05)] rounded-full flex items-center justify-center font-bold text-xl">
                    {match.homeTeam.name.substring(0, 2)}
                  </div>
                )}
                <span className="font-space font-bold text-lg">{match.homeTeam.name}</span>
              </div>

              {/* Match Info */}
              <div className="flex flex-col items-center gap-4 px-8 py-4 md:py-0 border-y md:border-y-0 md:border-x border-[rgba(255,255,255,0.08)] flex-[1.5]">
                <div className="flex items-center gap-2 text-[#D00000] font-bold text-2xl">
                  VS
                </div>
                <div className="flex flex-col items-center text-[#99999F] text-sm gap-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>{match.tournamentName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{match.date.toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{match.date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center gap-4 flex-1">
                {match.awayTeam.logo ? (
                  <Image src={match.awayTeam.logo} alt={match.awayTeam.name} width={80} height={80} className="object-contain" />
                ) : (
                  <div className="w-20 h-20 bg-[rgba(255,255,255,0.05)] rounded-full flex items-center justify-center font-bold text-xl">
                    {match.awayTeam.name.substring(0, 2)}
                  </div>
                )}
                <span className="font-space font-bold text-lg">{match.awayTeam.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
