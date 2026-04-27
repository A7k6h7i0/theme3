import { motion } from "framer-motion";

export const GradientBg = () => (
  <div className="fixed inset-0 -z-10 bg-dark overflow-hidden pointer-events-none">
    {/* Primary Glow */}
    <motion.div 
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/30 blur-[120px]"
    />
    {/* Secondary Glow */}
    <motion.div 
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[120px]"
    />
    {/* Subtle Grid Pattern */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
    <div 
      className="absolute inset-0" 
      style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}
    />
  </div>
);
