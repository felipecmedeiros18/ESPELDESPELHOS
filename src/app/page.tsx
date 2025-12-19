import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import About from "@/components/sections/About";
import Differentiators from "@/components/sections/Differentiators";
import HowItWorks from "@/components/sections/HowItWorks";
import Visualize from "@/components/sections/Visualize";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import { ScrollAnimation } from "@/components/ScrollAnimation";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <ScrollAnimation>
          <Gallery />
        </ScrollAnimation>
        <ScrollAnimation>
          <About />
        </ScrollAnimation>
        <ScrollAnimation>
          <Differentiators />
        </ScrollAnimation>
        <ScrollAnimation>
          <HowItWorks />
        </ScrollAnimation>
        <ScrollAnimation>
          <Visualize />
        </ScrollAnimation>
        <ScrollAnimation>
          <Testimonials />
        </ScrollAnimation>
        <ScrollAnimation>
          <FinalCTA />
        </ScrollAnimation>
      </main>
      <Footer />
    </div>
  );
}
