import React, { useState, useEffect, useMemo } from 'react';
import { FilterBar } from './components/FilterBar';
import { BoutiqueCard } from './components/BoutiqueCard';
import { BoutiqueCardSkeleton } from './components/BoutiqueCardSkeleton';
import { InteractiveMap } from './components/InteractiveMap';
import { BoutiqueDetailModal } from './components/BoutiqueDetailModal';
import { ConciergeBookingModal } from './components/ConciergeBookingModal';
import { DirectionsModal } from './components/DirectionsModal';
import { ShareModal } from './components/ShareModal';
import { BOUTIQUES_DATA } from './data/boutiques';
import { Boutique, BoutiqueCategory } from './types/boutique';
import { Heart, SearchX } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<BoutiqueCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('Todas las ciudades');
  const [onlyOpen, setOnlyOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showMapDrawer, setShowMapDrawer] = useState<boolean>(false);
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('maison_theme');
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('maison_theme', next);
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Active Modals
  const [selectedBoutique, setSelectedBoutique] = useState<Boutique | null>(null);
  const [bookingBoutique, setBookingBoutique] = useState<Boutique | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [directionsBoutique, setDirectionsBoutique] = useState<Boutique | null>(null);
  const [shareBoutique, setShareBoutique] = useState<Boutique | null>(null);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('maison_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('maison_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Initial HeroUI Skeleton Loading effect on UI load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Support ?boutique=<id> URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const boutiqueId = params.get('boutique');
    if (boutiqueId) {
      const found = BOUTIQUES_DATA.find((b) => b.id === boutiqueId);
      if (found) setSelectedBoutique(found);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter Logic
  const filteredBoutiques = useMemo(() => {
    return BOUTIQUES_DATA.filter((b) => {
      // Category filter
      if (selectedCategory !== 'all' && b.category !== selectedCategory) {
        return false;
      }
      // City filter
      if (selectedCity !== 'Todas las ciudades' && b.city !== selectedCity) {
        return false;
      }
      // Only open filter
      if (onlyOpen && b.status === 'closed') {
        return false;
      }
      // Favorites filter
      if (filterFavoritesOnly && !favorites.includes(b.id)) {
        return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = b.name.toLowerCase().includes(q);
        const matchesCity = b.city.toLowerCase().includes(q);
        const matchesCountry = b.country.toLowerCase().includes(q);
        const matchesAddress = b.address.toLowerCase().includes(q);
        const matchesNiche = b.niche.toLowerCase().includes(q);
        const matchesOperator = b.operator.name.toLowerCase().includes(q);
        const matchesDesc = b.description.toLowerCase().includes(q);
        return (
          matchesName ||
          matchesCity ||
          matchesCountry ||
          matchesAddress ||
          matchesNiche ||
          matchesOperator ||
          matchesDesc
        );
      }
      return true;
    });
  }, [selectedCategory, selectedCity, onlyOpen, filterFavoritesOnly, favorites, searchQuery]);

  const handleLocateNearest = () => {
    // Select closest boutique
    const closest = BOUTIQUES_DATA.reduce((prev, curr) =>
      curr.distanceKm < prev.distanceKm ? curr : prev
    );
    // Switch to map or open map drawer
    setShowMapDrawer(true);
    setDirectionsBoutique(closest);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        theme === 'light' ? 'bg-[#f4f4f5] text-zinc-900' : 'bg-[#131315] text-[#e5e1e4]'
      } flex flex-col antialiased selection:bg-[#8083ff] selection:text-[#0d0096]`}
    >
      <main className={`w-full flex-1 transition-colors duration-200 ${theme === 'light' ? 'bg-[#f4f4f5]' : 'bg-[#131315]'}`}>
        <div className="flex flex-col w-full">
          <div className="w-full">
            {/* Section 1: Header & Control Bar */}
            <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
              {/* Favorites notification pill if active */}
              {filterFavoritesOnly && (
                <div
                  className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                    theme === 'light'
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : 'bg-red-500/10 border-red-500/20 text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 fill-red-400 text-red-400" />
                    <span>
                      Visualizando tus <b>{favorites.length}</b> boutiques favoritas guardadas
                    </span>
                  </div>
                  <button
                    onClick={() => setFilterFavoritesOnly(false)}
                    className="underline hover:font-bold font-semibold"
                  >
                    Ver todas las sucursales
                  </button>
                </div>
              )}

              {/* Controls & Filter Deck matching the HTML snippet */}
              <FilterBar
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setFilterFavoritesOnly(false);
                }}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                viewMode={viewMode}
                onViewModeChange={(mode) => {
                  setViewMode(mode);
                  if (mode === 'map') setShowMapDrawer(true);
                }}
                selectedCity={selectedCity}
                onCityChange={setSelectedCity}
                onlyOpen={onlyOpen}
                onToggleOnlyOpen={setOnlyOpen}
                totalFilteredCount={filteredBoutiques.length}
                totalCount={BOUTIQUES_DATA.length}
                theme={theme}
                onToggleTheme={toggleTheme}
              />
            </div>

            {/* Section 2: Main Grid of Vertical Place Cards */}
            <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
              {/* Cards Grid with HeroUI Skeleton Animation */}
              {isLoading ? (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-7xl mx-auto"
                  id="cardMatrix"
                >
                  {[...Array(4)].map((_, idx) => (
                    <BoutiqueCardSkeleton key={idx} theme={theme} />
                  ))}
                </div>
              ) : filteredBoutiques.length > 0 ? (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-7xl mx-auto"
                  id="cardMatrix"
                >
                  {filteredBoutiques.map((boutique) => (
                    <BoutiqueCard
                      key={boutique.id}
                      boutique={boutique}
                      isFavorite={favorites.includes(boutique.id)}
                      onToggleFavorite={toggleFavorite}
                      onSelectBoutique={(b) => setSelectedBoutique(b)}
                      onShareBoutique={(b) => setShareBoutique(b)}
                      theme={theme}
                    />
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div
                  className={`py-16 text-center max-w-md mx-auto p-8 rounded-3xl border space-y-3 ${
                    theme === 'light'
                      ? 'bg-white border-zinc-200 text-zinc-800 shadow-md'
                      : 'bg-[#1c1b1d] border-white/5 text-zinc-400'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto ${
                      theme === 'light' ? 'bg-zinc-100 text-zinc-500' : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    <SearchX className="w-6 h-6" />
                  </div>
                  <h3 className={`text-base font-bold ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>
                    No se encontraron boutiques
                  </h3>
                  <p className={`text-xs ${theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    No hay sucursales que coincidan con los filtros seleccionados ({searchQuery || selectedCategory || selectedCity}).
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setSelectedCity('Todas las ciudades');
                      setOnlyOpen(false);
                      setFilterFavoritesOnly(false);
                    }}
                    className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-[#006fee] text-white hover:bg-[#005bc4] shadow-md shadow-blue-500/20'
                        : 'bg-[#c0c1ff] text-[#0d0096] hover:bg-[#8083ff]'
                    }`}
                  >
                    Restablecer todos los filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Boutique Detail Modal */}
      <BoutiqueDetailModal
        boutique={selectedBoutique}
        onClose={() => setSelectedBoutique(null)}
        isFavorite={selectedBoutique ? favorites.includes(selectedBoutique.id) : false}
        onToggleFavorite={toggleFavorite}
        onBookAppointment={(b) => {
          setSelectedBoutique(null);
          setBookingBoutique(b);
          setIsBookingOpen(true);
        }}
        onRequestDirections={(b) => {
          setDirectionsBoutique(b);
        }}
        onShare={(b) => setShareBoutique(b)}
      />

      {/* Concierge Booking Modal */}
      {isBookingOpen && (
        <ConciergeBookingModal
          initialBoutique={bookingBoutique}
          onClose={() => {
            setIsBookingOpen(false);
            setBookingBoutique(null);
          }}
        />
      )}

      {/* Directions Modal */}
      <DirectionsModal
        boutique={directionsBoutique}
        onClose={() => setDirectionsBoutique(null)}
      />

      {/* Share Modal */}
      <ShareModal
        boutique={shareBoutique}
        onClose={() => setShareBoutique(null)}
      />
    </div>
  );
}
