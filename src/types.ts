// Shared Type Declarations for Smart Tourism Geopark Ciletuh

export interface Destination {
  id: string;
  name: string;
  category: 'geosite' | 'waterfall' | 'beach' | 'hill' | 'culture' | 'village' | 'umkm' | 'culinary' | 'accommodation';
  categoryLabel: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  openingHours: string;
  ticketPrice: number;
  contactNumber: string;
  rating: number;
  reviewsCount: number;
  image: string;
  videoUrl?: string;
  facilities: string[];
  spots: string[];
  weatherRealtime: {
    temp: number;
    condition: string;
    humidity: number;
    crowdLevel: 'Low' | 'Medium' | 'High';
  };
  isFavorite?: boolean;
}

export interface Review {
  id: string;
  destinationId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface VirtualTourSpot {
  id: string;
  name: string;
  description: string;
  image360: string; // URL/Image ref
  audioGuideUrl?: string;
  droneVideoUrl?: string;
  hotspots: {
    id: string;
    x: number; // percentage from left (0-100)
    y: number; // percentage from top (0-100)
    title: string;
    description: string;
  }[];
}

export interface PlannerInput {
  destinations: string[]; // Destination IDs
  days: number; // 1, 2, 3, or more
  budgetLevel: 'backpacker' | 'moderate' | 'premium';
  participants: number;
  transportation: 'motorcycle' | 'car' | 'bus' | 'shuttle';
  travelType: 'family' | 'adventure' | 'education' | 'culture' | 'photography' | 'backpacker';
  accommodationType: 'hotel' | 'homestay' | 'villa' | 'camping';
}

export interface ItineraryDay {
  day: number;
  activities: {
    time: string;
    destinationId?: string;
    title: string;
    description: string;
    cost: number;
    category: string;
  }[];
}

export interface TripPlanResult {
  itinerary: ItineraryDay[];
  summaryCost: {
    ticketPriceTotal: number;
    accommodationTotal: number;
    consumptionTotal: number;
    transportationTotal: number; // fuel, rental, parking
    otherCosts: number;
    total: number;
    perPerson: number;
  };
  aiRecommendationText: string;
}

export interface BudgetPlannerInput {
  maxBudget: number;
  minBudget: number;
  days: number;
  participants: number;
}

export interface BudgetPlannerResult {
  isFeasible: boolean;
  totalCost: number;
  costPerPerson: number;
  breakdown: {
    tickets: number;
    hotel: number;
    consumption: number;
    fuel: number;
    parking: number;
    other: number;
  };
  simulations: {
    day: number;
    activities: string[];
    cost: number;
  }[];
  recommendedDestinations: string[]; // destination IDs
}

export interface Product {
  id: string;
  name: string;
  category: 'souvenir' | 'craft' | 'food' | 'fashion';
  price: number;
  description: string;
  image: string;
  seller: string;
  rating: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceId: string; // package ID, homestay ID, etc.
  serviceName: string;
  serviceType: 'accommodation' | 'tour' | 'transportation';
  date: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface EventFestival {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: 'culture' | 'adventure' | 'culinary' | 'institutional';
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface EducationMaterial {
  id: string;
  title: string;
  category: 'geology' | 'biodiversity' | 'culture' | 'conservation' | 'history';
  shortDesc: string;
  content: string;
  videoUrl?: string;
  quiz: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
}
