import React, { useState } from 'react';
import { VEHICLES } from './data/vehicles';
import { Vehicle } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShowroomGallery } from './components/ShowroomGallery';
import { Configurator } from './components/Configurator';
import { ClientJourney } from './components/ClientJourney';
import { ContactSection } from './components/ContactSection';
import { VehicleModal } from './components/VehicleModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

export default function App() {
  const [modalVehicle, setModalVehicle] = useState<Vehicle | null>(null);
  const [configuratorVehicleId, setConfiguratorVehicleId] = useState<string>(VEHICLES[0].id);
  const [contactPreselectedCar, setContactPreselectedCar] = useState<string>('');
  const [activeCarSummaryForWhatsApp, setActiveCarSummaryForWhatsApp] = useState<string>(
    `${VEHICLES[0].brand} ${VEHICLES[0].model}`
  );

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectVehicleForConfigurator = (vehicle: Vehicle) => {
    setConfiguratorVehicleId(vehicle.id);
    setActiveCarSummaryForWhatsApp(`${vehicle.brand} ${vehicle.model}`);
    scrollToSection('configurator');
  };

  const handleOpenContactWithCar = (carSummary: string) => {
    setContactPreselectedCar(carSummary);
    setActiveCarSummaryForWhatsApp(carSummary);
    scrollToSection('contact');
  };

  const handleOpenWhatsAppWithCar = (carSummary: string) => {
    setActiveCarSummaryForWhatsApp(carSummary);
    const phoneNumber = '221778600000';
    const msg = `Bonjour Almadies Prestige Motors, je souhaiterais obtenir des informations confidentielles et convenir d'une visite privée pour le véhicule suivant : ${carSummary}.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-[#f2ede4] font-sans-clean selection:bg-[#c8a46b] selection:text-[#0a0b0e] flex flex-col">
      {/* Top Floating Navigation */}
      <Navbar
        onOpenContact={(model) => {
          if (model) setContactPreselectedCar(model);
          scrollToSection('contact');
        }}
        onNavigate={scrollToSection}
      />

      <main className="flex-grow">
        {/* 1. Hero plein écran avec photo réelle d'un véhicule phare */}
        <Hero
          flagshipVehicles={VEHICLES}
          onSelectVehicleForConfigurator={handleSelectVehicleForConfigurator}
          onOpenContact={(model) => {
            if (model) setContactPreselectedCar(model);
            scrollToSection('contact');
          }}
          onExploreGallery={() => scrollToSection('showroom')}
        />

        {/* 3. Galerie horizontale présentant tous les 7 véhicules d'exception du showroom */}
        <ShowroomGallery
          vehicles={VEHICLES}
          onSelectVehicleForModal={(vehicle) => {
            setModalVehicle(vehicle);
            setActiveCarSummaryForWhatsApp(`${vehicle.brand} ${vehicle.model}`);
          }}
          onSelectVehicleForConfigurator={handleSelectVehicleForConfigurator}
        />

        {/* 2. Configurateur interactif : modèle, teinte, fiches techniques en direct */}
        <Configurator
          vehicles={VEHICLES}
          selectedVehicleId={configuratorVehicleId}
          onOpenContactWithCar={handleOpenContactWithCar}
          onOpenWhatsAppWithCar={handleOpenWhatsAppWithCar}
        />

        {/* 4. Parcours client en 3 étapes : consultation privée -> essai routier -> livraison */}
        <ClientJourney onOpenBooking={() => scrollToSection('contact')} />

        {/* 5. Formulaire de contact & Salon privé aux Almadies */}
        <ContactSection
          vehicles={VEHICLES}
          preselectedCar={contactPreselectedCar}
          onClearPreselectedCar={() => setContactPreselectedCar('')}
        />
      </main>

      {/* Lightbox inspection modal */}
      <VehicleModal
        vehicle={modalVehicle}
        onClose={() => setModalVehicle(null)}
        onOpenContactWithCar={handleOpenContactWithCar}
        onOpenWhatsAppWithCar={handleOpenWhatsAppWithCar}
        onGoToConfigurator={handleSelectVehicleForConfigurator}
      />

      {/* 5. Bouton WhatsApp flottant connecté au numéro de la conciergerie */}
      <WhatsAppButton activeCarSummary={activeCarSummaryForWhatsApp} />

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
