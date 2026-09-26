import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Activity, 
  Cpu, 
  Zap, 
  Disc, 
  Sliders, 
  Layers, 
  Compass, 
  RotateCw, 
  ShieldCheck 
} from 'lucide-react';

export const TelemetryPage: React.FC = () => {
  const { activeRidingMode, setActiveRidingMode } = useApp();

  // Live telemetry dynamic generator
  const [leanAngle, setLeanAngle] = useState(0);
  const [throttlePct, setThrottlePct] = useState(42);
  const [frontBrakeBar, setFrontBrakeBar] = useState(0);
  const [speedKmh, setSpeedKmh] = useState(94);
  const [gForceLateral, setGForceLateral] = useState(1.1);
  const [absIntervention, setAbsIntervention] = useState(false);

  // Suspension Calculator State
  const [riderWeight, setRiderWeight] = useState(75);
  const [ridingStyle, setRidingStyle] = useState<'comfort' | 'canyon' | 'track'>('canyon');

  // Real-time telemetry simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const time = Date.now() / 1000;
      const calculatedLean = Math.round(Math.sin(time * 1.4) * 49);
      setLeanAngle(calculatedLean);

      const latG = Math.abs(calculatedLean / 42) + 0.15;
      setGForceLateral(parseFloat(latG.toFixed(2)));

      if (Math.abs(calculatedLean) > 42) {
        setThrottlePct(28);
        setFrontBrakeBar(12);
        setSpeedKmh(Math.round(82 + Math.random() * 8));
        if (Math.abs(calculatedLean) > 47) {
          setAbsIntervention(true);
        } else {
          setAbsIntervention(false);
        }
      } else {
        setThrottlePct(Math.round(65 + Math.random() * 30));
        setFrontBrakeBar(0);
        setSpeedKmh(Math.round(112 + Math.random() * 15));
        setAbsIntervention(false);
      }
    }, 200);

    return () => clearInterval(timer);
  }, []);

  // Suspension Clicker Calculation
  const getSuspensionSettings = () => {
    if (ridingStyle === 'comfort') {
      return {
        forkComp: '18 clicks open',
        forkRebound: '16 clicks open',
        rearPreload: riderWeight > 85 ? 'Position 3' : 'Position 2',
        rearRebound: '15 clicks open',
        airPressureFront: '2.0 bar (29 psi)',
        airPressureRear: '2.2 bar (32 psi)'
      };
    } else if (ridingStyle === 'canyon') {
      return {
        forkComp: '12 clicks open',
        forkRebound: '11 clicks open',
        rearPreload: riderWeight > 85 ? 'Position 4' : 'Position 3',
        rearRebound: '10 clicks open',
        airPressureFront: '2.1 bar (30 psi)',
        airPressureRear: '2.3 bar (33 psi)'
      };
    } else {
      return {
        forkComp: '6 clicks open (Firm Track)',
        forkRebound: '7 clicks open',
        rearPreload: riderWeight > 85 ? 'Position 5' : 'Position 4',
        rearRebound: '6 clicks open',
        airPressureFront: '2.2 bar (32 psi)',
        airPressureRear: '2.0 bar (29 psi hot)'
      };
    }
  };

  const suspension = getSuspensionSettings();

  return (
    <div className="pt-28 pb-20 bg-[#0d0f12] min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-[#272e3b] pb-8 mb-8">
          <span className="hud-label uppercase tracking-widest text-[#ff5500] block mb-1">
            KINETIC PERFORMANCE LAB // TELEMETRY & ECU PROTOCOLS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-racing text-white tracking-tight">
            MOTORCYCLE TELEMETRY LAB
          </h1>
          <p className="text-sm text-[#8b94a5] max-w-2xl mt-2">
            Direct insight into the 6D IMU inertial telemetry suite, Bosch 9.3 MP cornering algorithms, and precision WP suspension setup geometry.
          </p>
        </div>

        {/* Live Active Telemetry HUD Stage */}
        <div className="bg-[#15181e] border border-[#ff5500]/60 rounded-xl p-6 mb-12 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#272e3b] gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
              <div>
                <h3 className="text-lg font-racing font-bold text-white">
                  LIVE CAN-BUS SENSOR TELEMETRY STREAM
                </h3>
                <span className="text-[10px] font-mono text-[#8b94a5]">
                  SAMPLING RATE: 200 HZ // BOSCH EMS RIDE-BY-WIRE
                </span>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1 bg-[#0d0f12] p-1 rounded-lg border border-[#272e3b]">
              {(['TRACK', 'STREET', 'RAIN'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setActiveRidingMode(mode)}
                  className={`px-3 py-1.5 text-xs font-racing font-bold uppercase rounded transition-colors ${
                    activeRidingMode === mode
                      ? 'bg-[#ff5500] text-black shadow-glow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Real-Time Gauges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
            
            {/* Lean Angle Dial */}
            <div className="bg-[#0d0f12] border border-[#272e3b] p-5 rounded-xl text-center relative overflow-hidden">
              <span className="text-[10px] text-[#8b94a5] uppercase block mb-1">
                CHASSIS LEAN ANGLE
              </span>
              
              {/* Dial visual */}
              <div className="relative w-32 h-32 mx-auto my-2 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#272e3b" strokeWidth="6" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#ff5500"
                    strokeWidth="6"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (Math.abs(leanAngle) / 60) * 132}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-racing font-bold text-white tabular-nums">
                    {Math.abs(leanAngle)}°
                  </span>
                  <span className="text-[9px] text-[#ff5500] block">
                    {leanAngle < 0 ? 'LEFT APEX' : leanAngle > 0 ? 'RIGHT APEX' : 'VERTICAL'}
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400">
                MAX PEAK: <strong className="text-white">52.4°</strong>
              </div>
            </div>

            {/* Throttle & Brake Pressure */}
            <div className="bg-[#0d0f12] border border-[#272e3b] p-5 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#8b94a5] uppercase block mb-1">
                  THROTTLE POSITION (TPS)
                </span>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-2xl font-racing font-bold text-white tabular-nums">{throttlePct}%</span>
                  <span className="text-[10px] text-[#ff5500]">RIDE-BY-WIRE</span>
                </div>
                <div className="w-full bg-[#1c212a] h-2 rounded-full overflow-hidden mb-5">
                  <div className="h-full bg-[#ff5500] rounded-full transition-all duration-150" style={{ width: `${throttlePct}%` }}></div>
                </div>

                <span className="text-[10px] text-[#8b94a5] uppercase block mb-1">
                  FRONT HYDRAULIC PRESSURE
                </span>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-2xl font-racing font-bold text-white tabular-nums">{frontBrakeBar} BAR</span>
                  <span className="text-[10px] text-slate-400">RADIAL 320MM</span>
                </div>
                <div className="w-full bg-[#1c212a] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-150" style={{ width: `${(frontBrakeBar / 25) * 100}%` }}></div>
                </div>
              </div>
            </div>

            {/* G-Force Vector */}
            <div className="bg-[#0d0f12] border border-[#272e3b] p-5 rounded-xl text-center flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#8b94a5] uppercase block mb-1">
                  LATERAL CORNERING G-FORCE
                </span>
                <div className="text-3xl font-racing font-bold text-[#ff5500] my-2 tabular-nums">
                  {gForceLateral} G
                </div>
                <div className="text-xs text-slate-400">
                  Calculated by 6-Axis Inertial Measurement Unit (IMU)
                </div>
              </div>

              {/* G-Force crosshair circle */}
              <div className="w-20 h-20 mx-auto rounded-full border border-dashed border-[#272e3b] relative flex items-center justify-center my-2">
                <div className="w-px h-full bg-[#272e3b] absolute"></div>
                <div className="h-px w-full bg-[#272e3b] absolute"></div>
                <div 
                  className="w-3.5 h-3.5 rounded-full bg-[#ff5500] shadow-glow-sm transition-all duration-200"
                  style={{
                    transform: `translate(${(leanAngle / 50) * 28}px, ${frontBrakeBar > 5 ? -14 : 10}px)`
                  }}
                ></div>
              </div>
            </div>

            {/* ABS / Slip Events */}
            <div className="bg-[#0d0f12] border border-[#272e3b] p-5 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#8b94a5] uppercase block mb-1">
                  CORNERING ABS & SLIP STATUS
                </span>
                <div className="text-sm font-racing font-bold text-white mt-1">
                  BOSCH 9.3 MP {activeRidingMode === 'TRACK' ? 'SUPERMOTO MODE' : 'STREET DUAL'}
                </div>
                <div className="mt-3 p-3 rounded bg-[#15181e] border border-[#272e3b] space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Front Wheel ABS:</span>
                    <span className="text-emerald-400 font-bold">ARMED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rear Wheel ABS:</span>
                    <span className={activeRidingMode === 'TRACK' ? 'text-[#ff5500] font-bold' : 'text-emerald-400 font-bold'}>
                      {activeRidingMode === 'TRACK' ? 'DEACTIVATED (DRIFT)' : 'ACTIVE'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Wheelie Control:</span>
                    <span className="text-white">
                      {activeRidingMode === 'TRACK' ? 'OFF (RACE)' : 'LEVEL 2 ACTIVE'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`p-2 rounded text-center text-xs font-racing font-bold uppercase transition-colors ${
                absIntervention ? 'bg-amber-500/20 text-amber-400 border border-amber-500' : 'bg-[#1c212a] text-slate-500'
              }`}>
                {absIntervention ? 'CORNERING MTC SLIP EVENT DETECTED' : 'TRACTION OPTIMAL'}
              </div>
            </div>

          </div>

        </div>

        {/* Riding Modes Deep Comparison */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="hud-label uppercase tracking-widest text-[#ff5500]">
              ELECTRONIC ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-racing text-white">
              RIDING MODES BREAKDOWN
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Track */}
            <div className={`p-6 rounded-xl border transition-all ${
              activeRidingMode === 'TRACK' 
                ? 'bg-[#15181e] border-[#ff5500] shadow-glow-sm' 
                : 'bg-[#0d0f12] border-[#272e3b]'
            }`}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-racing font-bold text-lg text-white">TRACK MODE</span>
                <span className="px-2 py-0.5 rounded bg-[#ff5500] text-black font-racing font-bold text-[10px]">
                  100% UNLEASHED
                </span>
              </div>
              <p className="text-xs text-[#8b94a5] leading-relaxed mb-4">
                Maximum 45 HP with instantaneous throttle sensitivity. Rear wheel ABS is fully disabled for aggressive supermoto corner entry drifts.
              </p>
              <ul className="text-xs font-mono space-y-2 text-slate-300">
                <li className="flex justify-between"><span>Power Output:</span> <strong className="text-[#ff5500]">45 HP Full</strong></li>
                <li className="flex justify-between"><span>Throttle Curve:</span> <strong className="text-white">Aggressive Linear</strong></li>
                <li className="flex justify-between"><span>Rear ABS:</span> <strong className="text-[#ff5500]">Disabled (Supermoto)</strong></li>
                <li className="flex justify-between"><span>Wheelie Mitigation:</span> <strong className="text-white">Deactivated</strong></li>
              </ul>
            </div>

            {/* Street */}
            <div className={`p-6 rounded-xl border transition-all ${
              activeRidingMode === 'STREET' 
                ? 'bg-[#15181e] border-[#ff5500] shadow-glow-sm' 
                : 'bg-[#0d0f12] border-[#272e3b]'
            }`}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-racing font-bold text-lg text-white">STREET MODE</span>
                <span className="px-2 py-0.5 rounded bg-blue-500 text-white font-racing font-bold text-[10px]">
                  BALANCED AGILITY
                </span>
              </div>
              <p className="text-xs text-[#8b94a5] leading-relaxed mb-4">
                Full 45 HP delivery with smoothed initial roll-on. Dual-channel Cornering ABS and Traction Control offer optimum safety in traffic and canyons.
              </p>
              <ul className="text-xs font-mono space-y-2 text-slate-300">
                <li className="flex justify-between"><span>Power Output:</span> <strong className="text-white">45 HP Full</strong></li>
                <li className="flex justify-between"><span>Throttle Curve:</span> <strong className="text-white">Smooth Progressive</strong></li>
                <li className="flex justify-between"><span>Rear ABS:</span> <strong className="text-white">Full Cornering Active</strong></li>
                <li className="flex justify-between"><span>Wheelie Mitigation:</span> <strong className="text-white">Level 2 (Comfort)</strong></li>
              </ul>
            </div>

            {/* Rain */}
            <div className={`p-6 rounded-xl border transition-all ${
              activeRidingMode === 'RAIN' 
                ? 'bg-[#15181e] border-[#ff5500] shadow-glow-sm' 
                : 'bg-[#0d0f12] border-[#272e3b]'
            }`}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-racing font-bold text-lg text-white">RAIN MODE</span>
                <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-200 font-racing font-bold text-[10px]">
                  WET SURFACE SAFETY
                </span>
              </div>
              <p className="text-xs text-[#8b94a5] leading-relaxed mb-4">
                Power restricted to 35 HP with ultra-gentle throttle ramping. Maximum traction control intervention prevents wheel spin on paint and wet tram tracks.
              </p>
              <ul className="text-xs font-mono space-y-2 text-slate-300">
                <li className="flex justify-between"><span>Power Output:</span> <strong className="text-white">35 HP (Restricted)</strong></li>
                <li className="flex justify-between"><span>Throttle Curve:</span> <strong className="text-white">Soft Dampened</strong></li>
                <li className="flex justify-between"><span>Rear ABS:</span> <strong className="text-white">Maximum Sensitivity</strong></li>
                <li className="flex justify-between"><span>Wheelie Mitigation:</span> <strong className="text-white">Level 4 (Strict)</strong></li>
              </ul>
            </div>

          </div>
        </div>

        {/* WP Suspension Clicker Setup Calculator */}
        <div className="bg-[#15181e] border border-[#272e3b] rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#272e3b] gap-4">
            <div>
              <span className="hud-label uppercase tracking-widest text-[#ff5500]">
                WP SUSPENSION WORKS // GEOMETRY LAB
              </span>
              <h3 className="text-2xl font-racing font-bold text-white">
                WP APEX 43MM & REAR SHOCK CLICKER CALCULATOR
              </h3>
            </div>
            <span className="text-xs font-mono text-[#8b94a5]">
              SPLIT-DAMPING OPEN CARTRIDGE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Input Controls */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-2">
                  Rider Weight (with Full Riding Gear): <strong className="text-[#ff5500] font-mono">{riderWeight} kg</strong>
                </label>
                <input
                  type="range"
                  min="55"
                  max="125"
                  value={riderWeight}
                  onChange={e => setRiderWeight(Number(e.target.value))}
                  className="w-full accent-[#ff5500] h-2 bg-[#0d0f12] rounded border border-[#272e3b] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#8b94a5] mt-1">
                  <span>55 kg (Lightweight)</span>
                  <span>85 kg (Standard)</span>
                  <span>125 kg (Heavy)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-2">
                  Target Riding Application:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'comfort', label: 'Urban / Touring' },
                    { id: 'canyon', label: 'Canyon Carving' },
                    { id: 'track', label: 'Track Day Slicks' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRidingStyle(opt.id as any)}
                      className={`p-2.5 rounded border text-xs font-racing font-bold uppercase transition-all ${
                        ridingStyle === opt.id
                          ? 'bg-[#ff5500] text-black border-[#ff5500]'
                          : 'bg-[#0d0f12] text-slate-400 border-[#272e3b] hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Settings Display */}
            <div className="lg:col-span-7 bg-[#0d0f12] border border-[#272e3b] p-5 rounded-xl font-mono text-xs">
              <span className="text-[10px] font-mono text-[#ff5500] uppercase font-bold block mb-3">
                RECOMMENDED CLICKER POSITIONING (FROM FULLY CLOSED):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-[#15181e] rounded border border-[#272e3b]">
                  <span className="text-[#8b94a5] block text-[10px]">FRONT FORK COMPRESSION (LEFT CAP)</span>
                  <span className="text-base font-racing font-bold text-white mt-1 block">{suspension.forkComp}</span>
                </div>
                <div className="p-3 bg-[#15181e] rounded border border-[#272e3b]">
                  <span className="text-[#8b94a5] block text-[10px]">FRONT FORK REBOUND (RIGHT CAP)</span>
                  <span className="text-base font-racing font-bold text-white mt-1 block">{suspension.forkRebound}</span>
                </div>
                <div className="p-3 bg-[#15181e] rounded border border-[#272e3b]">
                  <span className="text-[#8b94a5] block text-[10px]">REAR MONOSHOCK PRELOAD</span>
                  <span className="text-base font-racing font-bold text-[#ff5500] mt-1 block">{suspension.rearPreload}</span>
                </div>
                <div className="p-3 bg-[#15181e] rounded border border-[#272e3b]">
                  <span className="text-[#8b94a5] block text-[10px]">REAR MONOSHOCK REBOUND</span>
                  <span className="text-base font-racing font-bold text-white mt-1 block">{suspension.rearRebound}</span>
                </div>
                <div className="p-3 bg-[#15181e] rounded border border-[#272e3b]">
                  <span className="text-[#8b94a5] block text-[10px]">COLD TIRE PRESSURE (FRONT)</span>
                  <span className="text-sm font-bold text-white mt-1 block">{suspension.airPressureFront}</span>
                </div>
                <div className="p-3 bg-[#15181e] rounded border border-[#272e3b]">
                  <span className="text-[#8b94a5] block text-[10px]">COLD TIRE PRESSURE (REAR)</span>
                  <span className="text-sm font-bold text-white mt-1 block">{suspension.airPressureRear}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
