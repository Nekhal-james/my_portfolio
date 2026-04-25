import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Flower, Flower2 } from 'lucide-react';

const FlowerBloom = () => {
  const flowers = useMemo(() => Array.from({ length: 45 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 25 + 15,
    delay: Math.random() * 5, // Wider distribution
    duration: Math.random() * 4 + 6,
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 40,
    Type: Math.random() > 0.5 ? Flower : Flower2
  })), []);

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none overflow-hidden">
      {flowers.map(({ id, x, y, size, delay, duration, rotation, drift, Type }) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0, rotate: rotation, x: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0, 1, 1, 0.7], 
            y: [-50, -150], // Drift up relative to start
            x: [0, drift], // Subtle lateral sway
            rotate: rotation + 90 
          }}
          transition={{ 
            duration, 
            delay, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{ 
            left: `${x}%`, 
            top: `${y}%`,
            position: 'absolute',
            willChange: 'transform, opacity'
          }}
        >
           <Type 
             className="text-purple-400/80 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" 
             style={{ width: size, height: size }} 
           />
        </motion.div>
      ))}
    </div>
  );
};

export default FlowerBloom;
