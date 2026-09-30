import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const schools = await prisma.school.findMany({ select: { name: true } });
  console.log(schools.map(s => s.name).join('\n'));
}
main().finally(() => prisma.$disconnect());
