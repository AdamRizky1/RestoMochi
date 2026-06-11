import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Menu from './sections/Menu';
import About from './sections/About';
import Promo from './sections/Promo';
import Visit from './sections/Visit';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="relative bg-[#FFFAF0] min-h-screen">
      <Navigation />
      <Hero />
      <Menu />
      <About />
      <Promo />
      <Visit />
      <Footer />
    </div>
  );
}