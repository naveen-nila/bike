import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, Plus, Minus, Check, ArrowRight, Shield } from 'lucide-react';
import { DEALERS } from '../../data/dealers';

export const CartDrawer: React.FC = () => {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cartItems, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    cartTotal,
    navigate 
  } = useApp();

  const [dealerId, setDealerId] = useState(DEALERS[0].id);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerName) return;

    const ref = `PP-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setQuoteReference(ref);
    setOrderSubmitted(true);
    clearCart();
  };

  const handleClose = () => {
    setOrderSubmitted(false);
    setIsCartDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#15181e] border-l border-[#272e3b] shadow-2xl flex flex-col text-slate-200">
          
          {/* Header */}
          <div className="p-6 bg-[#0d0f12] border-b border-[#272e3b] flex items-center justify-between">
            <div>
              <span className="hud-label uppercase tracking-widest text-[#ff5500]">
                FACTORY POWERPARTS
              </span>
              <h3 className="text-xl font-racing font-bold text-white mt-0.5">
                PERFORMANCE BUILD CART
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-slate-400 hover:text-white rounded hover:bg-[#1c212a]"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-[#ff5500]/20 border border-[#ff5500] rounded-full flex items-center justify-center mx-auto text-[#ff5500]">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-racing font-bold text-white">
                  POWERPARTS RESERVATION TRANSMITTED
                </h4>
                <p className="text-xs text-[#8b94a5] leading-relaxed">
                  Your parts order has been routed to the certified dealer parts depot. An invoice and pickup schedule has been sent to <strong>{customerEmail}</strong>.
                </p>
                <div className="bg-[#0d0f12] border border-[#272e3b] p-3 rounded font-mono text-xs text-left">
                  <div className="flex justify-between">
                    <span className="text-[#8b94a5]">ORDER REF:</span>
                    <span className="text-[#ff5500] font-bold">{quoteReference}</span>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-full py-3 bg-[#ff5500] text-black font-racing font-bold text-xs uppercase technical-cut"
                >
                  Return to Store
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1c212a] border border-[#272e3b] flex items-center justify-center mx-auto text-slate-500">
                  <Shield className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-racing font-bold text-slate-300">
                  BUILD CART IS CURRENTLY EMPTY
                </h4>
                <p className="text-xs text-[#8b94a5] max-w-xs mx-auto">
                  Upgrade your APEX with race-engineered Akrapovič exhausts, CNC rearsets, wave rotors, or carbon fiber components.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('powerparts');
                  }}
                  className="px-6 py-2.5 bg-[#ff5500] text-black font-racing font-bold text-xs uppercase technical-cut"
                >
                  Browse PowerParts Catalog
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div
                      key={item.part.id}
                      className="bg-[#0d0f12] border border-[#272e3b] p-3.5 rounded-lg flex gap-3 items-center"
                    >
                      <div className="w-16 h-16 bg-[#1c212a] rounded overflow-hidden shrink-0 border border-[#272e3b] flex items-center justify-center">
                        <img
                          src={item.part.image}
                          alt={item.part.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-mono text-[#ff5500]">
                          {item.part.partNumber}
                        </div>
                        <h4 className="text-xs font-racing font-bold text-white truncate">
                          {item.part.name}
                        </h4>
                        <div className="text-xs font-mono text-slate-300 font-bold mt-0.5">
                          €{item.part.price}
                        </div>

                        {/* Quantity and Delete */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#272e3b] rounded bg-[#15181e]">
                            <button
                              onClick={() => updateCartQuantity(item.part.id, item.quantity - 1)}
                              className="p-1 hover:text-[#ff5500] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.part.id, item.quantity + 1)}
                              className="p-1 hover:text-[#ff5500] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.part.id)}
                            className="text-slate-500 hover:text-red-400 p-1"
                            title="Remove part"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Dealer Parts Order Form */}
                <form onSubmit={handleQuoteSubmit} className="pt-4 border-t border-[#272e3b] space-y-3">
                  <div className="flex justify-between items-center text-sm font-racing font-bold text-white pb-2 border-b border-[#272e3b]">
                    <span>TOTAL BUILD INVESTMENT</span>
                    <span className="text-[#ff5500] font-mono text-base">€{cartTotal.toLocaleString()}</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-racing uppercase tracking-wider text-slate-400 mb-1">
                      Deliver to Authorized Dealer
                    </label>
                    <select
                      value={dealerId}
                      onChange={e => setDealerId(e.target.value)}
                      className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                    >
                      {DEALERS.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        value={customerEmail}
                        onChange={e => setCustomerEmail(e.target.value)}
                        className="w-full bg-[#0d0f12] border border-[#272e3b] rounded p-2 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#ff5500] hover:bg-[#ff6a1a] text-black font-racing font-bold text-xs uppercase tracking-wider technical-cut transition-all shadow-glow-sm flex items-center justify-center gap-2"
                  >
                    <span>Request Dealer Order & Fitting</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-[10px] text-slate-500 text-center font-mono">
                    2-YEAR FACTORY PARTS WARRANTY // DIRECT FIT GUARANTEE
                  </div>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
