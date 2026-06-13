import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { collection, query, orderBy, onSnapshot, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const initialCategories = [
  { id: 'social', label: 'Sosyal Medya Yönetimi', order: 0 },
  { id: 'atlaspos', label: 'AtlasPOS', order: 1 },
  { id: 'web', label: 'Web Tasarım', order: 2 },
  { id: 'identity', label: 'Kurumsal Kimlik', order: 3 },
];

const initialPricingData = {
  social: [
    {
      id: 'soc_1',
      title: 'Başlangıç',
      desc: 'Sosyal medyada var olmak isteyen işletmeler için',
      price: '₺5.000',
      period: '/ ay',
      popular: false,
      features: ['Haftada 3 Gönderi (Post/Reels)', 'Aylık İçerik Planı', 'Hesap Optimizasyonu', 'Standart Raporlama']
    },
    {
      id: 'soc_2',
      title: 'Profesyonel',
      desc: 'Etkileşimini ve satışlarını artırmak isteyenler için',
      price: '₺10.000',
      period: '/ ay',
      popular: true,
      features: ['Haftada 5 Gönderi (Post/Reels)', 'Hikaye (Story) Yönetimi', 'Aylık İçerik Planı', 'Rakip & Hashtag Analizi', 'Detaylı Aylık Raporlama', 'Mesaj ve Yorum Yönetimi']
    },
    {
      id: 'soc_3',
      title: 'Premium',
      desc: 'Tam kapsamlı dijital varlık ve reklam yönetimi',
      price: 'Özel Fiyat',
      period: '',
      popular: false,
      features: ['Haftanın Her Günü İçerik', 'Profesyonel Foto/Video Çekimi', 'Meta Reklam Yönetimi', 'Topluluk Yönetimi', 'Kriz İletişimi', 'Premium Canlı Destek']
    }
  ],
  atlaspos: [
    {
      id: 'pos_1',
      title: 'Standart',
      desc: 'Küçük ve orta ölçekli işletmeler için temel POS',
      price: '₺12.000',
      period: '/ yıl',
      popular: false,
      features: ['Hızlı Satış Ekranı', 'Stok ve Kasa Takibi', 'Bulut Yedekleme', 'Mobil Raporlama', 'Temel Destek']
    },
    {
      id: 'pos_2',
      title: 'Pro',
      desc: 'Gelişmiş restoran ve şubeli işletmeler için',
      price: '₺20.000',
      period: '/ yıl',
      popular: true,
      features: ['Garson & Mutfak Modülü', 'QR Menü Entegrasyonu', 'Yemek Sepeti / Getir Entegrasyonu', 'Parçalı Ödeme & Alman Usulü', 'Personel Yetkilendirme', '7/24 Öncelikli Destek']
    }
  ],
  web: [
    {
      id: 'web_1',
      title: 'Kurumsal Site',
      desc: 'Modern ve mobil uyumlu kurumsal tanıtım',
      price: '₺15.000',
      period: '’den başlayan',
      popular: false,
      features: ['Mobil Uyumlu (Responsive)', 'SEO Altyapısı', 'İletişim Formları & Harita', 'Yönetim Paneli (Opsiyonel)', 'Hızlı Açılış Süresi']
    },
    {
      id: 'web_2',
      title: 'E-Ticaret',
      desc: 'Online satışa hemen başlamak isteyenler için',
      price: '₺30.000',
      period: '’den başlayan',
      popular: true,
      features: ['Özel Tasarım', 'Sınırsız Ürün & Kategori', 'Sanal Pos Entegrasyonu', 'Kargo Entegrasyonları', 'Gelişmiş SEO Altyapısı', 'Güvenlik Uzantısı (SSL/WAF)']
    }
  ],
  identity: [
    {
      id: 'id_1',
      title: 'Temel Kurumsal',
      desc: 'Yeni kurulan markalar için başlangıç paketi',
      price: '₺8.000',
      period: '',
      popular: false,
      features: ['Logo Tasarımı', 'Kurumsal Renk ve Tipografi', 'Kartvizit Tasarımı', 'Antetli Kağıt Tasarımı']
    },
    {
      id: 'id_2',
      title: 'Kapsamlı Marka',
      desc: 'Tüm kurumsal ihtiyaçlarınıza profesyonel çözümler',
      price: '₺18.000',
      period: '',
      popular: true,
      features: ['Logo ve Alternatif Varyasyonlar', 'Kapsamlı Marka Kılavuzu', 'Sosyal Medya Şablonları', 'Promosyon ve Ambalaj Tasarımı', 'Masaüstü & Mobil İmzalar', 'Fatura ve İrsaliye Şablonu']
    }
  ]
};

const PricingCard = ({ plan, categoryLabel }: { plan: any, categoryLabel?: string }) => {
  // Determine available periods
  const availablePeriods = [];
  if (plan.prices) {
    if (plan.prices.monthly) availablePeriods.push({ id: 'monthly', label: 'Aylık', value: plan.prices.monthly, periodStr: '/ ay' });
    if (plan.prices.yearly) availablePeriods.push({ id: 'yearly', label: 'Yıllık', value: plan.prices.yearly, periodStr: '/ yıl' });
    if (plan.prices.onetime) availablePeriods.push({ id: 'onetime', label: 'Tek Seferlik', value: plan.prices.onetime, periodStr: '' });
  } else if (plan.price) {
    // Migration fallback
    if (plan.period?.toLowerCase().includes('ay')) availablePeriods.push({ id: 'monthly', label: 'Aylık', value: plan.price, periodStr: '/ ay' });
    else if (plan.period?.toLowerCase().includes('yıl')) availablePeriods.push({ id: 'yearly', label: 'Yıllık', value: plan.price, periodStr: '/ yıl' });
    else availablePeriods.push({ id: 'onetime', label: 'Tek Seferlik', value: plan.price, periodStr: '' });
  }

  const [selectedPeriod, setSelectedPeriod] = useState(availablePeriods[0]?.id || 'monthly');

  // If there are NO prices available at all globally, we don't render the card? 
  // For safety, let's render it with unavailable state, or just not render.
  if (availablePeriods.length === 0) return null;

  const currentPriceOption = availablePeriods.find(p => p.id === selectedPeriod) || availablePeriods[0];

  const message = encodeURIComponent(`Merhaba, ${categoryLabel || ''} - ${plan.title} hizmeti hakkında bilgi almak istiyorum.`);
  const whatsappUrl = `https://wa.me/905522438468?text=${message}`;

  return (
    <div 
      className={`w-[calc(100vw-32px)] max-h-[75vh] md:max-h-none flex-shrink-0 snap-center md:w-auto relative flex flex-col glass rounded-3xl pt-8 pb-6 px-6 md:p-8 border overflow-hidden ${
        plan.popular 
        ? 'border-brand/50 shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-gradient-to-b from-brand/10 to-transparent' 
        : 'border-white/10 bg-white/5'
      }`}
    >
      {plan.popular && (
        <div className="absolute top-5 -right-10 rotate-45 bg-brand text-black text-[10px] sm:text-[11px] font-bold uppercase tracking-widest py-1.5 shadow-lg z-10 flex items-center justify-center gap-1 w-[160px]">
          <Star size={10} />
          Önerilen
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
        <p className="text-white/60 text-sm min-h-[40px]">{plan.desc}</p>
      </div>
      
      {/* Selection Plan Toggle */}
      {availablePeriods.length > 1 && (
        <div className="flex bg-black/40 rounded-full p-1 mb-6 mt-2 border border-white/5">
          {availablePeriods.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPeriod(p.id)}
              className={`flex-1 text-center py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedPeriod === p.id ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
      {/* Spacing alignment when no toggle is needed so cards align */}
      {availablePeriods.length <= 1 && <div className="h-[42px] mb-6 mt-2 hidden lg:block" />}
      
      <div className="mb-8">
        <div className="flex items-end gap-1 mb-1">
          <span className="text-4xl font-bold text-white tracking-tight">{currentPriceOption.value}</span>
          {currentPriceOption.periodStr && <span className="text-white/50 text-sm pb-1">{currentPriceOption.periodStr}</span>}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
        <ul className="space-y-4">
          {plan.features?.map((feature: string, fIdx: number) => (
            <li key={fIdx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={12} className="text-brand" />
              </div>
              <span className="text-white/80 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-3 rounded-xl font-medium tracking-wide transition-all flex items-center justify-center gap-2 group ${
          plan.popular
          ? 'bg-brand text-black hover:bg-brand/90 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
          : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        Bilgi Al
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
};

export const Pricing = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('');
  const [loading, setLoading] = useState(true);

  // Seed data once
  useEffect(() => {
    const seedData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'pricing_categories'));
        if (snapshot.empty) {
          const batch = writeBatch(db);
          initialCategories.forEach((cat) => {
            const ref = doc(db, 'pricing_categories', cat.id);
            const data = {
              label: cat.label,
              order: cat.order,
              plans: initialPricingData[cat.id as keyof typeof initialPricingData] || []
            };
            batch.set(ref, data);
          });
          await batch.commit();
        }
      } catch (e) {
        console.error("Seeding error: ", e);
      }
    };
    seedData();
  }, []);

  // Listen to data
  useEffect(() => {
    const q = query(collection(db, 'pricing_categories'), orderBy('order', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
      
      if (cats.length > 0) {
        setActiveTab(prev => cats.some(c => c.id === prev) ? prev : cats[0].id);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading || categories.length === 0) {
    return (
      <section id="pricing" className="py-24 relative overflow-hidden min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      </section>
    );
  }

  const activeCategory = categories.find(c => c.id === activeTab);
  const activePlans = activeCategory?.plans || [];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading subtitle="FİYATLANDIRMA">
          İhtiyacınıza En Uygun Paketi Seçin.
        </SectionHeading>

        {/* Tabs */}
        <div className="flex overflow-x-auto custom-scrollbar pb-4 mb-10 w-full justify-start md:justify-center items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === cat.id 
                ? 'bg-brand text-black shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-nowrap md:grid md:grid-cols-2 ${activePlans.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 md:overflow-visible md:pb-0 md:px-0 custom-scrollbar`}
          >
            {activePlans.map((plan: any, idx: number) => (
              <PricingCard key={plan.id || idx} plan={plan} categoryLabel={activeCategory?.label} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Swipe Hint */}
        {activePlans.length > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex md:hidden items-center justify-center gap-2 mt-4 text-white/40 text-xs font-medium uppercase tracking-widest"
          >
            <ChevronLeft size={16} className="animate-pulse" />
            Kaydırarak İnceleyin
            <ChevronRight size={16} className="animate-pulse" />
          </motion.div>
        )}
      </div>
    </section>
  );
};

