import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { navigate, openTestRideModal } = useApp();
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState<'privacy' | 'telemetry' | null>(null);

  return (
    <footer className="bg-black border-t border-[#272e3b]/60 pt-16 pb-12 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-[#272e3b]/40">
          
          {/* Logo & Bio */}
          <div className="md:col-span-2">
            <button 
              onClick={() => navigate('home')} 
              className="flex items-center gap-3 text-left focus:outline-none"
            >
              <div className="w-8 h-8 bg-[#ff5500] flex items-center justify-center font-racing font-bold text-base text-black technical-cut">
                390
              </div>
              <span className="font-racing font-bold tracking-wider text-lg text-white">
                APEX <span className="text-[#ff5500]">390R</span>
              </span>
            </button>
            
            <p className="mt-4 text-[#8b94a5] leading-relaxed max-w-sm">
              Engineered with Austrian racing heritage for street brawlers and track purists. Unmatched agility, cutting telemetry, and aggressive streetfighter styling.
            </p>

            <div className="mt-6 flex items-center gap-4 text-slate-300">
              <a 
                aria-label="Instagram" 
                className="hover:text-[#ff5500] transition-colors p-1" 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
              <a 
                aria-label="YouTube" 
                className="hover:text-[#ff5500] transition-colors p-1" 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Motorcycles Navigation */}
          <div>
            <span className="font-racing font-bold text-white text-xs uppercase tracking-wider block mb-4">
              Motorcycles
            </span>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => navigate('motorcycle-detail', 'apex-125')} 
                  className="hover:text-[#ff5500] transition-colors text-left"
                >
                  APEX 125 Naked
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('motorcycle-detail', 'apex-390r')} 
                  className="text-[#ff5500] font-semibold text-left"
                >
                  APEX 390R Factory
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('motorcycle-detail', 'apex-890-gp')} 
                  className="hover:text-[#ff5500] transition-colors text-left"
                >
                  APEX 890 GP Edition
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('motorcycle-detail', 'apex-1290-super-naked')} 
                  className="hover:text-[#ff5500] transition-colors text-left"
                >
                  APEX 1290 Super Naked
                </button>
              </li>
            </ul>
          </div>

          {/* Racing & PowerParts */}
          <div>
            <span className="font-racing font-bold text-white text-xs uppercase tracking-wider block mb-4">
              PowerParts
            </span>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => navigate('powerparts')} 
                  className="hover:text-[#ff5500] transition-colors text-left"
                >
                  Akrapovič Slip-On
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('powerparts')} 
                  className="hover:text-[#ff5500] transition-colors text-left"
                >
                  Adjustable Rearsets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('powerparts')} 
                  className="hover:text-[#ff5500] transition-colors text-left"
                >
                  Wave Brake Rotors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('powerparts')} 
                  className="hover:text-[#ff5500] transition-colors text-left"
                >
                  Crash Bungs & Guards
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <span className="font-racing font-bold text-white text-xs uppercase tracking-wider block mb-4">
              Support
            </span>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => navigate('dealers')} 
                  className="hover:text-[#ff5500] transition-colors text-left"
                >
                  Find a Certified Dealer
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('support')} 
                  className="hover:text-[#ff5500] transition-colors text-left"
                >
                  Service & Maintenance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('support')} 
                  className="hover:text-[#ff5500] transition-colors text-left"
                >
                  Owner Manuals (PDF)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('support')} 
                  className="hover:text-[#ff5500] transition-colors text-left"
                >
                  Warranty Registration
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[#8b94a5] text-[11px] font-mono gap-4">
          <div>
            © 2025 KINETIC MOTORCYCLES GMBH. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLegalModalOpen('privacy')} 
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setLegalModalOpen('telemetry')} 
              className="hover:text-white transition-colors"
            >
              Telemetry Legal Notice
            </button>
            <button 
              onClick={() => setCookieModalOpen(true)} 
              className="hover:text-white transition-colors"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>

      {/* Cookie / Legal Modals */}
      {cookieModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#15181e] border border-[#272e3b] p-6 max-w-md w-full rounded-lg text-slate-200">
            <h4 className="font-racing font-bold text-lg text-white mb-2">Cookie Preferences</h4>
            <p className="text-xs text-[#8b94a5] mb-4">
              We use functional cookies to save your custom 3D bike configurations and PowerParts build cart locally on your device. No third-party profiling cookies are sold.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCookieModalOpen(false)}
                className="px-4 py-2 bg-[#ff5500] text-black font-racing font-bold text-xs uppercase rounded"
              >
                Accept Necessary Only
              </button>
            </div>
          </div>
        </div>
      )}

      {legalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#15181e] border border-[#272e3b] p-6 max-w-lg w-full rounded-lg text-slate-200 max-h-[80vh] overflow-y-auto">
            <h4 className="font-racing font-bold text-lg text-white mb-2">
              {legalModalOpen === 'privacy' ? 'Privacy Policy' : 'Telemetry Legal Notice'}
            </h4>
            <div className="text-xs text-slate-400 space-y-3 leading-relaxed">
              <p>
                Kinetic Motorcycles GmbH adheres strictly to GDPR and motorsport telemetry transmission standards. On-board CAN-bus telemetry data (lean angle, ABS slip events, throttle curves) recorded by Bosch 9.3 MP units is encrypted and stored locally in the motorcycle ECU.
              </p>
              <p>
                When synced through the Kinetic Ride App, telemetry logs are processed solely for diagnostic safety analytics and track lap optimization under rider consent.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setLegalModalOpen(null)}
                className="px-4 py-2 bg-[#272e3b] hover:bg-[#ff5500] hover:text-black transition-colors text-white font-racing font-bold text-xs uppercase rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
