import { motion } from 'motion/react';
import { MessageSquare, Globe } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

export const Iletisim = ({ setIsKvkkOpen }: { setIsKvkkOpen: (val: boolean) => void }) => {
  return (
    <section id="iletişim" className="py-32 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <SectionHeading subtitle="İLETİŞİM">Hazırsanız <br /> Başlayalım.</SectionHeading>
            <p className="text-white text-lg font-light mb-12">
              Hayalinizdeki dijital varlığı gerçeğe dönüştürmek için bir kahve içelim. Fikirleriniz bizimle güvende.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-widest">E-posta Gönderin</p>
                  <p className="text-lg font-medium">hello@dentlasajans.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-widest">Ofisimizi Ziyaret Edin</p>
                  <p className="text-lg font-medium">Maslak No:1, İstanbul</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 glass rounded-3xl border-white/5"
          >
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white">İsim</label>
                  <input type="text" className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-5 focus:border-brand focus:outline-none transition-all placeholder:opacity-30" placeholder="İsminiz..." />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white">E-posta</label>
                  <input type="email" className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-5 focus:border-brand focus:outline-none transition-all placeholder:opacity-30" placeholder="E-posta adresiniz..." />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white">Mesajınız</label>
                <textarea rows={4} className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-5 focus:border-brand focus:outline-none transition-all resize-none placeholder:opacity-30" placeholder="Projeniz hakkında kısa bir bilgi..."></textarea>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 flex items-center h-5">
                  <input 
                    id="kvkk"
                    type="checkbox" 
                    className="w-4 h-4 rounded border-white/10 bg-white/[0.02] text-brand focus:ring-brand focus:ring-offset-dark"
                    required
                  />
                </div>
                <label htmlFor="kvkk" className="text-xs text-white leading-relaxed cursor-pointer select-none">
                  <button type="button" onClick={() => setIsKvkkOpen(true)} className="text-brand hover:underline">KVKK Aydınlatma Metni</button>'ni okudum ve kabul ediyorum.
                </label>
              </div>

              <button type="submit" className="w-full bg-white text-black p-6 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl">
                BAŞLAYALIM
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
