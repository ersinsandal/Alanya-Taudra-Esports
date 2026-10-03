'use client';

import React, { useState } from 'react';
import { Gamepad2, Crosshair, Swords, Plus, Shield, Loader2, Play } from 'lucide-react';
import { createGameAndCrew } from '../actions';

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
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase">Oyun & Ekip Yönetimi</h1>
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
          <div key={game.id} className="bg-panel border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all group">
            <div className="h-32 relative bg-black border-b border-white/5">
              {game.crewLogo ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"
                  style={{ backgroundImage: `url(${game.crewLogo})` }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-black/80" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent" />
              
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                {game.category}
              </div>
            </div>

            <div className="p-5 relative z-10 -mt-6">
              <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center border-2 border-primary-red text-primary-red mb-3 shadow-xl overflow-hidden p-1">
                {game.icon ? (
                  <img src={game.icon} alt={game.name} className="w-full h-full object-contain" />
                ) : game.category === 'FPS' ? <Crosshair className="w-6 h-6" /> : 
                 game.category === 'MOBA' ? <Swords className="w-6 h-6" /> : 
                 <Gamepad2 className="w-6 h-6" />}
              </div>
              
              <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight">{game.name}</h3>
              
              <div className="mt-4 flex items-center gap-2 text-sm text-secondary bg-white/5 p-2 rounded-lg border border-white/5">
                <Shield className="w-4 h-4 text-green-500" />
                <span>{game.crewName}</span>
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
                  <option value="PC">PC</option>
                  <option value="MOBILE">Mobil</option>
                  <option value="CONSOLE">Konsol</option>
                  <option value="SPORTS">Spor (FC vb.)</option>
                  <option value="RACING">Yarış</option>
                  <option value="FIGHTING">Dövüş</option>
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
