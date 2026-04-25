import React from 'react';
import { motion } from 'motion/react';

const GlitchText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        animate={{
          x: [-1, 1, -0.5, 0, 0.5, -1],
          y: [0.5, -0.5, 0, 0.5, -0.5, 0],
          opacity: [1, 0.9, 1, 0.95, 1],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
      <motion.div
        animate={{
          x: [1.5, -1.5, 0.5, 0, -0.5, 1.5],
          opacity: [0, 0.7, 0, 0.5, 0],
          scaleY: [1, 1.1, 1],
        }}
        transition={{
          duration: 0.08,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0 text-[#ff0000] z-0 translate-x-[2px] opacity-70 mix-blend-screen"
      >
        {children}
      </motion.div>
      <motion.div
        animate={{
          x: [-1.5, 1.5, -0.5, 0, 0.5, -1.5],
          opacity: [0, 0.7, 0, 0.5, 0],
          scaleY: [1, 0.9, 1],
        }}
        transition={{
          duration: 0.12,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0 text-[#00ffff] z-0 -translate-x-[2px] opacity-70 mix-blend-screen"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default GlitchText;
