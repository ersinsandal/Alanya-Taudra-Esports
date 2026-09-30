'use client';

import { useActionState } from 'react';
import { submitContactForm, type ContactFormState } from '@/lib/actions/contact';
import { Mail, MapPin, MessageSquare, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [state, formAction, pending] = useActionState<ContactFormState, FormData>(submitContactForm, null);

  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="font-space text-4xl font-bold text-[#F7F7F7] mb-4">İLETİŞİM</h1>
          <div className="w-16 h-1 bg-[#D00000] mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Info Side */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-[#111114] p-6 rounded-lg border border-[rgba(255,255,255,0.08)]">
              <h3 className="font-space font-bold text-lg text-[#F7F7F7] mb-6">Bize Ulaşın</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-[#99999F]">
                  <Mail className="w-5 h-5 text-[#D00000] mt-1" />
                  <div>
                    <p className="font-medium text-[#F7F7F7] mb-1">E-Posta</p>
                    <a href="mailto:info@atedigitalarena.com" className="hover:text-white transition-colors">info@atedigitalarena.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-[#99999F]">
                  <MessageSquare className="w-5 h-5 text-[#D00000] mt-1" />
                  <div>
                    <p className="font-medium text-[#F7F7F7] mb-1">Discord</p>
                    <a href="#" className="hover:text-white transition-colors">ATE Topluluk Sunucusu</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-[#99999F]">
                  <MapPin className="w-5 h-5 text-[#D00000] mt-1" />
                  <div>
                    <p className="font-medium text-[#F7F7F7] mb-1">Konum</p>
                    <p>Alanya, Antalya, Türkiye</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#D00000]/20 to-transparent p-6 rounded-lg border border-[#D00000]/30">
              <Gamepad2 className="w-8 h-8 text-[#D00000] mb-4" />
              <h3 className="font-space font-bold text-lg text-[#F7F7F7] mb-2">Partnerlik & Sponsorluk</h3>
              <p className="text-sm text-[#99999F] mb-4">
                ATE ile işbirliği yapmak veya markanızı arenaya taşımak için özel taleplerinizi iletebilirsiniz.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-2">
            <div className="bg-[#111114] p-8 rounded-lg border border-[rgba(255,255,255,0.08)]">
              <h2 className="font-space font-bold text-2xl text-[#F7F7F7] mb-6">Mesaj Gönder</h2>
              
              {state?.success ? (
                <div className="p-4 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded text-[#22C55E] mb-6">
                  {state.message}
                </div>
              ) : (
                <form action={formAction} className="space-y-4">
                  {state?.message && !state.success && (
                    <div className="p-4 bg-[#D00000]/10 border border-[#D00000]/20 rounded text-[#D00000]">
                      {state.message}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#99999F] mb-1">Ad Soyad *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="w-full bg-[#050505] border border-[rgba(255,255,255,0.08)] rounded p-3 text-white focus:border-[#D00000] focus:outline-none transition-colors"
                        required
                      />
                      {state?.errors?.name && <p className="text-[#D00000] text-xs mt-1">{state.errors.name[0]}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#99999F] mb-1">E-Posta *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="w-full bg-[#050505] border border-[rgba(255,255,255,0.08)] rounded p-3 text-white focus:border-[#D00000] focus:outline-none transition-colors"
                        required
                      />
                      {state?.errors?.email && <p className="text-[#D00000] text-xs mt-1">{state.errors.email[0]}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#99999F] mb-1">Telefon</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        className="w-full bg-[#050505] border border-[rgba(255,255,255,0.08)] rounded p-3 text-white focus:border-[#D00000] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-[#99999F] mb-1">Konu *</label>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        className="w-full bg-[#050505] border border-[rgba(255,255,255,0.08)] rounded p-3 text-white focus:border-[#D00000] focus:outline-none transition-colors"
                        required
                      />
                      {state?.errors?.subject && <p className="text-[#D00000] text-xs mt-1">{state.errors.subject[0]}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#99999F] mb-1">Mesajınız *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5}
                      className="w-full bg-[#050505] border border-[rgba(255,255,255,0.08)] rounded p-3 text-white focus:border-[#D00000] focus:outline-none transition-colors resize-none"
                      required
                    ></textarea>
                    {state?.errors?.message && <p className="text-[#D00000] text-xs mt-1">{state.errors.message[0]}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={pending}
                    className="w-full bg-[#D00000] hover:bg-[#FF1F2D] text-white font-medium py-3 px-4 rounded transition-colors disabled:opacity-50"
                  >
                    {pending ? 'Gönderiliyor...' : 'Gönder'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
