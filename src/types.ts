export interface ColorOption {
  name: string;
  code: string; // hex for visual swatch
  image: string; // real image URL
  finish: 'Métallisé' | 'Brillant' | 'Satiné' | 'Bicolore';
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

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  subTitle: string;
  category: 'SUV Ultra-Luxe' | 'Supercar GT' | 'Berline de Maître';
  year: number;
  priceEstimate: string; // e.g. "Sur demande" or "485 000 000 FCFA"
  status: 'Disponible au Showroom' | 'En transit maritime' | 'Sur allocation exclusive';
  exteriorImage: string;
  interiorImage: string;
  detailImage?: string;
  rearImage?: string;
  accentColor: string; // brand accent
  colors: ColorOption[];
  specs: VehicleSpecs;
  description: string;
  keyFeatures: string[];
}
