'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, User, Shield, Target, Trophy, Swords, 
  Calendar, FileText, ImageIcon, Star, Medal, Gamepad2,
  GraduationCap, Building, Briefcase, Settings, Sliders, 
  AlertTriangle, Activity, Database, LogOut, Menu, X, ToggleLeft
} from 'lucide-react';

type RoleType = 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'GAME_LEADER' | 'USER';

interface AdminSidebarProps {
  userRole: RoleType;
  userName: string;
}

const MENU_GROUPS = [
  {
    label: 'GENEL',
    allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/users', label: 'Üyeler', icon: Users },
      { href: '/admin/players', label: 'Oyuncular', icon: User },
      { href: '/admin/games', label: 'Oyunlar', icon: Gamepad2 },
    ]
  },
  {
    label: 'OYUN EKİPLERİ',
    allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'GAME_LEADER'],
    items: [
      { href: '/admin/crews', label: 'Ekipler', icon: Shield },
      { href: '/admin/crew-applications', label: 'Lider Başvuruları', icon: Target },
      { href: '/admin/teams', label: 'Takımlar', icon: Users },
    ]
  },
  {
    label: 'ORGANİZASYON',
    allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'GAME_LEADER'],
    items: [
      { href: '/admin/tournaments', label: 'Turnuvalar', icon: Trophy },
      { href: '/admin/matches', label: 'Maçlar', icon: Swords },
      { href: '/admin/events', label: 'Etkinlikler', icon: Calendar },
      { href: '/admin/scrims', label: 'Scrimler', icon: Activity },
    ]
  },
  {
    label: 'İÇERİK',
    allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'],
    items: [
      { href: '/admin/news', label: 'Haberler', icon: FileText },
      { href: '/admin/media', label: 'Medya', icon: ImageIcon },
      { href: '/admin/achievements', label: 'Başarılar', icon: Medal },
      { href: '/admin/points', label: 'ATE Puanları', icon: Star },
    ]
  },
  {
    label: 'EĞİTİM & SPONSOR',
    allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
    items: [
      { href: '/admin/schools', label: 'Okullar', icon: Building },
      { href: '/admin/universities', label: 'Üniversiteler', icon: GraduationCap },
      { href: '/admin/school-league', label: 'Okul Ligi', icon: Trophy },
      { href: '/admin/sponsors', label: 'Sponsorlar', icon: Briefcase },
      { href: '/admin/sponsor-applications', label: 'Sponsor Başvuruları', icon: Target },
    ]
  },
  {
    label: 'MODERASYON',
    allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'],
    items: [
      { href: '/admin/reports', label: 'Raporlar', icon: AlertTriangle },
      { href: '/admin/moderation', label: 'İşlem Merkezi', icon: Shield },
    ]
  },
  {
    label: 'SİSTEM',
    allowedRoles: ['SUPER_ADMIN'],
    items: [
      { href: '/admin/settings', label: 'Ayarlar', icon: Settings },
      { href: '/admin/site-modes', label: 'Site Modları', icon: ToggleLeft },
      { href: '/admin/feature-flags', label: 'Feature Flags', icon: Sliders },
      { href: '/admin/audit-logs', label: 'Sistem Logları', icon: Database },
    ]
  }
];

export function AdminSidebar({ userRole, userName }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const getRoleLabel = (role: RoleType) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'Super Admin';
      case 'ADMIN': return 'Yönetici';
      case 'MODERATOR': return 'Moderatör';
      case 'GAME_LEADER': return 'Oyun Lideri';
      default: return 'Kullanıcı';
    }
  };

  const filteredGroups = MENU_GROUPS.filter(group => group.allowedRoles.includes(userRole));

  return (
    <>
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-panel rounded-md border border-white/10"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-white/5 transform transition-transform duration-300
        flex flex-col h-screen
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden">
              <Image src="/ate-logo.png" alt="ATE Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-primary-red transition-colors">ATE</span>
              <span className="text-[10px] font-bold text-primary-red bg-primary-red/10 px-1.5 py-0.5 rounded uppercase tracking-widest self-start">ADMIN</span>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide">
          {filteredGroups.map((group, i) => (
            <div key={i} className="mb-8">
              <h3 className="px-2 text-xs font-bold text-white/30 uppercase tracking-widest mb-3">
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.items.map((item, j) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={j}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${isActive 
                          ? 'bg-primary-red/10 text-primary-red border border-primary-red/20' 
                          : 'text-secondary hover:bg-white/5 hover:text-white'
                        }
                      `}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? 'text-primary-red' : 'text-white/40'}`} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="shrink-0 p-4 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <User className="w-5 h-5 text-white/50" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">{userName}</span>
              <span className="text-xs font-medium text-secondary">{getRoleLabel(userRole)}</span>
            </div>
          </div>
          
          <button onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/login'); router.refresh(); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-white/5 hover:text-white transition-colors">
            <LogOut className="w-4 h-4 text-white/40" />
            Çıkış Yap
          </button>
        </div>
      </div>
      
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
