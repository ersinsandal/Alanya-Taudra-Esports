"use client";

import React from 'react';
import { Plus, Star, Link as LinkIcon, Settings, Edit, Trash2 } from 'lucide-react';

const MOCK_SPONSORS = [
  { id: 1, name: "Alanya Belediyesi", tier: "Ana Sponsor", status: "active", logo: "AB", type: "Kurumsal" },
  { id: 2, name: "Red Bull", tier: "Enerji Partneri", status: "active", logo: "RB", type: "Partner" },
  { id: 3, name: "Monster Notebook", tier: "Teknoloji Partneri", status: "active", logo: "MN", type: "Partner" },
  { id: 4, name: "Turkcell", tier: "İletişim Sponsoru", status: "inactive", logo: "TC", type: "Sponsor" },
];

export default function SponsorsAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">Sponsor & Partner Yönetimi</h1>
        <button className="bg-[#D00000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Sponsor Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SPONSORS.map((sponsor) => (
          <div key={sponsor.id} className="bg-[#111114] border border-white/10 rounded-xl p-6 relative group hover:border-white/20 transition-colors">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-black/50 hover:bg-black rounded-lg text-white/70 hover:text-white transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 bg-black/50 hover:bg-black rounded-lg text-white/70 hover:text-[#D00000] transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-[#050505] rounded-xl flex items-center justify-center border border-white/10 text-xl font-bold text-white">
                {sponsor.logo}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-medium text-white">{sponsor.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-[#D00000]" />
                  <span className="text-sm text-[#99999F]">{sponsor.tier}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-sm text-[#99999F]">
                <LinkIcon className="w-4 h-4" />
                {sponsor.type}
              </div>
              <div>
                {sponsor.status === 'active' ? (
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded text-xs font-medium border border-emerald-500/20">Aktif</span>
                ) : (
                  <span className="px-2 py-1 bg-white/5 text-[#99999F] rounded text-xs font-medium border border-white/10">Pasif</span>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <div className="bg-[#111114]/50 border border-white/5 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#111114] hover:border-white/20 transition-all min-h-[200px]">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
            <Plus className="w-6 h-6 text-white/50" />
          </div>
          <span className="text-white/70 font-medium">Yeni Sponsor veya Partner Ekle</span>
          <span className="text-sm text-white/40 mt-1">Logo ve detayları girmek için tıklayın</span>
        </div>
      </div>
    </div>
  );
}
