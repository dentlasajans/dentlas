import { motion } from 'motion/react';
import { Linkedin, Instagram } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

export const Hakkimda = () => {
  return (
    <section id="hakkımda" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="BEN KİMİM?">Geleceği Kuran <br /> Tasarımcı.</SectionHeading>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative group rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" 
              alt="Himmet Muhammed KILIÇ" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute bottom-0 left-0 w-full p-8 z-20">
              <h3 className="text-3xl font-bold tracking-tight mb-2">Himmet Muhammed KILIÇ</h3>
              <p className="text-brand text-sm uppercase tracking-[0.2em] font-black opacity-80 mb-6">Kurucu & Kreatif Stratejist</p>
              
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-brand transition-colors text-white hover:bg-white/10"><Linkedin size={20} /></a>
                <a href="https://instagram.com/dentlasajans" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-brand transition-colors text-white hover:bg-white/10"><Instagram size={20} /></a>
              </div>
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
