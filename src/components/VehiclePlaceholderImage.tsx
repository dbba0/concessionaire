import React, { useState } from 'react';
import { Camera, Copy, Check, Image as ImageIcon } from 'lucide-react';

interface VehiclePlaceholderImageProps {
  expectedPath: string;
  alt: string;
  viewLabel?: string;
  aspectRatio?: '16/10' | '16/9' | '4/3' | '21/9';
  className?: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  accentColor?: string;
}

export const VehiclePlaceholderImage: React.FC<VehiclePlaceholderImageProps> = ({
  expectedPath,
  alt,
  viewLabel,
  aspectRatio = '16/10',
  className = '',
  vehicleBrand,
  vehicleModel,
  accentColor = '#c8a46b',
}) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Normalize path for public display
  const displayFilePath = expectedPath.startsWith('/public')
    ? expectedPath
    : `/public${expectedPath.startsWith('/') ? expectedPath : `/${expectedPath}`}`;

  const copyPath = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(displayFilePath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === '21/9'
      ? 'aspect-[21/9]'
      : 'aspect-[16/10]';

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden bg-[#101217] border border-[#232733] select-none ${className}`}
    >
      {/* Hidden attempt to load if user actually placed the image file */}
      <img
        src={expectedPath}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        onLoad={() => {
          setImgError(false);
          setImgLoaded(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          imgLoaded && !imgError ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
        }`}
      />

      {/* Luxury graphite placeholder rectangle when image is not present */}
      {imgError && (
        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-br from-[#151720] via-[#101217] to-[#0c0d12]">
          {/* Subtle architectural luxury pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#c8a46b 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Top Row: View label badge & Resolution recommendation */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0b0c10]/90 border border-[#2b3040] text-[11px] font-sans-clean uppercase tracking-wider text-[#d4cfc5]">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: accentColor || '#c8a46b' }}
              />
              <span>{viewLabel || 'Vue Véhicule'}</span>
            </div>

            <span className="text-[10px] font-mono text-[#767165] hidden sm:inline-block">
              Recommandé : 1920 × 1200 px (3:2 ou 16:9)
            </span>
          </div>

          {/* Center Graphic & Vehicle Monogram */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-2.5 my-auto">
            <div className="w-12 h-12 rounded-sm bg-[#1a1d26] border border-[#2e3344] flex items-center justify-center text-[#c8a46b] shadow-inner">
              <Camera className="w-6 h-6 opacity-75" />
            </div>

            <div className="space-y-0.5">
              <h4 className="font-serif-luxury text-base sm:text-lg text-[#f0ece4] tracking-wide">
                {vehicleBrand} {vehicleModel}
              </h4>
              <p className="font-sans-clean text-xs text-[#8c8577]">
                Emplacement réservé pour photographie haute résolution
              </p>
            </div>
          </div>

          {/* Bottom Row: Exact Path Overlay Badge with Copy action */}
          <div className="relative z-10 pt-2 border-t border-[#1f232f]">
            <div
              onClick={copyPath}
              title="Cliquer pour copier l'emplacement du fichier"
              className="group flex items-center justify-between gap-2 p-2 sm:px-3 sm:py-2 rounded bg-[#0b0d11]/90 hover:bg-[#161821] border border-[#262b3a] hover:border-[#c8a46b]/50 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                <ImageIcon className="w-3.5 h-3.5 text-[#c8a46b] flex-shrink-0" />
                <span className="font-mono text-[10px] sm:text-[11px] text-[#b8b2a5] truncate">
                  {displayFilePath}
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0 text-[10px] uppercase font-sans-clean tracking-wider text-[#c8a46b] group-hover:text-[#dfbe8d]">
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[#4ade80]" />
                    <span className="text-[#4ade80]">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="hidden xs:inline">Copier</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
