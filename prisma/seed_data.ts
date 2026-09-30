// Seed data draft - will be placed at prisma/seed.ts

// ============================================
// ALANYA HIGH SCHOOLS (48 schools)
// ============================================
export const alanyaSchools = [
  { name: "Alanya Mesleki ve Teknik Anadolu Lisesi", type: "PUBLIC" },
  { name: "Rıfat Azakoğlu Mesleki ve Teknik Anadolu Lisesi", type: "PUBLIC" },
  { name: "Alanya Nezihe Soydan Mesleki ve Teknik Anadolu Lisesi", type: "PUBLIC" },
  { name: "Arıkan Yılmaz Dim Mesleki ve Teknik Anadolu Lisesi", type: "PUBLIC" },
  { name: "Alanya Ümit Altay Mesleki ve Teknik Anadolu Lisesi", type: "PUBLIC" },
  { name: "Okurcalar Çok Programlı Anadolu Lisesi", type: "PUBLIC" },
  { name: "Demirtaş Çok Programlı Anadolu Lisesi", type: "PUBLIC" },
  { name: "Avsallar Recep Karaca Çok Programlı Anadolu Lisesi", type: "PUBLIC" },
  { name: "Cemile Kuyumcu Mesleki ve Teknik Anadolu Lisesi", type: "PUBLIC" },
  { name: "Eczacı Güzin-Velittin Bekrioğlu Mesleki ve Teknik Anadolu Lisesi", type: "PUBLIC" },
  { name: "Emine Gümrükçüler Turizm Mesleki ve Teknik Anadolu Lisesi", type: "PUBLIC" },
  { name: "İrfan Bileydi Mesleki ve Teknik Anadolu Lisesi", type: "PUBLIC" },
  { name: "Payallar Çok Programlı Anadolu Lisesi", type: "PUBLIC" },
  { name: "Feyzi Alaettinoğlu Anadolu Lisesi", type: "PUBLIC" },
  { name: "Oba Anadolu Lisesi", type: "PUBLIC" },
  { name: "Alanya Lisesi", type: "PUBLIC" },
  { name: "Alanya Mehmet Arif Türktaş Anadolu Lisesi", type: "PUBLIC" },
  { name: "Hasan Çolak Anadolu Lisesi", type: "PUBLIC" },
  { name: "Mahmutlar Anadolu Lisesi", type: "PUBLIC" },
  { name: "Mustafa-Mürüvvet Alaattinoğlu Anadolu Lisesi", type: "PUBLIC" },
  { name: "Nimet Alaettinoğlu Anadolu Lisesi", type: "PUBLIC" },
  { name: "Kestel Sultan Alparslan Anadolu Lisesi", type: "PUBLIC" },
  { name: "Oba Nazmi Yılmaz Anadolu Lisesi", type: "PUBLIC" },
  { name: "Şehit Abdullah Ümit Sercan Anadolu Lisesi", type: "PUBLIC" },
  { name: "15 Temmuz Şehitler Anadolu Lisesi", type: "PUBLIC" },
  { name: "Hüseyin Girenes Fen Lisesi", type: "PUBLIC" },
  { name: "Türkler Borsa İstanbul Sosyal Bilimler Lisesi", type: "PUBLIC" },
  { name: "Türkler Güzel Sanatlar Lisesi", type: "PUBLIC" },
  { name: "Alanya Kız Anadolu İmam Hatip Lisesi", type: "PUBLIC" },
  { name: "Emine Ahmet Uysal Teknoloji Anadolu Lisesi", type: "PUBLIC" },
  { name: "Nebahat Şifa Anadolu İmam Hatip Lisesi", type: "PUBLIC" },
  { name: "Fatma Özmüftüoğlu Anadolu İmam Hatip Lisesi", type: "PUBLIC" },
  { name: "Alanya Mevlüt Çavuşoğlu Spor Lisesi", type: "PUBLIC" },
  { name: "Demirtaş Anadolu İmam Hatip Lisesi", type: "PUBLIC" },
  { name: "Özel Doğa Fen Lisesi", type: "PRIVATE" },
  { name: "Özel Doğa Anadolu Lisesi", type: "PRIVATE" },
  { name: "Özel Alanya Bahçeşehir Koleji Fen ve Teknoloji Lisesi", type: "PRIVATE" },
  { name: "Özel Alanya Final Akademi Anadolu Lisesi", type: "PRIVATE" },
  { name: "Alanya Özel Hamdullah Eminpaşa Anadolu Lisesi", type: "PRIVATE" },
  { name: "Özel Alanya Oba Bahçeşehir Koleji Anadolu Lisesi", type: "PRIVATE" },
  { name: "Özel Klassika-M Uluslararası Lisesi", type: "PRIVATE" },
  { name: "TED Alanya Koleji Özel Lisesi", type: "PRIVATE" },
  { name: "Özel Alanya Yedi Bilim Anadolu Lisesi", type: "PRIVATE" },
  { name: "Özel Alanya Yedi Bilim Fen Lisesi", type: "PRIVATE" },
  { name: "Özel Yaşam Tasarım Fen Lisesi", type: "PRIVATE" },
  { name: "Özel Yaşam Tasarım Anadolu Lisesi", type: "PRIVATE" },
  { name: "Özel Yaşam Anadolu Lisesi", type: "PRIVATE" },
  { name: "Özel Eğitim İncisi Milletlerarası Lisesi", type: "PRIVATE" },
];

