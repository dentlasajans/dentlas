import { motion } from 'motion/react';
import { Twitter, Linkedin } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

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

export const Ekibimiz = () => {
  return (
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
  );
};
