import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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

export default BootSequence;
