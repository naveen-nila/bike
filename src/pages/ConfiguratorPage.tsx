import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOTORCYCLES } from '../data/motorcycles';
import { 
  Sliders, 
  RotateCw, 
  Check, 
  Download, 
  Share2, 
  Zap, 
  Shield, 
  ArrowRight, 
  Sparkles, 
  FileText 
} from 'lucide-react';

export const ConfiguratorPage: React.FC = () => {
  const { selectedBike, saveConfiguration, openTestRideModal } = useApp();

  const [bikeId, setBikeId] = useState(selectedBike.id || 'apex-390r');
  const [selectedColor, setSelectedColor] = useState('Factory Racing Orange');
  const [wheelType, setWheelType] = useState<'stock' | 'forged'>('stock');
  const [exhaustOption, setExhaustOption] = useState<'stock' | 'akrapovic'>('akrapovic');
  const [selectedPacks, setSelectedPacks] = useState<string[]>(['track-pack']);
  const [viewAngle, setViewAngle] = useState<number>(0);
  const [savedBuildId, setSavedBuildId] = useState<string | null>(null);

  const currentBike = MOTORCYCLES.find(m => m.id === bikeId) || MOTORCYCLES[0];

  // Pricing calculations
  const basePrice = currentBike.price;
  const wheelPrice = wheelType === 'forged' ? 850 : 0;
  const exhaustPrice = exhaustOption === 'akrapovic' ? 940 : 0;
  
  const packPrices: { [key: string]: number } = {
    'track-pack': 490,
    'protection-pack': 380,
    'carbon-aero': 680
  };

  const packsTotal = selectedPacks.reduce((acc, p) => acc + (packPrices[p] || 0), 0);
  const totalPrice = basePrice + wheelPrice + exhaustPrice + packsTotal;

  // Weight & HP calculations
  const weightDelta = (wheelType === 'forged' ? -2.1 : 0) + 
                      (exhaustOption === 'akrapovic' ? -1.8 : 0) + 
                      (selectedPacks.includes('carbon-aero') ? -0.4 : 0);

  const hpGain = (exhaustOption === 'akrapovic' ? 2.8 : 0);

  const togglePack = (packId: string) => {
    setSelectedPacks(prev => 
      prev.includes(packId) ? prev.filter(p => p !== packId) : [...prev, packId]
    );
  };

  const handleSaveBuild = () => {
    const id = saveConfiguration({
      motorcycleId: currentBike.id,
      colorName: selectedColor,
      wheelOption: wheelType === 'forged' ? 'Forged Monobloc Racing' : 'Cast Alloy Standard',
      exhaustOption: exhaustOption === 'akrapovic' ? 'Akrapovič Slip-On Titanium' : 'Stock Silencer',
      selectedPacks,
      customAccessories: [],
      totalPrice
    });
    setSavedBuildId(id);
  };

  return (
    <div className="pt-28 pb-20 bg-[#0d0f12] min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#272e3b] gap-4">
          <div>
            <span className="hud-label uppercase tracking-widest text-[#ff5500] block mb-1">
              KINETIC PERFORMANCE STUDIO // 3D CONFIGURATOR
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-racing text-white tracking-tight">
              TAILOR YOUR APEX SPECIFICATION
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openTestRideModal(currentBike.id)}
              className="px-4 py-2 border border-[#272e3b] hover:border-[#ff5500] rounded text-xs font-racing uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
            >
              Book Test Ride For This Spec
            </button>
            <button
              onClick={handleSaveBuild}
              className="px-5 py-2.5 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all shadow-glow-sm"
            >
              {savedBuildId ? `Saved (${savedBuildId})` : 'Save Build to Garage'}
            </button>
          </div>
        </div>

        {/* 2-Column Configurator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Canvas: Interactive Bike Stage */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#15181e] border border-[#272e3b] rounded-xl p-6 relative overflow-hidden shadow-2xl">
            
            {/* Model Badge */}
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-[#ff5500] text-black font-racing font-bold text-sm flex items-center justify-center technical-cut">
                  {currentBike.badge}
                </span>
                <div>
                  <h3 className="font-racing font-bold text-base text-white">{currentBike.name}</h3>
                  <span className="text-[10px] font-mono text-[#ff5500]">{selectedColor}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-[#8b94a5]">ESTIMATED RETAIL</span>
                <div className="text-2xl font-racing font-bold text-white font-mono">
                  €{totalPrice.toLocaleString()}
                </div>
              </div>
            </div>

            {/* 3D Visualizer Canvas Stage */}
            <div className="relative my-8 flex items-center justify-center min-h-[340px]">
              
              {/* Ellipse shadow and ground grid */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[85%] h-[60%] border border-[#ff5500]/30 rounded-[100%] animate-pulse-ring"></div>
                <div className="absolute bottom-6 w-80 h-12 bg-[#ff5500]/20 blur-3xl rounded-full"></div>
              </div>

              {/* Bike Render */}
              <div 
                className="relative z-10 w-full max-w-lg transition-transform duration-500 cursor-grab active:cursor-grabbing select-none"
                style={{
                  transform: `rotateY(${viewAngle}deg)`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <img
                  src={currentBike.image}
                  alt={currentBike.name}
                  className="w-full h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
                />

                {/* Akrapovic Badge overlay if active */}
                {exhaustOption === 'akrapovic' && (
                  <div className="absolute bottom-6 right-12 bg-black/80 border border-[#ff5500] px-2 py-0.5 rounded text-[9px] font-mono text-[#ff5500]">
                    AKRAPOVIČ TITANIUM EQUIPPED
                  </div>
                )}
              </div>
            </div>

            {/* Angle rotation controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#272e3b] z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-racing uppercase tracking-wider text-slate-400">Camera Angle:</span>
                {[
                  { angle: 0, label: 'Profile' },
                  { angle: 45, label: 'Front 3/4' },
                  { angle: 180, label: 'Exhaust View' },
                  { angle: -45, label: 'Rear 3/4' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setViewAngle(item.angle)}
                    className={`px-2.5 py-1 text-xs font-racing uppercase rounded transition-colors ${
                      viewAngle === item.angle
                        ? 'bg-[#ff5500] text-black font-bold'
                        : 'bg-[#0d0f12] text-slate-400 hover:text-white border border-[#272e3b]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Dynamic HUD Delta Box */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="text-right">
                  <span className="text-[10px] text-[#8b94a5] block">WEIGHT DELTA</span>
                  <span className="text-emerald-400 font-bold">
                    {weightDelta !== 0 ? `${weightDelta.toFixed(1)} kg` : 'Stock baseline'}
                  </span>
                </div>
                <div className="h-6 w-[1px] bg-[#272e3b]"></div>
                <div className="text-right">
                  <span className="text-[10px] text-[#8b94a5] block">POWER DELTA</span>
                  <span className="text-[#ff5500] font-bold">
                    {hpGain > 0 ? `+${hpGain} HP` : 'Factory power'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Customization Configuration Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Base Machine Selector */}
            <div className="bg-[#15181e] border border-[#272e3b] p-5 rounded-xl">
              <span className="text-xs font-racing uppercase tracking-wider text-slate-400 block mb-2">
                1. Select Machine Architecture
              </span>
              <div className="grid grid-cols-2 gap-2">
                {MOTORCYCLES.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setBikeId(b.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      bikeId === b.id
                        ? 'border-[#ff5500] bg-[#1c212a] text-white shadow-glow-sm'
                        : 'border-[#272e3b] bg-[#0d0f12] text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-[#ff5500] font-bold">{b.badge} // {b.displacement}</div>
                    <div className="text-xs font-racing font-bold text-white mt-0.5">{b.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">€{b.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Factory Colorway */}
            <div className="bg-[#15181e] border border-[#272e3b] p-5 rounded-xl">
              <span className="text-xs font-racing uppercase tracking-wider text-slate-400 block mb-2">
                2. Factory Livery & Paint
              </span>
              <div className="space-y-2">
                {currentBike.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                      selectedColor === color.name
                        ? 'border-[#ff5500] bg-[#1c212a] text-white'
                        : 'border-[#272e3b] bg-[#0d0f12] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border border-black/50 shadow" style={{ backgroundColor: color.hex }}></div>
                      <span className="text-xs font-racing font-bold text-white">{color.name}</span>
                    </div>
                    {selectedColor === color.name && <Check className="w-4 h-4 text-[#ff5500]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Exhaust System */}
            <div className="bg-[#15181e] border border-[#272e3b] p-5 rounded-xl">
              <span className="text-xs font-racing uppercase tracking-wider text-slate-400 block mb-2">
                3. Exhaust Acoustics & Performance
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setExhaustOption('stock')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    exhaustOption === 'stock'
                      ? 'border-[#ff5500] bg-[#1c212a] text-white'
                      : 'border-[#272e3b] bg-[#0d0f12] text-slate-400'
                  }`}
                >
                  <div className="text-xs font-racing font-bold text-white">Stock 3-Chamber</div>
                  <div className="text-[10px] text-slate-400 mt-1">Underbelly Silencer</div>
                  <div className="text-xs font-mono font-bold text-white mt-2">Included (€0)</div>
                </button>

                <button
                  onClick={() => setExhaustOption('akrapovic')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    exhaustOption === 'akrapovic'
                      ? 'border-[#ff5500] bg-[#1c212a] text-white shadow-glow-sm'
                      : 'border-[#272e3b] bg-[#0d0f12] text-slate-400'
                  }`}
                >
                  <div className="text-xs font-racing font-bold text-[#ff5500]">Akrapovič Slip-On</div>
                  <div className="text-[10px] text-slate-400 mt-1">+2.8 HP // -1.8 kg Titanium</div>
                  <div className="text-xs font-mono font-bold text-white mt-2">+€940</div>
                </button>
              </div>
            </div>

            {/* Step 4: Race & Tech Equipment Packs */}
            <div className="bg-[#15181e] border border-[#272e3b] p-5 rounded-xl">
              <span className="text-xs font-racing uppercase tracking-wider text-slate-400 block mb-2">
                4. Performance & Protection Packs
              </span>
              
              <div className="space-y-2">
                {[
                  {
                    id: 'track-pack',
                    title: 'Kinetic Track Pack',
                    desc: 'Quickshifter+, Launch Control, Anti-wheelie off, Lap Timer',
                    price: 490
                  },
                  {
                    id: 'protection-pack',
                    title: 'Factory Protection Pack',
                    desc: 'Orange tubular crash bars, wheel axle bungs, radiator grille',
                    price: 380
                  },
                  {
                    id: 'carbon-aero',
                    title: 'Carbon Downforce Aero Pack',
                    desc: 'Dry carbon fiber winglets (+8kg downforce) & front fender',
                    price: 680
                  }
                ].map(pack => {
                  const active = selectedPacks.includes(pack.id);
                  return (
                    <div
                      key={pack.id}
                      onClick={() => togglePack(pack.id)}
                      className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                        active
                          ? 'border-[#ff5500] bg-[#1c212a] text-white'
                          : 'border-[#272e3b] bg-[#0d0f12] text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center ${active ? 'bg-[#ff5500] border-[#ff5500] text-black' : 'border-[#272e3b]'}`}>
                          {active && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs font-racing font-bold text-white">{pack.title}</div>
                          <div className="text-[10px] text-[#8b94a5]">{pack.desc}</div>
                        </div>
                      </div>
                      <div className="text-xs font-mono font-bold text-[#ff5500]">
                        +€{pack.price}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Build Summary Card & CTA */}
            <div className="bg-[#15181e] border border-[#ff5500]/60 p-5 rounded-xl shadow-xl space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#272e3b]">
                <span className="font-racing font-bold text-sm text-white">TOTAL CONFIGURED INVESTMENT</span>
                <span className="font-mono text-xl font-bold text-[#ff5500]">
                  €{totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleSaveBuild}
                  className="w-full py-3.5 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all shadow-glow-sm flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Transmit Spec To Authorized Dealer</span>
                </button>

                {savedBuildId && (
                  <div className="bg-[#0d0f12] border border-emerald-500/50 p-3 rounded text-center text-xs font-mono text-emerald-400">
                    ✓ Configuration saved: Reference <strong>{savedBuildId}</strong>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
