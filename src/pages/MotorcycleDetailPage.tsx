import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MOTORCYCLES } from '../data/motorcycles';
import { POWERPARTS } from '../data/powerparts';
import { engineSound } from '../utils/audioEngine';
import { 
  Volume2, 
  VolumeX, 
  RotateCw, 
  Sliders, 
  Download, 
  Check, 
  Share2, 
  ShieldCheck, 
  ChevronRight, 
  Activity, 
  Cpu, 
  Zap, 
  Disc, 
  Wind, 
  Layers 
} from 'lucide-react';

export const MotorcycleDetailPage: React.FC = () => {
  const { selectedBike, navigate, openTestRideModal, addToCart } = useApp();
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSpecCategory, setActiveSpecCategory] = useState(selectedBike.specs[0]?.category || 'Engine & Transmission');
  const [isEngineRunning, setIsEngineRunning] = useState(false);
  const [throttleRpm, setThrottleRpm] = useState(1400);
  const [copiedShare, setCopiedShare] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Sync active category if bike changes
  useEffect(() => {
    setActiveImageIndex(0);
    setActiveSpecCategory(selectedBike.specs[0]?.category || 'Engine & Transmission');
    // Stop engine sound on bike change
    engineSound.stop();
    setIsEngineRunning(false);
    setThrottleRpm(1400);
  }, [selectedBike.id]);

  // Audio simulator cleanup
  useEffect(() => {
    return () => {
      engineSound.stop();
    };
  }, []);

  const toggleEngineAudio = () => {
    if (isEngineRunning) {
      engineSound.stop();
      setIsEngineRunning(false);
      setThrottleRpm(1400);
    } else {
      engineSound.start();
      setIsEngineRunning(true);
      engineSound.setRpm(1400);
    }
  };

  const handleThrottleChange = (newRpm: number) => {
    setThrottleRpm(newRpm);
    if (isEngineRunning) {
      engineSound.setRpm(newRpm);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleDownloadSpecSheet = () => {
    setDownloadSuccess(true);
    // Generate synthetic printable spec sheet download
    const content = `KINETIC MOTORCYCLES // TECHNICAL SPEC SHEET
=============================================
Model: ${selectedBike.name}
Class: ${selectedBike.subTitle}
Base Price: €${selectedBike.price.toLocaleString()}

ENGINE & DRIVETRAIN
-------------------
Displacement: ${selectedBike.displacement}
Peak Power: ${selectedBike.power}
Peak Torque: ${selectedBike.torque}
Dry Weight: ${selectedBike.dryWeight}
Acceleration (0-100 km/h): ${selectedBike.zeroToHundred}
Top Speed: ${selectedBike.topSpeed}

FULL SPECIFICATIONS:
${selectedBike.specs.map(cat => `\n[${cat.category}]\n` + cat.items.map(i => `  ${i.label}: ${i.value}`).join('\n')).join('\n')}

Generated from Kinetic Performance Lab Telemetry Matrix.
© 2025 KINETIC MOTORCYCLES GMBH`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedBike.id}-spec-sheet.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Find compatible PowerParts
  const compatibleParts = POWERPARTS.filter(p => p.compatibleModels.includes(selectedBike.id)).slice(0, 3);

  // Sibling bikes
  const siblingBikes = MOTORCYCLES.filter(b => b.id !== selectedBike.id);

  return (
    <div className="pt-28 pb-20 bg-[#0d0f12] min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#272e3b]">
          <div className="flex items-center gap-2 text-xs font-racing text-[#8b94a5]">
            <button onClick={() => navigate('home')} className="hover:text-[#ff5500]">Overview</button>
            <span>/</span>
            <button onClick={() => navigate('motorcycles')} className="hover:text-[#ff5500]">Motorcycles</button>
            <span>/</span>
            <span className="text-white font-bold">{selectedBike.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 rounded border border-[#272e3b] hover:border-[#ff5500] text-slate-400 hover:text-white text-xs font-racing flex items-center gap-1.5 transition-colors"
              title="Share Machine Spec"
            >
              <Share2 className="w-3.5 h-3.5 text-[#ff5500]" />
              <span className="hidden sm:inline">{copiedShare ? 'URL Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={handleDownloadSpecSheet}
              className="p-2 rounded border border-[#272e3b] hover:border-[#ff5500] text-slate-400 hover:text-white text-xs font-racing flex items-center gap-1.5 transition-colors"
              title="Download Technical Spec Sheet"
            >
              <Download className="w-3.5 h-3.5 text-[#ff5500]" />
              <span className="hidden sm:inline">{downloadSuccess ? 'Downloaded!' : 'Spec Sheet'}</span>
            </button>
          </div>
        </div>

        {/* Main Stage Grid: Images / 360 vs Hero Stats & CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left Column: Visual Gallery & Interactive Exhaust Sound Synthesizer */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Active Hero Image Showcase Frame */}
            <div className="relative aspect-[16/10] bg-[#15181e] border border-[#272e3b] rounded-xl overflow-hidden flex items-center justify-center p-8 group">
              <img
                src={selectedBike.gallery[activeImageIndex] || selectedBike.image}
                alt={selectedBike.name}
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-all duration-300"
              />

              {/* Watermark badge */}
              <div className="absolute top-4 left-4 bg-[#ff5500] text-black font-racing font-bold text-xs px-3 py-1 technical-cut shadow-glow-sm">
                FACTORY SPEC // {selectedBike.badge}
              </div>

              {/* Price Tag */}
              <div className="absolute top-4 right-4 bg-[#0d0f12]/80 backdrop-blur border border-[#272e3b] px-3 py-1.5 rounded text-right">
                <span className="text-[10px] font-mono text-[#8b94a5] uppercase block">BASE RETAIL</span>
                <span className="text-lg font-racing font-bold text-white">
                  €{selectedBike.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-6 gap-2">
              {selectedBike.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-video rounded-lg overflow-hidden border bg-[#15181e] p-1 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#ff5500] shadow-glow-sm'
                      : 'border-[#272e3b] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Interactive Web Audio Exhaust Sound Synthesizer */}
            <div className="bg-[#15181e] border border-[#ff5500]/40 rounded-xl p-5 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#272e3b]">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isEngineRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></div>
                  <div>
                    <h4 className="font-racing font-bold text-sm text-white">
                      EXHAUST SOUND SIMULATOR
                    </h4>
                    <p className="text-[11px] text-[#8b94a5]">
                      Web Audio dynamic pulse engine // {selectedBike.displacement} acoustic profile
                    </p>
                  </div>
                </div>

                <button
                  onClick={toggleEngineAudio}
                  className={`px-4 py-2 font-racing font-bold text-xs uppercase tracking-wider rounded technical-cut flex items-center gap-2 transition-all ${
                    isEngineRunning
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-glow-sm'
                      : 'bg-[#ff5500] hover:bg-[#ff6a1a] text-black shadow-glow-orange'
                  }`}
                >
                  {isEngineRunning ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Cut Engine</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Start Engine</span>
                    </>
                  )}
                </button>
              </div>

              {/* Throttle Slider & RPM Gauge */}
              <div className="pt-4 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#8b94a5]">THROTTLE REV INPUT:</span>
                  <span className="text-white font-bold tabular-nums">
                    {isEngineRunning ? `${throttleRpm} RPM` : 'ENGINE OFF (IGNITION READY)'}
                  </span>
                </div>

                <input
                  type="range"
                  min="1400"
                  max={selectedBike.soundRpmLimit}
                  step="100"
                  disabled={!isEngineRunning}
                  value={throttleRpm}
                  onChange={e => handleThrottleChange(Number(e.target.value))}
                  className="w-full accent-[#ff5500] cursor-pointer disabled:opacity-30 h-2 bg-[#0d0f12] rounded-lg border border-[#272e3b]"
                />

                <div className="flex justify-between text-[10px] font-mono text-[#8b94a5]">
                  <span>IDLE: 1,400 RPM</span>
                  <span className="text-[#ff5500]">PEAK TORQUE: 7,000 RPM</span>
                  <span className="text-red-500">REDLINE: {selectedBike.soundRpmLimit.toLocaleString()} RPM</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Title, Quick Specs HUD, Key Highlights, CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="hud-label uppercase tracking-widest text-[#ff5500] block mb-1">
                {selectedBike.category} // AUSTRIAN HIGH-OCTANE
              </span>
              <h1 className="text-3xl sm:text-4xl font-black font-racing text-white tracking-tight">
                {selectedBike.name}
              </h1>
              <p className="text-xs text-[#ff5500] font-mono font-bold mt-1 uppercase tracking-wider">
                {selectedBike.tagline}
              </p>
            </div>

            <p className="text-sm text-[#8b94a5] leading-relaxed">
              {selectedBike.description}
            </p>

            {/* Quick Specs HUD Grid */}
            <div className="grid grid-cols-2 gap-3 bg-[#15181e] border border-[#272e3b] p-4 rounded-xl font-mono">
              <div className="p-3 bg-[#0d0f12] rounded border border-[#272e3b]">
                <span className="text-[10px] text-[#8b94a5] block">DISPLACEMENT</span>
                <span className="text-lg font-racing font-bold text-white mt-0.5 block">{selectedBike.displacement}</span>
                <span className="text-[10px] text-[#ff5500]">Precision Forged</span>
              </div>
              <div className="p-3 bg-[#0d0f12] rounded border border-[#272e3b]">
                <span className="text-[10px] text-[#8b94a5] block">POWER OUTPUT</span>
                <span className="text-lg font-racing font-bold text-[#ff5500] mt-0.5 block">{selectedBike.power}</span>
                <span className="text-[10px] text-slate-400">High-Rev Redline</span>
              </div>
              <div className="p-3 bg-[#0d0f12] rounded border border-[#272e3b]">
                <span className="text-[10px] text-[#8b94a5] block">DRY WEIGHT</span>
                <span className="text-lg font-racing font-bold text-white mt-0.5 block">{selectedBike.dryWeight}</span>
                <span className="text-[10px] text-slate-400">Ultralight Trellis</span>
              </div>
              <div className="p-3 bg-[#0d0f12] rounded border border-[#272e3b]">
                <span className="text-[10px] text-[#8b94a5] block">0 - 100 KM/H</span>
                <span className="text-lg font-racing font-bold text-white mt-0.5 block">{selectedBike.zeroToHundred}</span>
                <span className="text-[10px] text-[#ff5500]">Supermoto Assist</span>
              </div>
            </div>

            {/* Available Factory Colorways */}
            <div className="bg-[#15181e] border border-[#272e3b] p-4 rounded-xl">
              <span className="text-xs font-racing uppercase tracking-wider text-slate-300 block mb-2">
                Available Factory Colorways
              </span>
              <div className="flex items-center gap-3">
                {selectedBike.colors.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-racing bg-[#0d0f12] px-3 py-1.5 rounded border border-[#272e3b]">
                    <div 
                      className="w-3.5 h-3.5 rounded-full border border-black/40" 
                      style={{ backgroundColor: c.hex }}
                    ></div>
                    <span className="text-slate-200">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => openTestRideModal(selectedBike.id)}
                className="w-full py-4 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-black text-sm uppercase tracking-wider technical-cut transition-all shadow-glow-sm hover:shadow-glow-orange flex items-center justify-center gap-2"
              >
                <span>Book Authorized Track Test Ride</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => navigate('configurator')}
                className="w-full py-3.5 bg-[#15181e] border border-[#272e3b] hover:border-[#ff5500] text-white font-racing font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
              >
                <Sliders className="w-4 h-4 text-[#ff5500]" />
                <span>Custom Build in 3D Studio Configurator</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#8b94a5] font-mono pt-2 border-t border-[#272e3b]">
              <span>✓ 2-Year International Warranty</span>
              <span>✓ Roadside Assistance 24/7</span>
              <span>✓ Factory Financing Available</span>
            </div>

          </div>
        </div>

        {/* Interactive Dyno Graph & Engineering Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Dyno Power & Torque Graph */}
          <div className="lg:col-span-6 bg-[#15181e] border border-[#272e3b] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#272e3b]">
              <div>
                <span className="hud-label uppercase tracking-widest text-[#ff5500]">
                  DYNAMOMETER TELEMETRY
                </span>
                <h3 className="text-xl font-racing font-bold text-white">
                  POWER & TORQUE CURVES
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[#ff5500]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5500]"></span>
                  Power (HP)
                </span>
                <span className="flex items-center gap-1.5 text-blue-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  Torque (Nm)
                </span>
              </div>
            </div>

            {/* SVG Dyno Graph */}
            <div className="relative h-64 w-full bg-[#0d0f12] rounded-lg border border-[#272e3b] p-4 flex flex-col justify-between">
              
              {/* Grid Lines */}
              <div className="absolute inset-x-4 inset-y-4 grid grid-rows-4 pointer-events-none opacity-20">
                <div className="border-b border-dashed border-slate-400"></div>
                <div className="border-b border-dashed border-slate-400"></div>
                <div className="border-b border-dashed border-slate-400"></div>
                <div className="border-b border-dashed border-slate-400"></div>
              </div>

              {/* Data points visualization */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                {/* Power curve (Orange) */}
                <path
                  d={selectedBike.dynoData.map((d, i) => {
                    const x = (i / (selectedBike.dynoData.length - 1)) * 480 + 10;
                    const maxHp = Math.max(...selectedBike.dynoData.map(pt => pt.powerHp)) * 1.15;
                    const y = 190 - (d.powerHp / maxHp) * 170;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#ff5500"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Torque curve (Blue) */}
                <path
                  d={selectedBike.dynoData.map((d, i) => {
                    const x = (i / (selectedBike.dynoData.length - 1)) * 480 + 10;
                    const maxNm = Math.max(...selectedBike.dynoData.map(pt => pt.torqueNm)) * 1.15;
                    const y = 190 - (d.torqueNm / maxNm) * 170;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  strokeLinecap="round"
                />
              </svg>

              {/* X Axis Labels */}
              <div className="flex justify-between text-[9px] font-mono text-[#8b94a5] pt-2 border-t border-[#272e3b]">
                {selectedBike.dynoData.map((d, idx) => (
                  <span key={idx}>{d.rpm / 1000}k</span>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-[#8b94a5] mt-3 font-mono">
              Calibrated on Superflow chassis dynamometer at 20°C ambient air temperature.
            </p>
          </div>

          {/* Key Engineering Features */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="hud-label uppercase tracking-widest text-[#ff5500]">
                FACTORY INNOVATIONS
              </span>
              <h3 className="text-xl font-racing font-bold text-white">
                RACE-DERIVED CHASSIS & ELECTRONICS
              </h3>
            </div>

            <div className="space-y-3">
              {selectedBike.features.map((feat, idx) => (
                <div key={idx} className="bg-[#15181e] border border-[#272e3b] p-4 rounded-lg flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#0d0f12] border border-[#272e3b] rounded flex items-center justify-center shrink-0 text-[#ff5500]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-racing font-bold text-white">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-[#8b94a5] leading-relaxed mt-1">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Detailed Specification Matrix Accordion / Tabs */}
        <div className="bg-[#15181e] border border-[#272e3b] rounded-xl p-6 sm:p-8 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#272e3b] gap-4">
            <div>
              <span className="hud-label uppercase tracking-widest text-[#ff5500]">
                COMPLETE TECHNICAL SPECIFICATION
              </span>
              <h3 className="text-2xl font-racing font-bold text-white">
                ENGINEERING MATRIX
              </h3>
            </div>

            {/* Category Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {selectedBike.specs.map(cat => (
                <button
                  key={cat.category}
                  onClick={() => setActiveSpecCategory(cat.category)}
                  className={`px-3 py-1.5 rounded text-xs font-racing font-bold uppercase transition-colors whitespace-nowrap ${
                    activeSpecCategory === cat.category
                      ? 'bg-[#ff5500] text-black shadow-glow-sm'
                      : 'bg-[#0d0f12] text-slate-400 hover:text-white border border-[#272e3b]'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>

          {/* Active Spec Table */}
          {selectedBike.specs.filter(cat => cat.category === activeSpecCategory).map(cat => (
            <div key={cat.category} className="overflow-x-auto">
              <dl className="divide-y divide-[#272e3b] text-xs sm:text-sm font-mono">
                {cat.items.map((item, i) => (
                  <div key={i} className="py-3.5 flex justify-between items-center hover:bg-white/[0.01] px-2 rounded">
                    <dt className="text-[#8b94a5]">{item.label}</dt>
                    <dd className="text-white text-right font-bold">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        {/* Compatible PowerParts Upgrades */}
        {compatibleParts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="hud-label uppercase tracking-widest text-[#ff5500]">
                  FACTORY ACCESSORIES
                </span>
                <h3 className="text-2xl font-racing font-bold text-white">
                  COMPATIBLE POWERPARTS UPGRADES
                </h3>
              </div>
              <button
                onClick={() => navigate('powerparts')}
                className="text-xs font-racing font-bold uppercase text-[#ff5500] hover:text-white flex items-center gap-1"
              >
                <span>View All Upgrades</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {compatibleParts.map(part => (
                <div key={part.id} className="bg-[#15181e] border border-[#272e3b] rounded-xl p-5 flex flex-col justify-between group hover:border-[#ff5500]/60 transition-all">
                  <div>
                    <div className="h-36 bg-[#0d0f12] rounded-lg overflow-hidden border border-[#272e3b] mb-4 flex items-center justify-center p-3">
                      <img src={part.image} alt={part.name} className="w-full h-full object-contain filter group-hover:scale-105 transition-transform" />
                    </div>
                    <span className="text-[10px] font-mono text-[#ff5500]">{part.partNumber}</span>
                    <h4 className="text-sm font-racing font-bold text-white group-hover:text-[#ff5500] transition-colors mt-0.5">
                      {part.name}
                    </h4>
                    <p className="text-xs text-[#8b94a5] mt-1 line-clamp-2">
                      {part.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#272e3b] flex items-center justify-between">
                    <span className="text-sm font-mono font-bold text-white">€{part.price}</span>
                    <button
                      onClick={() => addToCart(part, 1, selectedBike.id)}
                      className="px-3 py-1.5 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase technical-cut transition-all"
                    >
                      Add to Build
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explore Other Sibling Models */}
        <div>
          <div className="mb-6">
            <span className="hud-label uppercase tracking-widest text-[#ff5500]">
              EXPLORE THE LINEUP
            </span>
            <h3 className="text-2xl font-racing font-bold text-white">
              OTHER KINETIC STREETFIGHTERS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {siblingBikes.map(bike => (
              <button
                key={bike.id}
                onClick={() => navigate('motorcycle-detail', bike.id)}
                className="bg-[#15181e] border border-[#272e3b] hover:border-[#ff5500] p-4 rounded-xl text-left group transition-all"
              >
                <div className="h-32 bg-[#1c212a] rounded overflow-hidden flex items-center justify-center p-2 mb-3">
                  <img src={bike.image} alt={bike.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-[10px] font-mono text-[#ff5500] font-bold">{bike.badge} // {bike.displacement}</div>
                <div className="font-racing font-bold text-white group-hover:text-[#ff5500] transition-colors text-base">
                  {bike.name}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  {bike.power} · €{bike.price.toLocaleString()}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
