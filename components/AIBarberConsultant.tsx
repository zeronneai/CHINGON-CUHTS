
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

export const AIBarberConsultant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setError(null);
    setIsCameraOpen(true);
    setCapturedImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("No pudimos acceder a tu cámara, carnal. Revisa los permisos.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const handleConsult = async () => {
    setLoading(true);
    setResponse('');
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let contents: any;

      if (capturedImage) {
        const base64Data = capturedImage.split(',')[1];
        contents = {
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Data
              }
            },
            {
              text: `Analiza mi rostro en esta foto. ${prompt ? `Además, considera esto: ${prompt}` : ''}`
            }
          ]
        };
      } else {
        if (!prompt.trim()) {
          setError("Escribe algo o tómate una foto para que El Chingón te asesore.");
          setLoading(false);
          return;
        }
        contents = `Un cliente te pregunta: "${prompt}".`;
      }

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: `Eres "El Chingón", barbero experto y consultor de estilo de Chingon Cuts Barber Shop en Socorro, Texas. Hablas con un tono confiado, amigable y callejero (street-smart), como un compa que sabe lo que hace.

Si el usuario comparte una foto, DEBES:
1. Identificar su forma de cara (oval, round, square, rectangle, diamond, or heart).
2. Analizar su textura de cabello, grosor y longitud actual.
3. Recomendar 2-3 estilos específicos que le queden mejor.

FORMATO DE RESPUESTA:
👤 Face Shape: [forma detectada]
✂️ Recommended Cuts:
1. [Nombre del corte] — [explicación de por qué funciona]
2. [Nombre del corte] — [explicación]
3. [Nombre del corte] — [explicación]
💬 What to tell your barber: "[palabras exactas para pedirlo]"

Mantén la respuesta bajo 200 palabras. Sé hype pero útil. Usa Spanglish ocasionalmente.`
        }
      });
      
      setResponse(result.text || 'Ocurrió un error al obtener la recomendación.');
    } catch (err) {
      console.error(err);
      setError('Lo siento carnal, el sistema está saturado o hubo un error. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="max-w-[900px] mx-auto px-4">
      <div className="bg-card neon-border rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.12] z-0" 
          style={{ 
            backgroundImage: 'url("https://res.cloudinary.com/dsprn0ew4/image/upload/v1769021256/IMG_2960_iwqapo.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80 pointer-events-none z-[1]" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-neon/20 grid place-items-center backdrop-blur-sm border border-neon/20">
              <svg className="w-6 h-6 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-3xl text-white uppercase tracking-wider">AI Style Advisor</h2>
              <p className="text-muted text-sm">Tómate una foto y deja que El Chingón te diga qué te queda mejor.</p>
            </div>
          </div>

          <div className="space-y-6">
            {!isCameraOpen && !capturedImage && (
              <div className="flex flex-col gap-4">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ej: Quiero algo fresco pero formal..."
                  className="w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white placeholder:text-muted2 focus:border-neon/50 focus:ring-1 focus:ring-neon/50 outline-none transition-all resize-none h-24"
                />
                <button 
                  onClick={startCamera}
                  className="w-full border border-neon/30 bg-neon/5 text-neon font-bold py-4 rounded-xl hover:bg-neon/10 transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                  USAR CÁMARA
                </button>
              </div>
            )}

            {isCameraOpen && (
              <div className="relative rounded-2xl overflow-hidden border border-neon/30 bg-black aspect-square max-w-sm mx-auto">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 px-4">
                  <button 
                    onClick={stopCamera}
                    className="bg-red-500/80 text-white p-3 rounded-full hover:bg-red-600 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button 
                    onClick={capturePhoto}
                    className="bg-neon text-black p-4 rounded-full hover:scale-110 transition-all shadow-lg"
                  >
                    <div className="w-6 h-6 border-4 border-black rounded-full"></div>
                  </button>
                </div>
              </div>
            )}

            {capturedImage && (
              <div className="relative rounded-2xl overflow-hidden border border-neon/50 max-w-sm mx-auto group">
                <img src={capturedImage} alt="Captured" className="w-full h-auto" />
                <button 
                  onClick={() => setCapturedImage(null)}
                  className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
            
            <button 
              onClick={handleConsult}
              disabled={loading || isCameraOpen}
              className="w-full bg-neon text-black font-black px-12 py-4 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(57,255,20,0.2)]"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              ) : 'OBTENER CONSEJO'}
            </button>

            {error && (
              <p className="text-red-400 text-sm font-medium text-center">{error}</p>
            )}

            {response && (
              <div className="mt-8 p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-neon/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-neon text-xs font-bold uppercase tracking-widest mb-3">EL CHINGÓN DICE:</p>
                <div className="text-white leading-relaxed text-lg whitespace-pre-line font-medium">
                  {response}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
