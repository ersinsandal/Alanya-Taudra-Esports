const fs = require('fs');
let nav = fs.readFileSync('src/components/layout/navbar.tsx', 'utf8');

nav = nav.replace(
  /<Link href="\/" className="flex items-center gap-2 group">\s*<div className="relative w-10 h-10 overflow-hidden rounded-md">\s*<Image src="\/ate-logo\.png" alt="ATE Logo" fill className="object-contain" \/>\s*<\/div>\s*<span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-\[#D00000\] transition-colors">ATE<\/span>\s*<\/Link>/,
  '<Link href="/" className="flex items-center gap-2 group">\n                <div className="relative w-16 h-16 overflow-hidden">\n                  <Image src="/ate-logo.png" alt="ATE Logo" fill className="object-contain" />\n                </div>\n              </Link>'
);

fs.writeFileSync('src/components/layout/navbar.tsx', nav, 'utf8');
