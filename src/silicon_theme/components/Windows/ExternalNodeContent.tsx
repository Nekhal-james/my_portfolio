import { Github, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import GlitchCard from '../UI/GlitchCard';

const ExternalNodeContent = ({ type, identifier, url }: { type: 'GITHUB' | 'LINKEDIN', identifier: string, url: string }) => {
  const isGithub = type === 'GITHUB';
  const Icon = isGithub ? Github : Linkedin;
  
  return (
    <div className="p-12 flex flex-col items-center justify-center h-full space-y-8 text-center bg-[radial-gradient(circle_at_center,rgba(88,166,255,0.05)_0%,transparent_70%)]">
       <div className="relative">
          <Icon className="w-20 h-20 text-cobalt opacity-20" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-10 h-10 border border-cobalt rounded-full" />
          </motion.div>
       </div>
       
       <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tighter uppercase">LINK_ESTABLISHED: {type}</h3>
            <div className="mono text-cobalt text-xs animate-pulse">NODE_STATUS: DISCOVERABLE</div>
          </div>

          <div className="py-4 border-y border-cobalt/20">
            <div className="mono text-[10px] opacity-40 mb-1">{isGithub ? 'REPOSITORY_OWNER' : 'PROFILE_IDENTIFIER'}:</div>
            <div className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase selection:bg-cobalt selection:text-black">
              {identifier}
            </div>
          </div>

          <p className="mono text-xs opacity-60 max-w-md mx-auto leading-relaxed">
            External tunneling restricted by provider security protocols. 
            Execute the navigation command below to sync with the primary {type} node.
          </p>

          <GlitchCard className="mt-8">
            <a 
              href={url} 
              target="_blank"
              rel="noreferrer"
              className="inline-block px-12 py-5 bg-cobalt/10 border border-cobalt/40 hover:bg-cobalt/20 hover:border-cobalt transition-all mono text-sm font-bold shadow-[0_0_20px_rgba(88,166,255,0.1)]"
            >
              EXECUTE: OPEN_IN_NEW_TAB
            </a>
          </GlitchCard>
       </div>
    </div>
  );
};

export default ExternalNodeContent;
