import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Check } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const projects = [
  {
    title: "AtlasPOS",
    category: "Modern Restoran Yönetim Sistemi",
    image: "https://camo.githubusercontent.com/0a4f0c3ae548a092969395585c2d491f13257c469264aafde14b0bc74627860b/68747470733a2f2f7374617469632e7769787374617469632e636f6d2f6d656469612f3738303166635f61663136633130636432346134613565623161306161633131626266303531627e6d76322e706e67",
    description: "AtlasPOS, restoranların sipariş, stok, müşteri ve personel yönetimini tek bir noktadan yapabilmelerini sağlayan modern ve bulut tabanlı bir restoran yönetim sistemidir.",
    features: ["UI/UX Tasarım", "Önyüz Geliştirme", "Kimlik Tasarımı", "Sistem Mimarisi"]
  }
];

const ProjectCard = ({ title, category, image, onClick, index }: { title: string, category: string, image: string, onClick: () => void, index: number }) => {
  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: index * 0.1 } }
  };

  return (
    <motion.div 
      variants={itemVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="relative group overflow-hidden rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
      <img src={image} alt={title} className="w-full h-full object-cover aspect-square group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 bg-white/5" loading="lazy" />
      <div className="absolute bottom-0 left-0 p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-brand text-[10px] uppercase tracking-[0.3em] font-black mb-3">{category}</p>
        <h3 className="text-3xl font-extrabold text-white mb-2">{title}</h3>
        <div 
          className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-white font-medium"
        >
          <span className="border-b border-brand border-dashed pb-1">Projeyi İncele</span>
          <ArrowRight size={18} className="text-brand" />
        </div>
      </div>
    </motion.div>
  );
};

export const Projeler = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const handleOpenModal = (item: any) => {
    setSelectedProject(item);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="projeler" className="py-32 px-6 bg-brand/[0.02] relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="PORTFOLYO">Son Çalışmalarımız.</SectionHeading>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard 
              key={idx}
              index={idx}
              title={project.title}
              category={project.category}
              image={project.image}
              onClick={() => handleOpenModal(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl glass border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white z-20"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                <div className="rounded-2xl overflow-hidden aspect-square border border-white/10 bg-white/5">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex flex-col justify-center md:pr-4 pt-8 md:pt-0">
                  <p className="text-brand text-[10px] uppercase tracking-[0.2em] font-black mb-2 pr-10">{selectedProject.category}</p>
                  <h3 className="text-3xl font-bold text-white mb-6 tracking-tight pr-10">{selectedProject.title}</h3>
                  
                  <p className="text-white/80 leading-relaxed font-light mb-8">
                    {selectedProject.description}
                  </p>

                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50 mb-4 pb-4 border-b border-white/5">Çalışma Kapsamı</h4>
                    <ul className="grid grid-cols-1 gap-3">
                      {selectedProject.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                          <div className="mt-0.5 text-brand bg-brand/10 p-0.5 rounded-full min-w-[16px]">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
