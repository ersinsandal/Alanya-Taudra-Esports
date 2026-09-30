import { Metadata } from 'next';
import Link from 'next/link';
import { Gamepad2, GraduationCap, Users, Video, HeartHandshake, Building2, Flag, Handshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bize Katıl | ATE Digital Arena',
  description: 'Alanya Taudra E-Sports ekosistemine katılmak için sana en uygun rolü seç.',
};

const joinOptions = [
  {
    title: 'OYUNCU',
    description: 'Rekabetçi sahnede kendini kanıtla ve resmi ATE takımlarında yer al.',
    icon: Gamepad2,
    href: '/register',
    color: 'from-blue-500/20 to-transparent border-blue-500/30 group-hover:border-blue-500',
  },
  {
    title: 'ACADEMY',
    description: 'Profesyonel koçlar eşliğinde yeteneklerini geliştir, ana takıma yükselme şansı yakala.',
    icon: GraduationCap,
    href: '/academy/apply',
    color: 'from-emerald-500/20 to-transparent border-emerald-500/30 group-hover:border-emerald-500',
  },
  {
    title: 'KOÇ',
    description: 'Taktiksel zekanı göster, takımları yönet ve şampiyonluğa taşı.',
    icon: Users,
    href: '/join/staff?role=coach',
    color: 'from-purple-500/20 to-transparent border-purple-500/30 group-hover:border-purple-500',
  },
  {
    title: 'ANALİST',
    description: 'Verileri incele, rakipleri çöz ve takıma stratejik avantaj sağla.',
    icon: Users,
    href: '/join/staff?role=analyst',
    color: 'from-cyan-500/20 to-transparent border-cyan-500/30 group-hover:border-cyan-500',
  },
  {
    title: 'İÇERİK ÜRETİCİSİ',
    description: 'Yayınlar yap, videolar üret, ATE markasının yüzü ol.',
    icon: Video,
    href: '/join/staff?role=content_creator',
    color: 'from-pink-500/20 to-transparent border-pink-500/30 group-hover:border-pink-500',
  },
  {
    title: 'OKUL TEMSİLCİSİ',
    description: 'Kendi okulunda ATE kültürünü yay, turnuvalar organize et.',
    icon: Building2,
    href: '/representative',
    color: 'from-yellow-500/20 to-transparent border-yellow-500/30 group-hover:border-yellow-500',
  },
  {
    title: 'GÖNÜLLÜ',
    description: 'Etkinliklerde görev al, organizasyon tecrübesi edin.',
    icon: HeartHandshake,
    href: '/join/staff?role=volunteer',
    color: 'from-orange-500/20 to-transparent border-orange-500/30 group-hover:border-orange-500',
  },
  {
    title: 'PARTNER',
    description: 'Vizyonumuzu paylaşan markalarla güçlü işbirlikleri kuralım.',
    icon: Handshake,
    href: '/partners',
    color: 'from-white/10 to-transparent border-white/20 group-hover:border-white/50',
  },
  {
    title: 'TARAFTAR',
    description: 'Dijital arenamıza üye ol, takımları destekle, çekilişlere katıl.',
    icon: Flag,
    href: '/register',
    color: 'from-[#D00000]/20 to-transparent border-[#D00000]/30 group-hover:border-[#D00000]',
  },
];

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="font-space text-4xl md:text-5xl font-bold text-[#F7F7F7] mb-4">
            ATE'YE KATIL
          </h1>
          <p className="text-lg text-[#99999F]">
            Sana en uygun rolü seç
          </p>
          <div className="w-16 h-1 bg-[#D00000] mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {joinOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.title}
                href={option.href}
                className={`group relative flex flex-col p-8 bg-gradient-to-br ${option.color} bg-[#111114] border rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50`}
              >
                <div className="mb-6 flex justify-between items-start">
                  <div className="p-3 bg-[rgba(255,255,255,0.05)] rounded-lg">
                    <Icon className="w-8 h-8 text-[#F7F7F7]" />
                  </div>
                </div>
                
                <h3 className="font-space font-bold text-xl text-[#F7F7F7] mb-3">
                  {option.title}
                </h3>
                
                <p className="text-[#99999F] text-sm leading-relaxed mb-6 flex-1">
                  {option.description}
                </p>

                <div className="flex items-center text-sm font-medium text-white group-hover:gap-2 transition-all">
                  <span>Hemen Başvur</span>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">&rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
