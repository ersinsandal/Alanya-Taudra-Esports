'use client';
import React, { useState } from 'react';
import { Save, ArrowLeft, Info, Settings, Calendar, Image as ImageIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createTournament } from '../actions';

interface Game {
  id: string;
  name: string;
}

export default function NewTournamentClient({ games }: { games: Game[] }) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("Genel Bilgiler");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    gameId: games[0]?.id || '',
    prizePool: '',
    description: '',
    format: 'SINGLE_ELIMINATION',
    maxTeams: '',
    minTeamSize: '',
    maxTeamSize: '',
    rules: '',
    startDate: '',
    endDate: '',
    coverImage: '',
    status: 'DRAFT'
  });

  const sections = [
    { id: "Genel Bilgiler", icon: Info },
    { id: "Format & Kurallar", icon: Settings },
    { id: "Tarihler", icon: Calendar },
    { id: "Görseller", icon: ImageIcon },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (status: string) => {
    if (!formData.name || !formData.gameId || !formData.startDate) {
      setError('Turnuva Adı, Oyun ve Başlangıç Tarihi zorunludur.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createTournament({
        ...formData,
        status
      });
      router.push('/admin/tournaments');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/tournaments" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-space font-bold tracking-tight text-white">Yeni Turnuva Oluştur</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleSave('DRAFT')}
            disabled={loading}
            className="flex items-center gap-2 bg-panel hover:bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            Taslak Kaydet
          </button>
          <button 
            onClick={() => handleSave('PUBLISHED')}
            disabled={loading}
            className="flex items-center gap-2 bg-[#D00000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Turnuvayı Yayınla
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left ${activeSection === section.id ? 'bg-[#D00000]/10 text-[#D00000]' : 'text-[#99999F] hover:bg-white/5 hover:text-white'}`}
              >
                <Icon className="w-5 h-5" />
                {section.id}
              </button>
            )
          })}
        </div>

        <div className="md:col-span-3">
          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-space font-bold text-white mb-6 border-b border-white/10 pb-4">{activeSection}</h2>
            
            {activeSection === "Genel Bilgiler" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#99999F]">Turnuva Adı *</label>
                  <input name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" placeholder="Örn: Kış Kupası 2026" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#99999F]">Oyun *</label>
                    <select name="gameId" value={formData.gameId} onChange={handleChange} className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]">
                      {games.map(g => (
                        <option className="bg-[#050505] text-white" key={g.id} value={g.id}>{g.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#99999F]">Ödül Havuzu (₺ veya Metin)</label>
                    <input name="prizePool" value={formData.prizePool} onChange={handleChange} type="text" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" placeholder="Örn: 50.000 ₺" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#99999F]">Açıklama</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" placeholder="Turnuva detayları..." />
                </div>
              </div>
            )}

            {activeSection === "Format & Kurallar" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#99999F]">Turnuva Formatı</label>
                  <select name="format" value={formData.format} onChange={handleChange} className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]">
                    <option className="bg-[#050505] text-white" value="SINGLE_ELIMINATION">Tekli Eleme (Single Elimination)</option>
                    <option className="bg-[#050505] text-white" value="DOUBLE_ELIMINATION">Çiftli Eleme (Double Elimination)</option>
                    <option className="bg-[#050505] text-white" value="ROUND_ROBIN">Lig Usulü (Round Robin)</option>
                    <option className="bg-[#050505] text-white" value="SWISS">İsviçre Sistemi (Swiss)</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#99999F]">Max Takım Sayısı</label>
                    <input name="maxTeams" value={formData.maxTeams} onChange={handleChange} type="number" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" placeholder="16" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#99999F]">Min Oyuncu / Takım</label>
                    <input name="minTeamSize" value={formData.minTeamSize} onChange={handleChange} type="number" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" placeholder="5" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#99999F]">Max Oyuncu / Takım</label>
                    <input name="maxTeamSize" value={formData.maxTeamSize} onChange={handleChange} type="number" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" placeholder="7" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#99999F]">Kurallar (Markdown Destekler)</label>
                  <textarea name="rules" value={formData.rules} onChange={handleChange} rows={6} className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" placeholder="Turnuva kuralları buraya..." />
                </div>
              </div>
            )}
            
            {activeSection === "Tarihler" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#99999F]">Başlangıç Tarihi *</label>
                    <input name="startDate" value={formData.startDate} onChange={handleChange} type="datetime-local" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#99999F]">Bitiş Tarihi</label>
                    <input name="endDate" value={formData.endDate} onChange={handleChange} type="datetime-local" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "Görseller" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#99999F]">Banner Görseli (URL)</label>
                  <input name="coverImage" value={formData.coverImage} onChange={handleChange} type="url" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" placeholder="https://..." />
                  <p className="text-xs text-[#99999F]">Şu an için dış bir görsel bağlantısı yapıştırın. İleride medya galerisi ile entegre edilecektir.</p>
                </div>
                {formData.coverImage && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-white/10 relative h-48">
                    <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
