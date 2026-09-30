const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

const coverMapCode = 
  const coverMap = {
    'valorant': 'https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-600x800.jpg',
    'counter-strike 2': 'https://cdn.akamai.steamstatic.com/steam/apps/730/library_600x900_2x.jpg',
    'league of legends': 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-600x800.jpg',
    'pubg mobile': 'https://static-cdn.jtvnw.net/ttv-boxart/PUBG%20MOBILE-600x800.jpg',
    'pubg': 'https://static-cdn.jtvnw.net/ttv-boxart/PUBG:%20BATTLEGROUNDS-600x800.jpg',
    'mobile legends': 'https://static-cdn.jtvnw.net/ttv-boxart/Mobile%20Legends:%20Bang%20Bang-600x800.jpg',
    'teamfight tactics': 'https://static-cdn.jtvnw.net/ttv-boxart/Teamfight%20Tactics-600x800.jpg',
    'ea fc': 'https://cdn.akamai.steamstatic.com/steam/apps/2195250/library_600x900_2x.jpg',
    'rust': 'https://static-cdn.jtvnw.net/ttv-boxart/Rust-600x800.jpg',
    'genshin impact': 'https://static-cdn.jtvnw.net/ttv-boxart/Genshin%20Impact-600x800.jpg',
    'gta 5': 'https://static-cdn.jtvnw.net/ttv-boxart/Grand%20Theft%20Auto%20V-600x800.jpg',
    'rocket league': 'https://static-cdn.jtvnw.net/ttv-boxart/Rocket%20League-600x800.jpg',
    'fortnite': 'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-600x800.jpg',
    'efootball': 'https://cdn.akamai.steamstatic.com/steam/apps/1665460/library_600x900_2x.jpg',
    'wild rift': 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends:%20Wild%20Rift-600x800.jpg',
  };
  const getCover = (gameName) => coverMap[gameName.toLowerCase()] || 'https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-600x800.jpg';
;

// Insert coverMap before the try block
content = content.replace(
  '    const dbCrews = await prisma.crew.findMany({',
  coverMapCode + '\n    const dbCrews = await prisma.crew.findMany({'
);

// Fix the cover mapping to use getCover
content = content.replace(
          cover: c.name.toLowerCase().includes('cs') \n          ? 'https://cdn.akamai.steamstatic.com/steam/apps/730/library_600x900_2x.jpg'\n          : 'https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-600x800.jpg',
  "        cover: getCover(c.game?.name || '')"
);

// Also fix name to be "GameName Ekibi"
content = content.replace(
  "        name: c.name,\n        game: c.game?.name || 'Espor',",
  "        name: (c.game?.name || c.name) + ' Ekibi',\n        game: c.game?.name || 'Espor',"
);

fs.writeFileSync('src/app/(public)/page.tsx', content, 'utf8');
console.log('Done');
