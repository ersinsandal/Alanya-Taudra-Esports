import { Metadata } from 'next';
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getCurrentUser } from '@/lib/auth/session';
import { Building2, Users, Lock, Calendar } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const uni = await db.university.findUnique({ where: { slug } });
  
  if (!uni) return { title: 'Üniversite Bulunamadı' };
  return { title: `${uni.name} | ATE Digital Arena` };
}

export default async function UniversityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await getCurrentUser();
  
  let uni = null;
  try {
    uni = await db.university.findUnique({
      where: { slug },
      include: {
        profiles: {
          include: {
            user: true
          }
        }
      }
    });
  } catch(e) {
    console.error("DB Error fetching university");
  }

  // Fallback for mock data if DB is empty or fails
  if (!uni && slug === '1') {
    uni = {
      name: 'Alanya Alaaddin Keykubat Üniversitesi (ALKÜ)',
      type: 'STATE',
      profiles: [
        { firstName: 'Mehmet', lastName: 'Demir', birthDate: new Date('2003-02-15'), user: { username: 'MehmetD' } },
        { firstName: 'Elif', lastName: 'Çelik', birthDate: new Date('2004-11-30'), user: { username: 'ElifC' } }
      ]
    } as any;
  }

  if (!uni) notFound();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <Link href="/schools" className="text-secondary hover:text-white mb-8 inline-block text-sm font-bold uppercase tracking-wider">
        &larr; Okullara Dön
      </Link>
      
      <div className="bg-panel border border-white/5 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary-red" />
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-white uppercase tracking-tight mb-2">
              {uni.name}
            </h1>
            <div className="flex items-center gap-4 text-sm font-bold text-secondary">
              <span className="bg-white/5 px-3 py-1 rounded-md border border-white/10 uppercase tracking-wider">
                {uni.type === 'STATE' ? 'Devlet Üniversitesi' : 'Vakıf Üniversitesi'}
              </span>
            </div>
          </div>
          <Building2 className="w-16 h-16 text-white/5" />
        </div>
      </div>

      <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
          <h2 className="text-2xl font-heading font-black text-white uppercase tracking-wide flex items-center">
            <Users className="w-6 h-6 mr-3 text-primary-red" /> Kayıtlı Öğrenciler
          </h2>
          
          {user ? (
            <span className="text-sm font-bold text-white bg-primary-red/20 border border-primary-red/30 px-4 py-1.5 rounded-full">
              {uni.profiles?.length || 0} Öğrenci
            </span>
          ) : (
            <span className="text-xs font-bold text-secondary bg-black/50 border border-white/10 px-4 py-1.5 rounded-full flex items-center">
              <Lock className="w-3 h-3 mr-2" /> Sayı Gizli
            </span>
          )}
        </div>

        {!user ? (
          <div className="text-center py-16 px-4 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-red/5 to-transparent" />
            <Lock className="w-12 h-12 text-white/20 mx-auto mb-4 relative z-10" />
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Öğrenci Listesi Gizli</h3>
            <p className="text-secondary mb-6 max-w-md mx-auto relative z-10">
              Bu üniversitedeki kayıtlı öğrencileri ve tam sayıyı görmek için ATE ID ile giriş yapmalısınız.
            </p>
            <Link href="/auth/login" className="relative z-10 inline-flex px-6 py-3 bg-primary-red hover:bg-[#FF1F2D] text-white font-bold uppercase tracking-widest rounded-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,31,45,0.3)]">
              ATE ID Oluştur / Giriş Yap
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uni.profiles?.length > 0 ? uni.profiles.map((profile: any, idx: number) => (
              <div key={idx} className="flex items-center p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-white/50 mr-4">
                  {profile.firstName?.charAt(0)}{profile.lastName?.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{profile.firstName} {profile.lastName}</div>
                  <div className="text-xs text-secondary flex items-center mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    Doğum Yılı: {profile.birthDate ? new Date(profile.birthDate).getFullYear() : 'Belirtilmedi'}
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-2 text-center py-8 text-secondary">
                Bu üniversiteden henüz kayıtlı öğrenci bulunmuyor.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