// ============================================
// UNIVERSITIES
// ============================================
export const universities = [
  { name: "Alanya Alaaddin Keykubat Üniversitesi", shortName: "ALKÜ" },
  { name: "Alanya Üniversitesi", shortName: "ALÜ" },
];

// ============================================
// SUPPORTED GAMES (13 games)
// ============================================
export const games = [
  {
    name: "VALORANT",
    slug: "valorant",
    category: "PC",
    icon: "⚔️",
    rankStructure: {
      tiers: ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ascendant", "Immortal", "Radiant"],
      divisions: ["I", "II", "III"]
    },
    roleOptions: ["Duelist", "Controller", "Initiator", "Sentinel"]
  },
  {
    name: "Counter-Strike 2",
    slug: "cs2",
    category: "PC",
    icon: "🔫",
    rankStructure: {
      tiers: ["Silver", "Gold Nova", "Master Guardian", "Legendary Eagle", "Supreme", "Global Elite"],
      divisions: ["I", "II", "III", "IV"]
    },
    roleOptions: ["Entry Fragger", "AWPer", "Support", "Lurker", "IGL"]
  },
  {
    name: "League of Legends",
    slug: "league-of-legends",
    category: "PC",
    icon: "🏰",
    rankStructure: {
      tiers: ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond", "Master", "Grandmaster", "Challenger"],
      divisions: ["IV", "III", "II", "I"]
    },
    roleOptions: ["Top", "Jungle", "Mid", "ADC", "Support"]
  },
  {
    name: "Teamfight Tactics",
    slug: "tft",
    category: "PC",
    icon: "♟️",
    rankStructure: {
      tiers: ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond", "Master", "Grandmaster", "Challenger"],
      divisions: ["IV", "III", "II", "I"]
    },
    roleOptions: []
  },
  {
    name: "Rocket League",
    slug: "rocket-league",
    category: "CROSS_PLATFORM",
    icon: "🚗",
    rankStructure: {
      tiers: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Champion", "Grand Champion", "Supersonic Legend"],
      divisions: ["I", "II", "III"]
    },
    roleOptions: ["Striker", "Midfielder", "Defender", "All-rounder"]
  },
  {
    name: "Fortnite",
    slug: "fortnite",
    category: "CROSS_PLATFORM",
    icon: "🏗️",
    rankStructure: {
      tiers: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Elite", "Champion", "Unreal"],
      divisions: ["I", "II", "III"]
    },
    roleOptions: ["Builder", "Fragger", "IGL", "Support"]
  },
  {
    name: "EA Sports FC",
    slug: "ea-fc",
    category: "CROSS_PLATFORM",
    icon: "⚽",
    rankStructure: {
      tiers: ["Division 10", "Division 9", "Division 8", "Division 7", "Division 6", "Division 5", "Division 4", "Division 3", "Division 2", "Division 1", "Elite"],
      divisions: []
    },
    roleOptions: []
  },
  {
    name: "PUBG",
    slug: "pubg",
    category: "PC",
    icon: "🎯",
    rankStructure: {
      tiers: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Crown", "Ace", "Conqueror"],
      divisions: ["V", "IV", "III", "II", "I"]
    },
    roleOptions: ["Fragger", "IGL", "Support", "Scout"]
  },
  {
    name: "PUBG Mobile",
    slug: "pubg-mobile",
    category: "MOBILE",
    icon: "📱",
    rankStructure: {
      tiers: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Crown", "Ace", "Conqueror"],
      divisions: ["V", "IV", "III", "II", "I"]
    },
    roleOptions: ["Fragger", "IGL", "Support", "Scout"]
  },
  {
    name: "Mobile Legends",
    slug: "mobile-legends",
    category: "MOBILE",
    icon: "📱",
    rankStructure: {
      tiers: ["Warrior", "Elite", "Master", "Grandmaster", "Epic", "Legend", "Mythic", "Mythical Glory", "Mythical Immortal"],
      divisions: ["IV", "III", "II", "I"]
    },
    roleOptions: ["Tank", "Fighter", "Assassin", "Mage", "Marksman", "Support"]
  },
  {
    name: "Brawl Stars",
    slug: "brawl-stars",
    category: "MOBILE",
    icon: "⭐",
    rankStructure: {
      tiers: ["Bronze", "Silver", "Gold", "Diamond", "Mythic", "Legendary", "Masters"],
      divisions: ["I", "II", "III"]
    },
    roleOptions: ["Tank", "Damage Dealer", "Support", "Assassin"]
  },
  {
    name: "Rainbow Six Siege",
    slug: "rainbow-six-siege",
    category: "PC",
    icon: "🛡️",
    rankStructure: {
      tiers: ["Copper", "Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond", "Champion"],
      divisions: ["V", "IV", "III", "II", "I"]
    },
    roleOptions: ["Entry", "Hard Breach", "Support", "Flex", "Anchor"]
  },
  {
    name: "Overwatch 2",
    slug: "overwatch-2",
    category: "PC",
    icon: "🦸",
    rankStructure: {
      tiers: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Champion"],
      divisions: ["5", "4", "3", "2", "1"]
    },
    roleOptions: ["Tank", "Damage", "Support"]
  }
];

