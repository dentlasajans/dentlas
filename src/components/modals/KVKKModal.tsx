import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export const KVKKModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass border border-white/10 rounded-2xl p-8 shadow-2xl custom-scrollbar bg-dark/95"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6 mt-2 pr-6">DENTLAS AJANS - İLETİŞİM FORMU AYDINLATMA METNİ</h2>
            
            <div className="space-y-6 text-sm text-white leading-relaxed">
              <p>
                Dentlas Ajans ("Ajans") olarak, www.dentlasajans.com adresindeki web sitemizde yer alan iletişim formu aracılığıyla paylaştığınız kişisel verilerinizin (Ad-soyad, e-posta adresi ve mesaj içeriği) güvenliğine önem veriyoruz.
              </p>

              <div>
                <h3 className="text-white font-bold mb-2">1. Verilerin Hangi Amaçla İşlendiği</h3>
                <p>İletişim formu aracılığıyla bizimle paylaştığınız kişisel verileriniz;</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                  <li>Sorduğunuz sorulara yanıt vermek,</li>
                  <li>Hizmetlerimizle ilgili taleplerinizi yönetmek,</li>
                  <li>Sizinle iletişime geçmek amacıyla sınırlı olarak işlenmektedir.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">2. Veri Toplamanın Yöntemi ve Hukuki Sebebi</h3>
                <p>Verileriniz, iletişim formunu doldurmanız suretiyle tamamen elektronik ortamda toplanmaktadır. Bu veriler, 6698 sayılı KVKK'nın 5/2-c maddesinde belirtilen "Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması" hukuki sebebine dayalı olarak işlenmektedir.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">3. Verilerin Aktarılması</h3>
                <p>İletişim formu üzerinden paylaştığınız bilgiler, sadece talebinize cevap verebilmek amacıyla yetkili personelimiz tarafından görülmekte olup; yasal bir zorunluluk olmadığı sürece üçüncü şahıslara veya kurumlara aktarılmamaktadır.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">4. Haklarınız</h3>
                <p>KVKK'nın 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme ve verilerinizin silinmesini isteme haklarına sahipsiniz. Bu haklarınızı kullanmak için <a href="mailto:info@dentlasajans.com" className="text-brand hover:underline">info@dentlasajans.com</a> adresinden bizimle her zaman iletişime geçebilirsiniz.</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <button 
                onClick={onClose}
                className="bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand/90 transition-colors"
              >
                Anladım
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
