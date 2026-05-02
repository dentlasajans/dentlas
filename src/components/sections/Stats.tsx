import { motion } from 'motion/react';

export const Stats = () => {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        {[
          { label: 'Organik Erişim', value: '+420%' },
          { label: 'Aylık Etkileşim', value: '12M' },
          { label: 'Dönüşüm Oranı', value: '85k' },
          { label: 'Analiz Hızı', value: '15ms' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="border-l-2 border-brand pl-8"
          >
            <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
            <div className="text-white uppercase tracking-[0.2em] text-[10px] font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
