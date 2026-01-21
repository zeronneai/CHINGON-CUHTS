
import React from 'react';

const IMAGES = [
  'https://res.cloudinary.com/dsprn0ew4/image/upload/v1769019942/IMG_2957_rf6fg2.jpg',
  'https://res.cloudinary.com/dsprn0ew4/image/upload/v1769019942/IMG_2951_acmuu2.jpg',
  'https://res.cloudinary.com/dsprn0ew4/image/upload/v1769019942/IMG_2956_dm7swl.jpg',
  'https://res.cloudinary.com/dsprn0ew4/image/upload/v1769019941/IMG_2955_xw5xgd.jpg',
  'https://res.cloudinary.com/dsprn0ew4/image/upload/v1769019941/IMG_2958_hqqui7.jpg',
  'https://res.cloudinary.com/dsprn0ew4/image/upload/v1769020133/IMG_2959_wc9t24.jpg',
];

export const Gallery: React.FC = () => {
  return (
    <div className="max-w-[1180px] mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-display text-5xl md:text-6xl uppercase tracking-widest text-white mb-4">Portafolio</h2>
        <div className="w-24 h-1 bg-neon mx-auto"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {IMAGES.map((img, i) => (
          <div key={i} className="group relative aspect-square rounded-[32px] overflow-hidden neon-border shadow-lg cursor-pointer">
            <img 
              src={img} 
              alt={`Corte ${i + 1}`} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="font-display text-neon text-xl tracking-widest">FRESH CUHT #{i + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
