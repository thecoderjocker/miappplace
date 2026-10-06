import React, { useState } from 'react';
import {
  X,
  Navigation,
  Car,
  Footprints,
  Train,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';
import { Boutique } from '../types/boutique';

interface DirectionsModalProps {
  boutique: Boutique | null;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  boutique,
  onClose
}) => {
  const [transitMode, setTransitMode] = useState<'car' | 'walk' | 'vip'>('car');
  const [valetRequested, setValetRequested] = useState(false);

  if (!boutique) return null;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${boutique.name} ${boutique.address}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#18181b] border border-white/10 rounded-3xl shadow-2xl p-5 sm:p-6 my-auto text-[#e5e1e4]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-[#4edea3]/20 border border-[#4edea3]/30 flex items-center justify-center text-[#4edea3]">
            <Navigation className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Ruta Express &amp; Acceso a la Boutique
            </h2>
            <p className="text-xs text-zinc-400">
              Navegación en tiempo real y servicios de llegada
            </p>
          </div>
        </div>

        {/* Origin & Destination Card */}
        <div className="p-3.5 rounded-2xl bg-[#201f21] border border-white/5 space-y-3 mb-4 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] mt-1 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400">
                Punto de partida
              </span>
              <p className="font-semibold text-white">Tu ubicación actual (GPS)</p>
            </div>
          </div>

          <div className="border-l-2 border-dashed border-white/10 ml-1.5 pl-3 py-0.5" />

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#c0c1ff] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#c0c1ff]">
                Destino
              </span>
              <p className="font-bold text-white text-sm">{boutique.name}</p>
              <p className="text-zinc-400 text-[11px]">{boutique.address}</p>
            </div>
          </div>
        </div>

        {/* Transit Mode Selector */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            onClick={() => setTransitMode('car')}
            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              transitMode === 'car'
                ? 'bg-[#c0c1ff]/15 border-[#c0c1ff] text-[#c0c1ff]'
                : 'bg-[#201f21] border-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Car className="w-4 h-4" />
            <span className="text-xs font-bold">En Coche</span>
            <span className="text-[10px] text-zinc-400">~12 min</span>
          </button>

          <button
            onClick={() => setTransitMode('walk')}
            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              transitMode === 'walk'
                ? 'bg-[#c0c1ff]/15 border-[#c0c1ff] text-[#c0c1ff]'
                : 'bg-[#201f21] border-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Footprints className="w-4 h-4" />
            <span className="text-xs font-bold">A Pie</span>
            <span className="text-[10px] text-zinc-400">~18 min</span>
          </button>

          <button
            onClick={() => setTransitMode('vip')}
            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              transitMode === 'vip'
                ? 'bg-[#c0c1ff]/15 border-[#c0c1ff] text-[#c0c1ff]'
                : 'bg-[#201f21] border-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold">Chauffeur</span>
            <span className="text-[10px] text-zinc-400">Prioritario</span>
          </button>
        </div>

        {/* Steps Preview */}
        <div className="p-3.5 rounded-2xl bg-[#201f21] border border-white/5 space-y-2 mb-4 text-xs">
          <div className="flex items-center justify-between text-zinc-400 pb-1 border-b border-white/5">
            <span className="font-semibold">Itinerario Sugerido</span>
            <span className="text-emerald-400 font-bold">
              Distancia aprox. {boutique.distanceKm} km
            </span>
          </div>

          <div className="space-y-2 pt-1 text-[11px] text-zinc-300">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                1
              </span>
              <span>
                Tomar avenida principal hacia el distrito comercial de {boutique.city}.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                2
              </span>
              <span>
                Acceder por el pórtico frontal exclusivo en {boutique.address}.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-[#34d399] flex items-center justify-center text-[10px] font-bold shrink-0">
                3
              </span>
              <span>
                Recepción por concierge y servicio de valet parking privado en puerta.
              </span>
            </div>
          </div>
        </div>

        {/* Valet button toggle */}
        <div className="mb-4">
          <button
            onClick={() => setValetRequested(!valetRequested)}
            className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              valetRequested
                ? 'bg-[#064e3b]/80 border-[#059669] text-[#34d399]'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
            }`}
          >
            {valetRequested ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#34d399]" />
                <span>Valet Parking Notificado para tu llegada</span>
              </>
            ) : (
              <>
                <Car className="w-3.5 h-3.5 text-[#c0c1ff]" />
                <span>Avisar a Valet Parking de llegada estimada</span>
              </>
            )}
          </button>
        </div>

        {/* External Map Action */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl bg-[#c0c1ff] hover:bg-[#8083ff] text-[#0d0096] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Abrir Navegación en Google Maps</span>
        </a>
      </div>
    </div>
  );
};
