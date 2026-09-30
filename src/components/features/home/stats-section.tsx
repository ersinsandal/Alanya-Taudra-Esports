'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatsProps {
  stats: {
    members: number;
    players: number;
    schools: number;
    crews: number;
    tournaments: number;
    events: number;
  };
}

function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(ease * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 bg-panel border border-white/5 rounded-xl hover:border-primary-red/30 transition-colors">
      <div className="text-4xl md:text-5xl font-heading font-black text-white mb-2">
        {count}
      </div>
      <div className="text-secondary font-bold uppercase tracking-wider text-xs text-center">
        {label}
      </div>
    </div>
  );
}

export function StatsSection({ stats }: StatsProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-black text-white uppercase tracking-tight">ATE RAKAMLARDA</h2>
          <div className="w-16 h-1 bg-primary-red mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          <Counter value={stats.members} label="Topluluk Üyesi" />
          <Counter value={stats.players} label="Aktif Oyuncu" />
          <Counter value={stats.schools} label="Kayıtlı Okul" />
          <Counter value={stats.crews} label="Oyun Ekibi" />
          <Counter value={stats.tournaments} label="Turnuva" />
          <Counter value={stats.events} label="Etkinlik" />
        </div>
      </div>
    </section>
  );
}
