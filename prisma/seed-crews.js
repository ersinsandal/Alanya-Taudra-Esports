const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');

async function main() {
  console.log("Seeding Games and Crews...");

  // Games
  const gamesData = [
    { name: "Valorant", slug: "valorant", category: "FPS" },
    { name: "Counter-Strike 2", slug: "cs2", category: "FPS" },
    { name: "League of Legends", slug: "lol", category: "MOBA" },
    { name: "PUBG: BATTLEGROUNDS", slug: "pubg", category: "BATTLE_ROYALE" },
    { name: "Mobile Legends", slug: "mlbb", category: "MOBILE" },
    { name: "Teamfight Tactics", slug: "tft", category: "STRATEGY" },
    { name: "EA FC", slug: "fc", category: "SPORTS" },
    { name: "Apex Legends", slug: "apex", category: "BATTLE_ROYALE" },
    { name: "Fortnite", slug: "fortnite", category: "BATTLE_ROYALE" },
    { name: "eFootball", slug: "efootball", category: "SPORTS" },
    { name: "Wild Rift", slug: "wild-rift", category: "MOBILE" },
  ];

  const dbGames = [];
  for (const g of gamesData) {
    const game = await prisma.game.upsert({
      where: { slug: g.slug },
      update: {},
      create: {
        name: g.name,
        slug: g.slug,
        category: g.category,
        isActive: true,
        rankStructure: {},
        roleOptions: {}
      }
    });
    dbGames.push(game);
  }

  // Create a dummy user as admin to own the crews
  const admin = await prisma.user.upsert({
    where: { username: 'AteAdmin' },
    update: {},
    create: {
      ateId: 'ATE-000-000000',
      email: 'admin@atedigitalarena.com',
      username: 'AteAdmin',
      passwordHash: 'dummy',
    }
  });

  // Crews
  const crewsData = [
    { name: 'VALORANT Ekibi', slug: 'valorant', gameSlug: 'valorant' },
    { name: 'Counter-Strike 2 Ekibi', slug: 'cs2', gameSlug: 'cs2' },
    { name: 'League of Legends Ekibi', slug: 'lol', gameSlug: 'lol' },
    { name: 'PUBG: BATTLEGROUNDS Ekibi', slug: 'pubg', gameSlug: 'pubg' },
    { name: 'Mobile Legends (MLBB) Ekibi', slug: 'mlbb', gameSlug: 'mlbb' },
    { name: 'Teamfight Tactics (TFT) Ekibi', slug: 'tft', gameSlug: 'tft' },
    { name: 'EA FC Ekibi', slug: 'fc', gameSlug: 'fc' },
    { name: 'Apex Legends Ekibi', slug: 'apex', gameSlug: 'apex' },
    { name: 'Fortnite Ekibi', slug: 'fortnite', gameSlug: 'fortnite' },
    { name: 'eFootball Ekibi', slug: 'efootball', gameSlug: 'efootball' },
    { name: 'Wild Rift Ekibi', slug: 'wild-rift', gameSlug: 'wild-rift' },
  ];

  for (const c of crewsData) {
    const game = dbGames.find(g => g.slug === c.gameSlug);
    if (!game) continue;

    const crew = await prisma.crew.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        name: c.name,
        slug: c.slug,
        gameId: game.id,
        createdById: admin.id,
        isOpen: true,
        verified: true,
        description: `${c.name} için resmi topluluk ekibi.`
      }
    });

    console.log(`Upserted Crew: ${crew.name}`);
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
