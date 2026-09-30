import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const c = await prisma.school.count();
  const u = await prisma.university.count();
  console.log('Schools:', c, 'Universities:', u);
}
main().finally(() => prisma.$disconnect());