// ============================================
// DEMO DATA
// ============================================
export const demoPlayers = [
  { username: "ATE.Raven", firstName: "Demo", lastName: "Raven", game: "valorant", rank: "Immortal I", role: "Duelist" },
  { username: "ATE.Nova", firstName: "Demo", lastName: "Nova", game: "valorant", rank: "Ascendant III", role: "Controller" },
  { username: "ATE.Volt", firstName: "Demo", lastName: "Volt", game: "cs2", rank: "Global Elite", role: "AWPer" },
  { username: "ATE.Phoenix", firstName: "Demo", lastName: "Phoenix", game: "league-of-legends", rank: "Diamond I", role: "Mid" },
  { username: "ATE.Storm", firstName: "Demo", lastName: "Storm", game: "valorant", rank: "Ascendant II", role: "Initiator" },
  { username: "ATE.Blade", firstName: "Demo", lastName: "Blade", game: "cs2", rank: "Supreme", role: "Entry Fragger" },
  { username: "ATE.Echo", firstName: "Demo", lastName: "Echo", game: "valorant", rank: "Ascendant I", role: "Sentinel" },
  { username: "ATE.Frost", firstName: "Demo", lastName: "Frost", game: "league-of-legends", rank: "Platinum II", role: "Support" },
];

export const demoTeams = [
  { name: "ATE VALORANT", tag: "ATE", game: "valorant", isOfficial: true },
  { name: "ATE CS2", tag: "ATE", game: "cs2", isOfficial: true },
  { name: "ATE Academy", tag: "ATEA", game: "valorant", isOfficial: true },
  { name: "ATE League of Legends", tag: "ATE", game: "league-of-legends", isOfficial: true },
];

