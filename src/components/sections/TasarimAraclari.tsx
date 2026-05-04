import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Check } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const tools = [
  { 
    name: 'Adobe Photoshop', 
    icon: 'https://res.cloudinary.com/dejx0brol/image/upload/v1777877664/premiere-pro_ofr6zw.png', 
    category: 'Görüntü İşleme',
    description: 'Görsel düzenleme, fotoğraf rötüşlama ve dijital boyama gibi alanlarda kullandığımız endüstri standartı yazılım. Tüm imaj manipülasyon işlemlerimizi bu platform üzerinden yürütüyoruz.',
    features: ['Fotoğraf Rötüşü', 'Görsel Manipülasyon', 'Dijital Boyama', 'Mockup Tasarımı']
  },
  { 
    name: 'Adobe Illustrator', 
    icon: 'https://res.cloudinary.com/dejx0brol/image/upload/v1777877665/illustrator_zdwkfu.png', 
    category: 'Vektörel Tasarım',
    description: 'Logo, ikon, tipografi ve ölçeklenebilir vektörel illüstrasyonlar oluşturmak için kullandığımız temel tasarım programımız. Kurumsal kimlik çalışmalarının merkezinde yer alır.',
    features: ['Logo Tasarımı', 'Vektörel Çizim', 'Marka Kimliği', 'Tipografi']
  },
  { 
    name: 'Adobe Audition', 
    icon: 'https://res.cloudinary.com/dejx0brol/image/upload/v1777877664/adobe-audition_ifjpnc.png', 
    category: 'Ses Düzenleme',
    description: 'Profesyonel ses miksajı, kurgu ve restorasyon çalışmaları için kullandığımız detaylı ses işleme yazılımı. Videolarımızın ses kalitesini en üst düzeye çıkarır.',
    features: ['Ses Miksajı', 'Gürültü Giderme', 'Podcast Düzenleme', 'Ses Efektleri']
  },
  { 
    name: 'Adobe After Effects', 
    icon: 'https://res.cloudinary.com/dejx0brol/image/upload/v1777877664/after-effects_fygprz.png', 
    category: 'Hareketli Grafik & VFX',
    description: 'Sinematik görsel efektler ve detaylı hareketli grafikler (motion graphics) oluşturmak için tercih ettiğimiz yazılım. Sosyal medya içeriklerini dinamikleştiren en önemli aracımız.',
    features: ['Motion Graphics', 'Görsel Efektler', 'Animasyon', 'Kompozisyon']
  },
  { 
    name: 'Adobe Bridge', 
    icon: 'https://res.cloudinary.com/dejx0brol/image/upload/v1777877664/adobe-bridge_ujnffs.png', 
    category: 'Varlık Yönetimi',
    description: 'Yaratıcı projelerimizdeki dosyaları düzenlemek, önizlemek ve merkezi olarak yönetmek için kullandığımız araç. Ajans içi iş akışımızı ve dosya düzenimizi hızlandırır.',
    features: ['Dosya Organizasyonu', 'Toplu Yeniden Adlandırma', 'Meta Veri Yönetimi', 'Hızlı Önizleme']
  },
  { 
    name: 'Adobe Premiere Pro', 
    icon: 'https://res.cloudinary.com/dejx0brol/image/upload/v1777877664/premiere-pro_ofr6zw.png', 
    category: 'Video Kurgu',
    description: 'Reklam, tanıtım ve uzun metraj projeleri profesyonelce kurguladığımız başucu video düzenleme uygulamamız. Kapsamlı ve büyük projelerin kalbi.',
    features: ['Çoklu Kamera Kurgusu', 'Renk Düzenleme', 'Ses Entegrasyonu', 'Format Uyumluluğu']
  },
  { 
    name: 'DaVinci Resolve', 
    icon: 'https://res.cloudinary.com/dejx0brol/image/upload/v1777877667/DaVinci_Resolve_Studio_bmmkvx.png', 
    category: 'Renk & Kurgu',
    description: 'Özellikle ileri seviye renk düzenleme (color grading) ve gelişmiş video kurgu projelerinde kullandığımız Hollywood standartlarındaki profesyonel yazılım.',
    features: ['İleri Seviye Color Grading', 'Node Tabanlı Düzenleme', 'Ses Kurgusu (Fairlight)', 'Fusion Efektleri']
  },
  { 
    name: 'Canva', 
    icon: 'https://res.cloudinary.com/dejx0brol/image/upload/v1777877664/palette_kemued.png', 
    category: 'Hızlı Tasarım',
    description: 'Sosyal medya gönderileri ve hızlı görsel üretimi gerektiren anlık tasarım ihtiyaçlarında ivme kazanmak için başvurduğumuz platform.',
    features: ['Sosyal Medya Şablonları', 'Hızlı Çıktı', 'Sunum Tasarımı', 'Pratik Düzenleme']
  },
  { 
    name: 'CapCut', 
    icon: 'https://res.cloudinary.com/dejx0brol/image/upload/v1777877666/capcut-logo-on-transparent-white-background-free-vector_ayltst.jpg', 
    category: 'Mobil Kurgu',
    description: 'Özellikle TikTok, Reels ve Shorts gibi dikey video formatlarındaki hızlı ve dinamik kurgu süreçleri, trend efektler ve otomatik altyazı için kullandığımız araç.',
    features: ['Dikey Format Kurgu', 'Otomatik Altyazı', 'Trend Efektler', 'Hızlı Export']
  },
];

const ToolCard = ({ tool, onClick }: { tool: any, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="w-full p-3 md:p-6 glass rounded-2xl border border-white/5 hover:border-brand/50 transition-all group flex flex-col items-center text-center gap-2 md:gap-4 hover:-translate-y-2 cursor-pointer"
  >
    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
      <img src={tool.icon} alt={tool.name} className="w-8 h-8 md:w-10 md:h-10 opacity-80 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="w-full">
      <h3 className="font-bold text-[11px] md:text-base text-white mb-1 group-hover:text-brand transition-colors leading-tight truncate">{tool.name}</h3>
      <p className="text-[8px] md:text-[10px] uppercase tracking-wider text-white/50 font-bold truncate">{tool.category}</p>
    </div>
  </div>
);

export const TasarimAraclari = () => {
  const [selectedTool, setSelectedTool] = useState<any | null>(null);

  // Modal handler to disable body scroll
  const handleOpenModal = (tool: any) => {
    setSelectedTool(tool);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedTool(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="araçlar" className="py-24 px-6 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="mb-16 text-center max-w-2xl">
          <SectionHeading subtitle="TEKNOLOJİ">Tasarım Araçları.</SectionHeading>
          <p className="text-white/60 font-light text-sm mt-6">
            Projelerimizde en iyi sonuçları elde etmek için endüstri standardı profesyonel yazılımlar kullanıyoruz.
          </p>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6 w-full max-w-5xl">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} onClick={() => handleOpenModal(tool)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedTool && (
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
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/5 flex items-center justify-center p-5 border border-white/5 shadow-inner">
                  <img src={selectedTool.icon} alt={selectedTool.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">{selectedTool.name}</h3>
                  <p className="text-brand text-[10px] uppercase tracking-[0.2em] font-black">{selectedTool.category}</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-white/80 leading-relaxed font-light">
                  {selectedTool.description}
                </p>

                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50 mb-4 pb-4 border-b border-white/5">Öne Çıkan Özellikler</h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {selectedTool.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                        <div className="mt-0.5 text-brand bg-brand/10 p-0.5 rounded-full">
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
