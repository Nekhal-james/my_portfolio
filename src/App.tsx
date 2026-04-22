import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { Terminal as TerminalIcon, Cpu, Github, Radio, Wind, Map, Shield, Box, Zap, Layers, Activity, ChevronUp } from 'lucide-react';

// --- Components ---

const GlitchCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsGlitching(true)}
      onHoverEnd={() => setIsGlitching(false)}
      className={`relative overflow-hidden ${className}`}
      animate={isGlitching ? { 
        x: [0, -4, 4, -2, 2, 0],
        skew: [0, 1, -1, 0.5, -0.5, 0],
        filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
      } : {}}
    >
      <div className="relative z-10 h-full">{children}</div>
      
      {isGlitching && (
        <>
          <div className="absolute inset-0 z-20 pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-[1px] bg-red-500/30"
                style={{ top: `${Math.random() * 100}%` }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 0.1, repeat: Infinity }}
              />
            ))}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i+3}
                className="absolute w-full h-[1px] bg-blue-500/30"
                style={{ top: `${Math.random() * 100}%` }}
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 0.15, repeat: Infinity }}
              />
            ))}
          </div>

          <motion.div 
            className="absolute inset-0 z-0 text-[#ff0000] opacity-20 translate-x-0.5"
            animate={{ x: [-1, 1, -1], y: [0.5, -0.5, 0.5] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
          >
            {children}
          </motion.div>
          <motion.div 
            className="absolute inset-0 z-0 text-[#0000ff] opacity-20 -translate-x-0.5"
            animate={{ x: [1, -1, 1], y: [-0.5, 0.5, -0.5] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

const BootSequence = ({ title }: { title: string }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const bootLogs = [
    `INIT_SYSTEM: Loading ${title}...`,
    "MOUNTING_FILESYSTEM... [OK]",
    "ESTABLISHING_QUIC_TUNNEL... [OK]",
    "SYNCING_EDGE_CORE... [OK]",
    "DECRYPTING_MISSION_MODULES... [OK]",
    "KERNEL_HANDSHAKE_COMPLETE.",
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[current]]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-[100] bg-obsidian p-8 font-mono text-[10px] text-cobalt flex flex-col gap-1 overflow-hidden">
      {logs.map((log, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, x: -5 }} 
          animate={{ opacity: 1, x: 0 }}
        >
          {`> ${log}`}
        </motion.div>
      ))}
      <motion.div 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.5 }}
        className="w-2 h-4 bg-cobalt mt-1"
      />
    </div>
  );
};

const ShutdownSequence = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const shutdownLogs = [
    "TERMINATING_ACTIVE_PROCESSES...",
    "FLUSHING_ROCKSDB_CACHE... [OK]",
    "CLOSING_COMM_CHANNELS... [OK]",
    "SYSTEM_UMONT_SUCCESSFUL.",
    "MISSION_DATA_SECURED.",
    "MODULE_OFFLINE_READY.",
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < shutdownLogs.length) {
        setLogs(prev => [...prev, shutdownLogs[current]]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-[100] bg-obsidian p-8 font-mono text-[10px] text-red-500 flex flex-col gap-1 overflow-hidden">
      {logs.map((log, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, x: -5 }} 
          animate={{ opacity: 1, x: 0 }}
        >
          {`> ${log}`}
        </motion.div>
      ))}
      <motion.div 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.5 }}
        className="w-2 h-4 bg-red-500 mt-1"
      />
    </div>
  );
};

const ScanningCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovering(target.closest('button, a, .interactive-node, .draggable-handle') !== null);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed w-4 h-4 border border-cobalt rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed w-px h-[200vh] bg-cobalt/20 pointer-events-none z-[99] -top-1/2"
        animate={{ x: position.x }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.8 }}
      />
    </>
  );
};

