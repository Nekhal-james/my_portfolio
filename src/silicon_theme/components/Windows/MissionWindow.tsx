import React, { useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { Move } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import BootSequence from '../UI/BootSequence';
import ShutdownSequence from '../UI/ShutdownSequence';

interface WindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode | ((isMaximized: boolean) => React.ReactNode);
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
  const { theme } = React.useContext(ThemeContext);
  const [isCenteredPhase, setIsCenteredPhase] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const isMinimized = minimizedWindows.includes(id);

  const handleMaximizeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };

  if (!isOpen || isMinimized) return null;

  return (
    <AnimatePresence mode="wait">
      <div 
        className={`fixed inset-0 flex items-center justify-center pointer-events-none ${isMaximized ? 'z-[10000]' : ''}`}
        style={isMaximized ? {
          top: '0px',
          bottom: '0px',
          left: '0px',
          right: '0px',
          zIndex: 10000
        } : { zIndex, padding: isMobile ? '0' : '24px' }}
      >
        <motion.div
          key={`${id}-${resetTrigger}`}
          layout
          drag={!isMaximized && !isMobile}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          onPointerDown={onFocus}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: (isMaximized || isMobile) ? 0 : undefined,
            y: (isMaximized || isMobile) ? 0 : undefined,
            width: (isMaximized || isMobile) ? "100%" : "896px", 
            height: (isMaximized || isMobile) ? "100%" : "auto",
            maxHeight: (isMaximized || isMobile) ? "100%" : "80vh",
            borderColor: (isMaximized || isMobile) ? "transparent" : (isFocused ? "rgba(88,166,255,0.6)" : "rgba(88,166,255,0.3)"),
            boxShadow: (isMaximized || isMobile) ? "none" : (isFocused ? "0 0 40px rgba(88,166,255,0.2)" : "0 0 10px rgba(0,0,0,0.5)")
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 32,
            mass: 1.2,
            opacity: { duration: 0.15 }
          }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`border flex flex-col pointer-events-auto ${(isMaximized || isMobile) ? 'rounded-none border-none bg-[#050506]' : 'rounded-lg shadow-2xl bg-obsidian'}`}
        >
          <div 
            onPointerDown={(e) => {
              onFocus();
              dragControls.start(e);
            }}
            className={`px-4 py-3 flex items-center justify-between border-b select-none cursor-move draggable-handle transition-colors ${isMobile ? 'bg-[#050506]' : 'bg-obsidian'} ${isFocused ? 'border-cobalt/60' : 'border-cobalt/20'}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5 mr-4" onPointerDown={(e) => e.stopPropagation()}>
                <motion.button 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/20 hover:bg-[#ff5f56]/80 transition-colors flex items-center justify-center group pointer-events-auto"
                >
                  <span className="text-[8px] text-black/40 opacity-0 group-hover:opacity-100">×</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMinimize(id);
                  }}
                  className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/20 hover:bg-[#ffbd2e]/80 transition-colors flex items-center justify-center group pointer-events-auto"
                >
                  <span className="text-[10px] text-black/40 opacity-0 group-hover:opacity-100 font-bold mb-1">−</span>
                </motion.button>
                {!isMobile && (
                  <motion.button 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={handleMaximizeToggle}
                    className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/20 hover:bg-[#27c93f]/80 transition-colors flex items-center justify-center group pointer-events-auto"
                  >
                    <span className="text-[8px] text-black/40 opacity-0 group-hover:opacity-100 font-bold">□</span>
                  </motion.button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className={`${isFocused ? 'text-cobalt' : 'text-cobalt/50'} transition-colors`}>{icon}</div>
                <span className={`mono text-[10px] font-bold tracking-widest transition-colors ${isFocused ? 'text-white' : 'opacity-60'}`}>{title}</span>
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
          <div className={`flex-grow overflow-auto relative min-h-[300px] ${isMaximized ? 'p-4 md:p-12' : 'p-8'} ${isMobile ? 'bg-[#050506]' : 'bg-obsidian'}`}>
            <div className={`w-full ${isMaximized ? `max-w-5xl mx-auto min-h-full flex flex-col ${isMobile ? 'justify-start' : 'justify-center'}` : ''}`}>
              {isLoading && <BootSequence title={title} />}
              {isClosing && <ShutdownSequence />}
              
              <div className={(isLoading || isClosing) ? 'opacity-0 pointer-events-none transition-all duration-300' : 'transition-all duration-500 w-full'}>
                {typeof children === 'function' ? children(isMaximized) : children}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MissionWindow;
