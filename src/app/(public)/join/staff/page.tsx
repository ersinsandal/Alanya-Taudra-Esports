"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { User, Mail, Phone, MessageSquare, Calendar, MapPin, Briefcase, CheckCircle2 } from "lucide-react";

function StaffForm() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  
  const roleMap: Record<string, string> = {
    coach: "Koç",
    analyst: "Analist",
    content_creator: "İçerik Üreticisi",
    volunteer: "Gönüllü",
  };

  const initialRole = roleParam && roleMap[roleParam] ? roleMap[roleParam] : "Gönüllü";
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState(initialRole);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto w-full p-4 md:p-8 mt-12">
        <div className="bg-panel border border-success/30 rounded-xl p-12 text-center flex flex-col items-center">
          <CheckCircle2 className="w-16 h-16 text-success mb-6" />
          <h2 className="text-3xl font-display font-bold text-white mb-4">Başvurunuz alındı!</h2>
          <p className="text-secondary text-lg">
            ✅ Başvurunuz başarıyla sistemimize ulaştı. En kısa sürede sizinle iletişime geçeceğiz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full p-4 md:p-8 mt-12 mb-24">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-tight">
          PERSONEL BAŞVURUSU
        </h1>
        <p className="text-secondary text-lg">
          ATE Digital Arena ekibinin bir parçası olmak için başvurunu tamamla.
        </p>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center gap-2">
                <User className="w-4 h-4 text-primary-red" /> Ad Soyad
              </label>
              <input 
                required 
                type="text" 
                className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors"
                placeholder="Adınız Soyadınız"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-red" /> E-posta
              </label>
              <input 
                required 
                type="email" 
                className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors"
                placeholder="ornek@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-red" /> Telefon
              </label>
              <input 
                required 
                type="tel" 
                className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors"
                placeholder="05XX XXX XX XX"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary-red" /> Discord Kullanıcı Adı
              </label>
              <input 
                required 
                type="text" 
                className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors"
                placeholder="kullaniciadi#1234"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-red" /> Yaş
              </label>
              <input 
                required 
                type="number" 
                min="13"
                max="99"
                className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors"
                placeholder="18"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-red" /> Şehir
              </label>
              <input 
                required 
                type="text" 
                defaultValue="Alanya"
                className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary-red" /> Seçilen Rol
            </label>
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors appearance-none"
            >
              <option value="Koç">Koç</option>
              <option value="Analist">Analist</option>
              <option value="İçerik Üreticisi">İçerik Üreticisi</option>
              <option value="Gönüllü">Gönüllü</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Deneyim</label>
            <textarea 
              required 
              rows={4}
              className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors resize-none"
              placeholder="Daha önce e-spor alanında deneyiminizi kısaca anlatın"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Motivasyon</label>
            <textarea 
              required 
              rows={4}
              className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors resize-none"
              placeholder="ATE'ye neden katılmak istiyorsunuz?"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-primary-red hover:bg-deep-red text-white rounded-md font-bold uppercase tracking-wider transition-colors mt-8"
          >
            Başvuruyu Gönder
          </button>
        </form>
      </div>
    </div>
  );
}

export default function StaffPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Yükleniyor...</div>}>
      <StaffForm />
    </Suspense>
  );
}
