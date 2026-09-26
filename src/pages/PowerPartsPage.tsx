import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { POWERPARTS } from '../data/powerparts';
import { MOTORCYCLES } from '../data/motorcycles';
import { PowerPart } from '../types';
import { 
  Wrench, 
  Search, 
  Filter, 
  ShoppingBag, 
  Check, 
  Star, 
  Weight, 
  Zap, 
  X, 
  ShieldCheck 
} from 'lucide-react';

export const PowerPartsPage: React.FC = () => {
  const { addToCart, setIsCartDrawerOpen } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBikeFilter, setSelectedBikeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePartDetail, setActivePartDetail] = useState<PowerPart | null>(null);

  const categories = [
    'All',
    'Exhausts',
    'Chassis & Protection',
    'Brakes & Wheels',
    'Ergonomics & Controls',
    'Carbon & Aero'
  ];

  const filteredParts = POWERPARTS.filter(part => {
    if (selectedCategory !== 'All' && part.category !== selectedCategory) return false;
    if (selectedBikeFilter !== 'All' && !part.compatibleModels.includes(selectedBikeFilter)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = part.name.toLowerCase().includes(q) || 
                    part.partNumber.toLowerCase().includes(q) ||
                    part.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="pt-28 pb-20 bg-[#0d0f12] min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-[#272e3b] pb-8 mb-8">
          <span className="hud-label uppercase tracking-widest text-[#ff5500] block mb-1">
            FACTORY COMPETITION UPGRADES
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-racing text-white tracking-tight">
            KINETIC POWERPARTS
          </h1>
          <p className="text-sm text-[#8b94a5] max-w-2xl mt-2">
            Engineered alongside the racing department in Austria. Genuine titanium exhaust systems, CNC billet controls, floating wave rotors, and aerodynamic carbon components.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#15181e] border border-[#272e3b] p-4 rounded-xl mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search part name, article number, or keyword..."
                className="w-full bg-[#0d0f12] border border-[#272e3b] pl-9 pr-4 py-2 rounded text-xs text-white placeholder-slate-500 focus:border-[#ff5500] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Bike Compatibility Filter Dropdown */}
            <div className="flex items-center gap-2 text-xs font-racing">
              <span className="text-[#8b94a5]">Filter by Machine:</span>
              <select
                value={selectedBikeFilter}
                onChange={e => setSelectedBikeFilter(e.target.value)}
                className="bg-[#0d0f12] border border-[#272e3b] rounded px-3 py-2 text-xs text-white focus:border-[#ff5500] focus:outline-none"
              >
                <option value="All">All APEX Models</option>
                {MOTORCYCLES.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-[#272e3b]">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded text-xs font-racing font-bold uppercase whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#ff5500] text-black shadow-glow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#0d0f12]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-[#8b94a5] mb-6">
          <span>SHOWING {filteredParts.length} PERFORMANCE PARTS</span>
          <span>100% FACTORY HOMOLOGATED // DIRECT BOLT-ON</span>
        </div>

        {/* Parts Grid */}
        {filteredParts.length === 0 ? (
          <div className="bg-[#15181e] border border-[#272e3b] rounded-xl p-12 text-center text-slate-400">
            <Wrench className="w-10 h-10 mx-auto mb-3 text-slate-500" />
            <h3 className="text-lg font-racing font-bold text-white mb-1">
              No matching PowerParts found
            </h3>
            <p className="text-xs text-[#8b94a5] max-w-sm mx-auto mb-4">
              Try adjusting your category filter, bike selection, or search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBikeFilter('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#ff5500] text-black font-racing font-bold text-xs uppercase rounded"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredParts.map(part => (
              <div
                key={part.id}
                className="bg-[#15181e] border border-[#272e3b] hover:border-[#ff5500]/70 rounded-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-lg"
              >
                <div>
                  {/* Image Stage */}
                  <div 
                    onClick={() => setActivePartDetail(part)}
                    className="h-48 bg-[#1c212a] p-4 flex items-center justify-center relative cursor-pointer overflow-hidden"
                  >
                    <img
                      src={part.image}
                      alt={part.name}
                      className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#0d0f12]/80 backdrop-blur border border-[#272e3b] text-[9px] font-mono text-[#ff5500] px-2 py-0.5 rounded">
                      {part.category}
                    </span>
                    {part.powerDeltaHp && (
                      <span className="absolute top-3 right-3 bg-[#ff5500] text-black font-racing font-bold text-[10px] px-2 py-0.5 rounded">
                        +{part.powerDeltaHp} HP
                      </span>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-5">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      {part.partNumber}
                    </div>
                    <h3 
                      onClick={() => setActivePartDetail(part)}
                      className="text-sm font-racing font-bold text-white group-hover:text-[#ff5500] transition-colors mt-0.5 cursor-pointer line-clamp-1"
                    >
                      {part.name}
                    </h3>
                    
                    <p className="text-xs text-[#8b94a5] mt-2 line-clamp-2 leading-relaxed">
                      {part.description}
                    </p>

                    {/* Weight & Rating */}
                    <div className="flex items-center justify-between text-xs font-mono py-2.5 mt-3 border-t border-[#272e3b]">
                      <span className="text-slate-400">
                        {part.weightDeltaKg ? `${part.weightDeltaKg} kg savings` : 'Direct OEM fit'}
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        {part.rating} ({part.reviewsCount})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Price & Add CTA */}
                <div className="p-5 pt-0 flex items-center justify-between gap-3">
                  <div className="text-lg font-racing font-bold text-white font-mono">
                    €{part.price}
                  </div>
                  <button
                    onClick={() => addToCart(part, 1)}
                    className="px-4 py-2 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all shadow-glow-sm flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Build</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Part Quick Detail Modal */}
      {activePartDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#15181e] border border-[#ff5500] rounded-xl max-w-2xl w-full p-6 text-slate-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-mono text-[#ff5500] uppercase font-bold">
                  {activePartDetail.partNumber} // {activePartDetail.category}
                </span>
                <h3 className="text-2xl font-racing font-black text-white mt-0.5">
                  {activePartDetail.name}
                </h3>
              </div>
              <button
                onClick={() => setActivePartDetail(null)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="h-64 bg-[#0d0f12] rounded-lg border border-[#272e3b] p-4 flex items-center justify-center mb-6">
              <img
                src={activePartDetail.image}
                alt={activePartDetail.name}
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-sm text-[#8b94a5] leading-relaxed mb-6">
              {activePartDetail.description}
            </p>

            {/* Feature Bullet Points */}
            <div className="bg-[#0d0f12] border border-[#272e3b] p-4 rounded-lg mb-6 space-y-2">
              <span className="text-xs font-racing uppercase tracking-wider text-slate-300 block mb-2">
                Factory Specifications & Highlights:
              </span>
              {activePartDetail.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Compatible Models */}
            <div className="mb-6">
              <span className="text-xs font-racing uppercase tracking-wider text-slate-400 block mb-2">
                Compatible Machines:
              </span>
              <div className="flex flex-wrap gap-2">
                {activePartDetail.compatibleModels.map(bikeId => {
                  const b = MOTORCYCLES.find(m => m.id === bikeId);
                  return (
                    <span key={bikeId} className="px-2.5 py-1 rounded bg-[#0d0f12] border border-[#272e3b] text-xs font-mono text-white">
                      {b ? b.name : bikeId}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#272e3b] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8b94a5] font-mono block">RETAIL PRICE (VAT INCL)</span>
                <span className="text-2xl font-racing font-bold text-white font-mono">
                  €{activePartDetail.price}
                </span>
              </div>
              <button
                onClick={() => {
                  addToCart(activePartDetail, 1);
                  setActivePartDetail(null);
                }}
                className="px-6 py-3 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all shadow-glow-sm"
              >
                Add to Build Cart
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
