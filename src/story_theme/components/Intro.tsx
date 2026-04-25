import { motion } from "motion/react";

export default function Intro() {
  return (
    <motion.section 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 1.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#f7f3ed]"
    >
      <motion.div
        initial={{ opacity: 0, y: 150, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl text-center px-4 flex flex-col items-center"
      >
        <h2 className="font-display text-4xl md:text-5xl text-slate-800 leading-[1.6] max-w-[90%] mx-auto transform -rotate-1">
          "Before the code is written, <br />
          before the pixels align, <br />
          there is just a blank page... <br />
          and the ink waiting to spill."
        </h2>

        {/* Mini Progress Bar */}
        <div className="mt-16 w-32 md:w-48 h-[2px] bg-slate-300 rounded-full overflow-hidden opacity-60">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.8, ease: "easeInOut" }}
            className="h-full bg-slate-800"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
