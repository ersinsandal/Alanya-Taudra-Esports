import Link from 'next/link';
import { Users, Lock } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth/session';

interface Crew {
  id: string;
  name: string;
  game: string;
  memberCount: number;
  slug: string;
  cover: string;
}

interface CrewsSectionProps {
  crews: Crew[];
}

export async function CrewsSection({ crews }: CrewsSectionProps) {
  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  return (
    <section className="py-20 bg-[#0B0B0D]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-heading text-3xl font-black text-white uppercase tracking-tight">OYUN EKİPLERİ</h2>
            <div className="w-16 h-1 bg-primary-red mt-4" />
          </div>
          <Link href="/crews" className="text-secondary hover:text-white transition-colors hidden sm:block font-medium">
            Tüm Ekipler &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {crews.length > 0 ? (
            crews.map((crew) => (
              <Link key={crew.id} href={isAuthenticated ? `/crews/${crew.slug}` : `/login`}>
                <div 
                  className="relative h-64 rounded-xl overflow-hidden group cursor-pointer border border-white/10 hover:border-primary-red/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,31,45,0.2)]"
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${crew.cover})` }}
                  />
                  
                  {/* Dark Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold font-heading text-white mb-2 leading-tight drop-shadow-lg">
                      {crew.name}
                    </h3>
                    
                    <div className="flex items-center text-sm font-bold text-white drop-shadow-md">
                      {isAuthenticated ? (
                        <div className="flex items-center bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                          <Users className="w-4 h-4 mr-2 text-white/70" />
                          {crew.memberCount} Üye
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center self-start bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 text-white/70">
                            <Lock className="w-3 h-3 mr-2" />
                            Üye Sayısı Gizli
                          </div>
                          <div className="text-xs text-white/60 font-medium">
                            Ekibi görüntülemek ve katılmak için ATE ID oluştur
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full p-8 text-center text-secondary bg-panel rounded-lg border border-white/10">
              Şu an gösterilecek ekip bulunmuyor.
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/crews" className="text-secondary hover:text-white transition-colors font-medium">
            Tüm Ekipler &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
