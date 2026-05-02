import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';

const ReferenceCard = ({ name, image, sector }: { name: string, image: string, sector: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="relative group overflow-hidden rounded-3xl cursor-pointer aspect-square bg-white/5 flex items-center justify-center p-8 border border-white/5 hover:border-brand/50 transition-all"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent opacity-80 z-10" />
    <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-40 group-hover:opacity-60" />
    <div className="relative z-20 flex flex-col items-center text-center">
      <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">{name}</h3>
      <p className="text-brand text-[10px] uppercase tracking-widest font-bold">{sector}</p>
    </div>
  </motion.div>
);

export const Referanslar = () => {
  return (
    <section id="referanslar" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="GÜVENENLER">Referanslarımız.</SectionHeading>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <ReferenceCard 
            name="Nenessa Hotel"
            sector="Turizm & Otelcilik"
            image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
          />
          {/* Gelecekte eklenecek referanslar için yer tutucular */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative group overflow-hidden rounded-3xl aspect-square bg-white/5 flex flex-col items-center justify-center p-8 border border-white/5 border-dashed hover:border-brand/30 transition-all"
          >
            <span className="text-white/20 font-bold mb-2">Çok Yakında</span>
            <span className="text-brand/40 text-[10px] uppercase tracking-widest font-bold">Yeni Proje</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative group overflow-hidden rounded-3xl aspect-square bg-white/5 flex flex-col items-center justify-center p-8 border border-white/5 border-dashed hover:border-brand/30 transition-all"
          >
            <span className="text-white/20 font-bold mb-2">Çok Yakında</span>
            <span className="text-brand/40 text-[10px] uppercase tracking-widest font-bold">Yeni Proje</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative group overflow-hidden rounded-3xl aspect-square bg-white/5 flex flex-col items-center justify-center p-8 border border-white/5 border-dashed hover:border-brand/30 transition-all"
          >
            <span className="text-white/20 font-bold mb-2">Çok Yakında</span>
            <span className="text-brand/40 text-[10px] uppercase tracking-widest font-bold">Yeni Proje</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
