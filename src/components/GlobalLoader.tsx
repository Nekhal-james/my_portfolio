import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const GlobalLoader = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; speed: number; size: number; opacity: number; drift: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height + canvas.height,
          speed: 2 + Math.random() * 4,
          size: 0.5 + Math.random() * 2,
          opacity: 0.1 + Math.random() * 0.8,
          drift: Math.random() * 1 - 0.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      particles.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.globalAlpha = p.opacity;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'white';
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    const timer = setTimeout(onComplete, 2500);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.15,
        filter: 'blur(30px) brightness(1.5)',
        transition: { duration: 0.8, ease: 'easeInOut' } 
      }}
      className="fixed inset-0 z-[100000] bg-[#050506] flex flex-col items-center justify-center p-8 overflow-hidden"
    >
      {/* High-Performance Rising Particles (Canvas) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      <div className="max-w-4xl w-full flex flex-col items-center text-center relative z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(15px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
           <p className="text-white text-3xl md:text-5xl font-light tracking-tight leading-[1.3] italic max-w-3xl mx-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
             "Software is the modern ink; the algorithm is the new grammar. <br className="hidden md:block" /> 
             We aren't just writing books anymore; <br className="hidden md:block" /> 
             we are coding realities."
           </p>
        </motion.div>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />
    </motion.div>
  );
};

export default GlobalLoader;
