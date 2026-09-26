import React, { useState } from 'react';
import { MANUALS, SERVICE_SCHEDULE, ManualDoc } from '../data/manuals';
import { MOTORCYCLES } from '../data/motorcycles';
import { 
  FileText, 
  Download, 
  Wrench, 
  ShieldCheck, 
  Calendar, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  HelpCircle 
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const [activeManualFilter, setActiveManualFilter] = useState('All');
  const [selectedMileage, setSelectedMileage] = useState(1000);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  // Warranty Registration Form
  const [vinNumber, setVinNumber] = useState('');
  const [bikeModel, setBikeModel] = useState(MOTORCYCLES[0].id);
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('2025-06-15');
  const [warrantySubmitted, setWarrantySubmitted] = useState(false);
  const [warrantyCertId, setWarrantyCertId] = useState('');
  const [warrantyError, setWarrantyError] = useState('');

  const filteredManuals = MANUALS.filter(m => {
    if (activeManualFilter === 'All') return true;
    return m.type === activeManualFilter;
  });

  const handleDownload = (doc: ManualDoc) => {
    setDownloadNotification(doc.title);
    setTimeout(() => setDownloadNotification(null), 3000);
  };

  const handleWarrantySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vinNumber.trim() || vinNumber.trim().length < 11) {
      setWarrantyError('Please provide a valid 17-digit Chassis VIN number (e.g. VBKAPX390RA102948)');
      return;
    }
    if (!ownerName || !ownerEmail) {
      setWarrantyError('Owner name and valid email are mandatory.');
      return;
    }
    setWarrantyError('');
    const cert = `KNT-WAR-${Math.floor(100000 + Math.random() * 900000)}`;
    setWarrantyCertId(cert);
    setWarrantySubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#0d0f12] min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#272e3b] pb-8 mb-12">
          <span className="hud-label uppercase tracking-widest text-[#ff5500] block mb-1">
            OWNER SUPPORT & TECHNICAL DOCUMENTATION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-racing text-white tracking-tight">
            SERVICE & OWNER PORTAL
          </h1>
          <p className="text-sm text-[#8b94a5] max-w-2xl mt-2">
            Access factory workshop manuals, calculate recommended maintenance intervals, and register your official 2-year international factory warranty.
          </p>
        </div>

        {/* Section 1: Owner Manuals & Tech Docs Repository */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#272e3b] gap-4">
            <div>
              <span className="hud-label uppercase tracking-widest text-[#ff5500]">
                DOCUMENTATION ARCHIVE
              </span>
              <h2 className="text-2xl font-racing font-bold text-white">
                OWNER MANUALS & WORKSHOP GUIDES (PDF)
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {['All', 'Owner Manual', 'Suspension Tuning', 'Repair & Workshop', 'Wiring Telemetry'].map(type => (
                <button
                  key={type}
                  onClick={() => setActiveManualFilter(type)}
                  className={`px-3 py-1.5 rounded text-xs font-racing font-bold uppercase whitespace-nowrap transition-colors ${
                    activeManualFilter === type
                      ? 'bg-[#ff5500] text-black shadow-glow-sm'
                      : 'bg-[#15181e] text-slate-400 hover:text-white border border-[#272e3b]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {downloadNotification && (
            <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500 rounded text-xs font-mono text-emerald-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Downloaded file: <strong>{downloadNotification}</strong> (Encrypted PDF ready)</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredManuals.map(doc => (
              <div
                key={doc.id}
                className="bg-[#15181e] border border-[#272e3b] hover:border-[#ff5500]/60 p-6 rounded-xl flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#0d0f12] text-[10px] font-mono text-[#ff5500] border border-[#272e3b]">
                      {doc.type}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {doc.fileSize}
                    </span>
                  </div>
                  <h3 className="text-base font-racing font-bold text-white group-hover:text-[#ff5500] transition-colors mt-2">
                    {doc.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Applicable: {doc.model} ({doc.year})
                  </div>
                  <p className="text-xs text-[#8b94a5] leading-relaxed mt-3">
                    {doc.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#272e3b] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#8b94a5]">
                    FORMAT: PDF (VECTOR HIGH-RES)
                  </span>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="px-4 py-2 bg-[#1c212a] hover:bg-[#ff5500] hover:text-black text-white text-xs font-racing font-bold uppercase rounded flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Manual</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Maintenance Schedule & Service Calculator */}
        <div className="bg-[#15181e] border border-[#272e3b] rounded-xl p-6 sm:p-8 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#272e3b] gap-4">
            <div>
              <span className="hud-label uppercase tracking-widest text-[#ff5500]">
                FACTORY MAINTENANCE INTERVALS
              </span>
              <h2 className="text-2xl font-racing font-bold text-white">
                SERVICE SCHEDULE CALCULATOR
              </h2>
            </div>
            <span className="text-xs font-mono text-[#8b94a5]">
              STRICT FACTORY CERTIFICATION SPECS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Mileage Slider */}
            <div className="lg:col-span-5 space-y-4">
              <label className="block text-xs font-racing uppercase tracking-wider text-slate-300">
                Current Odometer: <strong className="text-xl font-racing font-bold text-[#ff5500] font-mono ml-2">{selectedMileage.toLocaleString()} KM</strong>
              </label>

              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={selectedMileage}
                onChange={e => setSelectedMileage(Number(e.target.value))}
                className="w-full accent-[#ff5500] h-2 bg-[#0d0f12] rounded border border-[#272e3b] cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-mono text-[#8b94a5]">
                <span>1,000 km (First Service)</span>
                <span>7,500 km</span>
                <span>15,000 km (Major)</span>
              </div>

              <div className="p-4 rounded-lg bg-[#0d0f12] border border-[#272e3b] text-xs text-slate-300 space-y-2">
                <span className="font-racing font-bold text-white block">Factory Oil Recommendation:</span>
                <p className="text-[#8b94a5]">
                  Motorex Power Synt 4T SAE 10W-50 (JASO MA2, API SN). Exact crankcase capacity: 1.7 Liters (with oil filter change).
                </p>
              </div>
            </div>

            {/* Applicable Service Tasks */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-racing uppercase tracking-wider text-slate-400 block">
                Required Inspection Checkpoints for this Mileage Tier:
              </span>

              {SERVICE_SCHEDULE.map((interval, idx) => {
                const isRelevant = selectedMileage <= interval.mileageKm + 2000;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedMileage <= interval.mileageKm && selectedMileage >= interval.mileageKm - 1000
                        ? 'bg-[#1c212a] border-[#ff5500] shadow-glow-sm'
                        : 'bg-[#0d0f12] border-[#272e3b]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-racing font-bold text-white">
                        {interval.name} ({interval.mileageKm.toLocaleString()} KM / {interval.months} Months)
                      </h4>
                      {selectedMileage <= interval.mileageKm && selectedMileage >= interval.mileageKm - 1000 && (
                        <span className="px-2 py-0.5 rounded bg-[#ff5500] text-black font-racing font-bold text-[10px]">
                          DUE NOW
                        </span>
                      )}
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {interval.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#ff5500] shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Section 3: Official Warranty Registration Form */}
        <div className="bg-[#15181e] border border-[#272e3b] rounded-xl p-6 sm:p-8">
          <div className="pb-6 mb-6 border-b border-[#272e3b]">
            <span className="hud-label uppercase tracking-widest text-[#ff5500]">
              2-YEAR INTERNATIONAL FACTORY WARRANTY
            </span>
            <h2 className="text-2xl font-racing font-bold text-white mt-1">
              CHASSIS VIN WARRANTY REGISTRATION
            </h2>
            <p className="text-xs text-[#8b94a5] mt-1">
              Register your newly acquired Kinetic streetfighter with the central Austria registry to activate emergency roadside assistance and factory recall alerts.
            </p>
          </div>

          {warrantySubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-[#ff5500]/20 border border-[#ff5500] rounded-full flex items-center justify-center mx-auto text-[#ff5500]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-racing font-bold text-white">
                WARRANTY ACTIVATION CONFIRMED
              </h3>
              <p className="text-xs text-[#8b94a5] max-w-md mx-auto">
                Chassis <strong>{vinNumber.toUpperCase()}</strong> has been enrolled in the 2-Year Full Factory Coverage program under <strong>{ownerName}</strong>.
              </p>
              <div className="bg-[#0d0f12] border border-[#272e3b] p-4 rounded max-w-sm mx-auto font-mono text-xs">
                <span className="text-[#8b94a5] block">DIGITAL WARRANTY PASS ID:</span>
                <span className="text-lg text-[#ff5500] font-bold">{warrantyCertId}</span>
              </div>
              <button
                onClick={() => setWarrantySubmitted(false)}
                className="px-6 py-2.5 bg-[#272e3b] hover:bg-[#ff5500] hover:text-black text-white font-racing font-bold text-xs uppercase rounded transition-colors"
              >
                Register Another Vehicle
              </button>
            </div>
          ) : (
            <form onSubmit={handleWarrantySubmit} className="space-y-4 max-w-3xl">
              {warrantyError && (
                <div className="p-3 bg-red-500/20 border border-red-500 rounded text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{warrantyError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                    Chassis VIN Number (17 Characters) *
                  </label>
                  <input
                    type="text"
                    required
                    value={vinNumber}
                    onChange={e => setVinNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. VBKAPX390RA102948"
                    className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2.5 text-xs text-white font-mono uppercase focus:border-[#ff5500] focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 font-mono">Found on headstock steering neck</span>
                </div>

                <div>
                  <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                    Motorcycle Model *
                  </label>
                  <select
                    value={bikeModel}
                    onChange={e => setBikeModel(e.target.value)}
                    className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                  >
                    {MOTORCYCLES.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                    Owner Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    placeholder="e.g. Lukas Weber"
                    className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={ownerEmail}
                    onChange={e => setOwnerEmail(e.target.value)}
                    placeholder="lukas@example.at"
                    className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                    Delivery / Handover Date
                  </label>
                  <input
                    type="date"
                    value={purchaseDate}
                    onChange={e => setPurchaseDate(e.target.value)}
                    className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#8b94a5]">
                  ENCRYPTED TRANSMISSION // MATTIGHOFEN REGISTRY
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all shadow-glow-sm"
                >
                  Activate 2-Year Warranty
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
