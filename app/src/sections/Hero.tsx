import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tamakoRef = useRef<HTMLImageElement>(null);
  const mochizouRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo(
        tamakoRef.current,
        { opacity: 0, x: 60, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'back.out(1.4)', delay: 0.5 }
      );
      gsap.fromTo(
        mochizouRef.current,
        { opacity: 0, x: -60, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'back.out(1.4)', delay: 0.7 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#FFFAF0]"
    >
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#F08080]/15 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#A7C957]/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFE4E1]/40 rounded-full blur-3xl" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#F08080]/30 animate-bounce"
            style={{
              left: `${10 + (i * 7.5)}%`,
              top: `${15 + (i % 5) * 15}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Mochizou character - left side */}
      <img
        ref={mochizouRef}
        src="/assets/mochizou.png"
        alt="Mochizou"
        className="absolute left-0 lg:left-8 bottom-0 w-40 lg:w-72 object-contain z-10 drop-shadow-xl opacity-0"
        style={{ filter: 'drop-shadow(0 8px 24px rgba(67,40,24,0.15))' }}
      />

      {/* Tamako character - right side */}
      <img
        ref={tamakoRef}
        src="/assets/tamako1.png"
        alt="Tamako"
        className="absolute right-0 lg:right-8 bottom-0 w-44 lg:w-80 object-contain z-10 drop-shadow-xl opacity-0"
        style={{ filter: 'drop-shadow(0 8px 24px rgba(67,40,24,0.15))' }}
      />

      {/* Main content */}
      <div ref={textRef} className="relative z-20 text-center px-6 max-w-3xl mx-auto opacity-0">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 soft-shadow">
          <span className="w-2 h-2 rounded-full bg-[#A7C957] animate-pulse" />
          <span className="text-sm font-medium text-[#8D6E63]">Now Open - Halal Certified</span>
        </div>

        {/* Main heading */}
        <h1 className="font-['Quicksand'] font-bold text-5xl md:text-7xl lg:text-8xl text-[#432818] leading-tight mb-4" style={{ textShadow: '0 0 30px rgba(255,250,240,0.8)' }}>
          Mochi Cafe
          <span className="block text-[#F08080]">& Resto</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#8D6E63] max-w-xl mx-auto mb-4 leading-relaxed">
          Where tradition meets tenderness. Handcrafted mochi with love, inspired by the sweetness of Tamako Market.
        </p>

        {/* Tamako Market collaboration badge */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img src="/assets/tamako_logo.png" alt="Tamako" className="w-10 h-10 rounded-full object-cover border-2 border-[#F08080]/30" />
          <span className="text-sm font-medium text-[#8D6E63]">x Tamako Market Collaboration</span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToMenu}
            className="pill-btn bg-[#F08080] text-white font-semibold text-base soft-shadow hover:bg-[#e06060]"
          >
            Explore Our Menu
          </button>
          <button className="pill-btn border-2 border-[#432818]/20 text-[#432818] font-semibold text-base hover:border-[#F08080] hover:text-[#F08080]">
            Our Story
          </button>
        </div>
      </div>
    </section>
  );
}