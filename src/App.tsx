import React, { useState, useMemo } from 'react';
import { 
  Compass, Map, Camera, Calendar, Landmark, ShoppingBag, BookOpen, 
  MessageSquare, BarChart3, Sun, Heart, CheckCircle, Clock, ShieldCheck,
  Tag, Phone, Users, Star, Sparkles, Navigation, X, Menu, Ticket
} from 'lucide-react';

// Data and types imports
import { 
  initialDestinations, 
  initialReviews, 
  initialEvents, 
  initialEducationMaterials, 
  initialProducts 
} from './data';
import { Destination, Booking, Review } from './types';

// Component imports
import ExploreWisata from './components/ExploreWisata';
import PetaInteraktif from './components/PetaInteraktif';
import VirtualTour from './components/VirtualTour';
import SmartTripPlanner from './components/SmartTripPlanner';
import SmartBudgeting from './components/SmartBudgeting';
import MarketplaceUMKM from './components/MarketplaceUMKM';
import EdukasiQuiz from './components/EdukasiQuiz';
import AITourGuide from './components/AITourGuide';
import AdminAnalytics from './components/AdminAnalytics';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [favorites, setFavorites] = useState<string[]>(['puncak-darma', 'curug-cimarinjung']);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BK-7312",
      customerName: "Sobat Traveler",
      email: "traveler@ciletuhsmart.id",
      phone: "+62 812-7492-9111",
      serviceId: "lodge-1",
      serviceName: "Ciletuh Hills Eco-Lodge",
      serviceType: "accommodation",
      date: "2026-06-15",
      totalPrice: 1100000,
      status: "confirmed"
    }
  ]);

  const [floatingChatOpen, setFloatingChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stats Counters
  const stats = useMemo(() => {
    return {
      destinations: initialDestinations.length,
      geosites: initialDestinations.filter(d => d.category === 'geosite').length,
      waterfalls: initialDestinations.filter(d => d.category === 'waterfall').length,
      beaches: initialDestinations.filter(d => d.category === 'beach').length,
      hotels: 8, // simulated Homestays/Hotels 
      packages: 5,
    };
  }, []);

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fId => fId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleAddBooking = (newBk: any) => {
    const bookingItem: Booking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: newBk.name || "Sobat Traveler",
      email: newBk.email || "guest@ciletuhsmart.id",
      phone: newBk.phone || "+62 812-0000-1111",
      serviceId: newBk.serviceId,
      serviceName: newBk.serviceName,
      serviceType: newBk.serviceType,
      date: newBk.date,
      totalPrice: newBk.totalPrice,
      status: 'confirmed',
    };
    setBookings([bookingItem, ...bookings]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none" id="app-root">
      
      {/* 1. GLASSMORPHISM HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between" id="navbar">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-slate-600 hover:text-slate-800 p-1 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-450 flex items-center justify-center text-white text-base font-extrabold font-heading shadow-md shadow-sky-100">
              C
            </div>
            <div>
              <h1 className="font-heading font-black text-slate-850 tracking-wider text-xs md:text-sm uppercase leading-none">
                Geopark Ciletuh
              </h1>
              <span className="text-[9px] text-slate-405 font-medium leading-none block mt-0.5">UNESCO Global Geopark SuperApp</span>
            </div>
          </div>
        </div>

        {/* Central Weather Quick Info */}
        <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-605">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100/60 px-3 py-1.5 rounded-full">
            <Sun className="w-4 h-4 text-orange-400 animate-spin-slow" />
            <span>Suhu Ciletuh: <strong className="text-slate-800">28°C</strong> (Cerah Berawan)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100/60 px-3 py-1.5 rounded-full">
            <Compass className="w-4 h-4 text-emerald-500" />
            <span>Zona Kepadatan: <strong className="text-emerald-600">Aman</strong></span>
          </div>
        </div>

        {/* Action Widgets Favorites */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 text-xs text-rose-600 font-bold bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Suka : {favorites.length}</span>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER PANEL */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        
        {/* SIDEBAR FOR DESKTOP */}
        <aside className={`w-64 bg-white border-r border-slate-100 p-4 shrink-0 flex flex-col justify-between hidden md:flex`} id="desktop-sidebar">
          <div className="space-y-6">
            
            {/* Navigation Tabs Menu */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block px-2.5 mb-2">Smart Menu</span>
              
              {[
                { id: 'explore', label: 'Jelajah Wisata', sub: 'Interactive grid catalog', icon: <Compass className="w-4.5 h-4.5" /> },
                { id: 'map', label: 'Peta Satelit GIS', sub: 'Interactive path map', icon: <Map className="w-4.5 h-4.5" /> },
                { id: 'virtual', label: 'Virtual 360° VR', sub: 'Camera drone & guide', icon: <Camera className="w-4.5 h-4.5" /> },
                { id: 'planner', label: 'Smart Trip Planner', sub: 'AI Schedule architect', icon: <Calendar className="w-4.5 h-4.5 text-indigo-500" /> },
                { id: 'budget', label: 'Kalkulator Anggaran', sub: 'Interactive budgeter', icon: <Landmark className="w-4.5 h-4.5 text-emerald-500" /> },
                { id: 'marketplace', label: 'Pasar UMKM Kriya', sub: 'Souvenirs & local food', icon: <ShoppingBag className="w-4.5 h-4.5 text-orange-505" /> },
                { id: 'education', label: 'Edukasi & Kuis', sub: 'Acquire digital certificates', icon: <BookOpen className="w-4.5 h-4.5" /> },
                { id: 'chat', label: 'Tanya Aki (Chat Live)', sub: 'Smart AI Tour Guide', icon: <MessageSquare className="w-4.5 h-4.5 text-sky-505" /> },
                { id: 'analytics', label: 'Sistem Analitik', sub: 'Tableau-style stats hub', icon: <BarChart3 className="w-4.5 h-4.5 text-rose-500" /> },
              ].map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${
                      isActive 
                        ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-100/50 scale-102' 
                        : 'text-slate-550 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                    id={`sidebar_btn_${item.id}`}
                  >
                    <div className={isActive ? 'text-white' : 'text-slate-400'}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs block leading-none">{item.label}</span>
                      <span className={`text-[8px] leading-none block truncate mt-0.5 ${isActive ? 'text-sky-10' : 'text-slate-400'}`}>
                        {item.sub}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Promo Banner */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center space-y-2">
              <span className="text-[9px] bg-sky-100 text-sky-655 font-bold px-2 py-0.5 rounded uppercase">PROMO SEKARANG</span>
              <h5 className="text-xs font-extrabold text-slate-800 leading-tight">Paket Jelajah 2D1N</h5>
              <p className="text-[10px] text-slate-500 leading-normal">Mulai Rp 550.000 / orang bebas biaya pemandu & makan.</p>
              <button 
                onClick={() => {
                  setActiveTab('explore');
                  alert('Silakan pilih Homestay atau Paket Tour Curug di bagian grid bawah ini untuk memesan!');
                }}
                className="w-full py-1.5 bg-sky-500 hover:bg-sky-600 text-white font-ui font-extrabold rounded-lg text-[10px] shadow"
              >
                Pilih & Pesan
              </button>
            </div>

          </div>

          <div className="text-[9px] text-slate-400 border-t border-slate-100 pt-3">
            <span>© 2026 Geopark Ciletuh Digital.</span>
            <span className="block italic mt-0.5">Sustain UNESCO Global Geopark.</span>
          </div>
        </aside>

        {/* MOBILE MENU NAVIGATION DROPDOWN */}
        {mobileMenuOpen && (
          <div className="absolute inset-x-0 top-0 bg-white border-b border-slate-100 z-50 p-4 shadow-xl space-y-2 flex flex-col md:hidden animate-fade-in block max-h-[480px] overflow-y-auto">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pl-2 block mb-1">Pilih Portal</span>
            {[
              { id: 'explore', label: 'Jelajah Wisata', sub: 'Interactive grid catalog', icon: <Compass className="w-4.5 h-4.5" /> },
              { id: 'map', label: 'Peta Satelit GIS', sub: 'Interactive path map', icon: <Map className="w-4.5 h-4.5" /> },
              { id: 'virtual', label: 'Virtual 360° VR', sub: 'Camera drone & guide', icon: <Camera className="w-4.5 h-4.5" /> },
              { id: 'planner', label: 'Smart Trip Planner', sub: 'AI Schedule architect', icon: <Calendar className="w-4.5 h-4.5 text-indigo-500" /> },
              { id: 'budget', label: 'Kalkulator Anggaran', sub: 'Interactive budgeter', icon: <Landmark className="w-4.5 h-4.5 text-emerald-500" /> },
              { id: 'marketplace', label: 'Pasar UMKM Kriya', sub: 'Souvenirs & local food', icon: <ShoppingBag className="w-4.5 h-4.5 text-orange-505" /> },
              { id: 'education', label: 'Edukasi & Kuis', sub: 'Acquire digital certificates', icon: <BookOpen className="w-4.5 h-4.5" /> },
              { id: 'chat', label: 'Tanya Aki (Chat Live)', sub: 'Smart AI Tour Guide', icon: <MessageSquare className="w-4.5 h-4.5 text-sky-550" /> },
              { id: 'analytics', label: 'Sistem Analitik', sub: 'Tableau-style stats hub', icon: <BarChart3 className="w-4.5 h-4.5 text-rose-500" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 p-2.5 rounded-xl text-left ${
                  activeTab === item.id ? 'bg-sky-50 text-sky-655 font-bold' : 'text-slate-600'
                }`}
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* ACTIVE MAIN RENDERING BODY AREA */}
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* GENERAL WIDGET BOARD HEADER */}
          <div className="bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 text-white border border-slate-850 relative overflow-hidden shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6" id="welcome-widgets-board">
            
            {/* Atmospheric particles */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-550/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-505/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-2 max-w-xl">
              <span className="text-[9px] bg-emerald-500 text-white font-ui font-extrabold uppercase tracking-widest px-2.5 py-1 rounded inline-flex items-center gap-1 leading-none">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                UNESCO Global Geopark
              </span>
              <h2 className="text-xl md:text-2xl font-heading font-black tracking-wide leading-tight uppercase font-heading">
                Selamat Datang di Ciletuh Pelabuhanratu!
              </h2>
              <p className="text-slate-350 text-xs leading-relaxed font-sans">
                Nikmati perpaduan tebing patahan tapal kuda purba berumur 60 juta tahun, deburan ombak selat samudera, kearifan adat Seren Taun, serta kriya bubur sereal hanjeli yang diatur secara pintar berbasis sistem AI cerdas.
              </p>
            </div>

            {/* Quick Counters panel inside Hero widget card */}
            <div className="grid grid-cols-3 gap-2.5 bg-slate-950/85 border border-slate-850 p-4 rounded-2xl shrink-0 text-center select-none font-sans min-w-[280px]">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Destinasi</span>
                <span className="text-sm font-heading font-extrabold text-white block">{stats.destinations} Spot</span>
              </div>
              <div className="border-l border-slate-850">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Situs Purba</span>
                <span className="text-sm font-heading font-extrabold text-white block">{stats.geosites} Situs</span>
              </div>
              <div className="border-l border-slate-850">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Air Terjun</span>
                <span className="text-sm font-heading font-extrabold text-white block">{stats.waterfalls} Curug</span>
              </div>
            </div>

          </div>

          {/* DYNAMIC RENDERING TAB SWITCH */}
          {activeTab === 'explore' && (
            <ExploreWisata 
              destinations={initialDestinations}
              reviews={initialReviews}
              onAddBooking={handleAddBooking}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeTab === 'map' && (
            <PetaInteraktif destinations={initialDestinations} />
          )}

          {activeTab === 'virtual' && (
            <VirtualTour />
          )}

          {activeTab === 'planner' && (
            <SmartTripPlanner destinations={initialDestinations} />
          )}

          {activeTab === 'budget' && (
            <SmartBudgeting destinations={initialDestinations} />
          )}

          {activeTab === 'marketplace' && (
            <MarketplaceUMKM />
          )}

          {activeTab === 'education' && (
            <EdukasiQuiz />
          )}

          {activeTab === 'chat' && (
            <AITourGuide />
          )}

          {activeTab === 'analytics' && (
            <AdminAnalytics />
          )}

          {/* BOOKINGS HISTORY SHEETS */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div>
                <h3 className="font-heading font-extrabold text-slate-800 text-sm uppercase flex items-center gap-1">
                  <Ticket className="w-4.5 h-4.5 text-sky-505" />
                  Struk Pemesanan & Homestay Anda ({bookings.length})
                </h3>
                <span className="text-[10px] text-slate-400 block">Daftar transaksi aktif penginapan, tiket, dan paket tour yang dipesan</span>
              </div>
              <span className="text-[9px] text-emerald-600 bg-emerald-50 py-1 px-2.5 rounded-full font-bold uppercase tracking-wider">
                Sistem Terpadu
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="font-mono text-sky-655 font-bold text-[10px] block">{booking.id}</span>
                    <strong className="text-slate-805 block">{booking.serviceName}</strong>
                    <div className="flex items-center gap-1 text-[10px] text-slate-450 font-medium">
                      <Clock className="w-3.5 h-3.5" /> Tanggal: {booking.date} | {booking.serviceType.toUpperCase()}
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="font-mono font-black block text-slate-800">Rp {booking.totalPrice.toLocaleString('id-ID')}</span>
                    <span className="bg-emerald-50 text-emerald-650 text-[9px] uppercase px-2 py-0.5 border border-emerald-250 font-bold rounded-full">
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

      {/* 3. FLOATING CHAT PILL FOR LIVE CHAT WITH AKI CILETUH */}
      <div className="fixed bottom-6 right-6 z-50">
        {!floatingChatOpen ? (
          <button
            onClick={() => setFloatingChatOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-500 to-sky-600 text-white flex items-center justify-center shadow-xl hover:scale-108 active:scale-95 transition-all shadow-sky-205 group animate-zoom-in relative"
            id="floating-chat-pill-btn"
          >
            <span className="flex h-3 w-3 absolute -top-1 -right-1 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-455 bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-505 bg-orange-500"></span>
            </span>
            <MessageSquare className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-[360px] md:w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white/95 backdrop-blur-md animate-zoom-in" id="floating-chat-box">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                <div>
                  <h4 className="text-xs font-heading font-extrabold uppercase">Aki Ciletuh AI Chat</h4>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Live assistant support console</span>
                </div>
              </div>
              <button
                onClick={() => setFloatingChatOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body container */}
            <div className="h-[380px] bg-slate-50 overflow-hidden flex flex-col justify-end">
              <AITourGuide />
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
