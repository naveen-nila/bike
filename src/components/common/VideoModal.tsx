import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { engineSound } from '../../utils/audioEngine';
import { X, Volume2, VolumeX, Eye, Maximize2 } from 'lucide-react';

export const VideoModal: React.FC = () => {
  const { isVideoModalOpen, closeVideoModal } = useApp();
  const [cameraAngle, setCameraAngle] = useState<'helmet' | 'fork' | 'chase'>('helmet');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [telemetrySpeed, setTelemetrySpeed] = useState(84);
  const [telemetryRpm, setTelemetryRpm] = useState(7200);
  const [telemetryLean, setTelemetryLean] = useState(38);
  const [gear, setGear] = useState(3);

  // Dynamic telemetry simulator
  useEffect(() => {
    if (!isVideoModalOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setTelemetrySpeed(prev => {
        const next = prev > 140 ? 68 : prev + Math.floor(Math.random() * 5) - 1;
        return Math.max(50, Math.min(155, next));
      });

      setTelemetryRpm(prev => {
        const next = prev > 9800 ? 5500 : prev + Math.floor(Math.random() * 400) - 150;
        if (isSoundOn) {
          engineSound.setRpm(next);
        }
        return Math.max(4000, Math.min(10400, next));
      });

      setTelemetryLean(prev => {
        const lean = Math.sin(Date.now() / 800) * 48;
        return Math.round(lean);
      });

      setGear(() => {
        const s = telemetrySpeed;
        if (s < 60) return 2;
        if (s < 90) return 3;
        if (s < 120) return 4;
        return 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isVideoModalOpen, isPlaying, isSoundOn, telemetrySpeed]);

  // Audio start/stop on sound toggle
  useEffect(() => {
    if (isSoundOn && isVideoModalOpen) {
      engineSound.start();
      engineSound.setRpm(telemetryRpm);
    } else {
      engineSound.stop();
    }
    return () => {
      engineSound.stop();
    };
  }, [isSoundOn, isVideoModalOpen]);

  const handleClose = () => {
    setIsSoundOn(false);
    engineSound.stop();
    closeVideoModal();
  };

  if (!isVideoModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl">
      <div className="relative w-full max-w-5xl bg-[#0d0f12] border border-[#ff5500]/60 rounded-xl overflow-hidden shadow-2xl shadow-glow-orange flex flex-col">
        
        {/* Top Bar Header */}
        <div className="px-5 py-3.5 bg-[#15181e] border-b border-[#272e3b] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="font-racing font-bold text-sm tracking-wider text-white">
              LIVE ONBOARD FEED // GROSSGLOCKNER CANYON PASS
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-[#ff5500] border border-[#272e3b]">
              4K 60FPS TELEMETRY SYNC
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSoundOn(!isSoundOn)}
              className={`p-2 rounded border text-xs font-racing flex items-center gap-1.5 transition-colors ${
                isSoundOn 
                  ? 'border-[#ff5500] bg-[#ff5500]/20 text-[#ff5500]' 
                  : 'border-[#272e3b] text-slate-400 hover:text-white'
              }`}
              title={isSoundOn ? 'Mute engine audio' : 'Synthesize live engine roar'}
            >
              {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSoundOn ? 'Engine Audio ON' : 'Audio Muted'}</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-[#1c212a] transition-colors"
              aria-label="Close video player"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Video Canvas Stage with Visuals & Dynamic HUD */}
        <div className="relative aspect-video w-full bg-[#050608] overflow-hidden flex items-center justify-center">
          
          {/* Backdrop Simulation Image */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA-9q4zvZZGo4To5Jx2v9xvH9j4xBHQm-PGQedQG-bmS_O3BhoThmBYPv3TH98vdZ_U54-SEkeD99oad7Mva3ElEcvmI9-cKZJ8WfhoaHsT5KxJDmTfE68P_Xhar6JTNPIkD9pE-SZE8wOr_vTO0ELoGSDj11AYkQBqYU30HBO6iNeP4HNk1JKALM-KlVH2nVU9CuBeFtb7O-jv1ph2kByK9YfwvC36icFXSA41__I18jdBo03hHi02Yl8cO4M08M_JA"
            alt="Canyon Carving Onboard"
            className="w-full h-full object-cover filter contrast-110 saturate-125 transform scale-105"
            style={{
              transform: `rotate(${telemetryLean * 0.15}deg) scale(1.06)`,
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />

          {/* Vignette & Scanlines */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80 pointer-events-none"></div>

          {/* Corner Crosshairs */}
          <div className="absolute top-6 left-6 border-t-2 border-l-2 border-[#ff5500] w-8 h-8 pointer-events-none"></div>
          <div className="absolute top-6 right-6 border-t-2 border-r-2 border-[#ff5500] w-8 h-8 pointer-events-none"></div>
          <div className="absolute bottom-6 left-6 border-b-2 border-l-2 border-[#ff5500] w-8 h-8 pointer-events-none"></div>
          <div className="absolute bottom-6 right-6 border-b-2 border-r-2 border-[#ff5500] w-8 h-8 pointer-events-none"></div>

          {/* Telemetry Center HUD */}
          <div className="absolute top-8 left-8 bg-[#0d0f12]/80 backdrop-blur-md border border-[#272e3b] p-3 rounded font-mono text-xs pointer-events-none">
            <div className="text-[10px] text-[#ff5500] font-bold">GPS TELEMETRY // SECTOR 3</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-racing font-bold text-white tabular-nums">{telemetrySpeed}</span>
              <span className="text-[#8b94a5] text-xs font-sans">KM/H</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              GEAR <span className="text-white font-bold">{gear}</span> // THROTTLE 88%
            </div>
          </div>

          {/* Lean Angle & G-Force Gauge */}
          <div className="absolute top-8 right-8 bg-[#0d0f12]/80 backdrop-blur-md border border-[#272e3b] p-3 rounded font-mono text-xs text-right pointer-events-none">
            <div className="text-[10px] text-[#ff5500] font-bold">CHASSIS ROLL DYNAMICS</div>
            <div className="text-2xl font-racing font-bold text-white mt-1">
              {Math.abs(telemetryLean)}° <span className="text-xs font-mono text-[#ff5500]">{telemetryLean < 0 ? 'LEFT' : 'RIGHT'}</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              PEAK LATERAL: <span className="text-white">1.28 G</span>
            </div>
          </div>

          {/* Bottom Tachometer Bar */}
          <div className="absolute bottom-6 left-8 right-8 bg-[#0d0f12]/85 backdrop-blur-md border border-[#272e3b] p-3 rounded-lg flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span className="text-[#ff5500] font-bold">RPM TACHOMETER (REDLINE: 10,500)</span>
              <span className="text-white font-bold">{telemetryRpm} RPM</span>
            </div>
            <div className="w-full bg-[#1c212a] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#272e3b]">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-[#ff5500] to-red-600 rounded-full transition-all duration-150"
                style={{ width: `${(telemetryRpm / 10500) * 100}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* Video Control Bar */}
        <div className="px-5 py-3 bg-[#15181e] border-t border-[#272e3b] flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Camera Angles */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-racing uppercase tracking-wider text-[11px] flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-[#ff5500]" />
              Cam:
            </span>
            {(['helmet', 'fork', 'chase'] as const).map(angle => (
              <button
                key={angle}
                onClick={() => setCameraAngle(angle)}
                className={`px-3 py-1 font-racing text-[10px] uppercase font-bold rounded transition-colors ${
                  cameraAngle === angle 
                    ? 'bg-[#ff5500] text-black' 
                    : 'bg-[#1c212a] text-slate-300 hover:text-white'
                }`}
              >
                {angle}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>TRACK: ALPENSTRASSE S-BENDS</span>
            <span>TEMP: 22°C // DRY ASPHALT</span>
          </div>

        </div>

      </div>
    </div>
  );
};
