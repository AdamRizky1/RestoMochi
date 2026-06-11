import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Promo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="promo" ref={sectionRef} className="relative py-24 px-6 bg-[#FFFAF0] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFE4E1]/40 via-transparent to-[#FEFAE0]/60" />

      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#F08080]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#A7C957]/15 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div
          ref={cardRef}
          className="relative bg-white/80 backdrop-blur-lg rounded-[2rem] overflow-hidden soft-shadow opacity-0"
        >
          <div className="grid md:grid-cols-2">
            {/* Image side */}
            <div className="relative h-64 md:h-auto">
              <img
                src="/assets/mochi_dango.jpg"
                alt="Mochi Dango Special"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:bg-gradient-to-l" />
              {/* Price badge */}
              <div className="absolute top-4 left-4 bg-[#F08080] text-white px-4 py-2 rounded-full">
                <span className="font-['Quicksand'] font-bold text-lg">Special 20K</span>
              </div>
            </div>

            {/* Content side */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-[#F08080]" />
                <span className="text-sm font-medium uppercase tracking-widest text-[#F08080]">
                  Limited Promo
                </span>
              </div>

              <h2 className="font-['Quicksand'] font-bold text-4xl md:text-5xl text-[#432818] mb-4">
                Mochi Dango
              </h2>
              <p className="text-lg text-[#8D6E63] mb-2">
                Camilan khas Jepang yang kenyal dan manis.
              </p>
              <p className="text-[#8D6E63] mb-6">
                Yuk cobain di Mochi Cafe! Dapatkan{' '}
                <span className="font-semibold text-[#F08080]">Free Keychain Lucu</span> setiap
                minimal pembelian 2 porsi Mochi Dango.
              </p>

              {/* Promo details */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-[#FFE4E1]/50 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-[#432818]">Free Keychain</span>
                </div>
                <div className="flex items-center gap-2 bg-[#A7C957]/10 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-[#432818]">Min. 2 Porsi</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="pill-btn bg-[#F08080] text-white font-semibold soft-shadow flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Pesan Sekarang
                </button>
                <span className="flex items-center justify-center text-[#8D6E63] font-medium">
                  0821 2294 7007
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tamako decoration */}
        <img
          src="/assets/tamako_logo.png"
          alt="Tamako"
          className="absolute -left-4 lg:left-0 top-1/2 -translate-y-1/2 w-24 lg:w-36 opacity-30 lg:opacity-50 pointer-events-none hidden md:block"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(67,40,24,0.1))' }}
        />
      </div>
    </section>
  );
}