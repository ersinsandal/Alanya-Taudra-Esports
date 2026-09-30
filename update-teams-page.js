const fs = require('fs');

let teams = fs.readFileSync('src/app/(public)/teams/page.tsx', 'utf8');

if (!teams.includes('mockCrews')) {
  teams = teams.replace(/import \{ prisma \} from '@\/lib\/db';/, "import { prisma } from '@/lib/db';\nimport { mockCrews } from '@/lib/data/mock-crews';");
  teams = teams.replace(/games = \[\];/g, "games = mockCrews.map(c => c.game);");
  fs.writeFileSync('src/app/(public)/teams/page.tsx', teams, 'utf8');
}
