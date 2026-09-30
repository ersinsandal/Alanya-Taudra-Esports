"use client";
import React, { useState } from 'react';
import { Search, Filter, Check, X, FileText, Gamepad2 } from 'lucide-react';

export default function CrewAppsClient({ initialApps }: { initialApps: any[] }) {
  const [apps, setApps] = useState(initialApps.map(a => ({
    id: a.id,
    userId: a.user.id,
    candidate: a.user.username,
    game: a.game.name,
    date: new Date(a.createdAt).toLocaleDateString('tr-TR'),
    status: a.status // SUBMITTED, APPROVED, REJECTED
  })));

  const handleUpdate = async (id: string, newStatus: string) => {
    try {
      await fetch('/api/admin/crew-applications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      setApps(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">Oyun Lideri Başvuruları</h1>
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
                <th className="px-6 py-4">Oyun</th>
                <th className="px-6 py-4">Başvuru Tarihi</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {apps.map((app) => (
                <tr key={app.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#050505] border border-white/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#99999F]" />
                      </div>
                      <span className="font-bold text-white">{app.candidate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4" />
                      {app.game}
                    </div>
                  </td>
                  <td className="px-6 py-4">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      app.status === 'SUBMITTED' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      app.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {app.status === 'SUBMITTED' ? 'Bekliyor' : app.status === 'APPROVED' ? 'Onaylandı' : 'Reddedildi'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {app.status === 'SUBMITTED' && (
                        <>
                          <button 
                            onClick={() => handleUpdate(app.id, 'APPROVED')}
                            className="p-1.5 text-emerald-400 hover:text-emerald-300 bg-emerald-400/10 rounded-md hover:bg-emerald-400/20 transition-colors cursor-pointer" 
                            title="Onayla"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleUpdate(app.id, 'REJECTED')}
                            className="p-1.5 text-[#D00000] hover:text-red-400 bg-[#D00000]/10 rounded-md hover:bg-[#D00000]/20 transition-colors cursor-pointer" 
                            title="Reddet"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {apps.length === 0 && (
            <div className="text-center py-12 text-[#99999F]">
              Başvuru bulunmuyor.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
