import React, { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'motion/react';

const GalaxyVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const particles: NebulaParticle[] = [];
    const particleCount = 15000; // Even more for full page

    // Distributed cloud cores to cover the entire page
    const cloudCores = [
      { x: 0.25, y: 0.35, r: 400, color: 'rgba(168, 85, 247, ', density: 0.4 }, // Purple Left
      { x: 0.75, y: 0.45, r: 450, color: 'rgba(236, 72, 153, ', density: 0.5 }, // Pink Right
      { x: 0.5, y: 0.7, r: 400, color: 'rgba(88, 166, 255, ', density: 0.4 },  // Blue Bottom
      { x: 0.1, y: 0.8, r: 300, color: 'rgba(139, 92, 246, ', density: 0.2 },  // Violet Bottom Left
      { x: 0.9, y: 0.2, r: 350, color: 'rgba(88, 166, 255, ', density: 0.3 },  // Blue Top Right
      { x: 0.4, y: 0.2, r: 250, color: 'rgba(168, 85, 247, ', density: 0.2 },  // Purple Top Mid
    ];

    class NebulaParticle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      offsetX: number;
      offsetY: number;
      size: number;
      color: string;
      speed: number;
      noiseOffset: number;
      driftAngle: number;

      constructor() {
        this.reset();
      }

      reset() {
        // Pick a cloud core
        const core = cloudCores[Math.floor(Math.random() * cloudCores.length)];
        
        const r = Math.pow(Math.random(), 0.8) * core.r;
        const theta = Math.random() * Math.PI * 2;
        
        this.baseX = (width * core.x) + Math.cos(theta) * r;
        this.baseY = (height * core.y) + Math.sin(theta) * r * 0.8;
        
        this.x = this.baseX;
        this.y = this.baseY;
        this.offsetX = 0;
        this.offsetY = 0;
        
        this.size = Math.random() * 1.5 + 0.2;
        this.speed = (Math.random() * 0.08) + 0.02;
        this.noiseOffset = Math.random() * 1000;
        this.driftAngle = Math.random() * Math.PI * 2;

        const falloff = Math.max(0, 1 - (r / core.r));
        const opacity = Math.pow(falloff, 2) * (Math.random() * 0.4 + 0.1) * core.density * 2.5;
        this.color = core.color + opacity + ')';
      }

      update(time: number, mx: number, my: number) {
        const drift = Math.sin(time * 0.0004 + this.noiseOffset) * 12;
        const dx_drift = Math.cos(this.driftAngle) * drift;
        const dy_drift = Math.sin(this.driftAngle) * drift;
        
        const tx = this.baseX + dx_drift;
        const ty = this.baseY + dy_drift;

        const dx = mx - tx;
        const dy = my - ty;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          this.offsetX -= (dx / dist) * force * 5;
          this.offsetY -= (dy / dist) * force * 5;
        } else {
          this.offsetX *= 0.95;
          this.offsetY *= 0.95;
        }

        this.x = tx + this.offsetX;
        this.y = ty + this.offsetY;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;

      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new NebulaParticle());
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      
      const mx = smoothX.get();
      const my = smoothY.get();

      particles.forEach(p => {
        p.update(time, mx, my);
        p.draw();
      });
      
      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    init();
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [smoothX, smoothY]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default GalaxyVisual;
