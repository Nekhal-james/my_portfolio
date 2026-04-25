import { motion } from 'motion/react';
import { Activity, Cpu } from 'lucide-react';
import GlitchCard from '../UI/GlitchCard';

const SkillsContent = ({ isMaximized }: { isMaximized: boolean }) => {
  return (
    <div className={`flex flex-col gap-10 pt-4 transition-all duration-500 delay-100 ${isMaximized ? 'w-full max-w-6xl mx-auto' : ''}`}>
      {/* Top Level Telemetry */}
      <div className={`grid gap-4 transition-all duration-500 ${isMaximized ? 'grid-cols-1 md:grid-cols-3 gap-8' : 'grid-cols-1 md:grid-cols-3'}`}>
         <div className="p-4 border border-cobalt/20 bg-cobalt/5 mono flex flex-col justify-between">
            <div className="text-[10px] opacity-40">OVERALL_COMPETENCY</div>
            <div className="text-2xl font-bold flex items-end gap-1">
               94.2 <span className="text-[10px] text-rust mb-1">%</span>
            </div>
            <div className="h-1 bg-cobalt/10 w-full mt-2">
               <motion.div initial={{ width: 0 }} animate={{ width: '94.2%' }} className="h-full bg-cobalt" />
            </div>
         </div>
         <div className="p-4 border border-cobalt/20 bg-cobalt/5 mono flex flex-col justify-between">
            <div className="text-[10px] opacity-40">ACTIVE_RESOURCES</div>
            <div className="text-2xl font-bold flex items-end gap-1">
               11 <span className="text-[10px] text-rust mb-1">NODES</span>
            </div>
            <div className="text-[9px] text-cobalt/60 mt-2">All subsystems operational.</div>
         </div>
         <div className="p-4 border border-cobalt/20 bg-cobalt/5 mono flex flex-col justify-between relative overflow-hidden">
            <div className="text-[10px] opacity-40">SYNC_STATUS</div>
            <div className="text-sm font-bold text-green-500 animate-pulse">OPTIMIZED (L1_CACHE)</div>
            <div className="absolute right-[-10%] bottom-[-20%] scale-150 opacity-10">
               <Activity className="w-20 h-20" />
            </div>
         </div>
      </div>

      <div className={`grid gap-8 transition-all duration-500 ${isMaximized ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12' : 'grid-cols-1 lg:grid-cols-3'}`}>
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-rust/40 pb-2">
          <div className="w-1.5 h-4 bg-rust" />
          <h3 className="mono text-rust text-lg font-bold">PRO_STACK</h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[
            { n: 'Python', p: 95, color: 'bg-rust' },
            { n: 'TypeScript', p: 90, color: 'bg-cobalt' },
            { n: 'Java / C / C++', p: 85, color: 'bg-cobalt' },
            { n: 'React 19 / Next.js', p: 92, color: 'bg-cobalt' },
            { n: 'Tailwind CSS', p: 95, color: 'bg-cobalt' },
            { n: 'RISC-V ASM', p: 80, color: 'bg-rust' }
          ].map(s => (
            <GlitchCard key={s.n}>
              <div className="p-4 bg-white/5 border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">{s.n}</span>
                  <span className="mono text-[9px] opacity-60">{s.p}%</span>
                </div>
                <div className="flex gap-1 h-[3px]">
                   {Array.from({ length: 10 }).map((_, i) => (
                     <motion.div 
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: i < s.p / 10 ? 1 : 0.1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex-1 ${s.color}`}
                     />
                   ))}
                </div>
              </div>
            </GlitchCard>
          ))}
        </div>
      </div>

      <div className="space-y-6">
         <div className="flex items-center gap-2 border-b border-cobalt/40 pb-2">
           <div className="w-1.5 h-4 bg-cobalt" />
           <h3 className="mono text-cobalt text-lg font-bold">SYSTEM_INTEL</h3>
         </div>
         <div className="space-y-3">
           {[
             { n: 'YOLOv8 Vision', d: 'Edge-AI object detection pipelines' },
             { n: 'Opal & N8N', d: 'AI automation workflows & tools' },
             { n: 'Fine-Tuning', d: 'AI Model training & Generative AI' },
             { n: 'Raspberry Pi 5', d: 'Hardware nodes & system integration' },
             { n: 'ESP32 / Arduino', d: 'Hardware & IoT Architecture' }
           ].map(s => (
             <GlitchCard key={s.n}>
               <div className="p-4 bg-white/5 border border-white/5 group transition-all duration-300">
                  <div className="text-sm font-bold group-hover:text-cobalt transition-colors">{s.n}</div>
                  <div className="mono text-[10px] opacity-50 mt-1 leading-tight">{s.d}</div>
               </div>
             </GlitchCard>
           ))}
         </div>
      </div>

      <div className="space-y-6">
         <div className="flex items-center gap-2 border-b border-slate-500/40 pb-2">
           <div className="w-1.5 h-4 bg-slate-500" />
           <h3 className="mono text-slate-500 text-lg font-bold">INFRA_STACK</h3>
         </div>
         <div className="grid grid-cols-2 gap-3">
            {[
              { n: 'Mini E-ATV', i: <Cpu /> },
              { n: 'Linux Cgroups', i: <Cpu /> },
              { n: 'Git / Open Source', i: <Activity /> },
              { n: 'OpenCV / Teachable', i: <Activity /> },
              { n: 'Stitch / N8N', i: <Cpu /> },
              { n: 'Prompt Engineering', i: <Cpu /> }
            ].map((s, idx) => (
              <GlitchCard key={idx}>
                 <div className="p-3 flex flex-col items-center gap-2 text-center h-full bg-white/5 border border-white/5">
                    <div className="opacity-40 text-xs">{s.i}</div>
                    <div className="mono text-[9px] uppercase font-bold">{s.n}</div>
                 </div>
              </GlitchCard>
            ))}
         </div>

         <div className="mt-8 p-4 border border-rust/10 bg-rust/5 rounded relative overflow-hidden">
            <div className="mono text-[9px] text-rust mb-2 font-bold tracking-widest">ACTIVITIES_AND_INTERESTS</div>
            <div className="text-[11px] opacity-80 leading-relaxed font-mono italic z-10 relative">
               Vibe Coding, E-ATV Technology, System Optimization. Active participant: NASA Space Apps (2025), HashItUp 24H Hackathon, Mini E-ATV 2.0.
            </div>
            <div className="absolute top-0 right-0 p-1 opacity-5">
               <Cpu className="w-8 h-8" />
            </div>
         </div>
      </div>
    </div>
  </div>
  );
};

export default SkillsContent;
