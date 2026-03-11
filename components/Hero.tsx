import React from 'react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const handleViewWorks = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="max-w-[1180px] mx-auto relative z-10">
        <div className="max-w-2xl flex flex-col items-center text-center sm:items-start sm:text-left mx-auto sm:mx-0">
          <div className="mb-4">
            <h1 className="font-display text-6xl md:text-8xl text-white uppercase italic tracking-tighter leading-none">
              OPEN <span className="text-neon">7</span> DAYS
            </h1>
          </div>
          
          <img 
            className="hero-logo mb-8 h-auto w-full max-w-[280px] md:max-w-[360px] lg:max-w-[460px]" 
            src="https://i.imgur.com/xwNC6AC.png" 
            alt="CHINGON CUHTS logo" 
          />
          
          <p className="text-muted text-lg md:text-xl max-w-lg mb-12">
            Elevando el estándar en Socorro. Fades limpios, tapers precisos y diseño de barba con la mejor vibra de Texas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start w-full sm:w-auto">
            <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
              <button 
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-neon text-black font-black text-lg px-10 py-5 rounded-2xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(57,255,20,0.2)]"
              >
                RESERVAR AHORA
              </button>
              <p className="text-white text-sm mt-3 font-semibold tracking-wide sm:ml-2">
                (Tambien acude sin cita) 👀
              </p>
            </div>
            <button 
              onClick={handleViewWorks}
              className="w-full sm:w-auto border border-white/10 bg-white/5 backdrop-blur-md font-bold text-lg px-10 py-5 rounded-2xl hover:bg-white/10 transition-all"
            >
              VER TRABAJOS
            </button>
          </div>
        </div>
      </div>

      {/* Background Graphic elements */}
      <div className="absolute inset-0 lg:left-1/2 lg:w-1/2 h-full pointer-events-none overflow-hidden">
        <div className="relative w-full h-full">
          <video 
            src="https://res.cloudinary.com/dsprn0ew4/video/upload/v1773251093/chingoncuhts_zs3k7x.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-50 lg:opacity-70 lg:rounded-l-[100px] lg:border-l lg:border-y lg:border-white/10"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/40 to-transparent lg:hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/20 to-transparent hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};