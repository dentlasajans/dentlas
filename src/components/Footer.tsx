import { Instagram, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const Footer = ({ setIsKvkkOpen, setIsPrivacyOpen }: { setIsKvkkOpen: (val: boolean) => void, setIsPrivacyOpen: (val: boolean) => void }) => {
  return (
    <footer className="py-8 px-6 border-t border-white/5 bg-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-4">
            <img src="https://res.cloudinary.com/dejx0brol/image/upload/v1777703150/Ba%C5%9Fl%C4%B1ks%C4%B1z-1_azwxju.png" alt="Dentlas Ajans Logo" className="h-10 md:h-12 w-auto opacity-90 -translate-y-0.5 md:-translate-y-1" />
            <div className="text-xl md:text-2xl font-bold tracking-tighter">
              Dentlas <span className="font-light opacity-50">Ajans</span>
            </div>
          </div>
          <p className="text-white/60 text-[10px] font-bold tracking-[0.2em]">© 2026 Dentlas Ajans. Secured by KasperskyLab. Tüm Hakları Saklıdır.</p>
        </div>

        <div className="flex gap-6">
          <motion.a whileHover={{ y: -5, scale: 1.1 }} href="https://instagram.com/dentlasajans" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 hover:border-transparent transition-all" aria-label="Instagram"><Instagram size={20} className="group-hover:text-white" /></motion.a>
          <motion.a whileHover={{ y: -5, scale: 1.1 }} href="https://wa.me/905522438468" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-[#25D366] hover:border-transparent transition-all" aria-label="WhatsApp"><MessageCircle size={20} className="group-hover:text-white" /></motion.a>
          <motion.a whileHover={{ y: -5, scale: 1.1 }} href="tel:+905522438468" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand hover:border-transparent transition-all" aria-label="Telefon"><Phone size={20} className="group-hover:text-white hover:text-black" /></motion.a>
        </div>

        <div className="flex gap-8 text-xs uppercase tracking-widest font-bold text-white/50">
          <button onClick={() => setIsKvkkOpen(true)} className="hover:text-brand transition-colors text-left uppercase tracking-widest font-bold">KVKK</button>
          <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-brand transition-colors text-left uppercase tracking-widest font-bold">Gizlilik</button>
          <a href="#" className="hover:text-brand">SSS</a>
        </div>
      </div>
    </footer>
  );
};
