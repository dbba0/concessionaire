import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Coffee, Compass, Key, Sparkles, ShieldCheck, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 'I',
      title: 'Consultation Privée & Salon Confidentiel',
      subtitle: 'Les Almadies • En toute discrétion',
      description:
        'Accueil personnalisé dans notre maison privée dominant l’Atlantique. Autour d’une dégustation raffinée, nous étudions vos exigences d’acquisition, configurons les programmes sur-mesure (Bespoke Goodwood, Ferrari Tailor Made, Bentley Mulliner) ou préparons l’accès exclusif à notre collection en réserve.',
      details: [
        'Salon d’acquéreurs réservé sur rendez-vous unique',
        'Étude fiscale, immatriculation diplomatique ou civile',
        'Échantillons physiques de cuirs et placages d’usine',
      ],
      icon: Coffee,
      highlight: 'Salon Océan Almadies',
    },
    {
      number: 'II',
      title: 'Essai Routier Scénique Accompagné',
      subtitle: 'Corniche Ouest & Route du Littoral',
      description:
        'Prenez les commandes de votre futur véhicule d’exception sur les plus beaux rubans d’asphalte de la presqu’île du Cap-Vert. Accompagné par un pilote instructeur certifié, appréciez la motricité souveraine sur la Corniche ou la réserve de puissance sur les axes dégagés.',
      details: [
        'Tracé panoramique sélectionné selon la météo et le trafic',
        'Présentation approfondie des télémétries et modes de conduite',
        'Prise en charge Aller-Retour en berline avec chauffeur',
      ],
      icon: Compass,
      highlight: 'Parcours Privatif Dakar',
    },
    {
      number: 'III',
      title: 'Livraison Cérémoniale & Conciergerie 24/7',
      subtitle: 'Résidence, Saly ou Salon d’Honneur AIBD',
      description:
        'La remise des clés s’organise selon votre rituel personnel : sous housse de satin à votre villa des Almadies ou de Fann, à votre propriété de la Petite-Côte, ou dès la passerelle de votre jet privé à l’AIBD. Notre conciergerie veille ensuite 24h/24 sur l’entretien, le gardiennage et le convoyage sécurisé.',
      details: [
        'Dossier d’homologation et plaques sénégalaises installées',
        'Coffret officiel du constructeur et double de clés scellé',
        'Assistance rapatriement & gardiennage sous atmosphère contrôlée',
      ],
      icon: Key,
      highlight: 'Protocole Clé en Main',
    },
  ];

  return (
    <div className="py-12 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Heading with Asymmetrical Editorial Feel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#212531] pb-10">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 text-xs font-sans-clean tracking-[0.25em] uppercase text-[#c8a46b] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Protocole d'Acquisition & Conciergerie</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#f5f2eb] leading-tight">
            L'Expérience Almadies <br />
            <span className="italic text-[#dfbe8d] font-light">
              en trois temps souverains.
            </span>
          </h1>
        </div>

        <div className="lg:col-span-5">
          <p className="font-sans-clean text-sm text-[#9e9788] leading-relaxed">
            L’acquisition d’une automobile d’exception transcende l’acte commercial. Nous vous
            réservons une expérience confidentielle et sur-mesure, orchestrée avec les standards
            des plus grandes maisons européennes.
          </p>
        </div>
      </div>

      {/* Asymmetrical 3 Steps Layout */}
      <div className="space-y-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              id={`journey-step-${step.number}`}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10 bg-[#12141a] border border-[#232734] hover:border-[#c8a46b]/50 transition-all duration-300 relative group ${
                idx % 2 === 1 ? 'lg:bg-[#14171e]' : ''
              }`}
            >
              {/* Large Roman Numeral Watermark */}
              <div className="absolute right-6 top-4 font-serif-luxury text-7xl sm:text-8xl text-[#1a1e27] group-hover:text-[#252a36] pointer-events-none transition-colors select-none">
                {step.number}
              </div>

              {/* Left Column: Number and Title (5 cols) */}
              <div className="lg:col-span-5 space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-[#1b1f29] border border-[#c8a46b]/40 flex items-center justify-center text-[#c8a46b]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c8a46b]">
                    Étape {step.number} • {step.highlight}
                  </span>
                </div>

                <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#f4efe5] pr-6">
                  {step.title}
                </h2>

                <span className="inline-block text-xs font-sans-clean text-[#918a7c] tracking-wider uppercase border-b border-[#252936] pb-1">
                  {step.subtitle}
                </span>
              </div>

              {/* Right Column: Narrative & Specific Safeguards (7 cols) */}
              <div className="lg:col-span-7 space-y-5 relative z-10 flex flex-col justify-between">
                <p className="font-sans-clean text-sm text-[#aba495] leading-relaxed font-light">
                  {step.description}
                </p>

                <div className="pt-4 border-t border-[#1d212b] grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-[#8c8577]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8a46b] mt-1.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Closing Action Banner */}
      <div className="p-8 sm:p-10 bg-gradient-to-r from-[#171a22] to-[#12141b] border border-[#282d3b] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#f5f2eb]">
            Souhaitez-vous planifier une entrevue privée ?
          </h3>
          <p className="font-sans-clean text-xs sm:text-sm text-[#968f81]">
            Notre directeur de concession vous accueille sur invitation du lundi au samedi aux
            Almadies.
          </p>
        </div>

        <button
          id="journey-book-salon-btn"
          onClick={() => navigate('/contact')}
          className="px-8 py-4 bg-[#c8a46b] hover:bg-[#dfbe8d] text-[#0f1013] text-xs uppercase tracking-[0.2em] font-semibold transition-colors whitespace-nowrap cursor-pointer shadow-lg"
        >
          Prendre Rendez-vous au Salon
        </button>
      </div>
    </div>
  );
};
