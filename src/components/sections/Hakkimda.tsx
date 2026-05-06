import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';

export const Hakkimda = () => {
  return (
    <section id="hakkımda" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="BEN KİMİM?">Geleceği Kuran <br /> Tasarımcı.</SectionHeading>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative group rounded-3xl overflow-hidden aspect-[4/5] max-w-[280px] sm:max-w-xs mx-auto lg:mx-0 w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent z-10" />
            <img 
              src="https://res.cloudinary.com/dejx0brol/image/upload/v1777882709/20250615_001859_0000_hdtdmt.png" 
              alt="Himmet Muhammed KILIÇ" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 w-full p-8 z-20">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">Himmet Muhammed KILIÇ</h3>
              <p className="text-brand text-[10px] uppercase tracking-[0.2em] font-black opacity-80">Kurucu</p>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 text-white/70"
          >
            <p className="text-xl md:text-2xl leading-relaxed text-white">
              Her markanın anlatılmaya değer bir hikayesi vardır. Ben bu hikayeleri en etkili görsel ve stratejik dille buluşturmak için çalışıyorum.
            </p>
            <p className="leading-relaxed">
              Uzun yıllara dayanan dijital medya tecrübem ile sosyal medya yönetiminden profesyonel fotoğrafçılığa, grafik tasarımdan reklam yönetimine kadar markanızın tüm dijital ihtiyaçlarına 360 derece çözümler üretiyorum.
            </p>
            <p className="leading-relaxed">
              Nenessa Hotel gibi değerli markalarla yürüttüğümüz başarılı projeler, vizyonumuzun en iyi yansımalarından biridir. Sizin markanızı da bir sonraki seviyeye taşımak için buradayım.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
