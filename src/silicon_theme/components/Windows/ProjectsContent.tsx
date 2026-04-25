import { Box } from 'lucide-react';
import GlitchCard from '../UI/GlitchCard';

const ProjectsContent = ({ isMaximized, onOpenGithub }: { isMaximized: boolean, onOpenGithub: () => void }) => {
  return (
    <div className={`flex flex-col gap-8 pt-4 transition-all duration-500 delay-100 ${isMaximized ? 'w-full max-w-7xl mx-auto' : ''}`}>
      <div className={`grid transition-all duration-500 ${isMaximized ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10' : 'grid-cols-1 md:grid-cols-2 gap-6'}`}>
         {[
           { 
             t: 'SpaceOrb Engine', 
             d: 'Autonomous Edge Intelligence Node. Integrated YOLOv8 inference within kernel-hardened Linux cgroups. Real-time AES-256-GCM encryption for telemetry.',
             tags: ['RASPBERRY_PI_5', 'YOLOv8', 'LINUX'],
             id: 'MISSION_SO_01',
             color: 'border-cobalt'
           },
           { 
             t: 'Thalam AI', 
             d: 'Architected an AI-powered Cultural Intelligence Platform. Built a "Cultural DNA Engine" for multi-dimensional interactive datasets.',
             tags: ['AI_ARCH', 'PYTHON', 'DATA_VIS'],
             id: 'MISSION_TH_01',
             color: 'border-rust'
           },
           { 
             t: 'FarmGrid', 
             d: 'Full-stack marketplace connecting local agricultural farmers with buyers. Premium logistics and offline hub support.',
             tags: ['TYPESCRIPT', 'REACT', 'NEXTJS'],
             id: 'MISSION_FG_88',
             color: 'border-slate-500'
           },
           { 
             t: 'AeroCast', 
             d: 'Modern weather predictive models using historical NASA data. TS-based 10-month probability analyzer.',
             tags: ['TYPESCRIPT', 'NASA_API', 'DATA_MODELS'],
             id: 'MISSION_AC_22',
             color: 'border-cobalt'
           },
           { 
             t: 'CampusConnect', 
             d: 'Engineered Java desktop application to manage college events across students, organizers, and administration.',
             tags: ['JAVA', 'DESKTOP', 'UI'],
             id: 'MISSION_CC_05',
             color: 'border-rust'
           },
           { 
             t: 'Leave Letter Gen', 
             d: 'Python CLI-based AI-powered duty leave generator for efficient administrative processing.',
             tags: ['PYTHON', 'CLI', 'GEN_AI'],
             id: 'MISSION_LL_09',
             color: 'border-cobalt'
           }
         ].map((p) => (
           <GlitchCard key={p.t}>
              <div className={`h-full flex flex-col transition-all duration-300 blueprint-card hover:bg-white/5 border-l-2 ${p.color} ${isMaximized ? 'p-10' : 'p-6'}`}>
                 <div className="flex justify-between items-start">
                    <h4 className={`font-black tracking-tighter uppercase text-white ${isMaximized ? 'text-2xl' : 'text-xl'}`}>{p.t}</h4>
                    <span className="mono text-[8px] opacity-40">{p.id}</span>
                 </div>
                 <p className={`leading-relaxed flex-grow mono opacity-60 mt-4 mb-4 ${isMaximized ? 'text-xs' : 'text-[11px]'}`}>{p.d}</p>
                 <div className="flex flex-wrap gap-2 min-h-6">
                    {p.tags.map(tag => (
                      <span key={tag} className="mono text-[8px] px-2 py-0.5 bg-white/5 border border-white/10 opacity-70">
                        {tag}
                      </span>
                    ))}
                 </div>
              </div>
           </GlitchCard>
         ))}
      </div>

      <div className="flex justify-center pt-6 mt-4 border-t border-white/5">
         <GlitchCard>
            <button 
              onClick={onOpenGithub}
              className={`transition-all mono font-bold flex items-center gap-3 group bg-cobalt/10 border border-cobalt/40 hover:bg-cobalt/20 hover:border-cobalt ${isMaximized ? 'px-16 py-6 text-base' : 'px-10 py-5 text-sm'}`}
            >
              <Box className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              ACCESS_ALL_REPOSITORIES
              <div className="text-[10px] bg-cobalt/20 px-2 py-0.5 ml-2">GITHUB.EXE</div>
            </button>
         </GlitchCard>
      </div>
    </div>
  );
};

export default ProjectsContent;
