const fs = require('fs');
let content = fs.readFileSync('prisma/seed.ts', 'utf8');
content = content.replace("category: 'SPORTS'", "category: 'CONSOLE'");
fs.writeFileSync('prisma/seed.ts', content, 'utf8');
