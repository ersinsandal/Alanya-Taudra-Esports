"use client";

import React, { useState } from "react";
import { Search, Filter, Shield, Activity, Clock, Terminal } from "lucide-react";

const MOCK_LOGS = [
  { id: "1", admin: "Ersin (Admin)", action: "Turnuva oluşturuldu (Valorant Cup #5)", module: "Turnuvalar", ip: "192.168.1.105", date: "2026-09-29 15:45:12" },
  { id: "2", admin: "Sistem (Oto)", action: "Puan dağıtımı tamamlandı", module: "Puan Sistemi", ip: "localhost", date: "2026-09-29 14:00:00" },
  { id: "3", admin: "Mod_Ahmet", action: "Kullanıcı uzaklaştırıldı (ToxicPlayer)", module: "Moderasyon", ip: "85.102.x.x", date: "2026-09-29 11:20:45" },
  { id: "4", admin: "Ersin (Admin)", action: "Site Modu değiştirildi (Match Day)", module: "Ayarlar", ip: "192.168.1.105", date: "2026-09-28 20:15:30" },
  { id: "5", admin: "Ersin (Admin)", action: "Yeni başarı eklendi (Kurucu Üye)", module: "Başarımlar", ip: "192.168.1.105", date: "2026-09-28 19:30:00" },
  { id: "6", admin: "Mod_Ayşe", action: "Yorum silindi (Spam)", module: "Moderasyon", ip: "78.190.x.x", date: "2026-09-28 15:10:22" },
];

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">Denetim Kayıtları</h1>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
          <Terminal className="w-4 h-4" />
          <span>Ham Kayıtları İndir (CSV)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-panel border border-white/10 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-lg text-blue-400">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-[#99999F]">Bugünkü İşlemler</p>
            <p className="text-2xl font-bold text-white">24</p>
          </div>
        </div>
        <div className="bg-panel border border-white/10 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-lg text-amber-400">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-[#99999F]">Aktif Adminler</p>
            <p className="text-2xl font-bold text-white">3</p>
          </div>
        </div>
        <div className="bg-panel border border-white/10 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-lg text-emerald-400">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-[#99999F]">Son Yedekleme</p>
            <p className="text-lg font-bold text-white">4 saat önce</p>
          </div>
        </div>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl">
        <div className="p-4 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99999F]" />
            <input
              type="text"
              placeholder="İşlem, admin veya modül ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#D00000] transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors w-full md:w-auto">
            <Filter className="w-5 h-5" />
            <span>Filtrele</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-sm text-[#99999F]">
                <th className="p-4 font-medium">Tarih</th>
                <th className="p-4 font-medium">Admin</th>
                <th className="p-4 font-medium">Modül</th>
                <th className="p-4 font-medium">İşlem</th>
                <th className="p-4 font-medium">IP Adresi</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LOGS.map((log) => (
                <tr key={log.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-[#99999F] whitespace-nowrap text-sm">{log.date}</td>
                  <td className="p-4 text-white font-medium">{log.admin}</td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-white/5 text-[#99999F]">
                      {log.module}
                    </span>
                  </td>
                  <td className="p-4 text-white">{log.action}</td>
                  <td className="p-4 text-[#99999F] font-mono text-sm">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
