import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MOTORCYCLES } from '../../data/motorcycles';
import { POWERPARTS } from '../../data/powerparts';
import { MANUALS } from '../../data/manuals';
import { DEALERS } from '../../data/dealers';
import { Search, X, Bike, Wrench, FileText, MapPin, ChevronRight } from 'lucide-react';

export const CommandSearch: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigate, openTestRideModal } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input and keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredBikes = MOTORCYCLES.filter(b => 
    b.name.toLowerCase().includes(q) || 
    b.subTitle.toLowerCase().includes(q) || 
    b.displacement.toLowerCase().includes(q) ||
    b.category.toLowerCase().includes(q)
  );

  const filteredParts = POWERPARTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.partNumber.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );

  const filteredManuals = MANUALS.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.model.toLowerCase().includes(q) ||
    m.type.toLowerCase().includes(q)
  );

  const filteredDealers = DEALERS.filter(d =>
    d.name.toLowerCase().includes(q) ||
    d.city.toLowerCase().includes(q) ||
    d.country.toLowerCase().includes(q)
  );

  const hasResults = filteredBikes.length > 0 || filteredParts.length > 0 || filteredManuals.length > 0 || filteredDealers.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#15181e] border border-[#272e3b] rounded-xl shadow-2xl overflow-hidden text-slate-200">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-[#0d0f12] border-b border-[#272e3b] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#ff5500]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search motorcycles, PowerParts, telemetry, manuals, or dealers..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!hasResults && query ? (
            <div className="py-8 text-center text-xs text-[#8b94a5]">
              No technical entries matching "{query}". Try "390", "Akrapovic", "clutch", "manual", or "Munich".
            </div>
          ) : null}

          {/* Quick Suggestions when empty */}
          {!query && (
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-[#8b94a5] uppercase tracking-wider">
                QUICK ACCESS // POPULAR SEARCHES
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'APEX 390R Factory', action: () => navigate('motorcycle-detail', 'apex-390r') },
                  { label: 'Akrapovič Slip-On', action: () => navigate('powerparts') },
                  { label: '3D Configurator', action: () => navigate('configurator') },
                  { label: 'WP APEX Setup Manual', action: () => navigate('support') },
                  { label: 'Book Test Ride', action: () => openTestRideModal('apex-390r') },
                  { label: 'Dyno Telemetry', action: () => navigate('telemetry') }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsSearchOpen(false);
                      item.action();
                    }}
                    className="px-3 py-1.5 rounded bg-[#0d0f12] border border-[#272e3b] hover:border-[#ff5500] hover:text-[#ff5500] text-xs font-racing transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bikes Section */}
          {filteredBikes.length > 0 && (
            <div>
              <span className="text-[10px] font-mono text-[#ff5500] font-bold uppercase tracking-wider block mb-2">
                MOTORCYCLES ({filteredBikes.length})
              </span>
              <div className="space-y-1">
                {filteredBikes.map(bike => (
                  <button
                    key={bike.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate('motorcycle-detail', bike.id);
                    }}
                    className="w-full text-left p-2.5 rounded bg-[#0d0f12]/60 hover:bg-[#1c212a] border border-[#272e3b]/50 hover:border-[#ff5500]/60 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Bike className="w-4 h-4 text-[#ff5500]" />
                      <div>
                        <div className="text-xs font-racing font-bold text-white group-hover:text-[#ff5500]">
                          {bike.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {bike.displacement} · {bike.power} · €{bike.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PowerParts Section */}
          {filteredParts.length > 0 && (
            <div>
              <span className="text-[10px] font-mono text-[#ff5500] font-bold uppercase tracking-wider block mb-2">
                POWERPARTS & ACCESSORIES ({filteredParts.length})
              </span>
              <div className="space-y-1">
                {filteredParts.map(part => (
                  <button
                    key={part.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate('powerparts');
                    }}
                    className="w-full text-left p-2.5 rounded bg-[#0d0f12]/60 hover:bg-[#1c212a] border border-[#272e3b]/50 hover:border-[#ff5500]/60 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Wrench className="w-4 h-4 text-slate-400 group-hover:text-[#ff5500]" />
                      <div>
                        <div className="text-xs font-racing font-bold text-white group-hover:text-[#ff5500]">
                          {part.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {part.partNumber} · €{part.price}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dealers */}
          {filteredDealers.length > 0 && (
            <div>
              <span className="text-[10px] font-mono text-[#ff5500] font-bold uppercase tracking-wider block mb-2">
                DEALERS & TEST CENTERS ({filteredDealers.length})
              </span>
              <div className="space-y-1">
                {filteredDealers.map(dealer => (
                  <button
                    key={dealer.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate('dealers');
                    }}
                    className="w-full text-left p-2.5 rounded bg-[#0d0f12]/60 hover:bg-[#1c212a] border border-[#272e3b]/50 hover:border-[#ff5500]/60 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="text-xs font-racing font-bold text-white group-hover:text-[#ff5500]">
                          {dealer.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {dealer.city}, {dealer.country}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Manuals */}
          {filteredManuals.length > 0 && (
            <div>
              <span className="text-[10px] font-mono text-[#ff5500] font-bold uppercase tracking-wider block mb-2">
                MANUALS & DOCS ({filteredManuals.length})
              </span>
              <div className="space-y-1">
                {filteredManuals.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate('support');
                    }}
                    className="w-full text-left p-2.5 rounded bg-[#0d0f12]/60 hover:bg-[#1c212a] border border-[#272e3b]/50 hover:border-[#ff5500]/60 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <div>
                        <div className="text-xs font-racing font-bold text-white group-hover:text-[#ff5500]">
                          {doc.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {doc.type} · {doc.fileSize}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-[#0d0f12] border-t border-[#272e3b] text-[10px] font-mono text-[#8b94a5] flex justify-between">
          <span>NAVIGATION: CLICK OR ENTER</span>
          <span>PRESS ESC TO CLOSE</span>
        </div>

      </div>
    </div>
  );
};
