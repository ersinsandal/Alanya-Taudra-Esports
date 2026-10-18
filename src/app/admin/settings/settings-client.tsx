"use client";

import React, { useState } from "react";
import { Save, Settings, Mail, Globe, Wrench, ShieldAlert, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { saveSystemSettings, SystemSettingsData } from "./actions";

interface SettingsClientProps {
  initialSettings: SystemSettingsData;
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [settings, setSettings] = useState<SystemSettingsData>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const res = await saveSystemSettings(settings);

    setIsSaving(false);
    if (res.success) {
      setFeedback({ type: 'success', message: 'Değişiklikler başarıyla veritabanına kaydedildi ve loglandı.' });
      setTimeout(() => setFeedback(null), 5000);
    } else {
      setFeedback({ type: 'error', message: res.error || 'Kaydedilirken bir hata oluştu.' });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-white">Sistem Ayarları</h1>
          <p className="text-xs text-secondary-text mt-1">Platform geneli yapılandırma ve güvenlik parametreleri.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#D00000] hover:bg-[#A00000] text-white px-6 py-2.5 rounded-lg transition-all font-bold disabled:opacity-50 cursor-pointer shadow-lg shadow-primary-red/20 shrink-0"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}</span>
        </button>
      </div>

      {feedback && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 animate-in fade-in duration-200 ${
          feedback.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span className="text-sm font-medium">{feedback.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: General Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#D00000]" />
              Genel Platform Ayarları
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#99999F] mb-1">Platform Adı</label>
                <input 
                  type="text" 
                  value={settings.platformName}
                  onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                  placeholder="Platform Adı"
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
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    placeholder="contact@atedigitalarena.com"
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
                    value={settings.discordUrl}
                    onChange={(e) => setSettings({ ...settings, discordUrl: e.target.value })}
                    placeholder="https://discord.gg/atedigitalarena"
                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000] transition-colors" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#99999F] mb-1">Sosyal Medya Linkleri (JSON)</label>
                <textarea 
                  rows={4}
                  value={settings.socialLinks}
                  onChange={(e) => setSettings({ ...settings, socialLinks: e.target.value })}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000] font-mono text-sm transition-colors" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Security & Mode Toggles */}
        <div className="space-y-6">
          {/* Maintenance Mode */}
          <div className="bg-panel border border-rose-500/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-rose-500" />
              Bakım Modu
            </h2>
            <p className="text-sm text-[#99999F] mb-6">
              Platformu bakıma aldığınızda, adminler hariç tüm kullanıcılar &quot;Bakımdayız&quot; sayfası ile karşılaşır.
            </p>
            
            <label className="flex items-center justify-between cursor-pointer p-4 bg-[#050505] border border-white/10 rounded-lg hover:border-white/20 transition-colors">
              <div>
                <div className="font-medium text-white mb-1">Bakım Modunu Aktifleştir</div>
                <div className={`text-xs ${settings.maintenanceMode ? "text-rose-400 font-semibold" : "text-secondary-text"}`}>
                  {settings.maintenanceMode ? "Şu anda açık" : "Şu anda kapalı"}
                </div>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
              </div>
            </label>
          </div>

          {/* Disable Registrations */}
          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              Kayıtları Kapat
            </h2>
            <p className="text-sm text-[#99999F] mb-6">
              Yeni kullanıcı kayıtlarını geçici olarak durdurur.
            </p>
            
            <label className="flex items-center justify-between cursor-pointer p-4 bg-[#050505] border border-white/10 rounded-lg hover:border-white/20 transition-colors">
              <div>
                <div className="font-medium text-white mb-1">Kayıtları Kapat</div>
                <div className={`text-xs ${settings.disableRegistrations ? "text-amber-400 font-semibold" : "text-secondary-text"}`}>
                  {settings.disableRegistrations ? "Şu anda kayıtlar kapalı" : "Şu anda kayıtlar açık"}
                </div>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={settings.disableRegistrations}
                  onChange={(e) => setSettings({ ...settings, disableRegistrations: e.target.checked })}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
