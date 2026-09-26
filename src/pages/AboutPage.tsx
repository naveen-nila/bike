import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Cpu, 
  Wind, 
  Compass, 
  Activity, 
  Award, 
  ChevronRight, 
  Zap, 
  Users 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate, openTestRideModal } = useApp();

  return (
    <div className="pt-28 pb-20 bg-[#0d0f12] min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#272e3b] pb-8 mb-12">
          <span className="hud-label uppercase tracking-widest text-[#ff5500] block mb-1">
            KINETIC MOTORCYCLES // RACING HERITAGE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-racing text-white tracking-tight">
            FORGED IN THE AUSTRIAN ALPS
          </h1>
          <p className="text-sm text-[#8b94a5] max-w-2xl mt-2">
            Born out of motorsport purism. We design streetfighters that eradicate excessive mass, prioritize surgical agility, and unleash raw single-cylinder ferocity.
          </p>
        </div>

        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          
          <div className="lg:col-span-7 bg-[#15181e] border border-[#272e3b] rounded-xl overflow-hidden aspect-[16/10] relative group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA-9q4zvZZGo4To5Jx2v9xvH9j4xBHQm-PGQedQG-bmS_O3BhoThmBYPv3TH98vdZ_U54-SEkeD99oad7Mva3ElEcvmI9-cKZJ8WfhoaHsT5KxJDmTfE68P_Xhar6JTNPIkD9pE-SZE8wOr_vTO0ELoGSDj11AYkQBqYU30HBO6iNeP4HNk1JKALM-KlVH2nVU9CuBeFtb7O-jv1ph2kByK9YfwvC36icFXSA41__I18jdBo03hHi02Yl8cO4M08M_JA"
              alt="Kinetic Austrian Alpine Testing"
              className="w-full h-full object-cover filter contrast-105 saturate-110 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-mono text-[#ff5500] uppercase font-bold tracking-wider">
                DEVELOPMENT TRACK // HOCHATZ MOUNTAIN PASS
              </span>
              <h3 className="text-xl font-racing font-bold text-white mt-1">
                TESTED AT 50° LEAN ANGLES ON REAL TARMAC
              </h3>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <span className="hud-label uppercase tracking-widest text-[#ff5500]">
              THE APEX PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-3xl font-racing font-bold text-white">
              WEIGHT IS THE ENEMY OF FUN
            </h2>
            <p className="text-sm text-[#8b94a5] leading-relaxed">
              While other manufacturers chased bloated horsepower numbers on heavy, cumbersome chassis, Kinetic doubled down on the lost art of the lightweight single: maximum torque under 7,000 RPM, instant flickability between mountain switchbacks, and featherlight braking distances.
            </p>
            <p className="text-sm text-[#8b94a5] leading-relaxed">
              Every curve of the steel trellis frame is stressed and triangulated for torsional compliance when leaned over bumps at 120 km/h where rigid frames skip and lose grip.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => navigate('motorcycles')}
                className="px-6 py-3 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all shadow-glow-sm"
              >
                Explore Current Lineup
              </button>
              <button
                onClick={() => openTestRideModal()}
                className="px-5 py-3 border border-[#272e3b] hover:border-[#ff5500] text-white font-racing font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Experience the Difference
              </button>
            </div>
          </div>

        </div>

        {/* 4 Core Engineering Pillars Bento Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="hud-label uppercase tracking-widest text-[#ff5500] block mb-1">
              ENGINEERING MATRIX
            </span>
            <h2 className="text-3xl font-black font-racing text-white">
              THE FOUR PILLARS OF KINETIC PERFORMANCE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-[#15181e] border border-[#272e3b] p-8 rounded-xl relative group hover:border-[#ff5500]/60 transition-all">
              <div className="w-12 h-12 rounded bg-[#0d0f12] border border-[#272e3b] flex items-center justify-center text-[#ff5500] mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-[#ff5500] uppercase font-bold tracking-wider">
                PILLAR 01 // GEOMETRY
              </span>
              <h3 className="text-xl font-racing font-bold text-white mt-1 mb-2">
                Laser-Triangulated Steel Trellis
              </h3>
              <p className="text-sm text-[#8b94a5] leading-relaxed">
                Robotically TIG-welded from ultra-high tensile 25CrMo4 alloy. By using the engine as a stressed member, we eliminate heavy frame cradles while tuning lateral flex for unmatched feel at deep lean angles.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#15181e] border border-[#272e3b] p-8 rounded-xl relative group hover:border-[#ff5500]/60 transition-all">
              <div className="w-12 h-12 rounded bg-[#0d0f12] border border-[#272e3b] flex items-center justify-center text-[#ff5500] mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-[#ff5500] uppercase font-bold tracking-wider">
                PILLAR 02 // POWERTRAIN
              </span>
              <h3 className="text-xl font-racing font-bold text-white mt-1 mb-2">
                DLC-Coated Finger Follower DOHC
              </h3>
              <p className="text-sm text-[#8b94a5] leading-relaxed">
                Diamond-Like Carbon coatings with near-zero friction coefficient allow aggressive cam lobe profiles, facilitating high-lift 4-valve breathing without valve float up to 10,500 RPM.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#15181e] border border-[#272e3b] p-8 rounded-xl relative group hover:border-[#ff5500]/60 transition-all">
              <div className="w-12 h-12 rounded bg-[#0d0f12] border border-[#272e3b] flex items-center justify-center text-[#ff5500] mb-5">
                <Wind className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-[#ff5500] uppercase font-bold tracking-wider">
                PILLAR 03 // AERODYNAMICS
              </span>
              <h3 className="text-xl font-racing font-bold text-white mt-1 mb-2">
                Active Wind Tunnel Air Deflectors
              </h3>
              <p className="text-sm text-[#8b94a5] leading-relaxed">
                Developed inside the wind tunnel to divert radiator heat wash completely away from the rider's legs while generating targeted downforce on the front tire for high-speed switchback stability.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-[#15181e] border border-[#272e3b] p-8 rounded-xl relative group hover:border-[#ff5500]/60 transition-all">
              <div className="w-12 h-12 rounded bg-[#0d0f12] border border-[#272e3b] flex items-center justify-center text-[#ff5500] mb-5">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-[#ff5500] uppercase font-bold tracking-wider">
                PILLAR 04 // SENSORS
              </span>
              <h3 className="text-xl font-racing font-bold text-white mt-1 mb-2">
                6-Axis IMU & Supermoto Cornering ABS
              </h3>
              <p className="text-sm text-[#8b94a5] leading-relaxed">
                Measuring roll, pitch, and yaw 200 times per second, the Bosch 9.3 MP control unit modulates brake pressure dynamically to prevent high-sides without ever muting rider throttle intention.
              </p>
            </div>

          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="bg-[#15181e] border border-[#272e3b] rounded-xl p-8 mb-16">
          <div className="mb-8">
            <span className="hud-label uppercase tracking-widest text-[#ff5500]">
              EVOLUTION
            </span>
            <h3 className="text-2xl font-racing font-bold text-white">
              CHRONOLOGY OF INNOVATION
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
            <div className="border-l-2 border-[#ff5500] pl-4">
              <span className="text-[#ff5500] font-bold text-sm block mb-1">2018 // FOUNDING</span>
              <p className="text-slate-300">
                Kinetic Performance Lab founded in Mattighofen with a mandate to build the purest lightweight cornering machine.
              </p>
            </div>
            <div className="border-l-2 border-[#ff5500] pl-4">
              <span className="text-[#ff5500] font-bold text-sm block mb-1">2021 // MOTO3 TRANSFER</span>
              <p className="text-slate-300">
                WP APEX 43mm inverted fork geometry adapted directly from national championship podium race bikes.
              </p>
            </div>
            <div className="border-l-2 border-[#ff5500] pl-4">
              <span className="text-[#ff5500] font-bold text-sm block mb-1">2024 // 390R LAUNCH</span>
              <p className="text-slate-300">
                The APEX 390R breaks lightweight canyon records, boasting a 1:3.6 power-to-weight ratio and Supermoto ABS.
              </p>
            </div>
            <div className="border-l-2 border-[#ff5500] pl-4">
              <span className="text-[#ff5500] font-bold text-sm block mb-1">2026 // GP AERO WINGS</span>
              <p className="text-slate-300">
                Full carbon fiber aerodynamic winglets and next-gen CAN-bus telemetry roll out across the entire factory lineup.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
