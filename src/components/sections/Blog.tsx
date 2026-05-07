import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Calendar, User } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const staticPosts = [
  {
    title: "Markanız İçin Doğru Sosyal Medya Stratejisi Nasıl Belirlenir?",
    category: "Sosyal Medya",
    date: "12 Mayıs 2026",
    author: "Himmet Muhammed KILIÇ",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    excerpt: "Hedef kitlenize ulaşmak ve kalıcı bir etki yaratmak için sosyal medya platformlarında nasıl bir yol izlemeniz gerektiğini adım adım inceliyoruz.",
    content: "Sosyal medya yönetimi sadece gönderi paylaşmaktan ibaret değildir. Markanızın sesini doğru kitleye duyurabilmek için stratejik bir yaklaşım gerekir. İlk adım, hedef kitlenizin hangi platformlarda vakit geçirdiğini analiz etmektir.\n\nİçerik planlaması ve hedef kitle analizi markanızın sosyal medyadaki performansını doğrudan etkiler. Görsel bütünlük ise profesyonelliğinizi kanıtlar. Markanıza uygun bir sosyal medya stratejisi belirlemek için pazar araştırması, rakip analizi ve etkileşim ölçümleri gibi adımlar atmanız gerekmektedir."
  },
  {
    title: "Kurumsal Kimlik Tasarımında Renk Psikolojisi",
    category: "Tasarım",
    date: "28 Nisan 2026",
    author: "Himmet Muhammed KILIÇ",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    excerpt: "Renklerin insan psikolojisi üzerindeki etkileri ve markanızın kişiliğini yansıtacak doğru renk paletini seçmenin ipuçları.",
    content: "Markanızın renkleri, müşterilerinizin sizle ilk karşılaştıklarında hissedecekleri duyguyu belirler. Örneğin, mavi güveni ve profesyonelliği temsil ederken kırmızı heyecanı ve harekete geçmeyi temsil eder.\n\nKurumsal kimliğinizi oluştururken doğru renk seçimi yapmak sektörünüzdeki konumlandırmanızı doğrudan etkiler. Teknoloji markaları genellikle mavi ve gri tonlarını tercih ederken, gıda sektöründeki markalar kırmızı ve sarı gibi iştah açıcı ve enerjik renklere yönelmektedir. Renk uyumu sadece logonuzda değil, kurumsal kimlik içindeki tüm elementlerde korunmalıdır."
  },
  {
    title: "AtlasPOS Başarı Hikayesi: Dijital Dönüşüm",
    category: "Vaka Analizi",
    date: "15 Nisan 2026",
    author: "Himmet Muhammed KILIÇ",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
    excerpt: "AtlasPOS ile gerçekleştirdiğimiz restoran yönetim sistemi projesinin başlangıçtan teslimata kadar olan sürecini detaylandırıyoruz.",
    content: "Restoran sektöründeki operasyonel zorlukları aşmak için tasarladığımız AtlasPOS uygulamasının geliştirme sürecinde, hem kullanıcı deneyimini hem de performans gereksinimlerini göz önünde bulundurduk.\n\nSistem mimarisini modern ve bulut tabanlı bir yapıya kavuştururken, restoran çalışanları için hızlı reaksiyon alabilecekleri bir UI/UX süreci gerçekleştirdik. Özellikle yoğun servis anlarında sistemin kesintisiz hizmet verebilmesi en önemli kriterlerden biriydi. AtlasPOS'un tasarım aşaması, tamamen kullanıcı reflekslerine özel uyumlu bir süreçle sürdürüldü ve ortaya hem verimli hem şık bir ürün çıktı."
  }
];

const BlogCard = ({ post, onClick }: { post: any, onClick: () => void }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="group cursor-pointer rounded-3xl overflow-hidden glass border border-white/5 hover:border-brand/30 transition-all flex flex-col h-full bg-white/5"
  >
    <div className="relative aspect-video overflow-hidden">
      <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-dark/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border border-white/10">
          {post.category}
        </span>
      </div>
    </div>
    
    <div className="p-6 md:p-8 flex flex-col flex-grow">
      <div className="flex items-center gap-4 text-white/40 text-xs font-medium mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          <span>{post.date}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-brand transition-colors line-clamp-2">
        {post.title}
      </h3>
      
      <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
        {post.excerpt}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand">
            <User size={14} />
          </div>
          <span className="text-xs text-white/80 font-medium">{post.author}</span>
        </div>
        <div className="text-brand flex items-center gap-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
          <span className="text-xs font-bold uppercase tracking-wider">Oku</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  </motion.div>
);

export const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPost]);

  const handleOpenModal = (item: any) => {
    setSelectedPost(item);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <section id="blog" className="py-24 px-6 relative z-10 bg-brand/[0.02]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="GÜNCEL">Blog & Haberler.</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticPosts.map((post, idx) => (
            <BlogCard 
              key={idx}
              post={post}
              onClick={() => handleOpenModal(post)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
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
                <div className="md:col-span-12 lg:col-span-12 w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  <div className="relative">
                    <div className="rounded-2xl overflow-hidden relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[400px]">
                      <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-brand text-black text-xs uppercase tracking-widest font-black px-4 py-2 rounded-full shadow-lg">
                          {selectedPost.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:py-4">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/50 text-sm font-medium mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{selectedPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                          <User size={12} />
                        </div>
                        <span>{selectedPost.author}</span>
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight leading-tight">
                      {selectedPost.title}
                    </h2>
                    
                    <div className="prose prose-invert max-w-none flex-1">
                      <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light whitespace-pre-line">
                        {selectedPost.content}
                      </p>
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
