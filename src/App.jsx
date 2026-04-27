import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import HowItWorks from "./components/sections/HowItWorks";
import Testimonials from "./components/sections/Testimonials";
import Pricing from "./components/sections/Pricing";
import FAQ from "./components/sections/FAQ";
import Footer from "./components/sections/Footer";
import { GradientBg } from "./components/ui/GradientBg";

function App() {
  return (
    <main className="relative isolate w-full overflow-x-clip">
      <GradientBg />
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}

export default App;
