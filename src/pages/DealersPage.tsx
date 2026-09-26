import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEALERS } from '../data/dealers';
import { Dealer } from '../types';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Search, 
  Filter, 
  Star, 
  Navigation, 
  Check, 
  Clock, 
  ChevronRight 
} from 'lucide-react';

export const DealersPage: React.FC = () => {
  const { openTestRideModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<string>('All');
  const [activeDealer, setActiveDealer] = useState<Dealer>(DEALERS[0]);
  const [copiedDirections, setCopiedDirections] = useState<string | null>(null);

  const services = ['All', 'Official Showroom', 'Dyno Tuning', 'WP Pro Center', 'Track Day Prep'];

  const filteredDealers = DEALERS.filter(d => {
    if (selectedService !== 'All' && !d.services.includes(selectedService as any)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = d.name.toLowerCase().includes(q) ||
                    d.city.toLowerCase().includes(q) ||
                    d.country.toLowerCase().includes(q) ||
                    d.zip.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleCopyAddress = (dealer: Dealer) => {
    navigator.clipboard?.writeText(`${dealer.name}, ${dealer.address}`);
    setCopiedDirections(dealer.id);
    setTimeout(() => setCopiedDirections(null), 2500);
  };

  return (
    <div className="pt-28 pb-20 bg-[#0d0f12] min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#272e3b] pb-8 mb-8">
          <span className="hud-label uppercase tracking-widest text-[#ff5500] block mb-1">
            GLOBAL DEALERSHIP & RACE WORKS NETWORK
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-racing text-white tracking-tight">
            FIND A CERTIFIED APEX DEALER
          </h1>
          <p className="text-sm text-[#8b94a5] max-w-2xl mt-2">
            Locate authorized Kinetic factory flagships, certified WP Pro suspension tuning centers, and race-prep facilities offering exclusive test rides.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#15181e] border border-[#272e3b] p-4 rounded-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by city, country, or postal code (e.g. Munich, Austin, 5230)..."
              className="w-full bg-[#0d0f12] border border-[#272e3b] pl-9 pr-4 py-2.5 rounded text-xs text-white placeholder-slate-500 focus:border-[#ff5500] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {services.map(s => (
              <button
                key={s}
                onClick={() => setSelectedService(s)}
                className={`px-3 py-1.5 rounded text-xs font-racing font-bold uppercase whitespace-nowrap transition-colors ${
                  selectedService === s
                    ? 'bg-[#ff5500] text-black shadow-glow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#0d0f12]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Dealer View: List vs Active Dealer Map & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Dealer Cards List */}
          <div className="lg:col-span-5 space-y-4 max-h-[800px] overflow-y-auto pr-1">
            {filteredDealers.map(dealer => {
              const isSelected = activeDealer.id === dealer.id;
              return (
                <div
                  key={dealer.id}
                  onClick={() => setActiveDealer(dealer)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#1c212a] border-[#ff5500] shadow-glow-sm'
                      : 'bg-[#15181e] border-[#272e3b] hover:border-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-[#ff5500] uppercase font-bold">
                        {dealer.city}, {dealer.country}
                      </span>
                      <h3 className="font-racing font-bold text-base text-white mt-0.5">
                        {dealer.name}
                      </h3>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-mono text-amber-400 font-bold bg-[#0d0f12] px-2 py-0.5 rounded border border-[#272e3b]">
                      <Star className="w-3 h-3 fill-current" />
                      {dealer.rating}
                    </span>
                  </div>

                  <p className="text-xs text-[#8b94a5] mb-3 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                    <span>{dealer.address}</span>
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {dealer.services.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-[#0d0f12] text-[10px] font-mono text-slate-300 border border-[#272e3b]">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#272e3b]/60 text-xs">
                    <span className="text-[#8b94a5] font-mono">
                      {dealer.testRidesAvailable.length} Demo Bikes Available
                    </span>
                    <span className="text-[#ff5500] font-racing font-bold uppercase flex items-center gap-1">
                      <span>View Center</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Dealer Interactive Hub & Map View */}
          <div className="lg:col-span-7 bg-[#15181e] border border-[#272e3b] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#272e3b] gap-4">
                <div>
                  <span className="hud-label uppercase tracking-widest text-[#ff5500] block mb-1">
                    OFFICIAL FACTORY APPOINTED
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-racing font-black text-white">
                    {activeDealer.name}
                  </h2>
                  <div className="text-xs text-[#8b94a5] mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>{activeDealer.address}</span>
                  </div>
                </div>

                <button
                  onClick={() => openTestRideModal('apex-390r')}
                  className="px-5 py-2.5 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all shadow-glow-sm"
                >
                  Book Test Ride Here
                </button>
              </div>

              {/* Simulated High-Tech Map Canvas */}
              <div className="relative aspect-video w-full bg-[#0d0f12] rounded-xl border border-[#272e3b] overflow-hidden mb-6 flex items-center justify-center p-4">
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
                
                {/* Radar rings */}
                <div className="absolute w-64 h-64 border border-[#ff5500]/20 rounded-full animate-pulse-ring"></div>
                <div className="absolute w-40 h-40 border border-[#ff5500]/30 rounded-full"></div>

                {/* Pin marker */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#ff5500] text-black flex items-center justify-center shadow-glow-orange animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="bg-[#15181e] border border-[#ff5500] px-3 py-1 rounded text-xs font-racing font-bold text-white shadow-xl mt-2">
                    {activeDealer.city} Location
                  </div>
                  <div className="text-[10px] font-mono text-[#8b94a5] mt-0.5">
                    LAT {activeDealer.lat.toFixed(4)} // LNG {activeDealer.lng.toFixed(4)}
                  </div>
                </div>

                {/* Map Action Button */}
                <button
                  onClick={() => handleCopyAddress(activeDealer)}
                  className="absolute bottom-4 right-4 bg-[#15181e]/90 hover:bg-[#ff5500] hover:text-black border border-[#272e3b] px-3 py-1.5 rounded text-xs font-racing uppercase tracking-wider text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{copiedDirections === activeDealer.id ? 'Address Copied!' : 'Copy GPS Directions'}</span>
                </button>
              </div>

              {/* Details & Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-[#0d0f12] border border-[#272e3b] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8b94a5] uppercase">PHONE HOTLINE</div>
                  <a href={`tel:${activeDealer.phone}`} className="text-sm font-racing font-bold text-white mt-1 hover:text-[#ff5500] block">
                    {activeDealer.phone}
                  </a>
                  <span className="text-[10px] text-emerald-400">Direct Workshop Desk</span>
                </div>

                <div className="p-4 bg-[#0d0f12] border border-[#272e3b] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8b94a5] uppercase">EMAIL ENQUIRIES</div>
                  <a href={`mailto:${activeDealer.email}`} className="text-xs font-mono text-white mt-1 hover:text-[#ff5500] block truncate">
                    {activeDealer.email}
                  </a>
                  <span className="text-[10px] text-slate-400">Responds in &lt; 2 hours</span>
                </div>

                <div className="p-4 bg-[#0d0f12] border border-[#272e3b] rounded-lg">
                  <div className="text-[10px] font-mono text-[#8b94a5] uppercase">SHOWROOM HOURS</div>
                  <div className="text-xs font-mono text-white mt-1">
                    Mon - Sat: 08:30 - 18:30
                  </div>
                  <span className="text-[10px] text-slate-400">Sunday: Track Prep Only</span>
                </div>
              </div>

              {/* Demo Fleet at this location */}
              <div>
                <span className="text-xs font-racing uppercase tracking-wider text-slate-300 block mb-2">
                  Active Demo Fleet Machines at this Location:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {activeDealer.testRidesAvailable.map(bikeId => (
                    <div key={bikeId} className="p-2.5 rounded bg-[#0d0f12] border border-[#272e3b] text-center">
                      <span className="text-[10px] font-mono text-[#ff5500] uppercase block">AVAILABLE</span>
                      <span className="text-xs font-racing font-bold text-white block mt-0.5">{bikeId.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
