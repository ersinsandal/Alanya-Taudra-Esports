const fs = require('fs');
let c = fs.readFileSync('src/app/(platform)/settings/settings-client.tsx', 'utf8');

c = c.replace('export default function SettingsPage() {', 'export default function SettingsClient({ user }: { user: any }) {');

// Fix the state initialization
// We map mock data to user real data
const stateReplacements = [
  { search: "name: 'Ahmet YÄ±lmaz',", replace: "name: \\ \\.trim()," },
  { search: "username: 'Phantom#TR1',", replace: "username: user.username," },
  { search: "email: 'ahmet@example.com',", replace: "email: user.email," },
  { search: "phone: '555 123 4567',", replace: "phone: user.phone || ''," },
  { search: "school: 'Alanya Fen Lisesi',", replace: "school: user.profile?.school?.name || user.profile?.university?.name || ''," },
  { search: "studentClass: '11. SÄ±nÄ±f',", replace: "studentClass: user.profile?.studentStatus || ''," },
  { search: "age: '17',", replace: "age: user.profile?.birthDate ? Math.floor((new Date().getTime() - new Date(user.profile.birthDate).getTime()) / 31557600000).toString() : ''," },
  { search: "discordId: 'phantom_tr1',", replace: "discordId: user.profile?.discordUsername || ''," },
  { search: "riotId: 'Phantom#TR1',", replace: "riotId: '', // To be implemented in game accounts" },
  { search: "steamId: '76561198000000000'", replace: "steamId: ''" }
];

stateReplacements.forEach(rep => {
  c = c.replace(rep.search, rep.replace);
});

// Settings privacy
c = c.replace("showPhone: false,", "showPhone: false, // user.profile?.showPhone"); // Just simple mapping

fs.writeFileSync('src/app/(platform)/settings/settings-client.tsx', c, 'utf8');
console.log('Done mapping settings client');
