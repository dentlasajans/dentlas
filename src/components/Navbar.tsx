import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass !border-b-white/5' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <img src="https://res.cloudinary.com/dejx0brol/image/upload/v1777703150/Ba%C5%9Fl%C4%B1ks%C4%B1z-1_azwxju.png" alt="Dentlas Ajans Logo" className="h-8 sm:h-10 lg:h-12 w-auto -translate-y-0.5 lg:-translate-y-1" />
          <div className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tighter">
            Dentlas <span className="font-light opacity-80">Ajans</span>
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          {['Servisler', 'Projeler', 'Araçlar', 'Ekibimiz', 'Galeri', 'İletişim'].map((item, i) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="hover:text-white hover:opacity-100 transition-all"
            >
              {item}
            </motion.a>
          ))}
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-white/10 text-white px-6 py-2.5 rounded-full text-[10px] font-bold hover:bg-white/5 transition-all"
          >
            TEKLİF AL
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {['Servisler', 'Projeler', 'Araçlar', 'Ekibimiz', 'Galeri', 'İletişim'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-xl font-bold" onClick={() => setIsMenuOpen(false)}>{item}</a>
              ))}
              <button className="bg-white text-black p-4 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all">TEKLİF AL</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
