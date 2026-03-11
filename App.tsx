import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { BookingFlow } from './components/BookingFlow';

const App: React.FC = () => {
  const [bookingState, setBookingState] = useState<{ isOpen: boolean; service: string | null }>({
    isOpen: false,
    service: null,
  });

  const openBooking = (service: string | null = null) => {
    setBookingState({ isOpen: true, service });
  };

  const closeBooking = () => {
    setBookingState({ isOpen: false, service: null });
  };

  return (
    <div className="min-h-screen selection:bg-neon selection:text-black">
      <Navbar onOpenBooking={() => openBooking()} />
      
      <main>
        <Hero onOpenBooking={() => openBooking()} />
        
        <section id="services" className="py-24">
          <Services onSelectService={(serviceName) => openBooking(serviceName)} />
        </section>

        <section id="portfolio" className="py-24">
          <Gallery />
        </section>

        <section id="giftcard" className="py-24 bg-bg2/30">
          <div className="max-w-[1180px] mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-8">
                <div>
                  <h2 className="font-display text-5xl md:text-6xl uppercase tracking-widest text-white mb-4">Gift a Fresh Cut</h2>
                  <p className="text-muted text-xl">Perfect for birthdays, holidays, and special occasions.</p>
                </div>
                
                <div className="space-y-4 bg-card/50 p-8 rounded-[32px] neon-border">
                  <p className="text-xl md:text-2xl text-white font-medium">🔥 Fresh Cut Gift Card — $25</p>
                  <p className="text-xl md:text-2xl text-white font-medium">💈 Cut + Beard Gift Card — $40</p>
                  <p className="text-xl md:text-2xl text-white font-medium italic">👑 VIP CHINGON Package — $60 <span className="text-xs text-muted block md:inline md:ml-2">(corte + barba + ceja + toalla/caliente)</span></p>
                </div>

                <button className="bg-neon text-black font-black text-xl px-12 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_rgba(57,255,20,0.3)]">
                  BUY GIFT CARD
                </button>
              </div>

              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-neon/20 blur-[60px] group-hover:bg-neon/30 transition-all"></div>
                  <img 
                    src="https://res.cloudinary.com/dsprn0ew4/image/upload/v1769022737/ChatGPT_Image_Jan_21_2026_01_07_25_PM_btggux.png" 
                    alt="Chingon Cuhts Gift Card" 
                    className="relative z-10 w-full h-auto rounded-[40px] shadow-2xl border border-white/10 group-hover:rotate-2 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl mb-8 uppercase tracking-widest text-neon">Ubicación</h2>
            <div className="rounded-[28px] overflow-hidden neon-border bg-card p-8 shadow-2xl">
              <p className="text-2xl font-bold mb-4">Socorro, Texas</p>
              <p className="text-muted text-lg mb-8">El mejor servicio de barbería en el área. Elevando el estilo de nuestra comunidad.</p>
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 shadow-inner">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3395.6259797792336!2d-106.283705!3d31.67145099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e74376b8ff7fcd%3A0xd546f1d6ffe99092!2sChingon%20Cuh&#39;ts%20Barber%20Shop!5e0!3m2!1ses-419!2smx!4v1773251881259!5m2!1ses-419!2smx" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Chingon Cuhts Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {bookingState.isOpen && (
        <BookingFlow 
          initialService={bookingState.service} 
          onClose={closeBooking} 
        />
      )}
    </div>
  );
};

export default App;