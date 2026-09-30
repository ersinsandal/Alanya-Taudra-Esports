const fs = require('fs');
let page = fs.readFileSync('src/app/(public)/crews/page.tsx', 'utf8');
page = page.replace(/import \{ mockCrews \} from '@\/lib\/data\/mock-crews';\n/g, "");
page = page.replace(/\} else \{\n\s*crews = mockCrews;\n\s*\}/g, "} else {\n      crews = [];\n    }");
page = page.replace(/crews = mockCrews;/g, "crews = [];");
fs.writeFileSync('src/app/(public)/crews/page.tsx', page, 'utf8');

let teams = fs.readFileSync('src/app/(public)/teams/page.tsx', 'utf8');
teams = teams.replace(/import \{ mockCrews \} from '@\/lib\/data\/mock-crews';\n/g, "");
teams = teams.replace(/games = mockCrews\.map\(c => c\.game\);/g, "games = [];");
fs.writeFileSync('src/app/(public)/teams/page.tsx', teams, 'utf8');
