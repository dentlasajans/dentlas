import { useState } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Servisler } from './components/sections/Servisler';
import { Projeler } from './components/sections/Projeler';
import { TasarimAraclari } from './components/sections/TasarimAraclari';
import { Ekibimiz } from './components/sections/Ekibimiz';
import { Galeri } from './components/sections/Galeri';
import { Iletisim } from './components/sections/Iletisim';
import { Footer } from './components/Footer';
import { KVKKModal } from './components/modals/KVKKModal';
import { PrivacyModal } from './components/modals/PrivacyModal';

export default function App() {
  const [isKvkkOpen, setIsKvkkOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <KVKKModal isOpen={isKvkkOpen} onClose={() => setIsKvkkOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      
      <AnimatedBackground />
      <Navbar />

      <Hero />
      <Stats />
      <Servisler />
      <Projeler />
      <TasarimAraclari />
      <Ekibimiz />
      <Galeri />
      <Iletisim setIsKvkkOpen={setIsKvkkOpen} />
      
      <Footer setIsKvkkOpen={setIsKvkkOpen} setIsPrivacyOpen={setIsPrivacyOpen} />
    </div>
  );
}
