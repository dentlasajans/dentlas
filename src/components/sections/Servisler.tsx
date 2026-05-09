import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Share2, PenTool, Contact, BookOpen, Video, Camera, Megaphone, Search, X, Check, Heart, MessageCircle, Navigation, Layout, Maximize, MousePointer2, BarChart, Target, MonitorSmartphone, Monitor, TrendingUp, Scissors, Package, LayoutTemplate } from 'lucide-react';
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
  },
  {
    type: 'webapp',
    icon: MonitorSmartphone,
    title: "Web App Geliştirme",
    description: "İş süreçlerinizi dijitalleştiren, kullanıcı dostu ve yüksek performanslı modern web uygulamaları (Web App) geliştiriyoruz. İhtiyacınıza özel, ölçeklenebilir altyapılar sunuyoruz.",
    features: ["Özel Yazılım Altyapısı", "Responsive Kodlama", "Performans Odaklı", "API ve Veritabanı"]
  },
  {
    type: 'webdesign',
    icon: LayoutTemplate,
    title: "Kurumsal Web Tasarım",
    description: "Markanızı dijital dünyada en şık şekilde temsil eden, modern hatlara sahip, tamamen güncel teknolojiler barındıran profesyonel web siteleri oluşturuyoruz.",
    features: ["Kullanıcı Deneyimi (UX)", "Mobil Uyumlu (Responsive)", "Temiz Kod Altyapısı", "İçerik Yönetim Sistemi"]
  },
  {
    type: 'uiux',
    icon: MousePointer2,
    title: "UI/UX Tasarım",
    description: "Kullanıcıların dijital ürünlerinizle olan etkileşimini mükemmelleştiriyoruz. Estetik arayüzler ve kusursuz kullanıcı deneyimleri tasarlayarak markanıza değer katıyoruz.",
    features: ["Kullanıcı Araştırması", "Wireframe & Prototip", "Arayüz Tasarımı", "Etkileşim Tasarımı"]
  },
  {
    type: 'branding',
    icon: Package,
    title: "Kurumsal Kimlik Tasarımı",
    description: "Markanızın tüm temas noktalarında tutarlı ve kurumsal bir görünüm sergilemesi için detaylı kurumsal kimlik tasarımları oluşturuyor, markalaşmanızı sağlıyoruz.",
    features: ["Logo Kullanım Şartları", "Renk ve Tipografi", "Antetli, Zarf & Dosya", "Tasarım Kılavuzu"]
  },
  {
    type: 'seo',
    icon: TrendingUp,
    title: "SEO Optimizasyonu",
    description: "Web sitenizin arama motorlarında daha görünür olmasını sağlıyoruz. Rakiplerinizin önüne geçerek organik trafik ve müşteri hacminizi artırmanız için stratejiler geliştiriyoruz.",
    features: ["Site İçi (On-Page) SEO", "Teknik SEO Analizi", "Hız Optimizasyonu", "Anahtar Kelime Araştırması"]
  },
  {
    type: 'video',
    icon: Scissors,
    title: "Video Kurgu & Montaj",
    description: "Elinizdeki çekimleri veya stock videoları bir araya getirerek, ilgi çekici, sosyal medyaya veya reklamlara uygun, dinamik ve akıcı kurgular hazırlıyoruz.",
    features: ["Renk Düzenleme (Color Grading)", "Müzik & Ses Efekti", "Dinamik Geçişler", "Altyazı & Tipografi"]
  }
];

const TopicGraphic = ({ type }: { type: string }) => {
  const getGraphicVariables = () => {
    switch(type) {
      case 'social': return { Icon: Share2, color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20' };
      case 'logo': return { Icon: PenTool, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' };
      case 'card': return { Icon: Contact, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' };
      case 'brochure': return { Icon: BookOpen, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' };
      case 'drone': return { Icon: Video, color: 'text-slate-300', bg: 'bg-slate-300/10', border: 'border-slate-300/20' };
      case 'product': return { Icon: Camera, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' };
      case 'meta': return { Icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/20' };
      case 'google': return { Icon: Search, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' };
      case 'webapp': return { Icon: Monitor, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' };
      case 'webdesign': return { Icon: LayoutTemplate, color: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/20' };
      case 'uiux': return { Icon: MousePointer2, color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/20' };
      case 'branding': return { Icon: Package, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
      case 'seo': return { Icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' };
      case 'video': return { Icon: Scissors, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
      default: return { Icon: LayoutTemplate, color: 'text-brand', bg: 'bg-brand/10', border: 'border-brand/20' };
    }
  };

  const { Icon, color, bg, border } = getGraphicVariables();

  return (
    <div className={`relative w-full h-32 md:h-40 rounded-xl overflow-hidden ${bg} ${border} border mb-6 flex items-center justify-center`}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.15]">
        <Icon size={160} className={color} strokeWidth={0.5} />
      </div>
      <div className={`absolute w-32 h-32 rounded-full ${bg} blur-2xl pointer-events-none opacity-50`} />
      <Icon size={48} className={`${color} drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] relative z-10`} strokeWidth={1.5} />
    </div>
  );
}

const ServiceCard = ({ icon: Icon, title, onClick }: { icon: any, title: string, onClick: () => void }) => {
  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={itemVariant}
      onClick={onClick}
      className="p-8 md:p-10 glass rounded-2xl border border-white/5 hover:border-brand/50 transition-all group flex flex-col items-center text-center cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
    >
      <div className="text-white group-hover:text-brand mb-6 text-sm font-black tracking-widest flex items-center justify-center w-16 h-16 rounded-full bg-white/5 group-hover:bg-brand/10 transition-all group-hover:scale-110">
        <Icon size={32} />
      </div>
      <h3 className="text-lg md:text-xl font-bold tracking-tight text-white/80 group-hover:text-white transition-colors">{title}</h3>
    </motion.div>
  );
};

export const Servisler = () => {
  const [selectedService, setSelectedService] = useState<any | null>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const handleOpenModal = (service: any) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <section id="servisler" className="py-40 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="HİZMETLERİM">Sınırları <br /> Ortadan Kaldırın.</SectionHeading>
        
        <motion.div 
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              onClick={() => handleOpenModal(service)}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && (
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
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner text-brand flex-shrink-0">
                        <selectedService.icon size={36} />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight leading-tight">{selectedService.title}</h3>
                        <p className="text-brand text-[10px] uppercase tracking-[0.2em] font-black">HİZMET DETAYI</p>
                      </div>
                    </div>

                    <p className="text-white/80 leading-relaxed font-light">
                      {selectedService.description}
                    </p>
                  </div>

                  <div className="md:col-span-3 space-y-8 relative z-10 pt-4 md:pt-0 md:border-l md:border-white/5 md:pl-8 lg:pl-12 flex flex-col">
                    <div className="flex-shrink-0 mb-4 rounded-2xl overflow-hidden glass border border-white/10">
                      <TopicGraphic type={selectedService.type} />
                    </div>

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
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
