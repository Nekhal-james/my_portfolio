import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ThemeContext } from '../../context/ThemeContext';

const GlitchCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const { theme } = React.useContext(ThemeContext);
  const [isHovering, setIsHovering] = useState(false);
  const isGlitching = theme === 'critical' && isHovering;

  return (
    <motion.div
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div 
        className="relative z-10 h-full"
        animate={isGlitching ? { 
          opacity: [1, 0.7, 1, 0.8, 1],
        } : {}}
        transition={{ duration: 0.3, repeat: 2 }}
      >
        {children}
      </motion.div>
      
      {isGlitching && (
        <>
          <div className="absolute inset-0 z-20 pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-[1px] bg-red-500/50"
                style={{ top: `${Math.random() * 100}%` }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 0.15, repeat: 2 }}
              />
            ))}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i+3}
                className="absolute w-full h-[1px] bg-blue-500/50"
                style={{ top: `${Math.random() * 100}%` }}
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 0.2, repeat: 2 }}
              />
            ))}
          </div>

          <motion.div 
            className="absolute inset-0 z-0 text-[#ff0000] opacity-40 pointer-events-none"
            animate={{ 
              opacity: [0, 0.6, 0.2, 0.6, 0],
              x: [-3, 3, -2, 2, 0],
              y: [1, -1, 0.5, -0.5, 0]
            }}
            transition={{ repeat: 2, duration: 0.3 }}
          >
            {children}
          </motion.div>
          <motion.div 
            className="absolute inset-0 z-0 text-[#0000ff] opacity-40 pointer-events-none"
            animate={{ 
              opacity: [0, 0.6, 0.3, 0.6, 0],
              x: [3, -3, 2, -2, 0],
              y: [-1, 1, -0.5, 0.5, 0]
            }}
            transition={{ repeat: 2, duration: 0.3 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default GlitchCard;
