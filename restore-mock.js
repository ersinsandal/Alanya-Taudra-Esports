const fs = require('fs');

let page = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');
page = page.replace(/import \{ prisma \} from '@\/lib\/db';/g, "import { prisma } from '@/lib/db';\nimport { mockCrews } from '@/lib/data/mock-crews';");
page = page.replace(/crews = \[\];/g, "crews = mockCrews.slice(0, 4);");
fs.writeFileSync('src/app/(public)/page.tsx', page, 'utf8');

let crews = fs.readFileSync('src/app/(public)/crews/page.tsx', 'utf8');
crews = crews.replace(/import \{ prisma \} from '@\/lib\/db';/g, "import { prisma } from '@/lib/db';\nimport { mockCrews } from '@/lib/data/mock-crews';");
crews = crews.replace(/crews = \[\];/g, "crews = mockCrews;");
fs.writeFileSync('src/app/(public)/crews/page.tsx', crews, 'utf8');

