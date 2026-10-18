"use client";

import React, { useState } from 'react';
import { Search, Download, Briefcase, Clock, CheckCircle, XCircle, Eye, Check, X } from 'lucide-react';
import { updatePartnershipRequestStatus } from './actions';

type PartnershipRequest = {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string | null;
  website: string | null;
  industry: string | null;
  partnerType: string | null;
  message: string | null;
  budgetRange: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function SponsorApplicationsClient({ applications: initialApps }: { applications: PartnershipRequest[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<PartnershipRequest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updatePartnershipRequestStatus(id, newStatus);
    showToast(`Başvuru durumu güncellendi: ${newStatus}`);
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleDownloadReport = () => {
    showToast("Sponsorluk raporu (CSV) başarıyla indirildi.");
  };

  const filteredApps = initialApps.filter(a => 
    a.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.industry?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (a.partnerType?.toLowerCase() || '').includes(searchQuery.toLowerCase())
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
              <button onClick={() => setSelectedApp(null)} className="text-[#99999F] hover:text-white cursor-pointer transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-[#99999F] block text-xs">Şirket</span>
                <span className="text-white font-medium text-base">{selectedApp.company}</span>
              </div>
              <div>
                <span className="text-[#99999F] block text-xs">İletişim Kişisi</span>
                <span className="text-white">{selectedApp.contactPerson}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[#99999F] block text-xs">Sektör</span>
                  <span className="text-white">{selectedApp.industry || '-'}</span>
                </div>
                <div>
                  <span className="text-[#99999F] block text-xs">Partnerlik Tipi</span>
                  <span className="text-white">{selectedApp.partnerType || '-'}</span>
                </div>
              </div>
              <div>
                <span className="text-[#99999F] block text-xs">Bütçe Aralığı</span>
                <span className="text-white font-mono">{selectedApp.budgetRange || '-'}</span>
              </div>
              <div>
                <span className="text-[#99999F] block text-xs">E-posta</span>
                <span className="text-white">{selectedApp.email}</span>
              </div>
              <div>
                <span className="text-[#99999F] block text-xs">Telefon</span>
                <span className="text-white">{selectedApp.phone || '-'}</span>
              </div>
              {selectedApp.message && (
                <div>
                  <span className="text-[#99999F] block text-xs">Mesaj</span>
                  <p className="text-white mt-1">{selectedApp.message}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
              <button 
                onClick={async () => {
                  await handleStatusChange(selectedApp.id, "DECLINED");
                  setSelectedApp(null);
                }}
                className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg text-sm font-medium cursor-pointer transition-colors"
              >
                Reddet
              </button>
              <button 
                onClick={async () => {
                  await handleStatusChange(selectedApp.id, "ACCEPTED");
                  setSelectedApp(null);
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 bg-[#111114] border border-white/10 rounded-lg text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Rapor İndir</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111114] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-[#99999F] text-sm">Toplam Başvuru</p>
              <p className="text-2xl font-bold text-white">{initialApps.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#111114] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-[#99999F] text-sm">Bekleyen</p>
              <p className="text-2xl font-bold text-white">{initialApps.filter(a => a.status === 'PENDING').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#111114] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-[#99999F] text-sm">Onaylanan</p>
              <p className="text-2xl font-bold text-white">{initialApps.filter(a => a.status === 'ACCEPTED').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#111114] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#D00000]/10 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-[#D00000]" />
            </div>
            <div>
              <p className="text-[#99999F] text-sm">Reddedilen</p>
              <p className="text-2xl font-bold text-white">{initialApps.filter(a => a.status === 'DECLINED').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#111114] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99999F]" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Şirket adı veya sektör ara..." 
              className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#D00000] transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-[#99999F] border-b border-white/10 bg-[#0B0B0D]">
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
                  <td className="px-6 py-4 text-[#99999F]">{app.industry || '-'}</td>
                  <td className="px-6 py-4 font-mono text-xs text-[#99999F]">{app.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-white/5 text-xs">
                      {app.partnerType || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#99999F]">{app.budgetRange || '-'}</td>
                  <td className="px-6 py-4 text-[#99999F]">{new Date(app.createdAt).toLocaleDateString('tr-TR')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit ${
                      app.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                      app.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      'bg-[#D00000]/10 text-[#D00000] border border-[#D00000]/20'
                    }`}>
                      {app.status === 'PENDING' && <Clock className="w-3 h-3" />}
                      {app.status === 'ACCEPTED' && <CheckCircle className="w-3 h-3" />}
                      {app.status === 'DECLINED' && <XCircle className="w-3 h-3" />}
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
                        onClick={() => handleStatusChange(app.id, "ACCEPTED")}
                        className="p-1.5 text-emerald-500 hover:text-emerald-400 bg-emerald-500/10 rounded-md hover:bg-emerald-500/20 transition-colors cursor-pointer" 
                        title="Onayla"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(app.id, "DECLINED")}
                        className="p-1.5 text-[#D00000] hover:text-[#D00000] bg-[#D00000]/10 rounded-md hover:bg-[#D00000]/20 transition-colors cursor-pointer" 
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
