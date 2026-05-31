import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Calendar, User } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { OperationType, handleFirestoreError } from '../../lib/firestoreError';

const BlogCard = ({ post, onClick, index }: { post: any; onClick: () => void, index: number }) => {
  const getOptimizedImage = (url: string) =>
    url.replace("w=800", "w=500").replace("q=80", "q=60");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group cursor-pointer rounded-3xl overflow-hidden glass border border-white/5 hover:border-brand/30 transition-all flex flex-row items-center h-full bg-white/5 p-4 sm:p-5"
    >
      <div className="w-1/3 flex-shrink-0">
        <div className="relative aspect-square overflow-hidden rounded-2xl w-full">
          <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
          <img
            src={getOptimizedImage(post.image)}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-2 left-2 z-20">
            <span className="bg-dark/80 backdrop-blur-md text-white text-[8px] sm:text-[10px] uppercase tracking-widest font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/10 shadow-lg">
              {post.category}
            </span>
          </div>
        </div>
      </div>

      <div className="w-2/3 pl-4 sm:pl-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 sm:gap-4 text-white/40 text-[10px] sm:text-xs font-medium mb-2 sm:mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
            <span>{post.date}</span>
          </div>
        </div>

        <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3 tracking-tight group-hover:text-brand transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 sm:pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-brand/20 bg-dark flex-shrink-0">
              <img src="https://res.cloudinary.com/dejx0brol/image/upload/v1777882709/20250615_001859_0000_hdtdmt.png" alt={post.author} className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] sm:text-xs text-white/80 font-medium">
              {post.author}
            </span>
          </div>
          <div className="text-brand flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden sm:inline">
              Oku
            </span>
            <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'blogs');
      setLoading(false);
    });
    return unsub;
  }, []);

  const displayPosts = blogs.length > 0 ? blogs : [];

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPost]);

  const handleOpenModal = (item: any) => {
    setSelectedPost(item);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <section id="blog" className="py-12 md:py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="GÜNCEL">Blog & Haberler.</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {displayPosts.map((post, idx) => (
            <BlogCard
              key={post.id || idx}
              index={idx}
              post={post}
              onClick={() => handleOpenModal(post)}
            />
          ))}
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedPost && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 pt-[10vh] pb-[10vh] sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full md:max-w-5xl lg:max-w-6xl xl:max-w-7xl glass border border-white/10 rounded-3xl shadow-2xl z-10 flex flex-col max-h-[80dvh] sm:max-h-[calc(100vh-4rem)] overflow-hidden"
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

              <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar flex-1 w-full relative z-10 flex flex-col gap-8 lg:gap-12">
                <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                  <div className="relative md:col-span-3 lg:col-span-2">
                    <div className="rounded-2xl overflow-hidden relative aspect-square w-1/3 md:w-full">
                      <img
                        src={selectedPost.image.replace("w=800", "w=1200")}
                        alt={selectedPost.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute top-2 left-2 md:top-4 md:left-4">
                        <span className="bg-brand text-black text-[10px] sm:text-xs uppercase tracking-widest font-black px-2 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg">
                          {selectedPost.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:justify-center md:col-span-9 lg:col-span-10">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/50 text-sm font-medium mb-4 sm:mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{selectedPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20 bg-dark flex-shrink-0">
                          <img src="https://res.cloudinary.com/dejx0brol/image/upload/v1777882709/20250615_001859_0000_hdtdmt.png" alt={selectedPost.author} className="w-full h-full object-cover" />
                        </div>
                        <span>{selectedPost.author}</span>
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                      {selectedPost.title}
                    </h2>
                  </div>
                </div>

                <div className="w-full mt-4 md:mt-2 border-t border-white/5 pt-8">
                  <div 
                    className="prose prose-invert prose-lg max-w-none prose-p:text-white/80 prose-p:leading-relaxed prose-headings:text-white prose-a:text-brand"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
