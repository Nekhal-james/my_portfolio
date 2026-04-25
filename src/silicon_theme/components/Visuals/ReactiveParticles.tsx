import React, { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'motion/react';

const ReactiveParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  // Smooth mouse tracking for the repulsion effect
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 });

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

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      density: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 1.5;
        this.density = (Math.random() * 30) + 1;
        this.color = Math.random() > 0.85 ? 'rgba(183, 65, 14, 0.4)' : 'rgba(88, 166, 255, 0.4)';
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }

      update(mx: number, my: number) {
        const dx = mx - this.x;
        const dy = my - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        
        const maxDistance = 250; 
        const force = (maxDistance - distance) / maxDistance;
        
        if (distance < maxDistance) {
          this.x -= forceDirectionX * force * this.density;
          this.y -= forceDirectionY * force * this.density;
          this.color = this.color.includes('183') ? 'rgba(183, 65, 14, 1.0)' : 'rgba(88, 166, 255, 1.0)';
        } else {
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx / 15;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy / 15;
          }
          this.color = this.color.includes('183') ? 'rgba(183, 65, 14, 0.4)' : 'rgba(88, 166, 255, 0.4)';
        }
      }
    }

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;

      particles.length = 0;
      
      // Even grid distribution
      const spacing = 40; // Adjust for density
      const rows = Math.floor(height / spacing);
      const cols = Math.floor(width / spacing);
      const offsetX = (width - (cols * spacing)) / 2;
      const offsetY = (height - (rows * spacing)) / 2;

      for (let y = 0; y <= rows; y++) {
        for (let x = 0; x <= cols; x++) {
          const px = offsetX + x * spacing;
          const py = offsetY + y * spacing;
          particles.push(new Particle(px, py));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const mx = smoothX.get();
      const my = smoothY.get();
      const rect = canvas.getBoundingClientRect();
      
      // Relative mouse coordinates
      const relX = mx - rect.left;
      const relY = my - rect.top;

      particles.forEach(p => {
        p.update(relX, relY);
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [smoothX, smoothY]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
};

export default ReactiveParticles;
