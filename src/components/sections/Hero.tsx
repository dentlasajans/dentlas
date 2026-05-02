import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const Hero = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section className="relative h-screen flex items-center px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div style={{ scale, opacity }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 glass rounded-full text-brand text-[8px] font-black tracking-[0.3em] mb-10 uppercase"
          >
            Yapay Zeka Odaklı Strateji
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[72px] md:text-[104px] font-extrabold tracking-[-0.04em] leading-[0.85] mb-10"
          >
            Dijital <br />  
            <span className="text-brand text-glow">Etki</span> <br /> 
            Fabrikası
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white max-w-sm font-light leading-relaxed mb-12 opacity-90"
          >
            Markanızı modern dünyanın dinamikleriyle büyüten teknoloji odaklı sosyal medya ve kreatif strateji ajansı.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button className="bg-white text-black px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl">
              Geleceği İnşa Et <ArrowRight size={16} />
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, delay: 0.4 }}
          className="hidden md:flex justify-center relative"
        >
          <div className="absolute inset-0 bg-brand/20 blur-[100px] animate-pulse" />
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 glass p-4 rounded-[4rem] border-white/10"
          >
            <img 
              src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800" 
              alt="3D Abstract" 
              className="w-full max-w-sm rounded-[3.5rem] shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Kaydırın</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
};
