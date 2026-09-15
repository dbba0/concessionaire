import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  MessageSquare,
  X,
} from 'lucide-react';
import { VEHICLES } from '../data/vehicles';

export const ContactPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const carFromQuery = searchParams.get('car') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    selectedCar: carFromQuery,
    requestType: 'Visite privée du showroom',
    preferredDate: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (carFromQuery) {
      setFormData((prev) => ({ ...prev, selectedCar: carFromQuery }));
    }
  }, [carFromQuery]);

  const clearSelectedCar = () => {
    setFormData((prev) => ({ ...prev, selectedCar: '' }));
    searchParams.delete('car');
    setSearchParams(searchParams);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#212634] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-sans-clean tracking-[0.25em] uppercase text-[#c8a46b] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Accueil Confidentiel aux Almadies</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#f5f2eb]">
            Entretien Privé & Rendez-vous
          </h1>
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
                <Clock className="w-4 h-4 text-[#c8a46b] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-[#f0ece4]">Horaires d'Accueil Privé :</strong>
                  <span className="text-[#8c867a]">
                    Du Lundi au Samedi : 09h00 – 19h30 <br />
                    Dimanche & Jours fériés : Salons privés exclusifs sur invitation
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#c8a46b] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-[#f0ece4]">Ligne Directrice Showroom :</strong>
                  <span className="text-[#8c867a] font-mono">
                    +221 33 860 00 00 &nbsp;|&nbsp; Concierge WhatsApp : +221 77 860 00 00
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#c8a46b] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-[#f0ece4]">Secrétariat Confidentiel :</strong>
                  <span className="text-[#8c867a] font-mono">
                    direction@almadies-prestige.sn
                  </span>
                </div>
              </div>
            </div>

            {/* Travel Times / Access Guide */}
            <div className="pt-4 border-t border-[#1e222d] space-y-3">
              <div className="flex items-center gap-2 text-[#c8a46b] text-[11px] font-mono uppercase tracking-wider">
                <Navigation className="w-3.5 h-3.5" />
                <span>Accès & Temps de Trajet</span>
              </div>
              <ul className="space-y-2 text-xs font-sans-clean text-[#8e887b]">
                <li className="flex justify-between items-center py-1 border-b border-[#181b24]">
                  <span>Dakar Plateau (Centre d'affaires)</span>
                  <span className="font-mono text-[#c8a46b]">~18 min via Corniche</span>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-[#181b24]">
                  <span>Aéroport International AIBD</span>
                  <span className="font-mono text-[#c8a46b]">~45 min via VDN / Péage</span>
                </li>
                <li className="flex justify-between items-center py-1">
                  <span>Saly Portudal (Petite-Côte)</span>
                  <span className="font-mono text-[#c8a46b]">~1h15 min</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Guarantee of Discretion */}
          <div className="p-6 bg-[#0e1015] border border-[#1d212b] flex items-start gap-3 text-xs text-[#8c8578] font-sans-clean">
            <ShieldCheck className="w-5 h-5 text-[#c8a46b] flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Protocole de discrétion totale :</strong> L’ensemble des coordonnées,
              documents d’acquisition et entretiens demeurent strictement confidentiels. Un parking
              privatif intérieur sous garde assure un accès à l'abri de tout regard.
            </p>
          </div>
        </div>

        {/* Right Column: Private Salon Appointment Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-[#12141c] border border-[#232734] p-8 sm:p-10 shadow-2xl relative">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#1b1e28] border border-[#c8a46b] mx-auto flex items-center justify-center text-[#c8a46b]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f4efe5]">
                  Demande Transmise avec Succès
                </h3>
                <p className="font-sans-clean text-xs sm:text-sm text-[#9c9587] max-w-md mx-auto leading-relaxed">
                  Notre Directeur Général ou Concierge Privé prendra contact avec vous dans un délai
                  maximum de deux heures ouvrées pour convenir des modalités de votre visite.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-[#171a23] hover:bg-[#202431] border border-[#2c3140] text-[#dfbe8d] text-xs uppercase tracking-wider font-sans-clean cursor-pointer"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#f4efe5]">
                    Formulaire de Rendez-vous Privé
                  </h3>
                  <p className="font-sans-clean text-xs text-[#8c8577] mt-1">
                    Veuillez préciser vos souhaits afin que nous préparions l'accueil et le salon
                    selon vos attentes.
                  </p>
                </div>

                {/* Preselected Car Banner if arrived from configurator */}
                {formData.selectedCar && (
                  <div className="p-3.5 bg-[#171922] border border-[#c8a46b]/40 rounded-xs flex items-center justify-between gap-3 text-xs font-sans-clean">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Sparkles className="w-4 h-4 text-[#c8a46b] flex-shrink-0" />
                      <div className="truncate">
                        <span className="text-[#8e887b] block text-[10px] uppercase tracking-wider">
                          Véhicule ou Configuration Sélectionnée :
                        </span>
                        <span className="text-[#e6cb9d] font-serif-luxury font-medium truncate block">
                          {formData.selectedCar}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearSelectedCar}
                      className="text-[#8e887b] hover:text-white p-1 cursor-pointer flex-shrink-0"
                      title="Retirer cette sélection"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 font-sans-clean text-xs">
                    <label className="text-[#a39b8c] font-medium">
                      Nom et Titre de civilité *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="M. / Mme / S.E."
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#0a0b0e] border border-[#262b3a] focus:border-[#c8a46b] text-[#f0ece4] focus:outline-none placeholder-[#504b42]"
                    />
                  </div>

                  <div className="space-y-1.5 font-sans-clean text-xs">
                    <label className="text-[#a39b8c] font-medium">
                      Téléphone portable / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+221 77 000 00 00"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#0a0b0e] border border-[#262b3a] focus:border-[#c8a46b] text-[#f0ece4] focus:outline-none placeholder-[#504b42]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 font-sans-clean text-xs">
                    <label className="text-[#a39b8c] font-medium">
                      Courriel professionnel ou privé *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contact@domaine.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#0a0b0e] border border-[#262b3a] focus:border-[#c8a46b] text-[#f0ece4] focus:outline-none placeholder-[#504b42]"
                    />
                  </div>

                  <div className="space-y-1.5 font-sans-clean text-xs">
                    <label className="text-[#a39b8c] font-medium">
                      Véhicule d'intérêt principal
                    </label>
                    <select
                      value={formData.selectedCar}
                      onChange={(e) =>
                        setFormData({ ...formData, selectedCar: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#0a0b0e] border border-[#262b3a] focus:border-[#c8a46b] text-[#f0ece4] focus:outline-none cursor-pointer"
                    >
                      <option value="">-- Sélectionner dans le Showroom --</option>
                      {VEHICLES.map((v) => (
                        <option key={v.id} value={`${v.brand} ${v.model}`}>
                          {v.brand} {v.model} ({v.priceEstimate})
                        </option>
                      ))}
                      <option value="Recherche personnalisée hors stock">
                        Autre modèle sur allocation spéciale
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 font-sans-clean text-xs">
                    <label className="text-[#a39b8c] font-medium">
                      Nature du rendez-vous
                    </label>
                    <select
                      value={formData.requestType}
                      onChange={(e) =>
                        setFormData({ ...formData, requestType: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#0a0b0e] border border-[#262b3a] focus:border-[#c8a46b] text-[#f0ece4] focus:outline-none cursor-pointer"
                    >
                      <option value="Visite privée du showroom">
                        Visite privée du showroom & examen des véhicules
                      </option>
                      <option value="Essai routier scénique sur la Corniche">
                        Essai routier scénique sur la Corniche
                      </option>
                      <option value="Atelier de personnalisation Bespoke">
                        Atelier de personnalisation d'usine (Bespoke / Mulliner)
                      </option>
                      <option value="Étude d'importation confidentielle">
                        Étude d'importation confidentielle & homologation
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5 font-sans-clean text-xs">
                    <label className="text-[#a39b8c] font-medium">
                      Date ou créneau souhaité
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredDate: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#0a0b0e] border border-[#262b3a] focus:border-[#c8a46b] text-[#f0ece4] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 font-sans-clean text-xs">
                  <label className="text-[#a39b8c] font-medium">
                    Consignes particulières ou préférences d'accueil
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Précisez ici toute demande particulière (accueil diplomatique, accompagnants, souhaits de configuration)..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#0a0b0e] border border-[#262b3a] focus:border-[#c8a46b] text-[#f0ece4] focus:outline-none placeholder-[#504b42] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#c8a46b] hover:bg-[#dfbe8d] text-[#0f1013] text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirmer la Demande de Rendez-vous Privé</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
