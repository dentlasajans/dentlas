export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-dark">
      <div 
        className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[40vw] md:h-[40vw] rounded-full bg-brand/10 blur-[60px] md:blur-[100px]"
      />
      
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] hidden md:block md:w-[50vw] md:h-[50vw] rounded-full bg-purple-900/10 blur-[80px] md:blur-[120px]"
      />

      {/* Şeffaf Firma Logosu */}
      <img 
        src="https://res.cloudinary.com/dejx0brol/image/upload/v1777703150/Ba%C5%9Fl%C4%B1ks%C4%B1z-1_azwxju.png" 
        alt="" 
        className="absolute -bottom-10 right-0 md:right-2 w-[50vw] md:w-[25vw] max-w-xl opacity-[0.03] pointer-events-none" 
        loading="lazy"
        decoding="async"
      />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
    </div>
  );
};
