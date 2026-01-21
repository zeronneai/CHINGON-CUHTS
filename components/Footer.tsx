
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bg border-t border-white/5 pt-20 pb-10 px-4">
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
             <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-neon/10 border border-neon/30 grid place-items-center">
                <svg className="w-5 h-5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m0-14l4.121 4.121" />
                </svg>
              </div>
              <span className="font-display text-2xl uppercase tracking-wider">CHINGON CUHTS</span>
            </div>
            <p className="text-muted leading-relaxed max-w-sm">
              La barbería más perrona de El Paso, TX. Donde el estilo se encuentra con la precisión.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg mb-6 uppercase tracking-widest">Contacto</h4>
            <ul className="space-y-3 text-muted">
              <li>EL Paso, Texas 79927</li>
              <li className="text-white font-bold">(915) 555-0123</li>
              <li>info@chingoncuhts.com</li>
            </ul>
            <div className="flex gap-4 mt-8">
             <div className="flex gap-4 mt-8">
  {/* INSTAGRAM */}
  <a 
    href="https://www.instagram.com/chingoncuhts" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-neon hover:text-black transition-colors cursor-pointer"
  >
    <span className="text-[10px] font-bold">IG</span>
  </a>

  {/* FACEBOOK */}
  <a 
    href="https://www.facebook.com/chingoncuhts" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-neon hover:text-black transition-colors cursor-pointer"
  >
    <span className="text-[10px] font-bold">FB</span>
  </a>

  {/* WHATSAPP */}
  <a 
    href="https://wa.me/19155550123?text=Hola,%20quisiera%20agendar%20una%20cita%20en%20Chingon%20Cuhts" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-neon hover:text-black transition-colors cursor-pointer"
  >
    <span className="text-[10px] font-bold">WPP</span>
  </a>
</div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 text-center text-muted2 text-xs">
          <p>© 2026 CHINGON CUHT'S BARBER SHOP. ALL RIGHTS RESERVED. BEYOND CLEAN.</p>
        </div>
      </div>
    </footer>
  );
};
