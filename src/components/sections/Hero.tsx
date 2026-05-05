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
            <HoverTextLine text="Markanı" /> <br />  
            <HoverTextLine text="Öne" highlighted={true} /> <br /> 
            <HoverTextLine text="Çıkar" />
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
          className="flex justify-center relative mt-12 md:mt-0 w-full h-[400px] sm:h-[500px] md:h-[650px]"
        >
          <div className="absolute inset-0 bg-brand/10 blur-[100px] animate-pulse rounded-full" />
          
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden scale-110 md:scale-125" style={{ perspective: 1200 }}>
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />

            {/* Glowing sphere base */}
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-40 h-40 md:w-64 md:h-64 bg-brand/20 rounded-full blur-3xl z-0"
            />

            {/* Typography element */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-20 flex items-center justify-center"
            >
              <div className="text-[120px] md:text-[200px] font-serif italic font-bold text-white/[0.03] tracking-tighter leading-none" style={{ textShadow: '0 0 60px rgba(255,255,255,0.05)' }}>
                Aa
              </div>
            </motion.div>

            {/* Floating Layer/Canvas 1 */}
            <motion.div
              animate={{ rotateX: [60, 60], rotateZ: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute w-64 h-64 md:w-[400px] md:h-[400px] border border-white/5 rounded-[2rem] z-10 bg-white/[0.01] backdrop-blur-[1px]"
            />

            {/* Floating Layer/Canvas 2 (Bezier visualization) */}
            <motion.div
              animate={{ rotateX: [60, 60], rotateZ: [45, 405], z: [0, 40, 0] }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute w-48 h-48 md:w-[300px] md:h-[300px] border border-brand/30 rounded-2xl z-20 flex items-center justify-center bg-brand/[0.01]"
            >
               <svg viewBox="0 0 100 100" className="w-full h-full opacity-60 absolute inset-0">
                 <path d="M 20 80 C 20 20, 80 20, 80 80" fill="none" stroke="currentColor" className="text-brand drop-shadow-[0_0_5px_#B2FF05]" strokeWidth="0.5" />
                 <path d="M 20 80 C 20 20, 80 20, 80 80" fill="none" stroke="transparent" strokeWidth="4" />
                 <circle cx="20" cy="80" r="2.5" fill="white" className="drop-shadow-[0_0_5px_white]" />
                 <circle cx="80" cy="80" r="2.5" fill="white" className="drop-shadow-[0_0_5px_white]" />
                 <rect x="18.5" y="18.5" width="3" height="3" fill="currentColor" className="text-brand shadow-[0_0_5px_#B2FF05]" />
                 <rect x="78.5" y="18.5" width="3" height="3" fill="currentColor" className="text-brand shadow-[0_0_5px_#B2FF05]" />
                 <line x1="20" y1="80" x2="20" y2="20" stroke="currentColor" className="text-white/20" strokeWidth="0.5" strokeDasharray="2 2" />
                 <line x1="80" y1="80" x2="80" y2="20" stroke="currentColor" className="text-white/20" strokeWidth="0.5" strokeDasharray="2 2" />
               </svg>
            </motion.div>

            {/* Floating Layer/Canvas 3 */}
            <motion.div
              animate={{ rotateX: [60, 60], rotateZ: [-30, 330], z: [20, 60, 20] }}
              transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute w-56 h-56 md:w-[350px] md:h-[350px] border border-white/10 rounded-full z-15 border-dashed border-[1.5px]"
            />

            {/* CMYK / RGB Blobs for Colors */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
              <motion.div animate={{ scale: [1, 1.2, 1], y: [-20, 0, -20], x: [-10, 0, -10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -mt-20 -ml-20">
                 <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#00FFFF] mix-blend-screen blur-[24px] opacity-30" />
              </motion.div>
              <motion.div animate={{ scale: [1, 1.3, 1], y: [0, -30, 0], x: [20, 0, 20] }} transition={{ duration: 7, repeat: Infinity, delay: 1, ease: "easeInOut" }} className="absolute mt-10 ml-24">
                 <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-[#FF00FF] mix-blend-screen blur-[20px] opacity-30" />
              </motion.div>
              <motion.div animate={{ scale: [0.9, 1.2, 0.9], x: [-20, 10, -20], y: [20, 0, 20] }} transition={{ duration: 6, repeat: Infinity, delay: 2, ease: "easeInOut" }} className="absolute mt-24 -ml-12">
                 <div className="w-14 h-14 md:w-24 md:h-24 rounded-full bg-[#FFFF00] mix-blend-screen blur-[20px] opacity-40" />
              </motion.div>
            </div>

            {/* Crop marks / framing corner brackets */}
            <div className="absolute inset-[15%] md:inset-[20%] z-20 pointer-events-none opacity-30">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-white/60" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-[1.5px] border-r-[1.5px] border-white/60" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[1.5px] border-l-[1.5px] border-white/60" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-white/60" />
            </div>

            {/* Floating Cursor/Pointer */}
            <motion.div
               animate={{ x: [0, 40, -20, 0], y: [0, -40, 20, 0] }}
               transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
               className="absolute z-40 transform -rotate-12"
            >
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                 <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="rgba(0,0,0,0.5)" />
               </svg>
            </motion.div>
          </div>
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
