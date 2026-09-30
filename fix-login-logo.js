const fs = require('fs');
let content = fs.readFileSync('src/app/(auth)/login/page.tsx', 'utf8');

// replace Image import
if(!content.includes("import Image from 'next/image'")) {
  content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport Image from 'next/image';");
}

// replace the ATE circle with image
content = content.replace(
  /<div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-\[#D00000\] text-xl font-bold text-white">\s*ATE\s*<\/div>/,
  '<div className="mx-auto flex h-20 w-20 items-center justify-center"><Image src="/ate-logo.png" alt="ATE Digital Arena" width={80} height={80} className="object-contain" /></div>'
);

fs.writeFileSync('src/app/(auth)/login/page.tsx', content, 'utf8');
