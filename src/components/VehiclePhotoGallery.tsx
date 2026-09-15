import React, { useState } from 'react';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { Vehicle, VehicleGalleryItem } from '../types';

interface VehiclePhotoGalleryProps {
  vehicle: Vehicle;
}

export const VehiclePhotoGallery: React.FC<VehiclePhotoGalleryProps> = ({ vehicle }) => {
  // Build items from gallery or fallback from vehicle images
  const items: VehicleGalleryItem[] =
    vehicle.gallery && vehicle.gallery.length > 0
      ? vehicle.gallery
      : [
          {
            id: 'default-ext',
            title: 'Ligne Extérieure Principale',
            url: vehicle.exteriorImage,
            caption: `Présentation showroom du modèle ${vehicle.brand} ${vehicle.model}.`,
            category: 'Extérieur',
          },
          {
            id: 'default-int',
            title: 'Habitacle & Sellerie Haute Couture',
            url: vehicle.interiorImage,
            caption: 'Matériaux nobles, finitions artisanales et confort d’exception.',
            category: 'Habitacle',
          },
          ...(vehicle.detailImage
            ? [
                {
                  id: 'default-detail',
                  title: 'Finitions de Haute Précision & Jantes',
                  url: vehicle.detailImage,
                  caption: 'Détails aérodynamiques et signature constructeur.',
                  category: 'Détails' as const,
                },
              ]
            : []),
          ...(vehicle.rearImage
            ? [
                {
                  id: 'default-rear',
                  title: 'Poupe & Signature Lumineuse Arrière',
                  url: vehicle.rearImage,
                  caption: 'Ligne arrière musclée et diffuseur.',
                  category: 'Extérieur' as const,
                },
              ]
            : []),
        ];

  const categories = ['Toutes', 'Extérieur', 'Habitacle', 'Moteur V12', 'Détails'];
  const [activeCategory, setActiveCategory] = useState<string>('Toutes');
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const filteredItems =
    activeCategory === 'Toutes'
      ? items
      : items.filter((item) => item.category === activeCategory);

  const currentItem = filteredItems[activeIdx] || filteredItems[0] || items[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIdx((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#212634] pb-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c8a46b]">
            <Camera className="w-3.5 h-3.5" />
            <span>Galerie Photographique Officielle</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#f4efe5]">
            Prises de Vues Showroom & Détails Haute Définition
          </h2>
          <p className="font-sans-clean text-xs text-[#9c9587]">
            {items.length} photographies exclusives certifiées du modèle en présentation à Dakar.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const count =
              cat === 'Toutes'
                ? items.length
                : items.filter((it) => it.category === cat).length;
            if (count === 0 && cat !== 'Toutes') return null;

            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveIdx(0);
                }}
                className={`px-3 py-1.5 text-xs font-sans-clean tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#c8a46b] text-[#0f1013] font-semibold shadow'
                    : 'bg-[#12141c] hover:bg-[#1c202d] text-[#9a9385] border border-[#232736]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Cinematic Feature Stage */}
      {currentItem && (
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#0a0b0e] border border-[#212533] shadow-2xl group">
          <img
            src={currentItem.url}
            alt={currentItem.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Top Badges */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
            <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1 bg-[#0b0d13]/85 backdrop-blur-md border border-[#272c3d] text-xs font-mono text-[#e6cb9d]">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: vehicle.accentColor || '#c8a46b' }}
              />
              <span>{currentItem.category}</span>
              <span className="text-[#6d6657]">•</span>
              <span className="text-[#9e9788]">
                {activeIdx + 1} / {filteredItems.length}
              </span>
            </div>

            <button
              onClick={() => setLightboxOpen(true)}
              className="pointer-events-auto p-2 bg-[#0b0d13]/85 hover:bg-[#c8a46b] text-[#d6cfc3] hover:text-[#0b0d13] border border-[#272c3d] backdrop-blur-md transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-sans-clean"
              title="Agrandir en plein écran"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Plein Écran HD</span>
            </button>
          </div>

          {/* Navigation Arrows */}
          {filteredItems.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-[#0b0d13]/70 hover:bg-[#c8a46b] text-white hover:text-[#0b0d13] border border-[#272c3d] backdrop-blur-md transition-all opacity-80 hover:opacity-100 cursor-pointer"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[#0b0d13]/70 hover:bg-[#c8a46b] text-white hover:text-[#0b0d13] border border-[#272c3d] backdrop-blur-md transition-all opacity-80 hover:opacity-100 cursor-pointer"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Bottom Caption Overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/80 to-transparent p-4 sm:p-6 space-y-1">
            <h3 className="font-serif-luxury text-lg sm:text-xl text-[#f4efe5]">
              {currentItem.title}
            </h3>
            <p className="font-sans-clean text-xs text-[#b0a89a] max-w-3xl">
              {currentItem.caption}
            </p>
          </div>
        </div>
      )}

      {/* Interactive Thumbnail Ribbon */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2">
        {filteredItems.map((item, idx) => (
          <button
            key={item.id || idx}
            onClick={() => setActiveIdx(idx)}
            className={`relative aspect-[16/10] overflow-hidden border transition-all cursor-pointer group/thumb ${
              activeIdx === idx
                ? 'border-[#c8a46b] ring-2 ring-[#c8a46b]/40 shadow-lg'
                : 'border-[#1f2330] opacity-60 hover:opacity-100 hover:border-[#383d4e]'
            }`}
          >
            <img
              src={item.url}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 inset-x-0 bg-[#07080a]/85 px-1 py-0.5 text-[9px] font-mono text-[#c8a46b] truncate text-center">
              {item.category}
            </div>
          </button>
        ))}
      </div>

      {/* Fullscreen HD Lightbox Modal */}
      {lightboxOpen && currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07080b]/95 backdrop-blur-lg p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#222736]">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#c8a46b]">
                  {vehicle.brand} {vehicle.model} • {currentItem.category}
                </span>
                <h4 className="font-serif-luxury text-lg text-[#f4efe5]">
                  {currentItem.title}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#8a8376]">
                  {activeIdx + 1} / {filteredItems.length}
                </span>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="p-2 bg-[#141620] hover:bg-[#202534] text-[#a1998c] hover:text-white border border-[#2b3040] transition-colors cursor-pointer"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Main Image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[70vh] my-4 overflow-hidden border border-[#212635] bg-[#050608] flex items-center justify-center">
              <img
                src={currentItem.url}
                alt={currentItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
              />

              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-[#0d0f15]/80 hover:bg-[#c8a46b] text-white hover:text-[#0d0f15] border border-[#262b3a] transition-colors cursor-pointer"
                    aria-label="Précédent"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-[#0d0f15]/80 hover:bg-[#c8a46b] text-white hover:text-[#0d0f15] border border-[#262b3a] transition-colors cursor-pointer"
                    aria-label="Suivant"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Footer Caption */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-[#222736] text-xs font-sans-clean text-[#9f988b]">
              <p>{currentItem.caption}</p>
              <span className="text-[10px] font-mono text-[#6e685c] flex-shrink-0">
                Almadies Prestige Motors • Document Haute Résolution
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
