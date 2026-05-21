import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const testimonials = [
  {
    name: "Osman KOÇAK",
    role: "Nenessa Hotel, Genel Müdür",
    logo: "https://res.cloudinary.com/dejx0brol/image/upload/v1777882176/logo_beyaz_jfwaxk.png",
    content: "Dentlas Ajans ile çalışmaya başladıktan sonra sosyal medyadaki duruşumuz tamamen değişti. Hem rezervasyonlarımız arttı hem de kurumsal kimliğimiz lüks otel konseptimize tam oturdu. Hızlı ve yenilikçi bir ekip.",
    rating: 5
  },
  {
    name: "Sibel ALTUNSU",
    role: "Nenessa Hotel, Organizasyon Müdürü",
    logo: "https://res.cloudinary.com/dejx0brol/image/upload/v1777882176/logo_beyaz_jfwaxk.png",
    content: "Otelimizdeki organizasyon ve etkinliklerin tanıtımında harika işler çıkardılar. Yenilikçi tasarımları ve doğru hedef kitle analizi sayesinde etkinliklerimize olan ilgi büyük ölçüde arttı.",
    rating: 5
  },
  {
    name: "Bülent BEY",
    role: "Küncü Simit Cafe, İşletme Yetkilisi",
    logo: "https://res.cloudinary.com/dejx0brol/image/upload/v1779357226/Ads%C4%B1z_tasar%C4%B1m_f6glvs.png",
    content: "QR menü, kurumsal kimlik ve tasarım konusundaki stratejik fikir alışverişlerimiz işletmemize çok değer kattı. Modern ve vizyoner yaklaşımlarıyla yeni bir marka yüzüne kavuştuk.",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 sm:py-32 relative z-10 overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading subtitle="MÜŞTERİ DENEYİMLERİ">Bizimle Çalışanlar Ne Diyor?</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass border border-white/5 p-8 rounded-3xl relative group hover:border-brand/40 transition-colors h-full flex flex-col"
            >
              <div className="absolute top-6 right-6 text-white/5 group-hover:text-brand/10 transition-colors">
                <Quote size={64} />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-brand text-brand" />
                ))}
              </div>
              
              <p className="text-white/80 font-light leading-relaxed mb-8 relative z-10 flex-1">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-white/5 mt-auto">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center font-black text-xl text-brand border border-white/10 shrink-0">
                  {t.logo ? (
                    <img src={t.logo} alt={t.name} className="w-8 h-8 object-contain" loading="lazy" decoding="async" />
                  ) : (
                    t.name.charAt(0)
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
