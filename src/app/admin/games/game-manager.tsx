'use client';

import React, { useState } from 'react';
import { Gamepad2, Crosshair, Swords, Plus, Shield, Loader2, Play } from 'lucide-react';
import { createGameAndCrew } from '../actions';
import Link from 'next/link';

interface GameManagerProps {
  initialGames: any[];
  isSuperAdmin: boolean;
}

export function GameManager({ initialGames, isSuperAdmin }: GameManagerProps) {
  const [games, setGames] = useState(initialGames);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await createGameAndCrew(formData);
    
    if (result.success) {
      setIsModalOpen(false);
      // Let Next.js server actions revalidate and refresh the page, 
      // but we can optionally do a window.location.reload() or router.refresh() 
      // if using next/navigation. A simple reload is fine for now to fetch new data.
      window.location.reload();
    } else {
      setError(result.error || 'Bir hata oluştu.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase">Oyun Yönetimi</h1>
        {isSuperAdmin ? (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-red hover:bg-[#A00000] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Yepyeni Oyun Ekle
          </button>
        ) : (
          <div className="text-sm text-secondary bg-white/5 px-4 py-2 rounded-lg border border-white/5">
            Sadece Super Admin yeni oyun ekleyebilir.
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map(game => (
          <div key={game.id} className="bg-panel border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all group flex flex-col h-full">
            <div className="h-32 relative bg-black border-b border-white/5">
              {game.crewLogo || game.icon ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"
                  style={{ backgroundImage: `url(${game.crewLogo || game.icon})`, backgroundPosition: 'center 25%' }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-black/80" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent" />
              
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                {game.category}
              </div>
            </div>

            <div className="p-5 relative z-10 -mt-6 flex flex-col flex-1">
              <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight drop-shadow-md">{game.name}</h3>
              
              <div className="mt-auto pt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shadow-inner">
                     <Shield className="w-5 h-5 text-[#D00000]" />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] font-bold text-[#99999F] uppercase tracking-wider">Topluluk Ekibi</span>
                     <span className="text-sm font-medium text-white line-clamp-1" title={game.crewName}>{game.crewName}</span>
                   </div>
                </div>
                <Link href="/admin/crews" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors">
                  Yönet
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-panel border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Play className="w-6 h-6 text-primary-red" /> Yeni Oyun Ekle
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-secondary hover:text-white transition-colors text-2xl font-bold">
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm font-medium">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary uppercase tracking-wider">Oyun Adı</label>
                <input required name="gameName" type="text" placeholder="Örn: Minecraft" className="w-full bg-background border border-white/10 rounded-lg p-3 text-white focus:border-primary-red outline-none transition-colors" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary uppercase tracking-wider">Topluluk Ekibi Adı</label>
                <input required name="crewName" type="text" placeholder="Örn: Minecraft Ekibi" className="w-full bg-background border border-white/10 rounded-lg p-3 text-white focus:border-primary-red outline-none transition-colors" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary uppercase tracking-wider">Kategori</label>
                <select name="category" className="w-full bg-background border border-white/10 rounded-lg p-3 text-white focus:border-primary-red outline-none transition-colors appearance-none">
                  <option value="PC" className="bg-[#050505] text-white">PC</option>
                  <option value="MOBILE" className="bg-[#050505] text-white">Mobil</option>
                  <option value="CONSOLE" className="bg-[#050505] text-white">Konsol</option>
                  <option value="SPORTS" className="bg-[#050505] text-white">Spor (FC vb.)</option>
                  <option value="RACING" className="bg-[#050505] text-white">Yarış</option>
                  <option value="FIGHTING" className="bg-[#050505] text-white">Dövüş</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary uppercase tracking-wider">Kapak Fotoğrafı URL (İsteğe Bağlı)</label>
                <input name="coverUrl" type="url" placeholder="https://..." className="w-full bg-background border border-white/10 rounded-lg p-3 text-white focus:border-primary-red outline-none transition-colors" />
                <p className="text-xs text-secondary/60 mt-1">Bu resim doğrudan ana sayfadaki 'Oyun Ekipleri' kartlarına yansıyacaktır.</p>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-bold transition-colors">
                  İptal
                </button>
                <button type="submit" disabled={loading} className="flex-2 px-4 py-3 bg-primary-red hover:bg-red-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sisteme Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
