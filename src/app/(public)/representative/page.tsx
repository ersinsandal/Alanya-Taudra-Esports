"use client";

import { useActionState, useState } from 'react';
import { submitSchoolRepApplication } from '@/lib/actions/school-rep';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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

export default function SchoolRepresentativePage() {
  const [state, formAction, pending] = useActionState(submitSchoolRepApplication, { success: false, errors: {} });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredSchools = ALANYA_SCHOOLS.filter(school => 
    school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (state?.success) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-xl">
        <div className="bg-panel border border-success p-12 rounded-xl">
          <h2 className="text-3xl font-heading font-bold text-success mb-4">Başvurun Alındı!</h2>
          <p className="text-secondary">Okul temsilciliği başvurunuz tarafımıza ulaştı. Kısa süre içinde dönüş yapacağız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-heading font-bold text-white mb-2 uppercase">ATE OKUL TEMSİLCİSİ</h1>
        <p className="text-secondary text-lg">Okulunu ATE dünyasında temsil et, etkinlikleri organize et ve topluluğa liderlik et.</p>
      </div>

      <Card className="bg-panel border-white/5">
        <CardContent className="p-8">
          <form action={formAction} className="space-y-6">
            <div className="space-y-2 relative">
              <Label>Okul</Label>
              <input type="hidden" name="schoolId" value={selectedSchool} required />
              
              <div className="relative">
                <Input 
                  placeholder="Okulunuzu seçin veya arayın" 
                  value={isDropdownOpen ? searchQuery : selectedSchool || searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                  className="w-full"
                />
                
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-[#111114] border border-white/10 rounded-md shadow-xl max-h-60 overflow-y-auto">
                    {filteredSchools.length > 0 ? (
                      filteredSchools.map((school, idx) => (
                        <div 
                          key={idx}
                          className="px-4 py-2 text-sm text-white hover:bg-primary-red cursor-pointer transition-colors"
                          onClick={() => {
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
              
              {state?.errors?.schoolId && <p className="text-sm text-primary-red">{state.errors.schoolId[0]}</p>}
            </div>

            <div className="space-y-2">
              <Label>Sınıf / Bölüm</Label>
              <Input name="grade" required />
            </div>

            <div className="space-y-2">
              <Label>Neden Temsilci Olmak İstiyorsun?</Label>
              <Textarea name="motivation" rows={4} required placeholder="Motivasyonunu anlat" />
              {state?.errors?.motivation && <p className="text-sm text-primary-red">{state.errors.motivation[0]}</p>}
            </div>

            <div className="space-y-2">
              <Label>Topluluk / Organizasyon Deneyimin Var mı?</Label>
              <Textarea name="experience" rows={3} />
            </div>

            <Button type="submit" disabled={pending} className="w-full bg-primary-red hover:bg-accent-red text-white py-6">
              {pending ? 'GÖNDERİLİYOR...' : 'BAŞVURUYU TAMAMLA'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
