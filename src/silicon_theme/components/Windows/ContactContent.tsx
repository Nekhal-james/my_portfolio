import { Mail, Github, Linkedin, Radio } from 'lucide-react';
import GlitchCard from '../UI/GlitchCard';

const ContactContent = ({ onOpenExternal }: { onOpenExternal: (id: string) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
       <div className="text-center space-y-2">
         <h3 className="font-extrabold text-3xl text-white">REACH OUT</h3>
         <p className="mono text-rust">Secure Handshake Protocol Mandatory</p>
       </div>
       <div className="flex flex-wrap justify-center gap-8">
          {[
            { label: 'ENCRYPTED_MAIL', sub: 'nekhaljames@gmail.com', icon: <Mail className="w-6 h-6 text-rust" />, click: 'external-email' },
            { label: 'GITHUB_NODE', sub: 'Nekhal-james', icon: <Github className="w-6 h-6 text-cobalt" />, click: 'external-github' },
            { label: 'LINKEDIN_SYNC', sub: 'nekhal-james', icon: <Linkedin className="w-6 h-6 text-cobalt" />, click: 'external-linkedin' }
          ].map((item) => (
            <GlitchCard key={item.label}>
              <button 
                onClick={() => onOpenExternal(item.click)}
                className="transition-all flex flex-col items-center gap-3 w-48 px-8 py-6 border border-cobalt/30 hover:border-cobalt bg-cobalt/5 mono text-xs hover:scale-105"
              >
                {item.icon}
                <span>{item.label}</span>
                <div className="text-[9px] opacity-40 uppercase truncate w-full">
                  {item.sub}
                </div>
              </button>
            </GlitchCard>
          ))}
       </div>
    </div>
  );
};

export default ContactContent;
