import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const correctSchools = [
  // STATE (PUBLIC)
  { name: '15 Temmuz Şehitler Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Alanya Lisesi', type: 'PUBLIC' },
  { name: 'Alanya Mehmet Arif Türktaş Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Fevzi Alaettinoğlu Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Hasan Çolak Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Kestel Sultan Alparslan Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Mahmutlar Şükrü Kaptanoğlu Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Mustafa-Mürüvvet Alaattinoğlu Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Nimet Alaettinoğlu Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Oba Nazmi Yılmaz Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Şehit Abdullah Ümit Sercan Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Alanya Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Nezihe Soydan Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Ümit Altay Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Arıkan Yılmaz Dim Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Avsallar Recep Karaca Çok Programlı Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Cemile Kuyumcu Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Demirtaş Çok Programlı Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Eczacı Güzin-Velittin Bekrioğlu Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Emine Gümrükçüler Turizm Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'İrfan Bileydi Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Okurcalar Çok Programlı Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Payallar Çok Programlı Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Rıfat Azakoğlu Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
  { name: 'Hüseyin Girenes Fen Lisesi', type: 'PUBLIC' },
  { name: 'Türkler Borsa İstanbul Sosyal Bilimler Lisesi', type: 'PUBLIC' },
  { name: 'Türkler Güzel Sanatlar Lisesi', type: 'PUBLIC' },
  { name: 'Alanya Kız Anadolu İmam Hatip Lisesi', type: 'PUBLIC' },
  { name: 'Emine Ahmet Uysal Teknoloji Anadolu İmam Hatip Lisesi', type: 'PUBLIC' },
  { name: 'Tosmur Fatma Özmüftüoğlu Anadolu İmam Hatip Lisesi', type: 'PUBLIC' },
  { name: 'Nebahat Şifa Anadolu İmam Hatip Lisesi', type: 'PUBLIC' },
  { name: 'Mevlüt Çavuşoğlu Spor Lisesi', type: 'PUBLIC' },

  // PRIVATE
  { name: 'Özel Alanya Doğa Lisesi', type: 'PRIVATE' },
  { name: 'Özel Alanya Bahçeşehir Koleji Lisesi', type: 'PRIVATE' },
  { name: 'Özel Alanya Bil Koleji Lisesi', type: 'PRIVATE' },
  { name: 'Özel Alanya İsabet Lisesi', type: 'PRIVATE' },
  { name: 'Özel Alanya Yaşam Tasarım Koleji Lisesi', type: 'PRIVATE' },
  { name: 'Özel Alanya Waldorf Lisesi', type: 'PRIVATE' },
  { name: 'Özel Yedi Bilim Lisesi', type: 'PRIVATE' },
  { name: 'Özel Alanya Final Akademi Lisesi', type: 'PRIVATE' },
  { name: 'Özel Uğur Lisesi Alanya', type: 'PRIVATE' },
  { name: 'Özel Oba Maya Lisesi', type: 'PRIVATE' },
  { name: 'Özel TED Alanya Lisesi', type: 'PRIVATE' },
  { name: 'Özel Alanya Bilim ve İnovasyon Lisesi', type: 'PRIVATE' },
  { name: 'Özel Açı Lisesi Alanya', type: 'PRIVATE' },
  { name: 'Özel Sistem Lisesi Alanya', type: 'PRIVATE' },
  { name: 'Özel Başkent Lisesi Alanya', type: 'PRIVATE' },
  { name: 'Özel Ekol Lisesi', type: 'PRIVATE' }
];

async function main() {
  await prisma.school.deleteMany({});
  
  for (const s of correctSchools) {
    const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    await prisma.school.create({
      data: {
        name: s.name,
        slug,
        type: s.type as any,
        district: 'Alanya',
        city: 'Antalya'
      }
    });
  }

  // Ensure Universities
  await prisma.university.deleteMany({});
  const unis = [
    { name: 'Alanya Alaaddin Keykubat Üniversitesi (ALKÜ)', type: 'STATE' },
    { name: 'Alanya Üniversitesi', type: 'FOUNDATION' }
  ];

  for (const u of unis) {
    const slug = u.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    await prisma.university.create({
      data: {
        name: u.name,
        slug,
        type: u.type as any,
        city: 'Antalya'
      }
    });
  }

  console.log('Fixed exactly 48 high schools and 2 unis');
}
main().catch(console.error).finally(() => prisma.$disconnect());
