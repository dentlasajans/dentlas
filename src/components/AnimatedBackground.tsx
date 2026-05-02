import { motion } from 'motion/react';

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-dark">
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] md:w-[50vw] md:h-[50vw] rounded-full bg-brand/50 blur-[80px] md:blur-[120px] mix-blend-screen"
      />
      <motion.div 
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] md:w-[60vw] md:h-[60vw] rounded-full bg-purple-900/40 blur-[100px] md:blur-[150px] mix-blend-screen"
      />
      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute top-[20%] md:right-[20%] -right-[10%] w-[400px] h-[400px] md:w-[40vw] md:h-[40vw] rounded-full bg-blue-600/30 blur-[80px] md:blur-[100px] mix-blend-screen"
      />
      
      {/* Şeffaf Firma Logosu */}
      <img 
        src="https://res.cloudinary.com/dejx0brol/image/upload/v1777703150/Ba%C5%9Fl%C4%B1ks%C4%B1z-1_azwxju.png" 
        alt="" 
        className="absolute -bottom-10 right-0 md:right-2 w-[50vw] md:w-[25vw] max-w-xl opacity-[0.02] mix-blend-screen pointer-events-none" 
      />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] contrast-150 brightness-150" />
    </div>
  );
};
