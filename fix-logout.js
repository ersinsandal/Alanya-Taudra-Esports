const fs = require('fs');
let content = fs.readFileSync('src/components/layout/admin-sidebar.tsx', 'utf8');

if (!content.includes("import { useRouter }")) {
  content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { useRouter } from 'next/navigation';");
}

if (!content.includes("const router = useRouter();")) {
  content = content.replace("const [mobileOpen, setMobileOpen] = useState(false);", "const [mobileOpen, setMobileOpen] = useState(false);\n  const router = useRouter();");
}

content = content.replace(
  /<button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-white\/5 hover:text-white transition-colors">/g,
  '<button onClick={async () => { await fetch(\'/api/auth/logout\', { method: \'POST\' }); router.push(\'/login\'); router.refresh(); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-white/5 hover:text-white transition-colors">'
);

fs.writeFileSync('src/components/layout/admin-sidebar.tsx', content, 'utf8');
