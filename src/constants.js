import { Zap, Shield, Cpu, BarChart3, Globe, Layers } from "lucide-react";

export const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Process", href: "#process" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed with 99.9% uptime and global CDN distribution." },
  { icon: Shield, title: "Secure by Default", desc: "Enterprise-grade encryption and automated security audits." },
  { icon: Cpu, title: "AI Powered", desc: "Leverage machine learning to automate your repetitive workflows." },
  { icon: BarChart3, title: "Real-time Analytics", desc: "Deep insights into your performance with interactive dashboards." },
  { icon: Globe, title: "Global Scale", desc: "Deploy your applications globally with a single click." },
  { icon: Layers, title: "Modular Architecture", desc: "Easily extendable components that grow with your business." },
];

export const pricingPlans = [
  { name: "Starter", price: "$0", features: ["Up to 3 projects", "Basic Analytics", "Community Support"], highlight: false },
  { name: "Pro", price: "$49", features: ["Unlimited projects", "Advanced AI tools", "Priority Support", "Custom Domains"], highlight: true },
  { name: "Enterprise", price: "$199", features: ["Dedicated Server", "Custom SLA", "24/7 Phone Support", "SSO/SAML"], highlight: false },
];
