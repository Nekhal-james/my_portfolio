import React from 'react';
import { motion } from 'motion/react';

const SiliconBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0A0A0B]" />
      
      {/* Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(88,166,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(88,166,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Scanning line */}
      <motion.div 
        className="absolute left-0 right-0 h-[2px] bg-cobalt/20 shadow-[0_0_15px_rgba(88,166,255,0.3)]"
        animate={{ y: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Random bit pulses */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cobalt/40 rounded-full"
          style={{
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

export default SiliconBackground;
