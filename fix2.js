const fs = require('fs');
let c = fs.readFileSync('src/app/(platform)/dashboard/dashboard-client.tsx', 'utf8');
c = c.replace(/style=\{\{ width: \$\{stats\.profileCompletion\}% \}\}/g, "style={{ width: \\%\ }}");
c = c.replace(/%\{stats.profileCompletion\} Tamamland/g, '{stats.profileCompletion}% Tamamland');
fs.writeFileSync('src/app/(platform)/dashboard/dashboard-client.tsx', c, 'utf8');
