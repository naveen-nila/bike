import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { TestRideModal } from './components/common/TestRideModal';
import { VideoModal } from './components/common/VideoModal';
import { CartDrawer } from './components/common/CartDrawer';
import { CommandSearch } from './components/common/CommandSearch';

import { HomePage } from './pages/HomePage';
import { MotorcyclesPage } from './pages/MotorcyclesPage';
import { MotorcycleDetailPage } from './pages/MotorcycleDetailPage';
import { PowerPartsPage } from './pages/PowerPartsPage';
import { ConfiguratorPage } from './pages/ConfiguratorPage';
import { TelemetryPage } from './pages/TelemetryPage';
import { DealersPage } from './pages/DealersPage';
import { AboutPage } from './pages/AboutPage';
import { SupportPage } from './pages/SupportPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  return (
    <div className="min-h-screen bg-[#0d0f12] text-slate-200 flex flex-col font-sans selection:bg-[#ff5500] selection:text-white">
      {/* Persistent Navigation */}
      <Header />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {currentRoute === 'home' && <HomePage />}
        {currentRoute === 'motorcycles' && <MotorcyclesPage />}
        {currentRoute === 'motorcycle-detail' && <MotorcycleDetailPage />}
        {currentRoute === 'powerparts' && <PowerPartsPage />}
        {currentRoute === 'configurator' && <ConfiguratorPage />}
        {currentRoute === 'telemetry' && <TelemetryPage />}
        {currentRoute === 'dealers' && <DealersPage />}
        {currentRoute === 'about' && <AboutPage />}
        {currentRoute === 'support' && <SupportPage />}
        {currentRoute === 'contact' && <ContactPage />}
      </main>

      {/* Global Interactive Modals and Drawers */}
      <TestRideModal />
      <VideoModal />
      <CartDrawer />
      <CommandSearch />

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
