import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Phone, Mail, X, Instagram } from 'lucide-react';

export const ContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const links = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/905307382601',
      color: 'bg-[#25D366] text-white',
      hoverColor: 'hover:bg-[#20bd5a]'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/dentlasajans',
      color: 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 text-white',
      hoverColor: 'hover:opacity-90'
    },
    {
      icon: Phone,
      label: 'Telefon',
      href: 'tel:+905307382601',
      color: 'bg-zinc-800 text-white border border-white/10',
      hoverColor: 'hover:bg-zinc-700'
    },
    {
      icon: Mail,
      label: 'E-posta',
      href: 'mailto:info@dentlas.com',
      color: 'bg-black text-white border border-white/10',
      hoverColor: 'hover:bg-white/10'
    }
  ];

  const handleLinkClick = (label: string) => {
    if (typeof window !== 'undefined') {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'contact_button_click', {
          'event_category': 'engagement',
          'event_label': label
        });
      }
      if ((window as any).fbq) {
        (window as any).fbq('trackCustom', 'ContactClick', { method: label });
      }
    }
  };

  if (isMobile) {
    return (
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 flex items-center backdrop-blur-xl w-full"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            onClick={() => handleLinkClick(link.label)}
            target={link.label === 'WhatsApp' || link.label === 'Instagram' ? "_blank" : undefined}
            rel={link.label === 'WhatsApp' || link.label === 'Instagram' ? "noopener noreferrer" : undefined}
            className="flex-1 flex items-center justify-center py-3 active:bg-white/5 transition-colors border-r border-white/5 last:border-r-0"
          >
            <link.icon size={22} strokeWidth={2} className={`${
              link.label === 'WhatsApp' ? 'text-[#25D366]' : 
              link.label === 'Instagram' ? 'text-pink-400' : 
              link.label === 'Telefon' ? 'text-blue-400' : 
              'text-white/80'
            }`} />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 mb-2"
          >
            {links.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                onClick={() => handleLinkClick(link.label)}
                target={link.label === 'WhatsApp' || link.label === 'Instagram' ? "_blank" : undefined}
                rel={link.label === 'WhatsApp' || link.label === 'Instagram' ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 p-3 pr-4 rounded-full shadow-lg ${link.color} ${link.hoverColor} transition-colors group`}
              >
                <div className="bg-black/20 p-2 rounded-full">
                  <link.icon size={20} />
                </div>
                <span className="font-medium text-sm pr-2">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-brand text-black flex items-center justify-center shadow-2xl hover:scale-105 transition-transform relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
               <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulsing effect when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full border-2 border-brand animate-ping opacity-50" />
        )}
      </button>
    </div>
  );
};
