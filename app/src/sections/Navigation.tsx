import { useEffect, useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 lg:px-12 transition-all duration-500 ${
        scrolled ? 'bg-[#FFFAF0]/95 backdrop-blur-md border-b border-[#432818]/10' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
        <div className="w-10 h-10 rounded-full bg-[#F08080] flex items-center justify-center">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <span className="font-['Quicksand'] font-bold text-lg text-[#432818]">Mochi Cafe</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <button onClick={() => scrollTo('menu')} className="text-sm font-medium uppercase tracking-widest text-[#8D6E63] hover:text-[#432818] transition-colors">
          Menu
        </button>
        <button onClick={() => scrollTo('about')} className="text-sm font-medium uppercase tracking-widest text-[#8D6E63] hover:text-[#432818] transition-colors">
          Story
        </button>
        <button onClick={() => scrollTo('promo')} className="text-sm font-medium uppercase tracking-widest text-[#8D6E63] hover:text-[#432818] transition-colors">
          Promo
        </button>
        <button onClick={() => scrollTo('visit')} className="text-sm font-medium uppercase tracking-widest text-[#8D6E63] hover:text-[#432818] transition-colors">
          Visit
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="pill-btn bg-[#F08080] text-white text-sm font-medium hidden md:block soft-shadow">
          Order Now
        </button>
        <button
          className="md:hidden p-2 rounded-full hover:bg-[#432818]/5 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6 text-[#432818]" /> : <Menu className="w-6 h-6 text-[#432818]" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-20 left-0 right-0 bg-[#FFFAF0]/98 backdrop-blur-lg border-b border-[#432818]/10 py-6 px-6 md:hidden flex flex-col gap-4">
          <button onClick={() => scrollTo('menu')} className="text-left text-base font-medium text-[#8D6E63] hover:text-[#432818] py-2">Menu</button>
          <button onClick={() => scrollTo('about')} className="text-left text-base font-medium text-[#8D6E63] hover:text-[#432818] py-2">Story</button>
          <button onClick={() => scrollTo('promo')} className="text-left text-base font-medium text-[#8D6E63] hover:text-[#432818] py-2">Promo</button>
          <button onClick={() => scrollTo('visit')} className="text-left text-base font-medium text-[#8D6E63] hover:text-[#432818] py-2">Visit</button>
          <button className="pill-btn bg-[#F08080] text-white text-sm font-medium soft-shadow w-full mt-2">Order Now</button>
        </div>
      )}
    </nav>
  );
}