import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  Calendar,
  CheckCircle2,
  Sparkles,
  Navigation,
} from 'lucide-react';
import { Vehicle } from '../types';

interface ContactSectionProps {
  vehicles: Vehicle[];
  preselectedCar?: string;
  onClearPreselectedCar?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  vehicles,
  preselectedCar,
  onClearPreselectedCar,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    selectedCar: preselectedCar || '',
    requestType: 'Visite privée du showroom',
    preferredDate: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update selected car if preselectedCar changes
  React.useEffect(() => {
    if (preselectedCar) {
      setFormData((prev) => ({ ...prev, selectedCar: preselectedCar }));
    }
  }, [preselectedCar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0b0e] border-t border-[#1e222d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#212634] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-sans-clean tracking-[0.25em] uppercase text-[#c8a46b] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Accueil Confidentiel aux Almadies</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#f5f2eb]">
              Entretien Privé & Rendez-vous
            </h2>
          </div>
          <p className="font-sans-clean text-sm text-[#9c9587] max-w-md">
            Pour préserver la quiétude et la confidentialité de nos hôtes, notre showroom des
            Almadies vous reçoit exclusivement sur réservation préalable.
          </p>
        </div>

        {/* Asymmetrical 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Showroom Identity, Coordinates & Access (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#12141b] border border-[#232734] p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c8a46b] block">
                  Maison Automobile
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#f5f2eb]">
                  Almadies Prestige Motors
                </h3>
                <p className="font-sans-clean text-xs text-[#9a9386] leading-relaxed">
                  Bordée par l'océan Atlantique au point le plus occidental du continent africain,
                  notre concession offre un cadre architectural d'exception pour apprécier des
                  créations automobiles hors normes.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#1e222d] font-sans-clean text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c8a46b] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-[#f0ece4]">Adresse Showroom :</strong>
                    <span className="text-[#8c867a] leading-relaxed">
                      Route des Almadies, Face Océan Atlantique, Presqu'île de Dakar, Sénégal
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#c8a46b] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-[#f0ece4]">Ligne Conciergerie :</strong>
                    <a
                      href="tel:+221338600000"
                      className="text-[#e6cb9d] hover:underline font-mono"
                    >
                      +221 33 860 00 00
                    </a>
                    <span className="block text-[11px] text-[#7d786d]">
                      Liaison directe WhatsApp : +221 77 860 00 00
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#c8a46b] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-[#f0ece4]">Direction Particulière :</strong>
                    <span className="text-[#a49d90] font-mono">
                      concierge@almadies-prestige.sn
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#c8a46b] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-[#f0ece4]">Horaires d'Ouverture :</strong>
                    <span className="text-[#8c867a]">
                      Lundi – Samedi : 09h00 – 19h30
                    </span>
                    <span className="block text-[11px] text-[#c8a46b]">
                      Visites nocturnes et dimanches sur protocole VIP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Times from Key Hubs */}
            <div className="bg-[#0e1015] border border-[#1f232e] p-6 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean text-[#8a8376] flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-[#c8a46b]" />
                <span>Accès Privilégié depuis Dakar & Environs</span>
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-sans-clean pt-2">
                <div className="p-2.5 bg-[#14161f] border border-[#222633]">
                  <span className="text-[10px] text-[#787265] block">Dakar Plateau</span>
                  <span className="font-serif-luxury text-sm text-[#e6cb9d]">18 min</span>
                </div>
                <div className="p-2.5 bg-[#14161f] border border-[#222633]">
                  <span className="text-[10px] text-[#787265] block">AIBD Aéroport</span>
                  <span className="font-serif-luxury text-sm text-[#e6cb9d]">45 min</span>
                </div>
                <div className="p-2.5 bg-[#14161f] border border-[#222633]">
                  <span className="text-[10px] text-[#787265] block">Saly Portudal</span>
                  <span className="font-serif-luxury text-sm text-[#e6cb9d]">1h 15</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Private Appointment Request Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#12151d] border border-[#242937] p-8 sm:p-10 shadow-2xl relative">
            {isSubmitted ? (
              <div
                id="contact-form-success-state"
                className="py-12 text-center space-y-6 animate-in fade-in duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-[#182a1f] border border-[#2a6b41] flex items-center justify-center mx-auto text-[#4ade80]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f5f2eb]">
                    Demande Enregistrée avec Succès
                  </h3>
                  <p className="font-sans-clean text-sm text-[#a8a294] max-w-md mx-auto leading-relaxed">
                    Monsieur / Madame {formData.fullName}, notre concierge personnel vous contactera
                    dans l'heure pour confirmer votre venue et préparer le salon privé ainsi que le
                    modèle souhaité.
                  </p>
                </div>

                <div className="p-4 bg-[#0c0e12] border border-[#232733] max-w-md mx-auto text-left text-xs font-sans-clean space-y-1.5 text-[#9e988b]">
                  <div>
                    <span className="text-[#6e685c]">Objet :</span> {formData.requestType}
                  </div>
                  {formData.selectedCar && (
                    <div>
                      <span className="text-[#6e685c]">Véhicule :</span> {formData.selectedCar}
                    </div>
                  )}
                  {formData.preferredDate && (
                    <div>
                      <span className="text-[#6e685c]">Créneau souhaité :</span>{' '}
                      {formData.preferredDate}
                    </div>
                  )}
                </div>

                <button
                  id="reset-form-btn"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 border border-[#c8a46b]/40 text-[#c8a46b] text-xs uppercase tracking-wider font-sans-clean hover:bg-[#c8a46b] hover:text-[#0f1013] transition-colors cursor-pointer"
                >
                  Effectuer une autre demande
                </button>
              </div>
            ) : (
              <form id="private-appointment-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif-luxury text-2xl text-[#f5f2eb]">
                    Formulaire de Salon Privé
                  </h3>
                  <p className="font-sans-clean text-xs text-[#958e80] mt-1">
                    Tous les champs sont traités sous le sceau du secret professionnel.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block text-[11px] font-sans-clean uppercase tracking-wider text-[#9f998d]"
                    >
                      Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ex : Cheikh Ndiaye"
                      className="w-full px-4 py-3 bg-[#0d0f14] border border-[#252936] focus:border-[#c8a46b] text-sm text-[#f0ece4] placeholder-[#5a554a] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="phone"
                      className="block text-[11px] font-sans-clean uppercase tracking-wider text-[#9f998d]"
                    >
                      Téléphone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+221 77 000 00 00"
                      className="w-full px-4 py-3 bg-[#0d0f14] border border-[#252936] focus:border-[#c8a46b] text-sm text-[#f0ece4] placeholder-[#5a554a] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-[11px] font-sans-clean uppercase tracking-wider text-[#9f998d]"
                    >
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre.nom@prestige.com"
                      className="w-full px-4 py-3 bg-[#0d0f14] border border-[#252936] focus:border-[#c8a46b] text-sm text-[#f0ece4] placeholder-[#5a554a] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Vehicle of Interest */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="selectedCar"
                      className="block text-[11px] font-sans-clean uppercase tracking-wider text-[#9f998d]"
                    >
                      Véhicule d'intérêt
                    </label>
                    <select
                      id="selectedCar"
                      value={formData.selectedCar}
                      onChange={(e) => setFormData({ ...formData, selectedCar: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0d0f14] border border-[#252936] focus:border-[#c8a46b] text-sm text-[#f0ece4] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="">Sélection libre / Découverte générale</option>
                      {vehicles.map((v) => (
                        <option key={v.id} value={`${v.brand} ${v.model}`}>
                          {v.brand} {v.model}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Request Type */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="requestType"
                      className="block text-[11px] font-sans-clean uppercase tracking-wider text-[#9f998d]"
                    >
                      Type de Prestation
                    </label>
                    <select
                      id="requestType"
                      value={formData.requestType}
                      onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0d0f14] border border-[#252936] focus:border-[#c8a46b] text-sm text-[#f0ece4] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Visite privée du showroom">
                        Visite privée du showroom aux Almadies
                      </option>
                      <option value="Essai routier personnalisé">
                        Essai routier accompagné (Corniche / VDN)
                      </option>
                      <option value="Commande sur-mesure & Importation">
                        Commande atelier sur-mesure & Importation
                      </option>
                      <option value="Reprise ou expertise de collection">
                        Expertise ou reprise de collection
                      </option>
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="preferredDate"
                      className="block text-[11px] font-sans-clean uppercase tracking-wider text-[#9f998d]"
                    >
                      Date & Créneau Souhaité
                    </label>
                    <input
                      type="text"
                      id="preferredDate"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      placeholder="Ex : Jeudi à 16h00"
                      className="w-full px-4 py-3 bg-[#0d0f14] border border-[#252936] focus:border-[#c8a46b] text-sm text-[#f0ece4] placeholder-[#5a554a] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block text-[11px] font-sans-clean uppercase tracking-wider text-[#9f998d]"
                  >
                    Exigences Particulières / Demande Spécifique
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Détails de configuration souhaités, demande d'immatriculation diplomatique, etc."
                    className="w-full px-4 py-3 bg-[#0d0f14] border border-[#252936] focus:border-[#c8a46b] text-sm text-[#f0ece4] placeholder-[#5a554a] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="submit-contact-form-btn"
                  className="w-full py-4 bg-[#c8a46b] hover:bg-[#dfbe8d] text-[#0f1013] text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmettre ma demande au Directeur du Showroom</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
