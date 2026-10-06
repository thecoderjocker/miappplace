import React from 'react';
import { Compass, Heart, MapPin, Sparkles, Building2 } from 'lucide-react';

interface NavbarProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  onLocateNearest: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onOpenConcierge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  onOpenFavorites,
  onLocateNearest,
  activeSection,
  setActiveSection,
  onOpenConcierge
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#131315]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c0c1ff]/20 to-[#8083ff]/40 border border-[#c0c1ff]/30 flex items-center justify-center text-[#c0c1ff] shadow-[0_0_16px_rgba(192,193,255,0.15)]">
            <Building2 className="w-5 h-5 text-[#c0c1ff]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              MAISON RETAIL
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            </span>
            <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-medium">
              Red Global de Sucursales &amp; Boutiques
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
          <button
            onClick={() => setActiveSection('catalog')}
            className={`transition-colors hover:text-white ${
              activeSection === 'catalog' ? 'text-white font-semibold' : ''
            }`}
          >
            Catálogo de Boutiques
          </button>
          <button
            onClick={() => setActiveSection('map')}
            className={`transition-colors hover:text-white ${
              activeSection === 'map' ? 'text-white font-semibold' : ''
            }`}
          >
            Geolocalización
          </button>
          <button
            onClick={onOpenConcierge}
            className="transition-colors hover:text-white flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c0c1ff]" />
            Cita Concierge VIP
          </button>
          <button
            onClick={onOpenFavorites}
            className="transition-colors hover:text-white flex items-center gap-1.5"
          >
            <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'text-red-400 fill-red-400' : 'text-zinc-400'}`} />
            Favoritas
            {favoritesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-red-500/20 text-red-300 text-[10px] font-bold">
                {favoritesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onLocateNearest}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-200 transition-all hover:border-white/20 active:scale-95"
            title="Localizar la sucursal más cercana"
          >
            <Compass className="w-3.5 h-3.5 text-[#4edea3]" />
            <span className="hidden sm:inline">Sucursal Cercana</span>
            <span className="sm:hidden">Cercana</span>
          </button>

          <button
            onClick={onOpenConcierge}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#c0c1ff] hover:bg-[#8083ff] text-[#0d0096] text-xs font-bold transition-all shadow-sm hover:shadow-[0_0_20px_rgba(192,193,255,0.3)] active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Agendar Cita</span>
          </button>
        </div>
      </div>
    </header>
  );
};
