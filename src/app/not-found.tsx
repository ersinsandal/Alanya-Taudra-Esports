'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 text-center">
      <h1 className="text-9xl font-bold tracking-tighter text-[#D00000] font-space-grotesk opacity-80">
        404
      </h1>
      <h2 className="mt-4 text-4xl font-bold text-[#F7F7F7] font-space-grotesk uppercase tracking-wider">
        ROUND LOST.
      </h2>
      <p className="mt-4 text-xl text-[#99999F]">
        Ama maç bitmedi.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center rounded-md bg-[#111114] border border-white/10 px-8 py-3 text-sm font-medium text-white hover:bg-white/5 hover:border-white/20 transition-colors"
      >
        Ana Sayfa
      </Link>
    </div>
  );
}
