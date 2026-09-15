import React, { useState } from 'react';
import { ChevronRight, ArrowUpRight, Shield, Award, Sparkles, MapPin } from 'lucide-react';
import { Vehicle } from '../types';

interface HeroProps {
  flagshipVehicles: Vehicle[];
  onSelectVehicleForConfigurator: (vehicle: Vehicle) => void;
  onOpenContact: (vehicleModel?: string) => void;
  onExploreGallery: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  flagshipVehicles,
  onSelectVehicleForConfigurator,
  onOpenContact,
  onExploreGallery,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCar = flagshipVehicles[activeIndex] || flagshipVehicles[0];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#0a0b0d]"
    >
      {/* Background Image Layer with Warm Vignette */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          key={activeCar.id}
          src={activeCar.exteriorImage}
          alt={`${activeCar.brand} ${activeCar.model}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 md:opacity-50 scale-105 transition-all duration-1000 ease-out brightness-[0.78] contrast-[1.08]"
        />
        {/* Asymmetrical Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d] via-[#0a0b0d]/70 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Asymmetrical Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial & Brand Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            {/* Top Micro-Label */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#171920]/90 border border-[#c8a46b]/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#c8a46b] animate-pulse" />
              <span className="font-sans-clean text-xs uppercase tracking-[0.25em] text-[#dfbe8d]">
                Pointe des Almadies • Dakar, Sénégal
              </span>
            </div>

            {/* Asymmetrical Headline */}
            <div className="space-y-3">
              <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] text-[#f5f2eb] tracking-tight">
                L’autorité <br />
                <span className="italic font-light text-[#dfbe8d]">
                  de l’exception
                </span>{' '}
                automobile.
              </h1>
              <p className="font-sans-clean text-base sm:text-lg text-[#b0a99c] max-w-xl leading-relaxed font-light">
                Maison confidentielle multimarque pour collectionneurs et connaisseurs avertis.
                Rolls-Royce, Ferrari, Bentley, Lamborghini, Maybach et Range Rover disponibles en
                visite privée face à l’océan.
              </p>
            </div>

            {/* CTAs with Fine Brass Accent */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreGallery}
                className="group flex items-center gap-3 px-7 py-4 bg-[#c8a46b] hover:bg-[#dfbe8d] text-[#0f1013] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span>Explorer le Showroom</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-configure-btn"
                onClick={() => onSelectVehicleForConfigurator(activeCar)}
                className="group flex items-center gap-3 px-7 py-4 border border-[#c8a46b]/40 hover:border-[#c8a46b] bg-[#14161d]/80 hover:bg-[#1a1d26] text-[#e8e4db] text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                <span>Configurer ce modèle</span>
                <ArrowUpRight className="w-4 h-4 text-[#c8a46b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-[#252833]/80 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <span className="block font-serif-luxury text-xl sm:text-2xl text-[#f3ede4]">100%</span>
                <span className="font-sans-clean text-[11px] uppercase tracking-wider text-[#8b8476]">
                  Véhicules Certifiés & Homologués
                </span>
              </div>
              <div>
                <span className="block font-serif-luxury text-xl sm:text-2xl text-[#f3ede4]">VIP</span>
                <span className="font-sans-clean text-[11px] uppercase tracking-wider text-[#8b8476]">
                  Immatriculation & Transit Almadies
                </span>
              </div>
              <div>
                <span className="block font-serif-luxury text-xl sm:text-2xl text-[#f3ede4]">24/7</span>
                <span className="font-sans-clean text-[11px] uppercase tracking-wider text-[#8b8476]">
                  Conciergerie Dédiée Sénégal
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Active Flagship Vehicle Teaser Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <div
              id="hero-active-car-card"
              className="relative p-6 sm:p-7 bg-[#14161d]/90 backdrop-blur-md border border-[#272b36] shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#252933] pb-4">
                <div>
                  <span className="text-[10px] uppercase font-sans-clean tracking-[0.25em] text-[#a89679]">
                    Exemplaire Vedette Showroom
                  </span>
                  <h2 className="font-serif-luxury text-2xl text-[#f5f2eb]">
                    {activeCar.brand} {activeCar.model}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="block font-sans-clean text-[10px] uppercase tracking-wider text-[#8a8375]">
                    Statut
                  </span>
                  <span className="inline-block px-2.5 py-1 text-[11px] tracking-wider text-[#4ade80] bg-[#4ade80]/10 rounded-sm">
                    {activeCar.status}
                  </span>
                </div>
              </div>

              {/* Live Mini Specs */}
              <div className="grid grid-cols-3 gap-3 text-center py-2 bg-[#0c0d10]/70 p-3 rounded-sm border border-[#1f222b]">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8a8375] block">Puissance</span>
                  <span className="font-serif-luxury text-lg text-[#e6cb9d]">{activeCar.specs.power.split('/')[0]}</span>
                </div>
                <div className="border-x border-[#1f222b]">
                  <span className="text-[10px] uppercase tracking-wider text-[#8a8375] block">0 - 100 km/h</span>
                  <span className="font-serif-luxury text-lg text-[#e6cb9d]">{activeCar.specs.acceleration.split(' ')[0]}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8a8375] block">V-Max</span>
                  <span className="font-serif-luxury text-lg text-[#e6cb9d]">{activeCar.specs.topSpeed.split(' ')[0]}</span>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8a8375] block">Estimation Exclusive</span>
                  <span className="font-serif-luxury text-base text-[#f0ece3]">{activeCar.priceEstimate}</span>
                </div>
                <button
                  id="hero-inquire-active-car"
                  onClick={() => onOpenContact(`${activeCar.brand} ${activeCar.model}`)}
                  className="px-4 py-2.5 bg-[#20242f] hover:bg-[#c8a46b] text-[#e6cb9d] hover:text-[#0f1013] text-xs uppercase tracking-[0.15em] font-medium transition-colors"
                >
                  Demande Confidentielle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Model Quick-Switch Bar */}
      <div className="relative z-10 border-t border-[#20232d] bg-[#0c0d10]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="font-sans-clean text-[11px] uppercase tracking-[0.2em] text-[#8a8375]">
              Sélection Immédiate :
            </span>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {flagshipVehicles.slice(0, 4).map((car, idx) => (
                <button
                  key={car.id}
                  id={`hero-car-switch-${car.id}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3.5 py-1.5 text-xs font-sans-clean tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                    activeIndex === idx
                      ? 'bg-[#c8a46b] text-[#0f1013] font-semibold shadow-md'
                      : 'bg-[#15171e] text-[#a6a092] hover:text-white hover:bg-[#1f222b] border border-[#232631]'
                  }`}
                >
                  {car.brand} {car.model.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
