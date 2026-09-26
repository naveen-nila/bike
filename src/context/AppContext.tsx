import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageRoute, Motorcycle, PowerPart, CartItem, TestRideBooking, SavedConfiguration } from '../types';
import { MOTORCYCLES } from '../data/motorcycles';

interface AppContextType {
  currentRoute: PageRoute;
  selectedBikeId: string;
  selectedBike: Motorcycle;
  navigate: (route: PageRoute, bikeId?: string, targetSection?: string) => void;
  isTestRideModalOpen: boolean;
  openTestRideModal: (preselectBikeId?: string) => void;
  closeTestRideModal: () => void;
  isVideoModalOpen: boolean;
  openVideoModal: () => void;
  closeVideoModal: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  cartItems: CartItem[];
  addToCart: (part: PowerPart, quantity?: number, selectedBikeModel?: string) => void;
  removeFromCart: (partId: string) => void;
  updateCartQuantity: (partId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  savedConfigurations: SavedConfiguration[];
  saveConfiguration: (config: Omit<SavedConfiguration, 'id' | 'createdAt'>) => string;
  testRideBookings: TestRideBooking[];
  bookTestRide: (booking: Omit<TestRideBooking, 'id' | 'createdAt' | 'status'>) => Promise<TestRideBooking>;
  activeRidingMode: 'TRACK' | 'STREET' | 'RAIN';
  setActiveRidingMode: (mode: 'TRACK' | 'STREET' | 'RAIN') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedBikeId, setSelectedBikeId] = useState<string>('apex-390r');
  const [isTestRideModalOpen, setIsTestRideModalOpen] = useState(false);
  const [testRideInitialBike, setTestRideInitialBike] = useState<string>('apex-390r');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeRidingMode, setActiveRidingMode] = useState<'TRACK' | 'STREET' | 'RAIN'>('TRACK');

  // Local storage state for Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('kinetic_apex_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Local storage for Saved Configurations
  const [savedConfigurations, setSavedConfigurations] = useState<SavedConfiguration[]>(() => {
    try {
      const stored = localStorage.getItem('kinetic_apex_configs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Local storage for Booked Test Rides
  const [testRideBookings, setTestRideBookings] = useState<TestRideBooking[]>(() => {
    try {
      const stored = localStorage.getItem('kinetic_apex_test_rides');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('kinetic_apex_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Handle URL hash or path state on load
  useEffect(() => {
    const parseUrl = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      if (hash.startsWith('motorcycles/')) {
        const id = hash.split('/')[1];
        if (MOTORCYCLES.some(b => b.id === id)) {
          setSelectedBikeId(id);
          setCurrentRoute('motorcycle-detail');
          return;
        }
      }

      const validRoutes: PageRoute[] = [
        'home',
        'motorcycles',
        'motorcycle-detail',
        'powerparts',
        'configurator',
        'telemetry',
        'dealers',
        'about',
        'support',
        'contact'
      ];

      if (validRoutes.includes(hash as PageRoute)) {
        setCurrentRoute(hash as PageRoute);
      } else if (['overview', 'power', 'action', 'specs', 'book-ride'].includes(hash)) {
        setCurrentRoute('home');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    parseUrl();
    window.addEventListener('hashchange', parseUrl);
    return () => window.removeEventListener('hashchange', parseUrl);
  }, []);

  const navigate = (route: PageRoute, bikeId?: string, targetSection?: string) => {
    if (bikeId) {
      setSelectedBikeId(bikeId);
    }
    setCurrentRoute(route);

    if (route === 'motorcycle-detail') {
      window.location.hash = `motorcycles/${bikeId || selectedBikeId}`;
    } else if (targetSection) {
      window.location.hash = targetSection;
    } else {
      window.location.hash = route === 'home' ? '' : route;
    }

    if (targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const selectedBike = MOTORCYCLES.find(b => b.id === selectedBikeId) || MOTORCYCLES[0];

  const openTestRideModal = (preselectBikeId?: string) => {
    if (preselectBikeId) {
      setTestRideInitialBike(preselectBikeId);
      setSelectedBikeId(preselectBikeId);
    }
    setIsTestRideModalOpen(true);
  };

  const closeTestRideModal = () => {
    setIsTestRideModalOpen(false);
  };

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const addToCart = (part: PowerPart, quantity = 1, selectedBikeModel?: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.part.id === part.id);
      if (existing) {
        return prev.map(item =>
          item.part.id === part.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { part, quantity, selectedBikeModel: selectedBikeModel || selectedBikeId }];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (partId: string) => {
    setCartItems(prev => prev.filter(item => item.part.id !== partId));
  };

  const updateCartQuantity = (partId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(partId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.part.id === partId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.part.price * item.quantity, 0);

  const saveConfiguration = (config: Omit<SavedConfiguration, 'id' | 'createdAt'>): string => {
    const id = `APX-CFG-${Math.floor(100000 + Math.random() * 900000)}`;
    const newConfig: SavedConfiguration = {
      ...config,
      id,
      createdAt: new Date().toISOString()
    };
    const updated = [newConfig, ...savedConfigurations];
    setSavedConfigurations(updated);
    try {
      localStorage.setItem('kinetic_apex_configs', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return id;
  };

  const bookTestRide = async (
    booking: Omit<TestRideBooking, 'id' | 'createdAt' | 'status'>
  ): Promise<TestRideBooking> => {
    // Simulate brief network latency for realistic feedback
    await new Promise(resolve => setTimeout(resolve, 600));
    const id = `TR-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: TestRideBooking = {
      ...booking,
      id,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    const updated = [newBooking, ...testRideBookings];
    setTestRideBookings(updated);
    try {
      localStorage.setItem('kinetic_apex_test_rides', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return newBooking;
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        selectedBikeId,
        selectedBike,
        navigate,
        isTestRideModalOpen,
        openTestRideModal,
        closeTestRideModal,
        isVideoModalOpen,
        openVideoModal,
        closeVideoModal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isSearchOpen,
        setIsSearchOpen,
        savedConfigurations,
        saveConfiguration,
        testRideBookings,
        bookTestRide,
        activeRidingMode,
        setActiveRidingMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
