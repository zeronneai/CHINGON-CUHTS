
import React, { useState, useEffect } from 'react';

interface BookingFlowProps {
  initialService: string | null;
  onClose: () => void;
}

const SERVICES = [
  { name: 'CHINGON CUT', price: '$35' },
  { name: 'BEARD DESIGN', price: '$20' },
  { name: 'KIDS CUT', price: '$25' },
  { name: 'PREMIUM SERVICE', price: '$50' },
];

const BARBERS = [
  { id: 'nando', name: 'NANDO', role: 'Master Barber', img: 'https://picsum.photos/seed/nando/100/100' },
  { id: 'memo', name: 'MEMO', role: 'Fade Specialist', img: 'https://picsum.photos/seed/memo/100/100' },
  { id: 'chino', name: 'CHINO', role: 'Style King', img: 'https://picsum.photos/seed/chino/100/100' },
];

const TIMES = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

export const BookingFlow: React.FC<BookingFlowProps> = ({ initialService, onClose }) => {
  // If we have an initial service, start at Step 1 (Barber). Otherwise Step 0 (Service).
  const [step, setStep] = useState(initialService ? 1 : 0);
  const [selectedService, setSelectedService] = useState<string | null>(initialService);
  const [barber, setBarber] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Sync state if initialService changes while component is mounted (though App usually unmounts/remounts)
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
      setStep(1);
    }
  }, [initialService]);

  const handleFinish = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      onClose();
    }, 4500);
  };

  const isReady = barber && date && time;

  if (isConfirmed) {
    return (
      <div className="fixed inset-0 z-[100] bg-bg flex items-center justify-center p-4">
        <div className="text-center animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-neon rounded-full mx-auto mb-8 grid place-items-center shadow-[0_0_50px_rgba(57,255,20,0.6)]">
            <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-white uppercase italic tracking-tighter leading-none mb-4">
            ¡LISTO!
          </h2>
          <h3 className="font-display text-4xl md:text-6xl text-neon uppercase tracking-widest animate-pulse">
            TE ESPERAMOS CHINGÓN
          </h3>
          <p className="mt-8 text-muted uppercase tracking-[0.3em] text-sm">Cita confirmada para {selectedService}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-2xl rounded-[40px] border border-white/10 shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-muted hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 md:p-12">
          <div className="mb-8">
            <span className="text-neon font-display tracking-widest text-sm uppercase">Booking Process</span>
            <h2 className="text-4xl font-display text-white uppercase italic tracking-wider">
              {step === 0 ? "Elegir Servicio" : selectedService}
            </h2>
          </div>

          {/* Stepper Header */}
          <div className="flex gap-4 mb-10">
            <div className={`flex-1 h-1 rounded-full transition-colors ${step >= 0 ? 'bg-neon shadow-[0_0_10px_rgba(57,255,20,0.5)]' : 'bg-white/10'}`}></div>
            <div className={`flex-1 h-1 rounded-full transition-colors ${step >= 1 ? 'bg-neon shadow-[0_0_10px_rgba(57,255,20,0.5)]' : 'bg-white/10'}`}></div>
            <div className={`flex-1 h-1 rounded-full transition-colors ${step >= 2 ? 'bg-neon shadow-[0_0_10px_rgba(57,255,20,0.5)]' : 'bg-white/10'}`}></div>
          </div>

          {/* Step 0: Service Selection */}
          {step === 0 && (
            <div className="animate-in slide-in-from-right-8 fade-in duration-500">
              <h3 className="text-xl font-display text-white mb-6 tracking-widest uppercase">0. SELECCIONA TU CORTE</h3>
              <div className="grid grid-cols-1 gap-3">
                {SERVICES.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => { setSelectedService(s.name); setStep(1); }}
                    className="flex justify-between items-center p-6 rounded-2xl border border-white/5 bg-white/5 hover:border-neon/30 hover:bg-neon/5 transition-all text-left"
                  >
                    <span className="font-display text-white tracking-wider">{s.name}</span>
                    <span className="text-neon font-bold">{s.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Barber Selection */}
          {step === 1 && (
            <div className="animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-display text-white tracking-widest uppercase">1. ELIGE A TU BARBERO</h3>
                {!initialService && (
                   <button onClick={() => setStep(0)} className="text-xs text-muted hover:text-white uppercase font-bold tracking-tighter">← Cambiar Servicio</button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {BARBERS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => { setBarber(b.name); setStep(2); }}
                    className={`group p-6 rounded-3xl border transition-all text-center flex flex-col items-center ${barber === b.name ? 'border-neon bg-neon/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                  >
                    <img src={b.img} alt={b.name} className="w-16 h-16 rounded-full mb-4 grayscale group-hover:grayscale-0 transition-all border border-white/10" />
                    <span className="font-display text-white tracking-widest">{b.name}</span>
                    <span className="text-[10px] text-muted uppercase mt-1">{b.role}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date and Time Selection */}
          {step === 2 && (
            <div className="animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-display text-white tracking-widest uppercase">2. FECHA Y HORA</h3>
                <button onClick={() => setStep(1)} className="text-xs text-muted hover:text-white uppercase font-bold tracking-tighter">← Volver al Barbero</button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <label className="text-xs text-muted uppercase tracking-[0.2em] mb-3 block">Seleccionar Día</label>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {['Hoy', 'Mañana', 'Mier', 'Juev', 'Vier', 'Sab'].map((d) => (
                      <button 
                        key={d}
                        onClick={() => setDate(d)}
                        className={`flex-shrink-0 w-20 h-20 rounded-2xl border flex flex-col items-center justify-center transition-all ${date === d ? 'border-neon bg-neon/10 text-white' : 'border-white/5 bg-white/5 text-muted hover:border-white/20'}`}
                      >
                        <span className="font-display tracking-widest text-sm">{d}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted uppercase tracking-[0.2em] mb-3 block">Seleccionar Hora</label>
                  <div className="grid grid-cols-4 gap-2">
                    {TIMES.map((t) => (
                      <button 
                        key={t}
                        onClick={() => setTime(t)}
                        className={`py-3 rounded-xl border text-xs font-bold transition-all ${time === t ? 'border-neon bg-neon/10 text-white' : 'border-white/5 bg-white/5 text-muted hover:border-white/20'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {isReady && (
                <div className="mt-12 text-center">
                  <button 
                    onClick={handleFinish}
                    className="w-full py-6 rounded-2xl bg-neon text-black font-black text-2xl uppercase tracking-[0.3em] animate-pulse shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    LISTO
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse-neon {
          0%, 100% { box-shadow: 0 0 20px rgba(57,255,20,0.4); }
          50% { box-shadow: 0 0 40px rgba(57,255,20,0.8); }
        }
        .animate-pulse {
          animation: pulse-neon 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
