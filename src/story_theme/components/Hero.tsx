import { motion, useScroll, useTransform } from "motion/react";

export default function Hero() {
  // Use global scroll for the dramatic fixed exit
  const { scrollYProgress } = useScroll();

  // Dramatic fade out and blur as user scrolls down (first 20% of the page)
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scrollBlur = useTransform(scrollYProgress, [0, 0.15], [0, 20]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  
  // Completely hide from DOM rendering after fade out
  const display = useTransform(scrollYProgress, (p) => p > 0.15 ? "none" : "flex");

  return (
    <>
      {/* Invisible spacer to push "The Works" down so Hero is visible initially */}
      <div className="h-screen w-full pointer-events-none" />

      {/* Fixed Hero Content that fades in place */}
      <motion.div
        style={{ 
          opacity: scrollOpacity, 
          scale: scrollScale,
          filter: useTransform(scrollBlur, (b) => `blur(${b}px)`),
          display: display
        }}
        className="fixed inset-0 z-0 flex flex-col items-center justify-center px-4 w-full text-center pointer-events-none"
      >
        <span className="font-handwriting text-2xl md:text-4xl text-slate-500 mb-2 md:mb-4">
          Hello, I'm
        </span>
        
        <h1 className="font-display text-7xl sm:text-8xl md:text-[10rem] text-slate-900 leading-[0.8] mt-4">
          Nekhal <br/> James.
        </h1>
        
        <p className="mt-8 font-sans text-lg md:text-xl text-slate-700 max-w-xl mx-auto leading-relaxed opacity-90">
          Computer Science (AI) student specializing in AI-based IoT and Edge Intelligence.
        </p>
      </motion.div>
    </>
  );
}
