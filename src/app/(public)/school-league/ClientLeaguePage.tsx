"use client";

import { useState } from "react";
import { X } from "lucide-react";

const ALANYA_SCHOOLS = [
  'Alanya Anadolu Lisesi', 'Alanya Fen Lisesi', 'Alanya Bahçeşehir Koleji', 'Alanya Sosyal Bilimler Lisesi', 
  'Alanya Mesleki ve Teknik Anadolu Lisesi', 'Alanya Satı Kadın Mesleki ve Teknik Anadolu Lisesi', 
  'Alanya Hamdullah Emin Paşa Anadolu Lisesi', 'Alanya Cumhuriyet Anadolu Lisesi', 'Alanya Çıplaklı Anadolu Lisesi', 
  'Alanya Güllü Mah. Anadolu Lisesi', 'Alanya Kestel Anadolu Lisesi', 'Alanya Payallar Anadolu Lisesi', 
  'Alanya Türkler Anadolu Lisesi', 'Alanya Konaklı Anadolu Lisesi', 'Alanya Mahmutlar Anadolu Lisesi', 
  'Alanya Okurcalar Anadolu Lisesi', 'Alanya Demirtaş Anadolu Lisesi', 'Alanya Tosmur Anadolu Lisesi', 
  'Alanya Cikcilli Anadolu Lisesi', 'Alanya Avsallar Anadolu Lisesi', 'Alanya Kargıcak Anadolu Lisesi', 
  'Alanya Türkevleri Anadolu Lisesi', 'Alanya Obagöl Anadolu Lisesi', 'Alanya İncişaltı Anadolu Lisesi', 
  'Alanya Sapadere Anadolu Lisesi', 'Alanya Toslak Anadolu Lisesi', 'Alanya Üzümlü Anadolu Lisesi', 
  'Alanya Gözbağ Anadolu Lisesi', 'Alanya İşakonak Anadolu Lisesi', 'Alanya Gökbel Anadolu Lisesi', 
  'Alanya Emerhane Anadolu Lisesi', 'Alanya Kuzyaka Anadolu Lisesi', 'Alanya Değirmendere Anadolu Lisesi', 
  'Alanya Belen Anadolu Lisesi', 'Alanya Gündoğmuş Anadolu Lisesi', 'Gazipaşa Anadolu Lisesi', 
  'Gazipaşa Fen Lisesi', 'Gazipaşa Mesleki ve Teknik Anadolu Lisesi', 'ALKÜ Vakfı Koleji', 
  'Alanya Final Akademi', 'Alanya Doğa Koleji', 'Alanya Ted Koleji', 'Alanya İsabet Koleji', 
  'Alanya Seydikemer Koleji', 'Alanya Bilnet Koleji', 'Alanya Akıl Küpü Koleji', 'Alanya Concept Koleji', 
  'Alanya İleri Koleji'
];

export function SchoolLeagueClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredSchools = ALANYA_SCHOOLS.filter(school => 
    school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-[#D00000] hover:bg-[#FF1F2D] text-white rounded-md font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-lg shadow-[#D00000]/20"
      >
        Okulunu Kaydet
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
            
            <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase">Okul Kayıt Formu</h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-success text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Talebiniz Alındı</h3>
                <p className="text-secondary">Okulunuzun ön kaydı oluşturuldu. Size dönüş yapacağız.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-4 text-left">
                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-white">Okul Seçimi</label>
                  <div className="relative">
                    <input 
                      required
                      type="text"
                      placeholder="Okulunuzu arayın..." 
                      value={isDropdownOpen ? searchQuery : selectedSchool || searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsDropdownOpen(true);
                      }}
                      onFocus={() => setIsDropdownOpen(true)}
                      onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                      className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary-red"
                    />
                    
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-[#111114] border border-white/10 rounded-md shadow-xl max-h-48 overflow-y-auto">
                        {filteredSchools.length > 0 ? (
                          filteredSchools.map((school, idx) => (
                            <div 
                              key={idx}
                              className="px-4 py-2 text-sm text-white hover:bg-primary-red cursor-pointer transition-colors"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                setSelectedSchool(school);
                                setSearchQuery(school);
                                setIsDropdownOpen(false);
                              }}
                            >
                              {school}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-sm text-secondary">Okul bulunamadı</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Oyuncu Adı Soyadı</label>
                  <input required type="text" className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary-red" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Oyun</label>
                  <select className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary-red appearance-none">
                    <option value="VALORANT">VALORANT</option>
                    <option value="CS2">Counter-Strike 2</option>
                    <option value="LOL">League of Legends</option>
                  </select>
                </div>
                
                <button type="submit" className="w-full py-3 bg-primary-red hover:bg-deep-red text-white rounded-md font-bold uppercase mt-6">
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
