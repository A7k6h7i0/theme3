import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { UserPlus, Settings, BarChart } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    desc: "Set up your workspace in minutes with our seamless onboarding process."
  },
  {
    icon: Settings,
    title: "Configure Stack",
    desc: "Connect your existing tools and customize your AI-driven workflow."
  },
  {
    icon: BarChart,
    title: "Scale Growth",
    desc: "Monitor performance in real-time and scale your operations globally."
  }
];

const HowItWorks = () => {
  return (
    <section id="process" className="w-full py-24 sm:py-28 lg:py-32 bg-primary/5 border-y border-white/5">
      <div className="mx-auto w-full max-w-none px-3 sm:px-4 lg:px-6">
        <SectionHeading 
          title="How It Works" 
          subtitle="Get started with Nevacore in three simple steps."
        />
        
        <div className="grid md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 relative">
          {/* Animated Connector Line (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 origin-left bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.16 }}
              className="relative z-10 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.06, rotate: 2 }}
                className="w-20 h-20 bg-dark border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(139,92,246,0.15)] group hover:border-primary transition-colors"
              >
                <step.icon className="h-8 w-8 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-slate-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
