import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  ShoppingBag,
  Calendar,
  Store,
  PhoneCall,
  CheckCircle2,
  Star,
  Clock,
  MapPin,
  Truck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Boutique } from '../types/boutique';

interface BoutiqueCardProps {
  boutique: Boutique;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectBoutique: (boutique: Boutique) => void;
  onShareBoutique: (boutique: Boutique) => void;
  theme?: 'dark' | 'light';
}

export const BoutiqueCard: React.FC<BoutiqueCardProps> = ({
  boutique,
  isFavorite,
  onToggleFavorite,
  onSelectBoutique,
  onShareBoutique,
  theme = 'dark'
}) => {
  const isClosed = boutique.status === 'closed' || boutique.stateText === 'CERRADO' || boutique.statusText === 'CERRADO';
  const isClosingSoon = !isClosed && boutique.status === 'closing_soon';
  const [isHovered, setIsHovered] = useState(false);
  const [popoverPlacement, setPopoverPlacement] = useState<'right' | 'left'>('right');
  const [popoverTop, setPopoverTop] = useState<number>(-60);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    // Clear any pending dismissal
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Dwell timeout (200ms) like Netflix and luxury catalog previews
    hoverTimeoutRef.current = setTimeout(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // If placing to the right would overflow the right viewport boundary, place on the left
        if (rect.right + 395 > screenWidth) {
          setPopoverPlacement('left');
        } else {
          setPopoverPlacement('right');
        }

        // Senior UX/UI vertical positioning:
        // Position preview higher ("un poco más arriba", -60px offset from card top)
        // and adaptively clamp so the user can view the complete preview modal in the available screen height
        const estimatedHeight = 500;
        const padding = 16;
        const idealViewportTop = rect.top - 60;
        let targetViewportTop = idealViewportTop;

        if (targetViewportTop + estimatedHeight > screenHeight - padding) {
          targetViewportTop = Math.max(padding, screenHeight - padding - estimatedHeight);
        } else if (targetViewportTop < padding) {
          targetViewportTop = padding;
        }

        const calculatedTopOffset = Math.round(targetViewportTop - rect.top);
        setPopoverTop(calculatedTopOffset);
      }
      setIsHovered(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Small delay to allow moving cursor seamlessly between card image and popover
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Shared Catalog Popover Component (Mirrors exact placecard aesthetics & components)
  const renderCatalogPopover = () => {
    if (!isHovered) return null;

    const isLight = theme === 'light';

    return (
      <div
        onMouseEnter={() => {
          if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
          setIsHovered(true);
        }}
        onMouseLeave={handleMouseLeave}
        style={{ top: `${popoverTop}px` }}
        className={`hidden lg:flex flex-col absolute z-50 w-[360px] sm:w-[380px] max-w-[90vw] max-h-[calc(100vh-32px)] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 shadow-2xl transition-all pointer-events-auto ${
          popoverPlacement === 'right'
            ? 'left-[calc(100%+16px)]'
            : 'right-[calc(100%+16px)]'
        } ${
          isLight
            ? 'bg-white border border-zinc-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.18)] pt-2.5 px-2.5 pb-4 rounded-3xl text-zinc-900 ring-1 ring-black/5'
            : 'bg-[#18181b]/98 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] pt-2.5 px-2.5 pb-3.5 rounded-2xl text-white ring-1 ring-white/10'
        }`}
      >
        {/* Subtle Preview Indicator Header */}
        <div
          className={`flex items-center justify-between pb-2 mb-2.5 border-b ${
            isLight ? 'border-zinc-100' : 'border-white/10'
          }`}
        >
          <span
            className={`flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest ${
              isLight ? 'text-[#006fee]' : 'text-[#c0c1ff]'
            }`}
          >
            <Sparkles className="w-3 h-3 fill-current" />
            Vista Previa de Sucursal
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isLight ? 'bg-zinc-100 text-zinc-700' : 'bg-white/10 text-zinc-300'
            }`}
          >
            {boutique.city}
          </span>
        </div>

        {isLight ? (
          /* Light Theme Components (Identical to Light Placecard) */
          <>
            {/* Visual Image Header */}
            <div className="relative w-full aspect-square overflow-hidden bg-white shrink-0 rounded-2xl shadow-none">
              <img
                alt={boutique.name}
                src={boutique.image}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 ease-out brightness-[1.04] contrast-[1.02] shadow-none filter-none"
              />

              {/* Status Pill (HeroUI Light) */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200/60 shadow-sm">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isClosed
                      ? 'bg-red-500'
                      : isClosingSoon
                      ? 'bg-amber-500 animate-pulse'
                      : 'bg-[#10b981] animate-pulse'
                  }`}
                />
                <span
                  className={`text-[11px] font-bold tracking-wide uppercase ${
                    isClosed
                      ? 'text-red-700'
                      : isClosingSoon
                      ? 'text-amber-700'
                      : 'text-[#059669]'
                  }`}
                >
                  {isClosed ? 'CERRADO' : boutique.statusText}
                </span>
              </div>

              {/* Favorite Bookmark Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(boutique.id);
                }}
                aria-label={isFavorite ? 'Quitar de favoritas' : 'Guardar en favoritas'}
                className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200/80 flex items-center justify-center text-zinc-700 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isFavorite ? 'text-red-500 fill-red-500' : 'text-zinc-600 hover:text-red-500'
                  }`}
                />
              </button>
            </div>

            {/* Title & Verified Pill */}
            <div className="flex flex-col pt-3 pb-1">
              <div className="flex items-center justify-between gap-1.5">
                <h2
                  onClick={() => onSelectBoutique(boutique)}
                  className="text-base sm:text-lg font-extrabold text-zinc-900 hover:text-[#006fee] transition-colors tracking-tight truncate cursor-pointer"
                  title={boutique.name}
                >
                  {boutique.name}
                </h2>
                {isClosed ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-[10px] font-extrabold tracking-wide shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    CERRADO
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold tracking-wide shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    VERIFICADO
                  </span>
                )}
              </div>

              <div className="text-xs text-zinc-500 mt-0.5 space-y-0.5">
                <div className="font-medium text-zinc-600 truncate">{boutique.niche}</div>
                <div className="text-zinc-400">{boutique.city}</div>
              </div>
            </div>

            {/* Rating Stars Bar (HeroUI Light) */}
            <div className="my-2 px-3 py-1.5 rounded-xl bg-amber-50/70 border border-amber-200/50 flex items-center gap-1.5 text-xs text-zinc-700">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-extrabold text-zinc-900 ml-1">4.9</span>
              <span className="text-zinc-500 font-medium">(1200)</span>
            </div>

            {/* Operator Row */}
            <div className="flex items-center justify-between py-2 border-b border-zinc-100 mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
                    style={{ backgroundColor: boutique.operator.avatarBg }}
                  >
                    {boutique.operator.initials}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10b981] ring-2 ring-white" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-zinc-900 leading-tight">
                      {boutique.operator.name}
                    </span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1 leading-tight">
                    Responde en 30m <span className="text-amber-500">⚡</span>
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `tel:${boutique.phone}`;
                }}
                aria-label={`Llamar a ${boutique.name}`}
                className="w-8 h-8 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
                title={`Llamar a ${boutique.phone}`}
              >
                <PhoneCall className="w-3.5 h-3.5 text-zinc-700" />
              </button>
            </div>

            {/* Metadata Grid 2x2 (HeroUI Light) */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-xs text-zinc-600 mb-3.5">
              <div className="flex items-center gap-1.5 truncate">
                <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span className="truncate font-medium">{boutique.schedule[0]?.hours || '11:00 - 21:00'}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate font-medium">{boutique.address.split(',')[0]}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <ShoppingBag className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span className="truncate font-medium">+{boutique.stockCount.toLocaleString()} productos</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-bold text-emerald-600 truncate">Envío gratis</span>
              </div>
            </div>

            {/* Action Button (HeroUI Signature Blue Button) */}
            <button
              onClick={() => onSelectBoutique(boutique)}
              className="w-full mt-auto py-2.5 px-4 rounded-xl bg-[#006fee] hover:bg-[#005bc4] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm font-bold text-white shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Store className="w-4 h-4" />
              <span>{boutique.actionLabel}</span>
            </button>
          </>
        ) : (
          /* Dark Theme Components (Identical to Dark Placecard) */
          <>
            {/* Visual Image Header */}
            <div className="relative w-full aspect-square overflow-hidden bg-[#2a2a2c] shrink-0 shadow-inner rounded-xl">
              <img
                alt={boutique.name}
                src={boutique.image}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Status Pill (Open / Closes Soon / Closed) */}
              {isClosed ? (
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-red-500/30 text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-red-400">
                    CERRADO
                  </span>
                </div>
              ) : isClosingSoon ? (
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400">
                    CIERRA PRONTO
                  </span>
                </div>
              ) : (
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#4edea3]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#10b981]">
                    ABIERTO
                  </span>
                </div>
              )}

              {/* Favorite Bookmark Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(boutique.id);
                }}
                aria-label={isFavorite ? 'Quitar de favoritas' : 'Guardar en favoritas'}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-colors ${
                    isFavorite ? 'text-red-500 fill-red-500' : 'text-white/80 hover:text-white'
                  }`}
                />
              </button>
            </div>

            {/* Main Info */}
            <div className="flex flex-col pt-2 pb-1">
              <div className="flex items-center justify-between gap-1">
                <h2
                  onClick={() => onSelectBoutique(boutique)}
                  className="text-sm sm:text-base font-bold text-white hover:text-[#c0c1ff] transition-colors tracking-tight truncate cursor-pointer"
                  title={boutique.name}
                >
                  {boutique.name}
                </h2>
                {isClosed ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-[10px] font-bold tracking-wide shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {boutique.stateText}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#064e3b]/80 border border-[#059669]/40 text-[#34d399] text-[10px] font-bold tracking-wide shrink-0">
                    <CheckCircle2 className="w-2.5 h-2.5 text-[#34d399]" />
                    {boutique.stateText}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs sm:text-[13px] text-zinc-400 my-1">
                <span className="truncate">
                  {boutique.niche} • {boutique.city}
                </span>
                <span className="inline-flex items-center gap-1 text-zinc-300 shrink-0">
                  <ShoppingBag className="w-3 h-3 text-[#4edea3] shrink-0" />
                  <b className="text-white text-xs tabular-nums">+{boutique.stockCount.toLocaleString()}</b> stock
                </span>
              </div>
            </div>

            {/* Operator & Phone Row */}
            <div className="flex items-center justify-between py-1 border-b border-white/5 mb-1.5">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-[11px] shadow-sm"
                    style={{ backgroundColor: boutique.operator.avatarBg }}
                  >
                    {boutique.operator.initials}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10b981] ring-2 ring-[#18181b]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white leading-tight">
                      {boutique.operator.name}
                    </span>
                    <svg className="w-3 h-3 text-[#10b981] fill-current shrink-0" viewBox="0 0 20 20">
                      <path
                        clipRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] text-zinc-400 flex items-center gap-1 leading-tight">
                    {boutique.operator.badgeText}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `tel:${boutique.phone}`;
                }}
                aria-label={`Llamar a ${boutique.name}`}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#27272a] hover:bg-[#323238] text-zinc-300 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                title={`Llamar a ${boutique.phone}`}
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#4edea3]" />
              </button>
            </div>

            {/* Schedule Table */}
            <div className="mb-2 p-2 rounded-xl bg-[#2a2a2c]/60 border border-white/5">
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/5">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#c0c1ff]" />
                  Horario de Atención
                </span>
                <span className="text-[10px] text-zinc-400">Hora local</span>
              </div>
              <table className="w-full text-left text-[11px] sm:text-xs">
                <tbody>
                  {boutique.schedule.map((item, idx) => (
                    <tr
                      key={idx}
                      className={idx < boutique.schedule.length - 1 ? 'border-b border-white/5' : ''}
                    >
                      <td className="py-0.5 text-zinc-300">{item.days}</td>
                      <td
                        className={`py-0.5 text-right tabular-nums ${
                          item.isSpecial
                            ? 'font-medium text-amber-400/90'
                            : 'font-semibold text-white'
                        }`}
                      >
                        {item.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Action Button */}
            <button
              onClick={() => onSelectBoutique(boutique)}
              className="w-full mt-auto py-2 sm:py-2.5 px-4 rounded-xl bg-[#27272a] hover:bg-[#2f2f35] border border-white/10 hover:border-[#ffffff]/60 hover:shadow-[0_0_14px_rgba(255,255,255,0.18)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-white cursor-pointer"
            >
              <Store className="w-4 h-4 text-[#ffffff]" />
              <span>{boutique.actionLabel}</span>
            </button>
          </>
        )}
      </div>
    );
  };

  // Light Theme Rendering (HeroUI Engineered)
  if (theme === 'light') {
    return (
      <div
        ref={cardRef}
        className={`branch-card group flex flex-col bg-white border border-zinc-200/90 hover:border-zinc-300 hover:shadow-xl transition-all duration-300 shadow-md pt-2 px-2 pb-3.5 sm:pt-2.5 sm:px-2.5 sm:pb-3.5 rounded-3xl h-full relative ${
          isHovered ? 'z-40' : 'z-10'
        }`}
        data-category={boutique.category}
      >
        {/* Visual Image Header */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full aspect-square overflow-hidden bg-white shrink-0 rounded-2xl cursor-pointer shadow-none"
        >
          <img
            alt={boutique.name}
            src={boutique.image}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-[1.04] contrast-[1.02] shadow-none filter-none"
            loading="lazy"
          />

          {/* Status Pill (HeroUI Light) */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200/60 shadow-sm">
            <span
              className={`w-2 h-2 rounded-full ${
                isClosed
                  ? 'bg-red-500'
                  : isClosingSoon
                  ? 'bg-amber-500 animate-pulse'
                  : 'bg-[#10b981] animate-pulse'
              }`}
            />
            <span
              className={`text-[11px] font-bold tracking-wide uppercase ${
                isClosed
                  ? 'text-red-700'
                  : isClosingSoon
                  ? 'text-amber-700'
                  : 'text-[#059669]'
              }`}
            >
              {isClosed ? 'CERRADO' : boutique.statusText}
            </span>
          </div>

          {/* Favorite Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(boutique.id);
            }}
            aria-label={isFavorite ? 'Quitar de favoritas' : 'Guardar en favoritas'}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200/80 flex items-center justify-center text-zinc-700 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'text-red-500 fill-red-500' : 'text-zinc-600 hover:text-red-500'
              }`}
            />
          </button>
        </div>

        {/* Title & Verified Pill */}
        <div className="flex flex-col pt-3 pb-1 px-1 sm:px-1.5">
          <div className="flex items-center justify-between gap-1.5">
            <h2
              onClick={() => onSelectBoutique(boutique)}
              className="text-base sm:text-lg font-extrabold text-zinc-900 group-hover:text-[#006fee] transition-colors tracking-tight truncate cursor-pointer"
              title={boutique.name}
            >
              {boutique.name}
            </h2>
            {isClosed ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-[10px] font-extrabold tracking-wide shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                CERRADO
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold tracking-wide shrink-0">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                VERIFICADO
              </span>
            )}
          </div>

          <div className="text-xs text-zinc-500 mt-0.5 space-y-0.5">
            <div className="font-medium text-zinc-600 truncate">{boutique.niche}</div>
            <div className="text-zinc-400">{boutique.city}</div>
          </div>
        </div>

        {/* Rating Stars Bar (HeroUI Light) */}
        <div className="my-2 px-3 py-1.5 rounded-xl bg-amber-50/70 border border-amber-200/50 flex items-center gap-1.5 text-xs text-zinc-700">
          <div className="flex items-center gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="font-extrabold text-zinc-900 ml-1">4.9</span>
          <span className="text-zinc-500 font-medium">(1200)</span>
        </div>

        {/* Operator Row */}
        <div className="flex items-center justify-between py-2 border-b border-zinc-100 mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
                style={{ backgroundColor: boutique.operator.avatarBg }}
              >
                {boutique.operator.initials}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10b981] ring-2 ring-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-zinc-900 leading-tight">
                  {boutique.operator.name}
                </span>
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              </div>
              <span className="text-[11px] text-zinc-500 flex items-center gap-1 leading-tight">
                Responde en 30m <span className="text-amber-500">⚡</span>
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `tel:${boutique.phone}`;
            }}
            aria-label={`Llamar a ${boutique.name}`}
            className="w-8 h-8 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title={`Llamar a ${boutique.phone}`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-zinc-700" />
          </button>
        </div>

        {/* Metadata Grid 2x2 (HeroUI Light) */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-xs text-zinc-600 mb-3.5">
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="truncate font-medium">{boutique.schedule[0]?.hours || '11:00 - 21:00'}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate font-medium">{boutique.address.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <ShoppingBag className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="truncate font-medium">+{boutique.stockCount.toLocaleString()} productos</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="font-bold text-emerald-600 truncate">Envío gratis</span>
          </div>
        </div>

        {/* Action Button (HeroUI Signature Blue Button) */}
        <button
          onClick={() => onSelectBoutique(boutique)}
          className="w-full mt-auto py-2.5 px-4 rounded-xl bg-[#006fee] hover:bg-[#005bc4] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm font-bold text-white shadow-md shadow-blue-500/20 cursor-pointer"
        >
          <Store className="w-4 h-4" />
          <span>{boutique.actionLabel}</span>
        </button>

        {/* Catalog Hover Popover */}
        {renderCatalogPopover()}
      </div>
    );
  }

  // Dark Theme Rendering (Original Dark Mode)
  return (
    <div
      ref={cardRef}
      className={`branch-card group flex flex-col bg-[#18181b]/95 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 pt-2 px-2 pb-3.5 sm:pt-2.5 sm:px-2.5 sm:pb-3.5 rounded-2xl h-full relative ${
        isHovered ? 'z-40' : 'z-10'
      }`}
      data-category={boutique.category}
    >
      {/* Visual Image Header */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-square overflow-hidden bg-[#2a2a2c] shrink-0 shadow-inner rounded-xl cursor-pointer"
      >
        <img
          alt={boutique.name}
          src={boutique.image}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Status Pill (Open / Closes Soon / Closed) */}
        {isClosed ? (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-red-500/30 text-red-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-red-400">
              CERRADO
            </span>
          </div>
        ) : isClosingSoon ? (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400">
              CIERRA PRONTO
            </span>
          </div>
        ) : (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#4edea3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#10b981]">
              ABIERTO
            </span>
          </div>
        )}

        {/* Favorite Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(boutique.id);
          }}
          aria-label={isFavorite ? 'Quitar de favoritas' : 'Guardar en favoritas'}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-white/80 hover:text-white'
            }`}
          />
        </button>
      </div>

      {/* Main Info */}
      <div className="flex flex-col pt-2 pb-1 px-1 sm:px-1.5">
        <div className="flex items-center justify-between gap-1">
          <h2
            onClick={() => onSelectBoutique(boutique)}
            className="text-sm sm:text-base font-bold text-white group-hover:text-[#c0c1ff] transition-colors tracking-tight truncate cursor-pointer"
            title={boutique.name}
          >
            {boutique.name}
          </h2>
          {isClosed ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-[10px] font-bold tracking-wide shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {boutique.stateText}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#064e3b]/80 border border-[#059669]/40 text-[#34d399] text-[10px] font-bold tracking-wide shrink-0">
              <CheckCircle2 className="w-2.5 h-2.5 text-[#34d399]" />
              {boutique.stateText}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs sm:text-[13px] text-zinc-400 my-1">
          <span className="truncate">
            {boutique.niche} • {boutique.city}
          </span>
          <span className="inline-flex items-center gap-1 text-zinc-300 shrink-0">
            <ShoppingBag className="w-3 h-3 text-[#4edea3] shrink-0" />
            <b className="text-white text-xs tabular-nums">+{boutique.stockCount.toLocaleString()}</b> stock
          </span>
        </div>
      </div>

      {/* Operator & Phone Row */}
      <div className="flex items-center justify-between py-1 border-b border-white/5 mb-1.5">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-[11px] shadow-sm"
              style={{ backgroundColor: boutique.operator.avatarBg }}
            >
              {boutique.operator.initials}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10b981] ring-2 ring-[#18181b]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-white leading-tight">
                {boutique.operator.name}
              </span>
              <svg className="w-3 h-3 text-[#10b981] fill-current shrink-0" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-[10px] text-zinc-400 flex items-center gap-1 leading-tight">
              {boutique.operator.badgeText}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `tel:${boutique.phone}`;
          }}
          aria-label={`Llamar a ${boutique.name}`}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#27272a] hover:bg-[#323238] text-zinc-300 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
          title={`Llamar a ${boutique.phone}`}
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#4edea3]" />
        </button>
      </div>

      {/* Schedule Table */}
      <div className="mb-2 p-2 rounded-xl bg-[#2a2a2c]/60 border border-white/5">
        <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/5">
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#c0c1ff]" />
            Horario de Atención
          </span>
          <span className="text-[10px] text-zinc-400">Hora local</span>
        </div>
        <table className="w-full text-left text-[11px] sm:text-xs">
          <tbody>
            {boutique.schedule.map((item, idx) => (
              <tr
                key={idx}
                className={idx < boutique.schedule.length - 1 ? 'border-b border-white/5' : ''}
              >
                <td className="py-0.5 text-zinc-300">{item.days}</td>
                <td
                  className={`py-0.5 text-right tabular-nums ${
                    item.isSpecial
                      ? 'font-medium text-amber-400/90'
                      : 'font-semibold text-white'
                  }`}
                >
                  {item.hours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Action Button */}
      <button
        onClick={() => onSelectBoutique(boutique)}
        className="w-full mt-auto py-2 sm:py-2.5 px-4 rounded-xl bg-[#27272a] hover:bg-[#2f2f35] border border-white/10 hover:border-[#ffffff]/60 hover:shadow-[0_0_14px_rgba(255,255,255,0.18)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-white cursor-pointer"
      >
        <Store className="w-4 h-4 text-[#ffffff]" />
        <span>{boutique.actionLabel}</span>
      </button>

      {/* Catalog Hover Popover */}
      {renderCatalogPopover()}
    </div>
  );
};
