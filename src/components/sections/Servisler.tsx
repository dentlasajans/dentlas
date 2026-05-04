import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Share2, PenTool, Contact, BookOpen, Video, Camera, Megaphone, Search, X, Check, Heart, MessageCircle, Navigation, Layout, Maximize, MousePointer2, BarChart, Target } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const services = [
  {
    type: 'social',
    icon: Share2,
    title: "Sosyal Medya Yönetimi",
    description: "Markanızın dijital dünyadaki sesini tasarlıyoruz. Hedef kitlenizle etkileşimi artıracak stratejiler, özgün içerikler ve düzenli paylaşımlarla sosyal medya hesaplarınızı profesyonelce yönetiyoruz.",
    features: ["İçerik Stratejisi", "Topluluk Yönetimi", "Rakip Analizi", "Aylık Raporlama"]
  },
  {
    type: 'logo',
    icon: PenTool,
    title: "Logo Tasarımı",
    description: "Markanızın karakterini ve vizyonunu yansıtan, akılda kalıcı ve özgün logo tasarımları oluşturuyoruz. Sektördeki duruşunuzu güçlendirecek kurumsal kimlik temellerini atıyoruz.",
    features: ["Özgün Konsept", "Vektörel Çizim", "Renk ve Tipografi", "Farklı Format Teslimi"]
  },
  {
    type: 'card',
    icon: Contact,
    title: "Kartvizit Tasarımı",
    description: "İlk izlenim önemlidir. Profesyonelliğinizi yansıtan, estetik ve akılda kalıcı kartvizit tasarımlarıyla profesyonel ağınızı güçlendirmenize yardımcı oluyoruz.",
    features: ["Modern Tasarım", "Matbaa Uyumluluğu", "QR Kod Entegrasyonu", "Özel Kesim Seçenekleri"]
  },
  {
    type: 'brochure',
    icon: BookOpen,
    title: "Broşür Tasarımı",
    description: "Hizmetlerinizi veya ürünlerinizi en etkili şekilde anlatan, görsel açıdan zengin ve ikna edici broşür tasarımları ile hedef kitlenize doğrudan ulaşın.",
    features: ["Katalog ve Broşür", "Etkileyici Görseller", "Bilgi Hiyerarşisi", "Baskıya Hazır Format"]
  },
  {
    type: 'drone',
    icon: Video,
    title: "Drone Çekimi",
    description: "Mekanlarınızı, projelerinizi veya etkinliklerinizi kuşbakışı bir perspektifle, yüksek çözünürlüklü ve sinematik detaylarla kayıt altına alarak fark yaratıyoruz.",
    features: ["4K Video Çekimi", "Havadan Fotoğrafçılık", "Sinematik Kurgu", "Tesis Tanıtımı"]
  },
  {
    type: 'product',
    icon: Camera,
    title: "Ürün Çekimi",
    description: "Ürünlerinizin kalitesini ve detaylarını en iyi şekilde yansıtan profesyonel fotoğraf çekimleri yapıyoruz. E-ticaret siteniz veya sosyal medyanız için satış artıran görseller üretiyoruz.",
    features: ["Stüdyo Çekimi", "Konsept Çekim", "Detay ve Macro", "Dekupe ve Rötuş"]
  },
  {
    type: 'meta',
    icon: Megaphone,
    title: "Meta Reklam Yönetimi",
    description: "Instagram ve Facebook platformlarında, hedef kitlenize nokta atışı ulaşan reklam kampanyaları kurguluyoruz. Bütçenizi en verimli şekilde kullanarak dönüşümleri artırıyoruz.",
    features: ["Hedef Kitle Analizi", "A/B Testleri", "Kampanya Optimizasyonu", "Pixel ve Dönüşüm Takibi"]
  },
  {
    type: 'google',
    icon: Search,
    title: "Google Reklam Yönetimi",
    description: "Google Arama, Görüntülü Reklam Ağı ve YouTube üzerinde markanızı doğru zamanda doğru kişilerin karşısına çıkarıyoruz. Performans odaklı stratejilerle satışlarınızı katlıyoruz.",
    features: ["Anahtar Kelime Analizi", "Tıklama Başına Maliyet", "Yeniden Pazarlama", "Performans Raporlaması"]
  }
];

