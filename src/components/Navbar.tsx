import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  const [theme, setTheme] = useState<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  );

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['servisler', 'araclar', 'referanslar', 'testimonials', 'galeri', 'hakkimizda', 'blog', 'faq', 'iletisim'];
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 py-4 ${isScrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20' : 'bg-transparent border-b border-transparent'}`}>
      <div className="relative z-50 max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer ml-0 sm:-ml-2 lg:-ml-4 flex-shrink-0"
        >
          <img src="https://res.cloudinary.com/dejx0brol/image/upload/v1777703150/Ba%C5%9Fl%C4%B1ks%C4%B1z-1_azwxju.png" alt="Dentlas Ajans Logo" className="h-[34px] sm:h-10 lg:h-12 w-auto -translate-y-0.5 lg:-translate-y-1" />
          <div className="text-[18px] sm:text-xl lg:text-2xl font-bold tracking-tighter block translate-y-px sm:translate-y-0">
            Dentlas <span className="font-light opacity-80 hidden sm:inline">Ajans</span>
          </div>
        </motion.a>

        <div className="flex items-center gap-4 ml-auto lg:ml-0">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            {['Servisler', 'Araçlar', 'Referanslar', 'Yorumlar', 'Galeri', 'Blog', 'Hakkımızda', 'S.S.S.', 'İletişim'].map((item, i) => {
              const itemId = item === 'S.S.S.' ? 'faq' : item === 'Yorumlar' ? 'testimonials' : item === 'Araçlar' ? 'araclar' : item === 'Hakkımızda' ? 'hakkimizda' : item === 'İletişim' ? 'iletisim' : item.toLowerCase();
              const isActive = activeSection === itemId;
              
              return (
                <motion.button 
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(itemId);
                    if (element) {
                      const y = element.getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative group py-1 transition-all hover:-translate-y-0.5 ${isActive ? 'text-brand' : 'text-white/70 hover:text-white'}`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-brand shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </motion.button>
              );
            })}
          </div>

          {/* Controls: Theme & Lang */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <div className={`flex border rounded-full p-1 relative items-center w-16 ${theme === 'light' ? 'bg-black/10 border-black/20' : 'bg-white/5 border-white/10'}`}>
              <div 
                className={`absolute top-1 bottom-1 w-[28px] rounded-full transition-transform duration-300 ease-spring z-0 ${theme === 'light' ? 'bg-white shadow-sm translate-x-[26px]' : 'bg-white/10 translate-x-0'}`} 
              />
              <button 
                onClick={() => setTheme('dark')}
                className={`relative z-10 flex-1 flex items-center justify-center py-1 transition-colors ${theme === 'dark' ? 'text-white' : 'text-black/50 hover:text-black/80'}`}
                aria-label="Dark theme"
              >
                <Moon size={14} />
              </button>
              <button 
                onClick={() => setTheme('light')}
                className={`relative z-10 flex-1 flex items-center justify-center py-1 transition-colors ${theme === 'light' ? 'text-black' : 'text-white/50 hover:text-white/80'}`}
                aria-label="Light theme"
              >
                <Sun size={14} />
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white p-2 rounded-full bg-white/5 border border-white/10 ml-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center overflow-hidden"
          >
            <div className="flex flex-col items-center p-6 gap-6 w-full max-h-screen overflow-y-auto">
              {['Servisler', 'Araçlar', 'Referanslar', 'Yorumlar', 'Galeri', 'Blog', 'Hakkımızda', 'S.S.S.', 'İletişim'].map((item, i) => {
                const itemId = item === 'S.S.S.' ? 'faq' : item === 'Yorumlar' ? 'testimonials' : item === 'Araçlar' ? 'araclar' : item === 'Hakkımızda' ? 'hakkimizda' : item === 'İletişim' ? 'iletisim' : item.toLowerCase();
                const isActive = activeSection === itemId;
                return (
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={item} 
                    className={`text-2xl font-bold transition-all block text-center ${isActive ? 'text-brand scale-110' : 'text-white hover:text-white/80'}`} 
                    onClick={() => {
                      setIsMenuOpen(false);
                      const element = document.getElementById(itemId);
                      if (element) {
                        const y = element.getBoundingClientRect().top + window.scrollY - 80;
                        setTimeout(() => {
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }, 200);
                      }
                    }}
                  >
                    {item}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};