export interface ColorOption {
  name: string;
  code: string; // hex for visual swatch
  finish: 'Métallisé' | 'Brillant' | 'Satiné' | 'Bicolore';
  image?: string; // exterior reference or fallback
}

// Finition de peinture : axe indépendant de la teinte dans le configurateur.
export type PaintFinish = 'brillant' | 'metallise' | 'mat';

export interface PaintVariant {
  finish: PaintFinish;
  name: string; // appellation officielle dans cette finition
  code: string; // hex
}

// Teinte de base déclinée en plusieurs finitions réellement proposées.
export interface PaintShade {
  id: string;
  name: string;
  variants: PaintVariant[];
}

export interface VehicleOption {
  id: string;
  name: string;
  description: string;
  priceFCFA: number; // e.g. 18500000
  category?: 'Jantes & Extérieur' | 'Habitacle & Sellerie' | 'Technologie & Performance';
}

export interface VehicleSpecs {
  engine: string;
  power: string;
  torque: string;
  acceleration: string;
  topSpeed: string;
  transmission: string;
  drivetrain: string;
  fuelOrHybrid: string;
}

export interface VehicleGalleryItem {
  id: string;
  title: string;
  url: string;
  caption: string;
  category: 'Extérieur' | 'Habitacle' | 'Moteur V12' | 'Détails';
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  subTitle: string;
  category: 'SUV Ultra-Luxe' | 'Supercar GT' | 'Berline de Maître';
  year: number;
  basePriceFCFA: number; // e.g. 450000000
  priceEstimate: string; // e.g. "450 000 000 FCFA"
  status: 'Disponible au Showroom' | 'En transit maritime' | 'Sur allocation exclusive';
  exteriorImage: string;
  maskImage?: string; // Optional manual mask path (e.g. /images/masks/<slug>-mask.png)
  interiorImage: string;
  detailImage: string;
  rearImage?: string;
  accentColor: string; // brand accent
  colors?: ColorOption[]; // liste plate (véhicules sans masque réel)
  paints?: PaintShade[]; // teinte × finition (véhicules avec masque réel)
  options: VehicleOption[];
  specs: VehicleSpecs;
  description: string;
  keyFeatures: string[];
  gallery?: VehicleGalleryItem[];
}
