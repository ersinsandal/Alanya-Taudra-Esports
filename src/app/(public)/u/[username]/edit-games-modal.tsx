"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Gamepad2, Trash2, Loader2 } from "lucide-react";

export function EditGamesModal({ user, games, children }: { user: any, games: any[], children?: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gameProfileForm, setGameProfileForm] = useState({
    gameId: games[0]?.id || "",
    inGameName: "",
    currentRank: "",
    mainRole: "",
    lookingForTeam: false
  });

  const handleSaveGameProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameProfileForm.gameId || !gameProfileForm.inGameName) {
      alert("Oyun ve Oyun İçi Nick zorunludur.");
      return;
    }

    setLoading(true);
    try {
      const { upsertGameProfile } = await import('@/lib/actions/profile');
      const res = await upsertGameProfile(gameProfileForm);
      if (res.success) {
        setGameProfileForm(prev => ({ ...prev, inGameName: "", currentRank: "", mainRole: "", lookingForTeam: false }));
        router.refresh();
      } else {
        alert(res.error || "Hata oluştu");
      }
    } catch (err) {
      alert("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGameProfile = async (gameId: string) => {
    if (!confirm("Bu oyun profilini silmek istediğinize emin misiniz?")) return;
    try {
      const { deleteGameProfile } = await import('@/lib/actions/profile');
      const res = await deleteGameProfile(gameId);
      if (res.success) {
        router.refresh();
      } else {
        alert(res.error || "Silinemedi");
      }
    } catch (e) {
      alert("Hata oluştu");
    }
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="inline-block cursor-pointer">
        {children || (
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-red hover:bg-deep-red text-white text-sm font-medium rounded-lg transition-colors cursor-pointer">
            <Plus className="w-4 h-4" />
            Oyun Ekle / Düzenle
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111114] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold font-heading text-white mb-6 flex items-center gap-2">
              <Gamepad2 className="text-primary-red" /> Oyun Profillerini Yönet
            </h2>

            <div className="bg-panel border border-border/50 rounded-xl p-5 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Yeni Oyun Ekle</h3>
              <form onSubmit={handleSaveGameProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-secondary-text mb-1 block">Oyun Seç</label>
                    <select value={gameProfileForm.gameId} onChange={e => setGameProfileForm({...gameProfileForm, gameId: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white">
                      {games.map(g => (
                        <option key={g.id} value={g.id} className="bg-[#050505]">{g.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-secondary-text mb-1 block">Oyun İçi Nick (IGN)</label>
                    <input type="text" value={gameProfileForm.inGameName} onChange={e => setGameProfileForm({...gameProfileForm, inGameName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="Player#TAG" required />
                  </div>
                  <div>
                    <label className="text-sm text-secondary-text mb-1 block">Mevcut Kademe (Rank)</label>
                    <input type="text" value={gameProfileForm.currentRank} onChange={e => setGameProfileForm({...gameProfileForm, currentRank: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="Örn: Diamond 3" />
                  </div>
                  <div>
                    <label className="text-sm text-secondary-text mb-1 block">Ana Rol / Mevki</label>
                    <input type="text" value={gameProfileForm.mainRole} onChange={e => setGameProfileForm({...gameProfileForm, mainRole: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="Örn: Duelist, Entry Fragger" />
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-secondary/30 p-3 rounded-lg border border-white/5 mt-4">
                  <input type="checkbox" id="lft-modal" checked={gameProfileForm.lookingForTeam} onChange={e => setGameProfileForm({...gameProfileForm, lookingForTeam: e.target.checked})} className="w-4 h-4 rounded border-white/10 text-primary-red cursor-pointer" />
                  <label htmlFor="lft-modal" className="text-sm text-white font-medium cursor-pointer flex-1">Takım Arıyorum (LFT)</label>
                  <button type="submit" disabled={loading} className="px-5 py-2 bg-primary-red text-white text-sm font-medium rounded-lg hover:bg-deep-red transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2">
                    {loading && <Loader2 className="w-4 h-4 animate-spin"/>} Ekle / Güncelle
                  </button>
                </div>
              </form>
            </div>

            <h3 className="text-lg font-bold text-white mb-4">Kayıtlı Oyun Profillerin</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.gameProfiles?.length > 0 ? user.gameProfiles.map((gp: any) => (
                <div key={gp.id} className="bg-secondary/20 border border-white/10 rounded-xl p-4 relative group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-white">{gp.game.name}</h4>
                      <div className="text-primary-red font-mono text-xs">{gp.inGameName}</div>
                    </div>
                    {gp.lookingForTeam && <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/20">LFT</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                    <div className="bg-black/30 p-2 rounded"><span className="text-secondary-text block mb-1">Rank</span><span className="text-white">{gp.currentRank || '-'}</span></div>
                    <div className="bg-black/30 p-2 rounded"><span className="text-secondary-text block mb-1">Rol</span><span className="text-white">{gp.mainRole || '-'}</span></div>
                  </div>
                  <button onClick={() => handleDeleteGameProfile(gp.gameId)} className="absolute top-3 right-3 text-secondary-text hover:text-red-500 transition-colors p-1 bg-black/50 rounded-full cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )) : (
                <div className="col-span-full p-4 text-center text-secondary-text bg-black/20 rounded-xl border border-white/5">
                  Henüz oyun profili eklemedin.
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
