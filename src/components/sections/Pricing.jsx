import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricingPlans } from "../../constants";

const Pricing = () => {
  return (
    <section id="pricing" className="w-full py-24 sm:py-28 lg:py-32 relative border-y border-white/5">
      <div className="mx-auto w-full max-w-none px-3 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-slate-400">Choose the plan that's right for your growth.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className={`p-6 sm:p-8 rounded-3xl flex flex-col ${
                plan.highlight ? "glass border-primary/50 relative scale-105 z-10" : "glass"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-primary" /> {feat}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                plan.highlight ? "bg-primary hover:bg-primary/90 text-white" : "glass hover:bg-white/10"
              }`}>
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