const TopicGraphic = ({ type }: { type: string }) => {
  switch(type) {
    case 'social':
      return (
        <div className="relative w-full h-32 rounded-2xl bg-gradient-to-br from-brand/10 to-purple-500/10 border border-white/5 overflow-hidden mb-8 flex items-center justify-center">
          <motion.div animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-8 sm:left-12 top-6 text-pink-500"><Heart size={28} fill="currentColor" /></motion.div>
          <motion.div animate={{ y: [10, -10, 10], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-10 sm:right-16 top-8 text-blue-400"><MessageCircle size={32} fill="currentColor" /></motion.div>
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-1/2 bottom-6 -translate-x-1/2 text-brand"><Share2 size={36} /></motion.div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
        </div>
      );
    case 'logo':
      return (
        <div className="relative w-full h-32 rounded-2xl bg-gradient-to-br from-brand/10 to-orange-500/10 border border-white/5 overflow-hidden mb-8 flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="absolute w-20 h-20 sm:w-24 sm:h-24 border border-orange-500/30 border-dashed rounded-full" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="absolute w-16 h-16 sm:w-20 sm:h-20 border border-brand/30 rounded-lg" />
          <motion.div animate={{ scale: [0.8, 1.1, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="relative text-orange-400"><PenTool size={36} /></motion.div>
        </div>
      );
    case 'card':
      return (
        <div className="relative w-full h-32 rounded-2xl bg-gradient-to-br from-brand/10 to-emerald-500/10 border border-white/5 overflow-hidden mb-8 flex items-center justify-center" style={{ perspective: '1000px' }}>
          <motion.div 
            animate={{ rotateY: [0, 360] }} 
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} 
            className="w-28 h-16 sm:w-32 sm:h-20 bg-emerald-500/20 border border-emerald-500/40 rounded-md backdrop-blur-sm flex items-center justify-center shadow-lg"
          >
            <Contact size={24} className="text-emerald-400 opacity-80" />
          </motion.div>
          <motion.div animate={{ x: [-50, 50, -50] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="absolute bottom-4 h-0.5 w-1/3 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent blur-[1px]" />
        </div>
      );
    case 'brochure':
      return (
        <div className="relative w-full h-32 rounded-2xl bg-gradient-to-br from-brand/10 to-cyan-500/10 border border-white/5 overflow-hidden mb-8 flex items-center justify-center" style={{ perspective: '1000px' }}>
          <motion.div 
            animate={{ rotateX: [0, 20, 0, -20, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} 
            className="relative flex gap-1 shadow-xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="w-14 h-20 sm:w-16 sm:h-24 bg-cyan-500/10 border border-cyan-500/30 rounded-l-md skew-y-3 flex items-center justify-center">
               <BookOpen size={20} className="text-cyan-400 opacity-30" />
            </div>
            <div className="w-14 h-20 sm:w-16 sm:h-24 bg-cyan-500/20 border border-cyan-500/30 rounded-r-md -skew-y-3 flex items-center justify-center">
              <Layout size={20} className="text-cyan-400 opacity-80" />
            </div>
          </motion.div>
        </div>
      );
    case 'drone':
      return (
        <div className="relative w-full h-32 rounded-2xl bg-gradient-to-br from-brand/10 to-slate-500/10 border border-white/5 overflow-hidden mb-8 flex items-center justify-center">
          <motion.div animate={{ y: [-15, 10, -15], rotateZ: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="relative text-slate-300 z-10">
            <Video size={42} />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }} className="absolute -top-4 -left-4 text-brand"><Navigation size={16} /></motion.div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }} className="absolute -top-4 -right-4 text-brand"><Navigation size={16} /></motion.div>
          </motion.div>
          <div className="absolute inset-x-0 bottom-4 h-16 bg-gradient-to-t from-brand/10 to-transparent blur-xl" />
        </div>
      );
    case 'product':
      return (
        <div className="relative w-full h-32 rounded-2xl bg-gradient-to-br from-brand/10 to-yellow-500/10 border border-white/5 overflow-hidden mb-8 flex items-center justify-center">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="relative text-yellow-400 z-10">
            <Camera size={42} />
            <motion.div animate={{ opacity: [0, 1, 0, 0, 0] }} transition={{ duration: 2, repeat: Infinity, times: [0, 0.1, 0.2, 0.5, 1] }} className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full blur-[3px]" />
          </motion.div>
          <motion.div animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-4 border border-yellow-500/20 border-dashed rounded-xl flex items-center justify-center pointer-events-none">
            <Maximize size={100} className="text-yellow-500/10" />
          </motion.div>
        </div>
      );
    case 'meta':
      return (
        <div className="relative w-full h-32 rounded-2xl bg-gradient-to-br from-brand/10 to-indigo-500/10 border border-white/5 overflow-hidden mb-8 flex items-center justify-center">
          <motion.div animate={{ x: [-30, 30, -30], y: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} className="absolute text-brand/30"><Target size={80} /></motion.div>
          <div className="relative flex items-end gap-3 h-16 z-10">
            <motion.div animate={{ height: ['20%', '60%', '40%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="w-5 sm:w-6 bg-indigo-500/40 rounded-t-sm" />
            <motion.div animate={{ height: ['40%', '80%', '60%'] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }} className="w-5 sm:w-6 bg-indigo-500/60 rounded-t-sm" />
            <motion.div animate={{ height: ['60%', '100%', '80%'] }} transition={{ duration: 3, repeat: Infinity, delay: 1, ease: 'easeInOut' }} className="w-5 sm:w-6 bg-brand/80 rounded-t-sm backdrop-blur-md" />
          </div>
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-12 sm:right-20 top-6 text-indigo-400 z-10"><MousePointer2 size={24} /></motion.div>
        </div>
      );
    case 'google':
      return (
        <div className="relative w-full h-32 rounded-2xl bg-gradient-to-br from-brand/10 to-red-500/10 border border-white/5 overflow-hidden mb-8 flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="absolute -left-6 -top-6 text-red-500/20"><Search size={100} /></motion.div>
          <div className="w-3/4 max-w-[240px] h-10 bg-black/40 rounded-full border border-white/10 flex items-center px-4 gap-3 z-10 backdrop-blur-sm">
            <Search size={16} className="text-white/40" />
            <motion.div animate={{ width: ['0%', '60%', '60%', '0%'], opacity: [0, 1, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="h-2 bg-white/20 rounded-full overflow-hidden relative">
              <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-6 h-full bg-white/40 relative blur-[1px]" />
            </motion.div>
          </div>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-10 sm:right-16 bottom-6 text-brand z-10"><BarChart size={28} /></motion.div>
        </div>
      );
    default:
      return null;
  }
}

const ServiceCard = ({ icon: Icon, title, onClick }: { icon: any, title: string, onClick: () => void }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="p-8 md:p-10 glass rounded-2xl border border-white/5 hover:border-brand transition-all group flex flex-col items-center text-center cursor-pointer"
  >
    <div className="text-brand mb-6 text-sm font-black tracking-widest flex items-center justify-center w-16 h-16 rounded-full bg-white/5 group-hover:bg-brand/20 transition-colors">
      <Icon size={32} />
    </div>
    <h3 className="text-lg md:text-xl font-bold tracking-tight text-white">{title}</h3>
  </motion.div>
);

export const Servisler = () => {
  const [selectedService, setSelectedService] = useState<any | null>(null);

  const handleOpenModal = (service: any) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="servisler" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="HİZMETLERİM">Sınırları <br /> Ortadan Kaldırın.</SectionHeading>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              onClick={() => handleOpenModal(service)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
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
                className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-6 mb-8 relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner text-brand">
                  <selectedService.icon size={36} />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight leading-tight">{selectedService.title}</h3>
                  <p className="text-brand text-[10px] uppercase tracking-[0.2em] font-black">HİZMET DETAYI</p>
                </div>
              </div>

              <TopicGraphic type={selectedService.type} />

              <div className="space-y-8 relative z-10">
                <p className="text-white/80 leading-relaxed font-light">
                  {selectedService.description}
                </p>

                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50 mb-4 pb-4 border-b border-white/5">Hizmet Kapsamı</h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {selectedService.features.map((feature: string, idx: number) => (
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
