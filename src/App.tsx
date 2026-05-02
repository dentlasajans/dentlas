/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  ArrowRight, 
  Cpu, 
  Globe, 
  Zap, 
  Users, 
  BarChart3, 
  MessageSquare,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { useState, useEffect, useRef, ReactNode } from 'react';

// --- Background Component ---
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div 
        className="mesh-animate absolute inset-0 opacity-40 md:opacity-100"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, #1e1b4b 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, #1e3a8a 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, #050505 0%, #050505 100%)
          `
        }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-150" />
    </div>
  );
};

// --- Custom Components ---

const Navbar = () => {
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
          <img src="https://res.cloudinary.com/dejx0brol/image/upload/v1777703150/Ba%C5%9Fl%C4%B1ks%C4%B1z-1_azwxju.png" alt="Dentlas Ajans Logo" className="h-10 md:h-12 w-auto" />
          <div className="text-xl md:text-2xl font-bold tracking-tighter hidden sm:block">
            Dentlas <span className="font-light opacity-80">Ajans</span>
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          {['Servisler', 'Projeler', 'Ekibimiz', 'Galeri', 'İletişim'].map((item, i) => (
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
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            className="md:hidden glass border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {['Servisler', 'Projeler', 'Ekibimiz', 'Galeri', 'İletişim'].map((item) => (
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

const SectionHeading = ({ children, subtitle }: { children: ReactNode, subtitle?: string }) => (
  <div className="mb-16">
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-brand text-xs uppercase tracking-[0.3em] font-bold mb-4"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-extrabold tracking-tight"
    >
      {children}
    </motion.h2>
  </div>
);

const ServiceCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
    className="p-10 glass rounded-2xl border border-white/5 hover:border-brand transition-all group"
  >
    <div className="text-brand mb-6 text-sm font-black tracking-widest flex items-center gap-3">
      <span className="opacity-40">{(delay * 10 + 1).toString().padStart(2, '0')}</span>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-4 tracking-tight">{title}</h3>
    <p className="text-white/50 leading-relaxed text-sm font-light">{description}</p>
  </motion.div>
);

const ProjectCard = ({ title, category, image, size = 'small' }: { title: string, category: string, image: string, size?: 'small' | 'large' }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    className={`relative group overflow-hidden rounded-3xl cursor-pointer ${size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}`}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-60 z-10" />
    <img src={image} alt={title} className="w-full h-full object-cover aspect-video group-hover:scale-110 transition-transform duration-700" />
    <div className="absolute bottom-0 left-0 p-8 z-20">
      <p className="text-brand text-xs uppercase tracking-widest font-bold mb-2">{category}</p>
      <h3 className="text-2xl font-bold">{title}</h3>
      <motion.div 
        className="mt-4 flex items-center gap-2 text-white/0 group-hover:text-white/100 transition-all"
      >
        <span>Detayları Gör</span>
        <ArrowRight size={16} />
      </motion.div>
    </div>
  </motion.div>
);

const TeamCard = ({ name, role, image, delay }: { name: string, role: string, image: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="group"
  >
    <div className="relative overflow-hidden rounded-3xl mb-6 aspect-[4/5]">
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex gap-3">
          <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-brand transition-colors text-white"><Linkedin size={16} /></a>
          <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-brand transition-colors text-white"><Twitter size={16} /></a>
        </div>
      </div>
    </div>
    <h3 className="text-xl font-bold tracking-tight mb-1">{name}</h3>
    <p className="text-brand text-[10px] uppercase tracking-[0.2em] font-black opacity-80">{role}</p>
  </motion.div>
);

const GalleryItem = ({ image, delay, size = 'small' }: { image: string, delay: number, size?: 'small'|'large'|'tall'|'wide' }) => {
  let cssClass = "";
  if (size === 'large') cssClass = "md:col-span-2 md:row-span-2";
  else if (size === 'tall') cssClass = "md:row-span-2";
  else if (size === 'wide') cssClass = "md:col-span-2";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${cssClass}`}
    >
      <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay" />
      <img src={image} alt="Gallery item" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 min-h-[250px]" />
    </motion.div>
  );
};

