const fs = require('fs');

// Fix mock-crews.ts
let mock = fs.readFileSync('src/lib/data/mock-crews.ts', 'utf8');
mock = mock.replace(
  /name: 'EA FC 24 Ekibi', slug: 'ea-fc', game: 'EA FC 24'/,
  "name: 'EA FC Ekibi', slug: 'ea-fc', game: 'EA FC'"
);
mock = mock.replace(
  /cover: 'https:\/\/static-cdn.jtvnw.net\/ttv-boxart\/eFootball-600x800.jpg'/,
  "cover: 'https://cdn.akamai.steamstatic.com/steam/apps/1665460/library_600x900_2x.jpg'"
);
fs.writeFileSync('src/lib/data/mock-crews.ts', mock, 'utf8');

// Fix seed-crews.js
let seed = fs.readFileSync('prisma/seed-crews.js', 'utf8');
seed = seed.replace(
  /\{ name: "EA FC 24", slug: "fc24", category: "SPORTS" \}/,
  "{ name: \"EA FC\", slug: \"fc\", category: \"SPORTS\" }"
);
seed = seed.replace(
  /\{ name: 'EA FC 24 Ekibi', slug: 'fc24', gameSlug: 'fc24' \}/,
  "{ name: 'EA FC Ekibi', slug: 'fc', gameSlug: 'fc' }"
);
fs.writeFileSync('prisma/seed-crews.js', seed, 'utf8');
