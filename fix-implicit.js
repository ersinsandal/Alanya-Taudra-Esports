const fs = require('fs');

let m = fs.readFileSync('src/app/admin/matches/page.tsx', 'utf8');
m = m.replace(/rawMatches\.map\(m =>/g, "rawMatches.map((m: any) =>");
m = m.replace(/matches\.map\(m =>/g, "matches.map((m: any) =>");
fs.writeFileSync('src/app/admin/matches/page.tsx', m, 'utf8');

let s = fs.readFileSync('src/app/admin/scrims/page.tsx', 'utf8');
s = s.replace(/rawScrims\.map\(s =>/g, "rawScrims.map((s: any) =>");
s = s.replace(/scrims\.map\(s =>/g, "scrims.map((s: any) =>");
fs.writeFileSync('src/app/admin/scrims/page.tsx', s, 'utf8');

console.log('Fixed');