export const defaultAchievements = [
  { name: "Kurucu Üye", slug: "founder", icon: "🏛️", description: "ATE'nin ilk dönem üyesi", category: "special" },
  { name: "Erken Üye", slug: "early-member", icon: "🌅", description: "ATE'ye erken katılan üye", category: "special" },
  { name: "ATE Oyuncusu", slug: "ate-player", icon: "🎮", description: "Resmi ATE kadrosunda yer aldı", category: "competitive" },
  { name: "ATE Academy", slug: "ate-academy", icon: "🎓", description: "ATE Academy programına kabul edildi", category: "academy" },
  { name: "ATE Staff", slug: "ate-staff", icon: "👔", description: "ATE ekibinin bir parçası", category: "staff" },
  { name: "Okul Temsilcisi", slug: "school-representative", icon: "🏫", description: "Okulunun ATE temsilcisi", category: "school" },
  { name: "Turnuva Şampiyonu", slug: "tournament-champion", icon: "🏆", description: "ATE turnuvasını kazandı", category: "competitive" },
  { name: "Campus Champion", slug: "campus-champion", icon: "🎓", description: "Campus Clash şampiyonu", category: "competitive" },
  { name: "Okul Şampiyonu", slug: "school-champion", icon: "🏫", description: "Okul turnuvasını kazandı", category: "school" },
  { name: "MVP", slug: "mvp", icon: "⭐", description: "Maçın en değerli oyuncusu seçildi", category: "competitive" },
  { name: "100 Maç", slug: "100-matches", icon: "💯", description: "100 resmi maç oynadı", category: "milestone" },
  { name: "Topluluk MVP", slug: "community-mvp", icon: "🤝", description: "Topluluk tarafından takdir edilen katkı", category: "community" },
  { name: "İçerik Üreticisi", slug: "content-creator", icon: "🎬", description: "ATE içerik üreticisi programına kabul edildi", category: "content" },
  { name: "Koç", slug: "coach", icon: "📋", description: "ATE koçu olarak görev yapıyor", category: "staff" },
];

export const defaultFeatureFlags = [
  { key: "schoolLeague", enabled: true, description: "Alanya Lise Ligi" },
  { key: "campusClash", enabled: true, description: "Campus Clash üniversite turnuvaları" },
  { key: "scrims", enabled: true, description: "Scrim bulma sistemi" },
  { key: "ateScore", enabled: true, description: "ATE Puan sistemi" },
  { key: "academy", enabled: true, description: "ATE Academy başvuruları" },
  { key: "clips", enabled: true, description: "Oyun klipleri sistemi" },
  { key: "marketplace", enabled: false, description: "Gelecek: Marketplace" },
  { key: "alanyaMap", enabled: false, description: "Gelecek: Alanya E-Spor Haritası" },
  { key: "pushNotifications", enabled: false, description: "Gelecek: Push bildirimler" },
];

