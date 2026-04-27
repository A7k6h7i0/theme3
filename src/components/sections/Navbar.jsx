import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";
import { navLinks } from "../../constants";
import { Button } from "../ui/Button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-4 bg-dark/80 backdrop-blur-md border-b border-white/10" : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-none items-center justify-between px-3 sm:px-4 lg:px-6">
        <motion.a
          href="#"
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 font-bold text-2xl tracking-tighter"
        >
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="p-2 bg-primary rounded-lg"
          >
            <Rocket className="text-white h-6 w-6" />
          </motion.div>
          <span>NEVA<span className="text-primary">CORE</span></span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -2 }}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <Button variant="primary" className="px-6 py-2.5 text-sm">
            Get Started
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle navigation">
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark/95 border-b border-white/10 px-3 py-6 md:hidden backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-lg"
                  onClick={() => setMobileMenu(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <Button variant="primary" className="w-full py-3 rounded-xl mt-4">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
