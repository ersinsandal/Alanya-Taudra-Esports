"use client";

import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Video, Film, Clock, CheckCircle2, XCircle, X, Plus } from 'lucide-react';

export default function MediaAdminPage() {
  const [mediaItems, setMediaItems] = useState([
    { id: 1, title: "VALORANT Takım Şampiyonluk Anı", type: "Klip", date: "2026-09-30", status: "Yayında", uploader: "Merve T.", color: "from-red-500 to-orange-500" },
    { id: 2, title: "Turnuva Alanı Genel Görünüm", type: "Fotoğraf", date: "2026-09-29", status: "Yayında", uploader: "Ali V.", color: "from-blue-500 to-purple-500" },
    { id: 3, title: "Oyuncu Röportaj - SniperTR", type: "Video", date: "2026-09-29", status: "Onay Bekliyor", uploader: "Can Ö.", color: "from-emerald-500 to-teal-500" },
    { id: 4, title: "Sahne Arkası VLOG #4", type: "Video", date: "2026-09-28", status: "Reddedildi", uploader: "Merve T.", color: "from-pink-500 to-rose-500" },
    { id: 5, title: "CS2 Clutch Anı", type: "Klip", date: "2026-09-28", status: "Yayında", uploader: "Hasan Ç.", color: "from-amber-500 to-yellow-500" },
    { id: 6, title: "Yeni Forma Çekimleri", type: "Fotoğraf", date: "2026-09-27", status: "Yayında", uploader: "Ali V.", color: "from-indigo-500 to-cyan-500" },
    { id: 7, title: "Taktik Tahtası Görüntüsü", type: "Fotoğraf", date: "2026-09-27", status: "Reddedildi", uploader: "Deniz K.", color: "from-gray-500 to-slate-500" },
    { id: 8, title: "Akdeniz Ünv Etkinlik", type: "Video", date: "2026-09-26", status: "Yayında", uploader: "Ayşe D.", color: "from-violet-500 to-fuchsia-500" },
  ]);

  const [activeTab, setActiveTab] = useState("TÜMÜ");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Fotoğraf");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newItem = {
      id: Date.now(),
      title: newTitle,
      type: newType,
      date: new Date().toISOString().split('T')[0],
      status: "Yayında",
      uploader: "Admin",
      color: "from-cyan-500 to-blue-600",
    };
    setMediaItems([newItem, ...mediaItems]);
    setNewTitle("");
    setIsUploadOpen(false);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setMediaItems(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "Fotoğraf": return <ImageIcon className="w-4 h-4" />;
      case "Video": return <Video className="w-4 h-4" />;
      case "Klip": return <Film className="w-4 h-4" />;
      default: return <ImageIcon className="w-4 h-4" />;
    }
  };

  const filteredItems = mediaItems.filter(item => {
    if (activeTab === "TÜMÜ") return true;
    if (activeTab === "ONAY BEKLİYOR") return item.status === "Onay Bekliyor";
    return item.type.toUpperCase() === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111114] border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#D00000]" />
                Yeni Medya Yükle
              </h3>
              <button onClick={() => setIsUploadOpen(false)} className="text-secondary hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="text-xs text-secondary mb-1 block">Başlık</label>
                <input 
                  type="text" 
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Örn: 2024 Final Maçı Sahne Arkası"
                  className="w-full bg-[#050505] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-[#D00000]"
                />
              </div>
              <div>
                <label className="text-xs text-secondary mb-1 block">Tür</label>
                <select 
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-[#D00000]"
                >
                  <option value="Fotoğraf">Fotoğraf</option>
                  <option value="Video">Video</option>
                  <option value="Klip">Klip</option>
                </select>
              </div>
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center bg-white/[0.01]">
                <Upload className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="text-sm text-white font-medium">Dosyayı sürükleyin veya seçin</p>
                <p className="text-xs text-secondary mt-1">PNG, JPG, MP4 (Maks. 50MB)</p>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsUploadOpen(false)} className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm">
                  İptal
                </button>
                <button type="submit" className="px-4 py-2 bg-[#D00000] hover:bg-[#A00000] text-white rounded-lg text-sm font-medium cursor-pointer">
                  Yükle ve Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">MEDYA YÖNETİMİ</h1>
        <button 
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#D00000] hover:bg-[#A00000] text-white rounded-lg transition-colors font-medium cursor-pointer"
        >
          <Upload className="w-5 h-5" />
          <span>Medya Yükle</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Toplam Medya", value: mediaItems.length, color: "text-white" },
          { label: "Fotoğraf", value: mediaItems.filter(m => m.type === 'Fotoğraf').length, color: "text-blue-400" },
          { label: "Video", value: mediaItems.filter(m => m.type === 'Video').length, color: "text-purple-400" },
          { label: "Klip", value: mediaItems.filter(m => m.type === 'Klip').length, color: "text-orange-400" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-panel border border-white/10 p-6 rounded-xl flex flex-col justify-center items-center">
            <div className="text-sm text-secondary uppercase tracking-wider mb-2">{stat.label}</div>
            <div className={`text-4xl font-space font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden p-4">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {["TÜMÜ", "FOTOĞRAF", "VİDEO", "KLİP", "ONAY BEKLİYOR"].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${activeTab === tab ? 'bg-white/10 text-white' : 'text-[#99999F] hover:text-white hover:bg-white/5'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-black/40 border border-white/10 rounded-xl overflow-hidden group hover:border-white/20 transition-colors">
              <div className={`h-40 bg-gradient-to-br ${item.color} flex items-center justify-center relative`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1.5">
                  {getTypeIcon(item.type)}
                  {item.type}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-white mb-2 truncate" title={item.title}>{item.title}</h3>
                <div className="flex items-center justify-between text-xs text-[#99999F] mb-3">
                  <span>{item.date}</span>
                  <span>{item.uploader}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                    item.status === 'Yayında' ? 'text-green-500' :
                    item.status === 'Reddedildi' ? 'text-red-500' :
                    'text-yellow-500'
                  }`}>
                    {item.status === 'Yayında' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {item.status === 'Reddedildi' && <XCircle className="w-3.5 h-3.5" />}
                    {item.status === 'Onay Bekliyor' && <Clock className="w-3.5 h-3.5" />}
                    {item.status}
                  </span>
                  
                  {item.status === 'Onay Bekliyor' && (
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleStatusChange(item.id, "Yayında")}
                        className="px-2 py-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded text-[11px] font-medium cursor-pointer"
                      >
                        Onayla
                      </button>
                      <button 
                        onClick={() => handleStatusChange(item.id, "Reddedildi")}
                        className="px-2 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded text-[11px] font-medium cursor-pointer"
                      >
                        Reddet
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
