import { motion } from "framer-motion";
import { Rocket, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="w-full border-t border-white/10 py-16"
  >
    <div className="mx-auto w-full max-w-none px-3 sm:px-4 lg:px-6">
      <div className="grid gap-12 md:grid-cols-4 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter mb-4">
            <div className="p-1.5 bg-primary rounded-lg">
              <Rocket className="text-white h-5 w-5" />
            </div>
            <span>NEVACORE</span>
          </div>
          <p className="text-slate-400 text-sm">
            Building the future of SaaS infrastructure. Fast, reliable, and secure.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Product</h4>
          <ul className="text-slate-400 space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary">Features</a></li>
            <li><a href="#" className="hover:text-primary">Security</a></li>
            <li><a href="#" className="hover:text-primary">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="text-slate-400 space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary">About Us</a></li>
            <li><a href="#" className="hover:text-primary">Careers</a></li>
            <li><a href="#" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>

        <div className="flex gap-4">
          <motion.a whileHover={{ y: -3, scale: 1.04 }} href="#" className="p-2 glass rounded-full hover:text-primary transition-colors">
            <Twitter size={20} />
          </motion.a>
          <motion.a whileHover={{ y: -3, scale: 1.04 }} href="#" className="p-2 glass rounded-full hover:text-primary transition-colors">
            <Github size={20} />
          </motion.a>
          <motion.a whileHover={{ y: -3, scale: 1.04 }} href="#" className="p-2 glass rounded-full hover:text-primary transition-colors">
            <Linkedin size={20} />
          </motion.a>
        </div>
      </div>

      <div className="text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Nevacore. All rights reserved.
      </div>
    </div>
  </motion.footer>
);

export default Footer;
