'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Trophy, Bell, User } from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Ana Sayfa' },
    { href: '/players', icon: Compass, label: 'Keşif' },
    { href: '/tournaments', icon: Trophy, label: 'Turnuvalar' },
    { href: '/notifications', icon: Bell, label: 'Bildirimler' },
    { href: '/dashboard', icon: User, label: 'Profil' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B0D] border-t border-white/10 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? 'text-[#D00000]' : 'text-[#99999F] hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'fill-[#D00000]/20' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
