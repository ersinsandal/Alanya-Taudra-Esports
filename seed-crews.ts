import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mockCrews = [
  { name: 'VALORANT Ekibi', slug: 'valorant', game: 'VALORANT' },
  { name: 'Counter-Strike 2 Ekibi', slug: 'cs2', game: 'CS2' },
  { name: 'League of Legends Ekibi', slug: 'lol', game: 'League of Legends' },
  { name: 'PUBG: BATTLEGROUNDS Ekibi', slug: 'pubg', game: 'PUBG' },
  { name: 'PUBG Mobile Ekibi', slug: 'pubg-mobile', game: 'PUBG Mobile' },
  { name: 'Mobile Legends (MLBB) Ekibi', slug: 'mlbb', game: 'MLBB' },
  { name: 'Teamfight Tactics (TFT) Ekibi', slug: 'tft', game: 'TFT' },
  { name: 'EA FC Ekibi', slug: 'ea-fc', game: 'EA FC' },
  { name: 'Rust Ekibi', slug: 'rust', game: 'Rust' },
  { name: 'Genshin Impact Ekibi', slug: 'genshin', game: 'Genshin Impact' },
  { name: 'GTA 5 Roleplay Ekibi', slug: 'gta5', game: 'GTA 5' },
  { name: 'Rocket League Ekibi', slug: 'rocket-league', game: 'Rocket League' }
];

async function main() {
  console.log("Seeding games and crews...");
  
  for (const c of mockCrews) {
    let game = await prisma.game.findFirst({ where: { name: c.game } });
    if (!game) {
      game = await prisma.game.create({ data: { name: c.game, slug: c.slug + "-game" } });
    }

    const crew = await prisma.crew.findUnique({ where: { slug: c.slug } });
    if (!crew) {
      await prisma.crew.create({
        data: {
          name: c.name,
          slug: c.slug,
          gameId: game.id,
        }
      });
      console.log(`Created crew: ${c.name}`);
    } else {
      console.log(`Crew already exists: ${c.name}`);
    }
  }
  
  console.log("Done.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
