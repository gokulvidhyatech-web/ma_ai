import { motion, useScroll, useTransform } from 'framer-motion';

export const AmbientOrb = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 1]);

  return (
    <motion.div style={{ opacity }} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <motion.div
        animate={{
          x: ["5%", "60%", "30%", "70%", "5%"],
          y: ["5%", "40%", "70%", "20%", "5%"],
          scale: [1, 1.3, 0.8, 1.2, 1],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform, filter", transform: "translateZ(0)" }}
        className="absolute top-0 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#8B5CF6]/12 dark:bg-[#8B5CF6]/15 blur-[60px] sm:blur-[80px] md:blur-[120px] lg:blur-[140px] rounded-[40%_60%_70%_30%] pointer-events-none"
      />
    </motion.div>
  );
};
