export type ArenaVariant = 'default' | 'hero' | 'minimal';

export interface ArenaConfig {
  particles: {
    count: number;
    minSize: number;
    maxSize: number;
    minSpeed: number;
    maxSpeed: number;
    colors: string[];
    connectionDistance: number;
  };
  grid: {
    opacity: number;
    size: number;
    color: string;
  };
  hud: {
    enabled: boolean;
    color: string;
    opacity: number;
  };
  glow: {
    size: number;
    opacity: number;
    color: string;
  };
  scanline: {
    enabled: boolean;
    speed: number;
    opacity: number;
    color: string;
  };
}

export const ARENA_VARIANTS: Record<ArenaVariant, ArenaConfig> = {
  hero: {
    particles: {
      count: 140,
      minSize: 1.5,
      maxSize: 3.5,
      minSpeed: 0.4,
      maxSpeed: 1.2,
      colors: ['#D00000', '#FF1F2D', '#FFFFFF', '#FF4D58'],
      connectionDistance: 130,
    },
    grid: { opacity: 0.25, size: 55, color: '#D00000' },
    hud: { enabled: true, color: '#D00000', opacity: 0.35 },
    glow: { size: 1000, opacity: 0.85, color: '#FF0015' },
    scanline: { enabled: true, speed: 1.8, opacity: 0.20, color: '#FF1F2D' },
  },
  default: {
    particles: {
      count: 100,
      minSize: 1.2,
      maxSize: 3.0,
      minSpeed: 0.3,
      maxSpeed: 1.0,
      colors: ['#D00000', '#FF1F2D', '#FFFFFF', '#850000'],
      connectionDistance: 120,
    },
    grid: { opacity: 0.22, size: 55, color: '#D00000' },
    hud: { enabled: true, color: '#D00000', opacity: 0.30 },
    glow: { size: 800, opacity: 0.70, color: '#FF0015' },
    scanline: { enabled: true, speed: 1.5, opacity: 0.18, color: '#FF1F2D' },
  },
  minimal: {
    particles: {
      count: 50,
      minSize: 1.0,
      maxSize: 2.0,
      minSpeed: 0.2,
      maxSpeed: 0.5,
      colors: ['#D00000', '#FFFFFF'],
      connectionDistance: 100,
    },
    grid: { opacity: 0.08, size: 70, color: '#D00000' },
    hud: { enabled: true, color: '#D00000', opacity: 0.15 },
    glow: { size: 250, opacity: 0.10, color: '#D00000' },
    scanline: { enabled: true, speed: 1.0, opacity: 0.10, color: '#D00000' },
  },
};
