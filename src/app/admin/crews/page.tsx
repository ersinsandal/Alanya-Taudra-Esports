import React from 'react';
import { prisma } from '@/lib/db';
import { Shield, Users, Trophy } from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth/session';

export default async function CrewsPage() {
  const user = await getCurrentUser();
  const isGameLeaderOnly = !user?.roles?.some((ur: any) => ['SUPER_ADMIN', 'ADMIN'].includes(ur.role.name));

  const rawCrews = await prisma.crew.findMany({
    include: {
      game: true,
      _count: { select: { members: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  const crews = rawCrews.map(c => ({
    id: c.id,
    name: c.name,
    gameName: c.game.name,
    logoUrl: c.logoUrl,
    gameIcon: c.game.icon,
    memberCount: c._count.members,
    status: 'Aktif'
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase">Oyun Ekipleri Yönetimi</h1>
        {!isGameLeaderOnly && (
          <button className="bg-primary-red hover:bg-[#A00000] text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Yeni Ekip Oluştur
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {crews.map((crew) => (
          <div key={crew.id} className="bg-panel border border-white/10 rounded-xl overflow-hidden hover:border-primary-red/50 transition-colors group">
            {/* Background Cover */}
            <div className="h-32 relative bg-black border-b border-white/5">
              {crew.logoUrl || crew.gameIcon ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"
                  style={{ backgroundImage: `url(${crew.logoUrl || crew.gameIcon})`, backgroundPosition: 'center 25%' }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-black/80" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent" />
              
              <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium">
                {crew.status}
              </div>
            </div>

            <div className="p-6 relative z-10 -mt-6">
              <h2 className="text-xl font-bold text-white mb-6 drop-shadow-md">{crew.name}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#1A1A24] rounded-lg p-3 border border-white/5">
                <div className="flex items-center text-secondary text-xs mb-1">
                  <Users className="w-3.5 h-3.5 mr-1.5" />
                  Toplam Üye
                </div>
                <div className="text-lg font-bold text-white">{crew.memberCount}</div>
              </div>
              <div className="bg-[#1A1A24] rounded-lg p-3 border border-white/5">
                <div className="flex items-center text-secondary text-xs mb-1">
                  <Trophy className="w-3.5 h-3.5 mr-1.5" />
                  Başarı
                </div>
                <div className="text-lg font-bold text-white">0</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-[#1A1A24] hover:bg-white/10 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                Detaylar
              </button>
              <button className="flex-1 bg-[#1A1A24] hover:bg-white/10 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                Ayarlar
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
