import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowLeftRight,
  CheckCircle2,
  Sliders,
  CheckSquare,
  Square,
  Share2,
  Check,
  Send,
  MessageSquare,
  Phone,
  Info,
} from 'lucide-react';
import { Vehicle, ColorOption, PaintFinish, PaintShade } from '../types';
import { VehicleComparatorModal } from './VehicleComparatorModal';
import { VehiclePlaceholderImage } from './VehiclePlaceholderImage';
import CarColorizer from './CarColorizer';

const FINISH_ORDER: PaintFinish[] = ['brillant', 'metallise', 'mat'];

const FINISH_LABELS: Record<PaintFinish, { label: string; italian: string }> = {
  brillant: { label: 'Brillant', italian: 'Solido' },
  metallise: { label: 'Métallisé', italian: 'Metallizzato' },
  mat: { label: 'Mat', italian: 'Opaco' },
};

const LEGACY_FINISH: Record<ColorOption['finish'], PaintFinish> = {
  Brillant: 'brillant',
  Métallisé: 'metallise',
  Satiné: 'mat',
  Bicolore: 'brillant',
};

// Normalise les deux formats de données : `paints` (teinte × finition) ou
// l'ancienne liste plate `colors`, où chaque couleur n'a qu'une finition.
const getShades = (v: Vehicle): PaintShade[] =>
  v.paints ??
  (v.colors ?? []).map((c) => ({
    id: c.name,
    name: c.name,
    variants: [{ finish: LEGACY_FINISH[c.finish], name: c.name, code: c.code }],
  }));

const isLightColor = (hex: string): boolean => {
  const m = hex.replace('#', '');
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 186;
};

// Rendu de la pastille selon la finition (reflet miroir, halo diffus, ou aplat).
const swatchSheen = (finish: PaintFinish): string | undefined =>
  finish === 'brillant'
    ? 'radial-gradient(circle at 30% 26%, rgba(255,255,255,0.7), rgba(255,255,255,0) 22%)'
    : finish === 'metallise'
    ? 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35), rgba(255,255,255,0.06) 50%, transparent 70%)'
    : undefined;

interface ConfiguratorProps {
  vehicles?: Vehicle[];
  vehicle?: Vehicle; // If passed directly (e.g. on dedicated /showroom/:slug page)
  selectedVehicleId?: string;
  onOpenContactWithCar?: (carSummary: string) => void;
  onOpenWhatsAppWithCar?: (carSummary: string) => void;
  showModelSelector?: boolean;
}

