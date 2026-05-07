import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';

// Lazy loaded components for performance optimization
const Servisler = lazy(() => import('./components/sections/Servisler').then(module => ({ default: module.Servisler })));
const TasarimAraclari = lazy(() => import('./components/sections/TasarimAraclari').then(module => ({ default: module.TasarimAraclari })));
const Hakkimda = lazy(() => import('./components/sections/Hakkimda').then(module => ({ default: module.Hakkimda })));
const Referanslar = lazy(() => import('./components/sections/Referanslar').then(module => ({ default: module.Referanslar })));
const Testimonials = lazy(() => import('./components/sections/Testimonials').then(module => ({ default: module.Testimonials })));
const Galeri = lazy(() => import('./components/sections/Galeri').then(module => ({ default: module.Galeri })));
const Blog = lazy(() => import('./components/sections/Blog').then(module => ({ default: module.Blog })));
const FAQ = lazy(() => import('./components/sections/FAQ').then(module => ({ default: module.FAQ })));
const Iletisim = lazy(() => import('./components/sections/Iletisim').then(module => ({ default: module.Iletisim })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const KVKKModal = lazy(() => import('./components/modals/KVKKModal').then(module => ({ default: module.KVKKModal })));
const PrivacyModal = lazy(() => import('./components/modals/PrivacyModal').then(module => ({ default: module.PrivacyModal })));
const ContactWidget = lazy(() => import('./components/ContactWidget').then(module => ({ default: module.ContactWidget })));


import { CustomCursor } from './components/CustomCursor';

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
      
      <AnimatedBackground />
      <Navbar />

      <Hero />
      <Stats />
      
      <Suspense fallback={null}>
        <Servisler />
        <TasarimAraclari />
        <Referanslar />
        <Testimonials />
        <Galeri />
        <Hakkimda />
        <Blog />
        <FAQ />
        <Iletisim setIsKvkkOpen={setIsKvkkOpen} />
        
        <Footer setIsKvkkOpen={setIsKvkkOpen} setIsPrivacyOpen={setIsPrivacyOpen} />
        
        <ContactWidget />
        <ScrollToTop />
        <KVKKModal isOpen={isKvkkOpen} onClose={() => setIsKvkkOpen(false)} />
        <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      </Suspense>
    </div>
  );
}
