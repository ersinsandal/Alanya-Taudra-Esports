import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Trophy, Crosshair, Clock } from 'lucide-react';
import { prisma } from '@/lib/db';
import { mockCrews } from '@/lib/data/mock-crews';

export const metadata: Metadata = {
  title: 'ATE Resmi Takımları | ATE Digital Arena',
  description: 'ATE Digital Arena resmi espor takımları',
};

export default async function TeamsPage() {
  const coverMap: Record<string, string> = {
    'valorant': 'https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-600x800.jpg',
    'counter-strike 2': 'https://cdn.akamai.steamstatic.com/steam/apps/730/library_600x900_2x.jpg',
    'cs2': 'https://cdn.akamai.steamstatic.com/steam/apps/730/library_600x900_2x.jpg',
    'league of legends': 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-600x800.jpg',
    'pubg mobile': 'https://static-cdn.jtvnw.net/ttv-boxart/PUBG%20MOBILE-600x800.jpg',
    'pubg': 'https://static-cdn.jtvnw.net/ttv-boxart/PUBG:%20BATTLEGROUNDS-600x800.jpg',
    'mobile legends': 'https://static-cdn.jtvnw.net/ttv-boxart/Mobile%20Legends:%20Bang%20Bang-600x800.jpg',
    'teamfight tactics': 'https://static-cdn.jtvnw.net/ttv-boxart/Teamfight%20Tactics-600x800.jpg',
    'ea fc': 'https://cdn.akamai.steamstatic.com/steam/apps/2195250/library_600x900_2x.jpg',
    'rust': 'https://static-cdn.jtvnw.net/ttv-boxart/Rust-600x800.jpg',
    'genshin impact': 'https://static-cdn.jtvnw.net/ttv-boxart/Genshin%20Impact-600x800.jpg',
    'gta 5': 'https://static-cdn.jtvnw.net/ttv-boxart/Grand%20Theft%20Auto%20V-600x800.jpg',
    'rocket league': 'https://static-cdn.jtvnw.net/ttv-boxart/Rocket%20League-600x800.jpg',
    'fortnite': 'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-600x800.jpg',
    'efootball': 'https://cdn.akamai.steamstatic.com/steam/apps/1665460/library_600x900_2x.jpg',
    'wild rift': 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends:%20Wild%20Rift-600x800.jpg',
    'honor of kings': 'https://static-cdn.jtvnw.net/ttv-boxart/Honor%20of%20Kings-600x800.jpg',
    'overwatch 2': 'https://static-cdn.jtvnw.net/ttv-boxart/Overwatch%202-600x800.jpg',
    'apex legends': 'https://static-cdn.jtvnw.net/ttv-boxart/Apex%20Legends-600x800.jpg',
    'rainbow six siege': 'https://static-cdn.jtvnw.net/ttv-boxart/Tom%20Clancy%27s%20Rainbow%20Six%20Siege-600x800.jpg',
  };

  const getCover = (gameName: string) => {
    const key = gameName.toLowerCase();
    return coverMap[key] || 'https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-600x800.jpg';
  };

  const getSlug = (gameName: string) => {
    return gameName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-ekibi';
  };

  let games: string[] = [];
  try {
    const dbGames = await prisma.game.findMany();
    if (dbGames.length > 0) {
      games = dbGames.map(g => g.name);
    } else {
      games = mockCrews.map(c => c.game);
    }
  } catch (error) {
    games = mockCrews.map(c => c.game);
  }

  games = Array.from(new Set(games));

  const ateTeams = games.map((game, index) => ({
    id: index,
    name: `ATE ${game}`,
    game: game,
    status: 'Beklemede',
    achievements: '-',
    cover: getCover(game),
    crewSlug: getSlug(game),
  }));

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mt-12 mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary-red/10 rounded-full mb-6">
          <Shield className="w-8 h-8 text-primary-red" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
          ATE RESMİ TAKIMLARI
        </h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Alanya Taudra E-Sports'un en iyi oyuncularından oluşan resmi profesyonel espor takımları.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {ateTeams.map(team => (
          <div key={team.id} className="group flex flex-col bg-panel rounded-xl border border-white/5 overflow-hidden hover:border-primary-red/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,31,45,0.15)] hover:-translate-y-2 relative">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="h-64 relative overflow-hidden bg-black">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                style={{ backgroundImage: `url(${team.cover})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/20 to-transparent" />
              
              <div className="absolute top-4 right-4 bg-primary-red text-white text-xs font-bold px-3 py-1 rounded shadow-lg flex items-center gap-2">
                <Crosshair className="w-3 h-3" /> RESMİ
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col relative z-10">
              <h3 className="text-2xl font-heading font-black text-white mb-2 uppercase tracking-tight group-hover:text-primary-red transition-colors">
                {team.name}
              </h3>
              
              <div className="text-sm font-bold text-secondary bg-white/5 px-3 py-1 rounded-md self-start mb-6 border border-white/5">
                {team.game}
              </div>

              <div className="mt-auto grid grid-cols-2 gap-4">
                <div className="bg-[#111114] rounded-lg p-3 border border-white/5 flex flex-col items-center justify-center text-center group-hover:border-white/10 transition-colors">
                  <Trophy className="w-5 h-5 text-yellow-500 mb-1 opacity-50" />
                  <span className="text-2xl font-black text-white">{team.achievements}</span>
                  <span className="text-xs text-secondary font-medium">Kupa</span>
                </div>
                <div className="bg-[#111114] rounded-lg p-3 border border-white/5 flex flex-col items-center justify-center text-center group-hover:border-white/10 transition-colors">
                  <Clock className="w-5 h-5 text-secondary mb-1" />
                  <span className="text-lg font-black text-white mt-1 uppercase tracking-wider">{team.status}</span>
                  <span className="text-xs text-secondary font-medium mt-1">Durum</span>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col gap-2">
                <Link href={`/crews/${team.crewSlug}`} className="w-full py-3 bg-white/5 hover:bg-primary-red text-white text-sm font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 border border-white/5 group-hover:border-primary-red">
                  Takıma Başvur
                </Link>
                <p className="text-[10px] text-secondary/60 text-center uppercase tracking-wider">
                  * Başvuru için öncelikle bu oyunun Topluluk Ekibine (Crew) üye olmalısınız.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
