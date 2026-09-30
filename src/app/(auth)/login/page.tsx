'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { login } from '@/lib/actions/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('identifier', email);
      formData.append('password', password);

      const res = await login(formData);
      if (res && !res.success) {
        setError(res.error || 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
        setLoading(false);
        return;
      }

      const target = res?.redirectUrl || '/admin';
      router.push(target);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-[#0B0B0D] p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center"><Image src="/ate-logo.png" alt="ATE Digital Arena" width={80} height={80} className="object-contain" /></div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F7F7F7] font-space-grotesk">
            Giriş Yap
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          

          {error && (
            <div className="rounded-md bg-[#850000]/20 p-4 text-sm text-[#FF1F2D] border border-[#D00000]/50">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email veya kullanıcı adı
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-md border border-white/10 bg-[#111114] px-3 py-3 text-[#F7F7F7] placeholder-gray-500 focus:z-10 focus:border-[#D00000] focus:outline-none focus:ring-1 focus:ring-[#D00000] sm:text-sm"
                placeholder="Email veya kullanıcı adı"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-md border border-white/10 bg-[#111114] px-3 py-3 pr-10 text-[#F7F7F7] placeholder-gray-500 focus:z-10 focus:border-[#D00000] focus:outline-none focus:ring-1 focus:ring-[#D00000] sm:text-sm"
                placeholder="Şifre"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-white/10 bg-[#111114] text-[#D00000] focus:ring-[#D00000]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#99999F]">
                Beni hatırla
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-[#D00000] hover:text-[#FF1F2D]">
                Şifremi Unuttum
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#D00000] px-4 py-3 text-sm font-medium text-white hover:bg-[#FF1F2D] focus:outline-none focus:ring-2 focus:ring-[#D00000] focus:ring-offset-2 focus:ring-offset-[#050505] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Giriş Yap'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#0B0B0D] px-2 text-[#99999F]">veya</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/register"
              className="font-medium text-[#F7F7F7] hover:text-white"
            >
              ATE ID Oluştur
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
