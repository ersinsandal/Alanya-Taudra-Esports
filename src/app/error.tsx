'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 text-center">
      <h1 className="text-9xl font-bold tracking-tighter text-[#F59E0B] font-space-grotesk opacity-80">
        500
      </h1>
      <h2 className="mt-4 text-4xl font-bold text-[#F7F7F7] font-space-grotesk uppercase tracking-wider">
        TECHNICAL TIMEOUT
      </h2>
      <p className="mt-4 text-xl text-[#99999F]">
        Bir sorun oluştu. Lütfen tekrar deneyin.
      </p>
      <div className="mt-10 flex gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-md bg-[#D00000] px-8 py-3 text-sm font-medium text-white hover:bg-[#FF1F2D] transition-colors"
        >
          Tekrar Dene
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-[#111114] border border-white/10 px-8 py-3 text-sm font-medium text-white hover:bg-white/5 hover:border-white/20 transition-colors"
        >
          Ana Sayfa
        </Link>
      </div>
    </div>
  );
}
