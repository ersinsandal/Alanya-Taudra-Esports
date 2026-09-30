import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const allSchools = [
    { name: 'Alanya Lisesi', type: 'PUBLIC' },
    { name: 'Hasan Çolak Anadolu Lisesi', type: 'PUBLIC' },
    { name: 'Fevzi Alaettinoğlu Anadolu Lisesi', type: 'PUBLIC' },
    { name: 'Oba Nazmi Yılmaz Anadolu Lisesi', type: 'PUBLIC' },
    { name: 'Türkler İMKB Sosyal Bilimler Lisesi', type: 'PUBLIC' },
    { name: 'Hüseyin Girenes Fen Lisesi', type: 'PUBLIC' },
    { name: 'Nimet Alaettinoğlu Anadolu Lisesi', type: 'PUBLIC' },
    { name: 'Alanya Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
    { name: 'Ümit Altay Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
    { name: 'Nezahat-Abdullah Doğan İlkokulu (Lise Bölümü)', type: 'PUBLIC' },
    { name: 'Cemile Kuyumcu Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
    { name: 'Berat-Hayriye Cömertoğlu Çok Programlı Anadolu Lisesi', type: 'PUBLIC' },
    { name: 'Eczacı Güzin-Velittin Bekrioğlu Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
    { name: 'Konaklı Kemal Atlı Lisesi', type: 'PUBLIC' },
    { name: 'Avsallar Halil Kemal Osmanlı Lisesi', type: 'PUBLIC' },
    { name: 'Mahmutlar Şükrü Kaptanoğlu Anadolu Lisesi', type: 'PUBLIC' },
    { name: 'Demirtaş Lisesi', type: 'PUBLIC' },
    { name: 'Kestel Akdeniz Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
    { name: 'Tosmur Fatma Özmüftüoğlu İmam Hatip Lisesi', type: 'PUBLIC' },
    { name: 'Alanya Anadolu İmam Hatip Lisesi', type: 'PUBLIC' },
    { name: 'Mevlüt Çavuşoğlu Spor Lisesi', type: 'PUBLIC' },
    { name: 'Nezihe Soydan Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC' },
    
    // PRIVATE
    { name: 'Alanya Doğa Koleji', type: 'PRIVATE' },
    { name: 'Alanya Bahçeşehir Koleji', type: 'PRIVATE' },
    { name: 'Özel Alanya Bil Koleji', type: 'PRIVATE' },
    { name: 'Özel Alanya İsabet Okulları', type: 'PRIVATE' },
    { name: 'Özel Alanya Yaşam Tasarım Koleji', type: 'PRIVATE' },
    { name: 'Özel Alanya Waldorf Okulları', type: 'PRIVATE' },
    { name: 'Özel Yedi Bilim Koleji', type: 'PRIVATE' },
    { name: 'Özel Alanya Final Akademi Okulları', type: 'PRIVATE' },
    { name: 'Özel Uğur Okulları Alanya', type: 'PRIVATE' },
    { name: 'Özel Oba Maya Okulları', type: 'PRIVATE' },
    { name: 'Özel TED Alanya Koleji', type: 'PRIVATE' },
    { name: 'Özel Alanya Bilim ve İnovasyon Okulları', type: 'PRIVATE' },
    { name: 'Özel Açı Okulları Alanya', type: 'PRIVATE' },
    { name: 'Özel Sistem Koleji Alanya', type: 'PRIVATE' },
    { name: 'Özel Başkent Okulları Alanya', type: 'PRIVATE' },
    { name: 'Özel Ekol Okulları', type: 'PRIVATE' },
    { name: 'Özel Sınav Koleji Alanya', type: 'PRIVATE' },
    { name: 'Özel Boğaziçi Koleji', type: 'PRIVATE' },
    { name: 'Özel İstek Okulları Alanya', type: 'PRIVATE' },
    { name: 'Özel Okyanus Koleji Alanya', type: 'PRIVATE' },
    { name: 'Özel Kültür Okulları Alanya', type: 'PRIVATE' },
    { name: 'Alanya Alaaddin Keykubat Üniversitesi (ALKÜ)', type: 'UNIVERSITY' },
    { name: 'Alanya Üniversitesi', type: 'UNIVERSITY' }
  ];

  for (const s of allSchools) {
    const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    if (s.type === 'UNIVERSITY') {
      await prisma.university.upsert({
        where: { slug },
        update: {},
        create: {
          name: s.name,
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
          name: s.name,
          slug,
          type: s.type as any,
          district: 'Alanya',
          city: 'Antalya'
        }
      });
    }
  }
  
  console.log('All 48 schools injected.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
