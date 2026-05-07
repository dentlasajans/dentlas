import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const faqs = [
  {
    question: "Süreç nasıl işliyor? Ne zaman başlıyoruz?",
    answer: "Öncelikle markanızın ihtiyaçlarını analiz etmek için kısa bir toplantı (veya telefon görüşmesi) yapıyoruz. Hedeflerinizi belirledikten sonra size özel bir strateji ve teklif sunuyoruz. Onayınızın ardından hemen planlama ve içerik üretimine başlıyoruz."
  },
  {
    question: "Sadece Aksaray'da mı hizmet veriyorsunuz?",
    answer: "Hayır, merkezimiz Aksaray'da olmakla birlikte tüm Türkiye'ye ve yurt dışındaki Türk markalarına dijital reklam, web tasarım ve sosyal medya yönetimi hizmeti sunuyoruz. Tamamen dijital bir süreç yürüttüğümüz için mesafe bizim için bir engel değil."
  },
  {
    question: "Web sitemi ne kadar sürede teslim edersiniz?",
    answer: "İhtiyacınız olan web sitesinin kapsamına (kurumsal, e-ticaret, landing page) göre değişmekle birlikte standart bir kurumsal web sitesini 1-2 hafta içerisinde tamamlayıp yayına alıyoruz."
  },
  {
    question: "Sosyal medya yönetimi paketleriniz neleri kapsıyor?",
    answer: "Aylık strateji planlaması, içerik üretimi (post, reels, story), metin yazarlığı (copywriting), görsel tasarım, hashtag stratejisi, yorum/mesaj takibi ve aylık performans raporlamasını kapsar."
  },
  {
    question: "Reklam bütçemi nasıl belirlemeliyim?",
    answer: "Sektörünüze, hedefinize (satış, marka bilinirliği, form toplama) ve hedef kitlenize göre bütçe önerisinde bulunuyoruz. Düşük bütçelerle test reklamları çıkarak en kârlı kanalları buluyor, sonrasında bütçenizi ölçeklendiriyoruz."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading subtitle="MERAK EDİLENLER">Sıkça Sorulan Sorular.</SectionHeading>
        
        <div className="max-w-3xl mx-auto mt-16">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 sm:p-8 rounded-2xl glass border border-white/5 hover:border-brand/50 transition-colors flex items-center justify-between group"
                aria-expanded={openIndex === index}
              >
                <span className={`text-lg sm:text-xl font-bold pr-8 transition-colors ${openIndex === index ? 'text-brand' : 'text-white group-hover:text-white/80'}`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${openIndex === index ? 'bg-brand/10 border-brand text-brand' : 'border-white/10 text-white/50 group-hover:text-white'}`}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 sm:p-8 pt-0 text-white/70 leading-relaxed font-light text-base sm:text-lg">
                      <div className="pt-4 border-t border-white/5">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
