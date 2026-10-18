"use client";

import React, { useState } from 'react';
import { Plus, Star, Link as LinkIcon, Edit, Trash2, X } from 'lucide-react';
import { createSponsor, updateSponsor, deleteSponsor } from './actions';

type Sponsor = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  tier: string;
  website: string | null;
  isActive: boolean;
  sortOrder: number;
};

export default function SponsorsClient({ sponsors }: { sponsors: Sponsor[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    tier: 'COMMUNITY_PARTNER',
    website: '',
    isActive: true,
  });

  const handleOpenModal = (sponsor?: Sponsor) => {
    if (sponsor) {
      setEditingSponsor(sponsor);
      setFormData({
        name: sponsor.name,
        logoUrl: sponsor.logoUrl || '',
        tier: sponsor.tier,
        website: sponsor.website || '',
        isActive: sponsor.isActive,
      });
    } else {
      setEditingSponsor(null);
      setFormData({
        name: '',
        logoUrl: '',
        tier: 'COMMUNITY_PARTNER',
        website: '',
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSponsor(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSponsor) {
      await updateSponsor(editingSponsor.id, formData);
    } else {
      await createSponsor(formData);
    }
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this sponsor?")) {
      await deleteSponsor(id);
    }
  };

  const TIERS = [
    { value: 'MAIN_PARTNER', label: 'Ana Sponsor' },
    { value: 'OFFICIAL_PARTNER', label: 'Resmi Sponsor' },
    { value: 'TECHNOLOGY_PARTNER', label: 'Teknoloji Partneri' },
    { value: 'COMMUNITY_PARTNER', label: 'Topluluk Partneri' },
    { value: 'LOCAL_PARTNER', label: 'Yerel Partner' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">Sponsor & Partner Yönetimi</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#D00000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Sponsor Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="bg-[#111114] border border-white/10 rounded-xl p-6 relative group hover:border-white/20 transition-colors">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleOpenModal(sponsor)}
                className="p-2 bg-black/50 hover:bg-black rounded-lg text-white/70 hover:text-white transition-colors"
                title="Sponsor detayları"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDelete(sponsor.id)}
                className="p-2 bg-black/50 hover:bg-black rounded-lg text-white/70 hover:text-[#D00000] transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-[#050505] rounded-xl flex items-center justify-center border border-white/10 text-xl font-bold text-white overflow-hidden">
                {sponsor.logoUrl ? (
                  <img src={sponsor.logoUrl} alt={sponsor.name} className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="text-sm">{sponsor.name.substring(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-medium text-white">{sponsor.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-[#D00000]" />
                  <span className="text-sm text-[#99999F]">
                    {TIERS.find(t => t.value === sponsor.tier)?.label || sponsor.tier}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-sm text-[#99999F]">
                {sponsor.website && (
                  <>
                    <LinkIcon className="w-4 h-4" />
                    <a href={sponsor.website} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      {sponsor.website.replace(/^https?:\/\//, '')}
                    </a>
                  </>
                )}
              </div>
              <div>
                {sponsor.isActive ? (
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded text-xs font-medium border border-emerald-500/20">Aktif</span>
                ) : (
                  <span className="px-2 py-1 bg-white/5 text-[#99999F] rounded text-xs font-medium border border-white/10">Pasif</span>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <div 
          onClick={() => handleOpenModal()}
          className="bg-[#111114]/50 border border-white/5 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#111114] hover:border-white/20 transition-all min-h-[200px]"
        >
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
            <Plus className="w-6 h-6 text-white/50" />
          </div>
          <span className="text-white/70 font-medium">Yeni Sponsor veya Partner Ekle</span>
          <span className="text-sm text-white/40 mt-1">Logo ve detayları girmek için tıklayın</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#111114] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">
                {editingSponsor ? 'Sponsor Düzenle' : 'Yeni Sponsor Ekle'}
              </h2>
              <button onClick={handleCloseModal} className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Sponsor Adı</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D00000]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Logo URL</label>
                <input
                  type="url"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D00000]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Seviye (Tier)</label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D00000]"
                >
                  {TIERS.map(t => (
                    <option className="bg-[#050505] text-white" key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Web Sitesi</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D00000]"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-white/10 bg-[#050505] text-[#D00000] focus:ring-[#D00000]"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-white/70">
                  Aktif
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-white/70 hover:text-white transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="bg-[#D00000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {editingSponsor ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
