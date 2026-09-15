import React, { useState } from 'react';
import {
  X,
  Shield,
  Gauge,
  Zap,
  Flame,
  Check,
  Calendar,
  MessageSquare,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onOpenContactWithCar: (carSummary: string) => void;
  onOpenWhatsAppWithCar: (carSummary: string) => void;
  onGoToConfigurator: (vehicle: Vehicle) => void;
}

export const VehicleModal: React.FC<VehicleModalProps> = ({
  vehicle,
  onClose,
  onOpenContactWithCar,
  onOpenWhatsAppWithCar,
  onGoToConfigurator,
}) => {
  if (!vehicle) return null;

  const [activeImage, setActiveImage] = useState<string>(vehicle.exteriorImage);

  const imagesList = [
    { label: 'Vue Extérieure Principale', url: vehicle.exteriorImage },
    { label: 'Habitacle & Sellerie', url: vehicle.interiorImage },
    ...(vehicle.detailImage ? [{ label: 'Profil / Finition', url: vehicle.detailImage }] : []),
    ...(vehicle.rearImage ? [{ label: 'Vue Arrière / Nuance', url: vehicle.rearImage }] : []),
  ];

  const carSummary = `${vehicle.brand} ${vehicle.model} (${vehicle.year})`;

  return (
    <div
      id="vehicle-inspection-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#07080a]/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        id="vehicle-inspection-modal-card"
        className="relative w-full max-w-5xl bg-[#111319] border border-[#262a37] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#212532] bg-[#0d0e12]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: vehicle.accentColor }} />
            <span className="font-mono text-xs uppercase tracking-widest text-[#c8a46b]">
              {vehicle.brand}
            </span>
            <span className="text-xs text-[#7e786c]">/ Dossier d'homologation</span>
          </div>

          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-1.5 text-[#9a9385] hover:text-white hover:bg-[#1a1d27] transition-colors rounded-sm cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Image Viewer (7 cols) */}
          <div className="lg:col-span-7 bg-[#0a0b0e] p-6 flex flex-col justify-between space-y-4">
            {/* Active Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#20232e] bg-[#07080a]">
              <img
                src={activeImage}
                alt={`${vehicle.brand} ${vehicle.model}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              <div className="absolute top-3 right-3 px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-[#0a0b0e]/80 text-[#e6cb9d] border border-[#232733] backdrop-blur-sm">
                Photo Réelle Certifiée
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {imagesList.map((img, i) => (
                <button
                  key={i}
                  id={`modal-thumb-${i}`}
                  onClick={() => setActiveImage(img.url)}
                  className={`relative aspect-[16/10] overflow-hidden border transition-all cursor-pointer ${
                    activeImage === img.url
                      ? 'border-[#c8a46b] ring-1 ring-[#c8a46b]'
                      : 'border-[#20242e] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-[#07080a]/80 text-[8px] uppercase tracking-wider text-[#b8b2a5] py-0.5 px-1 truncate block text-center">
                    {img.label.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

            <div className="text-[11px] text-[#7a7467] italic pt-2">
              * Photographies authentiques sous licence libre (Wikimedia Commons). Véhicule inspecté et
              homologué selon le protocole de conformité Almadies Prestige Motors.
            </div>
          </div>

          {/* Right Column: Specifications & Actions (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-[#111319] border-t lg:border-t-0 lg:border-l border-[#212532]">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#a89679] block">
                  {vehicle.category} • {vehicle.year}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f5f2eb]">
                  {vehicle.model}
                </h3>
                <p className="font-sans-clean text-xs text-[#9c9587] mt-1.5 leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Status & Price Pill */}
              <div className="flex items-center justify-between p-3 bg-[#171922] border border-[#252936]">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7e796e] block">
                    Statut Showroom
                  </span>
                  <span className="text-xs text-[#4ade80] font-medium">{vehicle.status}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#7e796e] block">
                    Estimation
                  </span>
                  <span className="font-serif-luxury text-sm text-[#e6cb9d]">
                    {vehicle.priceEstimate}
                  </span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2 border-y border-[#202431] py-4 text-xs font-sans-clean">
                <div className="flex justify-between">
                  <span className="text-[#807b70]">Motorisation :</span>
                  <span className="text-[#eeeae2] font-medium text-right max-w-[60%]">
                    {vehicle.specs.engine}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#807b70]">Puissance certifiée :</span>
                  <span className="text-[#e6cb9d] font-semibold">{vehicle.specs.power}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#807b70]">0 à 100 km/h :</span>
                  <span className="text-[#e6cb9d] font-semibold">{vehicle.specs.acceleration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#807b70]">Vitesse de pointe :</span>
                  <span className="text-[#e6cb9d] font-semibold">{vehicle.specs.topSpeed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#807b70]">Transmission :</span>
                  <span className="text-[#eeeae2] text-right max-w-[60%]">
                    {vehicle.specs.transmission}
                  </span>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#7e786b] block">
                  Points Remarquables :
                </span>
                <ul className="space-y-1.5 text-xs text-[#a39c8f]">
                  {vehicle.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8a46b] mt-1 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4">
              <button
                id="modal-reserve-btn"
                onClick={() => {
                  onClose();
                  onOpenContactWithCar(carSummary);
                }}
                className="w-full py-3.5 bg-[#c8a46b] hover:bg-[#dfbe8d] text-[#0f1013] text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Demander un essai / Visite privée</span>
              </button>

              <button
                id="modal-whatsapp-btn"
                onClick={() => onOpenWhatsAppWithCar(carSummary)}
                className="w-full py-3 border border-[#2a683e]/50 hover:border-[#388551] bg-[#14231b]/80 hover:bg-[#192f23] text-[#7ee79d] text-xs uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#4ade80]" />
                <span>Contacter par WhatsApp</span>
              </button>

              <button
                id="modal-configure-btn"
                onClick={() => {
                  onClose();
                  onGoToConfigurator(vehicle);
                }}
                className="w-full py-2.5 text-center text-xs uppercase tracking-wider text-[#9f988b] hover:text-white transition-colors cursor-pointer"
              >
                Personnaliser dans l'Atelier Nuancier →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
