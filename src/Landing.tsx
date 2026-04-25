import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Terminal, BookOpen, ArrowRight, Sparkles, Cpu } from 'lucide-react';
import GrainOverlay from './landing/components/GrainOverlay';
import StoryBackground from './landing/components/StoryBackground';
import SiliconBackground from './landing/components/SiliconBackground';

interface LandingProps {
  onSelectTheme: (theme: 'story' | 'silicon') => void;
}

export default function Landing({ onSelectTheme }: LandingProps) {
  const [selectedTheme, setSelectedTheme] = useState<'story' | 'silicon' | null>(null);
  const [hoveredSide, setHoveredSide] = useState<'story' | 'silicon' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Mouse tracking for the split divider
  const mouseX = useMotionValue(0.5); // 0 to 1
  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (selectedTheme) return;
      const x = e.clientX / window.innerWidth;
      mouseX.set(x);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [selectedTheme, mouseX]);

  const handleSelect = (theme: 'story' | 'silicon') => {
    if (selectedTheme) return;
    setSelectedTheme(theme);
    setIsTransitioning(true);
    setTimeout(() => {
      onSelectTheme(theme);
    }, 1500); // Slightly longer for more dramatic takeover
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Use MotionValues for smooth, re-render-free hover animations
  // We use a more subtle range (40% to 60%) to prevent the "trying to fill" feeling during hover
  const storyWidth = useTransform(smoothMouseX, (val) => {
    if (selectedTheme === 'story') return "100%";
    if (selectedTheme === 'silicon') return "0%";
    const base = 0.5 + (0.5 - val) * 0.3; // Range: 0.35 to 0.65
    return `${base * 100}%`;
  });

  const siliconWidth = useTransform(smoothMouseX, (val) => {
    if (selectedTheme === 'silicon') return "100%";
    if (selectedTheme === 'story') return "0%";
    const base = 0.5 + (val - 0.5) * 0.3; // Range: 0.35 to 0.65
    return `${base * 100}%`;
  });

  return (
    <div className="w-full h-screen overflow-hidden bg-[#0A0A0B] text-white relative font-sans select-none cursor-default">
      <GrainOverlay />
      
      {/* Top Navigation / Title */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-8 left-0 w-full text-center z-[60] pointer-events-none"
      >
        <div className="inline-block px-6 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
          <h1 className="text-[10px] md:text-xs font-bold tracking-[0.5em] text-white/60 uppercase">
            {selectedTheme ? `INITIALIZING_${selectedTheme.toUpperCase()}_PROTOCOL` : "Choose Your Narrative Path"}
          </h1>
        </div>
      </motion.div>

      {/* Main Split Container */}
      <div className="relative w-full h-full flex flex-col md:flex-row overflow-hidden">
        
        {/* STORY SIDE */}
        <motion.div 
          onMouseEnter={() => setHoveredSide('story')}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={() => handleSelect('story')}
          style={isMobile ? {
            height: selectedTheme === 'silicon' ? "0%" : (selectedTheme === 'story' ? "100%" : "50%"),
            width: "100%"
          } : { 
            width: storyWidth,
            height: "100%"
          }}
          className={`relative overflow-hidden flex flex-col items-center justify-center group cursor-pointer transition-opacity duration-1000 ${
            selectedTheme === 'silicon' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <StoryBackground />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f3ed]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <motion.div 
            className="relative z-10 flex flex-col items-center gap-8 px-12 text-center"
            animate={{ 
              scale: hoveredSide === 'story' ? 1.05 : 1,
              opacity: hoveredSide === 'silicon' ? 0.4 : 1
            }}
          >
            <div className="relative">
               <motion.div 
                 animate={{ rotate: [0, 5, -5, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                 className="w-20 h-20 md:w-32 md:h-32 rounded-3xl border-2 border-[#f7f3ed]/30 flex items-center justify-center bg-[#f7f3ed]/5 backdrop-blur-sm shadow-[0_0_40px_rgba(247,243,237,0.1)] group-hover:border-[#f7f3ed]/60 group-hover:bg-[#f7f3ed]/10 transition-all duration-700"
               >
                 <BookOpen className="w-10 h-10 md:w-16 md:h-16 text-[#f7f3ed]/80 group-hover:text-[#f7f3ed] transition-colors duration-700" />
               </motion.div>
               <Sparkles className="absolute -top-4 -right-4 w-6 h-6 text-[#f7f3ed]/40 animate-pulse" />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-display font-light text-[#f7f3ed] tracking-tight leading-none">
                Narrative <br /> Sketchbook
              </h2>
              <p className="text-xs md:text-sm text-[#f7f3ed]/50 font-medium tracking-[0.2em] uppercase max-w-[280px] mx-auto leading-relaxed">
                Cinematic // Hand-Drawn // Organic // Analog
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* SILICON SIDE */}
        <motion.div 
          onMouseEnter={() => setHoveredSide('silicon')}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={() => handleSelect('silicon')}
          style={isMobile ? {
            height: selectedTheme === 'story' ? "0%" : (selectedTheme === 'silicon' ? "100%" : "50%"),
            width: "100%"
          } : { 
            width: siliconWidth,
            height: "100%"
          }}
          className={`relative overflow-hidden flex flex-col items-center justify-center group cursor-pointer transition-opacity duration-1000 ${
            selectedTheme === 'story' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <SiliconBackground />
          <div className="absolute inset-0 bg-gradient-to-l from-cobalt/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <motion.div 
            className="relative z-10 flex flex-col items-center gap-8 px-12 text-center"
            animate={{ 
              scale: hoveredSide === 'silicon' ? 1.05 : 1,
              opacity: hoveredSide === 'story' ? 0.4 : 1
            }}
          >
            <div className="relative">
              <motion.div 
                animate={{ 
                  boxShadow: hoveredSide === 'silicon' ? ["0 0 20px rgba(88,166,255,0.2)", "0 0 40px rgba(88,166,255,0.4)", "0 0 20px rgba(88,166,255,0.2)"] : "0 0 0px transparent"
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 md:w-32 md:h-32 rounded-none border-2 border-cobalt/30 flex items-center justify-center bg-cobalt/5 backdrop-blur-sm group-hover:border-cobalt group-hover:bg-cobalt/10 transition-all duration-700 overflow-hidden"
              >
                <Terminal className="w-10 h-10 md:w-16 md:h-16 text-cobalt/80 group-hover:text-cobalt transition-colors duration-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cobalt/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </motion.div>
              <Cpu className="absolute -bottom-4 -left-4 w-6 h-6 text-cobalt/40 animate-pulse" />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-mono font-bold text-cobalt tracking-tighter leading-none uppercase">
                Silicon <br /> OS_v1.0
              </h2>
              <p className="text-xs md:text-sm text-cobalt/50 font-mono tracking-[0.2em] uppercase max-w-[280px] mx-auto leading-relaxed">
                Technical // Digital // High-Precision // Logic
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider Line */}
        {!selectedTheme && !isMobile && (
          <motion.div 
            style={{ left: storyWidth }}
            className="absolute top-0 bottom-0 w-[1px] bg-white/20 z-50 pointer-events-none hidden md:block"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-black backdrop-blur-md flex items-center justify-center text-[10px] font-bold tracking-widest text-white/40">
               VS
             </div>
          </motion.div>
        )}
        {!selectedTheme && isMobile && (
          <div className="absolute left-0 right-0 h-[1px] bg-white/20 z-50 pointer-events-none md:hidden top-1/2" />
        )}

        {/* Silicon Theme Loading Bar */}
        <AnimatePresence>
          {selectedTheme === 'silicon' && (
             <motion.div 
               initial={{ opacity: 0, scaleX: 0 }}
               animate={{ opacity: 1, scaleX: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="absolute bottom-0 left-0 w-full h-1 bg-cobalt shadow-[0_0_15px_#58a6ff] z-[100] origin-left"
             />
          )}
        </AnimatePresence>
      </div>

      {/* Action Bar */}
      <AnimatePresence>
        {!selectedTheme && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-12 left-0 w-full flex justify-center z-[60] pointer-events-none"
          >
            <div className="mono text-[10px] text-white/30 tracking-[0.3em] uppercase">
               Hover to explore // Click to initialize
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
