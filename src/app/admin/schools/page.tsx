import React from 'react';
import { prisma } from '@/lib/db';
import { Building2, Users, Trophy, UserCog, Edit, Info } from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Okul Yönetimi | ATE Digital Arena Admin',
  description: 'Okullar, temsilciler ve kayıtlı oyuncular',
};

export default async function SchoolsAdminPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const isSuperAdmin = user.roles.some((r: any) => r.role.name === 'SUPER_ADMIN' || r.role.name === 'ADMIN');
  const isSchoolRep = user.roles.some((r: any) => r.role.name === 'SCHOOL_REP');
  
  if (!isSuperAdmin && !isSchoolRep) {
    redirect('/admin');
  }

  // If school rep, only fetch their school(s)
  let schoolWhere = {};
  if (!isSuperAdmin && isSchoolRep) {
    schoolWhere = {
      representative: {
        userId: user.id
      }
    };
  }

  const rawSchools = await prisma.school.findMany({
    where: schoolWhere,
    include: {
      representative: {
        include: {
          user: {
            include: {
              profile: true
            }
          }
        }
      },
      _count: {
        select: { profiles: true, teams: true }
      }
    },
    orderBy: { name: 'asc' }
  });

  const schools = rawSchools.map((s, index) => {
    // Generate a consistent gradient color based on index
    const colors = [
      "from-blue-600 to-blue-800",
      "from-orange-500 to-red-600",
      "from-green-500 to-emerald-700",
      "from-purple-500 to-indigo-700"
    ];
    
    let repName = "Atanmadı";
    if (s.representative?.user?.profile) {
      repName = `${s.representative.user.profile.firstName} ${s.representative.user.profile.lastName}`;
    } else if (s.representative?.user) {
      repName = s.representative.user.username;
    }

    return {
      id: s.id,
      name: s.name,
      rep: repName,
      players: s._count.profiles,
      teams: s._count.teams,
      logoColor: colors[index % colors.length]
    };
  });

  // Get registered players for these schools
  const schoolIds = rawSchools.map(s => s.id);
  const rawPlayers = await prisma.userProfile.findMany({
    where: { 
      schoolId: { in: schoolIds }
    },
    include: {
      user: true,
      school: true
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  const registeredPlayers = rawPlayers.map(p => ({
    id: p.id,
    name: `${p.firstName} ${p.lastName}`,
    username: p.user.username,
    school: p.school?.name || "-",
    date: p.createdAt.toISOString().split('T')[0],
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white uppercase">OKUL YÖNETİMİ</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="bg-panel border border-white/10 rounded-xl overflow-hidden flex flex-col sm:flex-row">
            <div className={`sm:w-32 h-32 sm:h-auto bg-gradient-to-br ${school.logoColor} flex items-center justify-center p-6 shrink-0`}>
              <Building2 className="w-12 h-12 text-white/80" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-4 line-clamp-2" title={school.name}>{school.name}</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#99999F]">
                    <UserCog className="w-4 h-4" />
                    <span>Temsilci: <strong className="text-white font-medium">{school.rep}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#99999F]">
                    <Users className="w-4 h-4" />
                    <span>Kayıtlı Oyuncu: <strong className="text-white font-medium">{school.players}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#99999F]">
                    <Trophy className="w-4 h-4" />
                    <span>Aktif Takım: <strong className="text-white font-medium">{school.teams}</strong></span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-auto">
                <Link href={`/admin/schools/${school.id}`} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium">
                  <Info className="w-4 h-4" />
                  Detay
                </Link>
                <Link href={`/admin/schools/${school.id}/edit`} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium">
                  <Edit className="w-4 h-4" />
                  Düzenle
                </Link>
              </div>
            </div>
          </div>
        ))}
        {schools.length === 0 && (
          <div className="col-span-full p-8 text-center text-secondary bg-panel rounded-xl border border-white/10">
            Gösterilecek okul bulunamadı.
          </div>
        )}
      </div>

      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-space font-bold text-lg text-white">Kayıtlı Oyuncular</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Oyuncu</th>
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Okul</th>
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Kullanıcı Adı</th>
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Kayıt Tarihi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {registeredPlayers.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-medium text-white">{p.name}</td>
                  <td className="p-4 text-sm text-[#99999F]">{p.school}</td>
                  <td className="p-4 text-sm text-white font-medium">{p.username}</td>
                  <td className="p-4 text-sm text-[#99999F]">{p.date}</td>
                </tr>
              ))}
              {registeredPlayers.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-sm text-secondary">
                    Kayıtlı oyuncu bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
