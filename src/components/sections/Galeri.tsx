import { motion } from 'motion/react';

const GalleryItem = ({ image, delay, size = 'small' }: { image: string, delay: number, size?: 'small'|'large'|'tall'|'wide' }) => {
  let cssClass = "";
  if (size === 'large') cssClass = "md:col-span-2 md:row-span-2";
  else if (size === 'tall') cssClass = "md:row-span-2";
  else if (size === 'wide') cssClass = "md:col-span-2";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${cssClass}`}
    >
      <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay" />
      <img src={image} alt="Gallery item" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 min-h-[250px]" />
    </div>
  );
};

export const Galeri = () => {
  return (
    <section id="galeri" className="py-32 px-6 bg-brand/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-brand text-xs uppercase tracking-[0.3em] font-bold mb-4">
              STÜDYO & GALERİ
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Kamera Arkası.
            </h2>
          </div>
          <button className="border border-white/10 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
            TÜMÜNÜ GÖR
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px]">
          <GalleryItem image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" delay={0.0} size="large" />
          <GalleryItem image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" delay={0.1} />
          <GalleryItem image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" delay={0.2} />
          <GalleryItem image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" delay={0.3} size="wide" />
          <GalleryItem image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600" delay={0.4} />
        </div>
      </div>
    </section>
  );
};
