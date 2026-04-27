import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Play, Sparkles, LayoutGrid, ArrowUpRight, BarChart3, Users, ShieldCheck } from "lucide-react";

const screens = [
  {
    title: "Overview",
    stat: "98.4%",
    note: "System health",
    accent: "from-primary/90 to-accent/80",
    icon: LayoutGrid,
    bars: ["72%", "48%", "84%"],
  },
  {
    title: "Workflow",
    stat: "24 tasks",
    note: "Queued today",
    accent: "from-cyan-400/90 to-blue-500/80",
    icon: ArrowUpRight,
    bars: ["64%", "82%", "55%"],
  },
  {
    title: "Analytics",
    stat: "+18.2%",
    note: "MRR growth",
    accent: "from-emerald-400/90 to-teal-500/80",
    icon: BarChart3,
    bars: ["88%", "58%", "76%"],
  },
  {
    title: "Team",
    stat: "42",
    note: "Active members",
    accent: "from-fuchsia-500/90 to-rose-500/80",
    icon: Users,
    bars: ["70%", "60%", "90%"],
  },
  {
    title: "Alerts",
    stat: "12",
    note: "New messages",
    accent: "from-amber-400/90 to-orange-500/80",
    icon: Sparkles,
    bars: ["54%", "78%", "66%"],
  },
  {
    title: "Security",
    stat: "100%",
    note: "Protected",
    accent: "from-emerald-500/90 to-cyan-500/80",
    icon: ShieldCheck,
    bars: ["92%", "68%", "88%"],
  },
];

const MobileScreen = ({ screen, compact = false }) => {
  const Icon = screen.icon;

  return (
    <motion.div
      key={screen.title}
      initial={{ opacity: 0, y: 20, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.94 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`relative rounded-[2.4rem] p-[10px] bg-white/[0.04] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl ${
        compact ? "w-[150px] sm:w-[168px]" : "mx-auto w-[250px] sm:w-[280px]"
      }`}
    >
      <div className="rounded-[2rem] overflow-hidden border border-white/8 bg-[#081021]">
        <div className={`h-28 sm:h-32 bg-gradient-to-br ${screen.accent} p-4`}>
          <div className="flex items-center justify-between text-white/90">
            <span className="text-[9px] font-semibold uppercase tracking-[0.24em]">Mobile app</span>
            <Icon className="h-4 w-4" />
          </div>
          <div className="mt-7 text-left">
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/70">{screen.title}</div>
            <div className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white">{screen.stat}</div>
            <div className="mt-1 text-[10px] text-white/75">{screen.note}</div>
          </div>
        </div>

        <div className="bg-[#0A1120] p-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-white/8 border border-white/10" />
            <div className="flex-1">
              <div className="h-2.5 w-20 rounded-full bg-white/12" />
              <div className="mt-2 h-2 w-12 rounded-full bg-white/8" />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {screen.bars.map((bar, index) => (
              <div key={index} className="space-y-1.5">
                <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: bar }}
                    transition={{ duration: 0.8, delay: 0.12 * index }}
                    className={`h-1.5 rounded-full bg-gradient-to-r ${screen.accent}`}
                  />
                </div>
                <div className={`h-1.5 rounded-full bg-white/6 ${bar}`} />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/20 grid place-items-center">
                <Sparkles className="h-3 w-3 text-primary" />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.18em] text-slate-400">Quick action</div>
                <div className="text-[10px] text-white/80">Auto optimize</div>
              </div>
            </div>
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % screens.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="mx-auto w-full max-w-none px-3 sm:px-4 lg:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase">v2.0 is now live</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-bold mb-8 tracking-tight"
        >
          Scale your SaaS <br />
          <span className="text-gradient">Faster than ever</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          The all-in-one platform to build, deploy, and scale modern applications with AI-driven insights and enterprise-grade security.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] transition-all">
            Start Free Trial <ChevronRight className="h-4 w-4" />
          </button>
          <button className="w-full sm:w-auto glass px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
            <Play className="h-4 w-4 fill-current" /> Watch Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 relative flex justify-center"
        >
          <div className="absolute inset-x-0 top-14 h-[20rem] rounded-full bg-gradient-to-r from-primary/20 via-accent/10 to-transparent blur-3xl opacity-70" />
          <div className="relative w-full rounded-[2.5rem] glass border border-white/15 overflow-hidden px-3 py-8 sm:px-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%)]" />
            <div className="absolute inset-y-10 left-3 right-3 rounded-[2rem] border border-white/5 bg-white/[0.02]" />

            <motion.div
              animate={{ x: ["0%", "-18%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="relative z-10 flex items-end gap-4 sm:gap-6 whitespace-nowrap"
            >
              {screens.concat(screens.slice(0, 2)).map((screen, index) => (
                <div
                  key={`${screen.title}-${index}`}
                  className={`shrink-0 ${index % 3 === 1 ? "-translate-y-4" : index % 3 === 2 ? "translate-y-3" : ""}`}
                >
                  <MobileScreen screen={screen} compact />
                </div>
              ))}
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-slate-300 backdrop-blur-md"
            >
              Scrolling mobile showcase
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
