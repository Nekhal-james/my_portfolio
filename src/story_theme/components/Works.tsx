import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Works() {
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

  const projects = [
    {
      id: 1,
      title: "SpaceOrb Engine",
      tech: "YOLOv8, Linux, AES-256-GCM",
      description: "Autonomous Edge Intelligence Node. An autonomous data management system designed for computing nodes on resource-constrained hardware like Raspberry Pi 5. Features YOLOv8 vision inference within kernel-hardened Linux cgroup containers.",
    },
    {
      id: 2,
      title: "FarmGrid",
      tech: "TypeScript, Full-Stack",
      description: "Built a full-stack web application connecting local farmers with buyers. Features an integrated marketplace, premium logistics service, and a hub network for offline support.",
    },
    {
      id: 3,
      title: "AeroCast",
      tech: "TypeScript, NASA Data",
      description: "Developed a modern weather probability application that analyzes historical NASA data from 1985 to 2024. Utilized TypeScript to build predictive models for weather patterns for the subsequent 10 months.",
    },
    {
      id: 4,
      title: "Thalam",
      tech: "AI, Multi-dimensional intelligence",
      description: "Architected an AI-powered Cultural Intelligence Platform for mapping and analyzing fragmented cultural data. Developed a Cultural DNA Engine to transform intelligence into interactive datasets.",
    }
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
          The Works
        </h2>
      </motion.div>

      <section className="w-full relative py-20 flex flex-col gap-[20vh] mb-[30vh] z-10">

      {projects.map((project, index) => {
        // Alternate sides and rotations for asymmetry
        const alignRight = index % 2 !== 0;
        
        return (
          <div key={project.id} className={`flex w-full ${alignRight ? 'justify-end' : 'justify-start'}`}>
            <motion.div 
              initial={{ opacity: 0, y: 100, rotate: alignRight ? 5 : -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: alignRight ? -2 : 2 }}
              viewport={{ margin: "-10%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`relative group w-[90%] md:w-[70%] lg:w-[60%] ${alignRight ? 'lg:mr-16' : 'lg:ml-16'}`}
            >
              {/* Natural Tones Text Frame */}
              <div 
                className="p-4 bg-white shadow-[20px_20px_60px_rgba(0,0,0,0.05)] border-2 border-[#333] transition-transform duration-500 hover:scale-[1.02] transform rotate-1 hover:rotate-0"
                style={{
                  borderRadius: "255px 25px 225px 25px / 25px 225px 25px 255px",
                }}
              >
                <div 
                  className="w-full min-h-[40vh] p-8 md:p-14 flex flex-col justify-center relative bg-[#fdfbf7]"
                  style={{ borderRadius: "200px 20px 180px 15px / 15px 180px 15px 200px" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-200 to-indigo-300 opacity-[0.10] pointer-events-none rounded-[inherit]"></div>
                  
                  <div className="relative z-10 flex flex-col items-start">
                    <div className="text-xs uppercase tracking-widest font-bold mb-4 opacity-70 text-slate-900 border-b-2 border-orange-300 pb-1">
                      Project 0{project.id}
                    </div>
                    
                    <h3 className="font-display font-black text-4xl md:text-5xl text-slate-900 mb-4 tracking-tight leading-none">
                      {project.title}
                    </h3>
                    
                    <div className="flex flex-col mb-8">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tech Stack</span>
                      <span className="text-lg font-handwriting text-slate-700">{project.tech}</span>
                    </div>
                    
                    <p className="font-display text-lg md:text-xl text-slate-800 leading-[1.6]">
                      {project.description}
                    </p>
                  </div>

                  <svg className="absolute top-0 right-0 w-full h-full opacity-[0.15] pointer-events-none z-20" viewBox="0 0 400 500">
                    <path d="M10,10 Q100,50 300,10 T400,400" fill="none" stroke="#000" strokeWidth="1.5" strokeDasharray="5,5"/>
                  </svg>
                </div>
              </div>

              {/* Theme marginalia caption */}
              <div className={`absolute -bottom-6 ${alignRight ? '-left-8' : '-right-8'} hidden md:block z-30`}>
                <div className="absolute top-[-40px] left-[-20px] p-2 border border-dashed border-slate-400 rotate-[15deg]">
                  <div className="bg-white px-3 py-1 shadow-sm">
                     <span className="text-[10px] font-mono text-slate-400 uppercase">Case Study</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )
      })}
    </section>
    </>
  );
}
