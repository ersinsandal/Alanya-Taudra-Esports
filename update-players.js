const fs = require('fs');
let content = fs.readFileSync('src/app/admin/players/page.tsx', 'utf8');

content = content.replace(
  /name: \\$\{u\.profile\?\.firstName \|\| ''\} "\$\{u\.profile\?\.inGameName \|\| ''\}" \$\{u\.profile\?\.lastName \|\| ''\}\,/,
  "name: ${u.profile?.firstName || ''} ,"
);

content = content.replace(
  /points: u\.profile\?\.points \|\| 0,/,
  "points: 0,"
);

content = content.replace(
  /status: u\.isActive \? 'Aktif' : 'Banlı',/,
  "status: u.status === 'ACTIVE' ? 'Aktif' : 'Banlı',"
);

fs.writeFileSync('src/app/admin/players/page.tsx', content, 'utf8');
