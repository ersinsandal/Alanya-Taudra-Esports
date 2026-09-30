const fs = require('fs');
let page = fs.readFileSync('src/app/(public)/schools/page.tsx', 'utf8');
page = page.replace(/import \{ alanyaSchools \} from '@\/lib\/data\/schools';\n/g, "");
page = page.replace(/const mockUniversities = \[[\s\S]*?\];\n\n/g, "");
page = page.replace(/if \(universities\.length === 0\) \{\n\s*universities = mockUniversities;\n\s*\}/g, "");
page = page.replace(/schools = alanyaSchools\.map[\s\S]*?universities = mockUniversities;/g, "schools = []; universities = [];");
page = page.replace(/if \(schools\.length === 0\) \{\n\s*schools = alanyaSchools\.map[\s\S]*?\n\s*\}/g, "");
fs.writeFileSync('src/app/(public)/schools/page.tsx', page, 'utf8');
