import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export const Button = ({ children, variant = "primary", className, ...props }) => {
  const variants = {
    primary: "bg-primary text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-slate-400 hover:text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={twMerge(
        clsx(
          "px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2",
          variants[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
