import React from 'react';
import { Shield, Sparkles, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const brands = [
    'Rolls-Royce Motor Cars',
    'Ferrari Maranello',
    'Bentley Motors',
    'Lamborghini Automobili',
    'Mercedes-Maybach',
    'Range Rover SV',
    'Porsche Motorsport',
  ];

  return (
    <footer id="main-footer" className="bg-[#08090b] border-t border-[#1b1e27] pt-16 pb-12 text-[#9c9587]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1b1e26]">
          {/* Col 1: Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-[#c8a46b] to-[#8d6f3c] p-[1px]">
                <div className="w-full h-full bg-[#0f1013] flex items-center justify-center">
                  <span className="font-serif-luxury text-base tracking-widest text-[#e6cb9d]">
                    AP
                  </span>
                </div>
              </div>
              <span className="font-serif-luxury text-lg tracking-widest text-[#f5f2eb] uppercase">
                Almadies Prestige
              </span>
            </div>

            <p className="font-sans-clean text-xs text-[#8c8577] leading-relaxed max-w-sm">
              Concessionnaire d'exception multimarque établi sur la pointe des Almadies à Dakar.
              Vente, personnalisation d'usine, importation confidentielle et conciergerie 24/7 en
              Afrique de l'Ouest.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#c8a46b]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Membre du Cercle Automobile Privé de Dakar</span>
            </div>
          </div>

          {/* Col 2: Showroom Brands (3 cols) */}
          <div className="lg:col-span-3 space-y-3 font-sans-clean">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#c8a46b] block font-medium">
              Maisons Représentées
            </span>
            <ul className="space-y-1.5 text-xs text-[#827d70]">
              {brands.map((b, idx) => (
                <li key={idx} className="hover:text-[#e6cb9d] transition-colors cursor-default">
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3 font-sans-clean">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#c8a46b] block font-medium">
              Navigation
            </span>
            <ul className="space-y-2 text-xs text-[#827d70]">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('showroom')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Collection Showroom
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('configurator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Atelier Configurateur
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journey')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Protocole 3 Étapes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Salon Privé Almadies
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Coordinates & Direct Line (3 cols) */}
          <div className="lg:col-span-3 space-y-3 font-sans-clean">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#c8a46b] block font-medium">
              Conciergerie Showroom
            </span>
            <div className="space-y-2 text-xs text-[#827d70]">
              <p>Route des Almadies, Presqu'île du Cap-Vert, Dakar, Sénégal</p>
              <p className="text-[#f0ece4] font-mono">Tél : +221 33 860 00 00</p>
              <p className="text-[#4ade80] font-mono">WhatsApp : +221 77 860 00 00</p>
              <p className="text-[11px] text-[#6d685d]">
                Visites sur réservation préalable du lundi au samedi
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans-clean text-[#6b665c]">
          <div className="flex items-center gap-4 flex-wrap text-[11px]">
            <span>© {new Date().getFullYear()} Almadies Prestige Motors Dakar. Tous droits réservés.</span>
            <span>•</span>
            <span>Véhicules certifiés conformes & homologations sénégalaises</span>
          </div>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-[#8c8577] hover:text-[#c8a46b] transition-colors py-1 cursor-pointer"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
