const fs = require('fs');
let page = fs.readFileSync('src/app/(public)/schools/page.tsx', 'utf8');

if (!page.includes('mockSchools')) {
  page = page.replace(/import \{ prisma \} from '@\/lib\/db';/, "import { prisma } from '@/lib/db';\nimport { mockSchools, mockUniversities } from '@/lib/data/mock-schools';");
  
  page = page.replace(
    /schools = await prisma\.school\.findMany\(\{[\s\S]*?\}\);/g,
    "schools = await prisma.school.findMany({\n      orderBy: { name: 'asc' },\n      include: { _count: { select: { profiles: true } } }\n    });\n    if (schools.length === 0) schools = mockSchools;"
  );
  
  page = page.replace(
    /universities = await prisma\.university\.findMany\(\{[\s\S]*?\}\);/g,
    "universities = await prisma.university.findMany({\n      orderBy: { name: 'asc' },\n      include: { _count: { select: { profiles: true } } }\n    });\n    if (universities.length === 0) universities = mockUniversities;"
  );
  
  page = page.replace(/console\.error\("Schools DB fetch failed:", error\);/g, "console.warn(\"Schools DB fetch failed, using fallback\");\n    schools = mockSchools;\n    universities = mockUniversities;");
  
  fs.writeFileSync('src/app/(public)/schools/page.tsx', page, 'utf8');
}
