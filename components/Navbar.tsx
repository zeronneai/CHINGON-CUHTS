import React from 'react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-bg/55 border-b border-white/5 px-4 lg:px-0">
      <div className="max-w-[1180px] mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-neon/30 overflow-hidden grid place-items-center">
            <div className="absolute inset-[-40%] bg-[conic-gradient(from_190deg,transparent,rgba(57,255,20,0.35),transparent_35%)] animate-spin-slow"></div>
            <svg className="relative z-10 w-6 h-6 text-neon drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m0-14l4.121 4.121" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="font-display text-lg uppercase tracking-wider block">CHINGON CUHTS</span>
            <span className="text-[10px] text-muted uppercase tracking-[0.2em]">El Paso, TX</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted">
          <a href="#services" onClick={scrollTo('services')} className="hover:text-white transition-colors">Servicios</a>
          <a href="#ai-advisor" onClick={scrollTo('ai-advisor')} className="hover:text-white transition-colors">AI Barber</a>
          <a href="#portfolio" onClick={scrollTo('portfolio')} className="hover:text-white transition-colors">Galería</a>
          <a 
            href="#giftcard" 
            onClick={scrollTo('giftcard')}
            className="text-neon animate-pulse-gift hover:brightness-125 transition-all"
          >
            GIFT CARD
          </a>
          <a href="#location" onClick={scrollTo('location')} className="hover:text-white transition-colors">Ubicación</a>
        </div>

        <button 
          onClick={onOpenBooking}
          className="bg-neon text-black font-bold px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
        >
          RESERVAR
        </button>
      </div>
    </nav>
  );
};
