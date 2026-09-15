import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShowroomPage } from './pages/ShowroomPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';

// Scroll to top automatically on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#090a0d] text-[#e8e4dc] font-sans-clean antialiased selection:bg-[#c8a46b] selection:text-[#0a0b0e] flex flex-col justify-between">
        <ScrollToTop />

        {/* Global Persistent Header */}
        <Navbar />

        {/* Main Routed Content Stage */}
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/showroom" element={<ShowroomPage />} />
            <Route path="/showroom/:slug" element={<VehicleDetailPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Persistent Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
