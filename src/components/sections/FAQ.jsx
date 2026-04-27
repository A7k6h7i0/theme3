import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Is there a free trial available?", a: "Yes, we offer a 14-day free trial for all plans. No credit card required to start." },
  { q: "Can I upgrade or downgrade anytime?", a: "Absolutely. You can change your plan at any point from your billing dashboard." },
  { q: "Do you offer custom enterprise pricing?", a: "Yes, for large teams and organizations, contact our sales for a custom quote." }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="glass rounded-2xl mb-4 overflow-hidden"
    >
      <motion.button 
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        className="w-full p-6 text-left flex justify-between items-center transition-colors"
      >
        <span className="font-bold">{question}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          {isOpen ? <Minus className="text-primary" /> : <Plus className="text-primary" />}
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6 text-slate-400"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => (
  <section id="faq" className="w-full py-24 sm:py-28 lg:py-32 border-y border-white/5">
    <div className="mx-auto w-full max-w-none px-3 sm:px-4 lg:px-6">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
      {faqs.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
    </div>
  </section>
);

export default FAQ;
