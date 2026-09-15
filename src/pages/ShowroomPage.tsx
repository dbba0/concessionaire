import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Filter,
  ArrowUpDown,
  ArrowLeftRight,
  ArrowRight,
  ChevronRight,
  Gauge,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { VEHICLES } from '../data/vehicles';
import { Vehicle } from '../types';
import { VehiclePlaceholderImage } from '../components/VehiclePlaceholderImage';
import { VehicleComparatorModal } from '../components/VehicleComparatorModal';

export const ShowroomPage: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('Toutes');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('Toutes');
  const [sortBy, setSortBy] = useState<'price-desc' | 'price-asc' | 'power-desc'>('price-desc');
  const [isComparatorOpen, setIsComparatorOpen] = useState<boolean>(false);

  // Extract unique brands and categories
  const brands = useMemo(() => {
    return ['Toutes', ...Array.from(new Set(VEHICLES.map((v) => v.brand)))];
  }, []);

  const categories = useMemo(() => {
    return ['Toutes', 'SUV Ultra-Luxe', 'Supercar GT'];
  }, []);

  const priceRanges = [
    { label: 'Toutes les tranches', value: 'Toutes' },
    { label: 'Moins de 300M FCFA', value: 'under-300' },
    { label: '300M à 400M FCFA', value: '300-400' },
    { label: 'Plus de 400M FCFA', value: 'above-400' },
  ];

  // Filtering logic
  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((v) => {
      if (selectedBrand !== 'Toutes' && v.brand !== selectedBrand) return false;
      if (selectedCategory !== 'Toutes' && v.category !== selectedCategory) return false;

      if (selectedPriceRange === 'under-300' && v.basePriceFCFA >= 300000000) return false;
      if (
        selectedPriceRange === '300-400' &&
        (v.basePriceFCFA < 300000000 || v.basePriceFCFA > 400000000)
      )
        return false;
      if (selectedPriceRange === 'above-400' && v.basePriceFCFA <= 400000000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.basePriceFCFA - a.basePriceFCFA;
      if (sortBy === 'price-asc') return a.basePriceFCFA - b.basePriceFCFA;
      if (sortBy === 'power-desc') {
        const powerA = parseInt(a.specs.power) || 0;
        const powerB = parseInt(b.specs.power) || 0;
        return powerB - powerA;
      }
      return 0;
    });
  }, [selectedBrand, selectedCategory, selectedPriceRange, sortBy]);

  const resetFilters = () => {
    setSelectedBrand('Toutes');
    setSelectedCategory('Toutes');
    setSelectedPriceRange('Toutes');
    setSortBy('price-desc');
  };

  return (
    <div className="py-12 sm:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#212634] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-sans-clean tracking-[0.25em] uppercase text-[#c8a46b] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showroom Privé Les Almadies • Dakar</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#f5f2eb]">
            Collection Showroom d'Exception
          </h1>
          <p className="font-sans-clean text-xs sm:text-sm text-[#9c9587] mt-2 max-w-2xl">
            Véhicules d'exception multimarques en stock ou sur allocation officielle. Cliquez sur un modèle pour accéder à sa fiche technique intégrale et à son configurateur atelier.
          </p>
        </div>

        {/* Dual actions: Compare models & Direct salon */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setIsComparatorOpen(true)}
            className="px-4 py-2.5 bg-[#171a23] hover:bg-[#202431] border border-[#c8a46b]/40 text-[#dfbe8d] text-xs uppercase tracking-wider font-sans-clean transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#c8a46b]" />
            <span>Comparer deux modèles</span>
          </button>
        </div>
      </div>

      {/* Multi-Filters Section */}
      <div className="bg-[#11131a] border border-[#212533] p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[#1d212c] pb-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-sans-clean text-[#c8a46b]">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtres de Sélection</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans-clean">
            <span className="text-[#888173]">
              {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? 's' : ''} trouvé{filteredVehicles.length > 1 ? 's' : ''}
            </span>

            {(selectedBrand !== 'Toutes' ||
              selectedCategory !== 'Toutes' ||
              selectedPriceRange !== 'Toutes') && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[#c8a46b] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Réinitialiser</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans-clean">
          {/* Brand Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#8a8477]">
              Marque
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#0a0b0e] border border-[#262b3a] focus:border-[#c8a46b] text-[#f0ece4] focus:outline-none cursor-pointer"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b === 'Toutes' ? 'Toutes les Marques' : b}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#8a8477]">
              Silhouette / Type
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#0a0b0e] border border-[#262b3a] focus:border-[#c8a46b] text-[#f0ece4] focus:outline-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'Toutes' ? 'Tous les types (SUV, GT, Berline)' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#8a8477]">
              Gamme de Prix (FCFA)
            </label>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#0a0b0e] border border-[#262b3a] focus:border-[#c8a46b] text-[#f0ece4] focus:outline-none cursor-pointer"
            >
              {priceRanges.map((pr) => (
                <option key={pr.value} value={pr.value}>
                  {pr.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#8a8477]">
              Trier par
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 bg-[#0a0b0e] border border-[#262b3a] focus:border-[#c8a46b] text-[#f0ece4] focus:outline-none cursor-pointer"
            >
              <option value="price-desc">Prix : Plus élevé au moins élevé</option>
              <option value="price-asc">Prix : Moins élevé au plus élevé</option>
              <option value="power-desc">Puissance maximale (ch)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      {filteredVehicles.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-[#11131a] border border-[#212533] p-8">
          <p className="font-serif-luxury text-xl text-[#f0ece4]">
            Aucun véhicule ne correspond aux critères sélectionnés.
          </p>
          <p className="text-xs text-[#8c8577]">
            Modifiez vos filtres ou contactez notre conciergerie pour une recherche personnalisée.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#c8a46b] text-[#0f1013] text-xs uppercase tracking-wider font-semibold cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((car) => (
            <div
              key={car.id}
              className="bg-[#12141c] border border-[#222735] hover:border-[#c8a46b]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div className="p-5 space-y-4">
                {/* Status & Category Tag */}
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="px-2 py-0.5 bg-[#171a23] text-[#8e8779] border border-[#262b37] rounded-xs uppercase">
                    {car.category}
                  </span>
                  <span className="text-[#4ade80] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                    {car.status}
                  </span>
                </div>

                {/* Car Placeholder Image with discrete expected overlay */}
                <VehiclePlaceholderImage
                  expectedPath={car.exteriorImage}
                  alt={`${car.brand} ${car.model}`}
                  viewLabel={`${car.brand} • Vue Extérieure`}
                  vehicleBrand={car.brand}
                  vehicleModel={car.model}
                  accentColor={car.accentColor}
                  aspectRatio="16/10"
                />

                {/* Title & Brand */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a89679] block">
                    {car.brand} • Millésime {car.year}
                  </span>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#f4efe5] group-hover:text-[#dfbe8d] transition-colors">
                    {car.model}
                  </h3>
                  <p className="text-xs text-[#8c8577] line-clamp-2 font-sans-clean pt-1">
                    {car.subTitle}
                  </p>
                </div>

                {/* Technical Specs Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1d212b] text-center text-xs font-sans-clean">
                  <div className="p-2 bg-[#0c0d12] border border-[#1b1e28]">
                    <span className="text-[9px] text-[#6e685c] block">Puissance</span>
                    <span className="font-mono text-[11px] text-[#e6cb9d] truncate block">
                      {car.specs.power.split('/')[0]}
                    </span>
                  </div>
                  <div className="p-2 bg-[#0c0d12] border border-[#1b1e28]">
                    <span className="text-[9px] text-[#6e685c] block">0-100 km/h</span>
                    <span className="font-mono text-[11px] text-[#e6cb9d] truncate block">
                      {car.specs.acceleration}
                    </span>
                  </div>
                  <div className="p-2 bg-[#0c0d12] border border-[#1b1e28]">
                    <span className="text-[9px] text-[#6e685c] block">Vitesse</span>
                    <span className="font-mono text-[11px] text-[#e6cb9d] truncate block">
                      {car.specs.topSpeed}
                    </span>
                  </div>
                </div>

                {/* Price Estimate */}
                <div className="flex items-baseline justify-between pt-2">
                  <span className="text-xs text-[#7d786d] font-sans-clean">
                    Prix de base estimé :
                  </span>
                  <span className="font-serif-luxury text-base text-[#f2ede4]">
                    {car.priceEstimate}
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0">
                <Link
                  to={`/showroom/${car.slug}`}
                  className="w-full py-3 bg-[#181b24] hover:bg-[#c8a46b] text-[#dfbe8d] hover:text-[#0f1013] border border-[#2b3142] hover:border-[#c8a46b] text-xs uppercase tracking-wider font-sans-clean font-medium transition-all flex items-center justify-center gap-2"
                >
                  <span>Fiche Technique & Configurateur</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Technical Comparator Modal */}
      {isComparatorOpen && (
        <VehicleComparatorModal
          vehicles={VEHICLES}
          onClose={() => setIsComparatorOpen(false)}
        />
      )}
    </div>
  );
};