export const Configurator: React.FC<ConfiguratorProps> = ({
  vehicles = [],
  vehicle: directVehicle,
  selectedVehicleId,
  onOpenContactWithCar,
  onOpenWhatsAppWithCar,
  showModelSelector = true,
}) => {
  // Determine list of available vehicles
  const vehicleList = vehicles.length > 0 ? vehicles : directVehicle ? [directVehicle] : [];

  const [currentCarIndex, setCurrentCarIndex] = useState<number>(0);

  // BUG FIX: State 1: selectedColorIndex is strictly isolated for the exterior paint
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  // Finition de peinture, axe indépendant de la teinte
  const [selectedFinish, setSelectedFinish] = useState<PaintFinish>(() => {
    const first = directVehicle || vehicles[0];
    return first ? getShades(first)[0]?.variants[0]?.finish ?? 'brillant' : 'brillant';
  });

  // BUG FIX: State 2: viewMode is strictly isolated for the camera angle / tab
  const [viewMode, setViewMode] = useState<'exterior' | 'interior' | 'detail'>('exterior');

  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [isComparatorOpen, setIsComparatorOpen] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Paint animation states
  const [isPainting, setIsPainting] = useState<boolean>(false);
  const [paintColorCode, setPaintColorCode] = useState<string>('#c8a46b');
  const [paintKey, setPaintKey] = useState<number>(0);

  // Real mask availability check: strictly pass undefined if no actual mask file exists on the project
  const [realMaskSrc, setRealMaskSrc] = useState<string | undefined>(undefined);

  // Synchronize if directVehicle is passed
  useEffect(() => {
    if (directVehicle) {
      const idx = vehicleList.findIndex((v) => v.id === directVehicle.id || v.slug === directVehicle.slug);
      if (idx !== -1) {
        setCurrentCarIndex(idx);
      }
    } else if (selectedVehicleId) {
      const idx = vehicleList.findIndex((v) => v.id === selectedVehicleId || v.slug === selectedVehicleId);
      if (idx !== -1 && idx !== currentCarIndex) {
        setCurrentCarIndex(idx);
        setSelectedColorIndex(0);
        setSelectedFinish(getShades(vehicleList[idx])[0]?.variants[0]?.finish ?? 'brillant');
        setSelectedOptionIds([]);
        setViewMode('exterior');
      }
    }
  }, [directVehicle, selectedVehicleId, vehicleList]);

  const car = directVehicle || vehicleList[currentCarIndex] || vehicleList[0];
  if (!car) return null;

  // Probes whether a real mask PNG file actually exists in /public/images/masks/<slug>-mask.png
  // If not found (or error), strictly sets realMaskSrc to undefined so CarColorizer leaves the photo completely untouched.
  useEffect(() => {
    let isMounted = true;
    const candidatePath = car.maskImage || `/images/masks/${car.slug}-mask.png`;

    const probe = new Image();
    probe.onload = () => {
      if (isMounted) setRealMaskSrc(candidatePath);
    };
    probe.onerror = () => {
      if (isMounted) setRealMaskSrc(undefined);
    };
    probe.src = candidatePath;

    return () => {
      isMounted = false;
    };
  }, [car.maskImage, car.slug]);

  const shades = getShades(car);
  const hasFinishSelector = !!car.paints;
  const availableFinishes = FINISH_ORDER.filter((f) =>
    shades.some((s) => s.variants.some((v) => v.finish === f))
  );
  const isShadeAvailable = (shade: PaintShade) =>
    !hasFinishSelector || shade.variants.some((v) => v.finish === selectedFinish);
  const variantFor = (shade: PaintShade) =>
    shade.variants.find((v) => v.finish === selectedFinish) || shade.variants[0];

  const activeShade = shades[selectedColorIndex] || shades[0];
  const activeColor = variantFor(activeShade);
  const activeFinishLabel = hasFinishSelector
    ? FINISH_LABELS[activeColor.finish].label
    : car.colors?.[selectedColorIndex]?.finish ?? '';

  // Dynamic price calculation
  const selectedOptionsList = car.options.filter((opt) =>
    selectedOptionIds.includes(opt.id)
  );

  const optionsTotalFCFA = selectedOptionsList.reduce(
    (acc, opt) => acc + opt.priceFCFA,
    0
  );

  const calculatedTotalPriceFCFA = (car.basePriceFCFA || 0) + optionsTotalFCFA;

  const formatPrice = (amount: number): string => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  // Car model switch handler
  const handleCarChange = (index: number) => {
    if (index === currentCarIndex) return;
    setCurrentCarIndex(index);
    setSelectedColorIndex(0);
    setSelectedFinish(getShades(vehicleList[index])[0]?.variants[0]?.finish ?? 'brillant');
    setSelectedOptionIds([]);
    // Do NOT reset viewMode forcibly if user is comparing interiors, or keep it graceful
    setViewMode('exterior');
  };

  // CRITICAL BUG FIX & PAINT ANIMATION:
  // Selecting a color ONLY updates selectedColorIndex and triggers the diagonal paint sweep.
  // It NEVER touches or mutates viewMode (the active tab remains unchanged).
  const triggerPaintTransition = (code: string) => {
    // If user selects a paint color from another tab (interior or detail), switch smoothly to exterior
    if (viewMode !== 'exterior') {
      setViewMode('exterior');
    }

    setPaintColorCode(code);
    setIsPainting(true);
    setPaintKey((prev) => prev + 1);

    setTimeout(() => {
      setIsPainting(false);
    }, 560);
  };

  const handleColorChange = (index: number) => {
    const shade = shades[index];
    if (index === selectedColorIndex || !shade || !isShadeAvailable(shade)) return;

    setSelectedColorIndex(index);
    triggerPaintTransition(variantFor(shade).code);
  };

  // Changer de finition garde la teinte si elle existe dans cette finition,
  // sinon bascule sur la première teinte disponible.
  const handleFinishChange = (finish: PaintFinish) => {
    if (finish === selectedFinish) return;

    const hasFinish = (s: PaintShade) => s.variants.some((v) => v.finish === finish);
    const index = hasFinish(shades[selectedColorIndex])
      ? selectedColorIndex
      : shades.findIndex(hasFinish);
    if (index === -1) return;

    setSelectedFinish(finish);
    setSelectedColorIndex(index);
    triggerPaintTransition(shades[index].variants.find((v) => v.finish === finish)!.code);
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptionIds((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const optionsText =
    selectedOptionsList.length > 0
      ? ` | Options : ${selectedOptionsList.map((o) => o.name).join(', ')}`
      : ' (Équipement de série)';

  const configurationSummary = `${car.brand} ${car.model} (${car.year}) - Teinte ${activeColor.name} [${activeFinishLabel}]${optionsText} - Total : ${formatPrice(calculatedTotalPriceFCFA)}`;

  const handleContactClick = () => {
    if (onOpenContactWithCar) {
      onOpenContactWithCar(configurationSummary);
    } else {
      const url = `/contact?car=${encodeURIComponent(configurationSummary)}`;
      window.location.href = url;
    }
  };

  const handleWhatsAppClick = () => {
    if (onOpenWhatsAppWithCar) {
      onOpenWhatsAppWithCar(configurationSummary);
    } else {
      const phoneNumber = '221778600000';
      const msg = `Bonjour Almadies Prestige Motors, je souhaite obtenir des informations et une offre confidentielle pour la configuration suivante : ${configurationSummary}.`;
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/showroom/${car.slug}`;
    navigator.clipboard.writeText(shareUrl);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2200);
  };

  // Expected image path based on viewMode (strictly single exterior photo, recolored by CarColorizer)
  const currentExpectedPath =
    viewMode === 'interior'
      ? car.interiorImage
      : viewMode === 'detail'
      ? car.detailImage
      : car.exteriorImage;

  const currentViewLabel =
    viewMode === 'interior'
      ? 'Habitacle & Sellerie Haute Couture'
      : viewMode === 'detail'
      ? 'Détails Extérieurs & Jantes d’Usine'
      : `Extérieur • Teinte ${activeColor.name}`;

  return (
    <div className="relative space-y-10">
      {/* Subtle Dynamic Ambient Lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[150px] pointer-events-none opacity-15 transition-colors duration-1000"
        style={{ backgroundColor: car.accentColor || '#c8a46b' }}
      />

      {/* 1. Optional Vehicle Selector (visible if multi-car mode) */}
      {showModelSelector && vehicleList.length > 1 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] font-sans-clean text-[#7a7467]">
              1. Sélectionner le Modèle ({vehicleList.length} véhicules au Showroom)
            </span>

            <button
              onClick={() => setIsComparatorOpen(true)}
              className="px-3 py-1.5 bg-[#171a23] hover:bg-[#202431] border border-[#c8a46b]/40 text-[#dfbe8d] text-xs uppercase tracking-wider font-sans-clean transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#c8a46b]" />
              <span>Comparer les fiches techniques</span>
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {vehicleList.map((v, idx) => (
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
      )}

      {/* Main Interactive Stage: Asymmetrical 2-Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Studio Stage & Customization (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative bg-[#13151b] border border-[#232733] p-4 sm:p-6 shadow-2xl rounded-sm group overflow-hidden">
            {/* Top Bar: Category & Model identification */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#202431] flex-wrap">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-[#0a0b0e]/85 border border-[#2b2f3d] text-[#e6cb9d]">
                  {car.category}
                </span>
                <span className="text-xs font-sans-clean text-[#7e786b]">
                  Millésime {car.year} • {car.brand}
                </span>
              </div>

              {/* View Angle Switcher Tabs: Extérieur / Habitacle / Détail */}
              {/* NOTE: Clicking tabs switches viewMode, and DOES NOT touch color selection */}
              <div className="flex items-center bg-[#0a0b0e]/95 border border-[#2a2e3b] p-1 shadow-md">
                <button
                  id="view-exterior-tab-btn"
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
                  id="view-interior-tab-btn"
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
                  id="view-detail-tab-btn"
                  onClick={() => setViewMode('detail')}
                  className={`px-3 py-1 text-[11px] uppercase tracking-wider font-sans-clean transition-colors cursor-pointer ${
                    viewMode === 'detail'
                      ? 'bg-[#c8a46b] text-[#0f1013] font-semibold'
                      : 'text-[#9c9587] hover:text-white'
                  }`}
                >
                  Détail Signature
                </button>
              </div>
            </div>

            {/* Vehicle Photograph / Stage */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#090a0d] mt-4 flex items-center justify-center">
              {viewMode === 'exterior' ? (
                <div className="relative w-full h-full">
                  <CarColorizer
                    imageSrc={car.exteriorImage}
                    maskSrc={realMaskSrc}
                    color={activeColor.code}
                    finish={hasFinishSelector ? activeColor.finish : undefined}
                    className="w-full h-full object-cover"
                  />

                  {/* PAINT SHEEN ANIMATION OVERLAY (specular light reflection without tinting the photo background) */}
                  {isPainting && (
                    <div
                      key={paintKey}
                      className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
                    >
                      {/* Specular sheen beam traveling diagonally — quasi invisible en mat */}
                      <div
                        className="absolute w-[40%] h-[200%] top-[-50%] left-[-20%] paint-sheen-active pointer-events-none"
                        style={
                          hasFinishSelector && activeColor.finish === 'mat'
                            ? {
                                background:
                                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
                                filter: 'blur(24px)',
                              }
                            : hasFinishSelector && activeColor.finish === 'metallise'
                            ? {
                                // Paillettes : halo large et diffus
                                background:
                                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0.18) 70%, transparent 100%)',
                                filter: 'blur(12px)',
                              }
                            : {
                                // Vernis miroir : rayon fin et franc
                                background:
                                  'linear-gradient(90deg, transparent 0%, transparent 38%, rgba(255,255,255,0.6) 50%, transparent 62%, transparent 100%)',
                                filter: 'blur(4px)',
                              }
                        }
                      />

                      {/* Discrete atelier toast during color spray */}
                      <div className="absolute bottom-4 right-4 z-30 px-3 py-1.5 rounded bg-[#090b0e]/90 border border-[#c8a46b]/40 backdrop-blur-md flex items-center gap-2 text-[10px] uppercase font-sans-clean tracking-wider text-[#e6cb9d]">
                        <span
                          className="w-2 h-2 rounded-full animate-ping"
                          style={{ backgroundColor: paintColorCode }}
                        />
                        <span>
                          Atelier Teinte : {activeColor.name}
                          {hasFinishSelector && ` • ${activeFinishLabel}`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <VehiclePlaceholderImage
                  key={`${currentExpectedPath}-${viewMode}`}
                  expectedPath={currentExpectedPath}
                  alt={`${car.brand} ${car.model} - ${currentViewLabel}`}
                  viewLabel={currentViewLabel}
                  vehicleBrand={car.brand}
                  vehicleModel={car.model}
                  accentColor={car.accentColor}
                  aspectRatio="16/9"
                />
              )}
            </div>

            {/* Paint Finish + Color Swatch Selector */}
            <div className="pt-5 mt-4 border-t border-[#20232c] space-y-5">
              {/* Type de peinture : choisi avant la teinte */}
              {hasFinishSelector && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean text-[#787265] block">
                    Type de peinture
                  </span>
                  <div
                    role="radiogroup"
                    aria-label="Type de peinture"
                    className="grid grid-cols-3 bg-[#0a0b0e]/95 border border-[#2a2e3b] p-1"
                  >
                    {availableFinishes.map((f) => (
                      <button
                        key={f}
                        id={`paint-finish-${f}`}
                        role="radio"
                        aria-checked={selectedFinish === f}
                        onClick={() => handleFinishChange(f)}
                        className={`px-2 py-2 text-center transition-colors cursor-pointer ${
                          selectedFinish === f
                            ? 'bg-[#c8a46b] text-[#0f1013]'
                            : 'text-[#9c9587] hover:text-white'
                        }`}
                      >
                        <span className="block text-[11px] uppercase tracking-wider font-sans-clean font-semibold">
                          {FINISH_LABELS[f].label}
                        </span>
                        <span
                          className={`block text-[10px] italic font-serif-luxury ${
                            selectedFinish === f ? 'text-[#0f1013]/70' : 'text-[#6f695d]'
                          }`}
                        >
                          {FINISH_LABELS[f].italian}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean text-[#787265] block">
                    Teinte de Carrosserie Officielle (Atelier Peinture)
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-[#a39b8c] font-sans-clean">
                      Sélectionnée :
                    </span>
                    <span className="font-serif-luxury text-sm text-[#f0ebe3]">
                      {activeColor.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 bg-[#1b1e26] text-[#c8a46b] border border-[#2b2f3b] rounded-xs font-mono uppercase tracking-wider">
                      {activeFinishLabel}
                    </span>
                  </div>
                </div>

                {/* Color swatches — grisées si la teinte n'existe pas dans la finition choisie */}
                <div className="flex items-center gap-3 flex-wrap">
                  {shades.map((shade, cIdx) => {
                    const available = isShadeAvailable(shade);
                    const variant = variantFor(shade);
                    const isSelected = selectedColorIndex === cIdx;
                    return (
                      <button
                        key={shade.id}
                        id={`color-swatch-${cIdx}`}
                        onClick={() => handleColorChange(cIdx)}
                        disabled={!available}
                        aria-label={
                          available
                            ? `${variant.name} (${hasFinishSelector ? FINISH_LABELS[variant.finish].label : car.colors?.[cIdx]?.finish})`
                            : `${shade.name} — non proposé en ${FINISH_LABELS[selectedFinish].label}`
                        }
                        title={
                          available
                            ? variant.name
                            : `${shade.name} — non proposé en ${FINISH_LABELS[selectedFinish].label}`
                        }
                        className={`relative w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center ${
                          !available
                            ? 'opacity-20 cursor-not-allowed'
                            : isSelected
                            ? 'scale-115 ring-2 ring-[#c8a46b] ring-offset-2 ring-offset-[#13151b] cursor-pointer'
                            : 'opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer'
                        }`}
                        style={{
                          backgroundColor: variant.code,
                          backgroundImage: hasFinishSelector ? swatchSheen(variant.finish) : undefined,
                        }}
                      >
                        {isSelected && available && (
                          <CheckCircle2
                            className={`w-4 h-4 ${
                              isLightColor(variant.code) ? 'text-[#0f1013]' : 'text-white'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Customization Options Module */}
          <div className="bg-[#12141c] border border-[#222633] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1f222f] pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#c8a46b]" />
                <h3 className="font-serif-luxury text-base sm:text-lg text-[#f0ebe3]">
                  Options & Packs de Personnalisation d'Usine
                </h3>
              </div>
              <span className="text-[11px] font-sans-clean text-[#868074]">
                {selectedOptionIds.length} option{selectedOptionIds.length > 1 ? 's' : ''} active{selectedOptionIds.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-3">
              {car.options.map((option) => {
                const isChecked = selectedOptionIds.includes(option.id);
                return (
                  <div
                    key={option.id}
                    id={`option-toggle-${option.id}`}
                    onClick={() => toggleOption(option.id)}
                    className={`p-3.5 border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      isChecked
                        ? 'bg-[#181b24] border-[#c8a46b]/60 text-white'
                        : 'bg-[#0f1116] border-[#1f232e] text-[#938d80] hover:border-[#323849]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-[#c8a46b] flex-shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4 opacity-40" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-sans-clean text-xs font-semibold text-[#f0ece4]">
                            {option.name}
                          </span>
                          {option.category && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-[#171a22] text-[#8e8779] border border-[#262b37] rounded-xs font-mono uppercase">
                              {option.category}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#867f73] leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="font-mono text-xs text-[#e6cb9d]">
                        +{formatPrice(option.priceFCFA)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Price Summary, Specs & Concierge CTAs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#12141c] border border-[#242836] p-6 sm:p-7 shadow-2xl space-y-6">
            {/* Header / Car Title */}
            <div className="border-b border-[#1f232f] pb-5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#c8a46b]">
                  {car.brand}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-[11px] font-sans-clean text-[#8a8477] hover:text-[#c8a46b] transition-colors cursor-pointer"
                  title="Partager cette fiche véhicule"
                >
                  {shareCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4ade80]" />
                      <span className="text-[#4ade80]">Lien copié</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Partager</span>
                    </>
                  )}
                </button>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f4efe5]">
                {car.model}
              </h3>
              <p className="font-sans-clean text-xs text-[#8c8577]">
                {car.subTitle}
              </p>
            </div>

            {/* Price Breakdown */}
            <div className="bg-[#0b0c10] border border-[#1e222d] p-4 space-y-3 font-sans-clean text-xs">
              <div className="flex justify-between items-center text-[#8e887b]">
                <span>Prix de base Showroom :</span>
                <span className="font-mono text-[#f0ece4]">
                  {formatPrice(car.basePriceFCFA)}
                </span>
              </div>

              <div className="flex justify-between items-center text-[#8e887b]">
                <span>Options atelier ({selectedOptionIds.length}) :</span>
                <span className="font-mono text-[#c8a46b]">
                  +{formatPrice(optionsTotalFCFA)}
                </span>
              </div>

              <div className="pt-3 border-t border-[#1d202a] flex justify-between items-baseline">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#a8a192] block font-medium">
                    Total Estimé
                  </span>
                  <span className="text-[10px] text-[#6b6559]">
                    Frais d'immatriculation inclus
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-serif-luxury text-xl sm:text-2xl text-[#f5f2eb]">
                    {formatPrice(calculatedTotalPriceFCFA)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Specs Highlight Box */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean text-[#787265] block">
                Performances & Motorisation
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-sans-clean">
                <div className="p-3 bg-[#0d0f14] border border-[#1e222d]">
                  <span className="text-[10px] text-[#716b5f] block">Puissance</span>
                  <span className="font-mono text-[#e6cb9d] text-xs">
                    {car.specs.power}
                  </span>
                </div>
                <div className="p-3 bg-[#0d0f14] border border-[#1e222d]">
                  <span className="text-[10px] text-[#716b5f] block">0 à 100 km/h</span>
                  <span className="font-mono text-[#e6cb9d] text-xs">
                    {car.specs.acceleration}
                  </span>
                </div>
                <div className="p-3 bg-[#0d0f14] border border-[#1e222d]">
                  <span className="text-[10px] text-[#716b5f] block">Moteur</span>
                  <span className="font-mono text-[#e6cb9d] text-xs truncate block">
                    {car.specs.engine}
                  </span>
                </div>
                <div className="p-3 bg-[#0d0f14] border border-[#1e222d]">
                  <span className="text-[10px] text-[#716b5f] block">Vitesse Max</span>
                  <span className="font-mono text-[#e6cb9d] text-xs">
                    {car.specs.topSpeed}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Request quote & WhatsApp */}
            <div className="space-y-3 pt-2">
              <button
                id="config-request-quote-btn"
                onClick={handleContactClick}
                className="w-full py-3.5 bg-[#c8a46b] hover:bg-[#dfbe8d] text-[#0f1013] text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Réserver ce modèle configuré</span>
              </button>

              <button
                id="config-whatsapp-concierge-btn"
                onClick={handleWhatsAppClick}
                className="w-full py-3 bg-[#171a22] hover:bg-[#202532] border border-[#2a2f3f] text-[#4ade80] text-xs uppercase tracking-wider font-sans-clean transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Transmettre via WhatsApp au Concierge</span>
              </button>
            </div>

            <div className="pt-2 text-[11px] text-[#716b60] leading-relaxed text-center">
              Véhicule disponible en visite privée à la concession des Almadies sous protocole de discrétion.
            </div>
          </div>
        </div>
      </div>

      {/* Technical Comparator Modal */}
      {isComparatorOpen && (
        <VehicleComparatorModal
          vehicles={vehicleList}
          initialCar1Id={car.id}
          onClose={() => setIsComparatorOpen(false)}
        />
      )}
    </div>
  );
};
