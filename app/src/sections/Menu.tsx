import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, IceCream, Leaf, Utensils } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  icon: React.ReactNode;
  tag?: string;
  category: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Salt & Pepper Chicken Rice',
    description: 'Nasi ayam lada garam dengan cita rasa gurih nikmat yang bikin nagih.',
    price: 'Rp 30.000',
    image: '/assets/salt_pepper_chicken.jpg',
    icon: <Utensils className="w-5 h-5" />,
    category: 'Rice',
  },
  {
    id: 2,
    name: 'Sambal Terasi Fried Rice',
    description: 'Nasi goreng sambal terasi dengan teri crispy yang super nikmat.',
    price: 'Rp 30.000',
    image: '/assets/sambal_terasi_rice.jpg',
    icon: <Flame className="w-5 h-5" />,
    tag: 'Spicy',
    category: 'Rice',
  },
  {
    id: 3,
    name: 'Mochi Yaki',
    description: 'Mochi goreng krispi gurih diluar & lembut bagian dalam favorit kita semua.',
    price: 'Rp 30.000',
    image: '/assets/mochi_yaki.jpg',
    icon: <Leaf className="w-5 h-5" />,
    tag: '6 pcs',
    category: 'Mochi',
  },
  {
    id: 4,
    name: 'Ice Cream Matcha',
    description: 'Matcha dengan rasa autentik yang menyegarkan.',
    price: 'Rp 17.000 / Scoop',
    image: '/assets/matcha_icecream.jpg',
    icon: <IceCream className="w-5 h-5" />,
    category: 'Dessert',
  },
  {
    id: 5,
    name: 'Mochi Dango',
    description: 'Camilan khas Jepang yang kenyal dan manis. Special price!',
    price: 'Rp 20.000',
    image: '/assets/mochi_dango.jpg',
    icon: <Leaf className="w-5 h-5" />,
    tag: 'Special',
    category: 'Mochi',
  },
];

const categories = ['All', 'Rice', 'Mochi', 'Dessert'];

export default function Menu() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.menu-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.menu-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [activeCategory]);

  return (
    <section id="menu" ref={sectionRef} className="relative py-24 px-6 bg-[#FFFAF0]">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFE4E1]/50 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#A7C957]/10 rounded-full blur-3xl translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="menu-title text-center mb-12">
          <span className="inline-block text-sm font-medium uppercase tracking-widest text-[#F08080] mb-3">
            Our Delicious Menu
          </span>
          <h2 className="font-['Quicksand'] font-bold text-4xl md:text-5xl text-[#432818] mb-4">
            New Menu
          </h2>
          <p className="text-[#8D6E63] max-w-lg mx-auto">
            Ada yang baru & siap bikin mood makan kamu naik level di Mochi Cafe & Resto
          </p>
        </div>

        {/* Category filters */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#F08080] text-white shadow-lg shadow-[#F08080]/30'
                  : 'bg-white text-[#8D6E63] hover:bg-[#F08080]/10 border border-[#432818]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="menu-card soft-card overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {item.tag && (
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    item.tag === 'Special' ? 'bg-[#F08080]' : item.tag === 'Spicy' ? 'bg-orange-500' : 'bg-[#A7C957]'
                  }`}>
                    {item.tag}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2 text-[#A7C957]">
                  {item.icon}
                  <span className="text-xs font-medium uppercase tracking-wider">{item.category}</span>
                </div>
                <h3 className="font-['Quicksand'] font-bold text-lg text-[#432818] mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-[#8D6E63] mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-['Quicksand'] font-bold text-xl text-[#F08080]">
                    {item.price}
                  </span>
                  <button className="w-9 h-9 rounded-full bg-[#F08080]/10 flex items-center justify-center text-[#F08080] hover:bg-[#F08080] hover:text-white transition-all">
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tamako decoration */}
        <img
          src="/assets/tamako2.png"
          alt="Tamako with mochi"
          className="absolute -right-4 lg:right-0 top-1/2 -translate-y-1/2 w-28 lg:w-44 opacity-30 lg:opacity-60 pointer-events-none hidden md:block"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(67,40,24,0.1))' }}
        />
      </div>
    </section>
  );
}