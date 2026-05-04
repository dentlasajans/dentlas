import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
];

const videos = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1460518451285-8baa4c680293?auto=format&fit=crop&q=80&w=600",
];

const GalleryItem = ({ src, type, size = 'small' }: { src: string, type: 'image' | 'video', size?: 'small'|'large'|'tall'|'wide' }) => {
  let cssClass = "";
  if (size === 'large') cssClass = "md:col-span-2 md:row-span-2";
  else if (size === 'tall') cssClass = "md:row-span-2";
  else if (size === 'wide') cssClass = "md:col-span-2";

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${cssClass}`}
    >
      <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay" />
      <img src={src} alt="Galeri" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 min-h-[250px]" loading="lazy" />
      
      {type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-brand/80 transition-all duration-300">
            <Play size={24} className="text-white ml-2" fill="currentColor" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export const Galeri = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');

  return (
    <section id="galeri" className="py-32 px-6 bg-brand/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              STÜDYO & GALERİ
            </h2>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 w-fit">
            <button 
              onClick={() => setActiveTab('image')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-semibold text-sm ${
                activeTab === 'image' 
                  ? 'bg-brand text-black shadow-lg shadow-brand/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon size={18} />
              Görseller
            </button>
            <button 
              onClick={() => setActiveTab('video')}
               className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-semibold text-sm ${
                activeTab === 'video' 
                  ? 'bg-brand text-black shadow-lg shadow-brand/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <VideoIcon size={18} />
              Videolar
            </button>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px]">
          <AnimatePresence mode="popLayout">
            {activeTab === 'image' && images.map((src, index) => (
               <GalleryItem 
                  key={`img-${index}`} 
                  src={src} 
                  type="image"
                  size={index === 0 ? 'large' : index === 4 ? 'wide' : 'small'} 
               />
            ))}

            {activeTab === 'video' && videos.map((src, index) => (
               <GalleryItem 
                  key={`vid-${index}`} 
                  src={src} 
                  type="video"
                  size={index === 0 ? 'large' : index === 3 ? 'wide' : 'small'} 
               />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
