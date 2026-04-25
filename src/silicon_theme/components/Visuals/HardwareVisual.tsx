import React, { useEffect, useRef } from 'react';

const HardwareVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    init();
    window.addEventListener('resize', init);

    // Brightened vertical data packets
    const packets: {x: number, y: number, speed: number, len: number, opacity: number}[] = [];
    for(let i=0; i<30; i++) {
      packets.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 1.5 + Math.random() * 3.5,
        len: 40 + Math.random() * 80,
        opacity: 0.3 + Math.random() * 0.5 // Brighter base opacity
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 1. Core Obsidian Glow
      const grad = ctx.createRadialGradient(canvas.width * 0.75, canvas.height * 0.5, 0, canvas.width * 0.75, canvas.height * 0.5, 800);
      grad.addColorStop(0, 'rgba(88, 166, 255, 0.08)'); // Brighter glow
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Data Stream Logic
      ctx.lineWidth = 1.5; // Slightly thicker
      packets.forEach(p => {
        p.y += p.speed;
        if (p.y > canvas.height) {
          p.y = -p.len;
          p.x = Math.random() * canvas.width;
        }
        
        const packetGrad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.len);
        packetGrad.addColorStop(0, 'transparent');
        packetGrad.addColorStop(0.5, `rgba(88, 166, 255, ${p.opacity})`);
        packetGrad.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = packetGrad;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.len);
        ctx.stroke();

        // Optional: Small point glow at the center of the packet
        ctx.fillStyle = `rgba(88, 166, 255, ${p.opacity * 0.8})`;
        ctx.fillRect(p.x - 0.5, p.y + p.len / 2, 1, 2);
      });

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', init);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-obsidian">
      <canvas ref={canvasRef} className="w-full h-full opacity-90" />
      {/* Structural Cyber-Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(88,166,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(88,166,255,0.06)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_75%_50%,#000_70%,transparent_100%)] opacity-80" />
    </div>
  );
};

export default HardwareVisual;
