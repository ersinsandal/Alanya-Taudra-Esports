const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mockSchools = [
  // STATE (PUBLIC)
  { name: 'Alanya Lisesi', type: 'PUBLIC', slug: 'alanya-lisesi' },
  { name: 'Hasan Çolak Anadolu Lisesi', type: 'PUBLIC', slug: 'hasan-colak-anadolu' },
  { name: 'Fevzi Alaettinoğlu Anadolu Lisesi', type: 'PUBLIC', slug: 'fevzi-alaettinoglu' },
  { name: 'Oba Nazmi Yılmaz Anadolu Lisesi', type: 'PUBLIC', slug: 'oba-nazmi-yilmaz' },
  { name: 'Türkler İMKB Sosyal Bilimler Lisesi', type: 'PUBLIC', slug: 'turkler-imkb' },
  { name: 'Hüseyin Girenes Fen Lisesi', type: 'PUBLIC', slug: 'huseyin-girenes-fen' },
  { name: 'Nimet Alaettinoğlu Anadolu Lisesi', type: 'PUBLIC', slug: 'nimet-alaettinoglu' },
  { name: 'Alanya Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC', slug: 'alanya-mtal' },
  { name: 'Ümit Altay Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC', slug: 'umit-altay-mtal' },
  { name: 'Nezahat-Abdullah Doğan İlkokulu (Lise Bölümü)', type: 'PUBLIC', slug: 'nezahat-abdullah' },
  { name: 'Cemile Kuyumcu Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC', slug: 'cemile-kuyumcu-mtal' },
  { name: 'Berat-Hayriye Cömertoğlu Çok Programlı Anadolu Lisesi', type: 'PUBLIC', slug: 'berat-hayriye' },
  { name: 'Eczacı Güzin-Velittin Bekrioğlu Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC', slug: 'guzin-velittin-mtal' },
  { name: 'Konaklı Kemal Atlı Ortaokulu (Lise)', type: 'PUBLIC', slug: 'konakli-kemal-atli' },
  { name: 'Avsallar Halil Kemal Osmanlı Ortaokulu (Lise)', type: 'PUBLIC', slug: 'avsallar-hko' },
  { name: 'Mahmutlar Şükrü Kaptanoğlu Anadolu Lisesi', type: 'PUBLIC', slug: 'mahmutlar-sukru-kaptanoglu' },
  { name: 'Demirtaş Lisesi', type: 'PUBLIC', slug: 'demirtas-lisesi' },
  { name: 'Kestel Akdeniz Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC', slug: 'kestel-akdeniz' },
  { name: 'Tosmur Fatma Özmüftüoğlu İmam Hatip Lisesi', type: 'PUBLIC', slug: 'tosmur-fatma-ozmuftuoglu' },
  { name: 'Alanya Anadolu İmam Hatip Lisesi', type: 'PUBLIC', slug: 'alanya-aihl' },
  { name: 'Mevlüt Çavuşoğlu Spor Lisesi', type: 'PUBLIC', slug: 'mevlut-cavusoglu-spor' },
  { name: 'Nezihe Soydan Mesleki ve Teknik Anadolu Lisesi', type: 'PUBLIC', slug: 'nezihe-soydan-mtal' },
  
  // PRIVATE (ÖZEL)
  { name: 'Alanya Doğa Koleji', type: 'PRIVATE', slug: 'doga-koleji' },
  { name: 'Alanya Bahçeşehir Koleji', type: 'PRIVATE', slug: 'bahcesehir-koleji' },
  { name: 'Özel Alanya Bil Koleji', type: 'PRIVATE', slug: 'alanya-bil-koleji' },
  { name: 'Özel Alanya İsabet Okulları', type: 'PRIVATE', slug: 'isabet-okullari' },
  { name: 'Özel Alanya Yaşam Tasarım Koleji', type: 'PRIVATE', slug: 'yasam-tasarim' },
  { name: 'Özel Alanya Waldorf Okulları', type: 'PRIVATE', slug: 'waldorf-okullari' },
  { name: 'Özel Yedi Bilim Koleji', type: 'PRIVATE', slug: 'yedi-bilim' },
  { name: 'Özel Alanya Final Akademi Okulları', type: 'PRIVATE', slug: 'final-akademi' },
  { name: 'Özel Uğur Okulları Alanya', type: 'PRIVATE', slug: 'ugur-okullari' },
  { name: 'Özel Oba Maya Okulları', type: 'PRIVATE', slug: 'oba-maya' },
  { name: 'Özel TED Alanya Koleji', type: 'PRIVATE', slug: 'ted-alanya' },
  { name: 'Özel Alanya Bilim ve İnovasyon Okulları', type: 'PRIVATE', slug: 'bilim-inovasyon' },
  { name: 'Özel Açı Okulları Alanya', type: 'PRIVATE', slug: 'aci-okullari' },
  { name: 'Özel Sistem Koleji Alanya', type: 'PRIVATE', slug: 'sistem-koleji' },
  { name: 'Özel Başkent Okulları Alanya', type: 'PRIVATE', slug: 'baskent-okullari' },
  { name: 'Özel Ekol Okulları', type: 'PRIVATE', slug: 'ekol-okullari' },
  { name: 'Özel Sınav Koleji Alanya', type: 'PRIVATE', slug: 'sinav-koleji' },
  { name: 'Özel Boğaziçi Koleji', type: 'PRIVATE', slug: 'bogazici-koleji' },
  { name: 'Özel İstek Okulları Alanya', type: 'PRIVATE', slug: 'istek-okullari' },
  { name: 'Özel Okyanus Koleji Alanya', type: 'PRIVATE', slug: 'okyanus-koleji' },
  { name: 'Özel Kültür Okulları Alanya', type: 'PRIVATE', slug: 'kultur-okullari' },
  { name: 'Özel Amerikan Kültür Koleji Alanya', type: 'PRIVATE', slug: 'amerikan-kultur' },
  { name: 'Özel Era Koleji Alanya', type: 'PRIVATE', slug: 'era-koleji' },
  { name: 'Özel Doğa Bilim Koleji', type: 'PRIVATE', slug: 'doga-bilim' },
  { name: 'Özel Mektebim Koleji Alanya', type: 'PRIVATE', slug: 'mektebim-koleji' },
  { name: 'Özel Yönder Okulları Alanya', type: 'PRIVATE', slug: 'yonder-okullari' }
];

const mockUniversities = [
  { name: 'Alanya Alaaddin Keykubat Üniversitesi (ALKÜ)', type: 'STATE', slug: 'alku' },
  { name: 'Alanya Üniversitesi (AÜ)', type: 'FOUNDATION', slug: 'alanya-uni' }
];

async function main() {
  console.log("Seeding 48 Alanya Schools and Universities...");

  for (const s of mockSchools) {
    const school = await prisma.school.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        name: s.name,
        slug: s.slug,
        type: s.type,
      }
    });
    console.log(Upserted School: \);
  }

  for (const u of mockUniversities) {
    const uni = await prisma.university.upsert({
      where: { slug: u.slug },
      update: {},
      create: {
        name: u.name,
        slug: u.slug,
        type: u.type,
      }
    });
    console.log(Upserted University: \);
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.();
  });
