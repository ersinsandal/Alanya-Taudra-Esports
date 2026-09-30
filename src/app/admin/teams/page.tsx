import React from 'react';
import { prisma } from '@/lib/db';
import { Search, Shield, Users, Trophy, MoreVertical, CheckCircle, XCircle } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth/session';

export default async function TeamsAdminPage() {
  const user = await getCurrentUser();
  const isSuperAdmin = user?.roles?.some((ur: any) => ur.role.name === 'SUPER_ADMIN') || false;

  const rawTeams = await prisma.team.findMany({
    include: {
      game: true,
      _count: { select: { members: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  const teams = rawTeams.map(t => ({
    id: t.id,
    name: t.name,
    game: t.game.name,
    members: t._count.members,
    status: t.isOpen ? 'Aktif' : 'Pasif',
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase">Resmi Takımlar</h1>
        {isSuperAdmin && (
          <button className="bg-primary-red hover:bg-[#A00000] text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Yeni Takım Oluştur
          </button>
        )}
      </div>

      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Takım adı veya oyun ara..." 
              className="w-full bg-[#1A1A24] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-secondary focus:outline-none focus:border-primary-red transition-colors"
            />
          </div>
          
          <select className="bg-[#1A1A24] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-red transition-colors cursor-pointer appearance-none">
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif Takımlar</option>
            <option value="passive">Pasif Takımlar</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div key={team.id} className="bg-[#1A1A24] border border-white/10 rounded-xl p-5 hover:border-primary-red/50 transition-colors group relative">
              <div className="absolute top-4 right-4 cursor-pointer text-secondary hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </div>
              
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                  <Shield className="w-6 h-6 text-primary-red" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{team.name}</h3>
                  <p className="text-secondary text-sm">{team.game}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-panel rounded-lg p-3 border border-white/5">
                  <div className="flex items-center text-secondary text-xs mb-1">
                    <Users className="w-3.5 h-3.5 mr-1.5" />
                    Kadro
                  </div>
                  <div className="text-lg font-bold text-white">{team.members} <span className="text-xs text-secondary font-normal">/ 5</span></div>
                </div>
                <div className="bg-panel rounded-lg p-3 border border-white/5">
                  <div className="flex items-center text-secondary text-xs mb-1">
                    <Trophy className="w-3.5 h-3.5 mr-1.5" />
                    Kupa
                  </div>
                  <div className="text-lg font-bold text-white">0</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  {team.status === 'Aktif' ? (
                    <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                      <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Aktif
                    </span>
                  ) : (
                    <span className="flex items-center text-xs font-medium text-red-400 bg-red-400/10 px-2 py-1 rounded">
                      <XCircle className="w-3.5 h-3.5 mr-1.5" /> Pasif
                    </span>
                  )}
                </div>
                
                <button className="text-sm font-medium text-primary-red hover:text-[#A00000] transition-colors">
                  Takımı Yönet →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