export const defaultRoles = [
  { name: "SUPER_ADMIN", displayName: "Süper Admin", isSystem: true },
  { name: "ADMIN", displayName: "Admin", isSystem: true },
  { name: "COACH", displayName: "Koç", isSystem: false },
  { name: "ANALYST", displayName: "Analist", isSystem: false },
  { name: "CONTENT_MANAGER", displayName: "İçerik Yöneticisi", isSystem: false },
  { name: "EVENT_MANAGER", displayName: "Etkinlik Yöneticisi", isSystem: false },
  { name: "SCHOOL_REP", displayName: "Okul Temsilcisi", isSystem: false },
  { name: "PLAYER", displayName: "Oyuncu", isSystem: false },
  { name: "MEMBER", displayName: "Üye", isSystem: true },
  { name: "FAN", displayName: "Taraftar", isSystem: false },
  { name: "SPONSOR", displayName: "Sponsor", isSystem: false },
];

export const defaultPermissions = [
  // Users
  { name: "users.view", category: "users", description: "Kullanıcıları görüntüle" },
  { name: "users.manage", category: "users", description: "Kullanıcıları yönet" },
  { name: "users.ban", category: "users", description: "Kullanıcıları banla" },
  { name: "users.roles", category: "users", description: "Rol ata/kaldır" },
  // Teams
  { name: "teams.view", category: "teams", description: "Takımları görüntüle" },
  { name: "teams.manage", category: "teams", description: "Takımları yönet" },
  { name: "teams.verify", category: "teams", description: "Takımları doğrula" },
  // Tournaments
  { name: "tournaments.view", category: "tournaments", description: "Turnuvaları görüntüle" },
  { name: "tournaments.create", category: "tournaments", description: "Turnuva oluştur" },
  { name: "tournaments.manage", category: "tournaments", description: "Turnuvaları yönet" },
  // Matches
  { name: "matches.view", category: "matches", description: "Maçları görüntüle" },
  { name: "matches.manage", category: "matches", description: "Maçları yönet" },
  { name: "matches.score", category: "matches", description: "Skor güncelle" },
  // Academy
  { name: "academy.view", category: "academy", description: "Academy başvurularını görüntüle" },
  { name: "academy.manage", category: "academy", description: "Academy başvurularını yönet" },
  { name: "academy.evaluate", category: "academy", description: "Tryout değerlendir" },
  // Schools
  { name: "schools.view", category: "schools", description: "Okulları görüntüle" },
  { name: "schools.manage", category: "schools", description: "Okulları yönet" },
  // Events
  { name: "events.view", category: "events", description: "Etkinlikleri görüntüle" },
  { name: "events.create", category: "events", description: "Etkinlik oluştur" },
  { name: "events.manage", category: "events", description: "Etkinlikleri yönet" },
  // News
  { name: "news.view", category: "news", description: "Haberleri görüntüle" },
  { name: "news.create", category: "news", description: "Haber oluştur" },
  { name: "news.manage", category: "news", description: "Haberleri yönet" },
  // Media
  { name: "media.view", category: "media", description: "Medya öğelerini görüntüle" },
  { name: "media.manage", category: "media", description: "Medya yönet" },
  // Moderation
  { name: "moderation.view", category: "moderation", description: "Raporları görüntüle" },
  { name: "moderation.manage", category: "moderation", description: "Moderasyon işlemleri yap" },
  // Site
  { name: "site.settings", category: "site", description: "Site ayarlarını yönet" },
  { name: "site.modes", category: "site", description: "Site modlarını yönet" },
  // Sponsors
  { name: "sponsors.view", category: "sponsors", description: "Sponsorları görüntüle" },
  { name: "sponsors.manage", category: "sponsors", description: "Sponsorları yönet" },
  // Admin
  { name: "admin.dashboard", category: "admin", description: "Admin paneline eriş" },
  { name: "admin.audit", category: "admin", description: "Denetim kayıtlarını görüntüle" },
  { name: "admin.scouting", category: "admin", description: "Scouting ekranına eriş" },
  // Points
  { name: "points.view", category: "points", description: "Puanları görüntüle" },
  { name: "points.manage", category: "points", description: "Puan yönet" },
];
