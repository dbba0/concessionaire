import React, { useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Vehicle } from '../types';

interface ShowroomGalleryProps {
  vehicles: Vehicle[];
  onSelectVehicleForModal: (vehicle: Vehicle) => void;
  onSelectVehicleForConfigurator: (vehicle: Vehicle) => void;
}

export const ShowroomGallery: React.FC<ShowroomGalleryProps> = ({
  vehicles,
  onSelectVehicleForModal,
  onSelectVehicleForConfigurator,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Tous');

  const categories = ['Tous', 'SUV Ultra-Luxe', 'Supercar GT'];

  const filteredVehicles =
    activeCategory === 'Tous'
      ? vehicles
      : vehicles.filter((v) => v.category === activeCategory);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="showroom" className="py-24 bg-[#0a0b0e] border-t border-[#1a1c24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1f232d] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-sans-clean tracking-[0.25em] uppercase text-[#c8a46b] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Showroom Privé Les Almadies</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#f5f2eb]">
              La Collection d'Exception
            </h2>
          </div>

          {/* Controls: Category Filter + Scroll Arrows */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Filter pills */}
            <div className="flex items-center bg-[#13151c] p-1 border border-[#232733]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-sans-clean tracking-wider uppercase transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#c8a46b] text-[#0f1013] font-semibold'
                      : 'text-[#9c9587] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                id="gallery-scroll-left-btn"
                onClick={() => scroll('left')}
                className="w-10 h-10 border border-[#262a36] bg-[#14161e] hover:bg-[#c8a46b] hover:text-[#0f1013] text-[#c8a46b] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="gallery-scroll-right-btn"
                onClick={() => scroll('right')}
                className="w-10 h-10 border border-[#262a36] bg-[#14161e] hover:bg-[#c8a46b] hover:text-[#0f1013] text-[#c8a46b] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Gallery Container */}
      <div className="w-full overflow-hidden">
        <div
          ref={scrollContainerRef}
          id="horizontal-gallery-track"
          className="flex gap-6 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 pb-8 pt-2 scroll-smooth select-none cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              id={`vehicle-card-${vehicle.id}`}
              className="flex-shrink-0 w-[320px] sm:w-[380px] md:w-[420px] bg-[#13151c] border border-[#222632] hover:border-[#c8a46b]/60 transition-all duration-300 group flex flex-col justify-between"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Card Image Area */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0b0d]">
                <img
                  src={vehicle.exteriorImage}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center showroom-curated-photo group-hover:scale-105 transition-transform duration-700"
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-[#0a0b0d]/80 text-[#e6cb9d] backdrop-blur-sm border border-[#2a2e3b]">
                    {vehicle.brand}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] tracking-wider text-[#4ade80] bg-[#0a0b0d]/80 backdrop-blur-sm border border-[#2a2e3b]">
                    {vehicle.status}
                  </span>
                </div>

                {/* Subtle bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#13151c] via-transparent to-transparent opacity-80" />
              </div>

              {/* Card Information */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean text-[#868073] block">
                    {vehicle.category} • {vehicle.year}
                  </span>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#f5f2eb] mt-0.5 group-hover:text-[#dfbe8d] transition-colors">
                    {vehicle.model}
                  </h3>
                  <p className="font-sans-clean text-xs text-[#9c9587] mt-1.5 line-clamp-2 leading-relaxed">
                    {vehicle.description}
                  </p>
                </div>

                {/* Quick specs pill bar */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#1e222c] text-center font-sans-clean text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#757064] block">
                      Puissance
                    </span>
                    <span className="font-serif-luxury text-sm text-[#e6cb9d]">
                      {vehicle.specs.power.split('/')[0]}
                    </span>
                  </div>
                  <div className="border-x border-[#1e222c]">
                    <span className="text-[9px] uppercase tracking-wider text-[#757064] block">
                      0-100
                    </span>
                    <span className="font-serif-luxury text-sm text-[#e6cb9d]">
                      {vehicle.specs.acceleration.split(' ')[0]}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#757064] block">
                      V-Max
                    </span>
                    <span className="font-serif-luxury text-sm text-[#e6cb9d]">
                      {vehicle.specs.topSpeed.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Price and actions */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7d786d] uppercase tracking-wider text-[10px]">
                      Estimation
                    </span>
                    <span className="font-serif-luxury text-sm text-[#f0ece4]">
                      {vehicle.priceEstimate}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      id={`inspect-car-${vehicle.id}`}
                      onClick={() => onSelectVehicleForModal(vehicle)}
                      className="py-2.5 px-3 border border-[#272b36] hover:border-[#c8a46b] bg-[#171922] text-[#c8a46b] text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Examiner</span>
                    </button>

                    <button
                      id={`configure-car-${vehicle.id}`}
                      onClick={() => onSelectVehicleForConfigurator(vehicle)}
                      className="py-2.5 px-3 bg-[#c8a46b] hover:bg-[#dfbe8d] text-[#0f1013] text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Configurer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
