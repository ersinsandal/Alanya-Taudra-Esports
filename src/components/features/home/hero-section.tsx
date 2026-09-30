'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] overflow-hidden bg-transparent">
      {/* Subtle edge fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/70 pointer-events-none z-10" />
      
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/ate-logo.png"
            alt="ATE Logo"
            width={180}
            height={180}
            className="w-[120px] md:w-[180px] h-auto object-contain"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="font-space font-medium tracking-widest text-sm text-[#99999F] uppercase">
            Alanya Taudra E-Sports
          </h2>
          
          <h1 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl leading-none text-[#F7F7F7]">
            THEY PLAYED.<br />WE ATE.
          </h1>
          
          <p className="text-[#99999F] italic text-lg md:text-xl">
            Alanya'dan Arenaya.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-4"
        >
          <Link
            href="/register"
            className="px-8 py-4 bg-[#D00000] hover:bg-[#FF1F2D] text-white font-medium rounded transition-colors w-full sm:w-auto text-center"
          >
            ATE'YE KATIL
          </Link>
          <Link
              href="/crews"
              className="px-8 py-4 border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] text-white font-medium rounded transition-colors w-full sm:w-auto text-center"
            >
              OYUN EKİPLERİNİ KEŞFET
            </Link>
        </motion.div>
      </div>
    </section>
  );
}
