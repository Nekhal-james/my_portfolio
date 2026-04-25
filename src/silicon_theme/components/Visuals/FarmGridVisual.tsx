import { useState, useEffect } from 'react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

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

export default FarmGridVisual;
