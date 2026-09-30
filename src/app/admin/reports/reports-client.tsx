"use client";

import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle2, AlertCircle, Ban, Eye, Mail, X, Check } from 'lucide-react';

export default function ReportsClient({ initialReports }: { initialReports: any[] }) {
  const mappedReports = initialReports.map(r => ({
      id: r.id,
      reporter: r.reporter.username,
      reported: r.targetId,
      category: r.reason,
      date: new Date(r.createdAt).toLocaleDateString('tr-TR'),
      priority: r.targetType === 'SYSTEM' ? 'Kritik' : 'Normal',
      status: r.status,
      details: r.details
  }));
  const [reports, setReports] = useState(mappedReports);

  const [activeTab, setActiveTab] = useState("TÜMÜ");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateStatus = async (id: string, newStatus: string, actionMsg: string) => {
    try {
      await fetch('/api/admin/reports', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
      showToast(actionMsg);
    } catch (e) {
      showToast('Güncelleme başarısız oldu.');
    }
  };

  const filteredReports = reports.filter(r => {
    let tabMatchStr = activeTab;
    if (activeTab === "AÇIK") tabMatchStr = "PENDING";
    if (activeTab === "İNCELENİYOR") tabMatchStr = "IN_REVIEW";
    if (activeTab === "ÇÖZÜLDÜ") tabMatchStr = "RESOLVED";
    if (activeTab === "KAPANDI") tabMatchStr = "DISMISSED";
    const matchesTab = activeTab === "TÜMÜ" || r.status.toUpperCase() === tabMatchStr.toUpperCase();
    const matchesSearch = r.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.reported.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const openCount = reports.filter(r => r.status === 'PENDING').length;
  const solvedCount = reports.filter(r => r.status === 'RESOLVED').length;

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111114] border border-white/20 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-sm animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">RAPORLAR & ŞİKAYETLER</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-secondary text-sm">Açık Raporlar</p>
              <p className="text-2xl font-bold text-white">{openCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-secondary text-sm">Çözülen</p>
              <p className="text-2xl font-bold text-white">{solvedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-secondary text-sm">Toplam</p>
              <p className="text-2xl font-bold text-white">{reports.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-red/10 flex items-center justify-center">
              <Ban className="w-6 h-6 text-primary-red" />
            </div>
            <div>
              <p className="text-secondary text-sm">Kritik Öncelik</p>
              <p className="text-2xl font-bold text-white">{reports.filter(r => r.priority === 'Kritik').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
        <div className="border-b border-white/10 flex px-4 overflow-x-auto scrollbar-hide">
          {["TÜMÜ", "AÇIK", "İNCELENİYOR", "ÇÖZÜLDÜ", "KAPANDI"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
                activeTab === tab 
                  ? "text-primary-red border-primary-red" 
                  : "text-secondary border-transparent hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rapor ID, oyuncu veya kategori ara..." 
              className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:border-primary-red transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-secondary border-b border-white/10 bg-[#0B0B0D]">
                <th className="px-6 py-4 font-medium">Rapor No</th>
                <th className="px-6 py-4 font-medium">Şikayet Eden</th>
                <th className="px-6 py-4 font-medium">Şikayet Edilen</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Tarih</th>
                <th className="px-6 py-4 font-medium">Öncelik</th>
                <th className="px-6 py-4 font-medium">Durum</th>
                <th className="px-6 py-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-secondary">{report.id.substring(0,8)}</td>
                  <td className="px-6 py-4 font-medium">{report.reporter}</td>
                  <td className="px-6 py-4 text-primary-red font-medium">{report.reported}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-white/5 text-xs">
                      {report.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      report.priority === 'Düşük' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      report.priority === 'Orta' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      report.priority === 'Yüksek' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse'
                    }`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit ${
                      report.status === 'PENDING' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                      report.status === 'IN_REVIEW' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                      report.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                    }`}>
                      {report.status === 'PENDING' ? 'Açık' : report.status === 'IN_REVIEW' ? 'İnceleniyor' : report.status === 'RESOLVED' ? 'Çözüldü' : 'Kapandı'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleUpdateStatus(report.id, 'IN_REVIEW', `${report.id} incelemeye alındı.`)}
                        className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-400/10 rounded-md hover:bg-blue-400/20 transition-colors cursor-pointer" 
                        title="İncelemeye Al"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(report.id, 'RESOLVED', `${report.reported} kullanıcısına resmi uyarı gönderildi.`)}
                        className="p-1.5 text-yellow-500 hover:text-yellow-400 bg-yellow-500/10 rounded-md hover:bg-yellow-500/20 transition-colors cursor-pointer" 
                        title="Uyarı Gönder"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(report.id, 'RESOLVED', `${report.reported} platformdan BANLANDI.`)}
                        className="p-1.5 text-primary-red hover:text-red-400 bg-primary-red/10 rounded-md hover:bg-primary-red/20 transition-colors cursor-pointer" 
                        title="Ban Uygula"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(report.id, 'DISMISSED', `${report.id} raporu kapatıldı.`)}
                        className="p-1.5 text-secondary hover:text-white bg-white/5 rounded-md hover:bg-white/10 transition-colors cursor-pointer" 
                        title="Kapat"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
