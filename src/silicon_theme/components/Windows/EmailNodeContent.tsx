import { Mail } from 'lucide-react';
import { motion } from 'motion/react';
import GlitchCard from '../UI/GlitchCard';

const EmailNodeContent = ({ email }: { email: string }) => {
  return (
    <div className="p-12 flex flex-col items-center justify-center h-full space-y-8 text-center bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.05)_0%,transparent_70%)]">
       <div className="relative">
          <Mail className="w-20 h-20 text-rust opacity-20" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-10 h-10 border border-rust rounded-full" />
          </motion.div>
       </div>
       <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tighter">INITIATE DIRECT COMMS</h3>
            <div className="mono text-cobalt text-xs animate-pulse">HANDSHAKE_ID: NKJ_99_SECURE</div>
          </div>

          <div className="py-4 border-y border-rust/20">
            <div className="mono text-[10px] opacity-40 mb-1">TARGET_DESTINATION:</div>
            <div className="text-3xl md:text-4xl font-black text-white tracking-tight break-all selection:bg-rust selection:text-white">
              {email}
            </div>
          </div>

          <p className="mono text-xs opacity-60 max-w-md mx-auto leading-relaxed">
            System is ready to transmit data packet to the specified primary node.
            Execute the mailto Protocol by clicking the command below.
          </p>

          <GlitchCard className="mt-8">
            <a 
              href={`mailto:${email}`} 
              className="inline-block px-12 py-5 bg-rust/10 border border-rust/40 hover:bg-rust/20 hover:border-rust transition-all mono text-sm font-bold shadow-[0_0_20px_rgba(255,87,34,0.1)]"
            >
              EXECUTE: MAILTO_PROTOCOL
            </a>
          </GlitchCard>
       </div>
    </div>
  );
};

export default EmailNodeContent;
