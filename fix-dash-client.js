const fs = require('fs');
let c = fs.readFileSync('src/app/(platform)/dashboard/dashboard-client.tsx', 'utf8');

// Replace export default function DashboardPage() with export default function DashboardClient({ user, stats, teams, applications }: any)
c = c.replace('export default function DashboardPage() {', 'export default function DashboardClient({ user, stats, teams, applications }: any) {');

// We have mock states in the client. Let's find "Welcome back, User."
c = c.replace('Welcome back, User.', 'Welcome back, {user.firstName || user.username}.');

// Let's replace the hardcoded stats with \stats\ props
c = c.replace(/value: '1,250'/, 'value: stats.score.toLocaleString()');
c = c.replace(/value: '34'/, 'value: stats.matches.toString()');
c = c.replace(/value: '2'/, 'value: stats.teams.toString()');
c = c.replace(/value: '8'/, 'value: stats.achievements.toString()');

// Fix Profil Tamamlama %40
c = c.replace(/%40 Tamamland/g, '%{stats.profileCompletion} Tamamland');
c = c.replace(/width: '40%'/g, 'width: ${stats.profileCompletion}%');

fs.writeFileSync('src/app/(platform)/dashboard/dashboard-client.tsx', c, 'utf8');
console.log('Client fixed');
