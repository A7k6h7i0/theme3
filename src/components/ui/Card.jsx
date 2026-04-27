import { motion } from "framer-motion";

export const Card = ({ children, className }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`glass p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-colors duration-300 ${className || ""}`}
  >
    {children}
  </motion.div>
);
