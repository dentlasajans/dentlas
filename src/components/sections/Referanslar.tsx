import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const references = [
  {
    name: "Nenessa Hotel",
    sector: "Turizm & Otelcilik",
    logo: "https://res.cloudinary.com/dejx0brol/image/upload/v1777882176/logo_beyaz_jfwaxk.png",
    description: "Nenessa Hotel markasının dijital dünyadaki varlığını güçlendirmek için stratejik adımlar attık. Kurumsal kimlik tasarımı, sosyal medya yönetimi ve reklam kampanyaları ile marka bilinirliğini artırdık.",
    features: ["Kurumsal Kimlik", "Sosyal Medya Yönetimi", "Performans Reklamları", "Fotoğraf & Video Çekimi"]
  },
  {
    name: "Çok Yakında",
    sector: "Yeni Proje",
    description: "Yeni projemiz için çalışmalarımız devam ediyor. Çok yakında detayları buradan inceleyebilirsiniz.",
    features: ["Çok Yakında", "Çok Yakında", "Çok Yakında", "Çok Yakında"]
  },
  {
    name: "Çok Yakında",
    sector: "Yeni Proje",
    description: "Yeni projemiz için çalışmalarımız devam ediyor. Çok yakında detayları buradan inceleyebilirsiniz.",
    features: ["Çok Yakında", "Çok Yakında", "Çok Yakında", "Çok Yakında"]
  },
  {
    name: "Çok Yakında",
    sector: "Yeni Proje",
    description: "Yeni projemiz için çalışmalarımız devam ediyor. Çok yakında detayları buradan inceleyebilirsiniz.",
    features: ["Çok Yakında", "Çok Yakında", "Çok Yakında", "Çok Yakında"]
  }
];

const ReferenceCard = ({ name, logo, sector, onClick }: { name: string, logo?: string, sector: string, onClick: () => void }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className="relative group overflow-hidden rounded-3xl aspect-square bg-white/5 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 border border-white/5 hover:border-brand/30 transition-all cursor-pointer w-full"
  >
    <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-3 sm:mb-6 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
      {logo ? (
        <img src={logo} alt={name} className="max-w-full max-h-full object-contain drop-shadow-lg" />
      ) : (
        <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full border border-white/20 border-dashed" />
      )}
    </div>
    <div className="flex flex-col items-center text-center w-full">
      <h3 className="text-sm sm:text-xl md:text-2xl font-bold mb-1 text-white truncate w-full">{name}</h3>
      <p className="text-brand text-[8px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest font-bold truncate w-full">{sector}</p>
    </div>
  </motion.div>
);

export const Referanslar = () => {
  const [selectedRef, setSelectedRef] = useState<any | null>(null);

  const handleOpenModal = (item: any) => {
    setSelectedRef(item);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedRef(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="referanslar" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="GÜVENENLER">Referanslarımız.</SectionHeading>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {references.map((item, index) => (
            <ReferenceCard 
              key={index}
              name={item.name}
              sector={item.sector}
              logo={item.logo}
              onClick={() => handleOpenModal(item)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedRef && (
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
              className="relative w-full max-w-lg glass border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white z-20"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-6 mb-8 relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 flex items-center justify-center p-3 border border-white/5 shadow-inner">
                  {selectedRef.logo ? (
                    <img src={selectedRef.logo} alt={selectedRef.name} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <div className="w-8 h-8 rounded-full border border-white/20 border-dashed" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight leading-tight">{selectedRef.name}</h3>
                  <p className="text-brand text-[10px] uppercase tracking-[0.2em] font-black">{selectedRef.sector}</p>
                </div>
              </div>

              <div className="space-y-8 relative z-10">
                <p className="text-white/80 leading-relaxed font-light">
                  {selectedRef.description}
                </p>

                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50 mb-4 pb-4 border-b border-white/5">Çalışma Kapsamı</h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {selectedRef.features.map((feature: string, idx: number) => (
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
