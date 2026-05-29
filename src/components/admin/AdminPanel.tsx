import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../lib/firebase';
import { Image as ImageIcon, Video as VideoIcon, Trash2, Plus, LogOut, UploadCloud, Loader2, Camera, FileText } from 'lucide-react';
import { OperationType, handleFirestoreError } from '../../lib/firestoreError';

const extractPublicId = (url: string) => {
  try {
    const parts = url.split('/upload/');
    if (parts.length > 1) {
      let pathStr = parts[1];
      if (pathStr.match(/^v\d+\//)) {
        pathStr = pathStr.replace(/^v\d+\//, '');
      }
      const lastDotIndex = pathStr.lastIndexOf('.');
      if (lastDotIndex !== -1) {
        pathStr = pathStr.substring(0, lastDotIndex);
      }
      return decodeURIComponent(pathStr);
    }
  } catch (e) {
    console.warn("Public ID çıkarılamadı", e);
  }
  return null;
};

const deleteFromCloudinary = async (url: string, type: 'image' | 'video' = 'image') => {
  const publicId = extractPublicId(url);
  if (!publicId) return;
  
  const timestamp = Math.floor(Date.now() / 1000);
  // Default values should be handled safely, we use environment variables
  const secret = import.meta.env.VITE_CLOUDINARY_API_SECRET || 'LzarS09zBKRvsGhph9s4pQbwzEI';
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY || '943986857686586';
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dejx0brol';
  
  if (!secret || !apiKey || !cloudName) return;

  const data = `public_id=${publicId}&timestamp=${timestamp}${secret}`;
  const msgUint8 = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);

  try {
    await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${type}/destroy`, {
      method: 'POST',
      body: formData
    });
  } catch (err) {
    console.error("Cloudinary silme hatası", err);
  }
};

import { isGoogleDriveLink, getDriveThumbnail } from '../../lib/driveUtils';

const AdminMediaManager = ({ collectionName, title }: { collectionName: string, title: string }) => {
  const [media, setMedia] = useState<{id: string, src: string, type: 'image' | 'video'}[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [inputType, setInputType] = useState<'file' | 'link'>('file');
  const [linkValue, setLinkValue] = useState('');
  const [newType, setNewType] = useState<'image' | 'video'>('image');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setMedia(snapshot.docs.map(doc => ({
        id: doc.id,
        src: doc.data().src,
        type: doc.data().type
      })));
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, collectionName);
    });
    return unsub;
  }, [collectionName]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputType === 'file' && !file) return;
    if (inputType === 'link' && !linkValue) return;

    setUploading(true);
    try {
      let finalUrl = '';

      if (inputType === 'file') {
        const formData = new FormData();
        formData.append('file', file!);
        formData.append('upload_preset', 'atlaspos');

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dejx0brol';
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${newType === 'video' ? 'video' : 'image'}/upload`, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (data.secure_url) {
          finalUrl = data.secure_url;
        } else {
          throw new Error(data.error?.message || 'Yükleme hatası');
        }
      } else {
        finalUrl = linkValue;
      }

      if (finalUrl) {
        const mediaId = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substring(2);
        
        // Timeout in case Firestore hangs due to connection/project issues
        const setDocPromise = setDoc(doc(db, collectionName, mediaId), {
          src: finalUrl,
          type: newType,
          createdAt: Date.now()
        });
        
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Veritabanı bağlantısı zaman aşımına uğradı. Lütfen Firestore'un Console'da aktif ve hazır olduğundan emin olun.")), 10000)
        );
        
        await Promise.race([setDocPromise, timeoutPromise]);
        
        setFile(null);
        setLinkValue('');
      }
      setError('');
    } catch (err) {
      console.error(err);
      setError("Hata: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, src: string, type: 'image' | 'video') => {
    if (!confirm('Emin misiniz?')) return;
    try {
      if (src) {
        await deleteFromCloudinary(src, type);
      }
      await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
      setError("Silme hatası: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white/90">{title} Yönetimi</h2>
      {error && (
        <div className="bg-red-500/20 text-red-500 p-4 rounded-xl border border-red-500/50 mb-6 font-medium">
          {error}
        </div>
      )}
      <form onSubmit={handleAdd} className="bg-white/5 p-4 rounded-xl border border-white/10 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <select 
          value={inputType} 
          onChange={(e) => {
            setInputType(e.target.value as any);
            setFile(null);
            setLinkValue('');
          }}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-brand w-32"
        >
          <option value="file">Dosya</option>
          <option value="link">Link</option>
        </select>

        {inputType === 'file' ? (
          <>
            <input 
              type="file"
              accept={newType === 'video' ? "video/*" : "image/*"}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id={`file-upload-${collectionName}`}
            />
            <label htmlFor={`file-upload-${collectionName}`} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white cursor-pointer hover:bg-white/10 transition-colors flex items-center justify-between min-w-[200px]">
              <span className="truncate">{file ? file.name : "Dosya seçin..."}</span>
              <UploadCloud size={18} className="text-white/50 shrink-0 ml-2" />
            </label>
          </>
        ) : (
          <input 
            type="url"
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            placeholder="Medya bağlantısı (Google Drive vb.)"
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-brand min-w-[200px]"
            required
          />
        )}
        
        <select 
          value={newType} 
          onChange={(e) => {
            setNewType(e.target.value as any);
          }}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-brand"
        >
          <option value="image">Görsel (Image)</option>
          <option value="video">Video</option>
        </select>
        <button 
          type="submit" 
          disabled={(inputType === 'file' && !file) || (inputType === 'link' && !linkValue) || uploading}
          className="bg-brand text-black px-6 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {uploading ? <><Loader2 size={18} className="animate-spin" /> Yükleniyor</> : <><Plus size={18} /> Yükle</>}
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map(item => (
          <div key={item.id} className="relative group bg-black/40 rounded-xl overflow-hidden aspect-square border border-white/10">
            {item.type === 'video' ? (
              isGoogleDriveLink(item.src) ? (
                <img src={getDriveThumbnail(item.src)} className="w-full h-full object-cover opacity-80" />
              ) : (
                <video src={item.src} className="w-full h-full object-cover opacity-80" muted />
              )
            ) : (
              <img src={item.src} className="w-full h-full object-cover opacity-80" />
            )}
            <div className="absolute top-2 left-2 bg-black/60 p-1.5 rounded-md backdrop-blur-md">
              {item.type === 'video' ? <VideoIcon size={16} className="text-white" /> : <ImageIcon size={16} className="text-white" />}
            </div>
            <button 
              onClick={() => handleDelete(item.id, item.src, item.type)}
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

const AdminBlogManager = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Genel');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('');
  
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    
    setUploading(true);
    let imageUrl = '';
    
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'atlaspos');
  
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dejx0brol';
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (data.secure_url) {
          imageUrl = data.secure_url;
        } else {
          throw new Error(data.error?.message || 'Resim yükleme hatası');
        }
      }

      const blogId = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substring(2);
      const setDocPromise = setDoc(doc(db, 'blogs', blogId), {
        title, excerpt, content, category, 
        date: date || new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }), 
        author: author || 'Admin',
        image: imageUrl,
        createdAt: Date.now()
      });
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Veritabanı bağlantısı zaman aşımına uğradı (Firestore yanıt vermiyor).")), 10000)
      );
      
      await Promise.race([setDocPromise, timeoutPromise]);
      
      setTitle(''); setExcerpt(''); setContent(''); setCategory('Genel'); setDate(''); setAuthor(''); setFile(null);
      setError('');
    } catch (error) {
      console.error(error);
      setError("Hata oluştu: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageSrc?: string) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return;
    try {
      if (imageSrc) {
        await deleteFromCloudinary(imageSrc, 'image');
      }
      await deleteDoc(doc(db, 'blogs', id));
    } catch (err) {
      setError("Silme hatası: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white/90">Blog ve Haberler Yönetimi</h2>
      {error && (
        <div className="bg-red-500/20 text-red-500 p-4 rounded-xl border border-red-500/50 mb-6 font-medium">
          {error}
        </div>
      )}
      <form onSubmit={handleAdd} className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8 flex flex-col gap-4">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Başlık"
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
          required
        />
        <input 
          type="text" 
          value={excerpt} 
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Kısa Özet"
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
        />
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)}
          placeholder="İçerik"
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white min-h-[150px]"
          required
        />
        <div className="flex gap-4 flex-col md:flex-row">
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Kategori" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"/>
          <input type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="Tarih (opsiyonel)" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"/>
          <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Yazar (opsiyonel)" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"/>
        </div>
        
        <div className="flex gap-4 items-center mt-2">
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" id="blog-file" />
          <label htmlFor="blog-file" className="cursor-pointer bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2">
            <UploadCloud size={16} /> {file ? file.name : "Kapak Fotoğrafı Seç"}
          </label>
          <button type="submit" disabled={uploading} className="ml-auto bg-brand text-black px-8 py-2 rounded-lg font-bold">
            {uploading ? "Kaydediliyor..." : "Blog Ekle"}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4">
            {blog.image && <img src={blog.image} className="w-20 h-20 object-cover rounded-lg" />}
            <div className="flex-1">
              <h4 className="font-bold">{blog.title}</h4>
              <p className="text-sm text-white/50">{blog.date} - {blog.category}</p>
            </div>
            <button onClick={() => handleDelete(blog.id, blog.image)} className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setLoginError("Giriş başarısız. Bilgiler yanlış veya kullanıcı bulunamadı.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white/50">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand/30 z-[200] relative">
      <nav className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-black tracking-widest text-brand"><Link to="/admin">ADMIN PANELİ</Link></div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-white/50 hover:text-white">Siteye Dön</Link>
          {isLoggedIn && (
            <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 flex items-center gap-2">
              <LogOut size={16} /> Çıkış Yap
            </button>
          )}
        </div>
      </nav>

      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="max-w-md mx-auto mt-32 p-8 glass rounded-2xl border border-white/5 text-center">
          <h2 className="text-2xl font-bold mb-2">Admin Girişi</h2>
          <p className="text-white/50 mb-8 text-sm">Yalnızca yetkili hesaplar erişebilir.</p>
          
          <div className="flex flex-col gap-4 mb-6">
            <input 
              type="email" 
              placeholder="E-posta" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
      ) : (
        <div className="max-w-7xl mx-auto flex">
          <aside className="w-64 border-r border-white/10 min-h-[calc(100vh-73px)] p-6 hidden md:block">
            <ul className="space-y-4">
              <li>
                <Link to="/admin" className="text-white/70 hover:text-white font-medium flex items-center gap-3">
                  <ImageIcon size={18} /> Galeri Yönetimi
                </Link>
              </li>
              <li>
                <Link to="/admin/blog" className="text-white/70 hover:text-white font-medium flex items-center gap-3">
                  <FileText size={18} /> Blog Yönetimi
                </Link>
              </li>
            </ul>
          </aside>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<AdminMediaManager collectionName="media" title="Galeri" />} />
              <Route path="/blog" element={<AdminBlogManager />} />
            </Routes>
          </main>
        </div>
      )}
    </div>
  );
};

