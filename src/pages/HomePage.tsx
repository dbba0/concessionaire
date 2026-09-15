import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Compass, Sliders, MapPin, Key, ChevronRight } from 'lucide-react';
import { VEHICLES } from '../data/vehicles';
import { VehiclePlaceholderImage } from '../components/VehiclePlaceholderImage';

export const HomePage: React.FC = () => {
  // Highlight 3 emblematic vehicles for the preview
  const previewVehicles = VEHICLES.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Fullscreen Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-[#090a0d] border-b border-[#1c202a]">
        {/* Ambient atmospheric backdrop */}
        <div className="absolute inset-0 z-0 select-none">
          <div className="w-full h-full bg-gradient-to-br from-[#12141c] via-[#0b0c10] to-[#07080a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#c8a46b]/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Editorial Headline */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#171920]/90 border border-[#c8a46b]/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#c8a46b] animate-pulse" />
                <span className="font-sans-clean text-xs uppercase tracking-[0.25em] text-[#dfbe8d]">
                  Pointe des Almadies • Dakar, Sénégal
                </span>
              </div>

              <div className="space-y-4">
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
                  visite privée face à l’océan Atlantique.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/showroom"
                  className="group flex items-center gap-3 px-7 py-4 bg-[#c8a46b] hover:bg-[#dfbe8d] text-[#0f1013] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl"
                >
                  <span>Explorer le Showroom</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center gap-2 px-6 py-4 border border-[#2b3040] hover:border-[#c8a46b] bg-[#12141c]/80 hover:bg-[#191c26] text-[#dfbe8d] hover:text-white text-xs uppercase tracking-[0.18em] font-sans-clean transition-colors duration-300"
                >
                  <span>Prendre Rendez-vous Privé</span>
                </Link>
              </div>
            </div>

            {/* Right Hero Card: Flagship spotlight */}
            <div className="lg:col-span-5">
              <div className="bg-[#12141c] border border-[#242938] p-5 sm:p-6 shadow-2xl space-y-4 relative">
                <div className="flex items-center justify-between border-b border-[#1f232f] pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c8a46b]">
                    Véhicule Phare du Showroom
                  </span>
                  <span className="text-xs font-sans-clean text-[#7d786d]">
                    Disponible Immédiatement
                  </span>
                </div>

                <VehiclePlaceholderImage
                  expectedPath={VEHICLES[0].exteriorImage}
                  alt={`${VEHICLES[0].brand} ${VEHICLES[0].model}`}
                  viewLabel="Rolls-Royce Cullinan Black Badge • Extérieur"
                  vehicleBrand={VEHICLES[0].brand}
                  vehicleModel={VEHICLES[0].model}
                  accentColor={VEHICLES[0].accentColor}
                  aspectRatio="16/10"
                />

                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif-luxury text-xl text-[#f4efe5]">
                      {VEHICLES[0].brand} {VEHICLES[0].model}
                    </h3>
                    <span className="font-serif-luxury text-sm text-[#e6cb9d]">
                      {VEHICLES[0].priceEstimate}
                    </span>
                  </div>
                  <p className="text-xs text-[#8c8578] line-clamp-2 font-sans-clean">
                    {VEHICLES[0].subTitle}. Finitions artisanales Goodwood et suspension pneumatique prédictive.
                  </p>
                </div>

                <Link
                  to={`/showroom/${VEHICLES[0].slug}`}
                  className="block w-full py-2.5 text-center bg-[#181b24] hover:bg-[#c8a46b] text-[#dfbe8d] hover:text-[#0f1013] border border-[#2e3446] hover:border-[#c8a46b] text-xs uppercase tracking-wider font-sans-clean transition-colors"
                >
                  Consulter la fiche & Configurer ce modèle →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Maison Statement / Valeurs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 sm:p-10 bg-[#101218] border border-[#202431]">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded bg-[#171a23] border border-[#c8a46b]/40 flex items-center justify-center text-[#c8a46b]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-lg text-[#f2ede4]">
              Authenticité & Provenance
            </h3>
            <p className="font-sans-clean text-xs text-[#8f887b] leading-relaxed">
              Tous nos modèles proviennent directement des réseaux d'usine officiels européens (Crewe, Maranello, Goodwood, Sant’Agata), avec traçabilité intégrale et garanties constructeur internationales.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded bg-[#171a23] border border-[#c8a46b]/40 flex items-center justify-center text-[#c8a46b]">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-lg text-[#f2ede4]">
              Personnalisation Atelier
            </h3>
            <p className="font-sans-clean text-xs text-[#8f887b] leading-relaxed">
              Accompagnement sur les programmes de haute personnalisation d'usine (Bespoke Goodwood, Tailor Made Ferrari, Mulliner) pour concevoir un exemplaire rigoureusement unique en Afrique de l'Ouest.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded bg-[#171a23] border border-[#c8a46b]/40 flex items-center justify-center text-[#c8a46b]">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-lg text-[#f2ede4]">
              Conciergerie Privée 24/7
            </h3>
            <p className="font-sans-clean text-xs text-[#8f887b] leading-relaxed">
              Immatriculations diplomatiques et civiles sénégalaises, livraison personnalisée sous housse de satin à Dakar, Saly ou AIBD, et entretien préventif dédié avec véhicules relais.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Aperçu du Showroom */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#212634] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-sans-clean tracking-[0.25em] uppercase text-[#c8a46b] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Collection en Réserve</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#f5f2eb]">
              Aperçu du Showroom des Almadies
            </h2>
          </div>

          <Link
            to="/showroom"
            className="inline-flex items-center gap-2 text-xs font-sans-clean uppercase tracking-wider text-[#c8a46b] hover:text-[#dfbe8d] transition-colors"
          >
            <span>Voir toute la collection ({VEHICLES.length} véhicules)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Grid preview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewVehicles.map((car) => (
            <div
              key={car.id}
              className="bg-[#12141c] border border-[#222735] hover:border-[#c8a46b]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-4 space-y-4">
                <VehiclePlaceholderImage
                  expectedPath={car.exteriorImage}
                  alt={`${car.brand} ${car.model}`}
                  viewLabel={`${car.brand} • Vue Extérieure`}
                  vehicleBrand={car.brand}
                  vehicleModel={car.model}
                  accentColor={car.accentColor}
                  aspectRatio="16/10"
                />

                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#a89679]">
                      {car.brand}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 bg-[#171a23] text-[#8e8779] border border-[#262b37] rounded-xs font-mono">
                      {car.category}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-xl text-[#f4efe5] group-hover:text-[#dfbe8d] transition-colors">
                    {car.model}
                  </h3>

                  <div className="flex items-center justify-between pt-2 border-t border-[#1d212b]">
                    <span className="text-xs text-[#7d786d] font-sans-clean">
                      Prix estimatif
                    </span>
                    <span className="font-serif-luxury text-sm text-[#f0ece4]">
                      {car.priceEstimate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link
                  to={`/showroom/${car.slug}`}
                  className="block w-full py-2.5 text-center bg-[#171a23] hover:bg-[#c8a46b] text-[#dfbe8d] hover:text-[#0f1013] border border-[#272c3b] hover:border-[#c8a46b] text-xs uppercase tracking-wider font-sans-clean transition-colors"
                >
                  Fiche Technique & Configurateur →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-6">
          <Link
            to="/showroom"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#141720] hover:bg-[#c8a46b] text-[#dfbe8d] hover:text-[#0f1013] border border-[#c8a46b]/40 hover:border-[#c8a46b] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
          >
            <span>Explorer les {VEHICLES.length} Véhicules avec Filtres & Fiches Techniques</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Client Journey Banner Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-gradient-to-r from-[#14161f] to-[#0f1117] border border-[#242938] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c8a46b] block">
              Protocole d'Excellence Dakar
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#f4efe5]">
              L'Expérience Client Almadies en trois temps souverains.
            </h2>
            <p className="font-sans-clean text-xs sm:text-sm text-[#9c9587] leading-relaxed max-w-2xl">
              De la consultation confidentielle dans notre maison face à l’océan jusqu’à l’essai panoramique sur la Corniche et la livraison cérémoniale à votre résidence ou salon AIBD.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <Link
              to="/experience"
              className="px-6 py-3.5 bg-[#c8a46b] hover:bg-[#dfbe8d] text-[#0f1013] text-xs uppercase tracking-[0.2em] font-semibold text-center transition-colors shadow-lg"
            >
              Découvrir le Protocole Client
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-transparent border border-[#2b3040] hover:border-[#c8a46b] text-[#dfbe8d] text-xs uppercase tracking-[0.18em] text-center font-sans-clean transition-colors"
            >
              Réserver une Visite Privée
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
