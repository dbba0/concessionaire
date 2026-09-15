import React, { useState, useEffect } from 'react';
import {
  Gauge,
  Zap,
  Flame,
  Shield,
  Layers,
  ChevronRight,
  Eye,
  Sparkles,
  MessageSquare,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { Vehicle, ColorOption } from '../types';

interface ConfiguratorProps {
  vehicles: Vehicle[];
  selectedVehicleId?: string;
  onOpenContactWithCar: (carSummary: string) => void;
  onOpenWhatsAppWithCar: (carSummary: string) => void;
}

export const Configurator: React.FC<ConfiguratorProps> = ({
  vehicles,
  selectedVehicleId,
  onOpenContactWithCar,
  onOpenWhatsAppWithCar,
}) => {
  const [currentCarIndex, setCurrentCarIndex] = useState<number>(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'exterior' | 'interior' | 'detail'>('exterior');
  const [imageLoaded, setImageLoaded] = useState<boolean>(true);

  // Sync if parent passes a specific car ID
  useEffect(() => {
    if (selectedVehicleId) {
      const idx = vehicles.findIndex((v) => v.id === selectedVehicleId);
      if (idx !== -1) {
        setCurrentCarIndex(idx);
        setSelectedColorIndex(0);
        setViewMode('exterior');
      }
    }
  }, [selectedVehicleId, vehicles]);

  const car = vehicles[currentCarIndex] || vehicles[0];
  const activeColor = car.colors[selectedColorIndex] || car.colors[0];

  // Determine which real image to show based on view mode and selected color
  const displayedImage =
    viewMode === 'interior'
      ? car.interiorImage
      : viewMode === 'detail'
      ? car.detailImage || car.rearImage || car.exteriorImage
      : activeColor.image;

  const handleCarChange = (index: number) => {
    setImageLoaded(false);
    setCurrentCarIndex(index);
    setSelectedColorIndex(0);
    setViewMode('exterior');
  };

  const handleColorChange = (index: number) => {
    setImageLoaded(false);
    setSelectedColorIndex(index);
    setViewMode('exterior');
  };

  const configurationSummary = `${car.brand} ${car.model} - Teinte ${activeColor.name} (${activeColor.finish})`;

  return (
    <section
      id="configurator"
      className="py-24 bg-[#0d0e12] border-t border-[#1e212b] relative overflow-hidden"
    >
      {/* Subtle Background Lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[150px] pointer-events-none opacity-15"
        style={{ backgroundColor: car.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#232733] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-sans-clean tracking-[0.25em] uppercase text-[#c8a46b] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Atelier Privé & Personnalisation</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#f5f2eb]">
              Configurateur Showroom
            </h2>
          </div>
          <p className="font-sans-clean text-sm text-[#9c9587] max-w-md">
            Visualisez les teintes réelles, examinez les habitacles et consultez les fiches
            techniques officielles certifiées par nos experts aux Almadies.
          </p>
        </div>

        {/* Vehicle Selection Carousel / Pills */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] font-sans-clean text-[#7a7467]">
              1. Sélectionner l'Automobile ({vehicles.length} modèles disponibles)
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {vehicles.map((v, idx) => (
              <button
                key={v.id}
                id={`config-select-model-${v.id}`}
                onClick={() => handleCarChange(idx)}
                className={`flex-shrink-0 px-4 py-3 border text-left transition-all cursor-pointer ${
                  currentCarIndex === idx
                    ? 'border-[#c8a46b] bg-[#1a1d25] shadow-lg text-white'
                    : 'border-[#222631] bg-[#121419]/70 text-[#938e82] hover:border-[#383d4e] hover:text-white'
                }`}
              >
                <span className="block text-[10px] uppercase tracking-widest text-[#a89679]">
                  {v.brand}
                </span>
                <span className="block font-serif-luxury text-sm whitespace-nowrap">
                  {v.model}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Stage (Asymmetrical 2-Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Real Photo Stage with View Toggles (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative bg-[#13151b] border border-[#232733] p-4 sm:p-6 shadow-2xl rounded-sm group overflow-hidden">
              {/* Brand Watermark / Accent */}
              <div className="absolute top-5 left-6 z-10 flex items-center gap-3">
                <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-[#0a0b0e]/80 border border-[#2b2f3d] text-[#e6cb9d] backdrop-blur-sm">
                  {car.category}
                </span>
                <span className="text-xs font-sans-clean text-[#7e786b] tracking-wider">
                  Année {car.year}
                </span>
              </div>

              {/* View Angle Switcher */}
              <div className="absolute top-5 right-6 z-10 flex items-center bg-[#0a0b0e]/85 border border-[#2a2e3b] p-1 backdrop-blur-sm">
                <button
                  id="view-exterior-btn"
                  onClick={() => setViewMode('exterior')}
                  className={`px-3 py-1 text-[11px] uppercase tracking-wider font-sans-clean transition-colors cursor-pointer ${
                    viewMode === 'exterior'
                      ? 'bg-[#c8a46b] text-[#0f1013] font-semibold'
                      : 'text-[#9c9587] hover:text-white'
                  }`}
                >
                  Extérieur
                </button>
                <button
                  id="view-interior-btn"
                  onClick={() => setViewMode('interior')}
                  className={`px-3 py-1 text-[11px] uppercase tracking-wider font-sans-clean transition-colors cursor-pointer ${
                    viewMode === 'interior'
                      ? 'bg-[#c8a46b] text-[#0f1013] font-semibold'
                      : 'text-[#9c9587] hover:text-white'
                  }`}
                >
                  Habitacle
                </button>
                <button
                  id="view-detail-btn"
                  onClick={() => setViewMode('detail')}
                  className={`px-3 py-1 text-[11px] uppercase tracking-wider font-sans-clean transition-colors cursor-pointer ${
                    viewMode === 'detail'
                      ? 'bg-[#c8a46b] text-[#0f1013] font-semibold'
                      : 'text-[#9c9587] hover:text-white'
                  }`}
                >
                  Détail / Profil
                </button>
              </div>

              {/* Vehicle Photograph Display */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#090a0d] mt-10 sm:mt-12 flex items-center justify-center">
                <img
                  key={displayedImage}
                  src={displayedImage}
                  alt={`${car.brand} ${car.model} - ${activeColor.name}`}
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover object-center transition-all duration-700 ${
                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-40 scale-95 blur-sm'
                  }`}
                />

                {/* Subtle vignette border inside frame */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#13151b] via-transparent to-transparent opacity-60" />
              </div>

              {/* Color Swatch Selector (Active only in exterior mode) */}
              <div className="pt-5 border-t border-[#20232c] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean text-[#787265] block">
                    2. Nuancier Carrosserie
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-serif-luxury text-sm text-[#f0ebe3]">
                      {activeColor.name}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 bg-[#1b1e26] text-[#b0a89a] border border-[#2b2f3b] rounded-xs font-sans-clean">
                      Finition {activeColor.finish}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {car.colors.map((c, cIdx) => (
                    <button
                      key={c.name}
                      id={`color-swatch-${cIdx}`}
                      onClick={() => handleColorChange(cIdx)}
                      title={`${c.name} (${c.finish})`}
                      className={`relative w-8 h-8 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
                        selectedColorIndex === cIdx
                          ? 'scale-110 ring-2 ring-[#c8a46b] ring-offset-2 ring-offset-[#13151b]'
                          : 'opacity-80 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.code }}
                    >
                      {selectedColorIndex === cIdx && (
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            c.code === '#f0f2f5' || c.code === '#eae6de' || c.code === '#eaecee'
                              ? 'text-[#0f1013]'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Signature Features List */}
            <div className="bg-[#101217] border border-[#20232d] p-6 space-y-4">
              <h3 className="font-serif-luxury text-lg text-[#f0ebe3] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#c8a46b]" />
                <span>Spécificités & Équipements Clés</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans-clean text-[#a8a294]">
                {car.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a46b] mt-1.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Live Certified Technical Sheet (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#14161e] border border-[#262a36] p-6 sm:p-7 space-y-6 shadow-2xl">
              <div>
                <span className="text-[10px] uppercase font-sans-clean tracking-[0.25em] text-[#c8a46b] block mb-1">
                  Fiche Technique Officielle
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f5f2eb]">
                  {car.brand} {car.model}
                </h3>
                <p className="font-sans-clean text-xs text-[#9a9385] mt-1.5 italic">
                  {car.subTitle}
                </p>
              </div>

              {/* Key Hero Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 border-y border-[#232733] py-4">
                <div className="text-center">
                  <span className="text-[10px] uppercase tracking-wider text-[#797467] block">
                    Puissance
                  </span>
                  <span className="font-serif-luxury text-xl sm:text-2xl text-[#e6cb9d]">
                    {car.specs.power.split('/')[0]}
                  </span>
                </div>
                <div className="text-center border-x border-[#232733]">
                  <span className="text-[10px] uppercase tracking-wider text-[#797467] block">
                    0 à 100 km/h
                  </span>
                  <span className="font-serif-luxury text-xl sm:text-2xl text-[#e6cb9d]">
                    {car.specs.acceleration.split(' ')[0]}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] uppercase tracking-wider text-[#797467] block">
                    Vitesse Max
                  </span>
                  <span className="font-serif-luxury text-xl sm:text-2xl text-[#e6cb9d]">
                    {car.specs.topSpeed.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Granular Technical Specifications Table */}
              <div className="space-y-3 font-sans-clean text-xs">
                <div className="flex justify-between py-2 border-b border-[#1d2029]">
                  <span className="text-[#837e72]">Motorisation</span>
                  <span className="text-[#e8e4db] font-medium text-right max-w-[65%]">
                    {car.specs.engine}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#1d2029]">
                  <span className="text-[#837e72]">Couple Maxi</span>
                  <span className="text-[#e8e4db] font-medium">{car.specs.torque}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#1d2029]">
                  <span className="text-[#837e72]">Transmission</span>
                  <span className="text-[#e8e4db] font-medium text-right max-w-[65%]">
                    {car.specs.transmission}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#1d2029]">
                  <span className="text-[#837e72]">Architecture 4RM</span>
                  <span className="text-[#e8e4db] font-medium text-right max-w-[65%]">
                    {car.specs.drivetrain}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#1d2029]">
                  <span className="text-[#837e72]">Disponibilité Almadies</span>
                  <span className="text-[#4ade80] font-medium">{car.status}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#837e72]">Estimation acquisition</span>
                  <span className="font-serif-luxury text-sm text-[#e6cb9d]">
                    {car.priceEstimate}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  id="config-reserve-appointment-btn"
                  onClick={() => onOpenContactWithCar(configurationSummary)}
                  className="w-full py-4 bg-[#c8a46b] hover:bg-[#dfbe8d] text-[#0f1013] text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Réserver cet exemplaire</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  id="config-whatsapp-inquiry-btn"
                  onClick={() => onOpenWhatsAppWithCar(configurationSummary)}
                  className="w-full py-3.5 border border-[#2a683e]/50 hover:border-[#388551] bg-[#14231b]/80 hover:bg-[#192f23] text-[#7ee79d] text-xs uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#4ade80]" />
                  <span>Échanger via WhatsApp Concierge</span>
                </button>
              </div>

              <div className="p-3 bg-[#0f1116] border border-[#1e222c] rounded-xs text-[11px] text-[#868074] leading-relaxed">
                * Chaque véhicule de notre showroom aux Almadies bénéficie de l'homologation
                complète, de l'assistance garantie constructeur internationale et de la prise en
                charge administrative par notre cellule consulaire.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
