import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const brands = [
    { name: 'Rolls-Royce Motor Cars', slug: 'rolls-royce-cullinan-black-badge' },
    { name: 'Ferrari Maranello', slug: 'ferrari-purosangue-v12' },
    { name: 'Bentley Motors Crewe', slug: 'bentley-continental-gt-speed' },
    { name: 'Lamborghini Automobili', slug: 'lamborghini-urus-performante' },
    { name: 'Mercedes-Maybach', slug: 'mercedes-maybach-gls-600' },
    { name: 'Range Rover SV Special Vehicle', slug: 'range-rover-sv-l460' },
    { name: 'Porsche Motorsport Weissach', slug: 'porsche-911-gt3-rs-weissach' },
  ];

  return (
    <footer id="main-footer" className="bg-[#08090b] border-t border-[#1b1e27] pt-16 pb-12 text-[#9c9587]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1b1e26]">
          {/* Col 1: Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
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
            </Link>

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
                <li key={idx}>
                  <Link
                    to={`/showroom/${b.slug}`}
                    className="hover:text-[#e6cb9d] transition-colors"
                  >
                    {b.name}
                  </Link>
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
                <Link to="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/showroom" className="hover:text-white transition-colors">
                  Collection Showroom
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-white transition-colors">
                  Protocole Client
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Salon Privé & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Coordinates (3 cols) */}
          <div className="lg:col-span-3 space-y-3 font-sans-clean text-xs">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#c8a46b] block font-medium">
              Showroom Almadies
            </span>
            <div className="space-y-2 text-[#827d70]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c8a46b] flex-shrink-0 mt-0.5" />
                <span>Pointe des Almadies, Face Océan Atlantique, Dakar, Sénégal</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c8a46b] flex-shrink-0" />
                <span className="font-mono text-[#a39c8f]">+221 33 860 00 00</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#c8a46b] flex-shrink-0" />
                <span className="font-mono text-[#a39c8f]">direction@almadies-prestige.sn</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans-clean text-[#6e685c]">
          <div>
            © {new Date().getFullYear()} Almadies Prestige Motors Dakar. Tous droits réservés.
            Homologation & immatriculation conformes République du Sénégal.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#9c9587] hover:text-[#c8a46b] transition-colors cursor-pointer py-1"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
