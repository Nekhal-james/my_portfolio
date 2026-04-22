import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { Terminal as TerminalIcon, Cpu, Github, Radio, Wind, Map, Shield, Box, Zap, Layers, Activity, ChevronUp, Mail, ExternalLink, Linkedin, Move, Flower, Flower2 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, YAxis } from 'recharts';

// --- Contexts ---
type ThemeMode = 'obsidian' | 'critical' | 'happy' | 'flower' | 'day' | 'dev';
const ThemeContext = React.createContext<{ theme: ThemeMode }>({ theme: 'obsidian' });

// --- Components ---

const GlitchCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const { theme } = React.useContext(ThemeContext);
  const [isHovering, setIsHovering] = useState(false);
  const isGlitching = theme === 'critical' && isHovering;

  return (
    <motion.div
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div 
        className="relative z-10 h-full"
        animate={isGlitching ? { 
          opacity: [1, 0.7, 1, 0.8, 1],
        } : {}}
        transition={{ duration: 0.3, repeat: 2 }}
      >
        {children}
      </motion.div>
      
      {isGlitching && (
        <>
          <div className="absolute inset-0 z-20 pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-[1px] bg-red-500/50"
                style={{ top: `${Math.random() * 100}%` }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 0.15, repeat: 2 }}
              />
            ))}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i+3}
                className="absolute w-full h-[1px] bg-blue-500/50"
                style={{ top: `${Math.random() * 100}%` }}
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 0.2, repeat: 2 }}
              />
            ))}
          </div>

          <motion.div 
            className="absolute inset-0 z-0 text-[#ff0000] opacity-40 pointer-events-none"
            animate={{ 
              opacity: [0, 0.6, 0.2, 0.6, 0],
              x: [-3, 3, -2, 2, 0],
              y: [1, -1, 0.5, -0.5, 0]
            }}
            transition={{ repeat: 2, duration: 0.3 }}
          >
            {children}
          </motion.div>
          <motion.div 
            className="absolute inset-0 z-0 text-[#0000ff] opacity-40 pointer-events-none"
            animate={{ 
              opacity: [0, 0.6, 0.3, 0.6, 0],
              x: [3, -3, 2, -2, 0],
              y: [-1, 1, -0.5, 0.5, 0]
            }}
            transition={{ repeat: 2, duration: 0.3 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

const GlitchText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        animate={{
          x: [-1, 1, -0.5, 0, 0.5, -1],
          y: [0.5, -0.5, 0, 0.5, -0.5, 0],
          opacity: [1, 0.9, 1, 0.95, 1],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
      <motion.div
        animate={{
          x: [1.5, -1.5, 0.5, 0, -0.5, 1.5],
          opacity: [0, 0.7, 0, 0.5, 0],
          scaleY: [1, 1.1, 1],
        }}
        transition={{
          duration: 0.08,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0 text-[#ff0000] z-0 translate-x-[2px] opacity-70 mix-blend-screen"
      >
        {children}
      </motion.div>
      <motion.div
        animate={{
          x: [-1.5, 1.5, -0.5, 0, 0.5, -1.5],
          opacity: [0, 0.7, 0, 0.5, 0],
          scaleY: [1, 0.9, 1],
        }}
        transition={{
          duration: 0.12,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0 text-[#00ffff] z-0 -translate-x-[2px] opacity-70 mix-blend-screen"
      >
        {children}
      </motion.div>
    </div>
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

const FlowerBloom = () => {
  const flowers = useMemo(() => Array.from({ length: 45 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 25 + 15,
    delay: Math.random() * 5, // Wider distribution
    duration: Math.random() * 4 + 6,
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 40,
    Type: Math.random() > 0.5 ? Flower : Flower2
  })), []);

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none overflow-hidden">
      {flowers.map(({ id, x, y, size, delay, duration, rotation, drift, Type }) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0, rotate: rotation, x: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0, 1, 1, 0.7], 
            y: [-50, -150], // Drift up relative to start
            x: [0, drift], // Subtle lateral sway
            rotate: rotation + 90 
          }}
          transition={{ 
            duration, 
            delay, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{ 
            left: `${x}%`, 
            top: `${y}%`,
            position: 'absolute',
            willChange: 'transform, opacity'
          }}
        >
           <Type 
             className="text-purple-400/80 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" 
             style={{ width: size, height: size }} 
           />
        </motion.div>
      ))}
    </div>
  );
};

const MatrixRain = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  const columns = useMemo(() => {
    const count = isMobile ? 15 : 40; // Fewer columns on mobile
    const charLimit = isMobile ? 8 : 15; // Shorter strings on mobile
    
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 5, // Slower (5-8s)
      chars: Array.from({ length: charLimit }).map(() => 
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&"[Math.floor(Math.random() * 40)]
      )
    }));
  }, [isMobile]);

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none overflow-hidden bg-black/40">
      {columns.map(({ id, x, delay, duration, chars }) => (
        <motion.div
          key={id}
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: 1200, opacity: [0, 0.3, 0.3, 0] }}
          transition={{ 
            duration, 
            delay, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute font-mono text-green-500 text-sm md:text-lg flex flex-col items-center leading-none"
          style={{ 
            left: `${x}%`,
            willChange: 'transform'
          }}
        >
          {chars.map((char, j) => (
            <span 
              key={j}
              className={`${j === 0 ? 'text-white' : 'text-green-500/60'} ${j > 0 && j % 3 === 0 ? 'animate-pulse' : ''}`}
            >
              {char}
            </span>
          ))}
        </motion.div>
      ))}
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
  const [text, setText] = useState('Nekhal James');
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const titles = ['Nekhal James', 'AI STUDENT', 'DEVELOPER', 'IoT ENTHUSIAST'];
    let index = 0;
    
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        index = (index + 1) % titles.length;
        setText(titles[index]);
        setTimeout(() => setIsGlitching(false), 300);
      }, 300);
    }, 2500);
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
        <span>[AI_STUDENT // DEVELOPER // IOT_ENTHUSIAST]</span>
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

      <div className="flex gap-6 mt-8">
        <div className="flex flex-col">
          <span className="mono text-[10px] text-slate-500">QUALIFICATION</span>
          <span className="text-sm font-bold">B.TECH CS (AI)</span>
        </div>
        <div className="w-px h-8 bg-cobalt/20" />
        <div className="flex flex-col">
          <span className="mono text-[10px] text-slate-500">SPECIALIZATION</span>
          <span className="text-sm font-bold">AI BASED IOT</span>
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

const SpaceOrbVisual = () => {
  const [data, setData] = useState(Array.from({ length: 20 }, (_, i) => ({ time: i, velocity: 50 + Math.random() * 20, power: 30 + Math.random() * 40 })));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), { time: prev[prev.length - 1].time + 1, velocity: 50 + Math.random() * 20, power: 30 + Math.random() * 40 }];
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full opacity-60 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(88,166,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(88,166,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none" />
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#58a6ff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="velocity" stroke="#58a6ff" fillOpacity={1} fill="url(#colorVelocity)" isAnimationActive={false} />
          <Line type="monotone" dataKey="power" stroke="#b7410e" strokeWidth={1} dot={false} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const FarmGridVisual = () => {
  const [data, setData] = useState(Array.from({ length: 12 }, (_, i) => ({ id: i, sales: Math.random() * 100 })));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(item => ({ ...item, sales: Math.max(10, Math.min(100, item.sales + (Math.random() - 0.5) * 30)) })));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full p-2 opacity-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(88,166,255,0.1)_1px,transparent_1px)] bg-[size:4px_4px]" />
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
          <Bar dataKey="sales" fill="#58a6ff" isAnimationActive={true} animationDuration={600} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const AeroCastVisual = () => {
  const [data, setData] = useState(Array.from({ length: 15 }, (_, i) => ({ time: i, temp: 20 + Math.random() * 15, weather: Math.random() * 100 })));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1];
        return [...prev.slice(1), { time: last.time + 1, temp: 20 + Math.random() * 15, weather: Math.random() * 100 }];
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full opacity-40 relative overflow-hidden">
      <div className="absolute inset-0 border border-rust/10 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(183,65,14,0.02)_5px,rgba(183,65,14,0.02)_10px)]" />
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <YAxis hide domain={[0, 100]} />
          <Line type="stepAfter" dataKey="weather" stroke="#58a6ff" strokeWidth={1} dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="temp" stroke="#b7410e" strokeWidth={2} dot={true} r={1} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const ProjectSection = () => {
  const projects = [
    {
      id: '001',
      title: "SPACE_ORB",
      desc: "ZERO-ANOMALY SANDBOXED AI COMPUTE",
      visual: <SpaceOrbVisual />
    },
    {
      id: '002',
      title: "FARM_GRID",
      desc: "KERALA LOCAL LOGISTICS HUB UI",
      visual: <FarmGridVisual />
    },
    {
      id: '003',
      title: "AERO_CAST",
      desc: "NASA_WEATHER_PROBABILITY_ENGINE",
      visual: <AeroCastVisual />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full p-4 pb-12">
      {projects.map((p) => (
        <GlitchCard key={p.id} className="h-full">
          <motion.div 
            whileHover={{ y: -5, borderColor: "rgba(88,166,255,0.6)", boxShadow: "0 0 20px rgba(88,166,255,0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="blueprint-card group cursor-pointer hover:bg-cobalt/5 transition-colors border border-cobalt/20 h-full flex flex-col"
          >
            <div className="mono text-rust mb-2 group-hover:text-cobalt transition-colors">FILE_{p.id}: {p.title}</div>
            <div className="flex-grow my-4 min-h-[120px] overflow-hidden relative">
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
  resetTrigger?: number;
  isMobile?: boolean;
}

const MissionWindow = ({ title, isOpen, onClose, children, icon, id, minimizedWindows, onMinimize, isLoading, isClosing, isFocused, onFocus, zIndex, resetTrigger, isMobile }: WindowProps) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const isMinimized = minimizedWindows.includes(id);

  if (!isOpen || isMinimized) return null;

  return (
    <AnimatePresence mode="wait">
      <div 
        className={`fixed flex items-center justify-center pointer-events-none transition-all duration-500 ${isMaximized ? 'inset-0 z-[10000]' : 'inset-0 md:inset-6 py-[70px] md:py-0'}`}
        style={{ zIndex: isMaximized ? 10000 : zIndex }}
      >
        <motion.div
          key={`${id}-${resetTrigger}`} // Force re-render at center on reset
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
            borderColor: isMaximized ? "transparent" : (isFocused ? "rgba(88,166,255,0.6)" : "rgba(88,166,255,0.3)"),
            boxShadow: isMaximized ? "none" : (isFocused ? "0 0 30px rgba(88,166,255,0.15)" : "0 0 10px rgba(0,0,0,0.5)")
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`bg-obsidian border flex flex-col transition-all duration-300 pointer-events-auto ${isMaximized ? 'w-screen h-screen border-none rounded-none' : 'w-full max-w-4xl max-h-[75vh] md:max-h-[80vh] rounded-lg'}`}
        >
          <div 
            onPointerDown={(e) => {
              onFocus();
              dragControls.start(e);
            }}
            className={`bg-white/5 px-4 py-3 flex items-center justify-between border-b select-none cursor-move draggable-handle transition-colors ${isFocused ? 'border-cobalt/50 bg-cobalt/10' : 'border-cobalt/20 bg-white/5'}`}
          >
            <div className="flex items-center gap-3">
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

              {isMobile && !isMaximized && (
                <button 
                  onPointerDown={(e) => {
                    onFocus();
                    dragControls.start(e);
                  }}
                  className="p-2 bg-cobalt/20 border border-cobalt/40 rounded-md active:bg-cobalt/40 active:scale-95 transition-all text-cobalt touch-none"
                >
                  <Move className="w-4 h-4" />
                </button>
              )}

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
          <div className={`flex-grow overflow-auto relative min-h-[300px] ${isMaximized ? 'p-4 md:p-12 bg-black/40' : 'p-8'}`}>
            <div className={`w-full ${isMaximized ? 'max-w-5xl mx-auto min-h-full flex flex-col justify-center' : ''}`}>
              {isLoading && <BootSequence title={title} />}
              {isClosing && <ShutdownSequence />}
              
              <div className={(isLoading || isClosing) ? 'opacity-0 pointer-events-none transition-all duration-300' : 'transition-all duration-500'}>
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const TerminalContent = ({ onToggleCinema, onOpenWindow, onMinimizeSelf, isMobile, onThemeChange }: { onToggleCinema: (active: boolean) => void, onOpenWindow: (id: string) => void, onMinimizeSelf: () => void, isMobile: boolean, onThemeChange: (theme: ThemeMode) => void }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Type /help to begin.']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPendingExecute, setIsPendingExecute] = useState(false);

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '/']
  ];

  const handleCommand = (e?: React.FormEvent, overrideCmd?: string) => {
    if (e) e.preventDefault();
    if (isProcessing) return;
    
    const cmdInput = overrideCmd || input;
    const cmd = cmdInput.toLowerCase().trim();
    if (!cmd) return;

    setHistory(prev => [...prev, `> ${cmdInput}`]);

    if (isPendingExecute) {
       if (cmd === 'y' || cmd === 'yes') {
          setIsPendingExecute(false);
          startExecuteSequence();
       } else {
          setIsPendingExecute(false);
          setHistory(prev => [...prev, 'EXECUTION_ABORTED: Verification failed.', 'System remaining secure.']);
       }
       setInput('');
       return;
    }

    if (cmd === '/excecute' || cmd === '/execute') {
      setIsPendingExecute(true);
      setHistory(prev => [...prev, 
        '!!! CRITICAL_WARNING !!!',
        'Protocol will deploy destructive payload and compromise system integrity.',
        'VERIFY_EXECUTION? [y/n]'
      ]);
    } else if (cmd === '/cancel') {
      setHistory(prev => [...prev, 
        'ABORTING_SEQUENCE: Restoring system stability...', 
        'SYNCING_SECURE_KERNEL... [OK]', 
        'FLUSHING_CORRUPT_BUFFER... [OK]',
        'PROTOCOL_RESET_COMPLETE.'
      ]);
      onToggleCinema(false);
    } else if (cmd === '/about') {
      setHistory(prev => [...prev, 
        'INIT_BIO_HANDSHAKE...', 
        'DECRYPTING_PROFILE_DATA... [OK]', 
        'FETCHING_USER_HISTORY... [OK]',
        'DISPLAYING_PERSONA_FILE.'
      ]);
      onMinimizeSelf();
      onOpenWindow('about');
    } else if (cmd === '/skills') {
      setHistory(prev => [...prev, 
        'SCANNING_TECH_MODULES...', 
        'MAPPING_SKILL_NODES... [OK]', 
        'LINKING_ACCREDITATION_DB... [OK]',
        'ACCESSING_TECHNICAL_ECOSYSTEM.'
      ]);
      onMinimizeSelf();
      onOpenWindow('skills');
    } else if (cmd === '/projects') {
      setHistory(prev => [...prev, 
        'LOADING_MISSION_ARCHIVE...', 
        'CALIBRATING_DATA_VISUALIZERS... [OK]', 
        'SYNCING_REALTIME_METRICS... [OK]',
        'OPENING_ACTIVE_MISSIONS.'
      ]);
      onMinimizeSelf();
      onOpenWindow('projects');
    } else if (cmd === '/connect') {
      setHistory(prev => [...prev, 
        'ESTABLISHING_COMM_LINK...', 
        'OPENING_SECURE_MAIL_GATEWAY... [OK]', 
        'VERIFYING_HANDSHAKE_ID... [OK]',
        'COMMUNICATION_LINK_ESTABLISHED.'
      ]);
      onMinimizeSelf();
      onOpenWindow('contact');
    } else if (cmd === '/git') {
      setHistory(prev => [...prev, 
        'INIT_BRIDGE://GITHUB...', 
        'PULLING_REMOTE_MANIFEST... [OK]', 
        'SYNCING_REPOS... [OK]',
        'EXTERNAL_NODE_ACCESSED.'
      ]);
      onMinimizeSelf();
      onOpenWindow('external-github');
    } else if (cmd === '/linkedin') {
      setHistory(prev => [...prev, 
        'INIT_BRIDGE://LINKEDIN...', 
        'FETCHING_NETWORK_STATUS... [OK]', 
        'SYNCING_PROFESSIONAL_GRAPH... [OK]',
        'EXTERNAL_NODE_ACCESSED.'
      ]);
      onMinimizeSelf();
      onOpenWindow('external-linkedin');
    } else if (cmd === '/mail') {
      setHistory(prev => [...prev, 
        'INIT_BRIDGE://MAIL...', 
        'OPENING_SMTP_ENVELOPE... [OK]', 
        'FLUSHING_OUTBOX... [OK]',
        'EXTERNAL_NODE_ACCESSED.'
      ]);
      onMinimizeSelf();
      onOpenWindow('external-email');
    } else if (cmd === '/clear') {
      setHistory(['Terminal cleared.']);
    } else if (cmd === '/help') {
      setHistory(prev => [...prev, 
        '--- AVAILABLE_SYSTEM_PROTOCOLS ---',
        '/about     - Display personal mission profile',
        '/skills    - Access technical ecosystem database',
        '/projects  - Open active mission archives',
        '/connect   - Initiate secure communication link',
        '/git       - Access external GitHub repositories',
        '/linkedin  - Sync with professional network',
        '/mail      - Open secure mail gateway',
        '/status    - Run system diagnostics',
        '/happy     - Optimize UI for dopamine levels',
        '/day       - Simulate high-luminance solar mode',
        '/flower    - Initiate botanical bloom (Amethyst)',
        '/dev       - Inject Matrix developer overlay',
        '/clear     - Flush terminal history buffer',
        '/cancel    - Revert system to Silicon Obsidian state',
        '-----------------------------------',
        '/excecute  - [WARNING] Deploy destructive payload'
      ]);
    } else if (cmd === '/status') {
       setHistory(prev => [...prev, 
         '--- SYSTEM_DIAGNOSTICS ---',
         'HOST: Nekhaljames', 
         'SYSTEM_STATE: OPERATIONAL', 
         'ARCH: ARM64/x86_64 Hybrid',
         'KERNEL_INTEGRITY: SECURE',
         'MEMORY_UTILIZATION: 42%',
         'ACTIVE_NODES: 7/7 ONLINE'
       ]);
    } else if (cmd === '/happy') {
      setHistory(prev => [...prev, 'OPTIMIZING_DOPAMINE_LEVELS... [OK]', 'ENABLING_EMOTIONAL_OVERRIDE... [OK]', 'UI_RECALIBRATED: HAPPY_MODE_ACTIVE.']);
      onThemeChange('happy');
    } else if (cmd === '/day') {
      setHistory(prev => [...prev, 'SIMULATING_SOLAR_EXPOSURE...', 'ADJUSTING_LUMINESCENCE... [OK]', 'UI_RECALIBRATED: LIGHT_MODE_ACTIVE.']);
      onThemeChange('day');
    } else if (cmd === '/flower') {
      setHistory(prev => [...prev, 'INIT_BOTANICAL_SEQUENCE...', 'BLOOMING_VIRTUAL_FLORA... [OK]', 'TEMPORARY_MODIFICATION_ACTIVE.']);
      onThemeChange('flower');
    } else if (cmd === '/dev') {
      setHistory(prev => [...prev, 'ACCESSING_DEVELOPER_KERNEL...', 'INJECTING_MATRIX_OVERLAY... [OK]', 'UI_RECALIBRATED: DEV_MODE_ACTIVE.']);
      onThemeChange('dev');
    } else {
      setHistory(prev => [...prev, `Command not found: ${cmd}`]);
    }
    setInput('');
  };

  const startExecuteSequence = () => {
    setIsProcessing(true);
    setHistory(prev => [...prev, 
      'VERIFICATION_CONFIRMED. [OK]',
      'CRITICAL_COMMAND_ISSUED: Executing destructive sequence...', 
      'WARNING: Accessing kernel level overrides...', 
      'PROTOCOL_00_INIT: [....................] 0%'
    ]);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      const barLength = Math.floor(progress / 5);
      const bar = '#'.repeat(barLength).padEnd(20, '.');
      
      setHistory(prev => {
        const newHistory = [...prev];
        const lastIdx = newHistory.length - 1;
        newHistory[lastIdx] = `PROTOCOL_00_INIT: [${bar}] ${progress}%`;
        return newHistory;
      });

      if (progress >= 100) {
        clearInterval(interval);
        setHistory(prev => [...prev, 'PAYLOAD_DEPLOYED: System stability lost.', 'INITIALIZING_BLACKOUT...']);
        setTimeout(() => {
          onToggleCinema(true);
          setIsProcessing(false);
        }, 800);
      }
    }, 80);
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
    <div className="flex flex-col gap-2">
      {isMobile && (
        <div className="flex flex-col gap-1 mb-2 bg-black/40 p-1.5 rounded-lg border border-cobalt/10">
          {keyboardRows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-1">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => setInput(prev => prev + key.toLowerCase())}
                  className="flex-1 mono text-[10px] h-9 bg-cobalt/10 border border-cobalt/20 text-cobalt hover:bg-cobalt/20 active:scale-95 transition-all rounded uppercase flex items-center justify-center font-bold"
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
          <div className="flex justify-center gap-1 mt-1">
            <button
              onClick={() => setInput(prev => prev.slice(0, -1))}
              className="px-4 mono text-[10px] h-9 bg-red-900/20 border border-red-500/30 text-red-400 rounded active:scale-95 transition-all text-center flex items-center justify-center"
            >
              DEL
            </button>
            <button
              onClick={() => setInput(prev => prev + ' ')}
              className="flex-[2] mono text-[10px] h-9 bg-cobalt/5 border border-cobalt/20 text-cobalt rounded active:scale-95 transition-all flex items-center justify-center"
            >
              SPACE
            </button>
            <button
              onClick={() => handleCommand()}
              className="px-4 mono text-[10px] h-9 bg-cobalt/30 border border-cobalt/50 text-white font-bold rounded active:scale-95 transition-all flex items-center justify-center"
            >
              EXEC [ENTER]
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleCommand} className="bg-white/5 px-4 h-12 flex items-center gap-2 border border-cobalt/20 rounded">
         <span className="text-cobalt text-xs font-bold">$</span>
         <input
            type="text"
            className="bg-transparent border-none outline-none flex-grow font-mono text-xs text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command..."
         />
      </form>
    </div>
  </div>
);
};

export default function App() {
  const [activeWindows, setActiveWindows] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [closingWindows, setClosingWindows] = useState<string[]>([]);
  const [theme, setTheme] = useState<ThemeMode>('obsidian');
  const [blackoutStage, setBlackoutStage] = useState<'idle' | 'active' | 'recovering'>('idle');
  const [showPreviews, setShowPreviews] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [resetTriggers, setResetTriggers] = useState<{ [key: string]: number }>({});
  const lastTapRef = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const menuItems = [
    { id: 'about', label: 'ABOUT', icon: <Activity className="w-4 h-4" /> },
    { id: 'skills', label: 'SKILLS', icon: <Cpu className="w-4 h-4" /> },
    { id: 'projects', label: 'PROJECTS', icon: <Box className="w-4 h-4" /> },
    { id: 'contact', label: 'REACH OUT', icon: <Radio className="w-4 h-4" /> },
    { id: 'terminal', label: 'TERMINAL', icon: <TerminalIcon className="w-4 h-4" /> },
  ];

  const handleCriticalToggle = (active: boolean) => {
    if (active) {
      setBlackoutStage('active');
      setTimeout(() => {
        setTheme('critical');
        setBlackoutStage('recovering');
        setTimeout(() => setBlackoutStage('idle'), 2000);
      }, 3000);
    } else {
      setTheme('obsidian');
    }
  };

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
  };

  const handleMenuClick = (id: string) => {
    const now = Date.now();
    const lastTap = lastTapRef.current[id] || 0;
    
    if (now - lastTap < 300) {
      // Double tap detected
      setResetTriggers(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }
    lastTapRef.current[id] = now;

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
    <ThemeContext.Provider value={{ theme }}>
      <main 
        className={`mission-control-grid overflow-hidden selection:bg-cobalt selection:text-black transition-all duration-700 ease-in-out ${theme === 'critical' ? 'critical-failure' : ''} ${theme === 'happy' ? 'happy-theme' : ''} ${theme === 'day' ? 'day-theme' : ''} ${theme === 'flower' ? 'flower-theme' : ''}`}
        style={{
          gridTemplateColumns: isMobile ? '1fr' : (showPreviews ? '80px 1fr 300px' : '80px 1fr 0px'),
          gridTemplateRows: isMobile ? '60px 1fr 60px' : (showPreviews ? '60px 1fr 280px' : '60px 1fr 0px'),
        }}
      >
        <ScanningCursor />
        {theme === 'flower' && <FlowerBloom />}
        {theme === 'dev' && <MatrixRain />}

      {/* HEADER BAR */}
      <header className={`grid-cell flex justify-between items-center px-4 md:px-6 border-b border-cobalt ${isMobile ? 'col-span-1' : 'col-span-3'}`}>
        <div className="mono flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] animate-pulse ${theme === 'critical' ? 'bg-red-600' : 'bg-cobalt'}`} />
          {theme === 'critical' ? (
            <span className="text-red-600 font-bold animate-pulse text-[10px] md:text-sm">FAILURE: PANIC</span>
          ) : theme === 'happy' ? (
            <span className="text-yellow-400 font-bold text-[10px] md:text-sm animate-bounce">EMOTION: HAPPY</span>
          ) : theme === 'day' ? (
            <span className="text-blue-600 font-bold text-[10px] md:text-sm">STATE: NOON_DAY</span>
          ) : theme === 'dev' ? (
            <span className="text-green-500 font-bold text-[10px] md:text-sm animate-pulse">MODE: DEV_CORE</span>
          ) : (
            <span className="text-[10px] md:text-sm">{isMobile ? 'OP_STATE' : 'SYSTEM_STATE: OPERATIONAL'}</span>
          )}
        </div>
        {isMobile && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
            className="flex-grow flex justify-center"
          >
            <div className="bg-cobalt/10 border border-cobalt/30 px-2 py-0.5 rounded text-[8px] uppercase tracking-widest text-cobalt flex items-center gap-1.5 animate-pulse">
              <span className="w-1 h-1 bg-cobalt rounded-full" />
              Laptop/Desktop Preferred
            </div>
          </motion.div>
        )}
        <div className="mono hidden lg:block">
          COORD: 9.9312° N, 76.2673° E (KOCHI)
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          {!isMobile && (
            <button 
              onClick={() => setShowPreviews(!showPreviews)}
              className={`mono text-[9px] md:text-[10px] px-2 md:px-3 py-1 border transition-all flex items-center gap-2 group ${showPreviews ? 'bg-cobalt/20 border-cobalt text-white' : 'border-cobalt/30 text-cobalt/60 hover:border-cobalt/60'}`}
            >
              <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${showPreviews ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-slate-600'}`} />
              {showPreviews ? 'LIVE_FEEDS: ACTIVE' : 'LIVE_FEEDS: OFFLINE'}
            </button>
          )}
          {!isMobile && (
            <div className="mono text-rust">
              SEC_ARCH: AES-256-GCM VERIFIED
            </div>
          )}
        </div>
      </header>

      {/* MISSION MENU SIDEBAR (HIDDEN ON MOBILE, MOVED TO FOOTER) */}
      {!isMobile && (
        <aside className="grid-cell row-span-2 flex flex-col items-center pt-8 border-r border-cobalt/20 overflow-visible">
          <div className="mono [writing-mode:vertical-rl] rotate-180 mb-10 opacity-60">MISSION_MENU</div>
          <nav className="flex flex-col gap-6 w-full px-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`mono text-[10px] flex flex-col items-center gap-2 p-3 transition-all group ${activeWindows.includes(item.id) && !minimizedWindows.includes(item.id) ? 'text-white' : 'text-cobalt/60'}`}
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
      )}

      {/* HERO SECTION */}
      <section className={`grid-cell flex flex-col justify-center overflow-auto ${isMobile ? 'p-6' : 'p-12'}`}>
        <Hero />
      </section>

      {/* SKILLS PREVIEW SIDEBAR */}
      {!isMobile && (
        <aside 
          className={`grid-cell border-cobalt/10 overflow-hidden relative transition-all duration-700 ${!showPreviews ? 'opacity-0 invisible h-0 p-0 overflow-hidden' : 'opacity-100 visible border-l border-t md:border-t-0'}`}
        >
          {showPreviews && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full"
            >
              <BentoGrid />
            </motion.div>
          )}
        </aside>
      )}

      {/* PROJECT PREVIEW ROW */}
      {!isMobile && (
        <section 
          className={`grid-cell overflow-hidden relative transition-all duration-700 ${!showPreviews ? 'opacity-0 invisible h-0 p-0 overflow-hidden' : `opacity-100 visible border-t border-cobalt/20 col-span-2`}`}
        >
          {showPreviews && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="h-full"
            >
              <ProjectSection />
            </motion.div>
          )}
        </section>
      )}

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
        resetTrigger={resetTriggers['about'] || 0}
        isMobile={isMobile}
      >
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 border-2 border-cobalt/20 bg-cobalt/5 flex items-center justify-center shrink-0">
               <Github className="w-16 h-16 opacity-20" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-white uppercase tracking-tighter">Nekhaljames</h2>
              <p className="mono text-rust text-sm">AI Student | Developer | IoT Enthusiast</p>
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
                 <div className="text-sm">Idukki, Kerala</div>
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
        resetTrigger={resetTriggers['skills'] || 0}
        isMobile={isMobile}
      >
        <div className="flex flex-col gap-10 pt-4">
          {/* Top Level Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* COLUMN 1: LANGUAGES */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-rust/40 pb-2">
                <div className="w-1.5 h-4 bg-rust" />
                <h3 className="mono text-rust text-lg font-bold">PRO_STACK</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { n: 'Rust', p: 95, color: 'bg-rust' },
                  { n: 'Python', p: 90, color: 'bg-cobalt' },
                  { n: 'C/C++', p: 85, color: 'bg-cobalt' },
                  { n: 'TypeScript', p: 92, color: 'bg-cobalt' },
                  { n: 'Java', p: 75, color: 'bg-cobalt' },
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

            {/* COLUMN 2: HARDWARE & EDGE */}
            <div className="space-y-6">
               <div className="flex items-center gap-2 border-b border-cobalt/40 pb-2">
                 <div className="w-1.5 h-4 bg-cobalt" />
                 <h3 className="mono text-cobalt text-lg font-bold">SYSTEM_INTEL</h3>
               </div>
               <div className="space-y-3">
                 {[
                   { n: 'YOLOv8 Vision', d: 'Edge-AI object detection pipelines' },
                   { n: 'OpenCV', d: 'Compute vision & neural mapping' },
                   { n: 'Raspberry Pi', d: 'High-performance SBC integration' },
                   { n: 'Networking', d: 'Distributed systems & communication' },
                   { n: 'IoT Architecture', d: 'Hardware-to-cloud integration' }
                 ].map(s => (
                   <GlitchCard key={s.n}>
                     <div className="p-4 bg-white/5 border border-white/5 group">
                        <div className="text-sm font-bold group-hover:text-cobalt transition-colors">{s.n}</div>
                        <div className="mono text-[10px] opacity-50 mt-1 leading-tight">{s.d}</div>
                     </div>
                   </GlitchCard>
                 ))}
               </div>
            </div>

            {/* COLUMN 3: DEPLOYMENT & TOOLS */}
            <div className="space-y-6">
               <div className="flex items-center gap-2 border-b border-slate-500/40 pb-2">
                 <div className="w-1.5 h-4 bg-slate-500" />
                 <h3 className="mono text-slate-500 text-lg font-bold">INFRA_STACK</h3>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  {[
                    { n: 'Linux Kernel', i: <Cpu /> },
                    { n: 'Docker', i: <Box /> },
                    { n: 'Git Control', i: <Github /> },
                    { n: 'QUIC/UDP', i: <Activity /> },
                    { n: 'ESP32/AVR', i: <Cpu /> },
                    { n: 'Vite/React', i: <Box /> }
                  ].map(s => (
                    <GlitchCard key={s.n}>
                       <div className="p-3 bg-white/5 border border-white/5 flex flex-col items-center gap-2 text-center h-full">
                          <div className="opacity-40 text-xs">{s.i}</div>
                          <div className="mono text-[9px] uppercase font-bold">{s.n}</div>
                       </div>
                    </GlitchCard>
                  ))}
               </div>

               <div className="mt-8 p-4 border border-rust/10 bg-rust/5 rounded relative overflow-hidden">
                  <div className="mono text-[9px] text-rust mb-2 font-bold tracking-widest">CURRENT_RESEARCH_VEC</div>
                  <div className="text-[11px] opacity-80 leading-relaxed font-mono italic">
                     Exploring High-Performance Computing (HPC) bridges for distributed AI inference on RISC-V architectures.
                  </div>
                  <div className="absolute top-0 right-0 p-1">
                     <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                        <TerminalIcon className="w-8 h-8 opacity-5 text-rust" />
                     </motion.div>
                  </div>
               </div>
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
        resetTrigger={resetTriggers['projects'] || 0}
        isMobile={isMobile}
      >
        <div className="flex flex-col gap-8 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               { 
                 t: 'SpaceOrb (V7.6 Node)', 
                 d: 'Aerospace-grade data management system designed for Space Data Centers with 90-minute communication blackouts.',
                 tags: ['RUST', 'QUIC', 'ROCKSDB'],
                 id: 'MISSION_SO_76',
                 color: 'border-cobalt'
               },
               { 
                 t: 'Thalam AI', 
                 d: 'AI-powered cultural intelligence platform for mapping Kerala traditions via "Cultural DNA Engine".',
                 tags: ['NEURAL_MAP', 'PYTHON', 'D3.JS'],
                 id: 'MISSION_TH_01',
                 color: 'border-rust'
               },
               { 
                 t: 'FarmGrid', 
                 d: 'Full-stack marketplace connecting local Kerala farmers with logistics hub networks.',
                 tags: ['VITE', 'REACT', 'GO'],
                 id: 'MISSION_FG_88',
                 color: 'border-slate-500'
               },
               { 
                 t: 'AeroCast', 
                 d: 'Weather probability analyzer using 40 years of NASA POWER API data.',
                 tags: ['DATA_OPS', 'API_INTEG', 'HPC'],
                 id: 'MISSION_AC_22',
                 color: 'border-cobalt'
               }
             ].map(p => (
               <GlitchCard key={p.t}>
                 <div className={`p-6 blueprint-card hover:bg-white/5 transition-all h-full flex flex-col gap-4 border-l-2 ${p.color}`}>
                    <div className="flex justify-between items-start">
                       <h4 className="text-xl font-black text-white tracking-tighter uppercase">{p.t}</h4>
                       <span className="mono text-[8px] opacity-40">{p.id}</span>
                    </div>
                    <p className="mono text-[11px] opacity-60 leading-relaxed flex-grow">{p.d}</p>
                    <div className="flex gap-2 min-h-6">
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

          <div className="flex justify-center pt-6 border-t border-white/5">
             <GlitchCard>
                <button 
                  onClick={() => handleMenuClick('external-github')}
                  className="px-10 py-5 bg-cobalt/10 border border-cobalt/40 hover:bg-cobalt/20 hover:border-cobalt transition-all mono text-sm font-bold flex items-center gap-3 group"
                >
                  <Box className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  ACCESS_ALL_REPOSITORIES
                  <div className="text-[10px] bg-cobalt/20 px-2 py-0.5 ml-2">GITHUB.EXE</div>
                </button>
             </GlitchCard>
          </div>
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
        resetTrigger={resetTriggers['contact'] || 0}
        isMobile={isMobile}
      >
        <div className="flex flex-col items-center justify-center py-12 space-y-8">
           <div className="text-center space-y-2">
             <h3 className="text-3xl font-extrabold text-white">REACH OUT</h3>
             <p className="mono text-rust">Secure Handshake Protocol Mandatory</p>
           </div>
           <div className="flex flex-wrap justify-center gap-6">
              <GlitchCard>
                <button 
                  onClick={() => handleMenuClick('external-email')}
                  className="px-8 py-6 border border-cobalt/30 hover:border-cobalt bg-cobalt/5 mono text-xs transition-all hover:scale-105 flex flex-col items-center gap-3 w-48"
                >
                  <Mail className="w-6 h-6 text-rust" />
                  <span>ENCRYPTED_MAIL</span>
                  <div className="text-[9px] opacity-40 uppercase truncate w-full">nekhaljames@gmail.com</div>
                </button>
              </GlitchCard>
              <GlitchCard>
                <button 
                  onClick={() => handleMenuClick('external-github')}
                  className="px-8 py-6 border border-cobalt/30 hover:border-cobalt bg-cobalt/5 mono text-xs transition-all hover:scale-105 flex flex-col items-center gap-3 w-48"
                >
                  <Github className="w-6 h-6 text-cobalt" />
                  <span>GITHUB_NODE</span>
                  <div className="text-[9px] opacity-40 uppercase">Nekhal-james</div>
                </button>
              </GlitchCard>
              <GlitchCard>
                <button 
                  onClick={() => handleMenuClick('external-linkedin')}
                  className="px-8 py-6 border border-cobalt/30 hover:border-cobalt bg-cobalt/5 mono text-xs transition-all hover:scale-105 flex flex-col items-center gap-3 w-48"
                >
                  <Linkedin className="w-6 h-6 text-cobalt" />
                  <span>LINKEDIN_SYNC</span>
                  <div className="text-[9px] opacity-40 uppercase">nekhal-james</div>
                </button>
              </GlitchCard>
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
        resetTrigger={resetTriggers['terminal'] || 0}
        isMobile={isMobile}
      >
        <TerminalContent 
          onToggleCinema={handleCriticalToggle} 
          onOpenWindow={handleMenuClick}
          onMinimizeSelf={() => handleMinimize('terminal')}
          isMobile={isMobile}
          onThemeChange={handleThemeChange}
        />
      </MissionWindow>

      <footer className="fixed bottom-0 left-0 w-full h-[64px] md:h-[40px] bg-obsidian/80 backdrop-blur-md border-t border-cobalt/30 flex items-center px-2 md:px-5 z-[100] safe-area-bottom">
        <div className="flex items-center gap-4 w-full h-full relative overflow-hidden">
          <div className="mono text-[10px] opacity-50 shrink-0 hidden md:block text-cobalt">TASK_MANAGER:</div>
          
          <div className="flex items-center w-full justify-around md:justify-start h-full">
            {isMobile && menuItems.map(item => {
               const isActive = activeWindows.includes(item.id);
               const isFocused = focusedWindow === item.id;
               const isMinimized = minimizedWindows.includes(item.id);

               return (
                 <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1,
                    y: 0,
                    backgroundColor: isFocused ? "rgba(88,166,255,0.1)" : "transparent"
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleMenuClick(item.id)}
                  className="flex flex-col items-center justify-center relative flex-1 h-full gap-1 transition-all rounded-lg"
                >
                  <div className={`transition-all duration-300 ${isFocused ? 'text-cobalt scale-110 drop-shadow-[0_0_8px_rgba(88,166,255,0.5)]' : 'text-cobalt/40'}`}>
                    {item.icon}
                  </div>
                  <span className={`mono text-[7px] uppercase tracking-[0.1em] transition-colors ${isFocused ? 'text-white' : 'text-cobalt/30'}`}>
                    {item.label.split(' ')[0]}
                  </span>
                  
                  {/* Status Indicator */}
                  <div className="absolute bottom-1 flex gap-0.5 justify-center items-center h-1 w-full">
                    {isActive && (
                      <motion.div 
                        layoutId={`indicator-${item.id}`}
                        className={`h-0.5 rounded-full transition-all duration-300 ${isFocused ? 'w-4 bg-cobalt' : 'w-1 bg-cobalt/30'} ${isMinimized ? 'bg-yellow-500/50' : ''}`}
                      />
                    )}
                  </div>
                </motion.button>
               );
            })}

            {!isMobile && activeWindows.length === 0 && (
              <div className="mono text-[8px] opacity-30 select-none">NO_ACTIVE_PROCESSES</div>
            )}
            {!isMobile && activeWindows.map((id) => {
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
          </div>

          <div className="absolute right-0 top-0 h-full flex items-center pr-4 pointer-events-none hidden md:flex">
            <div className="mono text-[10px] opacity-40">TERMINAL_INPUT: /_</div>
          </div>
        </div>
      </footer>

      <MissionWindow 
        id="external-github"
        title="EXTERNAL_NODE://GITHUB.COM/NEKHAL-JAMES" 
        isOpen={activeWindows.includes('external-github')} 
        onClose={() => handleClose('external-github')}
        onMinimize={handleMinimize}
        minimizedWindows={minimizedWindows}
        isLoading={loadingStates['external-github']}
        isClosing={closingWindows.includes('external-github')}
        isFocused={focusedWindow === 'external-github'}
        onFocus={() => handleFocus('external-github')}
        zIndex={90 + activeWindows.indexOf('external-github')}
        icon={<Github className="w-5 h-5 text-cobalt" />}
      >
        <div className="p-12 flex flex-col items-center justify-center h-full space-y-8 text-center bg-[radial-gradient(circle_at_center,rgba(88,166,255,0.05)_0%,transparent_70%)]">
           <div className="relative">
              <Github className="w-20 h-20 text-cobalt opacity-20" />
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
                <h3 className="text-2xl font-bold tracking-tighter uppercase">LINK_ESTABLISHED: GITHUB</h3>
                <div className="mono text-cobalt text-xs animate-pulse">NODE_STATUS: DISCOVERABLE</div>
              </div>

              <div className="py-4 border-y border-cobalt/20">
                <div className="mono text-[10px] opacity-40 mb-1">REPOSITORY_OWNER:</div>
                <div className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase selection:bg-cobalt selection:text-black">
                  Nekhal-james
                </div>
              </div>

              <p className="mono text-xs opacity-60 max-w-md mx-auto leading-relaxed">
                External tunneling restricted by provider security protocols. 
                Execute the navigation command below to sync with the primary GitHub node.
              </p>

              <GlitchCard className="mt-8">
                <a 
                  href="https://github.com/Nekhal-james" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-12 py-5 bg-cobalt/10 border border-cobalt/40 hover:bg-cobalt/20 hover:border-cobalt transition-all mono text-sm font-bold shadow-[0_0_20px_rgba(88,166,255,0.1)]"
                >
                  EXECUTE: OPEN_IN_NEW_TAB
                </a>
              </GlitchCard>
           </div>
        </div>
      </MissionWindow>

      <MissionWindow 
        id="external-linkedin"
        title="EXTERNAL_NODE://LINKEDIN.COM/IN/NEKHAL-JAMES" 
        isOpen={activeWindows.includes('external-linkedin')} 
        onClose={() => handleClose('external-linkedin')}
        onMinimize={handleMinimize}
        minimizedWindows={minimizedWindows}
        isLoading={loadingStates['external-linkedin']}
        isClosing={closingWindows.includes('external-linkedin')}
        isFocused={focusedWindow === 'external-linkedin'}
        onFocus={() => handleFocus('external-linkedin')}
        zIndex={90 + activeWindows.indexOf('external-linkedin')}
        icon={<Linkedin className="w-5 h-5 text-cobalt" />}
      >
        <div className="p-12 flex flex-col items-center justify-center h-full space-y-8 text-center bg-[radial-gradient(circle_at_center,rgba(88,166,255,0.05)_0%,transparent_70%)]">
           <div className="relative">
              <Linkedin className="w-20 h-20 text-cobalt opacity-20" />
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
                <h3 className="text-2xl font-bold tracking-tighter uppercase">LINK_ESTABLISHED: LINKEDIN</h3>
                <div className="mono text-cobalt text-xs animate-pulse">CONNECTION_STRENGTH: HIGH</div>
              </div>

              <div className="py-4 border-y border-cobalt/20">
                <div className="mono text-[10px] opacity-40 mb-1">PROFILE_IDENTIFIER:</div>
                <div className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase selection:bg-cobalt selection:text-black">
                  nekhal-james
                </div>
              </div>

              <p className="mono text-xs opacity-60 max-w-md mx-auto leading-relaxed">
                LinkedIn protocol prevents secure embedding.
                Execute the external synchronization command below to view the full profile node.
              </p>

              <GlitchCard className="mt-8">
                <a 
                  href="https://www.linkedin.com/in/nekhal-james/" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-12 py-5 bg-cobalt/10 border border-cobalt/40 hover:bg-cobalt/20 hover:border-cobalt transition-all mono text-sm font-bold shadow-[0_0_20px_rgba(88,166,255,0.1)]"
                >
                  EXECUTE: OPEN_IN_NEW_TAB
                </a>
              </GlitchCard>
           </div>
        </div>
      </MissionWindow>

      <MissionWindow 
        id="external-email"
        title="COMMUNICATION_TERMINAL://NEKHALJAMES@GMAIL.COM" 
        isOpen={activeWindows.includes('external-email')} 
        onClose={() => handleClose('external-email')}
        onMinimize={handleMinimize}
        minimizedWindows={minimizedWindows}
        isLoading={loadingStates['external-email']}
        isClosing={closingWindows.includes('external-email')}
        isFocused={focusedWindow === 'external-email'}
        onFocus={() => handleFocus('external-email')}
        zIndex={90 + activeWindows.indexOf('external-email')}
        icon={<Mail className="w-5 h-5 text-rust" />}
      >
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
                  nekhaljames@gmail.com
                </div>
              </div>

              <p className="mono text-xs opacity-60 max-w-md mx-auto leading-relaxed">
                System is ready to transmit data packet to the specified primary node.
                Execute the mailto Protocol by clicking the command below.
              </p>

              <GlitchCard className="mt-8">
                <a 
                  href="mailto:nekhaljames@gmail.com" 
                  className="inline-block px-12 py-5 bg-rust/10 border border-rust/40 hover:bg-rust/20 hover:border-rust transition-all mono text-sm font-bold shadow-[0_0_20px_rgba(255,87,34,0.1)]"
                >
                  EXECUTE: MAILTO_PROTOCOL
                </a>
              </GlitchCard>
           </div>
        </div>
      </MissionWindow>

      {/* BLACKOUT_OVERLAY */}
      <AnimatePresence>
        {blackoutStage !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center p-6 text-center"
          >
            {blackoutStage === 'active' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-6"
              >
                <div className="text-red-600 text-3xl md:text-5xl font-black tracking-tight mb-4">
                  <GlitchText>CRITICAL_SYSTEM_FAILURE</GlitchText>
                </div>
                <div className="mono text-red-500 text-sm md:text-xl tracking-[0.2em]">
                  <GlitchText>KERNEL_PANIC_0xFF00AD // CORE_DUMP_PROCEEDING</GlitchText>
                </div>
                <div className="w-64 h-1 bg-red-900/40 relative mx-auto overflow-hidden mt-8">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="absolute h-full bg-red-600 shadow-[0_0_15px_#ff0000]"
                  />
                </div>
              </motion.div>
            )}
            {blackoutStage === 'recovering' && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: 4 }}
                  className="mono text-red-600 font-bold"
               >
                 <GlitchText>SYSTEM_MUTATING... RELOADING_AS_PANIC_NODE_01</GlitchText>
               </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  </ThemeContext.Provider>
  );
}
