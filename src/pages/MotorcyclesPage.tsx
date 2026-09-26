import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOTORCYCLES } from '../data/motorcycles';
import { Motorcycle } from '../types';
import { 
  Filter, 
  ArrowUpDown, 
  Check, 
  ChevronRight, 
  Sliders, 
  Layers, 
  X, 
  Scale 
} from 'lucide-react';

export const MotorcyclesPage: React.FC = () => {
  const { navigate, openTestRideModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'power' | 'price-asc' | 'price-desc'>('featured');
  const [compareList, setCompareList] = useState<string[]>(['apex-390r', 'apex-890-gp']);
  const [showComparisonDrawer, setShowComparisonDrawer] = useState(false);

  const categories = ['All', 'Lightweight', 'Streetfighter', 'GP Edition', 'Super Naked'];

  // Filter
  let filtered = MOTORCYCLES.filter(bike => {
    if (selectedCategory === 'All') return true;
    return bike.category === selectedCategory;
  });

  // Sort
  if (sortBy === 'power') {
    filtered = [...filtered].sort((a, b) => parseInt(b.power) - parseInt(a.power));
  } else if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], id];
      }
      return [...prev, id];
    });
  };

  const comparedBikes = MOTORCYCLES.filter(b => compareList.includes(b.id));

  return (
    <div className="pt-28 pb-20 bg-[#0d0f12] min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-[#272e3b] pb-8 mb-8">
          <span className="hud-label uppercase tracking-widest text-[#ff5500] block mb-1">
            KINETIC FACTORY LINEUP // 2025/2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-racing text-white tracking-tight">
            STREETFIGHTER MOTORCYCLES
          </h1>
          <p className="text-sm text-[#8b94a5] max-w-2xl mt-2">
            Every machine is built on our Austrian high-tensile trellis foundation, packing extreme power-to-weight ratios, precision electronics, and track-derived agility.
          </p>
        </div>

        {/* Filter and Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[#15181e] p-4 rounded-lg border border-[#272e3b]">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-racing font-bold uppercase rounded whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#ff5500] text-black shadow-glow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#1c212a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Compare Trigger */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-racing">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#ff5500]" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-[#0d0f12] border border-[#272e3b] rounded p-1.5 text-xs text-slate-200 focus:border-[#ff5500] focus:outline-none"
              >
                <option value="featured">Sort: Factory Lineup</option>
                <option value="power">Sort: Horsepower (High to Low)</option>
                <option value="price-asc">Sort: Price (Lowest First)</option>
                <option value="price-desc">Sort: Price (Highest First)</option>
              </select>
            </div>

            {compareList.length > 0 && (
              <button
                onClick={() => setShowComparisonDrawer(true)}
                className="px-3 py-1.5 bg-[#1c212a] border border-[#ff5500]/60 hover:border-[#ff5500] text-white text-xs font-racing font-bold uppercase rounded flex items-center gap-1.5 transition-all shadow-glow-sm"
              >
                <Scale className="w-3.5 h-3.5 text-[#ff5500]" />
                <span>Compare ({compareList.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Motorcycle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map(bike => {
            const isCompared = compareList.includes(bike.id);
            return (
              <div
                key={bike.id}
                className="bg-[#15181e] border border-[#272e3b] hover:border-[#ff5500]/80 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                {/* Visual Header */}
                <div className="relative h-64 bg-[#1c212a] flex items-center justify-center p-6 overflow-hidden">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="w-8 h-8 bg-[#ff5500] text-black font-racing font-bold text-sm flex items-center justify-center technical-cut">
                      {bike.badge}
                    </span>
                    <span className="px-2.5 py-1 bg-[#0d0f12]/80 backdrop-blur border border-[#272e3b] text-[10px] font-racing uppercase tracking-wider text-slate-300 rounded flex items-center">
                      {bike.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 text-right">
                    <span className="text-xs font-mono text-[#8b94a5] block">STARTING FROM</span>
                    <span className="text-xl font-racing font-bold text-white">
                      €{bike.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Compare Toggle Button */}
                  <button
                    onClick={() => toggleCompare(bike.id)}
                    className={`absolute bottom-4 left-4 px-2.5 py-1 rounded text-[10px] font-racing font-bold uppercase flex items-center gap-1 transition-all ${
                      isCompared
                        ? 'bg-[#ff5500] text-black'
                        : 'bg-[#0d0f12]/80 text-slate-300 hover:text-white border border-[#272e3b]'
                    }`}
                  >
                    <Check className={`w-3 h-3 ${isCompared ? 'inline' : 'hidden'}`} />
                    {isCompared ? 'Compared' : '+ Compare'}
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs font-mono text-[#ff5500] uppercase font-bold tracking-wider">
                    {bike.subTitle}
                  </div>
                  <h2 className="text-2xl font-racing font-black text-white mt-1 group-hover:text-[#ff5500] transition-colors">
                    {bike.name}
                  </h2>
                  <p className="text-xs text-[#8b94a5] mt-2 line-clamp-2 leading-relaxed">
                    {bike.description}
                  </p>

                  {/* Telemetry Matrix Grid */}
                  <div className="grid grid-cols-4 gap-2 py-4 my-4 border-t border-b border-[#272e3b] text-center font-mono">
                    <div className="border-r border-[#272e3b]/60 pr-1">
                      <div className="text-[9px] text-[#8b94a5] uppercase">ENGINE</div>
                      <div className="text-xs font-bold text-white mt-0.5">{bike.displacement}</div>
                    </div>
                    <div className="border-r border-[#272e3b]/60 px-1">
                      <div className="text-[9px] text-[#8b94a5] uppercase">POWER</div>
                      <div className="text-xs font-bold text-[#ff5500] mt-0.5">{bike.power.split(' ')[0]} HP</div>
                    </div>
                    <div className="border-r border-[#272e3b]/60 px-1">
                      <div className="text-[9px] text-[#8b94a5] uppercase">0-100 KM/H</div>
                      <div className="text-xs font-bold text-white mt-0.5">{bike.zeroToHundred}</div>
                    </div>
                    <div className="pl-1">
                      <div className="text-[9px] text-[#8b94a5] uppercase">DRY WEIGHT</div>
                      <div className="text-xs font-bold text-white mt-0.5">{bike.dryWeight}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => navigate('motorcycle-detail', bike.id)}
                      className="flex-1 py-2.5 bg-[#1c212a] hover:bg-[#ff5500] hover:text-black transition-colors text-white font-racing font-bold text-xs uppercase tracking-wider rounded text-center"
                    >
                      Technical Overview
                    </button>
                    <button
                      onClick={() => navigate('configurator')}
                      className="px-4 py-2.5 bg-[#0d0f12] border border-[#272e3b] hover:border-[#ff5500] text-slate-300 hover:text-white font-racing font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1.5"
                    >
                      <Sliders className="w-3.5 h-3.5 text-[#ff5500]" />
                      <span>3D Studio</span>
                    </button>
                    <button
                      onClick={() => openTestRideModal(bike.id)}
                      className="px-4 py-2.5 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all shadow-glow-sm"
                    >
                      Book Ride
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Comparison Modal Drawer */}
      {showComparisonDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#15181e] border border-[#ff5500] rounded-xl max-w-5xl w-full p-6 text-slate-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#272e3b]">
              <div>
                <span className="hud-label uppercase tracking-widest text-[#ff5500]">
                  TELEMETRY BENCHMARK
                </span>
                <h3 className="text-2xl font-racing font-black text-white">
                  SPECIFICATION COMPARISON MATRIX
                </h3>
              </div>
              <button
                onClick={() => setShowComparisonDrawer(false)}
                className="p-2 text-slate-400 hover:text-white rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-[#272e3b]">
                    <th className="p-3 text-left font-racing text-slate-400 w-1/4">BENCHMARK SPEC</th>
                    {comparedBikes.map(b => (
                      <th key={b.id} className="p-3 text-left font-racing text-white w-1/4">
                        <div className="text-[#ff5500] font-bold text-sm">{b.name}</div>
                        <div className="text-[10px] text-slate-400">{b.subTitle}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#272e3b]">
                  <tr>
                    <td className="p-3 text-[#8b94a5]">Factory Base Price</td>
                    {comparedBikes.map(b => (
                      <td key={b.id} className="p-3 text-white font-bold">€{b.price.toLocaleString()}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#8b94a5]">Displacement</td>
                    {comparedBikes.map(b => (
                      <td key={b.id} className="p-3 text-white">{b.displacement}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#8b94a5]">Peak Power Output</td>
                    {comparedBikes.map(b => (
                      <td key={b.id} className="p-3 text-[#ff5500] font-bold">{b.power}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#8b94a5]">Maximum Torque</td>
                    {comparedBikes.map(b => (
                      <td key={b.id} className="p-3 text-white">{b.torque}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#8b94a5]">Acceleration 0-100 km/h</td>
                    {comparedBikes.map(b => (
                      <td key={b.id} className="p-3 text-white font-bold">{b.zeroToHundred}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#8b94a5]">Dry Mass (Weight)</td>
                    {comparedBikes.map(b => (
                      <td key={b.id} className="p-3 text-white">{b.dryWeight}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#8b94a5]">Seat Height</td>
                    {comparedBikes.map(b => (
                      <td key={b.id} className="p-3 text-white">{b.seatHeight}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#8b94a5]">Fuel Tank Capacity</td>
                    {comparedBikes.map(b => (
                      <td key={b.id} className="p-3 text-white">{b.fuelCapacity}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-4 border-t border-[#272e3b] flex justify-end gap-3">
              <button
                onClick={() => setShowComparisonDrawer(false)}
                className="px-6 py-2.5 bg-[#ff5500] text-black font-racing font-bold text-xs uppercase technical-cut"
              >
                Close Comparison
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
