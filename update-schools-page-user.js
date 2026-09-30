const fs = require('fs');
let page = fs.readFileSync('src/app/(public)/schools/page.tsx', 'utf8');
if (!page.includes('getCurrentUser')) {
  page = page.replace(/import SchoolsClient from '\.\/schools-client';/, "import SchoolsClient from './schools-client';\nimport { getCurrentUser } from '@/lib/auth/session';");
  page = page.replace(/export default async function SchoolsPage\(\) \{/, "export default async function SchoolsPage() {\n  const user = await getCurrentUser();");
  page = page.replace(/<SchoolsClient schools=\{schools\} universities=\{universities\} \/>/, "<SchoolsClient schools={schools} universities={universities} user={user} />");
  fs.writeFileSync('src/app/(public)/schools/page.tsx', page, 'utf8');
}
