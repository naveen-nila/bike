import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';
import { 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  ChevronRight, 
  Sliders, 
  MapPin, 
  ShieldCheck, 
  BookOpen, 
  Phone 
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentRoute, 
    navigate, 
    openTestRideModal, 
    cartCount, 
    setIsCartDrawerOpen, 
    setIsSearchOpen 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const handleNavClick = (route: PageRoute, targetSection?: string) => {
    navigate(route, undefined, targetSection);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0f12]/95 backdrop-blur-md border-b border-[#272e3b]/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
          data-purpose="brand-identity"
          aria-label="KINETIC APEX Home"
        >
          <div className="w-10 h-10 bg-[#ff5500] flex items-center justify-center font-racing font-bold text-xl text-black technical-cut transform group-hover:scale-105 transition-transform shadow-glow-sm">
            390
          </div>
          <div className="flex flex-col">
            <span className="font-racing font-bold tracking-wider text-xl leading-tight text-white flex items-center gap-1.5">
              APEX <span className="text-[#ff5500]">390R</span>
            </span>
            <span className="text-[9px] tracking-widest text-[#8b94a5] uppercase font-mono">
              Kinetic Performance Lab
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-7">
          <button 
            onClick={() => handleNavClick('home')}
            className={`text-xs uppercase tracking-widest font-racing font-semibold transition-colors flex items-center gap-1 ${
              currentRoute === 'home' ? 'text-[#ff5500]' : 'text-slate-300 hover:text-[#ff5500]'
            }`}
          >
            01 // Overview
          </button>

          <button 
            onClick={() => handleNavClick('motorcycles')}
            className={`text-xs uppercase tracking-widest font-racing font-semibold transition-colors ${
              currentRoute === 'motorcycles' || currentRoute === 'motorcycle-detail' 
                ? 'text-[#ff5500]' 
                : 'text-slate-300 hover:text-[#ff5500]'
            }`}
          >
            Lineup
          </button>

          <button 
            onClick={() => handleNavClick('powerparts')}
            className={`text-xs uppercase tracking-widest font-racing font-semibold transition-colors flex items-center gap-1 ${
              currentRoute === 'powerparts' ? 'text-[#ff5500]' : 'text-slate-300 hover:text-[#ff5500]'
            }`}
          >
            PowerParts
          </button>

          <button 
            onClick={() => handleNavClick('telemetry')}
            className={`text-xs uppercase tracking-widest font-racing font-semibold transition-colors ${
              currentRoute === 'telemetry' ? 'text-[#ff5500]' : 'text-slate-300 hover:text-[#ff5500]'
            }`}
          >
            Telemetry
          </button>

          {/* More menu dropdown */}
          <div className="relative" onMouseLeave={() => setMoreDropdownOpen(false)}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              onMouseEnter={() => setMoreDropdownOpen(true)}
              className="text-xs uppercase tracking-widest font-racing font-semibold text-slate-300 hover:text-[#ff5500] transition-colors flex items-center gap-1 py-2"
            >
              More
              <span className={`transform transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {moreDropdownOpen && (
              <div className="absolute top-full left-0 w-48 bg-[#15181e] border border-[#272e3b] shadow-2xl py-2 rounded mt-1 z-50">
                <button
                  onClick={() => handleNavClick('dealers')}
                  className="w-full text-left px-4 py-2 text-xs font-racing uppercase tracking-wider text-slate-300 hover:text-white hover:bg-[#1c212a] flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#ff5500]" />
                  Find Dealer
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className="w-full text-left px-4 py-2 text-xs font-racing uppercase tracking-wider text-slate-300 hover:text-white hover:bg-[#1c212a] flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ff5500]" />
                  Heritage & R&D
                </button>
                <button
                  onClick={() => handleNavClick('support')}
                  className="w-full text-left px-4 py-2 text-xs font-racing uppercase tracking-wider text-slate-300 hover:text-white hover:bg-[#1c212a] flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#ff5500]" />
                  Manuals & Service
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-left px-4 py-2 text-xs font-racing uppercase tracking-wider text-slate-300 hover:text-white hover:bg-[#1c212a] flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
                  Contact Lab
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* CTA Controls & Utilities */}
        <div className="flex items-center gap-3">
          
          {/* Quick Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-slate-400 hover:text-[#ff5500] hover:bg-[#1c212a] rounded transition-colors"
            title="Search bikes, parts, specs (Ctrl+K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative p-2 text-slate-400 hover:text-[#ff5500] hover:bg-[#1c212a] rounded transition-colors"
            title="View PowerParts Build Cart"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff5500] text-black font-racing font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* 3D Studio Configurator Button */}
          <button
            onClick={() => handleNavClick('configurator')}
            className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-racing font-semibold uppercase tracking-wider border rounded transition-all ${
              currentRoute === 'configurator'
                ? 'border-[#ff5500] text-[#ff5500] bg-[#1c212a]'
                : 'text-slate-300 border-[#272e3b] hover:border-[#ff5500]/60 hover:text-white bg-[#15181e]'
            }`}
            type="button"
          >
            <Sliders className="w-3.5 h-3.5 text-[#ff5500]" />
            Configure 3D
          </button>

          {/* Book Test Ride CTA */}
          <button
            onClick={() => openTestRideModal()}
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all duration-200 shadow-glow-sm hover:shadow-glow-orange flex items-center gap-1.5 sm:gap-2"
          >
            <span>Book Test Ride</span>
            <ChevronRight className="w-3 h-3 stroke-[3]" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-[#ff5500] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0f12] border-b border-[#272e3b] px-4 pt-4 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#272e3b]">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-3 text-left font-racing font-bold text-xs uppercase rounded bg-[#15181e] border ${
                currentRoute === 'home' ? 'border-[#ff5500] text-[#ff5500]' : 'border-[#272e3b] text-slate-200'
              }`}
            >
              01 // Overview
            </button>
            <button
              onClick={() => handleNavClick('motorcycles')}
              className={`p-3 text-left font-racing font-bold text-xs uppercase rounded bg-[#15181e] border ${
                currentRoute === 'motorcycles' ? 'border-[#ff5500] text-[#ff5500]' : 'border-[#272e3b] text-slate-200'
              }`}
            >
              Motorcycles
            </button>
            <button
              onClick={() => handleNavClick('powerparts')}
              className={`p-3 text-left font-racing font-bold text-xs uppercase rounded bg-[#15181e] border ${
                currentRoute === 'powerparts' ? 'border-[#ff5500] text-[#ff5500]' : 'border-[#272e3b] text-slate-200'
              }`}
            >
              PowerParts ({cartCount})
            </button>
            <button
              onClick={() => handleNavClick('configurator')}
              className={`p-3 text-left font-racing font-bold text-xs uppercase rounded bg-[#15181e] border ${
                currentRoute === 'configurator' ? 'border-[#ff5500] text-[#ff5500]' : 'border-[#272e3b] text-slate-200'
              }`}
            >
              Configure 3D
            </button>
          </div>

          <div className="space-y-1 text-xs font-racing uppercase tracking-wider text-slate-300">
            <button
              onClick={() => handleNavClick('telemetry')}
              className="w-full text-left px-3 py-2.5 hover:bg-[#15181e] rounded flex items-center justify-between"
            >
              <span>Telemetry Lab & Dyno</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#ff5500]" />
            </button>
            <button
              onClick={() => handleNavClick('dealers')}
              className="w-full text-left px-3 py-2.5 hover:bg-[#15181e] rounded flex items-center justify-between"
            >
              <span>Find Certified Dealer</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#ff5500]" />
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="w-full text-left px-3 py-2.5 hover:bg-[#15181e] rounded flex items-center justify-between"
            >
              <span>Racing Heritage & R&D</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#ff5500]" />
            </button>
            <button
              onClick={() => handleNavClick('support')}
              className="w-full text-left px-3 py-2.5 hover:bg-[#15181e] rounded flex items-center justify-between"
            >
              <span>Owner Manuals & Service</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#ff5500]" />
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full text-left px-3 py-2.5 hover:bg-[#15181e] rounded flex items-center justify-between"
            >
              <span>Contact Lab</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#ff5500]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
