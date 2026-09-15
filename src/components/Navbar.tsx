import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, Calendar, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Showroom', path: '/showroom' },
    { name: "L'Expérience", path: '/experience' },
    { name: 'Salon & Contact', path: '/contact' },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0f1013]/95 backdrop-blur-md border-b border-[#232734] py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#090a0d]/95 via-[#090a0d]/70 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo / Monogram linking to / */}
        <Link
          id="brand-logo-link"
          to="/"
          className="group flex items-center gap-3.5 cursor-pointer"
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
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-sans-clean">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition-colors py-1 border-b-2 font-medium ${
                  isActive
                    ? 'text-[#e6cb9d] border-[#c8a46b]'
                    : 'text-[#9c9587] hover:text-[#e6cb9d] border-transparent'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons & Direct Line */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            id="direct-call-btn"
            href="tel:+221338600000"
            className="flex items-center gap-2 text-xs tracking-wider text-[#9b9487] hover:text-[#e6cb9d] transition-colors px-2 py-1"
            title="Ligne directe conciergerie Dakar"
          >
            <Phone className="w-3.5 h-3.5 text-[#c8a46b]" />
            <span className="font-mono text-[11px]">+221 33 860 00 00</span>
          </a>

          <Link
            id="nav-private-salon-btn"
            to="/contact"
            className="flex items-center gap-2 px-4 py-2 border border-[#c8a46b]/40 hover:border-[#c8a46b] bg-[#1a1c22]/90 hover:bg-[#c8a46b] text-[#e6cb9d] hover:text-[#0f1013] text-xs uppercase tracking-[0.15em] font-sans-clean transition-all duration-300 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Salon Privé</span>
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#c8a46b] hover:text-white"
            aria-label="Menu de navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0e12] border-b border-[#232734] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-sans-clean text-xs uppercase tracking-[0.18em]">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `py-2 transition-colors ${
                    isActive ? 'text-[#c8a46b] font-semibold' : 'text-[#a39c8e]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#1d212b] space-y-3">
            <a
              href="tel:+221338600000"
              className="flex items-center gap-2 text-xs text-[#9b9487] py-1"
            >
              <Phone className="w-4 h-4 text-[#c8a46b]" />
              <span className="font-mono">+221 33 860 00 00</span>
            </a>

            <Link
              to="/contact"
              className="block w-full py-3 text-center bg-[#c8a46b] text-[#0f1013] text-xs uppercase tracking-wider font-semibold"
            >
              Prendre Rendez-vous au Salon Privé
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
