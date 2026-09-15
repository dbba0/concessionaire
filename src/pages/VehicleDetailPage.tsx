import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Share2,
  Check,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Phone,
  Gauge,
  Zap,
  Sliders,
  Award,
} from 'lucide-react';
import { getVehicleBySlug, VEHICLES } from '../data/vehicles';
import { Configurator } from '../components/Configurator';
import { VehiclePhotoGallery } from '../components/VehiclePhotoGallery';

export const VehicleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const vehicle = slug ? getVehicleBySlug(slug) : undefined;

  if (!vehicle) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 space-y-6">
        <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#f4efe5]">
          Véhicule Non Référencé
        </h2>
        <p className="font-sans-clean text-xs sm:text-sm text-[#9c9587] max-w-md">
          Ce modèle ne figure pas dans notre showroom actuel ou l'adresse URL est erronée.
        </p>
        <Link
          to="/showroom"
          className="px-6 py-3 bg-[#c8a46b] text-[#0f1013] text-xs uppercase tracking-wider font-semibold"
        >
          Retourner au Showroom
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenContactWithCar = (carSummary: string) => {
    navigate(`/contact?car=${encodeURIComponent(carSummary)}`);
  };

  const handleOpenWhatsAppWithCar = (carSummary: string) => {
    const phoneNumber = '221778600000';
    const msg = `Bonjour Almadies Prestige Motors, je souhaiterais obtenir des informations confidentielles et un devis officiel pour le véhicule suivant : ${carSummary}.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-10 sm:py-14 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#212533] pb-4">
        <div className="flex items-center gap-2 text-xs font-sans-clean text-[#8e8779]">
          <Link to="/" className="hover:text-[#c8a46b] transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <Link to="/showroom" className="hover:text-[#c8a46b] transition-colors">
            Showroom
          </Link>
          <span>/</span>
          <span className="text-[#e6cb9d] font-medium">
            {vehicle.brand} {vehicle.model}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#14161f] hover:bg-[#1f232e] border border-[#272b38] text-xs text-[#9d9688] hover:text-[#c8a46b] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#4ade80]" />
                <span className="text-[#4ade80]">URL Partagée</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Partager cette fiche</span>
              </>
            )}
          </button>

          <Link
            to="/showroom"
            className="flex items-center gap-1 px-3 py-1.5 bg-[#14161f] hover:bg-[#1f232e] border border-[#272b38] text-xs text-[#9d9688] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Tous les véhicules</span>
          </Link>
        </div>
      </div>

      {/* Hero Title & Identity */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1 bg-[#161822] text-[#c8a46b] border border-[#2a2f3f] text-xs font-mono uppercase tracking-wider">
            {vehicle.brand} • {vehicle.category}
          </span>
          <span className="text-xs text-[#4ade80] flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            {vehicle.status}
          </span>
          <span className="text-xs font-sans-clean text-[#787265]">
            Millésime {vehicle.year}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#f4efe5]">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="font-sans-clean text-sm sm:text-base text-[#9e9788] mt-2 max-w-3xl">
              {vehicle.description}
            </p>
          </div>

          <div className="text-left lg:text-right flex-shrink-0">
            <span className="text-xs text-[#7d786d] uppercase tracking-wider font-sans-clean block">
              Prix de base Showroom
            </span>
            <span className="font-serif-luxury text-2xl sm:text-3xl text-[#f0ece4]">
              {vehicle.priceEstimate}
            </span>
          </div>
        </div>
      </div>

      {/* Complete Technical Specifications Sheet */}
      <div className="space-y-6">
        <div className="border-b border-[#212634] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-[#c8a46b]" />
            <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#f4efe5]">
              Fiche Technique Complète & Homologation
            </h2>
          </div>
          <span className="text-xs font-mono text-[#787265] hidden sm:inline-block">
            Spécifications officielles d'usine
          </span>
        </div>

        {/* 8-Grid Specs Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans-clean">
          <div className="p-4 bg-[#11131a] border border-[#212533] space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#6e685c] block">
              Motorisation
            </span>
            <span className="font-mono text-sm text-[#f0ece4] block">
              {vehicle.specs.engine}
            </span>
            <span className="text-[10px] text-[#8e887a]">
              Type : {vehicle.specs.fuelOrHybrid}
            </span>
          </div>

          <div className="p-4 bg-[#11131a] border border-[#212533] space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#6e685c] block">
              Puissance Développée
            </span>
            <span className="font-mono text-sm text-[#e6cb9d] block">
              {vehicle.specs.power}
            </span>
            <span className="text-[10px] text-[#8e887a]">
              Couple maxi : {vehicle.specs.torque}
            </span>
          </div>

          <div className="p-4 bg-[#11131a] border border-[#212533] space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#6e685c] block">
              Accélération 0-100 km/h
            </span>
            <span className="font-mono text-sm text-[#e6cb9d] block">
              {vehicle.specs.acceleration}
            </span>
            <span className="text-[10px] text-[#8e887a]">
              Vitesse de pointe : {vehicle.specs.topSpeed}
            </span>
          </div>

          <div className="p-4 bg-[#11131a] border border-[#212533] space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#6e685c] block">
              Boîte & Motricité
            </span>
            <span className="font-mono text-sm text-[#f0ece4] block">
              {vehicle.specs.transmission}
            </span>
            <span className="text-[10px] text-[#8e887a]">
              Transmission : {vehicle.specs.drivetrain}
            </span>
          </div>
        </div>

        {/* Exclusive Signature Features */}
        <div className="p-6 bg-[#0f1117] border border-[#1f232f] space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-mono text-[#c8a46b]">
            <Award className="w-3.5 h-3.5" />
            <span>Équipements & Raffinements Notables de Série</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans-clean text-[#9c9588]">
            {vehicle.keyFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c8a46b] flex-shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High Definition Photo Gallery */}
      <VehiclePhotoGallery vehicle={vehicle} />

      {/* Embedded Atelier Configurateur (Colors with Paint animation + Options) */}
      <div className="space-y-6 pt-4 border-t border-[#212533]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-sans-clean tracking-[0.25em] uppercase text-[#c8a46b]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier Personnalisation Dédié</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#f4efe5]">
            Configurez Votre {vehicle.brand} {vehicle.model}
          </h2>
          <p className="font-sans-clean text-xs text-[#8c8577]">
            Sélectionnez la teinte officielle constructeur et vos options exclusives pour obtenir un devis instantané.
          </p>
        </div>

        {/* Configurator Component specifically bound to this vehicle */}
        <Configurator
          vehicle={vehicle}
          showModelSelector={false}
          onOpenContactWithCar={handleOpenContactWithCar}
          onOpenWhatsAppWithCar={handleOpenWhatsAppWithCar}
        />
      </div>

      {/* Private Salon & Concierge Protocol */}
      <div className="p-8 bg-gradient-to-r from-[#141720] to-[#0f1118] border border-[#232736] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#f4efe5]">
            Examiner ce véhicule en salon privé aux Almadies
          </h3>
          <p className="font-sans-clean text-xs text-[#958e81] max-w-xl">
            Notre directeur de showroom vous accueille sur invitation du lundi au samedi pour une présentation approfondie du véhicule et un essai scénique sur la Corniche.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to={`/contact?car=${encodeURIComponent(`${vehicle.brand} ${vehicle.model}`)}`}
            className="px-6 py-3.5 bg-[#c8a46b] hover:bg-[#dfbe8d] text-[#0f1013] text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
          >
            Prendre Rendez-vous
          </Link>
          <a
            href="tel:+221338600000"
            className="px-4 py-3.5 border border-[#2c3140] hover:border-[#c8a46b] text-[#dfbe8d] text-xs uppercase tracking-wider font-sans-clean transition-colors flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Appel direct</span>
          </a>
        </div>
      </div>
    </div>
  );
};
