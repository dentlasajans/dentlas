import { motion } from 'motion/react';
import { MessageSquare, Globe, Phone, Instagram } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { useState, type FormEvent } from 'react';

export const Iletisim = ({ setIsKvkkOpen }: { setIsKvkkOpen: (val: boolean) => void }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/himmetmuhammedk@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="iletişim" className="py-32 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
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
                  <p className="text-xs font-bold text-white uppercase tracking-widest">E-posta</p>
                  <a href="mailto:info@dentlasajans.com" className="text-base md:text-lg font-medium break-all md:break-normal hover:text-brand transition-colors">info@dentlasajans.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-widest">Telefon</p>
                  <a href="tel:+905522438468" className="text-base md:text-lg font-medium hover:text-brand transition-colors">0 552 243 84 68</a>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                  <Instagram size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-widest">Instagram</p>
                  <a href="https://instagram.com/dentlasajans" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-medium hover:text-brand transition-colors">@dentlasajans</a>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-widest">Adres</p>
                  <p className="text-base font-medium max-w-[200px] leading-snug">Mehmet Akif Ersoy Mah. Aksaray Merkez 68100</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-12 glass rounded-3xl border-white/5">
            <form onSubmit={handleSubmit} className="space-y-8">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Dentlas Ajans Yeni İletişim Formu Mesajı" />
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="isim" className="text-[10px] uppercase tracking-[0.2em] font-black text-white/70">İsim</label>
                  <input id="isim" name="Isim" type="text" className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-5 focus:border-brand focus:ring-1 focus:ring-brand focus:bg-white/[0.05] focus:outline-none transition-all placeholder:opacity-30" placeholder="İsminiz..." required />
                </div>
                <div className="space-y-3">
                  <label htmlFor="eposta" className="text-[10px] uppercase tracking-[0.2em] font-black text-white/70">E-posta</label>
                  <input id="eposta" name="Eposta" type="email" className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-5 focus:border-brand focus:ring-1 focus:ring-brand focus:bg-white/[0.05] focus:outline-none transition-all placeholder:opacity-30" placeholder="E-posta adresiniz..." required />
                </div>
              </div>
              <div className="space-y-3">
                <label htmlFor="mesaj" className="text-[10px] uppercase tracking-[0.2em] font-black text-white/70">Mesajınız</label>
                <textarea id="mesaj" name="Mesaj" rows={4} className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-5 focus:border-brand focus:ring-1 focus:ring-brand focus:bg-white/[0.05] focus:outline-none transition-all resize-none placeholder:opacity-30" placeholder="Projeniz hakkında kısa bir bilgi..." required></textarea>
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

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full bg-brand text-black p-6 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] hover:bg-[#60a5fa] transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:hover:scale-100"
              >
                {status === 'idle' && 'BAŞLAYALIM'}
                {status === 'sending' && 'GÖNDERİLİYOR...'}
                {status === 'success' && 'BAŞARIYLA GÖNDERİLDİ!'}
                {status === 'error' && 'BİR HATA OLUŞTU, TEKRAR DENEYİN'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-20 w-full rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] glass border border-white/5 relative h-[300px] md:h-[400px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3119.5393439976374!2d34.013141!3d38.375825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d48384b25ecb29%3A0xb3abcf59e2101dd8!2sAksaray!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)', position: 'absolute', top: 0, left: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Aksaray Harita"
          />
          <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-3xl"></div>
        </div>
      </div>
    </section>
  );
};
