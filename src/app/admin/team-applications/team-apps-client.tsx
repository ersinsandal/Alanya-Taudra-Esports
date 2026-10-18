"use client";
import React, { useState } from 'react';
import { Search, Filter, Check, X, Gamepad2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { updateTeamApplicationStatus } from './actions';

export default function TeamAppsClient({ initialApps }: { initialApps: any[] }) {
  const router = useRouter();
  const [apps, setApps] = useState(initialApps.map(a => ({
    id: a.id,
    userId: a.user.id,
    candidate: a.user.username,
    team: a.team.name,
    game: a.team.game.name,
    date: new Date(a.createdAt).toLocaleDateString('tr-TR'),
    status: a.status // PENDING, ACCEPTED, REJECTED
  })));

  const handleUpdate = async (id: string, newStatus: string) => {
    const res = await updateTeamApplicationStatus(id, newStatus);
    if (res.success) {
      setApps(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white uppercase">ATE Takım Oyuncu Başvuruları</h1>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99999F]" />
            <input 
              type="text"
              placeholder="Başvuru ara..."
              className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white focus:outline-none focus:border-[#D00000] transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-colors cursor-pointer">
            <Filter className="w-4 h-4" />
            <span>Tümü</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#99999F]">
            <thead className="text-xs uppercase bg-white/5 text-white border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Aday</th>
                <th className="px-6 py-4">Takım</th>
                <th className="px-6 py-4">Oyun</th>
                <th className="px-6 py-4">Tarih</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {apps.map((app) => (
                <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{app.candidate}</td>
                  <td className="px-6 py-4">{app.team}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4 text-[#D00000]" />
                      {app.game}
                    </span>
                  </td>
                  <td className="px-6 py-4">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      app.status === 'ACCEPTED' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      app.status === 'REJECTED' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}>
                      {app.status === 'PENDING' ? 'Bekliyor' : app.status === 'ACCEPTED' ? 'Kabul Edildi' : 'Reddedildi'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {app.status === 'PENDING' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleUpdate(app.id, 'ACCEPTED')}
                          className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"
                          title="Kabul Et"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleUpdate(app.id, 'REJECTED')}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Reddet"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm">İşlem Tamamlandı</span>
                    )}
                  </td>
                </tr>
              ))}
              {apps.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#99999F]">
                    Henüz başvuru bulunmuyor.
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
