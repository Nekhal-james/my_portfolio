import React from 'react';
import { motion } from 'motion/react';

const StoryBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#f7f3ed] opacity-10" />
      
      {/* Floating sketches */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.15]"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            rotate: Math.random() * 360
          }}
          animate={{ 
            y: ["-10%", "110%"],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 20 + Math.random() * 20, 
            repeat: Infinity, 
            ease: "linear",
            delay: -Math.random() * 20
          }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path 
              d="M10,50 Q30,10 50,50 T90,50" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default StoryBackground;
