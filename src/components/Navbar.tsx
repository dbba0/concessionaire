import React, { useState, useEffect } from 'react';
import { Compass, Phone, Calendar, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenContact: (vehicleModel?: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0f1013]/90 backdrop-blur-md border-b border-[#262933] py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#0a0b0d]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo / Monogram */}
        <div
          id="brand-logo-button"
          onClick={() => handleNavClick('hero')}
          className="cursor-pointer group flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#c8a46b] to-[#8d6f3c] p-[1px] shadow-lg">
            <div className="w-full h-full bg-[#0f1013] flex items-center justify-center">
              <span className="font-serif-luxury text-lg tracking-widest text-[#e6cb9d] group-hover:scale-105 transition-transform">
                AP
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-base sm:text-lg tracking-[0.2em] text-[#f2ede4] uppercase">
              Almadies Prestige
            </span>
            <span className="font-sans-clean text-[10px] tracking-[0.3em] text-[#a79477] uppercase">
              Dakar • Maison Automobile
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-sans-clean text-[#b8b3a8]">
          <button
            id="nav-collection-btn"
            onClick={() => handleNavClick('showroom')}
            className="hover:text-[#e6cb9d] transition-colors cursor-pointer py-1 border-b border-transparent hover:border-[#c8a46b]"
          >
            Showroom d'Exception
          </button>
          <button
            id="nav-configurator-btn"
            onClick={() => handleNavClick('configurator')}
            className="hover:text-[#e6cb9d] transition-colors cursor-pointer py-1 border-b border-transparent hover:border-[#c8a46b]"
          >
            Configurateur Atelier
          </button>
          <button
            id="nav-journey-btn"
            onClick={() => handleNavClick('journey')}
            className="hover:text-[#e6cb9d] transition-colors cursor-pointer py-1 border-b border-transparent hover:border-[#c8a46b]"
          >
            L'Expérience Client
          </button>
          <button
            id="nav-location-btn"
            onClick={() => handleNavClick('contact')}
            className="hover:text-[#e6cb9d] transition-colors cursor-pointer py-1 border-b border-transparent hover:border-[#c8a46b]"
          >
            Les Almadies
          </button>
        </nav>

        {/* Action Button & Direct Call */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            id="direct-call-btn"
            href="tel:+221338600000"
            className="flex items-center gap-2 text-xs tracking-wider text-[#9b9487] hover:text-[#e6cb9d] transition-colors px-2 py-1"
            title="Ligne directe conciergerie"
          >
            <Phone className="w-3.5 h-3.5 text-[#c8a46b]" />
            <span className="font-mono text-[11px]">+221 33 860 00 00</span>
          </a>

          <button
            id="open-private-salon-btn"
            onClick={() => onOpenContact()}
            className="flex items-center gap-2.5 px-4 py-2 border border-[#c8a46b]/40 hover:border-[#c8a46b] bg-[#1a1c22]/80 hover:bg-[#c8a46b] text-[#e6cb9d] hover:text-[#0f1013] text-xs uppercase tracking-[0.15em] font-sans-clean transition-all duration-300 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Salon Privé</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#c8a46b] hover:text-white"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#111317] border-b border-[#252833] px-6 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="flex flex-col space-y-3 font-sans-clean text-sm tracking-wider uppercase text-[#c7c2b7]">
            <button
              onClick={() => handleNavClick('showroom')}
              className="text-left py-2 border-b border-[#1c1f28] hover:text-[#c8a46b]"
            >
              Showroom d'Exception
            </button>
            <button
              onClick={() => handleNavClick('configurator')}
              className="text-left py-2 border-b border-[#1c1f28] hover:text-[#c8a46b]"
            >
              Configurateur Atelier
            </button>
            <button
              onClick={() => handleNavClick('journey')}
              className="text-left py-2 border-b border-[#1c1f28] hover:text-[#c8a46b]"
            >
              L'Expérience Client Almadies
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 border-b border-[#1c1f28] hover:text-[#c8a46b]"
            >
              Localisation & Conciergerie
            </button>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center bg-[#c8a46b] text-[#0f1013] text-xs uppercase tracking-[0.2em] font-semibold"
            >
              Réserver une visite privée
            </button>
            <a
              href="tel:+221338600000"
              className="text-center text-xs text-[#9c9586] hover:text-[#e6cb9d]"
            >
              Ligne showroom : +221 33 860 00 00
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
