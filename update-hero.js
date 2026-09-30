const fs = require('fs');
let hero = fs.readFileSync('src/components/features/home/hero-section.tsx', 'utf8');

// The file likely has encoding issues, so I'll just use a regex for href="/teams" and replace the button content completely
hero = hero.replace(
  /<Link\s*href="\/teams"\s*className="px-8 py-4 border border-\[rgba\(255,255,255,0\.08\)\] hover:bg-\[rgba\(255,255,255,0\.05\)\] text-white font-medium rounded transition-colors w-full sm:w-auto text-center"\s*>\s*.*?\s*<\/Link>/,
  '<Link\n              href="/crews"\n              className="px-8 py-4 border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] text-white font-medium rounded transition-colors w-full sm:w-auto text-center"\n            >\n              OYUN EKİPLERİNİ KEŞFET\n            </Link>'
);

// If the above regex fails due to line breaks, I'll do a fallback
hero = hero.replace(/href="\/teams"/, 'href="/crews"');
hero = hero.replace(/TAKIMLARI KE.FET/, 'OYUN EKİPLERİNİ KEŞFET'); // "." matches the broken "Ş"

fs.writeFileSync('src/components/features/home/hero-section.tsx', hero, 'utf8');
