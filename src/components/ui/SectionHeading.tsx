import { ReactNode } from 'react';
import { motion } from 'motion/react';

export const SectionHeading = ({ children, subtitle, centered = false, className = "mb-16" }: { children: ReactNode, subtitle?: string, centered?: boolean, className?: string }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 20, stiffness: 100 } },
    hidden: { opacity: 0, y: 30 },
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`${className} ${centered ? 'text-center flex flex-col items-center' : ''}`}
    >
      {subtitle && (
        <motion.p 
          variants={child}
          className="text-brand text-xs uppercase tracking-[0.3em] font-bold mb-4"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2 
        variants={container}
        className={`text-4xl md:text-6xl font-extrabold tracking-tight flex flex-wrap gap-x-3 gap-y-2 ${centered ? 'justify-center' : ''}`}
      >
        {typeof children === 'string' ? children.split(' ').map((word, index) => (
          <motion.span variants={child} key={index} className="inline-block relative overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: index * 0.05 + 0.1 }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </motion.span>
        )) : children}
      </motion.h2>
    </motion.div>
  );
};
