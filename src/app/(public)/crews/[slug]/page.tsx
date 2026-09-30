import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { notFound } from 'next/navigation';
import CrewClient from './crew-client';

export default async function CrewDetailsPage({ params }: { params: { slug: string } }) {
  const user = await getCurrentUser();
  const slug = params.slug;

  const crew = await prisma.crew.findUnique({
    where: { slug },
    include: {
      game: true,
      members: {
        include: {
          user: {
            include: { profile: { include: { school: true, university: true } } }
          }
        }
      },
      leaders: {
        include: {
          user: {
            include: { profile: { include: { school: true, university: true } } }
          }
        }
      }
    }
  });

  if (!crew) {
    notFound();
  }

  // Cover image mapping logic from crews list
  const coverMap: Record<string, string> = {
    'valorant': 'https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-600x800.jpg',
    'counter-strike 2': 'https://cdn.akamai.steamstatic.com/steam/apps/730/library_600x900_2x.jpg',
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
  };

  const getCover = (gameName: string) => coverMap[gameName.toLowerCase()] || 'https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-600x800.jpg';

  const leaderIds = new Set(crew.leaders.map((l: any) => l.userId));

  const mappedCrew = {
    id: crew.id,
    name: crew.name.includes('Ekibi') ? crew.name : crew.game.name + ' Ekibi',
    game: crew.game.name,
    cover: getCover(crew.game.name),
    members: crew.members.map((m: any) => ({
      id: m.user.id,
      name: `${m.user.profile?.firstName || ''} ${m.user.profile?.lastName || ''}`.trim() || m.user.username,
      username: m.user.username,
      school: m.user.profile?.school?.name || m.user.profile?.university?.name || '-',
      avatar: m.user.profile?.avatarUrl,
      role: leaderIds.has(m.userId) ? 'Lider' : 'Üye'
    }))
  };

  return <CrewClient crew={mappedCrew} user={user} />;
}
