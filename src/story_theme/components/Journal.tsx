import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Journal() {
  const introRef = useRef(null);
  
  // Track scroll specifically for the cinematic intro sequence
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start end", "end start"]
  });

  // Fade IN (wait until 0.2 to let previous clear out), then fade OUT and blur early (by 0.8) so it's hidden before content arrives
  const introOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8], [0, 0, 1, 1, 0]);
  const introBlur = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8], [20, 20, 0, 0, 20]);
  const introScale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0.9, 0.9, 1, 1.1]);
  
  // Completely hide from DOM rendering after fade out or before fade in
  const display = useTransform(scrollYProgress, (p) => p < 0.05 || p > 0.8 ? "none" : "flex");

  const tools = [
    { title: "AI & ML", desc: "YOLOv8, OpenCV, Teachable Machine, Prompt Engineering." },
    { title: "Hardware & IoT", desc: "Raspberry Pi 5, ESP32, Arduino, Mini E-ATV Systems." },
    { title: "Languages", desc: "Python, Java, C, C++, RISC-V Assembly, TypeScript." },
    { title: "Web Dev", desc: "Next.js 15, React 19, Tailwind CSS." },
    { title: "Interests", desc: "Vibe Coding, AI Model Fine-tuning, System Optimization." }
  ];

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
        <h2 className="font-display font-black text-5xl md:text-8xl text-slate-900 tracking-widest uppercase">
          The Toolbox
        </h2>
      </motion.div>

      <section className="w-full max-w-4xl mx-auto py-20 mb-[30vh] z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          {tools.map((tool, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-10%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col border-b-2 border-slate-300 pb-4 relative group"
            >
              <h3 className="font-display font-bold text-2xl text-slate-800 mb-2">{tool.title}</h3>
              <p className="font-handwriting italic text-xl text-slate-500">{tool.desc}</p>
              
              {/* Theme Abstract marker */}
              <svg className="absolute -left-8 top-2 w-4 h-4 fill-orange-500 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 100">
                <path d="M10,50 Q25,10 50,10 T90,50 T50,90 T10,50 Z" />
              </svg>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
    </>
  );
}
