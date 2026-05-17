import heroImage from "@/assets/hero-architecture.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="presentation"
      />

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white text-architectural mb-8 reveal">
          MINIMAL
          <br />
          ARCHITECTURE
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide max-w-2xl mx-auto reveal-delayed">
          Creating spaces that inspire through thoughtful design and uncompromising quality
        </p>
      </div>

      {/* Scroll Indicator — a real anchor that jumps to the Services section,
          not a purely decorative graphic. Hash routing handles smooth scroll
          via the browser default; tabbable for keyboard users. */}
      <a
        href="#services"
        aria-label="Scroll to next section"
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2 reveal-delayed
          flex flex-col items-center group
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black
          rounded
        "
      >
        <span
          className="w-px h-16 bg-white/40 transition-colors duration-300 group-hover:bg-white/80 group-focus-visible:bg-white/80"
          aria-hidden="true"
        />
        <span className="text-minimal text-white/60 mt-4 rotate-90 origin-center transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
          SCROLL
        </span>
      </a>
    </section>
  );
};

export default Hero;
