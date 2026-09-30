import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Lock } from 'lucide-react';
import { prisma } from '@/lib/db';
import { mockCrews } from '@/lib/data/mock-crews';
import { getCurrentUser } from '@/lib/auth/session';

export const metadata: Metadata = {
  title: 'Oyun Ekipleri | ATE Digital Arena',
};

export default async function CrewsPage() {
  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  // Cover image map by game name/slug
  const coverMap: Record<string, string> = {
    'valorant': 'https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-600x800.jpg',
    'counter-strike 2': 'https://cdn.akamai.steamstatic.com/steam/apps/730/library_600x900_2x.jpg',
    'cs2': 'https://cdn.akamai.steamstatic.com/steam/apps/730/library_600x900_2x.jpg',
    'league of legends': 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-600x800.jpg',
    'lol': 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-600x800.jpg',
    'pubg mobile': 'https://static-cdn.jtvnw.net/ttv-boxart/PUBG%20MOBILE-600x800.jpg',
    'pubg': 'https://static-cdn.jtvnw.net/ttv-boxart/PUBG:%20BATTLEGROUNDS-600x800.jpg',
    'mobile legends': 'https://static-cdn.jtvnw.net/ttv-boxart/Mobile%20Legends:%20Bang%20Bang-600x800.jpg',
    'mlbb': 'https://static-cdn.jtvnw.net/ttv-boxart/Mobile%20Legends:%20Bang%20Bang-600x800.jpg',
    'teamfight tactics': 'https://static-cdn.jtvnw.net/ttv-boxart/Teamfight%20Tactics-600x800.jpg',
    'tft': 'https://static-cdn.jtvnw.net/ttv-boxart/Teamfight%20Tactics-600x800.jpg',
    'ea fc': 'https://cdn.akamai.steamstatic.com/steam/apps/2195250/library_600x900_2x.jpg',
    'rust': 'https://static-cdn.jtvnw.net/ttv-boxart/Rust-600x800.jpg',
    'genshin impact': 'https://static-cdn.jtvnw.net/ttv-boxart/Genshin%20Impact-600x800.jpg',
    'gta 5': 'https://static-cdn.jtvnw.net/ttv-boxart/Grand%20Theft%20Auto%20V-600x800.jpg',
    'gta5': 'https://static-cdn.jtvnw.net/ttv-boxart/Grand%20Theft%20Auto%20V-600x800.jpg',
    'rocket league': 'https://static-cdn.jtvnw.net/ttv-boxart/Rocket%20League-600x800.jpg',
    'fortnite': 'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-600x800.jpg',
    'efootball': 'https://cdn.akamai.steamstatic.com/steam/apps/1665460/library_600x900_2x.jpg',
    'wild rift': 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends:%20Wild%20Rift-600x800.jpg',
    'honor of kings': 'https://static-cdn.jtvnw.net/ttv-boxart/Honor%20of%20Kings-600x800.jpg',
    'overwatch': 'https://static-cdn.jtvnw.net/ttv-boxart/Overwatch%202-600x800.jpg',
    'overwatch 2': 'https://static-cdn.jtvnw.net/ttv-boxart/Overwatch%202-600x800.jpg',
    'apex legends': 'https://static-cdn.jtvnw.net/ttv-boxart/Apex%20Legends-600x800.jpg',
    'rainbow six': 'https://static-cdn.jtvnw.net/ttv-boxart/Tom%20Clancy\'s%20Rainbow%20Six%20Siege-600x800.jpg',
    'r6': 'https://static-cdn.jtvnw.net/ttv-boxart/Tom%20Clancy\'s%20Rainbow%20Six%20Siege-600x800.jpg',
  };

  const getCover = (gameName: string) => {
    const key = gameName.toLowerCase();
    return coverMap[key] || coverMap[key.split(' ')[0]] || 'https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-600x800.jpg';
  };

  let crews: any[] = [];
  try {
    const dbCrews = await prisma.crew.findMany({
      include: {
        game: true,
        _count: { select: { members: true } }
      }
    });

    if (dbCrews.length > 0) {
      crews = dbCrews.map(c => {
        const gameName = c.game?.name || 'Espor';
        return {
          id: c.id,
          name: `${gameName} Ekibi`,
          slug: c.slug,
          game: gameName,
          memberCount: c._count.members,
          cover: getCover(gameName),
        };
      });
    } else {
      crews = mockCrews;
    }
  } catch (error) {
    crews = mockCrews;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mt-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
          OYUN EKİPLERİ
        </h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Topluluğumuzdaki oyun ekiplerini keşfet ve takım arkadaşları bul
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {crews.map(crew => (
          <Link key={crew.id} href={isAuthenticated ? `/crews/${crew.slug}` : `/login`}>
            <div 
              className="relative h-64 rounded-xl overflow-hidden group cursor-pointer border border-white/10 hover:border-primary-red/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,31,45,0.2)]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${crew.cover})` }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold font-heading text-white mb-2 leading-tight drop-shadow-lg">
                  {crew.name}
                </h3>
                
                <div className="flex items-center text-sm font-bold text-white drop-shadow-md">
                  {isAuthenticated ? (
                    <div className="flex items-center bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                      <Users className="w-4 h-4 mr-2 text-white/70" />
                      {crew.memberCount} Üye
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center self-start bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 text-white/70">
                        <Lock className="w-3 h-3 mr-2" />
                        Üye Sayısı Gizli
                      </div>
                      <div className="text-xs text-white/60 font-medium">
                        Ekibi görüntülemek ve katılmak için ATE ID oluştur
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