const Hero = () => {
  const [text, setText] = useState('NEKHAL JAMES');
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setText(prev => (prev === 'NEKHAL JAMES' ? 'SYSTEMS DEVELOPER' : 'NEKHAL JAMES'));
        setTimeout(() => setIsGlitching(false), 300);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const glitchLayers = [
    { color: 'text-[#ff0000]', x: -8, y: -2, opacity: 0.8 },
    { color: 'text-[#0000ff]', x: 8, y: 2, opacity: 0.8 },
    { color: 'text-cobalt', x: -4, y: 0, opacity: 0.4 },
    { color: 'text-rust', x: 4, y: 0, opacity: 0.4 },
  ];

  return (
    <div className="relative group max-w-4xl">
      <div className="mono text-rust mb-4 flex items-center gap-3">
        <span>[SYSTEMS_DEVELOPER // EDGE_AI_SPECIALIST]</span>
        {isGlitching && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0, 1] }}
            className="text-red-500 font-bold text-[10px] animate-pulse"
          >
            ! SIGNAL_INTERFERENCE_DETECTED
          </motion.span>
        )}
      </div>
      
      <div className="relative overflow-visible">
        <motion.h1
          className="massive-title uppercase select-none mb-4 relative"
          animate={isGlitching ? { 
            x: [0, -15, 10, -5, 5, -10, 0],
            y: [0, 2, -2, 1, -1, 0],
            skew: [0, 5, -5, 2, -2, 0],
            filter: ["blur(0px)", "blur(8px)", "blur(2px)", "blur(0px)"],
            opacity: [1, 0.5, 0.8, 0.3, 1]
          } : {}}
          transition={{ duration: 0.3 }}
        >
          {/* Blur Lines / Scanline Effect during glitch */}
          {isGlitching && (
             <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
                    style={{ top: `${Math.random() * 100}%` }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 0.1, repeat: 2 }}
                  />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i+5}
                    className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-blue-600 to-transparent"
                    style={{ top: `${Math.random() * 100}%` }}
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ duration: 0.15, repeat: 2 }}
                  />
                ))}
             </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="relative"
            >
              {/* Main Text Layer */}
              <div className="relative z-20">
                {text.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {word} {i === 0 && <br />}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Aggressive Glitch Layers */}
              {isGlitching && glitchLayers.map((layer, idx) => (
                <motion.div 
                  key={idx}
                  className={`absolute inset-0 z-10 ${layer.color} pointer-events-none`}
                  animate={{ 
                    x: [layer.x, layer.x * -1.5, layer.x * 0.5, layer.x],
                    y: [layer.y, layer.y * -2, layer.y],
                    opacity: [layer.opacity, 0.2, layer.opacity]
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {text.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word} {i === 0 && <br />}
                    </React.Fragment>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.h1>
      </div>

      <div className="sticky-note absolute -top-10 -right-20 hidden lg:block">
        Learning and deploying<br />on the fly!
      </div>

      <div className="flex gap-6 mt-8">
        <div className="flex flex-col">
          <span className="mono text-[10px] text-slate-500">QUALIFICATION</span>
          <span className="text-sm font-bold">B.TECH CS (AI)</span>
        </div>
        <div className="w-px h-8 bg-cobalt/20" />
        <div className="flex flex-col">
          <span className="mono text-[10px] text-slate-500">SPECIALIZATION</span>
          <span className="text-sm font-bold">HARDWARE ARCHITECTURE</span>
        </div>
      </div>
    </div>
  );
};

const BentoGrid = () => {
  const [procInfo, setProcInfo] = useState({ name: 'GENERIC_CPU', cores: 0, arch: 'UNKNOWN' });

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 0;
    const ua = navigator.userAgent;
    let name = 'LOCAL_HOST_PROCESSOR';
    let arch = 'x86_64';

    if (ua.includes('Macintosh')) {
      // Browsers don't give the exact chip name for privacy, but we can detect M-series via performance/concurrency
      name = cores >= 8 ? 'APPLE_SILICON_M_SERIES' : 'APPLE_CPU';
      arch = 'ARM64';
    } else if (ua.includes('Windows')) {
      name = 'INTEL_CORE_X86_NODE';
      arch = 'x64';
    } else if (ua.includes('Linux')) {
      name = 'LINUX_KERNEL_NODE';
      arch = 'x86_64';
    }

    setProcInfo({ name, cores, arch });
  }, []);

  return (
    <div className="flex flex-col h-full gap-1 bg-cobalt/10">
      <GlitchCard className="flex-1">
        <div className="grid-cell h-full p-4 flex flex-col justify-center">
          <div className="mono mb-2">GITHUB_PULSE</div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className={`w-full aspect-square rounded-sm ${
                  [1, 2, 4, 6, 7, 9, 11, 12].includes(i) ? 'bg-cobalt shadow-[0_0_5px_rgba(88,166,255,0.5)]' : 'bg-cobalt/20'
                }`}
              />
            ))}
          </div>
        </div>
      </GlitchCard>

      <GlitchCard className="flex-1">
        <div className="grid-cell h-full flex flex-col justify-center">
          <div className="mono mb-2">HARDWARE_NODE_LOCAL</div>
          <div className="text-white font-bold text-sm">{procInfo.name}</div>
          <div className="mono text-rust text-[9px] mt-1 uppercase">
            CORES: {procInfo.cores} | ARCH: {procInfo.arch} | SMT: ENABLED
          </div>
        </div>
      </GlitchCard>

      <GlitchCard className="flex-1">
        <div className="grid-cell h-full flex flex-col justify-center">
          <div className="mono mb-2">CORE_STACK</div>
          <div className="space-y-1">
            <div className="text-white mono text-[10px]">YOLOv8 / ZENOH / ROCKSDB</div>
            <div className="text-white mono text-[10px]">LINUX_CGROUPS / QUIC</div>
          </div>
        </div>
      </GlitchCard>
    </div>
  );
};

