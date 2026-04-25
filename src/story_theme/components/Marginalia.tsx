import { motion, MotionValue, useTransform } from "motion/react";

interface MarginaliaProps {
  scrollYProgress: MotionValue<number>;
}

export default function Marginalia({ scrollYProgress }: MarginaliaProps) {
  // Map overall scroll progress to pathLengths of various drawings
  const path1 = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const path2 = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const path3 = useTransform(scrollYProgress, [0.65, 0.9], [0, 1]);
  
  // Hide completely when at the very top (Hero section)
  const globalOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
      style={{ opacity: globalOpacity }}
    >
      
      {/* 1. Abstract Flower Top Right */}
      <div className="fixed top-[20%] right-[5%] w-32 h-32 opacity-70">
        <svg viewBox="0 0 100 100" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "url(#roughEdge)" }}>
          <motion.path 
            d="M50 90 L50 30 M50 30 C 20 40, 20 10, 50 20 C 80 10, 80 40, 50 30"
            style={{ pathLength: path1 }}
          />
          <motion.path 
            d="M50 60 C 30 70, 20 50, 50 50 M50 70 C 70 80, 80 60, 50 60"
            style={{ pathLength: path1 }}
          />
        </svg>
      </div>

      {/* 2. Scribble character Mid Left - Hidden on mobile to prevent overlap with footer buttons */}
      <div className="fixed top-[50%] left-[5%] w-48 h-48 opacity-70 hidden md:block">
        <svg viewBox="0 0 100 100" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "url(#roughEdge)" }}>
          {/* Head & Body */}
          <motion.path 
            d="M20 30 Q30 10 60 20 T70 50 Q60 80 30 70 T20 30 Z"
            style={{ pathLength: path2 }}
          />
          {/* Eyes */}
          <motion.circle cx="35" cy="40" r="2" fill="#1e293b" style={{ opacity: path2 }} />
          <motion.circle cx="55" cy="45" r="2" fill="#1e293b" style={{ opacity: path2 }} />
          {/* Smile */}
          <motion.path 
            d="M35 55 Q 45 65 55 55"
            style={{ pathLength: path2 }}
          />
        </svg>
        <motion.p 
          className="font-handwriting text-slate-500 text-sm absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap"
          style={{ opacity: path2 }}
        >
          Just a little guy
        </motion.p>
      </div>

      {/* 3. Squiggly Arrow Bottom Right */}
      <div className="fixed top-[80%] right-[10%] w-24 h-24 opacity-70">
        <svg viewBox="0 0 100 100" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "url(#roughEdge)" }}>
          <motion.path 
            d="M50 10 Q 60 30 40 50 T 60 70 Q 50 80 50 90 M30 70 L50 90 L70 70"
            style={{ pathLength: path3 }}
          />
        </svg>
        <motion.p 
          className="font-handwriting text-slate-500 text-sm absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rotate-12"
          style={{ opacity: path3 }}
        >
          keep moving
        </motion.p>
      </div>
    </motion.div>
  );
}
