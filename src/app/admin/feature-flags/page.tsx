"use client";

import React, { useState } from 'react';
import { Settings2, Zap, Users, ShieldAlert, History } from 'lucide-react';

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState({
    registration: true,
    socialAuth: false,
    twoFactor: true,
    tournaments: true,
    liveStreams: false,
    autoBracket: true,
    scrimPool: true,
    scrimMatchmaking: true,
    lftBoard: true,
    clips: false,
    forum: false,
    maintenance: false,
    debugLogs: false,
    rateLimiting: true,
    performance: true,
  });

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const groups = [
    {
      title: "KAYIT & GİRİŞ",
      icon: <Users className="w-5 h-5 text-blue-400" />,
      items: [
        { key: "registration", label: "Yeni Kayıt Alımı", desc: "Sisteme yeni üye kayıtlarını açar/kapatır." },
        { key: "socialAuth", label: "Sosyal Giriş", desc: "Google, Discord gibi platformlarla girişe izin verir." },
        { key: "twoFactor", label: "İki Faktörlü Doğrulama", desc: "Kullanıcılar için 2FA desteğini aktif eder." },
      ]
    },
    {
      title: "TURNUVA & MAÇLAR",
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      items: [
        { key: "tournaments", label: "Turnuva Kayıtları", desc: "Yeni turnuva kayıtlarının alınmasını sağlar." },
        { key: "liveStreams", label: "Canlı Maç Yayını", desc: "Sistem üzerinden canlı yayınları gösterir." },
        { key: "autoBracket", label: "Otomatik Bracket", desc: "Turnuva ağaçlarının otomatik oluşturulmasını aktif eder." },
        { key: "scrimPool", label: "Scrim Havuzu", desc: "Takımların antrenman maçı aramasını açar." },
      ]
    },
    {
      title: "TOPLULUK",
      icon: <Settings2 className="w-5 h-5 text-emerald-400" />,
      items: [
        { key: "scrimMatchmaking", label: "Scrim Eşleştirme", desc: "Otomatik takım eşleştirme algoritmasını çalıştırır." },
        { key: "lftBoard", label: "LFT İlanları", desc: "Oyuncu veya takım arama ilan panosunu açar." },
        { key: "clips", label: "Klip Paylaşımı", desc: "Kullanıcıların maç kliplerini paylaşmasına izin verir." },
        { key: "forum", label: "Topluluk Forumu", desc: "Dahili tartışma forumu modülünü açar." },
      ]
    },
    {
      title: "SİSTEM",
      icon: <ShieldAlert className="w-5 h-5 text-primary-red" />,
      items: [
        { key: "maintenance", label: "Bakım Modu", desc: "Sistemi sadece adminlerin erişimine açar." },
        { key: "debugLogs", label: "Debug Logları", desc: "Detaylı sistem loglamasını aktif eder (Performansı etkiler)." },
        { key: "rateLimiting", label: "API Rate Limiting", desc: "API istek sınırlandırmasını devreye alır." },
        { key: "performance", label: "Performans İzleme", desc: "Sistem metriklerinin toplanmasını sağlar." },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-space font-bold tracking-tight text-white">FEATURE FLAGS</h1>
          <p className="text-secondary mt-1">Sistem özelliklerini tek tıkla açıp kapatın.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-panel border border-white/10 rounded-lg text-white hover:bg-white/5 transition-colors">
          <History className="w-4 h-4" />
          <span>Geçmiş</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {groups.map((group, idx) => (
          <div key={idx} className="bg-panel border border-white/10 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 bg-[#0B0B0D] flex items-center gap-3">
              {group.icon}
              <h2 className="font-space font-bold text-white tracking-wide">{group.title}</h2>
            </div>
            <div className="divide-y divide-white/5">
              {group.items.map((item) => {
                const isActive = flags[item.key as keyof typeof flags];
                return (
                  <div key={item.key} className="p-6 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                    <div>
                      <h3 className="font-medium text-white">{item.label}</h3>
                      <p className="text-sm text-secondary mt-1">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => toggleFlag(item.key as keyof typeof flags)}
                      className={`relative w-12 h-6 rounded-full transition-colors shrink-0 focus:outline-none ${isActive ? 'bg-emerald-500' : 'bg-white/10'}`}
                    >
                      <span 
                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${isActive ? 'translate-x-6' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
