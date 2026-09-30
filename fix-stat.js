const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

content = content.replace("schools: schoolCount,", "schools: schoolCount + uniCount,");

fs.writeFileSync('src/app/(public)/page.tsx', content, 'utf8');
