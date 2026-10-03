import { HeroSection } from '@/components/features/home/hero-section';
import { NextMatch } from '@/components/features/home/next-match';
import { StatsSection } from '@/components/features/home/stats-section';
import { CrewsSection } from '@/components/features/home/crews-section';
import { TournamentsSection } from '@/components/features/home/tournaments-section';
import { NewsSection } from '@/components/features/home/news-section';
import { JoinSection } from '@/components/features/home/join-section';
import { PartnersSection } from '@/components/features/home/partners-section';
import { prisma } from '@/lib/db';
import { mockCrews } from '@/lib/data/mock-crews';

export default async function HomePage() {
  let stats = { members: 0, players: 0, schools: 0, crews: 0, tournaments: 0, events: 0 };
  let crews: any[] = [];
  let tournaments: any[] = [];
  let news: any[] = [];
  let sponsors: any[] = [];
  let nextMatch = null;

  try {
    const [memberCount, schoolCount, uniCount, crewCount, tourneyCount, upcomingMatch] = await Promise.all([
      prisma.user.count(),
      prisma.school.count(),
      prisma.university.count(),
      prisma.crew.count(),
      prisma.tournament.count(),
      prisma.match.findFirst({
        where: { scheduledAt: { gte: new Date() } },
        orderBy: { scheduledAt: 'asc' },
        include: { teamA: true, teamB: true, tournament: true }
      })
    ]);

    if (upcomingMatch) {
      nextMatch = upcomingMatch;
    }

    stats = {
      members: memberCount,
      players: memberCount, // Same for now
      schools: schoolCount + uniCount,
      crews: crewCount,
      tournaments: tourneyCount,
      events: 0 // Placeholder until we have events model mapped properly
    };

    const homeCoverMap: Record<string, string> = {
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
    const getHomeCover = (gameName: string) =>
      homeCoverMap[gameName.toLowerCase()] || 'https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-600x800.jpg';

    const dbCrews = await prisma.crew.findMany({ 
      where: {
        game: {
          slug: { in: ['league-of-legends', 'valorant', 'counter-strike-2', 'ea-fc'] }
        }
      },
      take: 4, 
      select: { id: true, name: true, slug: true, _count: { select: { members: true } }, game: { select: { name: true, slug: true } } } 
    });
    
    if (dbCrews.length > 0) {
      crews = dbCrews.map((c: any) => ({
        id: c.id,
        name: (c.game?.name || c.name) + ' Ekibi',
        game: c.game?.name || 'Espor',
        memberCount: c._count.members,
        slug: c.slug,
        cover: getHomeCover(c.game?.name || '')
      }));
    } else {
      crews = mockCrews.slice(0, 4);
    }


    const dbTournaments = await prisma.tournament.findMany({
      take: 3,
      orderBy: { startDate: 'asc' },
      where: { status: { in: ['UPCOMING', 'LIVE'] } }
    });
    tournaments = dbTournaments.map(t => ({
      id: t.id,
      name: t.name,
      game: 'Espor', 
      date: t.startDate,
      status: t.status,
      teamCount: t.maxTeams,
      slug: t.slug
    }));

    const dbNews = await prisma.newsPost.findMany({
      take: 3,
      orderBy: { publishDate: 'desc' },
      where: { isDraft: false }
    });
    news = dbNews.map(n => ({
      id: n.id,
      title: n.title,
      excerpt: n.excerpt,
      coverImage: n.coverImage,
      category: n.category,
      publishedAt: n.publishDate,
      slug: n.slug
    }));

    sponsors = await prisma.sponsor.findMany({
      where: { isActive: true },
      take: 6
    });

  } catch (error) {
    console.warn("DB Error on HomePage, using fallback data for crews.");
    crews = mockCrews.slice(0, 4);
  }

  return (
    <main className="min-h-screen">
      <HeroSection />
      {nextMatch && <NextMatch match={nextMatch} />}
      <StatsSection stats={stats} />
      <CrewsSection crews={crews} />
      <TournamentsSection tournaments={tournaments} />
      <NewsSection news={news} />
      <JoinSection />
      {sponsors.length > 0 && <PartnersSection sponsors={sponsors} />}
    </main>
  );
}
