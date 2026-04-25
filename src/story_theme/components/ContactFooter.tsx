import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Github, Linkedin } from "lucide-react";

export default function ContactFooter() {
  const introRef = useRef(null);
  
  // Track scroll specifically for the cinematic intro sequence
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start end", "end start"]
  });

  // Fade IN and unblur when entering, then fade OUT and blur early (by 0.8) so it's hidden before content arrives
  const introOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 0.8], [0, 1, 1, 0]);
  const introBlur = useTransform(scrollYProgress, [0, 0.35, 0.65, 0.8], [20, 0, 0, 20]);
  const introScale = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.9, 1, 1.1]);
  
  // Completely hide from DOM rendering after fade out
  const display = useTransform(scrollYProgress, (p) => p > 0.8 ? "none" : "flex");

  return (
    <>
      {/* Cinematic Intro Spacer */}
      <div ref={introRef} className="h-[150vh] w-full" />

      {/* Fixed Cinematic Title */}
      <motion.div
        style={{
          opacity: introOpacity,
          scale: introScale,
          filter: useTransform(introBlur, (b) => `blur(${b}px)`),
          display: display
        }}
        className="fixed inset-0 z-0 flex flex-col items-center justify-center pointer-events-none"
      >
        <h2 className="font-display font-black text-4xl md:text-6xl text-slate-900 tracking-widest uppercase text-center">
          A Letter to the Artist
        </h2>
      </motion.div>

      <section className="relative w-full max-w-2xl mx-auto pb-[20vh] z-10">
        <motion.div
          initial={{ y: 200, opacity: 0, scale: 0.95, rotate: -2 }}
          whileInView={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ margin: "-5%" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white p-8 md:p-12 shadow-[20px_20px_60px_rgba(0,0,0,0.05)] border-2 border-[#333] flex flex-col items-center"
          style={{ borderRadius: "255px 25px 225px 25px / 25px 225px 25px 255px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="text-center"
          >
            <p className="font-handwriting italic text-xl text-slate-600 mb-4">
              I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <p className="font-handwriting italic text-xl text-slate-600 mb-10">
              Find my traces across the web.
            </p>
          </motion.div>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <a 
            href="https://github.com/Nekhal-james" 
            target="_blank" 
            rel="noreferrer"
            className="group flex items-center justify-center gap-4 w-full sm:w-1/2 p-5 bg-slate-50 border-2 border-[#333] transition-all hover:bg-slate-900 hover:text-white transform hover:-translate-y-1 hover:rotate-2 shadow-[8px_8px_0px_rgba(0,0,0,0.1)]"
            style={{ borderRadius: "20px 5px 15px 5px / 5px 15px 5px 20px" }}
          >
            <Github size={28} className="text-slate-800 group-hover:text-white transition-colors" />
            <span className="font-display font-bold text-xl tracking-wide">GitHub</span>
          </a>

          <a 
            href="https://www.linkedin.com/in/nekhal-james/" 
            target="_blank" 
            rel="noreferrer"
            className="group flex items-center justify-center gap-4 w-full sm:w-1/2 p-5 bg-slate-50 border-2 border-[#333] transition-all hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transform hover:-translate-y-1 hover:-rotate-2 shadow-[8px_8px_0px_rgba(0,0,0,0.1)]"
            style={{ borderRadius: "5px 20px 5px 15px / 15px 5px 20px 5px" }}
          >
            <Linkedin size={28} className="text-slate-800 group-hover:text-white transition-colors" />
            <span className="font-display font-bold text-xl tracking-wide">LinkedIn</span>
          </a>
        </div>
      </motion.div>
    </section>
    </>
  );
}
