import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const ProjectCard = ({ title, category, image, size = 'small' }: { title: string, category: string, image: string, size?: 'small' | 'large' }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className={`relative group overflow-hidden rounded-3xl cursor-pointer ${size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}`}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-60 z-10" />
    <img src={image} alt={title} className="w-full h-full object-cover aspect-video group-hover:scale-110 transition-transform duration-700" />
    <div className="absolute bottom-0 left-0 p-8 z-20">
      <p className="text-brand text-xs uppercase tracking-widest font-bold mb-2">{category}</p>
      <h3 className="text-2xl font-bold">{title}</h3>
      <div 
        className="mt-4 flex items-center gap-2 text-white/0 group-hover:text-white/100 transition-all"
      >
        <span>Detayları Gör</span>
        <ArrowRight size={16} />
      </div>
    </div>
  </motion.div>
);

export const Projeler = () => {
  return (
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
  );
};
