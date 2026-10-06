import React, { useState } from 'react';
import { X, Navigation, MapPin, Compass, Store, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Boutique } from '../types/boutique';

interface InteractiveMapProps {
  boutiques: Boutique[];
  onClose?: () => void;
  onSelectBoutique: (boutique: Boutique) => void;
  onRequestDirections: (boutique: Boutique) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  boutiques,
  onClose,
  onSelectBoutique,
  onRequestDirections
}) => {
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState<string>(
    boutiques[0]?.id || 'chic-boutique'
  );
  const [userLocated, setUserLocated] = useState(false);

  const activeBoutique =
    boutiques.find((b) => b.id === selectedBoutiqueId) || boutiques[0];

  const handleLocateMe = () => {
    setUserLocated(true);
    // Select closest boutique
    const closest = boutiques.reduce((prev, curr) =>
      curr.distanceKm < prev.distanceKm ? curr : prev
    );
    setSelectedBoutiqueId(closest.id);
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden bg-[#201f21] p-3 sm:p-5 md:p-6 shadow-2xl border border-white/5 transition-all">
      {/* Map Header matching the HTML snippet */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/5 mb-3 sm:mb-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-[#4edea3] animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#e5e1e4] tracking-tight">
              Geolocalización de Boutiques &amp; Sucursales
            </h2>
            <p className="text-xs text-[#c7c4d7] hidden sm:block">
              Red satelital en tiempo real con afluencia y distancias de acceso express
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLocateMe}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              userLocated
                ? 'bg-[#064e3b]/80 border-[#059669]/60 text-[#34d399]'
                : 'bg-[#2a2a2c] hover:bg-[#353437] text-zinc-200 border-white/10'
            }`}
            title="Calcular distancia desde mi posición"
          >
            <Compass className="w-3.5 h-3.5 text-[#4edea3]" />
            <span className="hidden sm:inline">Mi Ubicación</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#2a2a2c] text-[#c7c4d7] hover:text-[#e5e1e4] hover:bg-[#353437] transition-colors cursor-pointer"
              title="Cerrar vista de mapa"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Map Interactive Viewport */}
      <div
        className="w-full h-[450px] sm:h-[500px] lg:h-[540px] rounded-2xl bg-cover bg-center relative overflow-hidden shadow-inner flex flex-col justify-between p-3 sm:p-5 border border-white/10"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(19, 19, 21, 0.45), rgba(19, 19, 21, 0.75)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBOxbx5K-FKZo3dQnm_5HApPmJ4zLnMNRKHa56r2kJFD5lyR9PeWfp7R-KpQBXmvjNsr1x4BVrGrywXoexA_mV7hiqxWzJ2LyvrS2LIHJAAjqiDvOjDlwmA2RTMJAIrV_1MWwXoW2DhztHUKfSjDb0fC7B_GALDAwEsTsf9PzSOHPXahxzHu1VjQLnc5Lt7p4KsvUvTqwg7h-ONM1MgifVsjuZlFMMMGLJdYbmm9HoQGXTP7opNyCQyTA')`,
        }}
      >
        {/* Architectural Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top Floating Mini-Bar of Quick City Switchers */}
        <div className="relative z-10 flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
          {boutiques.map((b) => {
            const isSelected = b.id === selectedBoutiqueId;
            return (
              <button
                key={b.id}
                onClick={() => setSelectedBoutiqueId(b.id)}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold transition-all backdrop-blur-md cursor-pointer ${
                  isSelected
                    ? 'bg-[#c0c1ff] text-[#0d0096] shadow-[0_0_12px_rgba(192,193,255,0.4)] font-bold'
                    : 'bg-black/50 text-zinc-300 hover:bg-black/70 hover:text-white border border-white/10'
                }`}
              >
                {b.city} • {b.name}
              </button>
            );
          })}
        </div>

        {/* Interactive Pins Scattered on Map Canvas */}
        <div className="absolute inset-0 pointer-events-none">
          {boutiques.map((b) => {
            const isSelected = b.id === selectedBoutiqueId;
            return (
              <div
                key={b.id}
                style={{
                  left: `${b.coordinates.mapX}%`,
                  top: `${b.coordinates.mapY}%`,
                }}
                className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20"
              >
                <button
                  onClick={() => setSelectedBoutiqueId(b.id)}
                  className={`group relative flex flex-col items-center cursor-pointer transition-transform duration-200 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                  }`}
                >
                  {/* Glowing halo when selected */}
                  {isSelected && (
                    <span className="absolute -inset-2 rounded-full bg-[#c0c1ff]/30 animate-ping pointer-events-none" />
                  )}

                  <div
                    className={`p-2 rounded-2xl flex items-center justify-center border shadow-2xl transition-all ${
                      isSelected
                        ? 'bg-[#c0c1ff] text-[#0d0096] border-white shadow-[0_0_24px_rgba(192,193,255,0.6)]'
                        : 'bg-[#18181b]/90 text-white border-white/20 hover:border-white/40'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                  </div>

                  {/* Micro label */}
                  <div
                    className={`mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-tight whitespace-nowrap shadow-lg backdrop-blur-md transition-all ${
                      isSelected
                        ? 'bg-[#131315] text-[#c0c1ff] border border-[#c0c1ff]/50'
                        : 'bg-black/75 text-zinc-200 border border-white/10 opacity-80 group-hover:opacity-100'
                    }`}
                  >
                    {b.city}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Floating Glassmorphic Info Card matching the HTML snippet */}
        {activeBoutique && (
          <div className="relative z-10 p-3.5 sm:p-4 rounded-2xl bg-[#0e0e10]/90 backdrop-blur-md max-w-sm sm:max-w-md border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] sm:text-xs text-[#4edea3] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                Sucursal Seleccionada
              </span>
              <span className="text-[11px] font-semibold text-zinc-400 tabular-nums">
                {activeBoutique.distanceKm} km de tu ubicación
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#e5e1e4] tracking-tight truncate">
              {activeBoutique.name}
            </h3>

            <p className="text-xs text-[#c7c4d7] truncate mt-0.5">
              {activeBoutique.address}
            </p>

            <div className="mt-2.5 flex items-center gap-2">
              <button
                onClick={() => onRequestDirections(activeBoutique)}
                className="flex-1 py-2 px-3 bg-[#c0c1ff] hover:bg-[#8083ff] text-[#0d0096] text-xs font-bold rounded-xl transition-all shadow-[0_0_16px_rgba(192,193,255,0.25)] flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 fill-current" />
                <span>Cómo Llegar (Ruta Express)</span>
              </button>

              <button
                onClick={() => onSelectBoutique(activeBoutique)}
                className="py-2 px-3 bg-[#27272a] hover:bg-[#323238] text-white text-xs font-semibold rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                title="Ver ficha completa"
              >
                <span>Ficha</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
