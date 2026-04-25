import { useState, useEffect } from 'react';
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';

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

export default AeroCastVisual;
