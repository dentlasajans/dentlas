import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-red-500 transition-colors rounded-full hover:bg-red-500/20"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6 mt-2 pr-6">DENTLAS AJANS GİZLİLİK POLİTİKASI</h2>
            
            <div className="space-y-6 text-sm text-white leading-relaxed">
              <p>
                Dentlas Ajans ("Ajans") olarak, www.dentlasajans.com ziyaretçilerimizin gizlilik haklarını korumak bizim için bir önceliktir. İşbu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde bilgilerinizin nasıl kullanıldığına dair sizi bilgilendirmek amacıyla hazırlanmıştır.
              </p>

              <div>
                <h3 className="text-white font-bold mb-2">1. Toplanan Bilgiler ve Kapsam</h3>
                <p>Web sitemiz, ziyaretçilerimizden yalnızca İletişim Formu doldurulduğu takdirde veri toplamaktadır. Bu form aracılığıyla paylaştığınız;</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                  <li>Ad-Soyad,</li>
                  <li>E-posta Adresi,</li>
                  <li>Mesaj içeriği gibi bilgiler, sadece sizinle sağlıklı bir iletişim kurabilmek adına kayıt altına alınır.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">2. Veri Güvenliği</h3>
                <p>Topladığımız bilgiler, yetkisiz erişime, değiştirilmeye veya ifşa edilmesine karşı gerekli teknik ve idari tedbirlerle korunmaktadır. İletişim formu üzerinden gönderilen mesajlara sadece ilgili birim personelimiz erişebilmektedir.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">3. Üçüncü Taraf Takibi ve Çerezler</h3>
                <p><strong>Takip Araçları:</strong> Web sitemizde kullanıcıları takip eden, reklam amaçlı profilleyen veya kişisel veri toplayan üçüncü taraf araçlar (Google Analytics, Facebook Pixel vb.) kullanılmamaktadır.</p>
                <p className="mt-2"><strong>Çerezler:</strong> Sitemizde yalnızca sitenin teknik olarak düzgün çalışmasını sağlayan zorunlu çerezler bulunabilir. Reklam veya pazarlama amaçlı çerezler kullanılmamaktadır.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">4. Bilgi Paylaşımı</h3>
                <p>Paylaştığınız bilgiler, yasal bir zorunluluk (adli makamlarca talep edilmesi vb.) olmadığı müddetçe hiçbir şekilde üçüncü taraflarla paylaşılmaz, kiralanmaz veya ticari amaçla satılmaz.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">5. Dış Bağlantılar</h3>
                <p>Web sitemiz içerisinde sosyal medya hesaplarımıza (Instagram, LinkedIn vb.) yönlendiren bağlantılar bulunabilir. Bu sitelere tıkladığınızda, o platformların kendi gizlilik politikaları geçerli olacaktır. İlgili sitelerin gizlilik uygulamalarından Dentlas Ajans sorumlu tutulamaz.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">6. Politika Güncellemesi</h3>
                <p>Bu Gizlilik Politikası, sunulan hizmetlerde yapılacak değişiklikler veya yasal düzenlemeler doğrultusunda güncellenebilir. Değişiklikler web sitemizde yayınlandığı andan itibaren geçerlilik kazanır.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">7. İletişim</h3>
                <p>Gizlilik politikamız hakkında her türlü soru ve öneriniz için <a href="mailto:info@dentlasajans.com" className="text-brand hover:underline">info@dentlasajans.com</a> adresinden bize ulaşabilirsiniz.</p>
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
