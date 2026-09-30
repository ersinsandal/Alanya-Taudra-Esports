import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function generateAteId() {
  return 'ATE-' + Math.floor(100000 + Math.random() * 900000).toString();
}

async function main() {
  console.log('Starting seed...');

  // 1. Roles
  const roles = [
    { name: 'SUPER_ADMIN', displayName: 'Super Admin', description: 'Kurucu/Sistem Yöneticisi', isSystem: true },
    { name: 'ADMIN', displayName: 'Yönetici', description: 'Tam yetkili yönetici', isSystem: true },
    { name: 'MODERATOR', displayName: 'Moderatör', description: 'İçerik yöneticisi', isSystem: true },
    { name: 'GAME_LEADER', displayName: 'Oyun Lideri', description: 'Branş yöneticisi', isSystem: true },
    { name: 'USER', displayName: 'Kullanıcı', description: 'Standart oyuncu', isSystem: true },
  ];

  const roleMap = new Map();
  for (const r of roles) {
    const role = await prisma.role.upsert({
      where: { name: r.name },
      update: {},
      create: r,
    });
    roleMap.set(r.name, role);
  }
  console.log('Roles created.');

  // 2. Test Accounts
  const testUsers = [
    { user: 'super_admin', email: 'admin@ate.gg', pass: 'ChangeMeInProduction123!', role: 'SUPER_ADMIN', first: 'Super', last: 'Admin' },
    { user: 'admin_kaan', email: 'admin@ate-esports.com', pass: 'password123', role: 'ADMIN', first: 'Kaan', last: 'Admin' },
    { user: 'mod_selin', email: 'mod@ate.gg', pass: 'password123', role: 'MODERATOR', first: 'Selin', last: 'Mod' },
    { user: 'leader_valorant', email: 'valorant@ate.gg', pass: 'password123', role: 'GAME_LEADER', first: 'Valorant', last: 'Lideri' },
    { user: 'alp_fps', email: 'user@test.com', pass: 'password123', role: 'USER', first: 'Alperen', last: 'Yılmaz' },
  ];

  for (const u of testUsers) {
    const hashedPassword = await bcrypt.hash(u.pass, 10);
    const ateId = generateAteId();
    
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        passwordHash: hashedPassword,
      },
      create: {
        email: u.email,
        username: u.user,
        passwordHash: hashedPassword,
        ateId,
        emailVerified: true,
        profile: {
          create: {
            firstName: u.first,
            lastName: u.last,
            country: 'Türkiye',
            city: 'Antalya',
            isAlanya: true,
            profileCompleted: true,
          }
        }
      },
    });

    const roleObj = roleMap.get(u.role);
    if (roleObj) {
      await prisma.userRole.upsert({
        where: { userId_roleId: { userId: user.id, roleId: roleObj.id } },
        update: {},
        create: { userId: user.id, roleId: roleObj.id },
      });
    }
  }
  console.log('Test accounts created.');

  // 3. Games & Crews
  const games = [
    { name: 'Valorant', slug: 'valorant', category: 'PC', crew: 'ATE VALORANT' },
    { name: 'League of Legends', slug: 'league-of-legends', category: 'PC', crew: 'ATE LOL' },
    { name: 'EA FC', slug: 'ea-fc', category: 'CONSOLE', crew: 'ATE EA FC' },
    { name: 'Counter-Strike 2', slug: 'cs2', category: 'PC', crew: 'ATE CS2' },
    { name: 'PUBG Mobile', slug: 'pubg-mobile', category: 'MOBILE', crew: 'ATE PUBG MOBILE' },
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
  console.log('Games and Crews created.');

  // 4. Schools
  const schools = [
    "Alanya Alaaddin Keykubat Üniversitesi (ALKÜ)",
    "Alanya Üniversitesi",
    "Alanya Lisesi",
    "Alanya Anadolu Lisesi",
    "Hasan Çolak Anadolu Lisesi",
    "Oba Nazmi Yılmaz Anadolu Lisesi",
    "Türkler İMKB Sosyal Bilimler Lisesi",
    "Nezihe Soydan Mesleki ve Teknik Anadolu Lisesi",
    "Alanya Mesleki ve Teknik Anadolu Lisesi",
    "Alanya Ümit Altay Mesleki ve Teknik Anadolu Lisesi",
    "Fevzi Alaettinoğlu Anadolu Lisesi",
    "Alanya Kız Anadolu İmam Hatip Lisesi",
    "Alanya Anadolu İmam Hatip Lisesi",
    "Avsallar Anadolu Lisesi",
    "Konaklı Kemal Atlı Anadolu Lisesi",
    "Mahmutlar Şükrü Kaptanoğlu Anadolu Lisesi",
    "Nizamettin Sezen Mesleki ve Teknik Anadolu Lisesi",
    "Berat-Hayriye Cömertoğlu Çok Programlı Anadolu Lisesi",
    "Demirtaş Çok Programlı Anadolu Lisesi",
    "Mevlüt Çavuşoğlu Spor Lisesi",
    "Bahçeşehir Koleji Alanya",
    "Doğa Koleji Alanya",
    "Alanya TED Koleji",
    "Özel Alanya Yedi Bilim Anadolu Lisesi",
    "Özel Alanya Sınav Anadolu Lisesi",
    "Özel Ufuk Anadolu Lisesi"
  ];

  for (const s of schools) {
    const slug = s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const isUni = s.includes('Üniversitesi');
    
    if (isUni) {
      await prisma.university.upsert({
        where: { slug },
        update: {},
        create: {
          name: s,
          slug,
          type: 'STATE',
          city: 'Antalya'
        }
      });
    } else {
      await prisma.school.upsert({
        where: { slug },
        update: {},
        create: {
          name: s,
          slug,
          type: s.includes('Özel') || s.includes('Koleji') ? 'PRIVATE' : 'PUBLIC',
          district: 'Alanya',
          city: 'Antalya'
        }
      });
    }
  }
  console.log('Schools created.');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
