import { useMemo } from 'react';
import { motion } from 'motion/react';

const MatrixRain = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  const columns = useMemo(() => {
    const count = isMobile ? 15 : 40; // Fewer columns on mobile
    const charLimit = isMobile ? 8 : 15; // Shorter strings on mobile
    
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 5, // Slower (5-8s)
      chars: Array.from({ length: charLimit }).map(() => 
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&"[Math.floor(Math.random() * 40)]
      )
    }));
  }, [isMobile]);

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none overflow-hidden bg-black/40">
      {columns.map(({ id, x, delay, duration, chars }) => (
        <motion.div
          key={id}
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: 1200, opacity: [0, 0.3, 0.3, 0] }}
          transition={{ 
            duration, 
            delay, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute font-mono text-green-500 text-sm md:text-lg flex flex-col items-center leading-none"
          style={{ 
            left: `${x}%`,
            willChange: 'transform'
          }}
        >
          {chars.map((char, j) => (
            <span 
              key={j}
              className={`${j === 0 ? 'text-white' : 'text-green-500/60'} ${j > 0 && j % 3 === 0 ? 'animate-pulse' : ''}`}
            >
              {char}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default MatrixRain;
