const fs = require('fs');
let c = fs.readFileSync('src/components/layout/navbar.tsx', 'utf8');

c = c.replace(
  '                    <div className="absolute right-0 mt-2 w-48 bg-[#111114] border border-white/10 rounded-lg shadow-xl overflow-hidden py-1 z-50">\\n                      <Link \\n                        href="/dashboard"',
  '                    <div className="absolute right-0 mt-2 w-48 bg-[#111114] border border-white/10 rounded-lg shadow-xl overflow-hidden py-1 z-50">\\n                      {user.roles && user.roles.some((r) => [\\'SUPER_ADMIN\\', \\'ADMIN\\', \\'MODERATOR\\'].includes(r)) && (\\n                        <Link href="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-[#FF1F2D] hover:bg-white/5 transition-colors border-b border-white/5 pb-2 mb-1">\\n                          <Settings className="w-4 h-4" /> {user.roles.includes(\\'SUPER_ADMIN\\') ? \\'Süper Admin\\' : (user.roles.includes(\\'ADMIN\\') ? \\'Admin Paneli\\' : \\'Mod Paneli\\')}\\n                        </Link>\\n                      )}\\n                      <Link \\n                        href="/dashboard"'
);

fs.writeFileSync('src/components/layout/navbar.tsx', c, 'utf8');