// --- Main App Component ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div style={{ scale, opacity }}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 glass rounded-full text-brand text-[8px] font-black tracking-[0.3em] mb-10 uppercase"
            >
              Yapay Zeka Odaklı Strateji
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[72px] md:text-[104px] font-extrabold tracking-[-0.04em] leading-[0.85] mb-10"
            >
              Dijital <br />  
              <span className="text-brand text-glow">Etki</span> <br /> 
              Fabrikası
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 max-w-sm font-light leading-relaxed mb-12 opacity-80"
            >
              Markanızı modern dünyanın dinamikleriyle büyüten teknoloji odaklı sosyal medya ve kreatif strateji ajansı.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-white text-black px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl">
                Geleceği İnşa Et <ArrowRight size={16} />
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20, delay: 0.4 }}
            className="hidden md:flex justify-center relative"
          >
            <div className="absolute inset-0 bg-brand/20 blur-[100px] animate-pulse" />
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 glass p-4 rounded-[4rem] border-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800" 
                alt="3D Abstract" 
                className="w-full max-w-sm rounded-[3.5rem] shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Kaydırın</span>
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Organik Erişim', value: '+420%' },
            { label: 'Aylık Etkileşim', value: '12M' },
            { label: 'Dönüşüm Oranı', value: '85k' },
            { label: 'Analiz Hızı', value: '15ms' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-l-2 border-brand pl-8"
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="servisler" className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="TEKNOLOJİ ODAKLI">Sınırları <br /> Ortadan Kaldırın.</SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard 
              icon={BarChart3}
              title="Veri Odaklı Strateji"
              description="Yapay zeka destekli analizlerle hedef kitlenizin her hareketini öngörüyor ve optimize ediyoruz."
              delay={0}
            />
            <ServiceCard 
              icon={Zap}
              title="Kreatif Prodüksiyon"
              description="Minimalist ve çarpıcı görsel dille markanızın hikayesini geleceğin standartlarında yazıyoruz."
              delay={0.1}
            />
            <ServiceCard 
              icon={Globe}
              title="Viral Büyüme"
              description="Trendleri takip etmek yerine, markanızı trendlerin merkezine profesyonelce yerleştiriyoruz."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="projeler" className="py-32 px-6 bg-brand/[0.02]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="PORTFOLYO">Son Çalışmalarımız.</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProjectCard 
              title="Cyber Fusion"
              category="Marka Kimliği"
              image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
              size="large"
            />
            <ProjectCard 
              title="Aurora App"
              category="Üretim"
              image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
            />
            <ProjectCard 
              title="Nebula NFT"
              category="Sosyal Medya"
              image="https://images.unsplash.com/photo-1644368684752-670dc6c39972?auto=format&fit=crop&q=80&w=800"
            />
            <ProjectCard 
              title="Zenith Watch"
              category="E-Ticaret"
              image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"
            />
            <ProjectCard 
              title="Pulse Health"
              category="Kampanya"
              image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="ekibimiz" className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="YARATICI EKİP">Geleceği Kuran <br /> İnsanlar.</SectionHeading>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamCard 
              name="Ahmet Yılmaz" 
              role="Kurucu & Stratejist" 
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" 
              delay={0} 
            />
            <TeamCard 
              name="Zeynep Kaya" 
              role="Kreatif Direktör" 
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" 
              delay={0.1} 
            />
            <TeamCard 
              name="Caner Demir" 
              role="Dijital Pazarlama Uzmanı" 
              image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600" 
              delay={0.2} 
            />
            <TeamCard 
              name="Elif Şahin" 
              role="Sosyal Medya Yöneticisi" 
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600" 
              delay={0.3} 
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeri" className="py-32 px-6 bg-brand/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-brand text-xs uppercase tracking-[0.3em] font-bold mb-4"
              >
                STÜDYO & GALERİ
              </motion.p>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-extrabold tracking-tight"
              >
                Kamera Arkası.
              </motion.h2>
            </div>
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
            >
              TÜMÜNÜ GÖR
            </motion.button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
            <GalleryItem image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" delay={0.0} size="large" />
            <GalleryItem image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" delay={0.1} />
            <GalleryItem image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" delay={0.2} />
            <GalleryItem image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" delay={0.3} size="wide" />
            <GalleryItem image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600" delay={0.4} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="iletişim" className="py-32 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeading subtitle="İLETİŞİM">Hazırsanız <br /> Başlayalım.</SectionHeading>
              <p className="text-white/60 text-lg font-light mb-12">
                Hayalinizdeki dijital varlığı gerçeğe dönüştürmek için bir kahve içelim. Fikirleriniz bizimle güvende.
              </p>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">E-posta Gönderin</p>
                    <p className="text-lg font-medium">hello@dentlasajans.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                    <Globe size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Ofisimizi Ziyaret Edin</p>
                    <p className="text-lg font-medium">Maslak No:1, İstanbul</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-12 glass rounded-3xl border-white/5"
            >
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30">İsim</label>
                    <input type="text" className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-5 focus:border-brand focus:outline-none transition-all placeholder:opacity-30" placeholder="İsminiz..." />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30">E-posta</label>
                    <input type="email" className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-5 focus:border-brand focus:outline-none transition-all placeholder:opacity-30" placeholder="E-posta adresiniz..." />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30">Mesajınız</label>
                  <textarea rows={4} className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-5 focus:border-brand focus:outline-none transition-all resize-none placeholder:opacity-30" placeholder="Projeniz hakkında kısa bir bilgi..."></textarea>
                </div>
                <button type="submit" className="w-full bg-white text-black p-6 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl">
                  BAŞLAYALIM
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex items-center gap-4">
              <img src="https://res.cloudinary.com/dejx0brol/image/upload/v1777703150/Ba%C5%9Fl%C4%B1ks%C4%B1z-1_azwxju.png" alt="Dentlas Ajans Logo" className="h-10 md:h-12 w-auto opacity-90" />
              <div className="text-xl md:text-2xl font-bold tracking-tighter">
                Dentlas <span className="font-light opacity-50">Ajans</span>
              </div>
            </div>
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">© 2024 Dentlas Ajans. TÜM HAKLARI SAKLIDIR.</p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-brand transition-colors"><Instagram size={20} /></a>
            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-brand transition-colors"><Twitter size={20} /></a>
            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-brand transition-colors"><Linkedin size={20} /></a>
          </div>

          <div className="flex gap-8 text-xs uppercase tracking-widest font-bold text-white/40">
            <a href="#" className="hover:text-brand">KVKK</a>
            <a href="#" className="hover:text-brand">Gizlilik</a>
            <a href="#" className="hover:text-brand">SSS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
