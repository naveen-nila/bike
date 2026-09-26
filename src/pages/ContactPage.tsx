import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Send, 
  ShieldAlert, 
  Building 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [inquiryType, setInquiryType] = useState('general');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = `KNT-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticketId);
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="pt-28 pb-20 bg-[#0d0f12] min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#272e3b] pb-8 mb-12">
          <span className="hud-label uppercase tracking-widest text-[#ff5500] block mb-1">
            KINETIC FACTORY HEADQUARTERS // AUSTRIA
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-racing text-white tracking-tight">
            CONTACT THE PERFORMANCE LAB
          </h1>
          <p className="text-sm text-[#8b94a5] max-w-2xl mt-2">
            Get in touch directly with our engineering team, dealer network coordination, or track support desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct HQ Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#15181e] border border-[#272e3b] p-6 rounded-xl space-y-4">
              <span className="hud-label uppercase tracking-widest text-[#ff5500]">
                MATTIGHOFEN FACTORY & R&D
              </span>
              <h3 className="text-xl font-racing font-bold text-white">
                Kinetic Motorcycles GmbH
              </h3>

              <div className="space-y-4 text-xs font-mono text-slate-300 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-racing">Headquarters & Wind Tunnel Lab</strong>
                    <span>Stallhofner Straße 3, 5230 Mattighofen, Austria</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-racing">Direct Switchboard</strong>
                    <a href="tel:+4377426000" className="hover:text-[#ff5500]">+43 7742 6000</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-racing">Engineering Desk</strong>
                    <a href="mailto:lab@kinetic-apex.at" className="hover:text-[#ff5500]">lab@kinetic-apex.at</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-racing">Operating Hours (CET)</strong>
                    <span>Monday - Friday: 08:00 - 18:00 CET</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Roadside Assistance Alert Box */}
            <div className="bg-[#15181e] border border-[#ff5500]/40 p-6 rounded-xl space-y-3 shadow-glow-sm">
              <div className="flex items-center gap-2 text-[#ff5500]">
                <ShieldAlert className="w-5 h-5" />
                <span className="font-racing font-bold text-sm uppercase">24/7 Roadside Emergency</span>
              </div>
              <p className="text-xs text-[#8b94a5] leading-relaxed">
                For registered APEX owners in Europe and North America requiring flatbed recovery or on-track technical assistance:
              </p>
              <div className="p-3 bg-[#0d0f12] rounded border border-[#272e3b] font-mono text-sm text-white font-bold text-center">
                +43 800 546 3842 (Toll Free)
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#15181e] border border-[#272e3b] p-6 sm:p-8 rounded-xl shadow-xl">
            
            {submittedTicket ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#ff5500]/20 border border-[#ff5500] rounded-full flex items-center justify-center mx-auto text-[#ff5500]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-racing font-bold text-white">
                  TRANSMISSION RECEIVED
                </h3>
                <p className="text-xs text-[#8b94a5] max-w-md mx-auto">
                  Thank you, <strong>{fullName}</strong>. Your inquiry has been routed to the appropriate engineering or dealer relations specialist.
                </p>
                <div className="bg-[#0d0f12] border border-[#272e3b] p-4 rounded max-w-sm mx-auto font-mono text-xs">
                  <span className="text-[#8b94a5] block">LAB TICKET REFERENCE:</span>
                  <span className="text-base text-[#ff5500] font-bold">{submittedTicket}</span>
                </div>
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="px-6 py-2.5 bg-[#ff5500] text-black font-racing font-bold text-xs uppercase technical-cut"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-2">
                    Inquiry Department *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'general', label: 'General / Sales' },
                      { id: 'dealer', label: 'Dealership Application' },
                      { id: 'tech', label: 'Technical / Telemetry' },
                      { id: 'press', label: 'Press & Media' },
                      { id: 'racing', label: 'Track Support' }
                    ].map(dep => (
                      <button
                        key={dep.id}
                        type="button"
                        onClick={() => setInquiryType(dep.id)}
                        className={`p-2.5 rounded border text-xs font-racing uppercase transition-colors text-left ${
                          inquiryType === dep.id
                            ? 'border-[#ff5500] bg-[#1c212a] text-white font-bold'
                            : 'border-[#272e3b] bg-[#0d0f12] text-slate-400 hover:text-white'
                        }`}
                      >
                        {dep.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Markus Berger"
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
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="markus@example.com"
                      className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+43 664 123456"
                    className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-racing uppercase tracking-wider text-slate-300 mb-1">
                    Message / Technical Inquiry *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, motorcycle VIN, or requested dealership territory..."
                    className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#272e3b]">
                  <span className="text-[10px] font-mono text-[#8b94a5]">
                    AVERAGE LAB RESPONSE TIME: &lt; 24 HOURS
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all shadow-glow-sm hover:shadow-glow-orange flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Transmitting...' : 'Submit Message'}</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
