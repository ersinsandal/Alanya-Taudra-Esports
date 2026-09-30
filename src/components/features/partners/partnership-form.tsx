'use client';

import { useState } from 'react';
import { submitPartnershipRequest } from '@/lib/actions/partners';
import { toast } from 'react-hot-toast';

export function PartnershipForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await submitPartnershipRequest(formData);
      if (res.success) {
        toast.success('Partnerlik başvurunuz başarıyla iletildi!');
        form.reset();
      } else {
        toast.error(res.error || 'Bir hata oluştu.');
      }
    } catch {
      toast.error('Bağlantı hatası oluştu.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-[#99999F] mb-2">Firma Adı *</label>
          <input type="text" id="company" name="company" required className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D00000] transition-colors" />
        </div>
        <div>
          <label htmlFor="contactPerson" className="block text-sm font-medium text-[#99999F] mb-2">Yetkili Kişi *</label>
          <input type="text" id="contactPerson" name="contactPerson" required className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D00000] transition-colors" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#99999F] mb-2">E-posta Adresi *</label>
          <input type="email" id="email" name="email" required className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D00000] transition-colors" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#99999F] mb-2">Telefon Numarası</label>
          <input type="tel" id="phone" name="phone" className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D00000] transition-colors" />
        </div>
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-[#99999F] mb-2">Sektör</label>
        <input type="text" id="industry" name="industry" className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D00000] transition-colors" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#99999F] mb-2">Mesajınız / İşbirliği Fikriniz *</label>
        <textarea id="message" name="message" rows={4} required className="w-full bg-[#0B0B0D] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D00000] transition-colors resize-none"></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#D00000] hover:bg-[#FF1F2D] text-white font-medium py-4 rounded-md transition-colors shadow-[0_0_20px_rgba(208,0,0,0.3)] disabled:opacity-50"
      >
        {loading ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
      </button>
    </form>
  );
}
