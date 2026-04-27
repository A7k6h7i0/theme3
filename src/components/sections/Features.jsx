import { motion } from "framer-motion";
import { Zap, Shield, Sparkles, Command, Globe } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="w-full border-y border-white/5 bg-white/[0.01] py-24 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-none px-3 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
            className="mb-16 sm:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Built for speed. <br /> <span className="text-slate-500">Optimized for scale.</span>
          </h2>
          <p className="max-w-2xl text-slate-400 text-lg">
            Responsive bento surfaces, motion-led hierarchy, and edge-to-edge spacing that stays crisp on every screen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
          {/* Main Large Bento */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -6 }}
            className="md:col-span-8 premium-border p-6 sm:p-8 lg:p-10 rounded-[1.75rem] sm:rounded-[2rem] lg:rounded-[2.5rem] flex flex-col justify-between overflow-hidden group"
          >
            <div>
              <Zap className="text-indigo-500 mb-6" size={32} />
              <h3 className="text-2xl font-bold mb-4">Real-time Synchronization</h3>
              <p className="text-slate-400 max-w-md">Data propagates across our global network in less than 40ms. Guaranteed.</p>
            </div>
            <motion.div
              animate={{ opacity: [0.65, 1, 0.65], x: [0, 6, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="mt-12 h-32 bg-gradient-to-r from-indigo-500/20 to-transparent rounded-xl border border-white/5"
            />
          </motion.div>

          {/* Small Bento */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            whileHover={{ y: -6 }}
            className="md:col-span-4 premium-border p-6 sm:p-8 lg:p-10 rounded-[1.75rem] sm:rounded-[2rem] lg:rounded-[2.5rem] group"
          >
            <Shield className="text-emerald-500 mb-6" size={32} />
            <h3 className="text-2xl font-bold mb-4">Zero Trust Security</h3>
            <p className="text-slate-400">Enterprise-grade encryption for every single request.</p>
          </motion.div>

          {/* Secondary Bentos */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            whileHover={{ y: -6 }}
            className="md:col-span-4 premium-border p-6 sm:p-8 lg:p-10 rounded-[1.75rem] sm:rounded-[2rem] lg:rounded-[2.5rem] bg-indigo-600/10 border-indigo-500/20"
          >
             <Command className="text-indigo-400 mb-6" size={32} />
             <h3 className="text-xl font-bold mb-2">Developer First</h3>
             <p className="text-sm text-slate-400">Robust CLI and API documentation.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            whileHover={{ y: -6 }}
            className="md:col-span-4 premium-border p-6 sm:p-8 lg:p-10 rounded-[1.75rem] sm:rounded-[2rem] lg:rounded-[2.5rem] bg-indigo-600/10 border-indigo-500/20"
          >
             <Globe className="text-indigo-400 mb-6" size={32} />
             <h3 className="text-xl font-bold mb-2">Edge Computing</h3>
             <p className="text-sm text-slate-400">Deploy code closer to your users.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="md:col-span-4 premium-border p-6 sm:p-8 lg:p-10 rounded-[1.75rem] sm:rounded-[2rem] lg:rounded-[2.5rem] bg-indigo-600/10 border-indigo-500/20"
          >
             <Sparkles className="text-indigo-400 mb-6" size={32} />
             <h3 className="text-xl font-bold mb-2">AI Optimized</h3>
             <p className="text-sm text-slate-400">Smart routing powered by ML.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
