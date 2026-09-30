"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle, Trash2, MessageSquare, Video, Flag } from "lucide-react";

const MOCK_REPORTS = [
  { id: "1", type: "message", reporter: "Ahmet123", reported: "ToxicPlayer", content: "Küfürlü konuşma ve hakaret", date: "10 dk önce", status: "pending" },
  { id: "2", type: "clip", reporter: "User99", reported: "HackerOne", content: "Şüpheli aimbot kullanımı klibi", date: "1 saat önce", status: "pending" },
  { id: "3", type: "message", reporter: "MageMery", reported: "GrieferTR", content: "Spam ve reklam mesajları", date: "2 saat önce", status: "pending" },
];

export default function ModerationPage() {
  const [reports, setReports] = useState(MOCK_REPORTS);

  const handleAction = (id: string, action: string) => {
    // Mock action handler
    setReports(reports.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">Moderasyon Merkezi</h1>
        <div className="flex gap-2">
          <span className="bg-rose-500/20 text-rose-500 px-3 py-1 rounded-full text-sm font-medium border border-rose-500/30 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {reports.length} Bekleyen Rapor
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-panel border border-white/10 rounded-xl p-5 flex flex-col md:flex-row gap-6 items-start md:items-center">
            
            <div className="p-3 bg-white/5 rounded-xl">
              {report.type === 'message' ? (
                <MessageSquare className="w-8 h-8 text-blue-400" />
              ) : (
                <Video className="w-8 h-8 text-purple-400" />
              )}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-white flex items-center gap-1">
                  <Flag className="w-3 h-3" />
                  Rapor
                </span>
                <span className="text-sm text-[#99999F]">{report.date}</span>
              </div>
              <p className="text-white font-medium">{report.content}</p>
              <div className="text-sm text-[#99999F] flex gap-4">
                <span>Raporlayan: <strong className="text-white">{report.reporter}</strong></span>
                <span>Şikayet Edilen: <strong className="text-rose-400">{report.reported}</strong></span>
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
              <button 
                onClick={() => handleAction(report.id, 'warn')}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-lg transition-colors text-sm font-medium"
              >
                <AlertTriangle className="w-4 h-4" />
                Uyar
              </button>
              <button 
                onClick={() => handleAction(report.id, 'delete')}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-colors text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
                İçeriği Sil
              </button>
              <button 
                onClick={() => handleAction(report.id, 'ignore')}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <CheckCircle className="w-4 h-4" />
                Görmezden Gel
              </button>
            </div>
          </div>
        ))}

        {reports.length === 0 && (
          <div className="bg-panel border border-white/10 rounded-xl p-12 text-center text-[#99999F]">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-emerald-500/50" />
            <p className="text-lg">Tüm raporlar incelendi. Harika iş!</p>
          </div>
        )}
      </div>
    </div>
  );
}
