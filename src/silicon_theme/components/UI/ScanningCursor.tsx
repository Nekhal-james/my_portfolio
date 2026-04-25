import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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
        className="fixed w-4 h-4 border border-cobalt rounded-full pointer-events-none z-[99999] mix-blend-difference"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed w-px h-[200vh] bg-cobalt/20 pointer-events-none z-[99998] -top-1/2"
        animate={{ x: position.x }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.8 }}
      />
    </>
  );
};

export default ScanningCursor;
