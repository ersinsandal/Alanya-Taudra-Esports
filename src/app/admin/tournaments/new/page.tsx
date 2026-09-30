"use client";
import React, { useState } from 'react';
import { Save, ArrowLeft, Info, Settings, Calendar, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function NewTournamentPage() {
  const [activeSection, setActiveSection] = useState("Genel Bilgiler");

  const sections = [
    { id: "Genel Bilgiler", icon: Info },
    { id: "Format & Kurallar", icon: Settings },
    { id: "Tarihler", icon: Calendar },
    { id: "Görseller", icon: ImageIcon },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/tournaments" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-space font-bold tracking-tight text-white">Yeni Turnuva Oluştur</h1>
        </div>
        <button className="flex items-center gap-2 bg-[#D00000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Save className="w-4 h-4" />
          Turnuvayı Kaydet
        </button>
      </div>

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
                  <label className="block text-sm font-medium text-[#99999F]">Turnuva Adı</label>
                  <input type="text" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" placeholder="Örn: Kış Kupası 2026" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#99999F]">Oyun</label>
                    <select className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]">
                      <option>VALORANT</option>
                      <option>CS2</option>
                      <option>League of Legends</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#99999F]">Ödül Havuzu (₺)</label>
                    <input type="number" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" placeholder="50000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#99999F]">Açıklama</label>
                  <textarea rows={4} className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" placeholder="Turnuva detayları..." />
                </div>
              </div>
            )}

            {activeSection === "Format & Kurallar" && (
              <div className="space-y-4 text-[#99999F]">
                <p>Format ve kural ayarları buraya gelecek.</p>
                {/* Simplified for mock */}
              </div>
            )}
            
            {activeSection === "Tarihler" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#99999F]">Başlangıç Tarihi</label>
                    <input type="date" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#99999F]">Bitiş Tarihi</label>
                    <input type="date" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "Görseller" && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                  <ImageIcon className="w-12 h-12 text-[#99999F] mb-4" />
                  <p className="text-white font-medium mb-1">Banner Görseli Yükle</p>
                  <p className="text-[#99999F] text-sm">PNG, JPG (Max 5MB)</p>
                  <button className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm">
                    Dosya Seç
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
