import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";

const reviews = [
  { name: "Alex Rivera", role: "CTO at TechFlow", text: "Nevacore has completely transformed how we handle our deployment pipeline. The speed is unmatched." },
  { name: "Sarah Chen", role: "Founder of Bloom", text: "The most intuitive dashboard I've ever used. Our team's productivity increased by 40% in the first month." },
  { name: "James Wilson", role: "DevOps Engineer", text: "Enterprise security features out of the box. It saved us months of development time." },
  { name: "Elena Rodriguez", role: "Product Manager", text: "The AI insights actually provide actionable data. It's not just another buzzword here." }
];

const Testimonials = () => {
  return (
    <section className="w-full py-24 sm:py-28 lg:py-32 overflow-hidden border-y border-white/5">
      <div className="mx-auto w-full max-w-none px-3 sm:px-4 lg:px-6">
        <SectionHeading title="Trusted by Innovators" subtitle="Join thousands of teams building the future." />
        
        {/* Infinite Marquee Effect */}
        <div className="flex relative">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 sm:gap-6 whitespace-nowrap"
          >
            {[...reviews, ...reviews].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % reviews.length) * 0.08 }}
                whileHover={{ y: -6 }}
                className="w-[280px] sm:w-[320px] lg:w-[350px] glass p-6 sm:p-8 rounded-3xl border border-white/10 shrink-0"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent" />
                  <div>
                    <h4 className="font-bold text-white">{review.name}</h4>
                    <p className="text-xs text-slate-500">{review.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 whitespace-normal italic">"{review.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
