import { SectionHeading } from '../ui/SectionHeading';

const tools = [
  { name: 'Adobe Photoshop', icon: 'https://cdn.simpleicons.org/adobephotoshop/31A8FF', category: 'Görüntü İşleme' },
  { name: 'Adobe Illustrator', icon: 'https://cdn.simpleicons.org/adobeillustrator/FF9A00', category: 'Vektörel Tasarım' },
  { name: 'After Effects', icon: 'https://cdn.simpleicons.org/adobeaftereffects/9999FF', category: 'Hareketli Grafik & VFX' },
  { name: 'Premiere Pro', icon: 'https://cdn.simpleicons.org/adobepremierepro/EA77FF', category: 'Video Kurgu' },
  { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E', category: 'UI/UX Tasarım' },
  { name: 'Blender', icon: 'https://cdn.simpleicons.org/blender/F5792A', category: '3D Modelleme' },
];

const ToolCard = ({ tool }: { tool: any }) => (
  <div 
    className="p-6 md:p-8 glass rounded-2xl border border-white/5 hover:border-brand/50 transition-all group flex flex-col items-center text-center gap-4 hover:-translate-y-2 cursor-default"
  >
    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
      <img src={tool.icon} alt={tool.name} className="w-10 h-10 opacity-80 group-hover:opacity-100 transition-opacity" />
    </div>
    <div>
      <h3 className="font-bold text-lg text-white mb-1 group-hover:text-brand transition-colors">{tool.name}</h3>
      <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{tool.category}</p>
    </div>
  </div>
);

export const TasarimAraclari = () => {
  return (
    <section id="araçlar" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionHeading subtitle="TEKNOLOJİ">Tasarım Araçları.</SectionHeading>
          </div>
          <p className="text-white/60 max-w-sm md:text-right font-light text-sm">
            Projelerimizde en iyi sonuçları elde etmek için endüstri standardı profesyonel yazılımlar kullanıyoruz.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};
