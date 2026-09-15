import React, { useState } from 'react';
import {
  X,
  ArrowLeftRight,
  Zap,
  Gauge,
  Flame,
  Shield,
  ChevronRight,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleComparatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  initialVehicleA: Vehicle;
  onSelectVehicleToConfigure: (vehicle: Vehicle) => void;
  onOpenContactWithComparison: (comparisonSummary: string) => void;
}

export const VehicleComparatorModal: React.FC<VehicleComparatorModalProps> = ({
  isOpen,
  onClose,
  vehicles,
  initialVehicleA,
  onSelectVehicleToConfigure,
  onOpenContactWithComparison,
}) => {
  if (!isOpen) return null;

  // Default vehicle B is the next vehicle or the second in list
  const defaultBIndex = vehicles.findIndex((v) => v.id !== initialVehicleA.id);
  const [vehicleAId, setVehicleAId] = useState<string>(initialVehicleA.id);
  const [vehicleBId, setVehicleBId] = useState<string>(
    vehicles[defaultBIndex >= 0 ? defaultBIndex : 1]?.id || vehicles[0].id
  );

  const vehicleA = vehicles.find((v) => v.id === vehicleAId) || initialVehicleA;
  const vehicleB = vehicles.find((v) => v.id === vehicleBId) || vehicles[1];

  const comparisonSummary = `Comparatif Showroom : ${vehicleA.brand} ${vehicleA.model} (${vehicleA.priceEstimate}) VS ${vehicleB.brand} ${vehicleB.model} (${vehicleB.priceEstimate})`;

  // Helper comparison rows
  const specRows = [
    {
      label: 'Prix indicatif showroom',
      valA: vehicleA.priceEstimate,
      valB: vehicleB.priceEstimate,
      isPrice: true,
    },
    {
      label: 'Catégorie & Carrosserie',
      valA: `${vehicleA.category} (${vehicleA.year})`,
      valB: `${vehicleB.category} (${vehicleB.year})`,
    },
    {
      label: 'Motorisation & Architecture',
      valA: vehicleA.specs.engine,
      valB: vehicleB.specs.engine,
    },
    {
      label: 'Puissance maximale',
      valA: vehicleA.specs.power,
      valB: vehicleB.specs.power,
    },
    {
      label: 'Accélération (0 à 100 km/h)',
      valA: vehicleA.specs.acceleration,
      valB: vehicleB.specs.acceleration,
    },
    {
      label: 'Vitesse de pointe',
      valA: vehicleA.specs.topSpeed,
      valB: vehicleB.specs.topSpeed,
    },
    {
      label: 'Couple moteur maxi',
      valA: vehicleA.specs.torque,
      valB: vehicleB.specs.torque,
    },
    {
      label: 'Boîte de vitesses',
      valA: vehicleA.specs.transmission,
      valB: vehicleB.specs.transmission,
    },
    {
      label: 'Transmission & Motricité',
      valA: vehicleA.specs.drivetrain,
      valB: vehicleB.specs.drivetrain,
    },
    {
      label: 'Carburant / Hybridation',
      valA: vehicleA.specs.fuelOrHybrid,
      valB: vehicleB.specs.fuelOrHybrid,
    },
    {
      label: 'Disponibilité Showroom Dakar',
      valA: vehicleA.status,
      valB: vehicleB.status,
      isStatus: true,
    },
  ];

  return (
    <div
      id="vehicle-comparator-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#07080a]/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        id="vehicle-comparator-modal"
        className="relative w-full max-w-6xl bg-[#0f1117] border border-[#232733] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#212532] bg-[#0c0d12] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1b1e27] border border-[#c8a46b]/40 flex items-center justify-center text-[#c8a46b]">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[#c8a46b]">
                  Atelier d'Arbitrage & Comparaison
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#1a1d26] text-[#a69f91] border border-[#2d313f] rounded-xs font-sans-clean">
                  Showroom Almadies
                </span>
              </div>
              <h3 className="font-serif-luxury text-lg text-[#f5f2eb]">
                Face-à-face Technique et Prestige
              </h3>
            </div>
          </div>

          <button
            id="comparator-close-btn"
            onClick={onClose}
            className="p-2 text-[#9a9385] hover:text-white hover:bg-[#1a1d27] transition-colors rounded-sm cursor-pointer"
            aria-label="Fermer le comparateur"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable Comparison Table */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-grow no-scrollbar">
          {/* Top Vehicle Selectors & Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Vehicle A Box */}
            <div className="bg-[#14161f] border border-[#242836] p-4 sm:p-5 space-y-4 relative">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase tracking-widest text-[#7e786b] font-sans-clean">
                  Véhicule de Référence
                </span>
                <select
                  id="comparator-select-car-a"
                  value={vehicleAId}
                  onChange={(e) => setVehicleAId(e.target.value)}
                  className="bg-[#0b0c10] border border-[#2d3242] text-xs text-[#f0ebe3] px-3 py-1.5 rounded-xs focus:border-[#c8a46b] focus:outline-none cursor-pointer"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.brand} {v.model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Photo */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#07080a] border border-[#1f222d]">
                <img
                  src={vehicleA.exteriorImage}
                  alt={`${vehicleA.brand} ${vehicleA.model}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center brightness-[0.95]"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#0a0b0e]/85 text-[#e6cb9d] border border-[#252834]">
                  {vehicleA.brand}
                </div>
              </div>

              {/* Title & Price */}
              <div className="flex items-end justify-between border-b border-[#20232f] pb-3">
                <div>
                  <h4 className="font-serif-luxury text-xl text-[#f5f2eb]">
                    {vehicleA.model}
                  </h4>
                  <p className="text-xs font-sans-clean text-[#948d7e] italic">
                    {vehicleA.subTitle}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-[#736e63] block">Tarif estimé</span>
                  <span className="font-serif-luxury text-lg text-[#e6cb9d]">
                    {vehicleA.priceEstimate}
                  </span>
                </div>
              </div>

              <button
                id="comparator-choose-a-btn"
                onClick={() => {
                  onSelectVehicleToConfigure(vehicleA);
                  onClose();
                }}
                className="w-full py-2.5 bg-[#c8a46b] hover:bg-[#dfbe8d] text-[#0f1013] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Configurer ce véhicule</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Vehicle B Box */}
            <div className="bg-[#14161f] border border-[#242836] p-4 sm:p-5 space-y-4 relative">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase tracking-widest text-[#7e786b] font-sans-clean">
                  Véhicule Comparé
                </span>
                <select
                  id="comparator-select-car-b"
                  value={vehicleBId}
                  onChange={(e) => setVehicleBId(e.target.value)}
                  className="bg-[#0b0c10] border border-[#2d3242] text-xs text-[#f0ebe3] px-3 py-1.5 rounded-xs focus:border-[#c8a46b] focus:outline-none cursor-pointer"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.brand} {v.model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Photo */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#07080a] border border-[#1f222d]">
                <img
                  src={vehicleB.exteriorImage}
                  alt={`${vehicleB.brand} ${vehicleB.model}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center brightness-[0.95]"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#0a0b0e]/85 text-[#e6cb9d] border border-[#252834]">
                  {vehicleB.brand}
                </div>
              </div>

              {/* Title & Price */}
              <div className="flex items-end justify-between border-b border-[#20232f] pb-3">
                <div>
                  <h4 className="font-serif-luxury text-xl text-[#f5f2eb]">
                    {vehicleB.model}
                  </h4>
                  <p className="text-xs font-sans-clean text-[#948d7e] italic">
                    {vehicleB.subTitle}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-[#736e63] block">Tarif estimé</span>
                  <span className="font-serif-luxury text-lg text-[#e6cb9d]">
                    {vehicleB.priceEstimate}
                  </span>
                </div>
              </div>

              <button
                id="comparator-choose-b-btn"
                onClick={() => {
                  onSelectVehicleToConfigure(vehicleB);
                  onClose();
                }}
                className="w-full py-2.5 bg-[#1b1e28] hover:bg-[#c8a46b] text-[#dfbe8d] hover:text-[#0f1013] border border-[#c8a46b]/40 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Configurer ce véhicule</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Comparative Specifications Matrix Table */}
          <div className="bg-[#12141c] border border-[#212533] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#212533] bg-[#0c0e13] flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-sans-clean text-[#c8a46b] flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Tableau comparatif officiel des caractéristiques</span>
              </span>
              <span className="text-[11px] text-[#7d786d]">Données certifiées constructeurs</span>
            </div>

            <div className="divide-y divide-[#1b1f2a] text-xs font-sans-clean">
              {specRows.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 p-3 sm:px-5 hover:bg-[#161822] transition-colors"
                >
                  {/* Row Label */}
                  <div className="md:col-span-4 text-[#8a8477] font-medium flex items-center py-1">
                    {row.label}
                  </div>

                  {/* Vehicle A Spec */}
                  <div
                    className={`md:col-span-4 py-1 pr-4 ${
                      row.isPrice
                        ? 'font-serif-luxury text-sm text-[#e6cb9d]'
                        : row.isStatus
                        ? 'text-[#4ade80] font-medium'
                        : 'text-[#f0ebe3]'
                    }`}
                  >
                    <span className="md:hidden text-[10px] text-[#716c61] uppercase tracking-wider block">
                      {vehicleA.model} :
                    </span>
                    {row.valA}
                  </div>

                  {/* Vehicle B Spec */}
                  <div
                    className={`md:col-span-4 py-1 ${
                      row.isPrice
                        ? 'font-serif-luxury text-sm text-[#e6cb9d]'
                        : row.isStatus
                        ? 'text-[#4ade80] font-medium'
                        : 'text-[#f0ebe3]'
                    }`}
                  >
                    <span className="md:hidden text-[10px] text-[#716c61] uppercase tracking-wider block">
                      {vehicleB.model} :
                    </span>
                    {row.valB}
                  </div>
                </div>
              ))}

              {/* Key Features Comparison Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 p-4 sm:px-5 bg-[#0f1118]">
                <div className="md:col-span-4 text-[#8a8477] font-medium py-1">
                  Équipements signatures majeurs
                </div>

                {/* Key features A */}
                <div className="md:col-span-4 py-1 pr-4 space-y-1.5">
                  <span className="md:hidden text-[10px] text-[#716c61] uppercase tracking-wider block mb-1">
                    {vehicleA.model} :
                  </span>
                  {vehicleA.keyFeatures.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#b4ada1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8a46b] mt-1.5 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Key features B */}
                <div className="md:col-span-4 py-1 space-y-1.5">
                  <span className="md:hidden text-[10px] text-[#716c61] uppercase tracking-wider block mb-1">
                    {vehicleB.model} :
                  </span>
                  {vehicleB.keyFeatures.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#b4ada1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8a46b] mt-1.5 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 border-t border-[#212532] bg-[#0c0d12] flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <p className="text-xs text-[#8a8477] text-center sm:text-left">
            Besoin d’un arbitrage personnalisé ? Notre directeur de concession vous reçoit en salon privé aux Almadies.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="comparator-request-both-btn"
              onClick={() => {
                onOpenContactWithComparison(comparisonSummary);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#c8a46b] hover:bg-[#dfbe8d] text-[#0f1013] text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer"
            >
              Demander une consultation comparative
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 border border-[#2a2e3d] text-[#9a9385] hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
