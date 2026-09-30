import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const games = [
    { name: 'Mobile Legends', slug: 'mobile-legends', category: 'MOBILE', crew: 'ATE MOBILE LEGENDS' },
    { name: 'Honor of Kings', slug: 'honor-of-kings', category: 'MOBILE', crew: 'ATE HONOR OF KINGS' },
    { name: 'eFootball', slug: 'efootball', category: 'CONSOLE', crew: 'ATE EFOOTBALL' },
    { name: 'Teamfight Tactics', slug: 'tft', category: 'PC', crew: 'ATE TFT' },
    { name: 'Wild Rift', slug: 'wild-rift', category: 'MOBILE', crew: 'ATE WILD RIFT' },
    { name: 'Rainbow Six Siege', slug: 'r6', category: 'PC', crew: 'ATE R6' },
    { name: 'Rocket League', slug: 'rocket-league', category: 'CROSS_PLATFORM', crew: 'ATE ROCKET LEAGUE' },
    { name: 'Overwatch 2', slug: 'overwatch-2', category: 'PC', crew: 'ATE OVERWATCH' },
    { name: 'Apex Legends', slug: 'apex-legends', category: 'PC', crew: 'ATE APEX LEGENDS' },
    { name: 'Fortnite', slug: 'fortnite', category: 'CROSS_PLATFORM', crew: 'ATE FORTNITE' }
  ];

  for (const g of games) {
    const game = await prisma.game.upsert({
      where: { slug: g.slug },
      update: {},
      create: {
        name: g.name,
        slug: g.slug,
        category: g.category as any,
        isActive: true,
      },
    });

    const crewSlug = g.crew.toLowerCase().replace(/ /g, '-');
    await prisma.crew.upsert({
      where: { slug: crewSlug },
      update: {},
      create: {
        name: g.crew,
        slug: crewSlug,
        gameId: game.id,
        description: g.crew + ' resmi topluluk ekibi.',
      }
    });
  }
  
  console.log('Extra 10 crews added!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
