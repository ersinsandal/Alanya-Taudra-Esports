"use client";

import React, { useState } from "react";
import { Save, Settings, Mail, Globe, Wrench, ShieldAlert } from "lucide-react";

export default function SettingsClient() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000); // mock save
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">Sistem Ayarları</h1>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#D00000] hover:bg-[#A00000] text-white px-6 py-2 rounded-lg transition-colors font-medium disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#D00000]" />
              Genel Platform Ayarları
            </h2>
            
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#99999F] mb-1">Platform Adı</label>
                <input 
                  type="text" 
                  defaultValue="ATE Digital Arena"
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000] transition-colors" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#99999F] mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    İletişim E-posta Adresi
                  </label>
                  <input 
                    type="email" 
                    defaultValue="contact@atedigitalarena.com"
                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000] transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#99999F] mb-1 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Discord Sunucu Linki
                  </label>
                  <input 
                    type="url" 
                    defaultValue="https://discord.gg/atedigitalarena"
                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000] transition-colors" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#99999F] mb-1">Sosyal Medya Linkleri (JSON)</label>
                <textarea 
                  rows={4}
                  defaultValue={JSON.stringify({ twitter: "https://twitter.com/atearena", instagram: "https://instagram.com/atearena" }, null, 2)}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000] font-mono text-sm transition-colors" 
                />
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-panel border border-rose-500/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-rose-500" />
              Bakım Modu
            </h2>
            <p className="text-sm text-[#99999F] mb-6">
              Platformu bakıma aldığınızda, adminler hariç tüm kullanıcılar "Bakımdayız" sayfası ile karşılaşır.
            </p>
            
            <label className="flex items-center justify-between cursor-pointer p-4 bg-[#050505] border border-white/10 rounded-lg hover:border-white/20 transition-colors">
              <div>
                <div className="font-medium text-white mb-1">Bakım Modunu Aktifleştir</div>
                <div className="text-xs text-rose-400">Şu anda kapalı</div>
              </div>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
              </div>
            </label>
          </div>

          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              Kayıtları Kapat
            </h2>
            <p className="text-sm text-[#99999F] mb-6">
              Yeni kullanıcı kayıtlarını geçici olarak durdurur.
            </p>
            
            <label className="flex items-center justify-between cursor-pointer p-4 bg-[#050505] border border-white/10 rounded-lg hover:border-white/20 transition-colors">
              <div>
                <div className="font-medium text-white mb-1">Kayıtları Kapat</div>
                <div className="text-xs text-[#99999F]">Şu anda kayıtlar açık</div>
              </div>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
