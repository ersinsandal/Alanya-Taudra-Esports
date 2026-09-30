const fs = require('fs');
let content = fs.readFileSync('reset-schools.ts', 'utf8');
content = content.replace("type: 'PRIVATE'", "type: 'FOUNDATION'");
fs.writeFileSync('reset-schools.ts', content, 'utf8');