const ProjectSection = () => {
  const projects = [
    {
      id: '001',
      title: "SPACE_ORB",
      desc: "ZERO-ANOMALY SANDBOXED AI COMPUTE",
      visual: (
        <div className="h-full border border-cobalt/20 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(88,166,255,0.05)_5px,rgba(88,166,255,0.05)_10px)]" />
      )
    },
    {
      id: '002',
      title: "FARM_GRID",
      desc: "KERALA LOCAL LOGISTICS HUB UI",
      visual: (
        <div className="h-full grid grid-cols-2 gap-1 p-1 border border-cobalt/20">
           <div className="bg-cobalt/10" />
           <div className="bg-cobalt/10" />
        </div>
      )
    },
    {
      id: '003',
      title: "AERO_CAST",
      desc: "NASA_WEATHER_PROBABILITY_ENGINE",
      visual: (
        <div className="h-full flex items-end gap-1 border border-cobalt/20 p-2">
           <div className="flex-1 bg-cobalt h-[40%]" />
           <div className="flex-1 bg-cobalt h-[70%]" />
           <div className="flex-1 bg-rust h-[90%]" />
           <div className="flex-1 bg-cobalt h-[50%]" />
        </div>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full p-2">
      {projects.map((p) => (
        <GlitchCard key={p.id} className="h-full">
          <motion.div 
            whileHover={{ y: -5, borderColor: "rgba(88,166,255,0.6)", boxShadow: "0 0 20px rgba(88,166,255,0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="blueprint-card group cursor-pointer hover:bg-cobalt/5 transition-colors border border-cobalt/20 h-full flex flex-col"
          >
            <div className="mono text-rust mb-2 group-hover:text-cobalt transition-colors">FILE_{p.id}: {p.title}</div>
            <div className="flex-grow my-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-cobalt/0 group-hover:bg-cobalt/5 transition-colors z-10" />
              {p.visual}
            </div>
            <div className="mono text-[9px] opacity-80 group-hover:opacity-100">{p.desc}</div>
          </motion.div>
        </GlitchCard>
      ))}
    </div>
  );
};

interface WindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
  id: string;
  minimizedWindows: string[];
  onMinimize: (id: string) => void;
  isLoading?: boolean;
  isClosing?: boolean;
  isFocused: boolean;
  onFocus: () => void;
  zIndex: number;
}

const MissionWindow = ({ title, isOpen, onClose, children, icon, id, minimizedWindows, onMinimize, isLoading, isClosing, isFocused, onFocus, zIndex }: WindowProps) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const isMinimized = minimizedWindows.includes(id);

  if (!isOpen || isMinimized) return null;

  return (
    <AnimatePresence mode="wait">
      <div 
        className={`fixed flex items-center justify-center pointer-events-none ${isMaximized ? 'inset-0' : 'inset-6'}`}
        style={{ zIndex }}
      >
        <motion.div
          drag={!isMaximized}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          onPointerDown={onFocus}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            borderColor: isFocused ? "rgba(88,166,255,0.6)" : "rgba(88,166,255,0.3)",
            boxShadow: isFocused ? "0 0 30px rgba(88,166,255,0.15)" : "0 0 10px rgba(0,0,0,0.5)"
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`bg-obsidian border rounded-lg overflow-hidden flex flex-col transition-all duration-300 pointer-events-auto ${isMaximized ? 'w-full h-full' : 'w-full max-w-4xl max-h-[80vh]'}`}
        >
          <div 
            onPointerDown={(e) => {
              onFocus();
              dragControls.start(e);
            }}
            className={`bg-white/5 px-4 py-3 flex items-center justify-between border-b select-none cursor-move draggable-handle transition-colors ${isFocused ? 'border-cobalt/50 bg-cobalt/10' : 'border-cobalt/20 bg-white/5'}`}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 mr-4" onPointerDown={(e) => e.stopPropagation()}>
                <button 
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors flex items-center justify-center group pointer-events-auto"
                >
                  <span className="text-[8px] text-black/40 opacity-0 group-hover:opacity-100">×</span>
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onMinimize(id);
                  }}
                  className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors flex items-center justify-center group pointer-events-auto"
                >
                  <span className="text-[10px] text-black/40 opacity-0 group-hover:opacity-100 font-bold mb-1">−</span>
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMaximized(!isMaximized);
                  }}
                  className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors flex items-center justify-center group pointer-events-auto"
                >
                  <span className="text-[8px] text-black/40 opacity-0 group-hover:opacity-100 font-bold">□</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className={`${isFocused ? 'text-cobalt' : 'text-cobalt/50'} transition-colors`}>{icon}</div>
                <span className={`mono text-[10px] font-bold tracking-widest transition-colors ${isFocused ? 'opacity-100 text-white' : 'opacity-60'}`}>{title}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
               {(isLoading || isClosing) && (
                 <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full animate-ping ${isClosing ? 'bg-red-500' : 'bg-cobalt'}`} />
                    <span className={`mono text-[8px] animate-pulse ${isClosing ? 'text-red-500' : 'text-cobalt'}`}>
                      {isClosing ? 'SHUTTING_DOWN...' : 'BOOTING_SERVICE...'}
                    </span>
                 </div>
               )}
               <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-cobalt/20' : isFocused ? 'bg-cobalt shadow-[0_0_8px_#58a6ff]' : 'bg-cobalt/40'}`} />
            </div>
          </div>
          <div className="flex-grow overflow-auto p-8 relative min-h-[300px]">
            {isLoading && <BootSequence title={title} />}
            {isClosing && <ShutdownSequence />}
            
            <div className="blueprint-line w-full top-10 left-0 border-t opacity-10" />
            <div className="blueprint-line h-full left-10 top-0 border-l opacity-10" />
            <div className={(isLoading || isClosing) ? 'opacity-0 pointer-events-none transition-all duration-300' : 'transition-all duration-500'}>
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const TerminalContent = ({ onToggleCinema, onOpenWindow, onMinimizeSelf }: { onToggleCinema: (active: boolean) => void, onOpenWindow: (id: string) => void, onMinimizeSelf: () => void }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Type /help to begin.']);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    setHistory(prev => [...prev, `> ${input}`]);

    if (cmd === '/riddle') {
      setHistory(prev => [...prev, 'CINEMA_MODE_ACTIVATED: Redefining visuals...']);
      onToggleCinema(true);
      setTimeout(() => setHistory(prev => [...prev, 'Welcome to the Malayalam Cinema riddle environment.']), 1000);
    } else if (cmd === '/about') {
      setHistory(prev => [...prev, 'Opening Profile Data...']);
      onMinimizeSelf();
      onOpenWindow('about');
    } else if (cmd === '/skills') {
      setHistory(prev => [...prev, 'Accessing Technical Ecosystem...']);
      onMinimizeSelf();
      onOpenWindow('skills');
    } else if (cmd === '/projects') {
      setHistory(prev => [...prev, 'Loading Mission Records...']);
      onMinimizeSelf();
      onOpenWindow('projects');
    } else if (cmd === '/connect') {
      setHistory(prev => [...prev, 'Establishing Communication Link...']);
      onMinimizeSelf();
      onOpenWindow('contact');
    } else if (cmd === '/clear') {
      setHistory(['Terminal cleared.']);
    } else if (cmd === '/help') {
      setHistory(prev => [...prev, 'Available: /about, /skills, /projects, /connect, /riddle, /status, /clear']);
    } else if (cmd === '/status') {
       setHistory(prev => [...prev, 'HOST: Nekhal James', 'UPTIME: 18 years 5 months', 'ARCH: ARM64/x86_64 Hybrid']);
    } else {
      setHistory(prev => [...prev, `Command not found: ${cmd}`]);
    }
    setInput('');
  };

  return (
    <div className="flex flex-col h-full min-h-[300px]">
      <div className="flex-grow font-mono text-xs overflow-y-auto space-y-1 mb-4 p-2 bg-black/20 rounded">
        {history.map((h, i) => (
          <div key={i} className={h.startsWith('>') ? 'text-cobalt' : 'text-slate-400'}>
            {h}
          </div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="bg-white/5 px-4 h-12 flex items-center gap-2 border border-cobalt/20 rounded">
         <span className="text-cobalt text-xs font-bold">$</span>
         <input
            type="text"
            autoFocus
            className="bg-transparent border-none outline-none flex-grow font-mono text-xs text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command..."
         />
      </form>
    </div>
  );
};

export default function App() {
  const [activeWindows, setActiveWindows] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [closingWindows, setClosingWindows] = useState<string[]>([]);
  const [cinemaActive, setCinemaActive] = useState(false);

  const menuItems = [
    { id: 'about', label: 'ABOUT', icon: <Activity className="w-4 h-4" /> },
    { id: 'skills', label: 'SKILLS', icon: <Cpu className="w-4 h-4" /> },
    { id: 'projects', label: 'PROJECTS', icon: <Box className="w-4 h-4" /> },
    { id: 'contact', label: 'REACH OUT', icon: <Radio className="w-4 h-4" /> },
    { id: 'terminal', label: 'TERMINAL', icon: <TerminalIcon className="w-4 h-4" /> },
  ];

  const handleMenuClick = (id: string) => {
    setFocusedWindow(id);
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows(prev => prev.filter(w => w !== id));
    }
    if (!activeWindows.includes(id)) {
      setActiveWindows(prev => [...prev, id]);
      // Simulate loading for new windows
      setLoadingStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [id]: false }));
      }, 1500);
    } else {
      // Bring existing window to top
      setActiveWindows(prev => [...prev.filter(w => w !== id), id]);
    }
  };

  const handleClose = (id: string) => {
    setClosingWindows(prev => [...prev, id]);
    
    // Allow shutdown animation to play
    setTimeout(() => {
      setActiveWindows(prev => prev.filter(w => w !== id));
      setMinimizedWindows(prev => prev.filter(w => w !== id));
      setClosingWindows(prev => prev.filter(w => w !== id));
      if (focusedWindow === id) setFocusedWindow(null);
      setLoadingStates(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }, 1000);
  };

  const handleMinimize = (id: string) => {
    if (!minimizedWindows.includes(id)) {
      setMinimizedWindows(prev => [...prev, id]);
      if (focusedWindow === id) setFocusedWindow(null);
    }
  };

  const handleFocus = (id: string) => {
    if (focusedWindow !== id) {
      setFocusedWindow(id);
      setActiveWindows(prev => [...prev.filter(w => w !== id), id]);
    }
  };

  return (
    <main className={`mission-control-grid selection:bg-cobalt selection:text-black transition-all duration-1000 ${cinemaActive ? 'hue-rotate-90 contrast-125' : ''}`}>
      <ScanningCursor />

      {/* HEADER BAR */}
      <header className="grid-cell col-span-3 flex justify-between items-center px-6 border-b border-cobalt">
        <div className="mono flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cobalt shadow-[0_0_8px_#58a6ff] animate-pulse" />
          SYSTEM_STATE: OPERATIONAL
        </div>
        <div className="mono hidden md:block">
          COORD: 9.9312° N, 76.2673° E (KOCHI)
        </div>
        <div className="mono text-rust">
          SEC_ARCH: AES-256-GCM VERIFIED
        </div>
      </header>

      {/* MISSION MENU SIDEBAR */}
      <aside className="grid-cell row-span-2 flex flex-col items-center pt-8 border-r border-cobalt/20 overflow-visible">
        <div className="mono [writing-mode:vertical-rl] rotate-180 mb-10 opacity-60">MISSION_MENU</div>
        <nav className="flex flex-col gap-6 w-full px-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`mono text-[10px] flex flex-col items-center gap-2 p-3 border border-transparent hover:border-cobalt/40 hover:bg-cobalt/5 transition-all group ${activeWindows.includes(item.id) && !minimizedWindows.includes(item.id) ? 'bg-cobalt/10 border-cobalt/50 text-white' : ''}`}
            >
              <div className="group-hover:scale-110 transition-transform relative">
                {item.icon}
                {minimizedWindows.includes(item.id) && (
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                )}
                {activeWindows.includes(item.id) && !minimizedWindows.includes(item.id) && (
                   <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cobalt" />
                )}
              </div>
              <span className="opacity-60 group-hover:opacity-100">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* HERO SECTION */}
      <section className="grid-cell flex flex-col justify-center p-12">
        <Hero />
      </section>

      {/* SKILLS PREVIEW SIDEBAR */}
      <aside className="grid-cell border-l border-cobalt/10">
        <BentoGrid />
      </aside>

      {/* PROJECT PREVIEW ROW */}
      <section className="grid-cell col-span-2 border-t border-cobalt/20">
        <ProjectSection />
      </section>

      {/* WINDOWS */}
      <MissionWindow 
        id="about"
        title="NEKHAL_PROFILE_FILE" 
        isOpen={activeWindows.includes('about')} 
        onClose={() => handleClose('about')}
        onMinimize={handleMinimize}
        minimizedWindows={minimizedWindows}
        isLoading={loadingStates['about']}
        isClosing={closingWindows.includes('about')}
        isFocused={focusedWindow === 'about'}
        onFocus={() => handleFocus('about')}
        zIndex={90 + activeWindows.indexOf('about')}
        icon={<Activity className="w-5 h-5 text-cobalt" />}
      >
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 border-2 border-cobalt/20 bg-cobalt/5 flex items-center justify-center shrink-0">
               <Github className="w-16 h-16 opacity-20" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-white">NEKHAL JAMES</h2>
              <p className="mono text-rust text-sm">Systems Developer | Edge AI Enthusiast | Hardware Architect</p>
              <p className="text-slate-400 font-mono text-sm leading-relaxed">
                St. Joseph's College of Engineering and Technology (SJCET), Palai. 
                Focusing on bridging the gap between low-level hardware architecture and high-level AI systems. 
                Adaptive Learning is my core process—deploying solutions like Rust and RISC-V to solve complex real-world challenges.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <GlitchCard>
              <div className="p-4 bg-white/5 border border-white/5 h-full">
                 <span className="mono text-[10px] text-slate-500">RESIDENCE</span>
                 <div className="text-sm">Kottayam, Kerala 686121</div>
              </div>
            </GlitchCard>
            <GlitchCard>
              <div className="p-4 bg-white/5 border border-white/5 h-full">
                 <span className="mono text-[10px] text-slate-500">DISCIPLINE</span>
                 <div className="text-sm">B.Tech in CS (Artificial Intelligence)</div>
              </div>
            </GlitchCard>
          </div>
        </div>
      </MissionWindow>

      <MissionWindow 
        id="skills"
        title="TECHNICAL_ECOSYSTEM_DATABASE" 
        isOpen={activeWindows.includes('skills')} 
        onClose={() => handleClose('skills')}
        onMinimize={handleMinimize}
        minimizedWindows={minimizedWindows}
        isLoading={loadingStates['skills']}
        isClosing={closingWindows.includes('skills')}
        isFocused={focusedWindow === 'skills'}
        onFocus={() => handleFocus('skills')}
        zIndex={90 + activeWindows.indexOf('skills')}
        icon={<Cpu className="w-5 h-5 text-cobalt" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-6">
            <h3 className="mono text-rust text-lg">PRO_STACK</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Rust', 'Python', 'C/C++', 'TypeScript', 'Java', 'RISC-V'].map(s => (
                <GlitchCard key={s}>
                  <div className="flex justify-between items-center p-3 bg-white/5 border-l border-cobalt/40 h-full">
                    <span className="text-sm">{s}</span>
                  </div>
                </GlitchCard>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="mono text-cobalt text-lg">SYSTEMS_INTELLIGENCE</h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { n: 'YOLOv8 Vision', d: 'Inferencing at the Edge' },
                { n: 'OpenCV', d: 'Complex Image Processing' },
                { n: 'RocksDB', d: 'High-Performance Persistent Store' },
                { n: 'Zenoh (QUIC)', d: 'Low-Latency Distribution' }
              ].map(s => (
                <GlitchCard key={s.n}>
                  <div className="p-3 bg-white/5 border border-white/10 h-full">
                     <div className="text-sm font-bold">{s.n}</div>
                     <div className="mono text-[10px] opacity-50">{s.d}</div>
                  </div>
                </GlitchCard>
              ))}
            </div>
          </div>
        </div>
      </MissionWindow>

      <MissionWindow 
        id="projects"
        title="ACTIVE_MISSION_RECORDS" 
        isOpen={activeWindows.includes('projects')} 
        onClose={() => handleClose('projects')}
        onMinimize={handleMinimize}
        minimizedWindows={minimizedWindows}
        isLoading={loadingStates['projects']}
        isClosing={closingWindows.includes('projects')}
        isFocused={focusedWindow === 'projects'}
        onFocus={() => handleFocus('projects')}
        zIndex={90 + activeWindows.indexOf('projects')}
        icon={<Box className="w-5 h-5 text-cobalt" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { t: 'SpaceOrb (V7.6 Node)', d: 'Aerospace-grade data management system designed for Space Data Centers with 90-minute communication blackouts.' },
             { t: 'Thalam', d: 'AI-powered cultural intelligence platform for mapping Kerala traditions via "Cultural DNA Engine".' },
             { t: 'FarmGrid', d: 'Full-stack marketplace connecting local Kerala farmers with logistics hub networks.' },
             { t: 'AeroCast', d: 'Weather probability analyzer using 40 years of NASA POWER API data.' }
           ].map(p => (
             <GlitchCard key={p.t}>
               <div className="p-6 blueprint-card hover:bg-cobalt/5 transition-all h-full">
                  <h4 className="text-xl font-bold text-white mb-2">{p.t}</h4>
                  <p className="mono text-[11px] opacity-60 leading-relaxed">{p.d}</p>
               </div>
             </GlitchCard>
           ))}
        </div>
      </MissionWindow>

      <MissionWindow 
        id="contact"
        title="COMMUNICATION_LINK_ESTABLISHED" 
        isOpen={activeWindows.includes('contact')} 
        onClose={() => handleClose('contact')}
        onMinimize={handleMinimize}
        minimizedWindows={minimizedWindows}
        isLoading={loadingStates['contact']}
        isClosing={closingWindows.includes('contact')}
        isFocused={focusedWindow === 'contact'}
        onFocus={() => handleFocus('contact')}
        zIndex={90 + activeWindows.indexOf('contact')}
        icon={<Radio className="w-5 h-5 text-cobalt" />}
      >
        <div className="flex flex-col items-center justify-center py-12 space-y-8">
           <div className="text-center space-y-2">
             <h3 className="text-3xl font-extrabold text-white">REACH OUT</h3>
             <p className="mono text-rust">Secure Handshake Protocol Mandatory</p>
           </div>
           <div className="flex flex-wrap justify-center gap-6">
              {[
                { l: 'nekhaljames@gmail.com', i: <Radio className="w-4 h-4" /> },
                { l: 'GitHub/nekhaljames', i: <Github className="w-4 h-4" /> },
                { l: 'LinkedIn/nekhaljames', i: <Activity className="w-4 h-4" /> }
              ].map(c => (
                <button key={c.l} className="px-6 py-4 border border-cobalt/30 hover:border-cobalt bg-cobalt/5 mono text-xs transition-all hover:scale-105">
                  {c.l}
                </button>
              ))}
           </div>
        </div>
      </MissionWindow>

      <MissionWindow 
        id="terminal"
        title="NEKHAL_SHELL_v1.0" 
        isOpen={activeWindows.includes('terminal')} 
        onClose={() => handleClose('terminal')}
        onMinimize={handleMinimize}
        minimizedWindows={minimizedWindows}
        isLoading={loadingStates['terminal']}
        isClosing={closingWindows.includes('terminal')}
        isFocused={focusedWindow === 'terminal'}
        onFocus={() => handleFocus('terminal')}
        zIndex={90 + activeWindows.indexOf('terminal')}
        icon={<TerminalIcon className="w-5 h-5 text-cobalt" />}
      >
        <TerminalContent 
          onToggleCinema={setCinemaActive} 
          onOpenWindow={handleMenuClick}
          onMinimizeSelf={() => handleMinimize('terminal')}
        />
      </MissionWindow>

      <footer className="fixed bottom-0 left-0 w-full h-[40px] bg-obsidian border-t border-cobalt/20 flex items-center px-5 z-[100]">
        <div className="flex items-center gap-4 w-full h-full relative">
          <div className="mono text-[10px] opacity-50 shrink-0">TASK_MANAGER:</div>
          
          <div className="flex items-center gap-2 overflow-x-auto h-full px-2 scrollbar-none">
            {activeWindows.length === 0 && (
              <div className="mono text-[8px] opacity-30 select-none">NO_ACTIVE_PROCESSES</div>
            )}
            <AnimatePresence>
              {activeWindows.map((id) => {
                const menuItem = menuItems.find(item => item.id === id);
                if (!menuItem) return null;
                const isFocused = focusedWindow === id;
                const isMinimized = minimizedWindows.includes(id);

                return (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      backgroundColor: isFocused ? "rgba(88,166,255,0.15)" : "rgba(88,166,255,0.05)",
                      borderColor: isFocused ? "rgba(88,166,255,0.5)" : "rgba(88,166,255,0.2)"
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => handleMenuClick(id)}
                    className={`flex items-center gap-2 px-3 py-1 border transition-all rounded group relative ${isMinimized ? 'opacity-50 grayscale hover:grayscale-0' : 'opacity-100'}`}
                  >
                    <div className={`${isFocused ? 'text-cobalt' : 'text-cobalt/60'} group-hover:scale-110 transition-transform`}>
                      {menuItem.icon}
                    </div>
                    <span className={`mono text-[9px] truncate max-w-[80px] ${isFocused ? 'text-white' : 'text-slate-400'}`}>
                      {menuItem.label}
                    </span>
                    {isFocused && !isMinimized && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cobalt shadow-[0_0_8px_#58a6ff]" />
                    )}
                    {isMinimized && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-500 animate-pulse" />
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="absolute right-0 top-0 h-full flex items-center pr-4 pointer-events-none">
            <div className="mono text-[10px] opacity-40">TERMINAL_INPUT: /_</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
