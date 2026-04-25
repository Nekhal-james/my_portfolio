import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import StoryApp from './story_theme/StoryApp';
import SiliconApp from './silicon_theme/SiliconApp';
import Landing from './Landing';
import GlobalLoader from './components/GlobalLoader';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [theme, setTheme] = useState<'landing' | 'story' | 'silicon'>('landing');
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    // Reset classes
    document.body.classList.remove('story-theme', 'silicon-theme', 'landing-theme');
    
    if (theme === 'story') {
      document.body.classList.add('story-theme');
    } else if (theme === 'silicon') {
      document.body.classList.add('silicon-theme');
    } else {
      document.body.classList.add('landing-theme');
    }
  }, [theme]);

  return (
    <AnimatePresence mode="wait">
      {isPreloading ? (
        <GlobalLoader key="loader" onComplete={() => setIsPreloading(false)} />
      ) : (
        <div className="relative w-full h-full">
          {theme === 'landing' && <Landing onSelectTheme={setTheme} />}
          
          {theme === 'story' && (
            <div className="relative">
              <button 
                onClick={() => setTheme('landing')}
                className="fixed bottom-8 right-8 z-[9999] group flex flex-col items-center gap-2"
              >
                <div className="bg-red-500/10 hover:bg-red-500/20 p-4 rounded-full border-2 border-red-500/30 hover:border-red-500 transition-all shadow-lg hover:shadow-red-500/20 group-hover:scale-110 active:scale-95">
                   <ArrowLeft className="w-6 h-6 text-red-500" />
                </div>
                <span className="text-red-500 font-bold text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">EXIT_STORY</span>
              </button>
              <StoryApp />
            </div>
          )}

          {theme === 'silicon' && (
            <div className="relative">
              <button 
                onClick={() => setTheme('landing')}
                className="fixed top-4 right-4 z-[99999] bg-cobalt/20 text-cobalt border border-cobalt/50 px-4 py-2 rounded shadow-[0_0_10px_rgba(88,166,255,0.2)] hover:bg-cobalt/30 hover:shadow-[0_0_15px_rgba(88,166,255,0.4)] transition-all font-mono text-xs uppercase"
              >
                [ TERMINATE_SESSION ]
              </button>
              <SiliconApp />
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
