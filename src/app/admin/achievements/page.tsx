"use client";

import React, { useState } from "react";
import { Plus, Trophy, Star, Shield, Medal, Edit2, Trash2 } from "lucide-react";

const MOCK_BADGES = [
  { id: "1", name: "Kurucu Üye", description: "Platformun ilk aylarında kayıt olan efsaneler.", icon: Shield, color: "text-purple-500", bg: "bg-purple-500/10", rarity: "Efsanevi" },
  { id: "2", name: "100 Maç", description: "Toplam 100 resmi turnuva maçına katılım.", icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10", rarity: "Destansı" },
  { id: "3", name: "Keskin Nişancı", description: "Bir maçta 30+ headshot.", icon: Star, color: "text-blue-500", bg: "bg-blue-500/10", rarity: "Nadir" },
  { id: "4", name: "İlk Kan", description: "İlk turnuva maçını kazan.", icon: Medal, color: "text-emerald-500", bg: "bg-emerald-500/10", rarity: "Yaygın" },
];

export default function AchievementsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">Başarımlar & Rozetler</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#D00000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Yeni Rozet Oluştur</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_BADGES.map((badge) => {
          const Icon = badge.icon;
          return (
            <div key={badge.id} className="bg-panel border border-white/10 rounded-xl p-6 relative group hover:border-[#D00000]/50 transition-colors">
              <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-[#99999F] hover:text-white transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-[#99999F] hover:text-rose-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-full ${badge.bg}`}>
                  <Icon className={`w-12 h-12 ${badge.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{badge.name}</h3>
                  <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-white/5 text-[#99999F] mb-2">
                    {badge.rarity}
                  </span>
                  <p className="text-sm text-[#99999F]">{badge.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-panel border border-white/10 rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-white mb-6">Yeni Rozet Oluştur</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#99999F] mb-1">Rozet Adı</label>
                <input type="text" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D00000]" placeholder="Örn: Turnuva Şampiyonu" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#99999F] mb-1">Açıklama</label>
                <textarea className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D00000] resize-none h-24" placeholder="Rozet açıklamasını girin..."></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#99999F] mb-1">Nadirlik Seviyesi</label>
                <select className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D00000]">
                  <option>Yaygın</option>
                  <option>Nadir</option>
                  <option>Destansı</option>
                  <option>Efsanevi</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  İptal
                </button>
                <button 
                  type="button"
                  className="px-4 py-2 rounded-lg text-white bg-[#D00000] hover:bg-[#A00000] transition-colors font-medium"
                >
                  Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
