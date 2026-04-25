import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "motion/react";

export default function WavyStringsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Track raw mouse position
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Ultra-smooth physics spring for the magnetic core
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.8 });

  // Global mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Generate string configs once
    const strings = Array.from({ length: 30 }).map(() => ({
      yBasePercent: Math.random() * 0.9 + 0.05, // 5% to 95% vertical space to fill the screen
      amplitude: Math.random() * 60 + 20, // Wave height
      frequency: Math.random() * 0.0025 + 0.0005, // Wave length
      speed: Math.random() * 0.4 + 0.1, // Much slower scroll speed
      phase: Math.random() * Math.PI * 2, // Start phase
      thickness: Math.random() * 3 + 1.5, // Stroke thickness
      opacity: Math.random() * 0.4 + 0.15, // Slightly lower opacity so they don't overpower
      blur: Math.random() > 0.6 ? Math.random() * 4 + 1 : 0 // Performance: fewer blurred strings
    }));

    // Generate Floating Particles
    const numParticles = 250;
    const particles = Array.from({ length: numParticles }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      // Particles drift leftward to match the flow of the strings (simulating air current)
      baseVx: -(Math.random() * 0.5 + 0.2),
      baseVy: (Math.random() - 0.5) * 0.3,
      vx: 0,
      vy: 0,
      size: Math.random() * 2.5 + 1,
      color: Math.random() > 0.4 ? "rgba(220, 38, 38, 0.4)" : "rgba(30, 41, 59, 0.3)" // Mix of red and slate dots
    }));

    // Initialize current velocity to base velocity
    particles.forEach(p => {
      p.vx = p.baseVx;
      p.vy = p.baseVy;
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = smoothX.get();
      const my = smoothY.get();

      // 1. Draw Static Wavy Strings (No Magnet)
      strings.forEach(str => {
        str.phase += str.speed * 0.01; // Move wave to the left

        ctx.beginPath();
        const step = 8; // Resolution of the string points

        for (let x = -50; x <= width + 50; x += step) {
          // Base mathematical Y position of the sine wave
          const baseY = (str.yBasePercent * height) + Math.sin(x * str.frequency + str.phase) * str.amplitude;

          // Draw using quadratic curves for ultra-smooth lines
          if (x === -50) {
            ctx.moveTo(x, baseY);
          } else {
            ctx.lineTo(x, baseY);
          }
        }

        ctx.strokeStyle = `rgba(220, 38, 38, ${str.opacity})`;
        ctx.lineWidth = str.thickness;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        if (str.blur > 0) {
          ctx.shadowBlur = str.blur * 2;
          ctx.shadowColor = `rgba(220, 38, 38, ${str.opacity})`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
      });

      // Clear shadow properties so they don't affect particles
      ctx.shadowBlur = 0;

      // 2. Draw and Update Interactive Particles
      particles.forEach(p => {
        // Apply movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap horizontally to create an infinite leftward breeze
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;

        // Bounce vertically to keep them on screen
        if (p.y < 0 || p.y > height) { p.vy *= -1; p.baseVy *= -1; }

        // React to Cursor (Only on Desktop)
        if (width >= 768) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const distSq = dx * dx + dy * dy;
          const repelRadius = 200;
          const radiusSq = repelRadius * repelRadius;

          if (distSq < radiusSq) {
            const dist = Math.max(Math.sqrt(distSq), 1);
            // Smooth falloff force
            const force = Math.pow((repelRadius - dist) / repelRadius, 2);

            // Accelerate particle away from cursor
            p.vx += (dx / dist) * force * 0.6;
            p.vy += (dy / dist) * force * 0.6;
          }
        }

        // Friction to return to base drift speed
        p.vx += (p.baseVx - p.vx) * 0.05;
        p.vy += (p.baseVy - p.vy) * 0.05;

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [smoothX, smoothY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none mix-blend-multiply"
    />
  );
}
