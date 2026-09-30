'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-[#0B0B0D] p-8 shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F7F7F7] font-space-grotesk">
            Şifreni Sıfırla
          </h2>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-md bg-[#22C55E]/10 p-4 text-center text-sm text-[#22C55E] border border-[#22C55E]/50">
            E-posta adresine sıfırlama bağlantısı gönderildi.
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-md border border-white/10 bg-[#111114] px-3 py-3 text-[#F7F7F7] placeholder-gray-500 focus:z-10 focus:border-[#D00000] focus:outline-none focus:ring-1 focus:ring-[#D00000] sm:text-sm"
                placeholder="E-posta adresi"
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#D00000] px-4 py-3 text-sm font-medium text-white hover:bg-[#FF1F2D] focus:outline-none focus:ring-2 focus:ring-[#D00000] focus:ring-offset-2 focus:ring-offset-[#050505]"
              >
                Sıfırlama Bağlantısı Gönder
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="font-medium text-[#D00000] hover:text-[#FF1F2D]">
            Giriş Yap'a Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
