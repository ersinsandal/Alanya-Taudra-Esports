'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Bell, Menu, X, User, LogOut, Settings, LayoutDashboard, Shield } from 'lucide-react';

export type UserType = { id: string; username: string; avatarUrl?: string; roles?: string[] } | null;

interface NavbarProps {
  user?: UserType;
}

export function Navbar({ user = null }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    window.location.href = '/login?logout=true';
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/crews', label: 'Oyun Ekipleri' },
    { href: '/teams', label: 'Takımlar' },
    { href: '/players', label: 'Oyuncular' },
    { href: '/tournaments', label: 'Turnuvalar' },
    { href: '/schools', label: 'Okullar' },
    { href: '/community', label: 'Topluluk' },
    { href: '/news', label: 'Haberler' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 border-b border-transparent ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-16 h-16 overflow-hidden">
                  <Image src="/ate-logo.png" alt="ATE Logo" fill className="object-contain" />
                </div>
              </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors hover:text-[#FF1F2D] ${isActive ? 'text-white' : 'text-[#99999F]'}`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-[22px] left-0 w-full h-0.5 bg-[#D00000] rounded-t-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => router.push('/players')} 
              className="p-2 text-[#99999F] hover:text-white transition-colors cursor-pointer" 
              aria-label="Oyuncu ve TakÄ±m Ara"
              title="Ara"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {user && (
              <button 
                onClick={() => router.push('/notifications')} 
                className="p-2 text-[#99999F] hover:text-white transition-colors relative cursor-pointer" 
                aria-label="Bildirimler"
                title="Bildirimler"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D00000] rounded-full border-2 border-[#050505]"></span>
              </button>
            )}

            <div className="h-6 w-px bg-white/10 mx-2" />

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 focus:outline-none cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#111114] border border-white/10 overflow-hidden flex items-center justify-center">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-[#99999F]" />
                    )}
                  </div>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#111114] border border-white/10 rounded-lg shadow-xl overflow-hidden py-1 z-50">
                    {user.roles && user.roles.some((r: string) => ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].includes(r)) && (
                      <Link 
                        href="/admin" 
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#FF1F2D] hover:bg-white/5 transition-colors border-b border-white/5 pb-2 mb-1"
                      >
                        <Shield className="w-4 h-4" /> {user.roles.includes('SUPER_ADMIN') ? 'Süper Admin' : (user.roles.includes('ADMIN') ? 'Admin Paneli' : 'Mod Paneli')}
                      </Link>
                    )}
                    <Link 
                      href="/dashboard" 
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#F7F7F7] hover:bg-white/5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link 
                      href="/dashboard" 
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#F7F7F7] hover:bg-white/5 transition-colors"
                    >
                      <User className="w-4 h-4" /> Profil
                    </Link>
                    <Link 
                      href="/settings" 
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#F7F7F7] hover:bg-white/5 transition-colors"
                    >
                      <Settings className="w-4 h-4" /> Ayarlar
                    </Link>
                    <div className="h-px bg-white/10 my-1" />
                    <button 
                      onClick={() => {
                        setUserMenuOpen(false);
                        handleLogout();
                      }}
                      type="button"
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[#FF1F2D] hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-medium text-[#F7F7F7] hover:text-white transition-colors">Giriş Yap</Link>
                <Link href="/register" className="text-sm font-medium bg-[#D00000] text-white px-4 py-2 rounded-md hover:bg-[#FF1F2D] transition-colors">ATE ID Oluştur</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#99999F] hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505] pt-16 lg:hidden flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium p-2 rounded-lg ${isActive ? 'bg-white/5 text-[#D00000]' : 'text-white hover:bg-white/5'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          
          <div className="p-4 border-t border-white/10">
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 p-2 mb-2 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 rounded-full bg-[#111114] border border-white/10 overflow-hidden flex items-center justify-center">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-[#99999F]" />
                    )}
                  </div>
                  <div>
                    <div className="text-white font-medium">{user.username}</div>
                    <div className="text-[#99999F] text-sm">ATE ID</div>
                  </div>
                </div>
                {user.roles && user.roles.some((r: string) => ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].includes(r)) && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2 text-[#FF1F2D] hover:bg-white/5 rounded-lg border-b border-white/5 pb-3 mb-1">
                    <Shield className="w-5 h-5" /> {user.roles.includes('SUPER_ADMIN') ? 'Süper Admin' : (user.roles.includes('ADMIN') ? 'Admin Paneli' : 'Mod Paneli')}
                  </Link>
                )}
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2 text-white hover:bg-white/5 rounded-lg">
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </Link>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2 text-white hover:bg-white/5 rounded-lg">
                  <User className="w-5 h-5" /> Profil
                </Link>
                <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2 text-white hover:bg-white/5 rounded-lg">
                  <Settings className="w-5 h-5" /> Ayarlar
                </Link>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  type="button"
                  className="flex items-center gap-3 p-2 text-[#FF1F2D] hover:bg-white/5 rounded-lg text-left w-full cursor-pointer"
                >
                  <LogOut className="w-5 h-5" /> Çıkış Yap
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 border border-white/10 rounded-lg text-white font-medium hover:bg-white/5">Giriş Yap</Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 bg-[#D00000] rounded-lg text-white font-medium hover:bg-[#FF1F2D]">ATE ID Oluştur</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}


