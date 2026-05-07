import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['servisler', 'araçlar', 'referanslar', 'testimonials', 'galeri', 'hakkımızda', 'blog', 'faq', 'iletişim'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      } else if (window.scrollY < 200) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass !border-b-white/5' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img src="https://res.cloudinary.com/dejx0brol/image/upload/v1777703150/Ba%C5%9Fl%C4%B1ks%C4%B1z-1_azwxju.png" alt="Dentlas Ajans Logo" className="h-8 sm:h-10 lg:h-12 w-auto -translate-y-0.5 lg:-translate-y-1" />
          <div className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tighter">
            Dentlas <span className="font-light opacity-80">Ajans</span>
          </div>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          {['Servisler', 'Araçlar', 'Referanslar', 'Yorumlar', 'Galeri', 'Hakkımızda', 'Blog', 'S.S.S.', 'İletişim'].map((item, i) => {
            const itemId = item === 'S.S.S.' ? 'faq' : item === 'Yorumlar' ? 'testimonials' : item.toLowerCase();
            const isActive = activeSection === itemId;
            
            return (
              <motion.a 
                key={item}
                href={`#${itemId}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative group py-1 transition-all hover:-translate-y-0.5 ${isActive ? 'text-brand' : 'text-white/70 hover:text-white'}`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-brand shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </motion.a>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
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
              {['Servisler', 'Araçlar', 'Referanslar', 'Yorumlar', 'Galeri', 'Hakkımızda', 'Blog', 'S.S.S.', 'İletişim'].map((item) => {
                const itemId = item === 'S.S.S.' ? 'faq' : item === 'Yorumlar' ? 'testimonials' : item.toLowerCase();
                const isActive = activeSection === itemId;
                return (
                  <a 
                    key={item} 
                    href={`#${itemId}`} 
                    className={`text-xl font-bold transition-colors ${isActive ? 'text-brand' : 'text-white'}`} 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
