const fs = require('fs');
let content = fs.readFileSync('src/app/(auth)/login/page.tsx', 'utf8');

const regex = /<div className="rounded-xl border border-red-500\/20 bg-red-950\/20 p-3 text-xs text-zinc-400">[\s\S]*?<p className="text-zinc-500 text-\[11px\] font-mono">admin@ate.gg \/ ChangeMeInProduction123!<\/p>\s*<\/div>/;
content = content.replace(regex, '');

fs.writeFileSync('src/app/(auth)/login/page.tsx', content, 'utf8');
