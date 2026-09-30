const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

content = content.replace(
  /prisma\.school\.count\(\),/,
  "prisma.school.count(),\n      prisma.university.count(),"
);

content = content.replace(
  /const \[memberCount, schoolCount, crewCount, tourneyCount\] = await Promise\.all\(\[/,
  "const [memberCount, schoolCount, uniCount, crewCount, tourneyCount] = await Promise.all(["
);

content = content.replace(
  /stats = \{\s*members: memberCount,\s*players: memberCount,\s*schools: schoolCount,\s*crews: crewCount,\s*tournaments: tourneyCount,\s*events: 0\s*\};/,
  "stats = { members: memberCount, players: memberCount, schools: schoolCount + uniCount, crews: crewCount, tournaments: tourneyCount, events: 0 };"
);

fs.writeFileSync('src/app/(public)/page.tsx', content, 'utf8');
