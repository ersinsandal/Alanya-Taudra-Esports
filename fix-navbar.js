const fs = require('fs');
let content = fs.readFileSync('src/components/layout/navbar.tsx', 'utf8');

// Insert Shield icon
content = content.replace(
  "LayoutDashboard } from 'lucide-react';",
  "LayoutDashboard, Shield } from 'lucide-react';"
);

const adminLinkDesktop = 
                    {user?.roles?.some(r => ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].includes(r)) && (
                      <Link 
                        href="/admin" 
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#F7F7F7] hover:bg-white/5 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-[#D00000]" /> {user.roles.includes('SUPER_ADMIN') ? 'Süper Admin' : (user.roles.includes('ADMIN') ? 'Admin Paneli' : 'Moderatör Paneli')}
                      </Link>
                    )}
;

const desktopDashRegex = /<Link \s*href="\/dashboard" \s*onClick=\{\(\) => setUserMenuOpen\(false\)\}\s*className="flex items-center gap-2 px-4 py-2 text-sm text-\[\#F7F7F7\] hover:bg-white\/5 transition-colors"\s*>\s*<LayoutDashboard className="w-4 h-4" \/> Dashboard\s*<\/Link>/;

content = content.replace(desktopDashRegex, match => adminLinkDesktop + match);


const adminLinkMobile = 
                {user?.roles?.some(r => ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].includes(r)) && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2 text-white hover:bg-white/5 rounded-lg">
                    <Shield className="w-5 h-5 text-[#D00000]" /> {user.roles.includes('SUPER_ADMIN') ? 'Süper Admin' : (user.roles.includes('ADMIN') ? 'Admin Paneli' : 'Moderatör Paneli')}
                  </Link>
                )}
;

const mobileDashRegex = /<Link href="\/dashboard" onClick=\{\(\) => setMobileMenuOpen\(false\)\} className="flex items-center gap-3 p-2 text-white hover:bg-white\/5 rounded-lg">\s*<LayoutDashboard className="w-5 h-5" \/> Dashboard\s*<\/Link>/;

content = content.replace(mobileDashRegex, match => adminLinkMobile + match);

fs.writeFileSync('src/components/layout/navbar.tsx', content, 'utf8');
console.log('Done');
