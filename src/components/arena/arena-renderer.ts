import { ArenaConfig, ARENA_VARIANTS } from './arena-config';
import { Particle } from './arena-particles';

export class ArenaRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private particles: Particle[] = [];
  private config: ArenaConfig;
  private intensity: number;
  
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;
  
  private scrollY = 0;
  
  private scanlineY = 0;
  private time = 0;
  
  private lastTime = 0;
  private frameCount = 0;
  private fps = 60;
  
  private isMobile = false;
  private animationFrameId = 0;
  
  constructor(
    canvas: HTMLCanvasElement, 
    variant: keyof typeof ARENA_VARIANTS = 'default',
    intensity: number = 0.5
  ) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error("Could not get 2D context");
    this.ctx = context;
    
    this.config = ARENA_VARIANTS[variant];
    this.intensity = intensity;
    
    this.isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    if (this.isMobile) {
      this.config.particles.count = Math.floor(this.config.particles.count * 0.4);
    }
    
    this.handleResize();
    this.initParticles();
  }
  
  public handleResize = () => {
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    
    this.ctx.scale(dpr, dpr);
    
    this.mouseX = this.width / 2;
    this.mouseY = this.height / 2;
    this.targetMouseX = this.mouseX;
    this.targetMouseY = this.mouseY;
  };
  
  public handleMouseMove = (x: number, y: number) => {
    if (this.isMobile) return;
    this.targetMouseX = x;
    this.targetMouseY = y;
  };
  
  public handleScroll = (y: number) => {
    this.scrollY = y;
  };
  
  private initParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.particles.count; i++) {
      this.particles.push(new Particle(this.width, this.height, this.config.particles));
    }
  }
  
  private updatePerformance(delta: number) {
    this.frameCount++;
    if (this.time - this.lastTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = this.time;
      
      // Auto adjust quality
      if (this.fps < 30 && this.particles.length > 20) {
        this.particles.splice(0, 10);
      }
    }
  }
  
  private drawGrid() {
    this.ctx.strokeStyle = this.config.grid.color;
    this.ctx.globalAlpha = this.config.grid.opacity * this.intensity;
    this.ctx.lineWidth = 1;
    
    const size = this.config.grid.size;
    const offsetX = (this.mouseX * 0.05) % size;
    const offsetY = ((this.scrollY * -0.2) + (this.mouseY * 0.05)) % size;
    
    this.ctx.beginPath();
    for (let x = offsetX - size; x < this.width + size; x += size) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
    }
    
    for (let y = offsetY - size; y < this.height + size; y += size) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
    }
    this.ctx.stroke();
    this.ctx.globalAlpha = 1;
  }
  
  private drawParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.update(this.width, this.height);
      
      const dx = (this.mouseX - this.width / 2) * 0.05;
      const dy = (this.mouseY - this.height / 2) * 0.05 + (this.scrollY * -0.1);
      
      const pX = p.x + dx;
      const pY = p.y + dy;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(pX, pY, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.baseOpacity * this.intensity;
      this.ctx.fill();
      
      // Draw connections
      if (!this.isMobile) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const p2X = p2.x + dx;
          const p2Y = p2.y + dy;
          
          const dist = Math.hypot(pX - p2X, pY - p2Y);
          if (dist < this.config.particles.connectionDistance) {
            this.ctx.beginPath();
            this.ctx.moveTo(pX, pY);
            this.ctx.lineTo(p2X, p2Y);
            this.ctx.strokeStyle = p.color;
            this.ctx.globalAlpha = (1 - dist / this.config.particles.connectionDistance) * 0.2 * this.intensity;
            this.ctx.stroke();
          }
        }
      }
    }
    this.ctx.globalAlpha = 1;
  }
  
  private drawGlow() {
    if (this.isMobile) return;
    const gradient = this.ctx.createRadialGradient(
      this.mouseX, this.mouseY, 0,
      this.mouseX, this.mouseY, this.config.glow.size
    );
    gradient.addColorStop(0, `${this.config.glow.color}${Math.floor(this.config.glow.opacity * 255 * this.intensity).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, 'transparent');
    
    this.ctx.globalCompositeOperation = 'lighter';
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = 'source-over';
  }
  
  private drawScanline() {
    if (!this.config.scanline.enabled) return;
    
    this.scanlineY += this.config.scanline.speed;
    if (this.scanlineY > this.height) {
      this.scanlineY = 0;
    }
    
    this.ctx.fillStyle = this.config.scanline.color;
    this.ctx.globalAlpha = this.config.scanline.opacity * this.intensity;
    this.ctx.fillRect(0, this.scanlineY, this.width, 2);
    this.ctx.globalAlpha = 1;
  }
  
  private drawHud() {
    if (!this.config.hud.enabled || this.isMobile) return;
    
    this.ctx.strokeStyle = this.config.hud.color;
    this.ctx.globalAlpha = this.config.hud.opacity * this.intensity;
    this.ctx.lineWidth = 1;
    
    // Crosshairs
    const chSize = 10;
    
    // Top left
    this.ctx.beginPath();
    this.ctx.moveTo(50, 40);
    this.ctx.lineTo(50, 50);
    this.ctx.lineTo(60, 50);
    this.ctx.stroke();
    
    // Bottom right
    this.ctx.beginPath();
    this.ctx.moveTo(this.width - 50, this.height - 40);
    this.ctx.lineTo(this.width - 50, this.height - 50);
    this.ctx.lineTo(this.width - 60, this.height - 50);
    this.ctx.stroke();
    
    // Numbers
    if (Math.random() > 0.95) {
      this.ctx.font = '10px monospace';
      this.ctx.fillStyle = this.config.hud.color;
      this.ctx.fillText(`SYS.${Math.floor(Math.random() * 999)}`, 50, 70);
    }
    
    this.ctx.globalAlpha = 1;
  }
  
  public render = (timestamp: number) => {
    this.time = timestamp;
    this.updatePerformance(timestamp);
    
    // Smooth mouse movement
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.1;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.1;
    
    // Clear background
    this.ctx.fillStyle = '#050505'; // Base background color
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    this.drawGrid();
    this.drawGlow();
    this.drawParticles();
    this.drawScanline();
    this.drawHud();
    
    this.animationFrameId = requestAnimationFrame(this.render);
  };
  
  public start() {
    this.lastTime = performance.now();
    this.animationFrameId = requestAnimationFrame(this.render);
  }
  
  public stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
  
  public setIntensity(intensity: number) {
    this.intensity = intensity;
  }
}
