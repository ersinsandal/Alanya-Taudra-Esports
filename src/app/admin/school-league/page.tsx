import React from 'react';
import { prisma } from '@/lib/db';
import { Trophy, Calendar, CheckCircle2, Search } from 'lucide-react';
import Link from 'next/link';

export default async function SchoolLeagueAdminPage() {
  let standings: any[] = [];
  try {
    const schools = await prisma.school.findMany({
      orderBy: { name: 'asc' },
      take: 20
    });
    standings = schools.map((s, index) => ({
      rank: index + 1,
      school: s.name,
      played: 0,
      won: 0,
      lost: 0,
      draw: 0,
      points: 0,
    }));
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase">Alanya Okul Ligi Yönetimi</h1>
      </div>

      <div className="bg-panel rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text"
              placeholder="Okul ara..."
              className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary-red transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-secondary text-xs uppercase tracking-widest font-bold border-b border-white/5">
                <th className="p-4 w-16 text-center">Sıra</th>
                <th className="p-4">Okul Adı</th>
                <th className="p-4 text-center">O</th>
                <th className="p-4 text-center text-green-500">G</th>
                <th className="p-4 text-center text-secondary">B</th>
                <th className="p-4 text-center text-red-500">M</th>
                <th className="p-4 text-center">Puan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {standings.map((s) => (
                <tr key={s.rank} className={`hover:bg-white/5 transition-colors ${s.rank <= 4 ? 'bg-green-500/5' : ''}`}>
                  <td className="p-4 text-center">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mx-auto ${
                      s.rank === 1 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                      s.rank === 2 ? 'bg-gray-300/20 text-gray-300 border border-gray-300/30' :
                      s.rank === 3 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/30' :
                      'bg-white/5 text-secondary border border-white/10'
                    }`}>
                      {s.rank}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-white">{s.school}</p>
                  </td>
                  <td className="p-4 text-center font-medium text-white">{s.played}</td>
                  <td className="p-4 text-center font-medium text-green-500">{s.won}</td>
                  <td className="p-4 text-center font-medium text-secondary">{s.draw}</td>
                  <td className="p-4 text-center font-medium text-red-500">{s.lost}</td>
                  <td className="p-4 text-center">
                    <span className="text-xl font-black text-white">{s.points}</span>
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
