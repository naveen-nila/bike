import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOTORCYCLES } from '../../data/motorcycles';
import { DEALERS } from '../../data/dealers';
import { X, Calendar, Clock, MapPin, CheckCircle, Shield, AlertTriangle } from 'lucide-react';

export const TestRideModal: React.FC = () => {
  const { isTestRideModalOpen, closeTestRideModal, selectedBikeId, bookTestRide } = useApp();

  const [bikeId, setBikeId] = useState(selectedBikeId || 'apex-390r');
  const [dealerId, setDealerId] = useState(DEALERS[0].id);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('10:30 AM');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'expert' | 'track-racer'>('intermediate');
  const [hasValidLicense, setHasValidLicense] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (!isTestRideModalOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Valid email is required';
    if (!phone.trim() || phone.length < 7) newErrors.phone = 'Valid phone number is required';
    if (!hasValidLicense) newErrors.hasValidLicense = 'Valid motorcycle license confirmation is mandatory';
    if (!date) newErrors.date = 'Please select a test ride date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const booking = await bookTestRide({
        fullName,
        email,
        phone,
        motorcycleId: bikeId,
        dealerId,
        date,
        timeSlot,
        ridingExperience: experience,
        hasValidLicense
      });
      setConfirmedBookingId(booking.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setConfirmedBookingId(null);
    closeTestRideModal();
  };

  const selectedBikeObj = MOTORCYCLES.find(m => m.id === bikeId) || MOTORCYCLES[0];
  const selectedDealerObj = DEALERS.find(d => d.id === dealerId) || DEALERS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#15181e] border border-[#272e3b] rounded-xl shadow-2xl p-6 md:p-8 my-8 text-slate-200">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded hover:bg-[#1c212a] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBookingId ? (
          /* Confirmation State */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#ff5500]/20 border border-[#ff5500] rounded-full flex items-center justify-center mx-auto mb-4 text-[#ff5500]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="hud-label uppercase tracking-widest text-[#ff5500]">
              TEST RIDE RESERVATION CONFIRMED
            </span>
            <h3 className="text-2xl md:text-3xl font-black font-racing text-white mt-1">
              READY FOR THE ASPHALT
            </h3>

            <p className="text-sm text-[#8b94a5] max-w-md mx-auto mt-2">
              Your session on the <strong className="text-white">{selectedBikeObj.name}</strong> has been secured with priority telemetry logging.
            </p>

            <div className="bg-[#0d0f12] border border-[#272e3b] p-5 rounded-lg max-w-md mx-auto my-6 text-left font-mono text-xs space-y-2.5">
              <div className="flex justify-between border-b border-[#272e3b] pb-2">
                <span className="text-[#8b94a5]">BOOKING REF:</span>
                <span className="text-[#ff5500] font-bold">{confirmedBookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b94a5]">MACHINE:</span>
                <span className="text-white">{selectedBikeObj.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b94a5]">LOCATION:</span>
                <span className="text-white">{selectedDealerObj.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b94a5]">SCHEDULE:</span>
                <span className="text-white">{date} @ {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b94a5]">RIDER:</span>
                <span className="text-white">{fullName}</span>
              </div>
            </div>

            <div className="bg-[#1c212a] border border-[#272e3b] p-4 rounded text-left text-xs max-w-md mx-auto mb-6 text-slate-300 flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#ff5500] shrink-0 mt-0.5" />
              <div>
                <span className="font-racing font-bold text-white block">Mandatory Gear Requirement</span>
                <span>Please arrive 15 minutes before your slot with an ECE/DOT approved full-face helmet, armored riding jacket, gloves, and over-the-ankle boots.</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-8 py-3 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all"
            >
              Done & Return
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="mb-6">
              <span className="hud-label inline-block mb-1">
                KINETIC DEMO FLEET // 2025/2026
              </span>
              <h3 className="text-2xl md:text-3xl font-black font-racing text-white">
                BOOK YOUR TEST RIDE
              </h3>
              <p className="text-xs text-[#8b94a5] mt-1">
                Experience the surgical agility and explosive single/twin cylinder punch on open road or designated test track.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Bike Selection */}
              <div>
                <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1.5">
                  Select Machine
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {MOTORCYCLES.map(bike => (
                    <button
                      key={bike.id}
                      type="button"
                      onClick={() => setBikeId(bike.id)}
                      className={`p-2.5 rounded border text-left transition-all ${
                        bikeId === bike.id
                          ? 'border-[#ff5500] bg-[#1c212a] text-white shadow-glow-sm'
                          : 'border-[#272e3b] bg-[#0d0f12] text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-[#ff5500] font-bold">{bike.badge}</div>
                      <div className="text-xs font-racing font-bold truncate">{bike.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{bike.power}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                    <MapPin className="w-3.5 h-3.5 inline mr-1 text-[#ff5500]" />
                    Dealer / Test Track
                  </label>
                  <select
                    value={dealerId}
                    onChange={e => setDealerId(e.target.value)}
                    className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                  >
                    {DEALERS.map(dealer => (
                      <option key={dealer.id} value={dealer.id}>
                        {dealer.name} ({dealer.city}, {dealer.country})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                      <Calendar className="w-3 h-3 inline mr-1 text-[#ff5500]" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                    />
                    {errors.date && <p className="text-[10px] text-red-500 mt-0.5">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                      <Clock className="w-3 h-3 inline mr-1 text-[#ff5500]" />
                      Time Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={e => setTimeSlot(e.target.value)}
                      className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                    >
                      <option value="10:00 AM">10:00 AM (Morning)</option>
                      <option value="11:30 AM">11:30 AM (Morning)</option>
                      <option value="02:00 PM">02:00 PM (Afternoon)</option>
                      <option value="03:30 PM">03:30 PM (Afternoon)</option>
                      <option value="05:00 PM">05:00 PM (Twilight)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Rider Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Alex Steiner"
                    className={`w-full bg-[#0d0f12] border ${errors.fullName ? 'border-red-500' : 'border-[#272e3b]'} rounded p-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none`}
                  />
                  {errors.fullName && <p className="text-[10px] text-red-500 mt-0.5">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className={`w-full bg-[#0d0f12] border ${errors.email ? 'border-red-500' : 'border-[#272e3b]'} rounded p-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none`}
                  />
                  {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+43 664 123456"
                    className={`w-full bg-[#0d0f12] border ${errors.phone ? 'border-red-500' : 'border-[#272e3b]'} rounded p-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none`}
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              {/* Rider Experience & License */}
              <div className="pt-2">
                <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1.5">
                  Riding Experience Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'beginner', label: 'A1 / Novice (1-2 yrs)' },
                    { id: 'intermediate', label: 'Street Regular (3-5 yrs)' },
                    { id: 'expert', label: 'Veteran Street (5+ yrs)' },
                    { id: 'track-racer', label: 'Track / Club Racer' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setExperience(opt.id as any)}
                      className={`p-2 rounded border text-xs text-left transition-all ${
                        experience === opt.id
                          ? 'border-[#ff5500] bg-[#1c212a] text-white'
                          : 'border-[#272e3b] bg-[#0d0f12] text-slate-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* License Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasValidLicense}
                    onChange={e => setHasValidLicense(e.target.checked)}
                    className="mt-1 rounded bg-[#0d0f12] border-[#272e3b] text-[#ff5500] focus:ring-[#ff5500]"
                  />
                  <span className="text-xs text-slate-300">
                    I hold a valid motorcycle operator license (A or A2 class) and agree to bring government-issued photo ID to the dealer.
                  </span>
                </label>
                {errors.hasValidLicense && (
                  <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {errors.hasValidLicense}
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex items-center justify-between border-t border-[#272e3b]">
                <div className="text-[10px] font-mono text-[#8b94a5]">
                  NO CHARGE // DEALER FACTORY SUPPORTED
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all shadow-glow-sm hover:shadow-glow-orange flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Securing Slot...</span>
                  ) : (
                    <span>Confirm Test Ride Slot</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};
