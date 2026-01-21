
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

export const AIBarberConsultant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConsult = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResponse('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Eres un barbero experto de "CHINGON CUHT'S". Un cliente te pregunta: "${prompt}". 
        Responde con consejos de estilo profesionales, amigables y con mucha personalidad texana/barber shop. 
        Mantén la respuesta concisa y sugiere 2 tipos de cortes específicos que hacemos (Fades, Tapers, Mullets modernos, Pompadours).`,
        config: {
            systemInstruction: "Eres el consultor de imagen de CHINGON CUHTS. Tu tono es profesional pero urbano, usas Spanglish ocasionalmente como se hace en Socorro, TX."
        }
      });
      
      setResponse(result.text || 'Ocurrió un error al obtener la recomendación.');
    } catch (error) {
      console.error(error);
      setResponse('Lo siento carnal, el sistema está saturado. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto px-4">
      <div className="bg-card neon-border rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Background Image Layer with requested specs */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.12] z-0" 
          style={{ 
            backgroundImage: 'url("https://res.cloudinary.com/dsprn0ew4/image/upload/v1769021256/IMG_2960_iwqapo.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark Overlay Gradient to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80 pointer-events-none z-[1]" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-neon/20 grid place-items-center backdrop-blur-sm border border-neon/20">
              <svg className="w-6 h-6 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-3xl text-white uppercase tracking-wider">AI Style Advisor</h2>
              <p className="text-muted text-sm">¿No sabes qué corte te queda mejor? Pregúntale a nuestra IA.</p>
            </div>
          </div>

          <div className="space-y-6">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ej: Tengo cara redonda y quiero algo fresco pero formal..."
              className="w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white placeholder:text-muted2 focus:border-neon/50 focus:ring-1 focus:ring-neon/50 outline-none transition-all resize-none h-32"
            />
            
            <button 
              onClick={handleConsult}
              disabled={loading}
              className="w-full md:w-auto bg-neon text-black font-black px-12 py-4 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(57,255,20,0.2)]"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              ) : 'OBTENER CONSEJO'}
            </button>

            {response && (
              <div className="mt-8 p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-neon/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-neon text-xs font-bold uppercase tracking-widest mb-3">RECOMENDACIÓN CHINGONA:</p>
                <p className="text-white leading-relaxed text-lg whitespace-pre-line">{response}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
