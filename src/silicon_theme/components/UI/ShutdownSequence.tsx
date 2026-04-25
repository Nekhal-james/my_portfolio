import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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

export default ShutdownSequence;
