
import React from 'react';

const SERVICE_LIST = [
  { name: 'CHINGON CUT', price: '$35', desc: 'Fades, tapers o cualquier estilo moderno. Incluye lavado y peinado.' },
  { name: 'BEARD DESIGN', price: '$20', desc: 'Perfilado de barba con navaja y toalla caliente para un acabado premium.' },
  { name: 'KIDS CUT', price: '$25', desc: 'Cortes con paciencia y estilo para los más pequeños de la casa.' },
  { name: 'PREMIUM SERVICE', price: '$50', desc: 'Corte completo + Barba + Masaje capilar + Toalla caliente.' },
];

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <div className="max-w-[1180px] mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left mb-16 gap-6">
        <div className="mx-auto md:mx-0">
          <h2 className="font-display text-5xl md:text-6xl uppercase tracking-widest text-white mb-2">Servicios</h2>
          <p className="text-muted">Calidad inigualable en cada corte.</p>
        </div>
        <div className="text-center md:text-right">
          <span className="font-display text-neon text-2xl">LISTA DE PRECIOS 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICE_LIST.map((service, idx) => (
          <div 
            key={idx} 
            className="group relative bg-card border border-white/5 p-8 rounded-[28px] hover:border-neon/30 transition-all hover:-translate-y-2 overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
               <svg className="w-20 h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m0-14l4.121 4.121" />
              </svg>
            </div>
            
            <h3 className="font-display text-2xl mb-2 text-white">{service.name}</h3>
            <p className="text-neon text-3xl font-bold mb-6">{service.price}</p>
            <p className="text-muted text-sm leading-relaxed">{service.desc}</p>
            
            <div className="mt-8">
              <button 
                onClick={() => onSelectService(service.name)}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-neon group-hover:text-black transition-all font-bold text-xs uppercase tracking-widest"
              >
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
