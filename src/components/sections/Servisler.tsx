import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Share2, PenTool, Contact, BookOpen, Video, Camera, Megaphone, Search, X, Check } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const services = [
  {
    icon: Share2,
    title: "Sosyal Medya Yönetimi",
    description: "Markanızın dijital dünyadaki sesini tasarlıyoruz. Hedef kitlenizle etkileşimi artıracak stratejiler, özgün içerikler ve düzenli paylaşımlarla sosyal medya hesaplarınızı profesyonelce yönetiyoruz.",
    features: ["İçerik Stratejisi", "Topluluk Yönetimi", "Rakip Analizi", "Aylık Raporlama"]
  },
  {
    icon: PenTool,
    title: "Logo Tasarımı",
    description: "Markanızın karakterini ve vizyonunu yansıtan, akılda kalıcı ve özgün logo tasarımları oluşturuyoruz. Sektördeki duruşunuzu güçlendirecek kurumsal kimlik temellerini atıyoruz.",
    features: ["Özgün Konsept", "Vektörel Çizim", "Renk ve Tipografi", "Farklı Format Teslimi"]
  },
  {
    icon: Contact,
    title: "Kartvizit Tasarımı",
    description: "İlk izlenim önemlidir. Profesyonelliğinizi yansıtan, estetik ve akılda kalıcı kartvizit tasarımlarıyla profesyonel ağınızı güçlendirmenize yardımcı oluyoruz.",
    features: ["Modern Tasarım", "Matbaa Uyumluluğu", "QR Kod Entegrasyonu", "Özel Kesim Seçenekleri"]
  },
  {
    icon: BookOpen,
    title: "Broşür Tasarımı",
    description: "Hizmetlerinizi veya ürünlerinizi en etkili şekilde anlatan, görsel açıdan zengin ve ikna edici broşür tasarımları ile hedef kitlenize doğrudan ulaşın.",
    features: ["Katalog ve Broşür", "Etkileyici Görseller", "Bilgi Hiyerarşisi", "Baskıya Hazır Format"]
  },
  {
    icon: Video,
    title: "Drone Çekimi",
    description: "Mekanlarınızı, projelerinizi veya etkinliklerinizi kuşbakışı bir perspektifle, yüksek çözünürlüklü ve sinematik detaylarla kayıt altına alarak fark yaratıyoruz.",
    features: ["4K Video Çekimi", "Havadan Fotoğrafçılık", "Sinematik Kurgu", "Tesis Tanıtımı"]
  },
  {
    icon: Camera,
    title: "Ürün Çekimi",
    description: "Ürünlerinizin kalitesini ve detaylarını en iyi şekilde yansıtan profesyonel fotoğraf çekimleri yapıyoruz. E-ticaret siteniz veya sosyal medyanız için satış artıran görseller üretiyoruz.",
    features: ["Stüdyo Çekimi", "Konsept Çekim", "Detay ve Macro", "Dekupe ve Rötuş"]
  },
  {
    icon: Megaphone,
    title: "Meta Reklam Yönetimi",
    description: "Instagram ve Facebook platformlarında, hedef kitlenize nokta atışı ulaşan reklam kampanyaları kurguluyoruz. Bütçenizi en verimli şekilde kullanarak dönüşümleri artırıyoruz.",
    features: ["Hedef Kitle Analizi", "A/B Testleri", "Kampanya Optimizasyonu", "Pixel ve Dönüşüm Takibi"]
  },
  {
    icon: Search,
    title: "Google Reklam Yönetimi",
    description: "Google Arama, Görüntülü Reklam Ağı ve YouTube üzerinde markanızı doğru zamanda doğru kişilerin karşısına çıkarıyoruz. Performans odaklı stratejilerle satışlarınızı katlıyoruz.",
    features: ["Anahtar Kelime Analizi", "Tıklama Başına Maliyet", "Yeniden Pazarlama", "Performans Raporlaması"]
  }
];

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

              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/5 flex items-center justify-center p-5 border border-white/5 shadow-inner text-brand">
                  <selectedService.icon size={48} />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight leading-tight">{selectedService.title}</h3>
                  <p className="text-brand text-[10px] uppercase tracking-[0.2em] font-black">HİZMET DETAYI</p>
                </div>
              </div>

              <div className="space-y-8">
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
