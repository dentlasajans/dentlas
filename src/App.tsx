import { useState } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Servisler } from './components/sections/Servisler';
import { Projeler } from './components/sections/Projeler';
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
      <Projeler />
      <TasarimAraclari />
      <Referanslar />
      <Galeri />
      <Hakkimda />
      <Blog />
      <Iletisim setIsKvkkOpen={setIsKvkkOpen} />
      
      <Footer setIsKvkkOpen={setIsKvkkOpen} setIsPrivacyOpen={setIsPrivacyOpen} />
    </div>
  );
}
