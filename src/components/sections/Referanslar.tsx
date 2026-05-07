import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const references = [
  {
    name: "Nenessa Hotel",
    sector: "Turizm & Otelcilik",
    logo: "https://res.cloudinary.com/dejx0brol/image/upload/v1777882176/logo_beyaz_jfwaxk.png",
    description: "Nenessa Hotel markasının dijital dünyadaki varlığını güçlendirmek için stratejik adımlar attık. Kurumsal kimlik tasarımı, sosyal medya yönetimi ve reklam kampanyaları ile marka bilinirliğini artırdık.",
    problem: "Otel için modern, kullanıcı dostu ve rezervasyonları artıracak bir dijital kimlik ve düzenli sosyal medya yönetimi eksikliği hissediliyordu.",
    solution: "Kurumsal kimlik yenilendi, yüksek kaliteli fotoğraf ve video çekimleri yapıldı. Etkileşim odaklı, estetik bir sosyal medya stratejisi uygulanarak potansiyel müşterilerle bağ kuruldu.",
    features: ["Kurumsal Kimlik", "Sosyal Medya Yönetimi", "Performans Reklamları", "Fotoğraf & Video Çekimi"],
    tools: ["Adobe Premiere Pro", "Adobe Photoshop", "Figma", "Meta Business"]
  },
  {
    name: "Çok Yakında",
    sector: "Yeni Proje",
    description: "Yeni projemiz için çalışmalarımız devam ediyor. Çok yakında detayları buradan inceleyebilirsiniz.",
    problem: "Henüz yayınlanmadı.",
    solution: "Tasarım aşamasında.",
    features: ["Çok Yakında", "Çok Yakında", "Çok Yakında", "Çok Yakında"],
    tools: []
  },
  {
    name: "Çok Yakında",
    sector: "Yeni Proje",
    description: "Yeni projemiz için çalışmalarımız devam ediyor. Çok yakında detayları buradan inceleyebilirsiniz.",
    problem: "Henüz yayınlanmadı.",
    solution: "Tasarım aşamasında.",
    features: ["Çok Yakında", "Çok Yakında", "Çok Yakında", "Çok Yakında"],
    tools: []
  },
  {
    name: "Çok Yakında",
    sector: "Yeni Proje",
    description: "Yeni projemiz için çalışmalarımız devam ediyor. Çok yakında detayları buradan inceleyebilirsiniz.",
    problem: "Henüz yayınlanmadı.",
    solution: "Tasarım aşamasında.",
    features: ["Çok Yakında", "Çok Yakında", "Çok Yakında", "Çok Yakında"],
    tools: []
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
        <img src={logo} alt={name} loading="lazy" className="max-w-full max-h-full object-contain drop-shadow-lg" />
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

  useEffect(() => {
    if (selectedRef) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedRef]);

  const handleOpenModal = (item: any) => {
    setSelectedRef(item);
  };

  const handleCloseModal = () => {
    setSelectedRef(null);
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 pt-[10vh] pb-[10vh] sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full md:max-w-4xl lg:max-w-5xl glass border border-white/10 rounded-3xl shadow-2xl z-10 flex flex-col max-h-[80dvh] sm:max-h-[calc(100vh-4rem)] overflow-hidden"
            >
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[60]">
                <button 
                  aria-label="Kapat"
                  onClick={handleCloseModal}
                  className="w-10 h-10 bg-black/60 border border-white/10 rounded-full flex items-center justify-center hover:bg-red-500/80 hover:border-red-500 transition-colors text-white backdrop-blur-md shadow-xl"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar flex-1 w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                <div className="md:col-span-12 lg:col-span-12 w-full grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
                  <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="flex items-center gap-6 relative z-10 pr-12 md:pr-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 flex items-center justify-center p-3 border border-white/5 shadow-inner flex-shrink-0">
                        {selectedRef.logo ? (
                          <img src={selectedRef.logo} alt={selectedRef.name} className="max-w-full max-h-full object-contain" loading="lazy" />
                        ) : (
                          <div className="w-8 h-8 rounded-full border border-white/20 border-dashed" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight leading-tight">{selectedRef.name}</h3>
                        <p className="text-brand text-[10px] uppercase tracking-[0.2em] font-black">{selectedRef.sector}</p>
                      </div>
                    </div>

                    <p className="text-white/80 leading-relaxed font-light">
                      {selectedRef.description}
                    </p>
                  </div>

                  <div className="md:col-span-3 space-y-8 relative z-10 pt-4 md:pt-0 md:border-l md:border-white/5 md:pl-8 lg:pl-12">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50 mb-4 pb-2 border-b border-white/5">Problem & Çözüm (Vaka Analizi)</h4>
                      {selectedRef.problem && (
                        <div className="mb-4">
                          <strong className="text-white text-xs block mb-1">Problem:</strong>
                          <p className="text-white/70 text-sm leading-relaxed font-light">{selectedRef.problem}</p>
                        </div>
                      )}
                      {selectedRef.solution && (
                        <div className="mb-6">
                          <strong className="text-white text-xs block mb-1">Çözüm:</strong>
                          <p className="text-white/70 text-sm leading-relaxed font-light">{selectedRef.solution}</p>
                        </div>
                      )}
                      
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50 mb-4 pb-2 border-b border-white/5 mt-8">Çalışma Kapsamı</h4>
                      <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                        {selectedRef.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                            <div className="mt-0.5 text-brand bg-brand/10 p-0.5 rounded-full min-w-[16px]">
                              <Check size={12} strokeWidth={3} />
                            </div>
                            <span className="font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {selectedRef.tools && selectedRef.tools.length > 0 && (
                        <div className="mt-8">
                          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50 mb-4 pb-2 border-b border-white/5">Kullanılan Araçlar</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedRef.tools.map((tool: string, idx: number) => (
                              <span key={idx} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/80">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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
