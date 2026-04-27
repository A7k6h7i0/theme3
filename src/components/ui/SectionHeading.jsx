import { motion } from "framer-motion";

export const SectionHeading = ({ title, subtitle, centered = true }) => (
  <motion.div 
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className={`mb-16 ${centered ? "text-center" : "text-left"}`}
  >
    <motion.h2
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.05 }}
      className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.12 }}
        className={`text-slate-400 text-lg max-w-2xl ${centered ? "mx-auto" : ""}`}
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);
