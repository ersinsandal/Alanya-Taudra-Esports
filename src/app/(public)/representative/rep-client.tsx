"use client";

import { useActionState, useState } from 'react';
import { submitSchoolRepApplication } from '@/lib/actions/school-rep';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function SchoolRepresentativePage({ schools }: { schools: string[] }) {
  const [state, formAction, pending] = useActionState(submitSchoolRepApplication, { success: false, errors: {} });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredSchools = schools.filter(school => 
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
