import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const AnimatedBackground = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-dark">
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[40vw] md:h-[40vw] rounded-full bg-brand/30 blur-[60px] md:blur-[100px] will-change-transform"
      />
      
      {!isMobile && (
        <motion.div 
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] md:w-[50vw] md:h-[50vw] rounded-full bg-purple-900/30 blur-[80px] md:blur-[120px] will-change-transform"
        />
      )}

      {/* Şeffaf Firma Logosu */}
      <img 
        src="https://res.cloudinary.com/dejx0brol/image/upload/v1777703150/Ba%C5%9Fl%C4%B1ks%C4%B1z-1_azwxju.png" 
        alt="" 
        className="absolute -bottom-10 right-0 md:right-2 w-[50vw] md:w-[25vw] max-w-xl opacity-[0.03] pointer-events-none" 
        loading="lazy"
      />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] md:opacity-[0.04] pointer-events-none" />
    </div>
  );
};
