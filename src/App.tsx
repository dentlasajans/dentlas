import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Servisler } from './components/sections/Servisler';
import { TasarimAraclari } from './components/sections/TasarimAraclari';
import { Hakkimda } from './components/sections/Hakkimda';
import { Referanslar } from './components/sections/Referanslar';
import { Galeri } from './components/sections/Galeri';
import { Blog } from './components/sections/Blog';
import { Iletisim } from './components/sections/Iletisim';
import { Footer } from './components/Footer';
import { KVKKModal } from './components/modals/KVKKModal';
import { PrivacyModal } from './components/modals/PrivacyModal';
import { CustomCursor } from './components/CustomCursor';
import { ContactWidget } from './components/ContactWidget';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          aria-label="Başa Dön"
          className="fixed bottom-24 right-6 md:bottom-8 md:left-8 md:right-auto z-40 w-12 h-12 bg-white/5 border border-white/10 hover:border-brand hover:bg-white/10 text-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-colors"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isKvkkOpen, setIsKvkkOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <KVKKModal isOpen={isKvkkOpen} onClose={() => setIsKvkkOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      
      <AnimatedBackground />
      <Navbar />

      <Hero />
      <Stats />
      <Servisler />
      <TasarimAraclari />
      <Referanslar />
      <Galeri />
      <Hakkimda />
      <Blog />
      <Iletisim setIsKvkkOpen={setIsKvkkOpen} />
      
      <Footer setIsKvkkOpen={setIsKvkkOpen} setIsPrivacyOpen={setIsPrivacyOpen} />
      
      <ContactWidget />
      <ScrollToTop />
    </div>
  );
}
