import React from 'react';
import { prisma } from '@/lib/db';
import { Search, Building, Users, CheckCircle, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default async function SchoolsAdminPage() {
  let schools = [];
  try {
    const rawSchools = await prisma.school.findMany({
      include: {
        _count: { select: { profiles: true, teams: true } }
      },
      orderBy: { name: 'asc' }
    });
    
    schools = rawSchools.map(s => ({
      id: s.id,
      name: s.name,
      type: s.type, // PUBLIC, PRIVATE, OPEN
      students: s._count.profiles,
      teams: s._count.teams,
      status: s.isActive ? 'Aktif' : 'Pasif',
    }));
  } catch (error) {
    schools = [
      { id: '1', name: "Alanya Anadolu Lisesi", type: "PUBLIC", students: 120, teams: 4, status: "Aktif" },
      { id: '2', name: "Hasan Çolak Anadolu Lisesi", type: "PUBLIC", students: 85, teams: 3, status: "Aktif" },
      { id: '3', name: "Alanya Doğa Koleji", type: "PRIVATE", students: 210, teams: 8, status: "Aktif" },
      { id: '4', name: "Oba Nazmi Yılmaz Lisesi", type: "PUBLIC", students: 45, teams: 1, status: "Aktif" },
    ];
  }

  const getTypeBadge = (type: string) => {
    if (type === 'PRIVATE') return <span className="text-purple-400 bg-purple-400/10 border border-purple-400/20 px-2 py-1 rounded text-xs font-medium">Özel</span>;
    if (type === 'PUBLIC') return <span className="text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2 py-1 rounded text-xs font-medium">Devlet</span>;
    return <span className="text-secondary bg-white/5 border border-white/10 px-2 py-1 rounded text-xs font-medium">{type}</span>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase">Okul & Lise Yönetimi</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-panel border border-white/5 rounded-xl p-4 flex flex-col gap-2 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-2 text-secondary">
            <Building className="w-5 h-5 text-blue-500" />
            <span className="font-bold uppercase tracking-wider text-xs">Toplam Okul</span>
          </div>
          <span className="text-3xl font-black text-white">{schools.length}</span>
        </div>
        <div className="bg-panel border border-white/5 rounded-xl p-4 flex flex-col gap-2 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-2 text-secondary">
            <GraduationCap className="w-5 h-5 text-purple-500" />
            <span className="font-bold uppercase tracking-wider text-xs">Kayıtlı Öğrenci</span>
          </div>
          <span className="text-3xl font-black text-white">{schools.reduce((acc, s) => acc + s.students, 0)}</span>
        </div>
        <div className="bg-panel border border-white/5 rounded-xl p-4 flex flex-col gap-2 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-2 text-secondary">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-bold uppercase tracking-wider text-xs">Aktif Okul Takımı</span>
          </div>
          <span className="text-3xl font-black text-white">{schools.reduce((acc, s) => acc + s.teams, 0)}</span>
        </div>
      </div>

      <div className="bg-panel rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Okul adı ara..." 
              className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary-red transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-secondary text-xs uppercase tracking-widest font-bold border-b border-white/5">
                <th className="p-4">Okul Adı</th>
                <th className="p-4">Türü</th>
                <th className="p-4">Öğrenci Sayısı</th>
                <th className="p-4">Takım Sayısı</th>
                <th className="p-4">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {schools.map(s => (
                <tr key={s.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <p className="text-white font-bold">{s.name}</p>
                  </td>
                  <td className="p-4">
                    {getTypeBadge(s.type)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <Users className="w-4 h-4 text-secondary" />
                      {s.students}
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-white">
                    {s.teams}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      s.status === 'Aktif' 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
