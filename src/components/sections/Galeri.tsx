import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Play, Image as ImageIcon, Video as VideoIcon, X } from "lucide-react";
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { OperationType, handleFirestoreError } from '../../lib/firestoreError';
import { isYouTubeLink, getYouTubeIframeUrl, getYouTubeThumbnail } from '../../lib/youtubeUtils';
import { SectionHeading } from '../ui/SectionHeading';

const getOptimizedSrc = (src: string) => {
  // Return a webp formatted, low quality, smaller width image for thumbnails
  if (src.includes('unsplash.com')) {
    return src.replace("q=80", "q=50").replace("w=1200", "w=500") + "&fm=webp";
  }
  return src;
};

const getOriginalSrc = (src: string) => {
  // Return high quality original size
  if (src.includes('unsplash.com')) {
    return src.replace("q=80", "q=100").replace("w=1200", "w=2000") + "&fm=webp";
  }
  return src;
};

const GalleryItem = ({
  src,
  type,
  title,
  onClick,
  index
}: {
  src: string;
  type: "image" | "video";
  title?: string;
  onClick: () => void;
  index: number;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1, type: 'spring', stiffness: 100 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${type === 'video' ? 'aspect-video' : 'aspect-square'} bg-white/5`}
    >
      <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      {title && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <p className="text-white font-bold truncate">{title}</p>
        </div>
      )}
      {type === "video" ? (
        isYouTubeLink(src) ? (
          <img src={getYouTubeThumbnail(src)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" alt="Video Thumbnail" />
        ) : (
          <video src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" muted />
        )
      ) : (
        <img
          src={getOptimizedSrc(src)}
          alt="Galeri"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
      )}

      {type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-brand/80 transition-all duration-300">
            <Play size={24} className="text-white ml-1" fill="currentColor" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export const Galeri = () => {
  const [visibleCountImages, setVisibleCountImages] = useState(8);
  const [visibleCountVideos, setVisibleCountVideos] = useState(8);
  const [selectedMedia, setSelectedMedia] = useState<{
    src: string;
    type: "image" | "video";
    title?: string;
  } | null>(null);

  const [mediaItems, setMediaItems] = useState<{id: string, src: string, type: 'image'|'video', title?: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'media'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setMediaItems(snapshot.docs.map(doc => ({
        id: doc.id,
        src: doc.data().src,
        type: doc.data().type as 'image'|'video',
        title: doc.data().title
      })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'media');
      setLoading(false);
    });
    return unsub;
  }, []);

  let images = mediaItems.filter(m => m.type === 'image');
  let videos = mediaItems.filter(m => m.type === 'video');

  useEffect(() => {
    if (selectedMedia) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMedia]);

  return (
    <section id="galeri" className="py-12 md:py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="GALERİ">Bizim İşlerimiz</SectionHeading>

        {images.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><ImageIcon className="text-brand" size={28}/> Görseller</h3>
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            >
              <AnimatePresence>
                {images
                  .slice(0, visibleCountImages)
                  .map((item, index) => (
                    <GalleryItem
                      key={`img-${index}`}
                      index={index}
                      src={item.src}
                      type="image"
                      title={item.title}
                      onClick={() => setSelectedMedia({ src: item.src, type: "image", title: item.title })}
                    />
                  ))}
              </AnimatePresence>
            </motion.div>

            {visibleCountImages < images.length && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleCountImages((prev) => prev + 8)}
                  className="px-8 py-4 rounded-xl border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:bg-white/5 hover:border-brand/50 transition-all"
                >
                  Daha Fazla Göster
                </button>
              </div>
            )}
          </div>
        )}

        {videos.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><VideoIcon className="text-brand" size={28}/> Videolar</h3>
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            >
              <AnimatePresence>
                {videos
                  .slice(0, visibleCountVideos)
                  .map((item, index) => (
                    <GalleryItem
                      key={`vid-${index}`}
                      index={index}
                      src={item.src}
                      type="video"
                      title={item.title}
                      onClick={() => setSelectedMedia({ src: item.src, type: "video", title: item.title })}
                    />
                  ))}
              </AnimatePresence>
            </motion.div>

            {visibleCountVideos < videos.length && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleCountVideos((prev) => prev + 8)}
                  className="px-8 py-4 rounded-xl border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:bg-white/5 hover:border-brand/50 transition-all"
                >
                  Daha Fazla Göster
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedMedia && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 pt-[10vh] pb-[10vh] sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedia(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-6xl max-h-[80dvh] sm:max-h-[calc(100vh-4rem)] flex items-center justify-center z-10"
            >
              <div className="absolute -top-12 right-0 sm:top-0 sm:-right-16 z-[60]">
                <button
                  aria-label="Kapat"
                  onClick={() => setSelectedMedia(null)}
                  className="w-10 h-10 bg-black/60 border border-white/10 rounded-full flex items-center justify-center hover:bg-red-500/80 hover:border-red-500 transition-colors text-white backdrop-blur-md shadow-xl"
                >
                  <X size={20} />
                </button>
              </div>

              {selectedMedia.type === "image" ? (
                <div className="relative">
                  <img
                    src={getOriginalSrc(selectedMedia.src)}
                    alt="Görsel Orijinal"
                    className="max-w-full max-h-[80dvh] md:max-h-full object-contain rounded-xl shadow-2xl"
                    loading="lazy"
                    decoding="async"
                  />
                  {selectedMedia.title && (
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                       <span className="bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-md font-medium inline-block shadow-lg">{selectedMedia.title}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-[60vh] md:h-[80vh] flex items-center justify-center group flex-col gap-4">
                  <div className="w-full h-full aspect-video relative flex justify-center items-center">
                    {isYouTubeLink(selectedMedia.src) ? (
                      <iframe 
                        src={getYouTubeIframeUrl(selectedMedia.src)} 
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        className="w-full h-full rounded-xl shadow-2xl shadow-brand/20 border-none max-w-5xl"
                      />
                    ) : (
                      <video
                        src={selectedMedia.src}
                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl shadow-brand/20"
                        controls
                        autoPlay
                      />
                    )}
                  </div>
                  {selectedMedia.title && (
                    <h3 className="text-white text-xl md:text-2xl font-bold mt-2 text-center">{selectedMedia.title}</h3>
                  )}
                </div>
              )}
            </motion.div>
          </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
