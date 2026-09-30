# Alanya Taudra Esports (ATE) Digital Arena

![ATE Digital Arena](https://via.placeholder.com/1200x400/050505/D00000?text=ATE+DIGITAL+ARENA)

> **"THEY PLAYED, WE ATE."**  
> *Alanya'dan Arena'ya — Rekabetçi Oyun ve Yetenek Keşfi İçin Birleşik Dijital Altyapı.*

Bu dokümanı başka bir dilde okuyun:  
🇺🇸 [English Documentation (README.md)](./README.md)

---

## 📌 Özet

ATE Digital Arena, **Alanya Taudra Esports** için geliştirilmiş tam kapsamlı rekabetçi bir espor platformudur. En modern web teknolojileri ile inşa edilen bu platform; oyuncular, takımlar, üniversite ligleri ve yöneticiler için merkezi bir üs görevi görür.

Platform; takım yönetimi, gerçek zamanlı bildirimler, gizlilik odaklı sosyal profiller, gelişmiş admin panelleri ve dinamik etkinlik/scrim planlama araçlarını kusursuz bir şekilde entegre eder.

## 🚀 Temel Özellikler

### 👤 Oyuncu ve Sosyal Ekosistem
- **Dinamik Kullanıcı Profilleri:** Başarımları, maç geçmişini ve kayıtlı oyun ID'lerini (Valorant, CS2, LoL vb.) sergileyin.
- **Gizlilik Ayarları:** Kullanıcılar Discord ve telefon numaralarının görünürlüğünü yönetebilir (Herkes, Sadece Takım Arkadaşları, Gizli).
- **Otomatik İlerleme:** Platform içi aktiviteler otomatik olarak ATE puanı ve başarım kazandırır.

### 🎮 Takım ve Ekip Yönetimi
- **Oyun Ekipleri (Crews):** Büyük oyunlar için özel topluluk kolları (Valorant, CS2, League of Legends, EA FC vb.).
- **Başvuru Sistemi:** Ekip Lideri ve Takım Oyuncusu adayları için otomatik başvuru ve inceleme süreçleri.
- **Scrim ve Maçlar:** Antrenman maçları (scrim) ayarlama ve resmi turnuva sonuçlarını takip etme.

### 🔔 Gerçek Zamanlı Bildirimler
- **Sistem İçi Uyarılar:** Takım başvuruları onaylandığında/reddedildiğinde veya turnuvalar başlamak üzereyken anında bildirim alın.
- **Akıllı Gelen Kutusu:** Navbar üzerinden tüm platform bildirimlerini okuyun, filtreleyin ve yönetin.

### 🛡️ Kapsamlı Yönetim (Admin) Paneli
- **Veri Odaklı Dashboard:** Kullanıcı büyümesi, maç sonuçları ve aktif başvurular hakkında gerçek zamanlı veriler.
- **Rapor ve Moderasyon Sistemi:** Kullanıcı şikayetlerini, profil ismi değiştirme taleplerini ve toksik davranış raporlarını tek bir ekrandan yönetin.
- **Rol Tabanlı Erişim:** Moderatör, Admin ve Süper Adminler için özel yetkilendirmeler.

## 🛠️ Teknoloji Yığını

- **Framework:** Next.js 15 (App Router, Server Components, Turbopack)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS v4, Lucide React Icons
- **Veritabanı:** PostgreSQL
- **ORM:** Prisma
- **UI Bileşenleri:** Radix UI altyapısı & Özel Tasarım Sistemi (Space Grotesk + Inter)

## 📦 Kurulum

1. **Repoyu klonlayın:**
   \\\ash
   git clone https://github.com/ersinsandal/Alanya-Taudra-Esports.git
   cd Alanya-Taudra-Esports
   \\\

2. **Bağımlılıkları yükleyin:**
   \\\ash
   npm install
   \\\

3. **Ortam (Environment) Ayarları:**
   Ana dizinde bir \.env\ dosyası oluşturun ve PostgreSQL bağlantı adresinizi ekleyin:
   \\\env
   DATABASE_URL="postgresql://user:password@localhost:5432/atedb"
   \\\

4. **Veritabanı Senkronizasyonu ve Seed:**
   \\\ash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   \\\

5. **Geliştirme sunucusunu başlatın:**
   \\\ash
   npm run dev
   \\\
   Uygulamayı görüntülemek için \http://localhost:3000\ adresine gidin.

## 📄 Lisans
Tüm hakları Alanya Taudra Esports'a aittir.
