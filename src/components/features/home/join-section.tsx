import Link from 'next/link';
import { Gamepad2, Video, Building2, Crown, Swords, Headset } from 'lucide-react';

export function JoinSection() {
  const roles = [
    {
      title: 'Oyuncu',
      desc: 'Topluluğa katıl, arkadaşlarınla rekabet et.',
      icon: Gamepad2,
      href: '/register',
    },
    {
      title: 'Oyun Lideri',
      desc: 'Oyun ekiplerine liderlik et, etkinlikleri yönet.',
      icon: Crown,
      href: '/register',
    },
    {
      title: 'İçerik Üreticisi',
      desc: 'ATE ailesinin yüzü ol, yayınlarını duyur.',
      icon: Video,
      href: '/register',
    },
    {
      title: 'Okul Temsilcisi',
      desc: 'Okulunu temsil et, okulunun komünitesini kur.',
      icon: Building2,
      href: '/representative',
    },
    {
      title: 'Turnuva Hakemi',
      desc: 'Maçları yönet, adil rekabeti sağla.',
      icon: Swords,
      href: '/register',
    },
    {
      title: 'Topluluk Yöneticisi',
      desc: 'Platform düzenini ve sohbetleri denetle.',
      icon: Headset,
      href: '/register',
    },
  ];

  return (
    <section className="py-20 bg-[#050505]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-black text-white uppercase tracking-tight">ATE'YE KATIL</h2>
          <div className="w-16 h-1 bg-primary-red mx-auto mt-4" />
          <p className="text-secondary mt-6 max-w-2xl mx-auto text-lg">
            Sen de Alanya Taudra E-Sports ekosisteminin bir parçası olabilirsin. Sana en uygun rolü seç ve ailemize katıl.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Link
                key={role.title}
                href={role.href}
                className="group p-6 bg-panel border border-white/5 rounded-xl hover:border-primary-red/50 transition-all duration-300 flex flex-col items-center text-center h-full hover:shadow-[0_0_20px_rgba(255,31,45,0.1)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-red/10 group-hover:scale-110 transition-all duration-300 relative z-10">
                  <Icon className="w-8 h-8 text-secondary group-hover:text-primary-red transition-colors" />
                </div>
                
                <h3 className="font-heading font-black text-xl text-white mb-3 uppercase tracking-wide relative z-10">{role.title}</h3>
                <p className="text-secondary text-sm mb-6 leading-relaxed relative z-10">{role.desc}</p>
                
                <span className="mt-auto text-sm font-bold text-primary-red opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 relative z-10 uppercase tracking-widest">
                  Başvur &rarr;
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
