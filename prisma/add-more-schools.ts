import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const newSchools = [
    '15 Temmuz Şehitler Anadolu Lisesi',
    'Alanya Mehmet Arif Türktaş Anadolu Lisesi',
    'Kestel Sultan Alparslan Anadolu Lisesi',
    'Mustafa-Mürüvvet Alaattinoğlu Anadolu Lisesi',
    'Şehit Abdullah Ümit Sercan Anadolu Lisesi',
    'Arıkan Yılmaz Dim Mesleki ve Teknik Anadolu Lisesi',
    'Avsallar Recep Karaca Çok Programlı Anadolu Lisesi',
    'Emine Gümrükçüler Turizm Mesleki ve Teknik Anadolu Lisesi',
    'İrfan Bileydi Mesleki ve Teknik Anadolu Lisesi',
    'Okurcalar Çok Programlı Anadolu Lisesi',
    'Payallar Çok Programlı Anadolu Lisesi',
    'Rıfat Azakoğlu Mesleki ve Teknik Anadolu Lisesi',
    'Türkler Borsa İstanbul Sosyal Bilimler Lisesi',
    'Türkler Güzel Sanatlar Lisesi',
    'Emine Ahmet Uysal Teknoloji Anadolu İmam Hatip Lisesi',
    'Nebahat Şifa Anadolu İmam Hatip Lisesi',
    'Alanya Şehit Ömer Halisdemir Anadolu Lisesi',
    'Gazipaşa Merkez Anadolu Lisesi',
    'Gazipaşa Zeliha Tuncer İmam Hatip Lisesi',
    'Özel Uğur Okulları Lisesi',
    'Özel Tema Lisesi',
    'Özel Bilgi Bulut Lisesi',
    'Özel Alanya Açı Lisesi',
    'Özel Alanya İstek Lisesi',
    'Özel Yönder Lisesi',
    'Özel Final Lisesi',
    'Özel Doğa Lisesi'
  ];

  let added = 0;
  for (const name of newSchools) {
    const count = await prisma.school.count();
    if (count >= 48) break; // Don't exceed 48 schools
    
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const type = name.includes('Özel') ? 'PRIVATE' : 'PUBLIC';
    
    try {
      await prisma.school.upsert({
        where: { slug },
        update: {},
        create: {
          name,
          slug,
          type,
          district: 'Alanya',
          city: 'Antalya'
        }
      });
      added++;
    } catch(e) { }
  }
  
  const finalCount = await prisma.school.count();
  console.log('Added ' + added + ' new schools. Total is now ' + finalCount);
}

main().catch(console.error).finally(() => prisma.$disconnect());
