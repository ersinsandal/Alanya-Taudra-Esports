import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const games = await prisma.game.findMany({ select: { name: true, slug: true } });
  console.log(games.map(g => g.slug + ' => ' + g.name).join('\n'));
}
main().finally(() => prisma.$disconnect());
