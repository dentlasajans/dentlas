import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';

export const Hakkimda = () => {
  return (
    <section id="hakkimizda" className="py-12 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="HAKKIMIZDA">Biz Kimiz?</SectionHeading>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative group rounded-3xl overflow-hidden aspect-[4/5] max-w-[280px] sm:max-w-xs mx-auto lg:mx-0 w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent z-10" />
            <img 
              src="https://res.cloudinary.com/dejx0brol/image/upload/v1777882709/20250615_001859_0000_hdtdmt.png" 
              alt="Himmet Muhammed KILIÇ" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 overflow-hidden">
              <h3 className="text-base sm:text-lg font-bold tracking-tight mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Himmet Muhammed KILIÇ</h3>
              <p className="text-brand text-[10px] uppercase tracking-[0.2em] font-black opacity-80">Founder</p>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 text-white/70"
          >
            <p className="text-xl md:text-2xl leading-relaxed text-white">
              Dentlas Ajans olarak, dijital dünyada markanızı bir adım öne taşımak için buradayız. Sosyal medya yönetimi, kreatif strateji ve dijital pazarlama alanlarında uzman ekibimizle, yenilikçi ve etkileyici çözümler sunuyoruz.
            </p>
            <p className="leading-relaxed">
              Her markanın bir hikayesi olduğuna inanıyor ve bu hikayeyi hedef kitlenizle en doğru şekilde buluşturuyoruz. Amacımız, dijital varlığınızı güçlendirmek ve markanızın dijital dünyada kalıcı bir iz bırakmasını sağlamaktır.
            </p>
            <p className="leading-relaxed">
              Bizimle çalışarak sınırları ortadan kaldırın ve markanızı geleceğe taşıyın!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
