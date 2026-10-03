"use client";

import React, { useState } from "react";
import { Layout, Swords, Tv, Trophy, CheckCircle2 } from "lucide-react";

const THEMES = [
  { id: "default", name: "Default (Varsayılan)", description: "Standart ATE Digital Arena teması. Günlük kullanım için.", icon: Layout, color: "text-blue-500" },
  { id: "matchday", name: "Match Day", description: "Büyük turnuva günlerinde aktif edilecek, kırmızı ağırlıklı agresif tema.", icon: Swords, color: "text-[#D00000]" },
  { id: "livestream", name: "Live Stream", description: "Ana sayfada Twitch/YouTube yayınını öne çıkaran tema.", icon: Tv, color: "text-purple-500" },
  { id: "victory", name: "Victory (Şampiyonluk)", description: "Turnuva kazananlarını kutlayan, altın renklerin hakim olduğu özel tema.", icon: Trophy, color: "text-amber-400" },
];

export default function SiteModesPage() {
  const [activeMode, setActiveMode] = useState("default");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">Site Modları</h1>
      </div>

      <p className="text-[#99999F]">
        Sitenin genel görünümünü ve ana sayfa düzenini anında değiştirmek için bir tema seçin.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {THEMES.map((theme) => {
          const Icon = theme.icon;
          const isActive = activeMode === theme.id;
          
          return (
            <div 
              key={theme.id} 
              className={`bg-panel border rounded-xl p-6 transition-all duration-300 relative overflow-hidden ${
                isActive ? 'border-[#D00000] shadow-[0_0_20px_rgba(208,0,0,0.1)]' : 'border-white/10 hover:border-white/30'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 right-0 p-1 bg-[#D00000] rounded-bl-xl shadow-lg">
                  <span className="text-xs font-bold text-white px-2">AKTİF</span>
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-xl bg-[#050505] border border-white/5`}>
                  <Icon className={`w-8 h-8 ${theme.color}`} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{theme.name}</h3>
                  <p className="text-sm text-[#99999F] mb-6">{theme.description}</p>
                  
                  <button
                    onClick={() => setActiveMode(theme.id)}
                    disabled={isActive}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors w-full justify-center ${
                      isActive 
                        ? 'bg-emerald-500/10 text-emerald-500 cursor-default' 
                        : 'bg-white/5 hover:bg-[#D00000] text-white hover:text-white'
                    }`}
                  >
                    {isActive ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Şu An Aktif
                      </>
                    ) : (
                      'Bu Modu Aktifleştir'
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
