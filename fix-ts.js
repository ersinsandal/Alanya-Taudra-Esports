const fs = require('fs');

// Fix dashboard page
let dash = fs.readFileSync('src/app/(platform)/dashboard/page.tsx', 'utf8');
dash = dash.replace('if (user.profile?.phone) completion += 20;', 'if (user.phone) completion += 20;');
dash = dash.replace('if (user.profile?.discordId) completion += 20;', 'if (user.profile?.discordUsername) completion += 20;');
fs.writeFileSync('src/app/(platform)/dashboard/page.tsx', dash, 'utf8');

// Fix admin/players/page.tsx
let players = fs.readFileSync('src/app/admin/players/page.tsx', 'utf8');
players = players.replace('where: { teamMembers: { some: {} } }', 'where: { teamMemberships: { some: {} } }');
// The user.profile mapping error: In admin/players, it maps user.profile.firstName, but it might not have profile included.
// Also gameProfiles. Let's make sure it includes them.
players = players.replace('const users = await prisma.user.findMany({', 'const users = await prisma.user.findMany({\n    include: { profile: true, gameProfiles: { include: { game: true } } },');
fs.writeFileSync('src/app/admin/players/page.tsx', players, 'utf8');

console.log('Fixes applied');
