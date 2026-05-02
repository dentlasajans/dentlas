import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HoverTextLine = ({ text, highlighted = false }: { text: string; highlighted?: boolean }) => (
  <span className="relative inline-block w-fit">
    <span className={`relative z-10 transition-all duration-500 ${highlighted ? 'text-brand text-glow' : ''}`}>
      {text}
    </span>
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-visible z-20">
      <text 
        x="50%" 
        y="50%" 
        dominantBaseline="central"
        textAnchor="middle"
        fill="none" 
        className={`${highlighted ? 'stroke-white' : 'stroke-brand'} animate-border-slide`} 
        strokeWidth="2" 
        strokeDasharray="20 40"
        style={{ fontSize: 'inherit', fontFamily: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}
      >
        {text}
      </text>
    </svg>
  </span>
);

export const Hero = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section className="relative min-h-[100dvh] flex items-center px-6 overflow-hidden pt-32 pb-24 md:py-0">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div style={{ scale, opacity }} className="flex flex-col items-start md:items-start text-left">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 glass rounded-full text-brand text-[8px] font-black tracking-[0.3em] mb-8 md:mb-10 uppercase"
          >
            Yapay Zeka Odaklı Strateji
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group inline-block text-6xl sm:text-[72px] md:text-[84px] lg:text-[104px] font-extrabold tracking-[-0.04em] leading-[0.85] mb-8 md:mb-10 cursor-default"
          >
            <HoverTextLine text="Dijital" /> <br />  
            <HoverTextLine text="Etki" highlighted={true} /> <br /> 
            <HoverTextLine text="Fabrikası" />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white max-w-sm font-light leading-relaxed mb-10 md:mb-12 opacity-90"
          >
            Markanızı modern dünyanın dinamikleriyle büyüten teknoloji odaklı sosyal medya ve kreatif strateji ajansı.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button className="bg-white text-black px-8 py-4 md:px-10 md:py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl">
              Geleceği İnşa Et <ArrowRight size={16} />
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, delay: 0.4 }}
          className="flex justify-center relative mt-12 md:mt-0"
        >
          <div className="absolute inset-0 bg-brand/20 blur-[100px] animate-pulse" />
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 glass p-3 md:p-4 rounded-[3rem] md:rounded-[4rem] border-white/10"
          >
            <img 
              src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800" 
              alt="3D Abstract" 
              className="w-[250px] sm:w-[300px] md:w-full max-w-sm rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-white/80 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Kaydırın</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
};
