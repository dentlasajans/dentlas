import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cloud, AlertCircle, Info } from 'lucide-react';

const GalleryItem = ({ image, size = 'small' }: { image: string, size?: 'small'|'large'|'tall'|'wide' }) => {
  let cssClass = "";
  if (size === 'large') cssClass = "md:col-span-2 md:row-span-2";
  else if (size === 'tall') cssClass = "md:row-span-2";
  else if (size === 'wide') cssClass = "md:col-span-2";

  return (
    <div className={`relative overflow-hidden rounded-2xl group cursor-pointer ${cssClass}`}>
      <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay" />
      <img src={image} alt="Galeri" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 min-h-[250px]" loading="lazy" />
    </div>
  );
};

export const Galeri = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorType, setErrorType] = useState<string | null>(null);

  const cloudName = 'dejx0brol';
  const tagName = 'galeri'; // Cloudinary'de resimlere eklenmesi gereken etiket

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/gallery');
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Server error');
        }
        const data = await res.json();
        setImages(data.resources || []);
      } catch (err: any) {
        console.error('Cloudinary bağlantı hatası:', err);
        setErrorType(err.message === 'MISSING_API_KEYS' ? 'MISSING_API_KEYS' : 'GENERAL_ERROR');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <section id="galeri" className="py-32 px-6 bg-brand/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
             <p className="text-brand text-xs uppercase tracking-[0.3em] font-bold mb-4">
              STÜDYO & GALERİ
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Kamera Arkası.
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-brand">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <Cloud size={48} />
            </motion.div>
            <p className="mt-4 text-xs tracking-widest uppercase font-bold text-white/50">Galeri Yükleniyor...</p>
          </div>
        ) : errorType || images.length === 0 ? (
          <div className="bg-brand/10 border border-brand/20 p-8 rounded-3xl text-center max-w-3xl mx-auto flex flex-col items-center">
            <AlertCircle size={48} className="text-brand mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Cloudinary Bağlantısı Gerekiyor</h3>
            <p className="text-white/70 mb-6 font-light leading-relaxed">
              Galeri fotoğraflarını direkt Cloudinary platformundan çekmek için aşağıdaki seçeneklerden birini yapmalısınız:
            </p>
            <div className="text-left text-sm text-white/80 space-y-6 mb-6 w-full">
              <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <span className="bg-brand text-black w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> 
                  Seçenek: API Anahtarlarını Ekleyin (Önerilen)
                </h4>
                <ul className="space-y-3 mt-4 ml-6">
                  <li className="flex gap-3 items-start"><Info size={16} className="text-brand shrink-0 mt-0.5" /> <span>AI Studio ekranında dişli (Settings) ikonuna tıklayıp <strong>Secrets</strong> bölümüne gidin.</span></li>
                  <li className="flex gap-3 items-start"><Info size={16} className="text-brand shrink-0 mt-0.5" /> <span><strong>CLOUDINARY_API_KEY</strong> isimli bir secret oluşturup Cloudinary panelindeki rakamlardan oluşan API Key'inizi girin.</span></li>
                  <li className="flex gap-3 items-start"><Info size={16} className="text-brand shrink-0 mt-0.5" /> <span>Daha önce verdiğiniz 27 karakterli gizli anahtarınız <strong>CLOUDINARY_API_SECRET</strong> olarak zaten eklendi, sadece KEY eksik.</span></li>
                </ul>
              </div>
              <div className="bg-black/20 p-6 rounded-2xl border border-white/5 flex items-center justify-center opacity-50">
               <span className="font-bold text-white/50 uppercase tracking-widest text-xs">YA DA</span>
              </div>
              <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                 <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <span className="bg-brand text-black w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> 
                  Seçenek: Resource Listesi İznini Açın (API Keysiz)
                </h4>
                 <ul className="space-y-3 mt-4 ml-6">
                  <li className="flex gap-3 items-start"><Info size={16} className="text-brand shrink-0 mt-0.5" /> <span>Cloudinary Ayarlarından (Settings &gt; Security) <strong>"Resource list"</strong> seçeneğini işaretleyin. (Kodu değiştirmeden çalışmasını sağlar)</span></li>
                </ul>
              </div>
              
              <div className="bg-brand/5 p-4 rounded-xl border border-brand/20 mt-4">
                 <p className="flex gap-3 items-center text-brand text-xs">
                   <Info size={16} className="shrink-0" /> 
                   <span>Not: Cloudinary panelinde galeride görünmesini istediğiniz resimlere <strong>"galeri"</strong> etiketini (tag) eklemeyi unutmayın.</span>
                 </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px]">
            {images.map((img, index) => {
              const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v${img.version}/${img.public_id}.${img.format}`;
              // 5 resimlik boyut dağıtım deseni (large, wide gibi özellikleri dengeli koymak için index e göre ayarlıyoruz)
              const size = index === 0 ? 'large' : index === 3 ? 'wide' : 'small';
              
              return (
                <GalleryItem 
                  key={img.public_id} 
                  image={imageUrl} 
                  size={size} 
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
