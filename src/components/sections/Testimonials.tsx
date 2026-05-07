import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const testimonials = [
  {
    name: "Ahmet Yıldız",
    role: "Nenessa Hotel, Genel Müdür",
    content: "Dentlas Ajans ile çalışmaya başladıktan sonra sosyal medyadaki duruşumuz tamamen değişti. Hem rezervasyonlarımız arttı hem de kurumsal kimliğimiz lüks otel konseptimize tam oturdu. Hızlı ve yenilikçi bir ekip.",
    rating: 5
  },
  {
    name: "Ayşe Kaya",
    role: "Kaya Mimarlık, Kurucu",
    content: "Web sitemizin yenilenmesi sürecinde gösterdikleri vizyon ve tasarım yetenekleri muazzamdı. Sadece estetik değil, müşteri dönüşümünü de düşünerek harika bir iş çıkardılar.",
    rating: 5
  },
  {
    name: "Mehmet Demir",
    role: "Demir Otomotiv, Satış Müdürü",
    content: "Performans reklamları konusunda gerçekten profesyoneller. Bütçemizi en verimli şekilde kullanarak daha önce ulaşamadığımız kitlelere ulaşmamızı sağladılar. Aksaray'da böyle bir ajansın olması büyük şans.",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 sm:py-32 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-brand/5 pointer-events-none -translate-y-1/2 blur-3xl"></div>
      
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
              className="glass border border-white/5 p-8 rounded-3xl relative group hover:border-brand/40 transition-colors"
            >
              <div className="absolute top-6 right-6 text-white/5 group-hover:text-brand/10 transition-colors">
                <Quote size={64} />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-brand text-brand" />
                ))}
              </div>
              
              <p className="text-white/80 font-light leading-relaxed mb-8 relative z-10 min-h-[120px]">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center font-black text-xl text-brand border border-white/10">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-white/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
