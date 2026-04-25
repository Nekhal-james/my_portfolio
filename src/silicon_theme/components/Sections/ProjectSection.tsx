import { motion } from 'motion/react';
import GlitchCard from '../UI/GlitchCard';
import SpaceOrbVisual from '../Visuals/SpaceOrbVisual';
import FarmGridVisual from '../Visuals/FarmGridVisual';
import AeroCastVisual from '../Visuals/AeroCastVisual';

const ProjectSection = () => {
  const projects = [
    {
      id: '001',
      title: "SPACE_ORB",
      desc: "AUTONOMOUS EDGE INTELLIGENCE NODE",
      visual: <SpaceOrbVisual />
    },
    {
      id: '002',
      title: "FARM_GRID",
      desc: "FULL-STACK AGRICULTURAL MARKETPLACE",
      visual: <FarmGridVisual />
    },
    {
      id: '003',
      title: "AERO_CAST",
      desc: "NASA WEATHER PREDICTIVE MODELS",
      visual: <AeroCastVisual />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full p-4 pb-12">
      {projects.map((p) => (
        <GlitchCard key={p.id} className="h-full">
          <motion.div 
            whileHover={{ y: -5, borderColor: "rgba(88,166,255,0.6)", boxShadow: "0 0 20px rgba(88,166,255,0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="blueprint-card group cursor-pointer hover:bg-cobalt/5 transition-colors border border-cobalt/20 h-full flex flex-col"
          >
            <div className="mono text-rust mb-2 group-hover:text-cobalt transition-colors">FILE_{p.id}: {p.title}</div>
            <div className="flex-grow my-4 min-h-[120px] overflow-hidden relative">
              <div className="absolute inset-0 bg-cobalt/0 group-hover:bg-cobalt/5 transition-colors z-10" />
              {p.visual}
            </div>
            <div className="mono text-[9px] opacity-80 group-hover:opacity-100">{p.desc}</div>
          </motion.div>
        </GlitchCard>
      ))}
    </div>
  );
};

export default ProjectSection;
