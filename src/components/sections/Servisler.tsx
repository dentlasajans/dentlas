import { motion } from 'motion/react';
import { BarChart3, Zap, Globe } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

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
    <h3 className="text-xl font-bold mb-4 tracking-tight text-white">{title}</h3>
    <p className="text-white leading-relaxed text-sm font-light">{description}</p>
  </motion.div>
);

export const Servisler = () => {
  return (
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
  );
};
