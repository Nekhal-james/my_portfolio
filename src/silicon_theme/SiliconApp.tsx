import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Box, 
  Activity, 
  Radio, 
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';

// Context
import { ThemeContext, ThemeMode } from './context/ThemeContext';

// UI Components
import ScanningCursor from './components/UI/ScanningCursor';
import GlitchText from './components/UI/GlitchText';

// Visual Components
import FlowerBloom from './components/Visuals/FlowerBloom';
import MatrixRain from './components/Visuals/MatrixRain';
import HardwareVisual from './components/Visuals/HardwareVisual';

// Section Components
import Hero from './components/Sections/Hero';
import BentoGrid from './components/Sections/BentoGrid';
import ProjectSection from './components/Sections/ProjectSection';

// Window Components
import MissionWindow from './components/Windows/MissionWindow';
import TerminalContent from './components/Windows/TerminalContent';
import AboutContent from './components/Windows/AboutContent';
import SkillsContent from './components/Windows/SkillsContent';
import ProjectsContent from './components/Windows/ProjectsContent';
import ContactContent from './components/Windows/ContactContent';
import ExternalNodeContent from './components/Windows/ExternalNodeContent';
import EmailNodeContent from './components/Windows/EmailNodeContent';

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
  
  // Telemetry & Metrics State
  const [telemetry, setTelemetry] = useState({
    mousePos: { x: 0, y: 0 },
    clicks: 0,
    startTime: Date.now(),
    elapsed: 0,
    windowStats: {} as { [key: string]: { timeSpent: number, lastClosed: string | null, lastOpenedAt: number | null } },
    metrics: {
      cpu: Array(20).fill(20),
      ram: Array(20).fill(45),
      disk: Array(20).fill(12),
      net: Array(20).fill(5)
    },
    activitySpikes: { cpu: 0, ram: 0, disk: 0, net: 0 }
  });

  const [lastActivity, setLastActivity] = useState(Date.now());

  const [selectedMetric, setSelectedMetric] = useState<'cpu' | 'ram' | 'disk' | 'net'>('cpu');

  const triggerSystemSpike = (load: { cpu?: number, ram?: number, disk?: number, net?: number }) => {
    setLastActivity(Date.now());
    setTelemetry(prev => ({
      ...prev,
      activitySpikes: {
        cpu: Math.min(60, prev.activitySpikes.cpu + (load.cpu || 0)),
        ram: Math.min(40, prev.activitySpikes.ram + (load.ram || 0)),
        disk: Math.min(80, prev.activitySpikes.disk + (load.disk || 0)),
        net: Math.min(90, prev.activitySpikes.net + (load.net || 0)),
      }
    }));
  };

  // Telemetry Effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setLastActivity(Date.now());
      setTelemetry(prev => ({ ...prev, mousePos: { x: e.clientX, y: e.clientY } }));
    };
    const handleClick = () => {
      setLastActivity(Date.now());
      setTelemetry(prev => ({ ...prev, clicks: prev.clicks + 1 }));
      triggerSystemSpike({ cpu: 1.5, net: 1 }); // Subtle click spike
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    const interval = setInterval(() => {
      setTelemetry(prev => {
        const now = Date.now();
        const isIdle = (now - lastActivity) > 4000;
        
        // Dynamic Load Calculation
        const windowLoad = activeWindows.length * 15; 
        
        // 1. CPU: Reacts to mouse speed + window load + random jitter
        const mouseDelta = Math.abs(prev.mousePos.x - lastActivity) % 10; // Simplified delta proxy
        const cpuBase = isIdle ? 15 : 25 + windowLoad + mouseDelta;
        
        // 2. RAM: Persistent, scales with windows, slight leak over time
        const ramBase = 35 + windowLoad + (Math.min(10, prev.elapsed / 60)); // 0.1% leak per minute
        
        // 3. DISK: Correlates with Network (writes) + Window Operations
        const diskBase = isIdle ? 2 : 5 + (prev.activitySpikes.net * 0.3);
        
        // 4. NETWORK: Heartbeat (every 5s) + Active Spikes
        const heartbeat = (now % 5000 < 1000) ? 5 : 0;
        const netBase = isIdle ? heartbeat : 8 + heartbeat;

        const updateMetric = (arr: number[], target: number, variance: number, spike: number, isRAM = false) => {
          const v = isIdle ? variance * 0.3 : variance;
          const noise = (Math.random() * v - v/2);
          const currentSpike = isRAM ? 0 : spike;
          const newVal = Math.max(0, Math.min(99, target + noise + currentSpike));
          return [...arr.slice(1), newVal];
        };

        const newSpikes = {
          cpu: Math.max(0, prev.activitySpikes.cpu * 0.6),
          ram: Math.max(0, prev.activitySpikes.ram * 0.98), 
          disk: Math.max(0, prev.activitySpikes.disk * 0.4),
          net: Math.max(0, prev.activitySpikes.net * 0.3),
        };

        return {
          ...prev,
          elapsed: Math.floor((now - prev.startTime) / 1000),
          activitySpikes: newSpikes,
          metrics: {
            cpu: updateMetric(prev.metrics.cpu, cpuBase, 12, prev.activitySpikes.cpu), 
            ram: updateMetric(prev.metrics.ram, ramBase, 2, 0, true), 
            disk: updateMetric(prev.metrics.disk, diskBase, 8, prev.activitySpikes.disk), 
            net: updateMetric(prev.metrics.net, netBase, 15, prev.activitySpikes.net)  
          }
        };
      });
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      clearInterval(interval);
    };
  }, [lastActivity, activeWindows.length]);

  // Window Timing Logic
  useEffect(() => {
    const updateStats = () => {
      setTelemetry(prev => {
        const newStats = { ...prev.windowStats };
        const now = Date.now();

        // Check for newly opened windows
        activeWindows.forEach(id => {
          if (!newStats[id]) {
            newStats[id] = { timeSpent: 0, lastClosed: null, lastOpenedAt: now };
          } else if (newStats[id].lastOpenedAt === null) {
             newStats[id].lastOpenedAt = now;
          }
        });

        return { ...prev, windowStats: newStats };
      });
    };
    updateStats();
  }, [activeWindows]);

  useEffect(() => {
     const interval = setInterval(() => {
       if (focusedWindow) {
         setTelemetry(prev => {
           const stats = { ...prev.windowStats };
           if (stats[focusedWindow]) {
             stats[focusedWindow].timeSpent += 1;
           }
           return { ...prev, windowStats: stats };
         });
       }
     }, 1000);
     return () => clearInterval(interval);
  }, [focusedWindow]);

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

  const handleHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const handleMenuClick = (id: string) => {
    handleHaptic();
    const now = Date.now();
    const lastTap = lastTapRef.current[id] || 0;

    if (now - lastTap < 300) {
      setResetTriggers(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }
    lastTapRef.current[id] = now;

    setFocusedWindow(id);
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows(prev => prev.filter(w => w !== id));
    }
    if (!activeWindows.includes(id)) {
      setActiveWindows(prev => [...prev, id]);
      triggerSystemSpike({ cpu: 50, ram: 30, disk: 45, net: 40 }); // Big spike on open
      setLoadingStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [id]: false }));
      }, 1500);
    } else {
      setActiveWindows(prev => [...prev.filter(w => w !== id), id]);
    }
  };

  const handleClose = (id: string) => {
    handleHaptic();
    setClosingWindows(prev => [...prev, id]);
    triggerSystemSpike({ cpu: 15, ram: 5, disk: 20 }); // Spike on close

    setTimeout(() => {
      setActiveWindows(prev => prev.filter(w => w !== id));
      setMinimizedWindows(prev => prev.filter(w => w !== id));
      setClosingWindows(prev => prev.filter(w => w !== id));
      
      // Update telemetry on close
      setTelemetry(prev => {
        const stats = { ...prev.windowStats };
        if (stats[id]) {
          stats[id].lastClosed = new Date().toLocaleTimeString();
          stats[id].lastOpenedAt = null;
        }
        return { ...prev, windowStats: stats };
      });

      if (focusedWindow === id) setFocusedWindow(null);
      setLoadingStates(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }, 1000);
  };

  const handleMinimize = (id: string) => {
    handleHaptic();
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
      <div className="fixed inset-0 z-0 pointer-events-none">
        <HardwareVisual />
      </div>
      <main
        className={`mission-control-grid overflow-hidden selection:bg-cobalt selection:text-black transition-all duration-700 ease-in-out ${theme === 'critical' ? 'critical-failure' : ''} ${theme === 'happy' ? 'happy-theme' : ''} ${theme === 'day' ? 'day-theme' : ''} ${theme === 'flower' ? 'flower-theme' : ''}`}
        style={{
          gridTemplateColumns: isMobile ? '1fr' : '80px 1fr',
          gridTemplateRows: isMobile ? '60px 1fr 60px' : '60px 1fr',
          backgroundColor: 'transparent'
        }}
      >
        <ScanningCursor />
        {theme === 'flower' && <div className="fixed inset-0 z-[5]"><FlowerBloom /></div>}
        {theme === 'dev' && <div className="fixed inset-0 z-[5]"><MatrixRain /></div>}

        {/* HEADER BAR */}
        <header className={`grid-cell flex justify-between items-center px-4 md:px-6 border-b border-cobalt ${isMobile ? 'col-span-1' : 'col-span-2'}`}>
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
          {!isMobile && (
            <div className="flex items-center gap-8">
              <div className="mono hidden lg:block opacity-60">
                COORD: 9.9312° N, 76.2673° E (KOCHI)
              </div>
              <div className="mono text-[10px] text-cobalt flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                DEEP_SPACE_MONITOR: ACTIVE
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 md:gap-4 w-32 md:w-48">
            {/* Right side empty to accommodate Terminate Session button */}
          </div>
        </header>

        {/* MISSION MENU SIDEBAR (HIDDEN ON MOBILE, MOVED TO FOOTER) */}
        {!isMobile && (
          <aside className="grid-cell row-span-2 flex flex-col items-center pt-8 border-r border-cobalt/20 overflow-visible bg-obsidian">
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
        <section className={`grid-cell bg-transparent flex flex-col justify-center overflow-auto ${isMobile ? 'p-6' : 'p-12'}`}>
          <Hero />
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
          zIndex={2000 + activeWindows.indexOf('about')}
          icon={<Activity className="w-5 h-5 text-cobalt" />}
          resetTrigger={resetTriggers['about'] || 0}
          isMobile={isMobile}
        >
          {(isMaximized: boolean) => (
            <AboutContent
              isMaximized={isMaximized}
              onOpenSkills={() => handleMenuClick('skills')}
              onOpenProjects={() => handleMenuClick('projects')}
              onOpenContact={() => handleMenuClick('contact')}
            />
          )}
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
          zIndex={2000 + activeWindows.indexOf('skills')}
          icon={<Cpu className="w-5 h-5 text-cobalt" />}
          resetTrigger={resetTriggers['skills'] || 0}
          isMobile={isMobile}
        >
          {(isMaximized: boolean) => (
            <SkillsContent isMaximized={isMaximized} />
          )}
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
          zIndex={2000 + activeWindows.indexOf('projects')}
          icon={<Box className="w-5 h-5 text-cobalt" />}
          resetTrigger={resetTriggers['projects'] || 0}
          isMobile={isMobile}
        >
          {(isMaximized: boolean) => (
            <ProjectsContent
              isMaximized={isMaximized}
              onOpenGithub={() => handleMenuClick('external-github')}
            />
          )}
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
          zIndex={2000 + activeWindows.indexOf('contact')}
          icon={<Radio className="w-5 h-5 text-cobalt" />}
          resetTrigger={resetTriggers['contact'] || 0}
          isMobile={isMobile}
        >
          <ContactContent onOpenExternal={handleMenuClick} />
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
          zIndex={2000 + activeWindows.indexOf('terminal')}
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

        <footer className={`fixed transition-all duration-500 flex items-center z-[100] ${isMobile
          ? 'bottom-6 left-1/2 -translate-x-1/2 w-[92%] h-[68px] bg-[#00f2ff] rounded-2xl border-2 border-white/60'
          : 'bottom-0 left-0 w-full h-[40px] bg-obsidian/95 backdrop-blur-xl border-t border-cobalt/40 px-5'
          }`}>
          <div className={`flex items-center w-full h-full relative overflow-hidden ${isMobile ? 'px-2' : 'gap-4'}`}>
            {!isMobile && <div className="mono text-[10px] opacity-50 shrink-0 text-cobalt hidden md:block">TASK_MANAGER:</div>}

            <div className={`flex items-center w-full h-full ${isMobile ? 'justify-around' : 'justify-start'}`}>
              {isMobile && menuItems.map(item => {
                const isActive = activeWindows.includes(item.id);
                const isFocused = focusedWindow === item.id;
                const isMinimized = minimizedWindows.includes(item.id);

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: isFocused ? 1.15 : 1,
                      backgroundColor: isFocused ? "rgba(0,0,0,0.12)" : "transparent",
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleMenuClick(item.id)}
                    className={`flex flex-col items-center justify-center relative flex-1 h-[85%] gap-0.5 transition-all rounded-xl ${isFocused ? 'shadow-[inner_0_0_10px_rgba(0,0,0,0.05)]' : ''}`}
                  >
                    <div className={`transition-all duration-300 ${isFocused ? 'text-blue-950 scale-110' : 'text-blue-900/60'}`}>
                      {item.icon}
                    </div>
                    <span className={`mono text-[9px] font-black uppercase tracking-wider transition-colors ${isFocused ? 'text-blue-950' : 'text-blue-900/50'}`}>
                      {item.label.split(' ')[0]}
                    </span>

                    <div className="absolute -bottom-1 flex gap-0.5 justify-center items-center h-1 w-full text-blue-950">
                      {isActive && (
                        <motion.div
                          layoutId={`indicator-${item.id}`}
                          className={`h-[4px] rounded-full transition-all duration-300 ${isFocused ? 'w-6 bg-blue-950' : 'w-2 bg-blue-900/30'} ${isMinimized ? 'bg-orange-600' : ''}`}
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
          zIndex={2000 + activeWindows.indexOf('external-github')}
          icon={<Github className="w-5 h-5 text-cobalt" />}
        >
          <ExternalNodeContent type="GITHUB" identifier="Nekhal-james" url="https://github.com/Nekhal-james" />
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
          zIndex={2000 + activeWindows.indexOf('external-linkedin')}
          icon={<Linkedin className="w-5 h-5 text-cobalt" />}
        >
          <ExternalNodeContent type="LINKEDIN" identifier="nekhal-james" url="https://www.linkedin.com/in/nekhal-james/" />
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
          zIndex={2000 + activeWindows.indexOf('external-email')}
          icon={<Mail className="w-5 h-5 text-rust" />}
        >
          <EmailNodeContent email="nekhaljames@gmail.com" />
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

        {/* SYSTEM_INFORMATION_METRICS: FULL TASK MANAGER REPLICATION */}
        {!isMobile && (
          <div className="fixed right-6 top-20 z-[1000] pointer-events-auto select-none hidden lg:block">
            <div className="flex flex-col bg-black/60 backdrop-blur-2xl border border-white/10 rounded-sm overflow-hidden shadow-2xl">
               {/* Title Bar */}
               <div className="px-4 py-2 border-b border-white/5 bg-white/[0.03]">
                  <span className="mono text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">Performance_Monitor</span>
               </div>
               
               <div className="flex h-[380px]">
                  {/* Left Sidebar: Thumbnails */}
                  <div className="w-[180px] border-r border-white/5 bg-white/[0.02] flex flex-col overflow-y-auto">
                  <MetricSidebarItem 
                    label="CPU" 
                    value={`${Math.round(telemetry.metrics.cpu[19])}%`}
                    subValue={`${(3.2 + (telemetry.metrics.cpu[19]/25)).toFixed(2)} GHz`}
                    data={telemetry.metrics.cpu}
                    color="#58a6ff"
                    isSelected={selectedMetric === 'cpu'}
                    onClick={() => setSelectedMetric('cpu')}
                  />
                  <MetricSidebarItem 
                    label="Memory" 
                    value={`${Math.round(telemetry.metrics.ram[19])}%`}
                    subValue={`${(32.4 + (telemetry.metrics.ram[19] * 4.8)).toFixed(0)} GB`}
                    data={telemetry.metrics.ram}
                    color="#818cf8"
                    isSelected={selectedMetric === 'ram'}
                    onClick={() => setSelectedMetric('ram')}
                  />
                  <MetricSidebarItem 
                    label="Disk 0 (C:)" 
                    value={`${Math.round(telemetry.metrics.disk[19])}%`}
                    subValue={`${(telemetry.metrics.disk[19] * 0.12).toFixed(1)} GB/s`}
                    data={telemetry.metrics.disk}
                    color="#b7410e"
                    isSelected={selectedMetric === 'disk'}
                    onClick={() => setSelectedMetric('disk')}
                  />
                  <MetricSidebarItem 
                    label="Ethernet" 
                    value={`${Math.round(telemetry.metrics.net[19])}%`}
                    subValue={`${(telemetry.metrics.net[19] * 1.2).toFixed(0)} Mbps`}
                    data={telemetry.metrics.net}
                    color="#22c55e"
                    isSelected={selectedMetric === 'net'}
                    onClick={() => setSelectedMetric('net')}
                  />
               </div>

               {/* Right Detail: Large View */}
               <div className="w-[340px] p-4 flex flex-col gap-4">
                  <MetricLargeDetail 
                    type={selectedMetric}
                    data={telemetry.metrics[selectedMetric]}
                    hardware={{
                      cpu: "AMD Threadripper PRO 9995WX (96-Core)",
                      ram: "512GB DDR5-6400 ECC RDIMM (8-Channel)",
                      disk: "Samsung 9100 PRO PCIe 5.0 NVMe",
                      net: "Mellanox ConnectX-7 100GbE"
                    }[selectedMetric]}
                    color={{
                      cpu: "#58a6ff",
                      ram: "#818cf8",
                      disk: "#b7410e",
                      net: "#22c55e"
                    }[selectedMetric]}
                  />
               </div>
            </div>

            {/* INTEGRATED ACTIVITY_SPACE */}
            <div className="px-4 py-3 border-t border-white/5 bg-white/[0.01]">
               <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                     <span className="mono text-[8px] text-cobalt tracking-[0.2em] uppercase font-bold">Activity_Session_Log</span>
                     <div className="w-1 h-1 rounded-full bg-cobalt/60 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-6 mono text-[8px] text-white/60">
                     <div className="flex gap-2">
                        <span className="text-cobalt/40">POS:</span>
                        <span>{telemetry.mousePos.x}, {telemetry.mousePos.y}</span>
                     </div>
                     <div className="flex gap-2">
                        <span className="text-cobalt/40">CLKS:</span>
                        <span>{telemetry.clicks}</span>
                     </div>
                     <div className="flex gap-2">
                        <span className="text-cobalt/40">TIME:</span>
                        <span>{telemetry.elapsed}s</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
      </main>
    </ThemeContext.Provider>
  );
}

// Sidebar Thumbnail Item
function MetricSidebarItem({ label, value, subValue, data, color, isSelected, onClick }: any) {
  const points = data.map((val: number, i: number) => `${i * 3},${15 - (val / 100) * 15}`).join(' ');
  return (
    <div 
      onClick={onClick}
      className={`p-3 flex gap-3 cursor-pointer hover:bg-white/5 transition-colors border-l-2 ${isSelected ? 'bg-white/10 border-blue-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
    >
       <div className="w-12 h-8 bg-black/40 border border-white/5 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 60 15" preserveAspectRatio="none">
             <polyline fill="none" stroke={color} strokeWidth="0.75" points={points} />
          </svg>
       </div>
       <div className="flex flex-col min-w-0">
          <div className="mono text-[8px] font-bold text-white uppercase truncate">{label}</div>
          <div className="flex justify-between items-center gap-2">
             <span className="mono text-[8px] text-white/40">{value}</span>
             <span className="mono text-[6px] text-white/20 truncate">{subValue}</span>
          </div>
       </div>
    </div>
  );
}

// Large Detailed View
function MetricLargeDetail({ type, data, hardware, color }: any) {
  const lastVal = Math.round(data[data.length-1]);
  const points = data.map((val: number, i: number) => `${i * 5},${40 - (val / 100) * 40}`).join(' ');
  
  const stats = {
    cpu: { primary: `${(3.2 + (lastVal/25)).toFixed(2)} GHz`, details: { Processes: "482", Threads: "12844", Handles: "245912", Cores: "96", Logical: "192" } },
    ram: { primary: `${(32.4 + (lastVal * 4.8)).toFixed(1)}/512.0 GB`, details: { InUse: "182 GB", Available: "330 GB", Committed: "210 GB", Cached: "64 GB" } },
    disk: { primary: `${lastVal}% Active`, details: { Type: "PCIe 5.0 NVMe", Read: "12.4 GB/s", Write: "8.2 GB/s", Latency: "0.01 ms" } },
    net: { primary: `${(lastVal * 120).toFixed(0)} Mbps`, details: { Interface: "Mellanox CX-7", Protocol: "100GbE", MTU: "9000", DNS: "1.1.1.1" } }
  }[type as keyof typeof stats];

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-2 duration-300">
       <div className="flex justify-between items-start">
          <div className="flex flex-col">
             <h2 className="mono text-lg font-black text-white/90 uppercase">{type}</h2>
             <p className="mono text-[8px] text-white/40 uppercase tracking-widest">{hardware}</p>
          </div>
          <div className="text-right">
             <div className="mono text-2xl font-black text-white">{lastVal}%</div>
             <div className="mono text-[9px] text-white/40 uppercase tracking-widest">Utilization</div>
          </div>
       </div>

       {/* Large Graph with Grid */}
       <div className="h-32 w-full bg-black/60 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08]" 
               style={{ 
                 backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
                 backgroundSize: '20px 20px'
               }} 
          />
          <svg className="w-full h-full relative z-10" viewBox="0 0 95 40" preserveAspectRatio="none">
             <polyline fill="none" stroke={color} strokeWidth="1.2" points={points} className="transition-all duration-1000 ease-in-out" />
             <polyline fill={color} fillOpacity="0.15" points={`0,40 ${points} 95,40`} />
          </svg>
       </div>

       {/* Detailed Stats Grid */}
       <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col gap-1">
             <span className="mono text-[10px] text-white font-bold">{stats.primary}</span>
             <span className="mono text-[7px] text-white/30 uppercase tracking-widest">{type === 'cpu' ? 'Base Speed' : type === 'ram' ? 'Memory Pool' : type === 'disk' ? 'Transfer Rate' : 'Throughput'}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 border-l border-white/10 pl-4">
             {Object.entries(stats.details).map(([key, val]) => (
                <div key={key} className="flex flex-col">
                   <span className="mono text-[8px] text-white font-bold">{val}</span>
                   <span className="mono text-[6px] text-white/30 uppercase">{key}</span>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
