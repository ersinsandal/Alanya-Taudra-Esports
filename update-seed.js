const fs = require('fs');
let seed = fs.readFileSync('prisma/seed-crews.js', 'utf8');

// Add new games to gamesData array
seed = seed.replace(
  /\{ name: "Apex Legends", slug: "apex", category: "BATTLE_ROYALE" \},/g,
  "{ name: \"Apex Legends\", slug: \"apex\", category: \"BATTLE_ROYALE\" },\n    { name: \"Fortnite\", slug: \"fortnite\", category: \"BATTLE_ROYALE\" },\n    { name: \"eFootball\", slug: \"efootball\", category: \"SPORTS\" },\n    { name: \"Wild Rift\", slug: \"wild-rift\", category: \"MOBILE\" },"
);

// Add new crews to crewsData array
seed = seed.replace(
  /\{ name: 'Apex Legends Ekibi', slug: 'apex', gameSlug: 'apex' \},/g,
  "{ name: 'Apex Legends Ekibi', slug: 'apex', gameSlug: 'apex' },\n    { name: 'Fortnite Ekibi', slug: 'fortnite', gameSlug: 'fortnite' },\n    { name: 'eFootball Ekibi', slug: 'efootball', gameSlug: 'efootball' },\n    { name: 'Wild Rift Ekibi', slug: 'wild-rift', gameSlug: 'wild-rift' },"
);

fs.writeFileSync('prisma/seed-crews.js', seed, 'utf8');
