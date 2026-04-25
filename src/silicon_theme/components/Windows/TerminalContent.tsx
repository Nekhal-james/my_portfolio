import React, { useState } from 'react';
import { ThemeMode } from '../../context/ThemeContext';

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
         'HOST: Nekhal James', 
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
    <div className={`flex flex-col ${isMobile ? 'min-h-[calc(100vh-160px)]' : 'h-full min-h-[300px]'}`}>
      <div className="flex-grow font-mono text-xs overflow-y-auto space-y-1 mb-4 p-2 bg-black/20 rounded">
        {history.map((h, i) => (
          <div key={i} className={h.startsWith('>') ? 'text-cobalt' : 'text-slate-400'}>
            {h}
          </div>
        ))}
      </div>
    <div className={`flex flex-col gap-2 ${isMobile ? 'mt-auto pb-4' : ''}`}>
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

export default TerminalContent;
