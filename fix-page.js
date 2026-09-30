const fs = require('fs');
let page = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');
page = page.replace(/import \{ mockCrews \} from '@\/lib\/data\/mock-crews';\n/g, "");
page = page.replace(/} else \{\n\s*crews = mockCrews\.slice\(0, 4\);\n\s*}/g, "} else {\n      crews = [];\n    }");
page = page.replace(/crews = mockCrews\.slice\(0, 4\);/g, "crews = [];");
fs.writeFileSync('src/app/(public)/page.tsx', page, 'utf8');
