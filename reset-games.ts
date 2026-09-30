import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const finalGames = [
  { name: 'Valorant', slug: 'valorant', category: 'PC' },
  { name: 'Counter-Strike 2', slug: 'counter-strike-2', category: 'PC' },
  { name: 'League of Legends', slug: 'league-of-legends', category: 'PC' },
  { name: 'PUBG', slug: 'pubg', category: 'PC' },
  { name: 'PUBG Mobile', slug: 'pubg-mobile', category: 'MOBILE' },
  { name: 'Mobile Legends', slug: 'mobile-legends', category: 'MOBILE' },
  { name: 'Teamfight Tactics', slug: 'teamfight-tactics', category: 'PC' },
  { name: 'EA FC', slug: 'ea-fc', category: 'CONSOLE' },
  { name: 'Rust', slug: 'rust', category: 'PC' },
  { name: 'Genshin Impact', slug: 'genshin-impact', category: 'CROSS_PLATFORM' },
  { name: 'GTA 5', slug: 'gta-5', category: 'PC' },
  { name: 'Rocket League', slug: 'rocket-league', category: 'CROSS_PLATFORM' },
  { name: 'Fortnite', slug: 'fortnite', category: 'CROSS_PLATFORM' },
  { name: 'eFootball', slug: 'efootball', category: 'CONSOLE' },
  { name: 'Wild Rift', slug: 'wild-rift', category: 'MOBILE' },
];

async function main() {
  // Clear existing crews and games
  await prisma.crew.deleteMany({});
  await prisma.game.deleteMany({});

  for (const g of finalGames) {
    const game = await prisma.game.create({
      data: {
        name: g.name,
        slug: g.slug,
        category: g.category as any,
        isActive: true,
      }
    });

    const crewName = g.name + ' Ekibi';
    const crewSlug = g.slug + '-ekibi';
    await prisma.crew.create({
      data: {
        name: crewName,
        slug: crewSlug,
        gameId: game.id,
        description: 'ATE ' + g.name + ' resmi topluluk ekibi.',
      }
    });
  }

  console.log('15 games and crews seeded correctly!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
