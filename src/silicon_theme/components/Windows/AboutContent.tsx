import React from 'react';
import { Github, Activity, Cpu, Box, Terminal as TerminalIcon } from 'lucide-react';
import GlitchCard from '../UI/GlitchCard';

const AboutContent = ({ isMaximized, onOpenSkills, onOpenProjects, onOpenContact }: { isMaximized: boolean, onOpenSkills: () => void, onOpenProjects: () => void, onOpenContact: () => void }) => {
  return (
    <div className={`mx-auto transition-all duration-500 delay-100 ${isMaximized ? 'w-full max-w-4xl space-y-12' : 'max-w-2xl space-y-8'}`}>
      <div className={`flex flex-col md:flex-row items-start transition-all duration-500 ${isMaximized ? 'gap-12 md:items-center' : 'gap-8'}`}>
        <div className={`shrink-0 transition-all duration-500 border-2 border-cobalt/20 bg-cobalt/5 flex items-center justify-center ${isMaximized ? 'w-48 h-48' : 'w-32 h-32'}`}>
           <Github className={`transition-all duration-500 opacity-20 ${isMaximized ? 'w-24 h-24' : 'w-16 h-16'}`} />
        </div>
        <div className={`space-y-4 transition-all duration-500 ${isMaximized ? 'flex-grow' : ''}`}>
          <h2 className={`font-extrabold transition-all duration-500 uppercase tracking-tighter text-white ${isMaximized ? 'text-6xl' : 'text-4xl'}`}>Nekhal James</h2>
          <p className={`mono text-rust transition-all duration-500 ${isMaximized ? 'text-base' : 'text-sm'}`}>AI Student | Developer | IoT Enthusiast</p>
          <p className={`text-slate-400 font-mono leading-relaxed transition-all duration-500 ${isMaximized ? 'text-base' : 'text-sm'}`}>
            B.Tech Computer Science (AI) student at SJCET with a deep focus on AI-based IoT and Edge Intelligence. 
            Specialized in bridging the gap between low-level hardware architecture (Raspberry Pi, ESP32) and high-level AI systems (YOLOv8, Vision Inference). 
            Proven ability to develop autonomous nodes and integrate AI models onto resource-constrained hardware.
          </p>
          <div className={`flex flex-wrap transition-all duration-500 text-cobalt mono opacity-80 ${isMaximized ? 'gap-6 text-xs mt-6' : 'gap-4 text-[10px] mt-4'}`}>
             <span>🔗 nekhal.vercel.app</span>
             <span>✉️ nekhaljames@gmail.com</span>
             <span>📱 +91 80891 06376</span>
          </div>
        </div>
      </div>
      <div className={`grid gap-4 transition-all duration-500 ${isMaximized ? 'grid-cols-2 gap-8' : 'grid-cols-2'}`}>
        <GlitchCard>
          <div className={`bg-white/5 border border-white/5 h-full transition-all duration-500 ${isMaximized ? 'p-6' : 'p-4'}`}>
             <span className={`mono text-slate-500 transition-all duration-500 ${isMaximized ? 'text-xs' : 'text-[10px]'}`}>RESIDENCE</span>
             <div className={`transition-all duration-500 ${isMaximized ? 'text-lg mt-2' : 'text-sm'}`}>Kattappana, Idukki, Kerala 685508</div>
          </div>
        </GlitchCard>
        <GlitchCard>
          <div className={`bg-white/5 border border-white/5 h-full transition-all duration-500 ${isMaximized ? 'p-6' : 'p-4'}`}>
             <span className={`mono text-slate-500 transition-all duration-500 ${isMaximized ? 'text-xs' : 'text-[10px]'}`}>EDUCATION</span>
             <div className={`transition-all duration-500 ${isMaximized ? 'text-lg mt-2' : 'text-sm'}`}>B.Tech CSE (AI) - SJCET <br/><span className={`text-slate-400 ${isMaximized ? 'text-sm' : 'text-xs'}`}>SGHSS Kattappana (+2)</span></div>
          </div>
        </GlitchCard>
      </div>

      <div className={`flex flex-wrap pt-4 border-t border-white/10 justify-center transition-all duration-500 ${isMaximized ? 'gap-8 pt-8' : 'gap-4'}`}>
        <button onClick={onOpenSkills} className="flex-1 min-w-[140px] px-4 py-3 bg-cobalt/10 border border-cobalt/40 hover:bg-cobalt/20 hover:border-cobalt transition-all font-mono text-xs uppercase text-cobalt flex items-center justify-center gap-2 group">
          <Cpu className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Skills Database</span>
        </button>
        <button onClick={onOpenProjects} className="flex-1 min-w-[140px] px-4 py-3 bg-rust/10 border border-rust/40 hover:bg-rust/20 hover:border-rust transition-all font-mono text-xs uppercase text-rust flex items-center justify-center gap-2 group">
          <Box className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Mission Records</span>
        </button>
        <button onClick={onOpenContact} className="flex-1 min-w-[140px] px-4 py-3 bg-green-500/10 border border-green-500/40 hover:bg-green-500/20 hover:border-green-500 transition-all font-mono text-xs uppercase text-green-400 flex items-center justify-center gap-2 group">
          <TerminalIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Reach Out</span>
        </button>
      </div>
    </div>
  );
};

export default AboutContent;
