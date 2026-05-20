import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { Image as ImageIcon, Video as VideoIcon, Trash2, Plus, LogOut, UploadCloud, Loader2 } from 'lucide-react';
import { OperationType, handleFirestoreError } from '../../lib/firestoreError';

const generateCloudinarySignature = async (timestamp: number) => {
  const secret = 'LzarS09zBKRvsGhph9s4pQbwzEI'; // user provided cloudinary secret
  const data = `timestamp=${timestamp}${secret}`;
  const msgUint8 = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

const AdminGallery = () => {
  const [media, setMedia] = useState<{id: string, src: string, type: 'image' | 'video'}[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [newType, setNewType] = useState<'image' | 'video'>('image');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'media'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setMedia(snapshot.docs.map(doc => ({
        id: doc.id,
        src: doc.data().src,
        type: doc.data().type
      })));
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'media');
    });
    return unsub;
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = await generateCloudinarySignature(timestamp);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', '943986857686586');
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);

      const response = await fetch(`https://api.cloudinary.com/v1_1/dejx0brol/${newType === 'video' ? 'video' : 'image'}/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.secure_url) {
        const mediaId = crypto.randomUUID();
        await setDoc(doc(db, 'media', mediaId), {
          src: data.secure_url,
          type: newType,
          createdAt: Date.now()
        });
        setFile(null);
      } else {
        throw new Error(data.error?.message || 'Yükleme hatası');
      }
    } catch (error) {
      alert("Hata: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Emin misiniz?')) return;
    try {
      await deleteDoc(doc(db, 'media', id));
    } catch (error) {
      alert("Silme hatası.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white/90">Galeri Yönetimi</h2>
      
      <form onSubmit={handleAdd} className="bg-white/5 p-4 rounded-xl border border-white/10 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <input 
          type="file"
          accept={newType === 'video' ? "video/*" : "image/*"}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-brand hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white cursor-pointer hover:bg-white/10 transition-colors flex items-center justify-between">
          <span className="truncate">{file ? file.name : "Dosya seçin..."}</span>
          <UploadCloud size={18} className="text-white/50" />
        </label>
        
        <select 
          value={newType} 
          onChange={(e) => {
            setNewType(e.target.value as any);
            setFile(null);
          }}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-brand"
        >
          <option value="image">Görsel (Image)</option>
          <option value="video">Video</option>
        </select>
        <button 
          type="submit" 
          disabled={!file || uploading}
          className="bg-brand text-black px-6 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? <><Loader2 size={18} className="animate-spin" /> Yükleniyor</> : <><Plus size={18} /> Yükle</>}
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map(item => (
          <div key={item.id} className="relative group bg-black/40 rounded-xl overflow-hidden aspect-square border border-white/10">
            {item.type === 'video' ? (
              <video src={item.src} className="w-full h-full object-cover opacity-80" muted />
            ) : (
              <img src={item.src} className="w-full h-full object-cover opacity-80" />
            )}
            <div className="absolute top-2 left-2 bg-black/60 p-1.5 rounded-md backdrop-blur-md">
              {item.type === 'video' ? <VideoIcon size={16} className="text-white" /> : <ImageIcon size={16} className="text-white" />}
            </div>
            <button 
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminPanel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const email = `${username}@dentlasajans.com`;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err: any) {
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
          await createUserWithEmailAndPassword(auth, email, password);
        } else {
          throw err;
        }
      }
    } catch (error: any) {
      setLoginError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => signOut(auth);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white/50">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand/30 z-[200] relative">
      <nav className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-black tracking-widest text-brand"><Link to="/admin">ADMIN PANELİ</Link></div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-white/50 hover:text-white">Siteye Dön</Link>
          {user && (
            <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 flex items-center gap-2">
              <LogOut size={16} /> Çıkış Yap
            </button>
          )}
        </div>
      </nav>

      {!user ? (
        <form onSubmit={handleLogin} className="max-w-md mx-auto mt-32 p-8 glass rounded-2xl border border-white/5 text-center">
          <h2 className="text-2xl font-bold mb-2">Admin Girişi</h2>
          <p className="text-white/50 mb-8 text-sm">Yalnızca yetkili hesaplar erişebilir.</p>
          
          <div className="flex flex-col gap-4 mb-6">
            <input 
              type="text" 
              placeholder="Kullanıcı Adı" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-brand w-full"
              required
            />
            <input 
              type="password" 
              placeholder="Şifre" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-brand w-full"
              required
            />
          </div>

          {loginError && <div className="text-red-400 text-sm mb-4">{loginError}</div>}

          <button 
            type="submit"
            disabled={loginLoading}
            className="w-full bg-white text-black py-3 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loginLoading ? <Loader2 className="animate-spin" size={20} /> : "Giriş Yap"}
          </button>
        </form>
      ) : user.email !== 'dentlasajans@dentlasajans.com' && user.email !== 'himmetmuhammedk@gmail.com' ? (
        <div className="max-w-md mx-auto mt-32 p-8 bg-red-500/10 rounded-2xl border border-red-500/20 text-center text-red-100">
          <h2 className="text-2xl font-bold mb-2 text-red-500">Yetkisiz Erişim</h2>
          <p className="text-sm mb-8 opacity-80">Giriş yaptığınız hesap ({user.email}) admin paneline erişim yetkisine sahip değil.</p>
          <button 
            onClick={handleLogout}
            className="bg-white/10 text-white px-6 py-2 rounded-lg font-bold hover:bg-white/20 transition-colors"
          >
            Farklı Hesapla Giriş Yap
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto flex">
          <aside className="w-64 border-r border-white/10 min-h-[calc(100vh-73px)] p-6 hidden md:block">
            <ul className="space-y-4">
              <li>
                <Link to="/admin" className="text-brand font-medium flex items-center gap-3">
                  <ImageIcon size={18} /> Galeri Yönetimi
                </Link>
              </li>
            </ul>
          </aside>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<AdminGallery />} />
            </Routes>
          </main>
        </div>
      )}
    </div>
  );
};

