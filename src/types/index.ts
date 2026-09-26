export type PageRoute = 
  | 'home'
  | 'motorcycles'
  | 'motorcycle-detail'
  | 'powerparts'
  | 'configurator'
  | 'telemetry'
  | 'dealers'
  | 'about'
  | 'support'
  | 'contact';

export interface Motorcycle {
  id: string;
  name: string;
  badge: string;
  subTitle: string;
  tagline: string;
  price: number;
  currency: string;
  displacement: string;
  power: string;
  torque: string;
  dryWeight: string;
  zeroToHundred: string;
  topSpeed: string;
  seatHeight: string;
  fuelCapacity: string;
  category: 'Lightweight' | 'Streetfighter' | 'GP Edition' | 'Super Naked';
  image: string;
  gallery: string[];
  description: string;
  soundRpmLimit: number;
  features: {
    title: string;
    description: string;
    iconType: string;
  }[];
  specs: {
    category: string;
    items: { label: string; value: string }[];
  }[];
  dynoData: {
    rpm: number;
    powerHp: number;
    torqueNm: number;
  }[];
  colors: {
    name: string;
    hex: string;
    secondaryHex: string;
  }[];
}

export interface PowerPart {
  id: string;
  name: string;
  category: 'Exhausts' | 'Chassis & Protection' | 'Brakes & Wheels' | 'Ergonomics & Controls' | 'Carbon & Aero';
  partNumber: string;
  price: number;
  rating: number;
  reviewsCount: number;
  compatibleModels: string[];
  inStock: boolean;
  weightDeltaKg?: number;
  powerDeltaHp?: number;
  description: string;
  features: string[];
  image: string;
}

export interface Dealer {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  zip: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
  rating: number;
  services: ('Track Day Prep' | 'Dyno Tuning' | 'Official Showroom' | 'WP Pro Center')[];
  testRidesAvailable: string[];
}

export interface TestRideBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  motorcycleId: string;
  dealerId: string;
  date: string;
  timeSlot: string;
  ridingExperience: 'beginner' | 'intermediate' | 'expert' | 'track-racer';
  hasValidLicense: boolean;
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface SavedConfiguration {
  id: string;
  motorcycleId: string;
  colorName: string;
  wheelOption: string;
  exhaustOption: string;
  selectedPacks: string[];
  customAccessories: string[];
  totalPrice: number;
  createdAt: string;
}

export interface CartItem {
  part: PowerPart;
  quantity: number;
  selectedBikeModel?: string;
}
