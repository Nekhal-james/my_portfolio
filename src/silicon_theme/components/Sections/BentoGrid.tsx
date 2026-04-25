import { useState, useEffect } from 'react';
import GlitchCard from '../UI/GlitchCard';

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

export default BentoGrid;
