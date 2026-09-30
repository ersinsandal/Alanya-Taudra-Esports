'use client';

import { useEffect, useRef, useState } from 'react';
import { ArenaRenderer } from './arena-renderer';
import { ArenaVariant } from './arena-config';

interface DigitalArenaProps {
  variant?: ArenaVariant;
  intensity?: number;
  className?: string;
}

export function DigitalArena({ 
  variant = 'default', 
  intensity = 0.9,
  className = ''
}: DigitalArenaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ArenaRenderer | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || reducedMotion) return;

    const canvas = canvasRef.current;
    rendererRef.current = new ArenaRenderer(canvas, variant, intensity);
    rendererRef.current.start();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        rendererRef.current?.handleResize();
      }, 100);
    };

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          rendererRef.current?.handleMouseMove(e.clientX, e.clientY);
          ticking = false;
        });
        ticking = true;
      }
    };

    let scrollTicking = false;
    const handleScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          rendererRef.current?.handleScroll(window.scrollY);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      rendererRef.current?.stop();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [variant, reducedMotion]);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setIntensity(intensity);
    }
  }, [intensity]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      {reducedMotion ? (
        <div className="absolute inset-0 bg-[#050505] bg-[radial-gradient(circle_at_center,rgba(208,0,0,0.12)_0%,transparent_100%)]" />
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />
      )}
      {/* Subtle vignette for edge framing */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.7)_100%)]" />
    </div>
  );
}
