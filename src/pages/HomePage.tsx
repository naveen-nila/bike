import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOTORCYCLES } from '../data/motorcycles';
import { 
  Check, 
  RotateCw, 
  Play, 
  ChevronRight, 
  Sliders, 
  Cpu, 
  Zap, 
  Shield, 
  Layers, 
  Compass, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    navigate, 
    openTestRideModal, 
    openVideoModal, 
    activeRidingMode, 
    setActiveRidingMode 
  } = useApp();

  // 360 rotation interactive state
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Micro gallery lightbox modal
  const [galleryModalItem, setGalleryModalItem] = useState<{ title: string; image: string; desc: string } | null>(null);

  // Newsletter / Lead capture form
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail || !/^\S+@\S+\.\S+$/.test(leadEmail)) return;
    setLeadSubmitted(true);
    setTimeout(() => {
      openTestRideModal('apex-390r');
    }, 1200);
  };

  const rotateLeft = () => setRotationAngle(prev => prev - 45);
  const rotateRight = () => setRotationAngle(prev => prev + 45);

  const microGallery = [
    {
      title: 'LED MASK',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUNTTcDMLB11SSSnsOWR9gcJ4-7elntcc3fIu9R6oplcfRm-L6iLClZeQYQ41t4jV1pdqOVycT1lKZPLaIOIAk_uX6RHxtxeOCFvK3EwPDQezKuKIAihGhCoBxae2U3lCLyrSZkcolQT3USc30oo5uBUJjIw-UtuH4Xt8BQdeq8NhIsUxw3yps3RZLhBViY7VNkbnV2CQEhkW2AZlSe4SQlF0oDHc-Qru42l9DI2YhusrvZyLO32VLf2j-sz2p-2Gnyg',
      desc: 'Twin-projector LED headlights with integrated aerodynamic daytime running light accents cutting through darkness.'
    },
    {
      title: 'TRELLIS CHASSIS',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkF5v34qViEccI94h2cqzYu_t7Jj32rUWMOCnw4DEL0cX7jOZzCLS0L50QHYVhEoXd79YQ2_6HfT5xlb-TEA-EmbGUOLKf0RYSva_HIPom9saEMl2aA8c6RJfU9T0anewSeVogqtub0f3MlWX44KSUhbhuQH26aEBkBHQzovexZloM-HEA9ZPFKoMf5Sx7uwFZX15DujDn1ZvUJ7HrJGmiQ_iTwzva08OWD4pbAbYO6Ale7olsWs2hJ_dx7OKBEdLYAA',
      desc: 'High-tensile tubular steel chassis with bolt-on subframe engineered for razor-sharp flex under extreme track lean.'
    },
    {
      title: 'TFT DISPLAY',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkt5eBCCeNw8bRSL81VXfXytcpIxQ2M658Ydy1dZ_buH792NTyK9N-7HqTLOPNY1eP8iyhu54VrCgzwuEKqykLPgvfuUhHhgoQgtFZaSC4sZsQm-Qlr13KBYX-wx5Vv9dQRq2rehHtITk8Z96FZZ_ECU1krF6e_AqA9_nawrhLdak4BV2ZxcqclRn5GIp32jKhzCHhrHSyXolNy51AW5oA2recu16yiqHtCsvy8hyyIeLtFgBbWHdKBgONFwSgdd1Pcg',
      desc: '5-inch bonded anti-glare color display showing real-time lean angles, shift points, and riding mode status.'
    },
    {
      title: 'WP APEX FORKS',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnR5gLW9HT1zn7qVHDsGV3D65IzyGQTXybHhfQ-aZQIdFOu2YL6DwfibxdB6ap-ECp6fwX8pslaRpX_ND4nGInh9EPfTzMHAhVDCH-qS_M6T9hbmeCU0nfetj3LHBP_ZDnn5JaFy8sx3w8Zs2xdhIJWuLzeBVK1HwO97CoWNTxUmrJ1cMGCSvJSBK2_D3yoIjRgx6AOPayRyCRDkGpcMlT1VNPQMZHnbO-GcBYeiybuCLZr5ZIHzh4aBTNJXKbUbXclA',
      desc: 'WP APEX 43mm inverted open-cartridge front suspension with split-damping technology for track-level stability.'
    }
  ];

  return (
    <div className="relative">
      
      {/* BEGIN: HeroShowcaseSection */}
      <section 
        className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#0d0f12] bg-grid-pattern" 
        id="overview"
      >
        {/* Ghost Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="ghost-watermark text-[24vw] font-black opacity-30 transform -translate-y-12">
            390R
          </span>
        </div>

        {/* Top Header Meta */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#272e3b]/50 pb-6 gap-4">
            <div>
              <span className="hud-label inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-ping"></span>
                01 // THE CORNER ROCKET
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-racing tracking-tight text-white mt-1">
                UNLEASH THE BEAST
              </h1>
              <p className="text-sm text-[#8b94a5] max-w-md mt-1">
                Precision-tuned lightweight streetfighter engineered for uncompromising cornering agility and explosive single-cylinder torque.
              </p>
            </div>
            <div className="flex items-center gap-4 text-right">
              <div className="px-3 py-1.5 bg-[#15181e]/80 border border-[#272e3b] rounded">
                <div className="text-[10px] font-mono uppercase text-[#8b94a5]">CHASSIS CLASS</div>
                <div className="text-sm font-racing font-bold text-[#ff5500]">ULTRALIGHT TRELLIS</div>
              </div>
              <div className="px-3 py-1.5 bg-[#15181e]/80 border border-[#272e3b] rounded">
                <div className="text-[10px] font-mono uppercase text-[#8b94a5]">READY TO RACE</div>
                <div className="text-sm font-racing font-bold text-white">READY TO DOMINATE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Stage Visual with Hotspots */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 w-full my-auto py-8">
          <div className="relative flex items-center justify-center">
            
            {/* 360 Spin Ellipse Platform Graphics */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[85%] h-[55%] border border-[#ff5500]/20 rounded-[100%] animate-pulse-ring"></div>
              <div className="w-[98%] h-[68%] border border-dashed border-[#ff5500]/30 rounded-[100%] transform -rotate-2"></div>
              <div className="absolute bottom-6 w-72 h-10 bg-[#ff5500]/20 blur-3xl rounded-full"></div>
            </div>

            {/* Motorcycle Main Stage Image */}
            <div 
              className="relative z-10 w-full max-w-3xl mx-auto transform transition duration-500 cursor-grab active:cursor-grabbing select-none"
              style={{
                transform: `rotateY(${rotationAngle}deg)`,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <img 
                alt="APEX 390R Performance Motorcycle on Track Stand" 
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhfc9soqtP9S10CDXVhcqTKcZ-8zMysq5yKHa56sJzvDvjXnQpvdtwdNp-Rj_WJJG4QIZu58QsU8bZumx51vkY0IStuboxg5sBeB4V0j8oXF1P7nQIQoxG7J9t02EVr6fzuQM5DQWCNAVb2LzRb7BpfbB-S-fSV6gc2YajdSndALSM8nmbzbw5mYp7tkmuanSt3hnrR5I96ib-ymoww5mPyRb6RegA0lQQtap7XglQwYYYkV3MFaOWPEailZ5Jd3m3Ng" 
              />

              {/* Interactive Hotspot 1: Engine Unit */}
              <div 
                className="absolute top-[52%] left-[12%] sm:left-[18%] -translate-y-1/2 group cursor-pointer"
                onClick={() => setActiveHotspot(activeHotspot === 'engine' ? null : 'engine')}
              >
                <div className="relative flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#ff5500]/30 border border-[#ff5500] flex items-center justify-center shadow-glow-sm transition-transform group-hover:scale-125">
                    <div className="w-2 h-2 rounded-full bg-[#ff5500]"></div>
                  </div>
                  <div className="hidden sm:flex items-center ml-2">
                    <div className="w-10 h-[1px] bg-[#ff5500]"></div>
                    <div className="bg-[#15181e]/90 backdrop-blur border border-[#ff5500]/50 p-2.5 rounded shadow-xl text-left min-w-[160px] group-hover:border-[#ff5500] transition-colors">
                      <div className="text-[9px] font-mono text-[#ff5500] uppercase font-bold tracking-widest">
                        ENGINE UNIT
                      </div>
                      <div className="text-xs font-racing font-bold text-white">399cc | 45 HP</div>
                      <div className="text-[10px] text-[#8b94a5]">Liquid-Cooled DOHC 4V</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Hotspot 2: Cylinder Head */}
              <div 
                className="absolute top-[28%] right-[14%] sm:right-[18%] group cursor-pointer"
                onClick={() => setActiveHotspot(activeHotspot === 'head' ? null : 'head')}
              >
                <div className="relative flex items-center flex-row-reverse">
                  <div className="w-6 h-6 rounded-full bg-[#ff5500]/30 border border-[#ff5500] flex items-center justify-center shadow-glow-sm transition-transform group-hover:scale-125">
                    <div className="w-2 h-2 rounded-full bg-[#ff5500]"></div>
                  </div>
                  <div className="hidden sm:flex items-center mr-2">
                    <div className="bg-[#15181e]/90 backdrop-blur border border-[#ff5500]/50 p-2.5 rounded shadow-xl text-right min-w-[170px] group-hover:border-[#ff5500] transition-colors">
                      <div className="text-[9px] font-mono text-[#ff5500] uppercase font-bold tracking-widest">
                        CYLINDER HEAD
                      </div>
                      <div className="text-xs font-racing font-bold text-white">4 Valves | 2 Cam Levers</div>
                      <div className="text-[10px] text-[#8b94a5]">DLC-coated finger followers</div>
                    </div>
                    <div className="w-10 h-[1px] bg-[#ff5500]"></div>
                  </div>
                </div>
              </div>

              {/* Interactive Hotspot 3: Exhaust System */}
              <div 
                className="absolute bottom-[24%] right-[10%] sm:right-[16%] group cursor-pointer"
                onClick={() => setActiveHotspot(activeHotspot === 'exhaust' ? null : 'exhaust')}
              >
                <div className="relative flex items-center flex-row-reverse">
                  <div className="w-6 h-6 rounded-full bg-[#ff5500]/30 border border-[#ff5500] flex items-center justify-center shadow-glow-sm transition-transform group-hover:scale-125">
                    <div className="w-2 h-2 rounded-full bg-[#ff5500]"></div>
                  </div>
                  <div className="hidden sm:flex items-center mr-2">
                    <div className="bg-[#15181e]/90 backdrop-blur border border-[#ff5500]/50 p-2.5 rounded shadow-xl text-right min-w-[160px] group-hover:border-[#ff5500] transition-colors">
                      <div className="text-[9px] font-mono text-[#ff5500] uppercase font-bold tracking-widest">
                        EXHAUST SYSTEM
                      </div>
                      <div className="text-xs font-racing font-bold text-white">3-Chamber Silencer</div>
                      <div className="text-[10px] text-[#8b94a5]">Mass-centralized belly exit</div>
                    </div>
                    <div className="w-10 h-[1px] bg-[#ff5500]"></div>
                  </div>
                </div>
              </div>

            </div>

            {/* 360 Degree Interactive Controls */}
            <div className="absolute -bottom-4 z-20 flex flex-col items-center group">
              <div className="flex items-center gap-2 bg-[#15181e] border border-[#272e3b] p-1.5 rounded-full shadow-lg">
                <button
                  onClick={rotateLeft}
                  className="p-1.5 text-slate-400 hover:text-[#ff5500] hover:bg-[#1c212a] rounded-full transition-colors"
                  title="Rotate Left"
                >
                  <RotateCw className="w-3.5 h-3.5 transform -scale-x-100" />
                </button>

                <button
                  onClick={() => setRotationAngle(0)}
                  className="flex items-center gap-2 px-3 py-1 font-racing font-bold text-xs uppercase tracking-widest text-slate-100 hover:text-[#ff5500] transition-colors"
                >
                  <span>360° Interactive View</span>
                  <span className="text-[9px] font-mono text-[#ff5500] border-l border-[#272e3b] pl-2">
                    {rotationAngle % 360}°
                  </span>
                </button>

                <button
                  onClick={rotateRight}
                  className="p-1.5 text-slate-400 hover:text-[#ff5500] hover:bg-[#1c212a] rounded-full transition-colors"
                  title="Rotate Right"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Arrow Arc Graphic */}
              <div className="mt-2 text-[#ff5500] opacity-80">
                <svg className="w-16 h-3" fill="none" stroke="currentColor" viewBox="0 0 64 12">
                  <path d="M2 9C18 3 46 3 62 9M62 9L56 4M62 9L56 11" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Specs HUD Bar */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#15181e]/90 border border-[#272e3b]/80 p-4 rounded-lg backdrop-blur shadow-xl">
            
            <div className="border-r border-[#272e3b]/40 pr-4">
              <div className="text-[10px] font-mono text-[#8b94a5] uppercase tracking-wider">0 - 100 KM/H</div>
              <div className="text-2xl lg:text-3xl font-racing font-bold text-white mt-0.5">
                4.2 <span className="text-xs font-sans text-[#ff5500] font-semibold">SEC</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Supermoto Launch Assist</div>
            </div>

            <div className="border-r border-[#272e3b]/40 px-2 md:px-4">
              <div className="text-[10px] font-mono text-[#8b94a5] uppercase tracking-wider">TOP SPEED</div>
              <div className="text-2xl lg:text-3xl font-racing font-bold text-white mt-0.5">
                172 <span className="text-xs font-sans text-[#ff5500] font-semibold">KM/H</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Gear-optimized limiter</div>
            </div>

            <div className="border-r border-[#272e3b]/40 px-2 md:px-4">
              <div className="text-[10px] font-mono text-[#8b94a5] uppercase tracking-wider">POWER TO WEIGHT</div>
              <div className="text-2xl lg:text-3xl font-racing font-bold text-white mt-0.5">
                165 <span className="text-xs font-sans text-[#ff5500] font-semibold">KG (DRY)</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">45 HP / 399 cc</div>
            </div>

            <div className="pl-2 md:pl-4">
              <div className="text-[10px] font-mono text-[#8b94a5] uppercase tracking-wider">MAX TORQUE</div>
              <div className="text-2xl lg:text-3xl font-racing font-bold text-white mt-0.5">
                39 <span className="text-xs font-sans text-[#ff5500] font-semibold">NM @ 7,000 RPM</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Dynamic ride-by-wire</div>
            </div>

          </div>
        </div>
      </section>
      {/* END: HeroShowcaseSection */}

      {/* BEGIN: PowertrainSection */}
      <section className="relative py-24 bg-[#15181e] border-t border-b border-[#272e3b] overflow-hidden" id="power">
        {/* Background Ghost Text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 font-racing font-black text-[18vw] text-white/[0.02] select-none pointer-events-none tracking-tighter">
          TORQUE
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="hud-label mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#ff5500] rounded-full"></span>
              02 // POWERFUL, SMOOTH-RUNNING SINGLE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-racing tracking-tight text-white uppercase max-w-2xl">
              LIGHTWEIGHT EXPLOSIVE PROPULSION
            </h2>
            <div className="w-20 h-1 bg-[#ff5500] mt-4"></div>
          </div>

          {/* Powertrain Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Architecture Card */}
            <div className="bg-[#0d0f12] p-8 rounded-lg border border-[#272e3b] hover:border-[#ff5500]/50 transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#1c212a] technical-cut flex items-center justify-center mb-6 group-hover:bg-[#ff5500] transition-colors">
                  <Cpu className="w-6 h-6 text-[#ff5500] group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl font-racing font-bold text-white mb-2">
                  DLC-Coated Finger Followers
                </h3>
                <p className="text-sm text-[#8b94a5] leading-relaxed">
                  Diamond-Like Carbon coatings minimize friction across the valve train, facilitating effortless revs up to the screaming 10,500 RPM redline.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#272e3b]/60 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">VALVES</span>
                <span className="text-[#ff5500] font-bold">4-VALVE DOHC</span>
              </div>
            </div>

            {/* Slipper Clutch Card */}
            <div className="bg-[#0d0f12] p-8 rounded-lg border border-[#ff5500]/40 hover:border-[#ff5500] transition-all duration-300 relative group shadow-glow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#ff5500] technical-cut flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-racing font-bold text-white mb-2">
                  PASC™ Anti-Hopping Clutch
                </h3>
                <p className="text-sm text-[#8b94a5] leading-relaxed">
                  Prevents rear-wheel chatter during aggressive downshifts before tight hairpins while reducing lever effort to featherlight one-finger control.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#272e3b]/60 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">TRANSMISSION</span>
                <span className="text-[#ff5500] font-bold">6-SPEED QUICKSHIFT+</span>
              </div>
            </div>

            {/* Cooling System Card */}
            <div className="bg-[#0d0f12] p-8 rounded-lg border border-[#272e3b] hover:border-[#ff5500]/50 transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#1c212a] technical-cut flex items-center justify-center mb-6 group-hover:bg-[#ff5500] transition-colors">
                  <Shield className="w-6 h-6 text-[#ff5500] group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl font-racing font-bold text-white mb-2">
                  Curved Radiator System
                </h3>
                <p className="text-sm text-[#8b94a5] leading-relaxed">
                  Dual cooling fans and engineered air-deflector shrouds disperse heated airflow away from rider legs while sustaining peak engine thermal efficiency.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#272e3b]/60 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">COOLING</span>
                <span className="text-[#ff5500] font-bold">DUAL-FAN LIQUID</span>
              </div>
            </div>

          </div>

          {/* Quick link to Dyno and Telemetry */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('telemetry')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded border border-[#272e3b] hover:border-[#ff5500] bg-[#0d0f12] text-xs font-racing font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-all group"
            >
              <span>Explore Live Telemetry Lab & Dyno Curves</span>
              <ArrowUpRight className="w-4 h-4 text-[#ff5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </section>
      {/* END: PowertrainSection */}

      {/* BEGIN: InActionSection */}
      <section className="relative py-24 bg-[#0d0f12] overflow-hidden" id="action">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="hud-label flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5500]"></span>
                03 // HIGH-OCTANE ADRENALINE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-racing tracking-tight text-white uppercase mt-1">
                SEE THE DUKE 390 IN ACTION
              </h2>
            </div>
            <p className="text-sm text-[#8b94a5] max-w-sm mt-3 md:mt-0 font-sans">
              Engineered to carve canyon switchbacks and conquer hyper-dense urban corridors with surgical flickability.
            </p>
          </div>

          {/* Full-Width Dynamic Action Banner Frame */}
          <div className="relative rounded-xl overflow-hidden border border-[#272e3b] group shadow-2xl">
            <div className="relative h-[380px] sm:h-[500px] lg:h-[580px] w-full overflow-hidden bg-[#1c212a]">
              <img 
                alt="APEX 390R knee-down aggressive carving on mountain road" 
                className="w-full h-full object-cover object-center filter saturate-110 contrast-105 transform group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA-9q4zvZZGo4To5Jx2v9xvH9j4xBHQm-PGQedQG-bmS_O3BhoThmBYPv3TH98vdZ_U54-SEkeD99oad7Mva3ElEcvmI9-cKZJ8WfhoaHsT5KxJDmTfE68P_Xhar6JTNPIkD9pE-SZE8wOr_vTO0ELoGSDj11AYkQBqYU30HBO6iNeP4HNk1JKALM-KlVH2nVU9CuBeFtb7O-jv1ph2kByK9YfwvC36icFXSA41__I18jdBo03hHi02Yl8cO4M08M_JA" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-transparent to-black/40"></div>
              
              {/* Corner Crosshair Graphics */}
              <div className="absolute top-6 left-6 border-t-2 border-l-2 border-[#ff5500] w-8 h-8 pointer-events-none"></div>
              <div className="absolute top-6 right-6 border-t-2 border-r-2 border-[#ff5500] w-8 h-8 pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 border-b-2 border-l-2 border-[#ff5500] w-8 h-8 pointer-events-none"></div>
              <div className="absolute bottom-6 right-6 border-b-2 border-r-2 border-[#ff5500] w-8 h-8 pointer-events-none"></div>

              {/* Central Video Play Trigger */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={openVideoModal}
                  aria-label="Play Action Cinematic" 
                  className="relative group/btn flex items-center justify-center focus:outline-none" 
                  type="button"
                >
                  <span className="absolute w-20 h-20 rounded-full bg-[#ff5500]/30 animate-ping"></span>
                  <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ff5500] text-black flex items-center justify-center shadow-glow-orange transform group-hover/btn:scale-110 transition-transform">
                    <Play className="w-7 h-7 translate-x-0.5 fill-current" />
                  </span>
                </button>
              </div>

              {/* Live HUD Telemetry Widget Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
                <div className="bg-[#0d0f12]/80 backdrop-blur-md px-4 py-2 rounded border border-[#272e3b] flex items-center gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-[#8b94a5] uppercase block">LEAN ANGLE</span>
                    <span className="font-racing font-bold text-lg text-white">
                      {activeRidingMode === 'TRACK' ? '51.8°' : activeRidingMode === 'STREET' ? '46.2°' : '36.5°'}
                    </span>
                  </div>
                  <div className="h-6 w-[1px] bg-[#272e3b]"></div>
                  <div>
                    <span className="text-[9px] font-mono text-[#8b94a5] uppercase block">G-FORCE</span>
                    <span className="font-racing font-bold text-lg text-[#ff5500]">
                      {activeRidingMode === 'TRACK' ? '1.32 G' : activeRidingMode === 'STREET' ? '1.18 G' : '0.94 G'}
                    </span>
                  </div>
                </div>

                {/* Riding Modes Selector Simulator */}
                <div className="pointer-events-auto flex items-center gap-1 bg-[#0d0f12]/90 backdrop-blur-md p-1 rounded-lg border border-[#272e3b]">
                  <button 
                    onClick={() => setActiveRidingMode('TRACK')}
                    className={`px-3 py-1.5 text-[10px] font-racing font-bold uppercase rounded transition-colors ${
                      activeRidingMode === 'TRACK' ? 'bg-[#ff5500] text-black' : 'text-slate-300 hover:text-white hover:bg-[#15181e]'
                    }`}
                  >
                    TRACK
                  </button>
                  <button 
                    onClick={() => setActiveRidingMode('STREET')}
                    className={`px-3 py-1.5 text-[10px] font-racing font-bold uppercase rounded transition-colors ${
                      activeRidingMode === 'STREET' ? 'bg-[#ff5500] text-black' : 'text-slate-300 hover:text-white hover:bg-[#15181e]'
                    }`}
                  >
                    STREET
                  </button>
                  <button 
                    onClick={() => setActiveRidingMode('RAIN')}
                    className={`px-3 py-1.5 text-[10px] font-racing font-bold uppercase rounded transition-colors ${
                      activeRidingMode === 'RAIN' ? 'bg-[#ff5500] text-black' : 'text-slate-300 hover:text-white hover:bg-[#15181e]'
                    }`}
                  >
                    RAIN
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Micro Gallery Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {microGallery.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setGalleryModalItem(item)}
                className="group relative rounded-lg overflow-hidden border border-[#272e3b] hover:border-[#ff5500]/60 bg-[#15181e] h-28 sm:h-36 cursor-pointer transition-all"
              >
                <img 
                  alt={item.title} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" 
                  src={item.image} 
                />
                <div className="absolute inset-0 bg-[#0d0f12]/40 group-hover:bg-transparent transition-colors"></div>
                <span className="absolute bottom-2 left-2 text-[10px] font-racing font-bold uppercase bg-black/80 px-2 py-0.5 rounded text-white border border-[#272e3b] group-hover:border-[#ff5500] group-hover:text-[#ff5500]">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>
      {/* END: InActionSection */}

      {/* BEGIN: TechnicalSpecsSection */}
      <section className="py-24 bg-[#15181e] border-t border-[#272e3b] relative" id="specs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="hud-label mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#ff5500] rounded-full"></span>
              04 // TECHNICAL SPECIFICATION MATRIX
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-racing tracking-tight text-white uppercase">
              ENGINE & CHASSIS ARCHITECTURE
            </h2>
            <div className="w-20 h-1 bg-[#ff5500] mt-4"></div>
          </div>

          {/* Telemetry Highlight Summary Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 text-center">
            <div className="bg-[#0d0f12] p-5 rounded border border-[#272e3b]">
              <span className="text-[10px] font-mono uppercase text-[#ff5500] block">DESIGN</span>
              <span className="text-base font-racing font-bold text-white mt-1 block">1-Cylinder 4-Stroke</span>
              <span className="text-[11px] text-[#8b94a5]">Liquid-Cooled DOHC</span>
            </div>
            <div className="bg-[#0d0f12] p-5 rounded border border-[#272e3b]">
              <span className="text-[10px] font-mono uppercase text-[#ff5500] block">DISPLACEMENT</span>
              <span className="text-base font-racing font-bold text-white mt-1 block">398.7 cm³</span>
              <span className="text-[11px] text-[#8b94a5]">Precision Bore</span>
            </div>
            <div className="bg-[#0d0f12] p-5 rounded border border-[#272e3b]">
              <span className="text-[10px] font-mono uppercase text-[#ff5500] block">BORE × STROKE</span>
              <span className="text-base font-racing font-bold text-white mt-1 block">89 mm × 64 mm</span>
              <span className="text-[11px] text-[#8b94a5]">Forged Piston</span>
            </div>
            <div className="bg-[#0d0f12] p-5 rounded border border-[#272e3b]">
              <span className="text-[10px] font-mono uppercase text-[#ff5500] block">OUTPUT POWER</span>
              <span className="text-base font-racing font-bold text-white mt-1 block">33 kW (45 HP)</span>
              <span className="text-[11px] text-[#8b94a5]">@ 8,500 RPM</span>
            </div>
          </div>

          {/* Detailed Spec Grid Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Table 1: Powertrain & Transmission */}
            <div className="bg-[#0d0f12] rounded-xl border border-[#272e3b] overflow-hidden">
              <div className="px-6 py-4 bg-[#1c212a] border-b border-[#272e3b] flex items-center justify-between">
                <span className="font-racing font-bold text-sm tracking-wider text-white">ENGINE TELEMETRY</span>
                <span className="text-[10px] font-mono text-[#ff5500]">SYS.REF // ENG-390R</span>
              </div>
              <dl className="divide-y divide-[#272e3b]/60 text-xs sm:text-sm">
                <div className="px-6 py-3.5 flex justify-between">
                  <dt className="text-[#8b94a5]">Lubrication System</dt>
                  <dd className="font-mono text-white text-right">Wet sump with 2 oil pumps</dd>
                </div>
                <div className="px-6 py-3.5 flex justify-between bg-white/[0.01]">
                  <dt className="text-[#8b94a5]">Clutch Assembly</dt>
                  <dd className="font-mono text-white text-right">PASC™ slipper clutch, mechanically operated</dd>
                </div>
                <div className="px-6 py-3.5 flex justify-between">
                  <dt className="text-[#8b94a5]">EMS Engine Management</dt>
                  <dd className="font-mono text-white text-right">Bosch EMS with Ride-by-Wire</dd>
                </div>
                <div className="px-6 py-3.5 flex justify-between bg-white/[0.01]">
                  <dt className="text-[#8b94a5]">CO2 Emissions & Fuel Consumption</dt>
                  <dd className="font-mono text-white text-right">79 g/km // 3.4 L / 100 km</dd>
                </div>
                <div className="px-6 py-3.5 flex justify-between">
                  <dt className="text-[#8b94a5]">Starter Type</dt>
                  <dd className="font-mono text-white text-right">Electric starter 12V / 0.8kW</dd>
                </div>
              </dl>
            </div>

            {/* Table 2: Chassis & Electronics */}
            <div className="bg-[#0d0f12] rounded-xl border border-[#272e3b] overflow-hidden">
              <div className="px-6 py-4 bg-[#1c212a] border-b border-[#272e3b] flex items-center justify-between">
                <span className="font-racing font-bold text-sm tracking-wider text-white">CHASSIS & DYNAMICS</span>
                <span className="text-[10px] font-mono text-[#ff5500]">SYS.REF // CHS-390R</span>
              </div>
              <dl className="divide-y divide-[#272e3b]/60 text-xs sm:text-sm">
                <div className="px-6 py-3.5 flex justify-between">
                  <dt className="text-[#8b94a5]">Frame Architecture</dt>
                  <dd className="font-mono text-white text-right">Steel trellis, powder coated, bolt-on subframe</dd>
                </div>
                <div className="px-6 py-3.5 flex justify-between bg-white/[0.01]">
                  <dt className="text-[#8b94a5]">Front Suspension</dt>
                  <dd className="font-mono text-white text-right">WP APEX 43mm upside-down (150 mm travel)</dd>
                </div>
                <div className="px-6 py-3.5 flex justify-between">
                  <dt className="text-[#8b94a5]">Rear Monoshock</dt>
                  <dd className="font-mono text-white text-right">WP APEX with preload adjust (150 mm travel)</dd>
                </div>
                <div className="px-6 py-3.5 flex justify-between bg-white/[0.01]">
                  <dt className="text-[#8b94a5]">Front Brake System</dt>
                  <dd className="font-mono text-white text-right">Four-piston radial fixed caliper, 320 mm disc</dd>
                </div>
                <div className="px-6 py-3.5 flex justify-between">
                  <dt className="text-[#8b94a5]">Braking ABS Assist</dt>
                  <dd className="font-mono text-[#ff5500] text-right font-semibold">Bosch 9.3 MP Cornering ABS (Supermoto mode)</dd>
                </div>
              </dl>
            </div>

          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate('motorcycle-detail', 'apex-390r')}
              className="px-6 py-3 bg-[#1c212a] hover:bg-[#ff5500] hover:text-black transition-colors text-white font-racing font-bold text-xs uppercase tracking-wider rounded border border-[#272e3b]"
            >
              View Full APEX 390R Factory Page
            </button>
            <button
              onClick={() => navigate('configurator')}
              className="px-6 py-3 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all shadow-glow-sm"
            >
              Open 3D Studio Configurator
            </button>
          </div>

        </div>
      </section>
      {/* END: TechnicalSpecsSection */}

      {/* Full Kinetic Lineup Showcase Section */}
      <section className="py-20 bg-[#0d0f12] border-t border-[#272e3b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="hud-label uppercase tracking-widest text-[#ff5500] block mb-1">
                AUSTRIAN RACING DNA
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-racing text-white">
                THE KINETIC FACTORY LINEUP
              </h2>
            </div>
            <button
              onClick={() => navigate('motorcycles')}
              className="text-xs font-racing font-bold uppercase tracking-wider text-[#ff5500] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Explore All 4 Models</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOTORCYCLES.map(bike => (
              <div 
                key={bike.id}
                className="bg-[#15181e] border border-[#272e3b] hover:border-[#ff5500]/60 rounded-xl overflow-hidden group transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-[#1c212a] relative overflow-hidden flex items-center justify-center p-4">
                    <img 
                      src={bike.image} 
                      alt={bike.name} 
                      className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500" 
                    />
                    <span className="absolute top-3 left-3 bg-[#ff5500] text-black text-[10px] font-racing font-bold px-2 py-0.5 rounded">
                      {bike.badge}
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-[#272e3b]">
                      €{bike.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="text-[10px] font-mono text-[#ff5500] uppercase font-bold tracking-wider">
                      {bike.subTitle}
                    </div>
                    <h3 className="text-lg font-racing font-bold text-white mt-0.5 group-hover:text-[#ff5500] transition-colors">
                      {bike.name}
                    </h3>

                    <div className="grid grid-cols-3 gap-2 py-3 my-3 border-t border-b border-[#272e3b] text-center font-mono">
                      <div>
                        <div className="text-[9px] text-[#8b94a5]">DISPL.</div>
                        <div className="text-xs font-bold text-white">{bike.displacement}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-[#8b94a5]">POWER</div>
                        <div className="text-xs font-bold text-[#ff5500]">{bike.power.split(' ')[0]} HP</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-[#8b94a5]">0-100</div>
                        <div className="text-xs font-bold text-white">{bike.zeroToHundred}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-2">
                  <button
                    onClick={() => navigate('motorcycle-detail', bike.id)}
                    className="flex-1 py-2 bg-[#1c212a] hover:bg-[#272e3b] text-white text-xs font-racing font-bold uppercase rounded text-center transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => openTestRideModal(bike.id)}
                    className="px-3 py-2 bg-[#ff5500] hover:bg-[#ff6a1a] text-black text-xs font-racing font-bold uppercase technical-cut transition-colors"
                    title="Book Ride"
                  >
                    Ride
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEGIN: PreOrderCallToAction */}
      <section className="relative py-20 bg-[#0d0f12] border-t border-[#272e3b] overflow-hidden" id="book-ride">
        {/* Glow Decorator */}
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff5500]/10 blur-[130px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="hud-label uppercase tracking-widest text-[#ff5500] mb-3 inline-block">
            APEX RACE EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-racing text-white tracking-tight">
            READY TO OWN THE ASPHALT?
          </h2>
          <p className="mt-4 text-[#8b94a5] text-sm sm:text-base max-w-xl mx-auto">
            Schedule an exclusive track day test ride or configure your tailor-made APEX 390R street setup at your authorized local dealer.
          </p>

          {/* Lead Conversion Form */}
          {leadSubmitted ? (
            <div className="mt-8 bg-[#15181e] border border-[#ff5500] p-4 rounded-lg max-w-md mx-auto flex items-center justify-center gap-3 text-white">
              <Check className="w-5 h-5 text-[#ff5500]" />
              <span className="font-racing text-sm font-bold">
                Email registered! Opening test ride scheduler...
              </span>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                className="flex-1 bg-[#15181e] border border-[#272e3b] focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] rounded px-4 py-3 text-sm text-white placeholder-[#8b94a5] focus:outline-none" 
                placeholder="Enter your email address" 
                required 
                type="email" 
                value={leadEmail}
                onChange={e => setLeadEmail(e.target.value)}
              />
              <button 
                className="px-6 py-3 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all shadow-glow-sm hover:shadow-glow-orange flex items-center justify-center gap-2" 
                type="submit"
              >
                <span>Request Test Ride</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#8b94a5] font-mono">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#ff5500]" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path>
              </svg>
              2-Year Factory Warranty
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#ff5500]" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path>
              </svg>
              Roadside Assistance
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#ff5500]" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path>
              </svg>
              Certified Dealer Network
            </span>
          </div>
        </div>
      </section>
      {/* END: PreOrderCallToAction */}

      {/* Gallery Lightbox Modal */}
      {galleryModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#15181e] border border-[#ff5500] rounded-xl max-w-xl w-full p-6 text-slate-200">
            <div className="flex justify-between items-center mb-4">
              <span className="font-racing font-bold text-lg text-white">
                {galleryModalItem.title}
              </span>
              <button
                onClick={() => setGalleryModalItem(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="rounded-lg overflow-hidden border border-[#272e3b] mb-4 aspect-video bg-black flex items-center justify-center">
              <img
                src={galleryModalItem.image}
                alt={galleryModalItem.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-[#8b94a5] leading-relaxed mb-4">
              {galleryModalItem.desc}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setGalleryModalItem(null)}
                className="px-4 py-2 bg-[#272e3b] hover:bg-[#ff5500] hover:text-black text-white font-racing font-bold text-xs uppercase rounded transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
