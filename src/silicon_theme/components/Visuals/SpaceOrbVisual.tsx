import { useState, useEffect } from 'react';
import { AreaChart, Area, Line, ResponsiveContainer } from 'recharts';

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

export default SpaceOrbVisual;
