import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, ShoppingBag, Instagram, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Clock className="w-7 h-7 text-[#F08080]" />,
    title: 'Open Hours',
    details: ['Mon - Fri: 10AM - 9PM', 'Sat - Sun: 9AM - 10PM'],
  },
  {
    icon: <MapPin className="w-7 h-7 text-[#A7C957]" />,
    title: 'Location',
    details: ['Ruko Greenwich Business Park, Jl. Bumi Botanika No.D9, Lengkong Kulon, Kec. Pagedangan, Kabupaten Tangerang, Banten 15331'],
  },
  {
    icon: <ShoppingBag className="w-7 h-7 text-[#F08080]" />,
    title: 'Online Order',
    details: ['GrabFood: @mochicaferesto', 'GoFood: @mochicaferesto'],
  },
];

export default function Visit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.visit-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      const cards = cardsRef.current?.querySelectorAll('.visit-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="relative py-24 px-6 bg-[#FEFAE0] rounded-t-[2rem]"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFE4E1]/40 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="visit-title text-center mb-14">
          <span className="inline-block text-sm font-medium uppercase tracking-widest text-[#F08080] mb-3">
            Visit Us
          </span>
          <h2 className="font-['Quicksand'] font-bold text-4xl md:text-5xl text-[#432818] mb-4">
            Come Say Hi!
          </h2>
          <p className="text-[#8D6E63] max-w-md mx-auto">
            We would love to see you at our cozy little mochi cafe. Order online or visit us in person!
          </p>
        </div>

        {/* Feature cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 mb-14">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="visit-card soft-card p-8 text-center opacity-0"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#FFFAF0] flex items-center justify-center mx-auto mb-5">
                {feature.icon}
              </div>
              <h3 className="font-['Quicksand'] font-bold text-xl text-[#432818] mb-3">
                {feature.title}
              </h3>
              {feature.details.map((detail, i) => (
                <p key={i} className="text-sm text-[#8D6E63]">{detail}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white rounded-full px-8 py-4 soft-shadow">
            <a
              href="https://instagram.com/mochicaferesto"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#8D6E63] hover:text-[#F08080] transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-medium">@mochicaferesto</span>
            </a>
            <div className="hidden sm:block w-px h-6 bg-[#432818]/10" />
            <a
              href="tel:082122947007"
              className="flex items-center gap-2 text-[#8D6E63] hover:text-[#F08080] transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">0821 2294 7007</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}