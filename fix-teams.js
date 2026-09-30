const fs = require('fs');
let teams = fs.readFileSync('src/app/(public)/teams/page.tsx', 'utf8');
teams = teams.replace(/let games = \[\];/g, "let games: string[] = [];");
fs.writeFileSync('src/app/(public)/teams/page.tsx', teams, 'utf8');
