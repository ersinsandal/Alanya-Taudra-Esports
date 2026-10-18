import Link from 'next/link';
import { Gamepad2, Shield, Users, School, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bize Katıl | ATE Digital Arena',
  description: 'Alanya Taudra E-Sports ekosistemine katılmak için sana en uygun yolu seç.',
};

const roles = [
  {
    title: 'OYUNCU (TAKIMLARA KATIL)',
    description: 'Rekabetçi sahnede kendini kanıtla. Aktif takım başvurularını incele ve kadrolara dahil ol.',
    icon: Gamepad2,
    href: '/teams',
    color: 'from-blue-500/20 to-blue-600/20',
    hoverColor: 'hover:border-blue-500/50',
    iconColor: 'text-blue-400',
  },
  {
    title: 'OYUN EKİPLERİNE KATIL',
    description: 'Valorant, LoL, CS2 gibi topluluk ekiplerinde yer al. Ekip liderleriyle tanış ve etkinliklere katıl.',
    icon: Users,
    href: '/crews',
    color: 'from-emerald-500/20 to-emerald-600/20',
    hoverColor: 'hover:border-emerald-500/50',
    iconColor: 'text-emerald-400',
  },
  {
    title: 'OKUL TEMSİLCİSİ OL',
    description: 'Kendi okulunda ATE kültürünü yay, okul takımını kur ve liglere katıl.',
    icon: School,
    href: '/representative',
    color: 'from-purple-500/20 to-purple-600/20',
    hoverColor: 'hover:border-purple-500/50',
    iconColor: 'text-purple-400',
  },
  {
    title: 'YÖNETİM EKİBİ',
    description: 'Moderatör, Oyun Lideri veya Admin olarak yetki al, organizasyonun bir parçası ol.',
    icon: Shield,
    href: '/join/staff',
    color: 'from-primary-red/20 to-accent-red/20',
    hoverColor: 'hover:border-primary-red/50',
    iconColor: 'text-primary-red',
  }
];

export default function JoinPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-heading font-black text-white uppercase tracking-tight mb-4">
          ATE'YE KATIL
        </h1>
        <p className="text-xl text-secondary-text max-w-2xl mx-auto">
          Dijital arenamıza adım at ve sana en uygun rolü seç.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Link 
              key={role.title} 
              href={role.href}
              className={`group relative p-8 rounded-2xl bg-panel border border-white/5 transition-all duration-300 overflow-hidden ${role.hoverColor}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-7 h-7 ${role.iconColor}`} />
                </div>
                
                <h3 className="text-xl font-bold font-heading text-white mb-3">
                  {role.title}
                </h3>
                
                <p className="text-secondary-text mb-6 min-h-[48px]">
                  {role.description}
                </p>
                
                <div className="flex items-center text-sm font-bold text-white group-hover:text-primary-red transition-colors">
                  İlgili Sayfaya Git <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-secondary-text mb-4">Sadece platforma üye olup takipte kalmak mı istiyorsun?</p>
        <Link href="/register" className="inline-block px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-colors">
          Hemen Hesap Oluştur
        </Link>
      </div>
    </div>
  );
}
