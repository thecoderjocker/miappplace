import React, { useEffect, useRef, useMemo } from 'react';
import { Search, X, Filter, Clock, Sun, Moon, Layers, Sparkles, Compass, Store, Flame } from 'lucide-react';
import { BoutiqueCategory } from '../types/boutique';
import { CATEGORIES, AVAILABLE_CITIES, BOUTIQUES_DATA } from '../data/boutiques';

interface FilterBarProps {
  selectedCategory: BoutiqueCategory;
  onSelectCategory: (cat: BoutiqueCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode?: 'grid' | 'map';
  onViewModeChange?: (mode: 'grid' | 'map') => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  onlyOpen: boolean;
  onToggleOnlyOpen: (open: boolean) => void;
  totalFilteredCount: number;
  totalCount: number;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  selectedCity,
  onCityChange,
  onlyOpen,
  onToggleOnlyOpen,
  theme = 'dark',
  onToggleTheme
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut ⌘K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isLight = theme === 'light';

  const categoryCounts = useMemo(() => {
    return {
      all: BOUTIQUES_DATA.length,
      flagship: BOUTIQUES_DATA.filter((b) => b.category === 'flagship').length,
      concept: BOUTIQUES_DATA.filter((b) => b.category === 'concept').length,
      lifestyle: BOUTIQUES_DATA.filter((b) => b.category === 'lifestyle').length,
      aperturas: BOUTIQUES_DATA.filter((b) => b.category === 'aperturas').length,
    };
  }, []);

  const getCategoryIcon = (id: string) => {
    const iconClass = "w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:scale-110";
    switch (id) {
      case 'all':
        return <Layers className={iconClass} />;
      case 'flagship':
        return <Sparkles className={iconClass} />;
      case 'concept':
        return <Compass className={iconClass} />;
      case 'lifestyle':
        return <Store className={iconClass} />;
      case 'aperturas':
        return <Flame className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Primary Control Deck */}
      <div
        className={`p-2 sm:p-3 md:p-4 rounded-3xl transition-colors duration-200 shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 md:gap-4 ${
          isLight
            ? 'bg-white border border-zinc-200/80 shadow-md'
            : 'bg-[#1c1b1d] border border-white/5 shadow-xl'
        }`}
      >
        {/* Left Section: Search Input */}
        <div className="relative w-full sm:w-72 lg:w-80 shrink-0">
          <Search
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
              isLight ? 'text-zinc-400' : 'text-zinc-400'
            }`}
          />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar boutique, ciudad o calle..."
            className={`w-full text-xs sm:text-sm pl-10 pr-14 py-2.5 rounded-full focus:outline-none transition-all ${
              isLight
                ? 'bg-zinc-100 text-zinc-900 placeholder:text-zinc-400 border border-zinc-200 focus:bg-white focus:ring-2 focus:ring-[#006fee]/20 focus:border-[#006fee]'
                : 'bg-[#131315]/90 text-[#e5e1e4] placeholder:text-zinc-500 border border-white/10 focus:ring-2 focus:ring-white/20 focus:border-white/40'
            }`}
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 p-0.5 cursor-pointer"
              title="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span
              className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                isLight
                  ? 'text-zinc-400 bg-white border-zinc-200'
                  : 'text-zinc-400 bg-[#201f21] border-white/10'
              }`}
            >
              ⌘K
            </span>
          )}
        </div>

        {/* Right Section: Category Tabs (HeroUI) + View Mode & Theme Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap lg:flex-nowrap justify-between lg:justify-end flex-1 overflow-x-auto scrollbar-none">
          {/* Category Filter Tabs (HeroUI Inspired) */}
          <div
            className={`flex items-center gap-1 overflow-x-auto p-1 rounded-full scrollbar-none transition-all duration-300 max-w-full shrink-0 ${
              isLight
                ? 'bg-zinc-100/90 border border-zinc-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]'
                : 'bg-[#131315]/90 border border-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] backdrop-blur-md'
            }`}
            id="categoryFilters"
            role="tablist"
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id as keyof typeof categoryCounts] ?? 0;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectCategory(cat.id as BoutiqueCategory)}
                  className={`filter-btn group relative whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] cursor-pointer flex items-center gap-2 select-none ${
                    isActive
                      ? isLight
                        ? 'bg-[#006fee] text-white shadow-[0_4px_14px_rgba(0,111,238,0.35)] ring-1 ring-blue-400/30'
                        : 'bg-white text-zinc-950 font-bold shadow-[0_2px_14px_rgba(255,255,255,0.22)] ring-1 ring-white/60'
                      : isLight
                      ? 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {getCategoryIcon(cat.id)}
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold tabular-nums transition-colors ${
                      isActive
                        ? isLight
                          ? 'bg-white/25 text-white'
                          : 'bg-zinc-900/10 text-zinc-950 font-extrabold'
                        : isLight
                        ? 'bg-zinc-200/80 text-zinc-600 group-hover:bg-zinc-300/80 group-hover:text-zinc-900'
                        : 'bg-white/10 text-zinc-400 group-hover:bg-white/15 group-hover:text-zinc-200'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Toggle Button (HeroUI Style) */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border active:scale-95 ${
                  isLight
                    ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200 shadow-sm'
                    : 'bg-[#2a2a2c] hover:bg-[#353437] text-amber-300 border-white/10'
                }`}
                title={isLight ? 'Cambiar a Modo Oscuro' : 'Cambiar a Modo Claro'}
                aria-label="Alternar tema"
              >
                {isLight ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-zinc-700" />
                    <span className="hidden sm:inline">Oscuro</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Claro</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Quick Filters Bar */}
      <div
        className={`flex flex-wrap items-center justify-between gap-2.5 px-1 text-xs ${
          isLight ? 'text-zinc-600' : 'text-zinc-400'
        }`}
      >
        <div className="flex items-center gap-2 flex-wrap">
          {/* City Selector */}
          <div
            className={`flex items-center gap-1 border px-2.5 py-1.5 rounded-xl ${
              isLight
                ? 'bg-white border-zinc-200 shadow-sm'
                : 'bg-[#1c1b1d] border-white/5'
            }`}
          >
            <Filter className={`w-3 h-3 ${isLight ? 'text-[#006fee]' : 'text-zinc-400'}`} />
            <select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className={`bg-transparent text-xs font-medium focus:outline-none cursor-pointer ${
                isLight ? 'text-zinc-800' : 'text-zinc-200'
              }`}
            >
              {AVAILABLE_CITIES.map((city) => (
                <option
                  key={city}
                  value={city}
                  className={isLight ? 'bg-white text-zinc-900' : 'bg-[#1c1b1d] text-zinc-200'}
                >
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Only Open Toggle */}
          <button
            onClick={() => onToggleOnlyOpen(!onlyOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
              onlyOpen
                ? 'bg-[#064e3b]/80 border-[#059669]/60 text-[#34d399]'
                : isLight
                ? 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300 shadow-sm'
                : 'bg-[#1c1b1d] border-white/5 text-zinc-300 hover:border-white/10'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Abiertas ahora</span>
            {onlyOpen && <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />}
          </button>

          {(selectedCategory !== 'all' || selectedCity !== 'Todas las ciudades' || searchQuery || onlyOpen) && (
            <button
              onClick={() => {
                onSelectCategory('all');
                onCityChange('Todas las ciudades');
                onSearchChange('');
                onToggleOnlyOpen(false);
              }}
              className={`text-[11px] hover:underline flex items-center gap-1 px-2 py-1 ${
                isLight ? 'text-[#006fee]' : 'text-zinc-300 hover:text-white'
              }`}
            >
              <X className="w-3 h-3" />
              Restablecer filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
