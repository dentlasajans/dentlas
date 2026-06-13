import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Plus, Trash2, Edit2, Check, X, MoveUp, MoveDown, Save } from 'lucide-react';

export const AdminPricingManager = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Edit Category State
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [catLabel, setCatLabel] = useState('');
  
  // Edit Plan State
  const [editingPlanCategoryId, setEditingPlanCategoryId] = useState<string | null>(null);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [planTitle, setPlanTitle] = useState('');
  const [planDesc, setPlanDesc] = useState('');
  const [priceMonthly, setPriceMonthly] = useState('');
  const [priceYearly, setPriceYearly] = useState('');
  const [priceOnetime, setPriceOnetime] = useState('');
  const [planPopular, setPlanPopular] = useState(false);
  const [planFeatures, setPlanFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'pricing_categories'), orderBy('order', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleAddCategory = async () => {
    try {
      const newId = `cat_${Date.now()}`;
      await setDoc(doc(db, 'pricing_categories', newId), {
        label: 'Yeni Kategori',
        order: categories.length,
        plans: []
      });
    } catch (err) {
      console.error(err);
      setError('Kategori eklenirken hata oluştu.');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if(!confirm('Kategoriyi ve içindeki tüm planları silmek istediğinize emin misiniz?')) return;
    try {
      await deleteDoc(doc(db, 'pricing_categories', id));
    } catch (err) {
      console.error(err);
    }
  }

  const saveCategoryLabel = async (id: string, currentPlans: any[], currentOrder: number) => {
    try {
      await setDoc(doc(db, 'pricing_categories', id), {
        label: catLabel,
        plans: currentPlans,
        order: currentOrder
      }, { merge: true });
      setEditingCategoryId(null);
    } catch (err) {
      console.error(err);
      setError('Kategori güncellenirken hata oluştu.');
    }
  };

  const handleAddPlan = (categoryId: string) => {
    setEditingPlanCategoryId(categoryId);
    setEditingPlanId('new');
    setPlanTitle('');
    setPlanDesc('');
    setPriceMonthly('');
    setPriceYearly('');
    setPriceOnetime('');
    setPlanPopular(false);
    setPlanFeatures([]);
  };

  const handleEditPlan = (categoryId: string, plan: any) => {
    setEditingPlanCategoryId(categoryId);
    setEditingPlanId(plan.id);
    setPlanTitle(plan.title || '');
    setPlanDesc(plan.desc || '');
    
    // Legacy migration logic
    let m = '', y = '', o = '';
    if (plan.prices) {
      m = plan.prices.monthly || '';
      y = plan.prices.yearly || '';
      o = plan.prices.onetime || '';
    } else if (plan.price) {
      if (plan.period?.toLowerCase().includes('ay')) m = plan.price;
      else if (plan.period?.toLowerCase().includes('yıl')) y = plan.price;
      else o = plan.price;
    }

    setPriceMonthly(m);
    setPriceYearly(y);
    setPriceOnetime(o);
    setPlanPopular(plan.popular || false);
    setPlanFeatures(plan.features || []);
  };

  const savePlan = async (categoryId: string) => {
    try {
      const cat = categories.find(c => c.id === categoryId);
      if(!cat) return;
      
      let updatedPlans = [...(cat.plans || [])];
      
      const planData = {
        id: editingPlanId === 'new' ? `plan_${Date.now()}` : editingPlanId,
        title: planTitle,
        desc: planDesc,
        popular: planPopular,
        features: planFeatures,
        prices: {
          monthly: priceMonthly,
          yearly: priceYearly,
          onetime: priceOnetime
        }
      };

      if(editingPlanId === 'new') {
        updatedPlans.push(planData);
      } else {
        const idx = updatedPlans.findIndex((p: any) => p.id === editingPlanId);
        if(idx !== -1) updatedPlans[idx] = planData;
      }

      await setDoc(doc(db, 'pricing_categories', categoryId), {
        plans: updatedPlans
      }, { merge: true });

      setEditingPlanCategoryId(null);
      setEditingPlanId(null);
    } catch (err) {
      console.error(err);
      setError('Plan kaydedilirken hata oluştu.');
    }
  };

  const deletePlan = async (categoryId: string, planId: string) => {
    if(!confirm('Bu planı silmek istediğinize emin misiniz?')) return;
    try {
      const cat = categories.find(c => c.id === categoryId);
      if(!cat) return;
      const updatedPlans = (cat.plans || []).filter((p: any) => p.id !== planId);
      await setDoc(doc(db, 'pricing_categories', categoryId), {
        plans: updatedPlans
      }, { merge: true });
    } catch (err) {
      console.error(err);
    }
  };

  const addFeature = () => {
    if(newFeature.trim()) {
      setPlanFeatures([...planFeatures, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (idx: number) => {
    const arr = [...planFeatures];
    arr.splice(idx, 1);
    setPlanFeatures(arr);
  };

  const moveCategory = async (idx: number, dir: 'up' | 'down') => {
    if (dir === 'up' && idx === 0) return;
    if (dir === 'down' && idx === categories.length - 1) return;

    const newCats = [...categories];
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    
    // Swap orders
    const tempOrder = newCats[idx].order;
    newCats[idx].order = newCats[targetIdx].order;
    newCats[targetIdx].order = tempOrder;

    // Update in DB
    try {
      await setDoc(doc(db, 'pricing_categories', newCats[idx].id), { order: newCats[idx].order }, { merge: true });
      await setDoc(doc(db, 'pricing_categories', newCats[targetIdx].id), { order: newCats[targetIdx].order }, { merge: true });
    } catch (e) {
      console.error(e);
    }
  };

  if(loading) return <div className="p-6 text-white/50">Yükleniyor...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white/90">Fiyatlandırma Yönetimi</h2>
        <button onClick={handleAddCategory} className="bg-brand text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand/90 transition-colors">
          <Plus size={18} /> Yeni Kategori Ekle
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 text-red-500 p-4 rounded-xl border border-red-500/50 mb-6 font-medium">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {categories.map((cat, catIdx) => (
          <div key={cat.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
            {/* Category Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveCategory(catIdx, 'up')} disabled={catIdx === 0} className="text-white/40 hover:text-white disabled:opacity-30"><MoveUp size={16}/></button>
                  <button onClick={() => moveCategory(catIdx, 'down')} disabled={catIdx === categories.length - 1} className="text-white/40 hover:text-white disabled:opacity-30"><MoveDown size={16}/></button>
                </div>
                {editingCategoryId === cat.id ? (
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={catLabel} 
                      onChange={(e) => setCatLabel(e.target.value)}
                      className="bg-black/50 border border-white/20 rounded-lg px-3 py-1.5 text-white"
                      autoFocus
                    />
                    <button onClick={() => saveCategoryLabel(cat.id, cat.plans, cat.order)} className="bg-green-500/20 text-green-400 p-1.5 rounded hover:bg-green-500/30"><Check size={18}/></button>
                    <button onClick={() => setEditingCategoryId(null)} className="bg-red-500/20 text-red-400 p-1.5 rounded hover:bg-red-500/30"><X size={18}/></button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white">{cat.label}</h3>
                    <button onClick={() => { setEditingCategoryId(cat.id); setCatLabel(cat.label); }} className="text-white/40 hover:text-white"><Edit2 size={16}/></button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <button onClick={() => handleAddPlan(cat.id)} className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors">
                  <Plus size={16} /> Plan Ekle
                </button>
                <button onClick={() => handleDeleteCategory(cat.id)} className="text-sm bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors">
                  <Trash2 size={16} /> Kategoriyi Sil
                </button>
              </div>
            </div>

            {/* Plans List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {(cat.plans || []).map((plan: any) => (
                <div key={plan.id} className={`bg-black/40 border p-4 rounded-xl ${plan.popular ? 'border-brand/50' : 'border-white/10'}`}>
                  {editingPlanId === plan.id && editingPlanCategoryId === cat.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <input type="text" placeholder="Plan Başlığı" value={planTitle} onChange={e => setPlanTitle(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                      </div>
                      <input type="text" placeholder="Kısa Açıklama" value={planDesc} onChange={e => setPlanDesc(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2">
                        <div className="relative">
                          <label className="text-[10px] text-white/50 bg-black px-1.5 rounded absolute -top-2 left-2">Aylık Fiyat</label>
                          <input type="text" placeholder="Boş = Satış Yok" value={priceMonthly} onChange={e => setPriceMonthly(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                        </div>
                        <div className="relative">
                          <label className="text-[10px] text-white/50 bg-black px-1.5 rounded absolute -top-2 left-2">Yıllık Fiyat</label>
                          <input type="text" placeholder="Boş = Satış Yok" value={priceYearly} onChange={e => setPriceYearly(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                        </div>
                        <div className="relative">
                          <label className="text-[10px] text-white/50 bg-black px-1.5 rounded absolute -top-2 left-2">Tek S. Fiyat</label>
                          <input type="text" placeholder="Boş = Satış Yok" value={priceOnetime} onChange={e => setPriceOnetime(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                          <input type="checkbox" checked={planPopular} onChange={e => setPlanPopular(e.target.checked)} className="rounded border-white/20 bg-black/50" />
                          En Çok Tercih Edilen (Popüler)
                        </label>
                      </div>
                      
                      <div className="border border-white/5 rounded-lg p-3 bg-black/20">
                        <p className="text-xs text-white/50 mb-2">Özellikler ({planFeatures.length})</p>
                        <div className="space-y-2 mb-3">
                          {planFeatures.map((feat, fIdx) => (
                            <div key={fIdx} className="flex justify-between items-center text-sm bg-white/5 px-2 py-1 rounded">
                              <span className="text-white/80">{feat}</span>
                              <button onClick={() => removeFeature(fIdx)} className="text-red-400 hover:text-red-300"><X size={14}/></button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input type="text" placeholder="Yeni özellik yazın..." value={newFeature} onChange={e => setNewFeature(e.target.value)} onKeyDown={e => e.key === 'Enter' && addFeature()} className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-white text-sm" />
                          <button onClick={addFeature} type="button" className="bg-white/10 text-white px-3 border border-white/10 rounded hover:bg-white/20 text-sm">Ekle</button>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                        <button onClick={() => {setEditingPlanId(null); setEditingPlanCategoryId(null);}} className="px-3 py-1.5 text-sm text-white/60 hover:text-white transition-colors">İptal</button>
                        <button onClick={() => savePlan(cat.id)} className="px-4 py-1.5 text-sm bg-brand text-black font-medium rounded-lg hover:bg-brand/90 transition-colors flex items-center gap-2"><Save size={16}/> Kaydet</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white">{plan.title}</h4>
                            {plan.popular && <span className="bg-brand/20 text-brand text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Popüler</span>}
                          </div>
                          <p className="text-xs text-white/50">{plan.desc}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleEditPlan(cat.id, plan)} className="p-1.5 text-white/40 hover:text-white bg-white/5 rounded transition-colors"><Edit2 size={14}/></button>
                          <button onClick={() => deletePlan(cat.id, plan.id)} className="p-1.5 text-red-400/50 hover:text-red-400 bg-red-400/10 rounded transition-colors"><Trash2 size={14}/></button>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-white mb-3 space-y-1">
                        {plan.prices?.monthly && <div>{plan.prices.monthly} <span className="text-xs text-white/50 font-normal">/ ay</span></div>}
                        {plan.prices?.yearly && <div>{plan.prices.yearly} <span className="text-xs text-white/50 font-normal">/ yıl</span></div>}
                        {plan.prices?.onetime && <div>{plan.prices.onetime}</div>}
                        {(!plan.prices || (!plan.prices.monthly && !plan.prices.yearly && !plan.prices.onetime)) && (
                            <div>{plan.price} <span className="text-xs text-white/50 font-normal">{plan.period}</span></div>
                        )}
                      </div>
                      <ul className="text-xs text-white/70 space-y-1">
                        {plan.features?.map((f: string, i: number) => (
                          <li key={i} className="flex items-center gap-1"><Check size={10} className="text-brand"/> {f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Add New Plan Editor */}
              {editingPlanId === 'new' && editingPlanCategoryId === cat.id && (
                <div className="bg-black/40 border border-brand/50 p-4 rounded-xl space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <input type="text" placeholder="Plan Başlığı" value={planTitle} onChange={e => setPlanTitle(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                  </div>
                  <input type="text" placeholder="Kısa Açıklama" value={planDesc} onChange={e => setPlanDesc(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2">
                    <div className="relative">
                      <label className="text-[10px] text-white/50 bg-black px-1.5 rounded absolute -top-2 left-2">Aylık Fiyat</label>
                      <input type="text" placeholder="Boş = Satış Yok" value={priceMonthly} onChange={e => setPriceMonthly(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                    <div className="relative">
                      <label className="text-[10px] text-white/50 bg-black px-1.5 rounded absolute -top-2 left-2">Yıllık Fiyat</label>
                      <input type="text" placeholder="Boş = Satış Yok" value={priceYearly} onChange={e => setPriceYearly(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                    <div className="relative">
                      <label className="text-[10px] text-white/50 bg-black px-1.5 rounded absolute -top-2 left-2">Tek S. Fiyat</label>
                      <input type="text" placeholder="Boş = Satış Yok" value={priceOnetime} onChange={e => setPriceOnetime(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                      <input type="checkbox" checked={planPopular} onChange={e => setPlanPopular(e.target.checked)} className="rounded border-white/20 bg-black/50" />
                      En Çok Tercih Edilen
                    </label>
                  </div>
                  
                  <div className="border border-white/5 rounded-lg p-3 bg-black/20">
                    <p className="text-xs text-white/50 mb-2">Özellikler ({planFeatures.length})</p>
                    <div className="space-y-2 mb-3">
                      {planFeatures.map((feat, fIdx) => (
                        <div key={fIdx} className="flex justify-between items-center text-sm bg-white/5 px-2 py-1 rounded">
                          <span className="text-white/80">{feat}</span>
                          <button onClick={() => removeFeature(fIdx)} className="text-red-400 hover:text-red-300"><X size={14}/></button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Yeni özellik yazın..." value={newFeature} onChange={e => setNewFeature(e.target.value)} onKeyDown={e => e.key === 'Enter' && addFeature()} className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-white text-sm" />
                      <button onClick={addFeature} type="button" className="bg-white/10 text-white px-3 border border-white/10 rounded hover:bg-white/20 text-sm">Ekle</button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                    <button onClick={() => {setEditingPlanId(null); setEditingPlanCategoryId(null);}} className="px-3 py-1.5 text-sm text-white/60 hover:text-white transition-colors">İptal</button>
                    <button onClick={() => savePlan(cat.id)} className="px-4 py-1.5 text-sm bg-brand text-black font-medium rounded-lg hover:bg-brand/90 transition-colors flex items-center gap-2"><Save size={16}/> Ekle</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="text-center text-white/50 py-12 bg-white/5 rounded-xl border border-white/10">
            Henüz hiç fiyatlandırma kategorisi eklenmemiş. Önce bir kategori ekleyin.
          </div>
        )}
      </div>
    </div>
  );
};
