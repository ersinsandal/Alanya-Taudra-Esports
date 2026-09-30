"use client";

import React, { useState } from 'react';
import { Search, Download, Briefcase, Clock, CheckCircle, XCircle, Eye, Check, X } from 'lucide-react';

export default function SponsorApplicationsPage() {
  const [applications, setApplications] = useState([
    { id: 1, company: 'Alanya Bilişim A.Ş.', sector: 'Teknoloji', contact: 'ahmet@alanyabilisim.com', type: 'Ana Partner', budget: '500.000₺ - 1.000.000₺', date: '28.09.2024', status: 'Bekleyen' },
    { id: 2, company: 'Toros Teknoloji', sector: 'Donanım', contact: 'iletisim@torosteknoloji.com', type: 'Teknoloji', budget: '100.000₺ - 250.000₺', date: '27.09.2024', status: 'Onaylanan' },
    { id: 3, company: 'Mediterranean Gaming', sector: 'E-spor', contact: 'hello@medgaming.com', type: 'Resmi', budget: '250.000₺ - 500.000₺', date: '25.09.2024', status: 'Bekleyen' },
    { id: 4, company: 'Kale İçecek', sector: 'Gıda', contact: 'sponsor@kaleicecek.com', type: 'Yerel', budget: '50.000₺ - 100.000₺', date: '22.09.2024', status: 'Reddedilen' },
    { id: 5, company: 'Akdeniz Fiber', sector: 'Telekomünikasyon', contact: 'info@akdenizfiber.com.tr', type: 'Teknoloji', budget: '250.000₺ - 500.000₺', date: '20.09.2024', status: 'Bekleyen' },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<typeof applications[0] | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    showToast(`Başvuru durumu güncellendi: ${newStatus}`);
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleDownloadReport = () => {
    showToast("Sponsorluk raporu (CSV) başarıyla indirildi.");
  };

  const filteredApps = applications.filter(a => 
    a.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111114] border border-white/20 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-sm animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111114] border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">Sponsorluk Detayı</h3>
              <button onClick={() => setSelectedApp(null)} className="text-secondary hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-secondary block text-xs">Şirket</span>
                <span className="text-white font-medium text-base">{selectedApp.company}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-secondary block text-xs">Sektör</span>
                  <span className="text-white">{selectedApp.sector}</span>
                </div>
                <div>
                  <span className="text-secondary block text-xs">Partnerlik Tipi</span>
                  <span className="text-white">{selectedApp.type}</span>
                </div>
              </div>
              <div>
                <span className="text-secondary block text-xs">Bütçe Aralığı</span>
                <span className="text-white font-mono">{selectedApp.budget}</span>
              </div>
              <div>
                <span className="text-secondary block text-xs">İletişim</span>
                <span className="text-white">{selectedApp.contact}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
              <button 
                onClick={() => handleStatusChange(selectedApp.id, "Reddedilen")}
                className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg text-sm font-medium cursor-pointer"
              >
                Reddet
              </button>
              <button 
                onClick={() => handleStatusChange(selectedApp.id, "Onaylanan")}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium cursor-pointer"
              >
                Onayla
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">SPONSORLUK BAŞVURULARI</h1>
        <button 
          onClick={handleDownloadReport}
          className="flex items-center gap-2 px-4 py-2 bg-panel border border-white/10 rounded-lg text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Rapor İndir</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-secondary text-sm">Toplam Başvuru</p>
              <p className="text-2xl font-bold text-white">{applications.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-secondary text-sm">Bekleyen</p>
              <p className="text-2xl font-bold text-white">{applications.filter(a => a.status === 'Bekleyen').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-secondary text-sm">Onaylanan</p>
              <p className="text-2xl font-bold text-white">{applications.filter(a => a.status === 'Onaylanan').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-red/10 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-primary-red" />
            </div>
            <div>
              <p className="text-secondary text-sm">Reddedilen</p>
              <p className="text-2xl font-bold text-white">{applications.filter(a => a.status === 'Reddedilen').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Şirket adı veya sektör ara..." 
              className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:border-primary-red transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-secondary border-b border-white/10 bg-[#0B0B0D]">
                <th className="px-6 py-4 font-medium">Şirket Adı</th>
                <th className="px-6 py-4 font-medium">Sektör</th>
                <th className="px-6 py-4 font-medium">İletişim</th>
                <th className="px-6 py-4 font-medium">Teklif Tipi</th>
                <th className="px-6 py-4 font-medium">Bütçe Aralığı</th>
                <th className="px-6 py-4 font-medium">Tarih</th>
                <th className="px-6 py-4 font-medium">Durum</th>
                <th className="px-6 py-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {filteredApps.map((app) => (
                <tr key={app.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium">{app.company}</td>
                  <td className="px-6 py-4 text-secondary">{app.sector}</td>
                  <td className="px-6 py-4 font-mono text-xs text-secondary">{app.contact}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-white/5 text-xs">
                      {app.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary">{app.budget}</td>
                  <td className="px-6 py-4 text-secondary">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit ${
                      app.status === 'Bekleyen' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                      app.status === 'Onaylanan' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      'bg-primary-red/10 text-primary-red border border-primary-red/20'
                    }`}>
                      {app.status === 'Bekleyen' && <Clock className="w-3 h-3" />}
                      {app.status === 'Onaylanan' && <CheckCircle className="w-3 h-3" />}
                      {app.status === 'Reddedilen' && <XCircle className="w-3 h-3" />}
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedApp(app)}
                        className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-400/10 rounded-md hover:bg-blue-400/20 transition-colors cursor-pointer" 
                        title="İncele"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(app.id, "Onaylanan")}
                        className="p-1.5 text-emerald-500 hover:text-emerald-400 bg-emerald-500/10 rounded-md hover:bg-emerald-500/20 transition-colors cursor-pointer" 
                        title="Onayla"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(app.id, "Reddedilen")}
                        className="p-1.5 text-primary-red hover:text-red-400 bg-primary-red/10 rounded-md hover:bg-primary-red/20 transition-colors cursor-pointer" 
                        title="Reddet"
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
