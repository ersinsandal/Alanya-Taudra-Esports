import React from 'react';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { Building2, Users, Trophy, UserCog, Edit, Info } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Üniversite Yönetimi | ATE Digital Arena Admin',
  description: 'Üniversiteler, temsilciler ve kayıtlı oyuncular',
};

export default async function UniversitiesAdminPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const userRoles = user.roles?.map(r => r.role.name) || [];
  const isSuperAdmin = userRoles.includes('SUPER_ADMIN');
  const isAdmin = userRoles.includes('ADMIN');

  let uniWhere = {};

  const universities = await prisma.university.findMany({
    where: uniWhere,
    include: {
      profiles: {
        include: { user: true }
      },
      teams: true
    },
    orderBy: { name: 'asc' }
  });

  const allProfiles = universities.flatMap(u => 
    u.profiles.map(p => ({
      id: p.id,
      name: p.user.username,
      uni: u.name,
      faculty: '-',
      game: '-', // We don't have direct game relation on profile easily here, mock display
      date: p.createdAt.toISOString().split('T')[0]
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 50);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white uppercase">Üniversite Yönetimi</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {universities.map((uni) => (
          <div key={uni.id} className="bg-panel border border-white/10 rounded-xl overflow-hidden flex flex-col sm:flex-row">
            <div className={`sm:w-32 h-32 sm:h-auto bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-6 shrink-0`}>
              <Building2 className="w-12 h-12 text-white/80" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-4 line-clamp-2" title={uni.name}>{uni.name}</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#99999F]">
                    <UserCog className="w-4 h-4" />
                    <span>Temsilci: <strong className="text-white font-medium">Atanmadı</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#99999F]">
                    <Users className="w-4 h-4" />
                    <span>Kayıtlı Oyuncu: <strong className="text-white font-medium">{uni.profiles.length}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#99999F]">
                    <Trophy className="w-4 h-4" />
                    <span>Aktif Takım: <strong className="text-white font-medium">{uni.teams.length}</strong></span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-auto">
                <Link href={`/admin/universities/${uni.id}`} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium">
                  <Info className="w-4 h-4" />
                  Detay
                </Link>
                <Link href={`/admin/universities/${uni.id}/edit`} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium">
                  <Edit className="w-4 h-4" />
                  Düzenle
                </Link>
              </div>
            </div>
          </div>
        ))}
        {universities.length === 0 && (
          <div className="col-span-full p-8 text-center text-[#99999F] border border-dashed border-white/10 rounded-xl">
            Henüz kayıtlı veya yetkiniz dahilinde olan bir üniversite bulunamadı.
          </div>
        )}
      </div>

      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-space font-bold text-lg text-white">Son Kayıtlı Oyuncular</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Oyuncu</th>
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Üniversite</th>
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Fakülte</th>
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Oyun</th>
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Kayıt Tarihi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {allProfiles.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-medium text-white">{p.name}</td>
                  <td className="p-4 text-sm text-[#99999F]">{p.uni}</td>
                  <td className="p-4 text-sm text-[#99999F]">{p.faculty}</td>
                  <td className="p-4 text-sm text-white font-medium">{p.game}</td>
                  <td className="p-4 text-sm text-[#99999F]">{p.date}</td>
                </tr>
              ))}
              {allProfiles.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#99999F]">Henüz öğrenci kaydı bulunmuyor.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
