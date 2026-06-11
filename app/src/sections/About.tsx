import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Award, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-6 bg-[#FFFAF0] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-[#FFE4E1]/60 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#A7C957]/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image column */}
          <div ref={imageRef} className="relative opacity-0">
            <div className="relative rounded-3xl overflow-hidden soft-shadow">
              <img
                src="/assets/mochi_dusting.jpg"
                alt="Handcrafted mochi"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#432818]/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 soft-shadow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#A7C957]/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#A7C957]" />
                </div>
                <div>
                  <p className="font-['Quicksand'] font-bold text-[#432818]">Made with Love</p>
                  <p className="text-xs text-[#8D6E63]">Every single piece</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div ref={contentRef} className="opacity-0">
            <span className="inline-block text-sm font-medium uppercase tracking-widest text-[#F08080] mb-3">
              Our Story
            </span>
            <h2 className="font-['Quicksand'] font-bold text-4xl md:text-5xl text-[#432818] mb-6 leading-tight">
              Made Fresh
              <span className="block text-[#A7C957]">Daily</span>
            </h2>
            <p className="text-[#8D6E63] text-lg leading-relaxed mb-8">
              We believe in the simplicity of good ingredients. Every piece of mochi is made fresh
              every morning using traditional techniques passed down through generations. No
              preservatives, just pure, chewy perfection that melts in your mouth.
            </p>

            {/* Feature list */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F08080]/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-[#F08080]" />
                </div>
                <div>
                  <p className="font-medium text-[#432818]">Halal Certified</p>
                  <p className="text-sm text-[#8D6E63]">All ingredients are halal and high quality</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#A7C957]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#A7C957]" />
                </div>
                <div>
                  <p className="font-medium text-[#432818]">Fresh Every Morning</p>
                  <p className="text-sm text-[#8D6E63]">Handcrafted daily with love and care</p>
                </div>
              </div>
            </div>

            <button className="pill-btn border-2 border-[#432818]/20 text-[#432818] font-semibold hover:border-[#F08080] hover:text-[#F08080] hover:bg-[#F08080]/5">
              Learn Our Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}