import { ArenaConfig } from './arena-config';

export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseOpacity: number;
  
  constructor(width: number, height: number, config: ArenaConfig['particles']) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    
    const speedBase = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * speedBase;
    this.vy = Math.sin(angle) * speedBase;
    
    this.size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
    this.baseOpacity = Math.random() * 0.5 + 0.1;
  }
  
  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }
  
  draw(ctx: CanvasRenderingContext2D, opacityMultiplier: number = 1) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.baseOpacity * opacityMultiplier;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
