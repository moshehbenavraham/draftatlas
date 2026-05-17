import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="ARCH STUDIO — Minimal Architecture & Design"
        titleOverride
        description="Award-winning architectural firm specializing in minimal design. Creating extraordinary spaces through thoughtful architecture, residential, commercial and renovation projects."
        path="/"
      />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
