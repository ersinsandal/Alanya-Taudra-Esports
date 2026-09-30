const fs = require('fs');
let c = fs.readFileSync('src/components/layout/navbar.tsx', 'utf8');

c = c.replace(
  '                  <div className="absolute right-0 mt-2 w-48 bg-[#111114] border border-white/10 rounded-lg shadow-xl overflow-hidden py-1 z-50">\r\n                    <Link ',
  '                  <div className="absolute right-0 mt-2 w-48 bg-[#111114] border border-white/10 rounded-lg shadow-xl overflow-hidden py-1 z-50">\r\n                    {user.roles && user.roles.some(r => [\\'SUPER_ADMIN\\', \\'ADMIN\\', \\'MODERATOR\\'].includes(r)) && (\r\n                      <Link href="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-[#FF1F2D] hover:bg-white/5 transition-colors border-b border-white/5 pb-2 mb-1">\r\n                        <Shield className="w-4 h-4" /> {user.roles.includes(\\'SUPER_ADMIN\\') ? \\'Süper Admin\\' : (user.roles.includes(\\'ADMIN\\') ? \\'Admin Paneli\\' : \\'Mod Paneli\\')}\r\n                      </Link>\r\n                    )}\r\n                    <Link '
);

c = c.replace(
  '                  </div>\r\n                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2 text-white hover:bg-white/5 rounded-lg">',
  '                  </div>\r\n                  {user.roles && user.roles.some(r => [\\'SUPER_ADMIN\\', \\'ADMIN\\', \\'MODERATOR\\'].includes(r)) && (\r\n                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2 text-[#FF1F2D] hover:bg-white/5 rounded-lg">\r\n                      <Shield className="w-5 h-5" /> {user.roles.includes(\\'SUPER_ADMIN\\') ? \\'Süper Admin\\' : (user.roles.includes(\\'ADMIN\\') ? \\'Admin Paneli\\' : \\'Mod Paneli\\')}\r\n                    </Link>\r\n                  )}\r\n                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2 text-white hover:bg-white/5 rounded-lg">'
);

fs.writeFileSync('src/components/layout/navbar.tsx', c, 'utf8');
