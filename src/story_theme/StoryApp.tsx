import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Works from "./components/Works";
import Journal from "./components/Journal";
import ContactFooter from "./components/ContactFooter";
import Marginalia from "./components/Marginalia";
import WavyStringsBackground from "./components/WavyStringsBackground";

export default function App() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const [showIntro, setShowIntro] = useState(true);

  // Hide Intro splash screen after a set time
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative selection:bg-amber-200 bg-[#fdfaf5]">
      <AnimatePresence>
        {showIntro && <Intro />}
      </AnimatePresence>

      <WavyStringsBackground />

      {/* Rough/Sketchy Edge SVG Filter globally available */}
      <svg className="hidden pointer-events-none absolute w-0 h-0">
        <filter id="roughEdge" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Main Content Flow - only mounts after Intro */}
      {!showIntro && (
        <main className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10 w-full flex flex-col items-center">
          {/* Floating Sketches in the margin */}
          <Marginalia scrollYProgress={scrollYProgress} />

          <Hero />
          <Works />
          <Journal />
          <ContactFooter />
        </main>
      )}
    </div>
  );
}
