import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';

const statsData = [
  { 
    label: 'Organik Erişim', 
    value: '+420%',
    title: 'Organik Büyüme Stratejisi',
    description: 'Markanızın hiçbir reklam bütçesi harcamadan ulaştığı kitle sayısındaki artışı temsil eder. Sosyal medya platformlarının algoritmalarına uygun, trendleri yakalayan ve etkileşimi yüksek içerik stratejilerimizle doğal büyümenizi gerçekleştiriyoruz.',
    features: ['Algoritma Uyumlu İçerik', 'Trend Analizi', 'Reels ve Tiktok Stratejisi', 'Etkileşim Odaklı Metinler'],
    icon: '🚀'
  },
  { 
    label: 'Aylık Etkileşim', 
    value: '12M',
    title: 'Yüksek Etkileşim Oranları',
    description: 'Yönettiğimiz markaların aylık olarak elde ettiği ortalama beğeni, yorum, kaydetme ve paylaşma gibi etkileşimlerin toplamını gösterir. Hedef kitlenizle bağ kuran içeriklerle markanızı sürekli konuşulur kılıyoruz.',
    features: ['Topluluk Yönetimi', 'Yorum İsteyen Gönderiler', 'Viral Odaklı Kurgular', 'Gerçek Zamanlı İletişim'],
    icon: '❤️'
  },
  { 
    label: 'Dönüşüm Oranı', 
    value: '85k',
    title: 'Reklam Dönüşüm Başarısı',
    description: 'Bir aylık süreçte sağladığımız site ziyareti, form doldurma, sepete ekleme veya doğrudan satın alma işlemlerinin toplam tahminidir. Doğru hedefleme ile bütçenizi en verimli şekilde kullanırız.',
    features: ['A/B Testleri', 'Yeniden Hedefleme (Retargeting)', 'Piksel Kurulumu', 'Satış Odaklı Kreatifler'],
    icon: '📈'
  },
  { 
    label: 'Analiz Hızı', 
    value: '15ms',
    title: 'Veri Analizi & Optimizasyon',
    description: 'Kampanya verilerinizin anlık olarak işlenme ve optimize edilme hızını temsil eder. Saniyeler içerisinde verdiğimiz optimizasyon kararları sayesinde reklam maliyetlerinizi düşürüp performansınızı maksimize ediyoruz.',
    features: ['Anlık Raporlama', 'Sürekli Optimizasyon', 'Düşük Maliyet', 'Hedef Kitle Daraltma Testleri'],
    icon: '⚡'
  },
];

const AnimatedStat = ({ stat, i, onClick }: { stat: typeof statsData[0], i: number, onClick: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });
  
  const match = stat.value.match(/^([^0-9]*)([0-9.]+)([^0-9]*)$/);
  const prefix = match ? match[1] : '';
  const numValue = match ? parseFloat(match[2]) : parseFloat(stat.value) || 0;
  const suffix = match ? match[3] : '';
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numValue, {
        duration: 1.0,
        delay: i * 0.1,
        ease: "easeOut"
      });
      return () => controls.stop();
    } else {
      count.set(0);
    }
  }, [isInView, numValue, count, i]);

  return (
    <motion.div 
      ref={ref}
      onClick={onClick}
      className="border-l-2 border-brand/40 hover:border-white pl-8 transition-all duration-300 group cursor-pointer hover:translate-x-2 hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.1 }}
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-brand mb-2 group-hover:text-white transition-colors drop-shadow-[0_0_10px_rgba(59,130,246,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] flex items-center">
        <span className="opacity-80">{prefix}</span>
        <motion.span>{rounded}</motion.span>
        <span className="opacity-80">{suffix}</span>
      </div>
      <div className="text-blue-200/70 group-hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold flex items-center gap-2">
        {stat.label}
        <span className="bg-brand/20 text-brand group-hover:bg-white/20 group-hover:text-white px-2 py-0.5 rounded-full text-[8px] transition-colors">DETAY</span>
      </div>
    </motion.div>
  );
};

export const Stats = () => {
  const [selectedStat, setSelectedStat] = useState<typeof statsData[0] | null>(null);

  useEffect(() => {
    if (selectedStat) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedStat]);

  const handleCloseModal = () => {
    setSelectedStat(null);
  };

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        {statsData.map((stat, i) => (
          <AnimatedStat key={stat.label} stat={stat} i={i} onClick={() => setSelectedStat(stat)} />
        ))}
      </div>

      <AnimatePresence>
        {selectedStat && (
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
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner text-brand flex-shrink-0 text-3xl">
                        {selectedStat.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight leading-tight">{selectedStat.title}</h3>
                        <p className="text-brand text-[10px] uppercase tracking-[0.2em] font-black">{selectedStat.label}</p>
                      </div>
                    </div>

                    <p className="text-white/80 leading-relaxed font-light">
                      {selectedStat.description}
                    </p>
                  </div>

                  <div className="md:col-span-3 space-y-8 relative z-10 pt-4 md:pt-0 md:border-l md:border-white/5 md:pl-8 lg:pl-12 flex flex-col">
                    <div className="flex-shrink-0 mb-4 rounded-2xl overflow-hidden glass border border-white/10 flex items-center justify-center p-12">
                      <div className="text-6xl sm:text-7xl font-black text-brand drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                        {selectedStat.value}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50 mb-4 pb-4 border-b border-white/5">Nasıl Başarıyoruz?</h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {selectedStat.features.map((feature: string, idx: number) => (
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
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
