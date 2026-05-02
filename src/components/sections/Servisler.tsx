import { motion } from 'motion/react';
import { Share2, PenTool, Contact, BookOpen, Video, Camera, Megaphone, Search } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const ServiceCard = ({ icon: Icon, title, delay }: { icon: any, title: string, delay: number }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 md:p-10 glass rounded-2xl border border-white/5 hover:border-brand transition-all group flex flex-col items-center text-center"
  >
    <div className="text-brand mb-6 text-sm font-black tracking-widest flex items-center justify-center w-16 h-16 rounded-full bg-white/5 group-hover:bg-brand/20 transition-colors">
      <Icon size={32} />
    </div>
    <h3 className="text-lg md:text-xl font-bold tracking-tight text-white">{title}</h3>
  </motion.div>
);

export const Servisler = () => {
  return (
    <section id="servisler" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="HİZMETLERİM">Sınırları <br /> Ortadan Kaldırın.</SectionHeading>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ServiceCard 
            icon={Share2}
            title="Sosyal Medya Yönetimi"
            delay={0}
          />
          <ServiceCard 
            icon={PenTool}
            title="Logo Tasarımı"
            delay={0.1}
          />
          <ServiceCard 
            icon={Contact}
            title="Kartvizit Tasarımı"
            delay={0.2}
          />
          <ServiceCard 
            icon={BookOpen}
            title="Broşür Tasarımı"
            delay={0.3}
          />
          <ServiceCard 
            icon={Video}
            title="Drone Çekimi"
            delay={0.4}
          />
          <ServiceCard 
            icon={Camera}
            title="Ürün Çekimi"
            delay={0.5}
          />
          <ServiceCard 
            icon={Megaphone}
            title="Meta Reklam Yönetimi"
            delay={0.6}
          />
          <ServiceCard 
            icon={Search}
            title="Google Reklam Yönetimi"
            delay={0.7}
          />
        </div>
      </div>
    </section>
  );
};
