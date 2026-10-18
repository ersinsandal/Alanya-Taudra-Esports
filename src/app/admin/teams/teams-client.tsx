'use client';
import React, { useState } from 'react';
import { Search, Shield, Users, Trophy, CheckCircle, XCircle, Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createTeam, toggleTeamStatus } from './actions';

export default function TeamsClient({ initialTeams, games, isSuperAdmin }: any) {
  const [teams, setTeams] = useState(initialTeams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData(e.currentTarget);
      const res = await createTeam(formData);
      if (res.success) {
        window.location.reload();
      }
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await toggleTeamStatus(id, !currentStatus);
      setTeams(teams.map((t: any) => t.id === id ? { ...t, isOpen: !currentStatus, status: !currentStatus ? 'Aktif' : 'Pasif' } : t));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase">Resmi Takımlar</h1>
        {isSuperAdmin && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-red hover:bg-[#A00000] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Yeni Takım Oluştur
          </button>
        )}
      </div>

      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {teams.map((team: any) => (
            <div key={team.id} className="bg-[#1A1A24] border border-white/10 rounded-xl p-5 hover:border-primary-red/50 transition-colors group flex flex-col">
              
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 overflow-hidden">
                  {team.gameIcon ? (
                    <img src={team.gameIcon} alt={team.game} className="w-full h-full object-cover" />
                  ) : (
                    <Shield className="w-6 h-6 text-primary-red" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{team.name}</h3>
                  <p className="text-secondary text-sm">{team.game}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 flex-1">
                <div className="bg-panel rounded-lg p-3 border border-white/5">
                  <div className="flex items-center text-secondary text-xs mb-1">
                    <Users className="w-3.5 h-3.5 mr-1.5" />
                    Kadro
                  </div>
                  <div className="text-lg font-bold text-white">{team.members} <span className="text-xs text-secondary font-normal">Oyuncu</span></div>
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
                <button 
                  onClick={() => handleToggleStatus(team.id, team.isOpen)}
                  className="flex items-center gap-2"
                >
                  {team.isOpen ? (
                    <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded hover:bg-emerald-400/20 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Aktif
                    </span>
                  ) : (
                    <span className="flex items-center text-xs font-medium text-red-400 bg-red-400/10 px-2 py-1 rounded hover:bg-red-400/20 transition-colors">
                      <XCircle className="w-3.5 h-3.5 mr-1.5" /> Pasif
                    </span>
                  )}
                </button>
                
                <Link href={`/admin/teams/${team.id}`} className="text-sm font-medium text-primary-red hover:text-[#A00000] transition-colors">
                  Takımı Yönet →
                </Link>
              </div>
            </div>
          ))}
          {teams.length === 0 && (
             <div className="col-span-full py-12 text-center text-secondary">
               Henüz resmi takım oluşturulmadı.
             </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-panel border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary-red" /> Resmi Takım Oluştur
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
                <label className="text-sm font-bold text-secondary uppercase tracking-wider">Takım Adı</label>
                <input required name="name" type="text" placeholder="Örn: ATE Valorant Ana Kadro" className="w-full bg-background border border-white/10 rounded-lg p-3 text-white focus:border-primary-red outline-none transition-colors" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary uppercase tracking-wider">Bağlı Olduğu Oyun</label>
                <select required name="gameId" className="w-full bg-background border border-white/10 rounded-lg p-3 text-white focus:border-primary-red outline-none transition-colors appearance-none">
                  <option value="" className="bg-[#050505] text-white">Seçiniz...</option>
                  {games.map((g: any) => (
                    <option key={g.id} value={g.id} className="bg-[#050505] text-white">{g.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary uppercase tracking-wider">Açıklama</label>
                <textarea name="description" placeholder="Takım hakkında..." className="w-full bg-background border border-white/10 rounded-lg p-3 text-white focus:border-primary-red outline-none transition-colors h-24" />
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg border border-white/10 mt-2">
                <h4 className="text-sm font-bold text-white mb-2">Yetkilendirme Bilgisi</h4>
                <p className="text-xs text-secondary">Takıma üye alımlarını (Takım Oyuncu Başvuruları) varsayılan olarak Süper Admin ve oyunun Genel Liderleri onaylayabilir. Takım oluştuktan sonra "Takımı Yönet" sayfasından takım kaptanı (CAPTAIN) atanabilecektir.</p>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-bold transition-colors">
                  İptal
                </button>
                <button type="submit" disabled={loading} className="flex-2 px-4 py-3 bg-primary-red hover:bg-red-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Oluştur'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
