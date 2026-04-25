import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeContext } from '../../context/ThemeContext';

const Hero = () => {
  const { theme } = React.useContext(ThemeContext);
  const [text, setText] = useState('Nekhal James');
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const titles = ['Nekhal James', 'AI STUDENT', 'DEVELOPER', 'IoT ENTHUSIAST'];
    let index = 0;
    
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        index = (index + 1) % titles.length;
        setText(titles[index]);
        setTimeout(() => setIsGlitching(false), 300);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const glitchLayers = [
    { color: 'text-[#ff0000]', x: -8, y: -2, opacity: 0.8 },
    { color: 'text-[#0000ff]', x: 8, y: 2, opacity: 0.8 },
    { color: 'text-cobalt', x: -4, y: 0, opacity: 0.4 },
    { color: 'text-rust', x: 4, y: 0, opacity: 0.4 },
  ];

  return (
    <div className="relative group max-w-4xl">
      <div className="mono text-rust mb-4 flex items-center gap-3">
        <span>[AI_STUDENT // DEVELOPER // IOT_ENTHUSIAST]</span>
        {isGlitching && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0, 1] }}
            className="text-red-500 font-bold text-[10px] animate-pulse"
          >
            ! SIGNAL_INTERFERENCE_DETECTED
          </motion.span>
        )}
      </div>
      
      <div className="relative overflow-visible">
        <motion.h1
          className="massive-title uppercase select-none mb-4 relative"
          animate={isGlitching ? { 
            x: [0, -15, 10, -5, 5, -10, 0],
            y: [0, 2, -2, 1, -1, 0],
            skew: [0, 5, -5, 2, -2, 0],
            filter: ["blur(0px)", "blur(8px)", "blur(2px)", "blur(0px)"],
            opacity: [1, 0.5, 0.8, 0.3, 1]
          } : {}}
          transition={{ duration: 0.3 }}
        >
          {/* Blur Lines / Scanline Effect during glitch */}
          {isGlitching && (
             <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
                    style={{ top: `${Math.random() * 100}%` }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 0.1, repeat: 2 }}
                  />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i+5}
                    className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-blue-600 to-transparent"
                    style={{ top: `${Math.random() * 100}%` }}
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ duration: 0.15, repeat: 2 }}
                  />
                ))}
             </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="relative"
            >
              {/* Main Text Layer */}
              <div className="relative z-20">
                {text.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {word} {i === 0 && <br />}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Aggressive Glitch Layers */}
              {isGlitching && glitchLayers.map((layer, idx) => (
                <motion.div 
                  key={idx}
                  className={`absolute inset-0 z-10 ${layer.color} pointer-events-none`}
                  animate={{ 
                    x: [layer.x, layer.x * -1.5, layer.x * 0.5, layer.x],
                    y: [layer.y, layer.y * -2, layer.y],
                    opacity: [layer.opacity, 0.2, layer.opacity]
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {text.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word} {i === 0 && <br />}
                    </React.Fragment>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.h1>
      </div>

      <div className="flex gap-6 mt-8">
        <div className="flex flex-col">
          <span className="mono text-[10px] text-slate-500">QUALIFICATION</span>
          <span className="text-sm font-bold">B.TECH CS (AI)</span>
        </div>
        <div className="w-px h-8 bg-cobalt/20" />
        <div className="flex flex-col">
          <span className="mono text-[10px] text-slate-500">SPECIALIZATION</span>
          <span className="text-sm font-bold">AI BASED IOT</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
