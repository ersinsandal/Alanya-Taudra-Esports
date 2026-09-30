"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function CampusRegistrationClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-[#D00000] hover:bg-[#FF1F2D] text-white rounded-md font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#D00000]/20"
      >
        Katıl
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-panel border border-white/10 rounded-xl w-full max-w-lg p-6 relative">
            <button 
              onClick={() => { setIsOpen(false); setIsSubmitted(false); }}
              className="absolute top-4 right-4 text-secondary hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase">Campus Clash Kayıt</h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-success text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Başvurunuz Alındı</h3>
                <p className="text-secondary">Üniversite temsilciniz sizinle iletişime geçecektir.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-4 text-left">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Üniversite</label>
                  <select required className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary-red appearance-none">
                    <option value="">Seçiniz...</option>
                    <option value="alku">Alanya Alaaddin Keykubat Üniversitesi (ALKÜ)</option>
                    <option value="alanya">Alanya Üniversitesi</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Fakülte / Bölüm</label>
                  <input required type="text" className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary-red" placeholder="Mühendislik Fakültesi / Bilgisayar Müh." />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Öğrenci Numarası</label>
                  <input required type="text" className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary-red" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Oyun</label>
                  <select required className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary-red appearance-none">
                    <option value="VALORANT">VALORANT</option>
                    <option value="CS2">Counter-Strike 2</option>
                    <option value="LOL">League of Legends</option>
                    <option value="EA FC 24">EA FC 24</option>
                  </select>
                </div>
                
                <button type="submit" className="w-full py-4 bg-primary-red hover:bg-deep-red text-white rounded-md font-bold uppercase mt-6">
                  Gönder
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
