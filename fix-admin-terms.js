const fs = require('fs');

// Fix admin-sidebar.tsx
let sidebar = fs.readFileSync('src/components/layout/admin-sidebar.tsx', 'utf8');
sidebar = sidebar.replace("label: 'Kullanıcılar'", "label: 'Üyeler'");
fs.writeFileSync('src/components/layout/admin-sidebar.tsx', sidebar, 'utf8');

// Fix /admin/users/page.tsx
if (fs.existsSync('src/app/admin/users/page.tsx')) {
  let usersPage = fs.readFileSync('src/app/admin/users/page.tsx', 'utf8');
  usersPage = usersPage.replace('KULLANICI YÖNETİMİ', 'ÜYE YÖNETİMİ');
  usersPage = usersPage.replace('Kullanıcı Yönetimi', 'Üye Yönetimi');
  usersPage = usersPage.replace('Toplam Kullanıcı', 'Toplam Üye');
  usersPage = usersPage.replace('Banlı Kullanıcı', 'Banlı Üye');
  usersPage = usersPage.replace('Kullanıcı ara', 'Üye ara');
  usersPage = usersPage.replace('KULLANICI', 'ÜYE');
  fs.writeFileSync('src/app/admin/users/page.tsx', usersPage, 'utf8');
}

// Fix /admin/players/page.tsx
if (fs.existsSync('src/app/admin/players/page.tsx')) {
  let playersPage = fs.readFileSync('src/app/admin/players/page.tsx', 'utf8');
  // Update query to include teamMembers: { some: {} }
  playersPage = playersPage.replace(
    'const rawUsers = await prisma.user.findMany({',
    const rawUsers = await prisma.user.findMany({
      where: {
        teamMembers: { some: {} }
      },
  );
  playersPage = playersPage.replace('Sistemdeki Oyuncular', 'Takım Oyuncuları');
  fs.writeFileSync('src/app/admin/players/page.tsx', playersPage, 'utf8');
}

console.log('Done');
