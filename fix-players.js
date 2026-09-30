const fs = require('fs');
let players = fs.readFileSync('src/app/admin/players/page.tsx', 'utf8');

players = players.replace('teamMembers: { some: {} }', 'teamMemberships: { some: {} }');

// Wait, the error is also saying profile doesn't exist.
// Let's see the type map.
players = players.replace('const users = rawUsers.map(user => ({', 'const users = rawUsers.map((user: any) => ({');

fs.writeFileSync('src/app/admin/players/page.tsx', players, 'utf8');
console.log('Fixed players admin page');
