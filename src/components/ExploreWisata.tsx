import React, { useState } from 'react';
import { MapPin, Search, Star, Heart, Share2, Clock, DollarSign, Phone, CheckCircle, Flame, ShieldAlert, ArrowRight, X, Sparkles, MessageSquare } from 'lucide-react';
import { Destination, Review } from '../types';

interface ExploreWisataProps {
  destinations: Destination[];
  reviews: Review[];
  onAddBooking: (booking: any) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function ExploreWisata({
  destinations,
  reviews,
  onAddBooking,
  favorites,
  onToggleFavorite,
}: ExploreWisataProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'rating' | 'priceAsc' | 'priceDesc'>('rating');
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  
  // States for reviews
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews);

  // States for Booking form inside detail
  const [bookingDate, setBookingDate] = useState('2026-06-10');
  const [participantsCount, setParticipantsCount] = useState(2);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'Semua Wisata' },
    { id: 'geosite', label: 'Geosite Purba' },
    { id: 'waterfall', label: 'Air Terjun' },
    { id: 'beach', label: 'Pantai & Samudera' },
    { id: 'hill', label: 'Bukit & Puncak' },
    { id: 'culture', label: 'Wisata Budaya' },
    { id: 'village', label: 'Desa Wisata' },
    { id: 'accommodation', label: 'Penginapan' },
  ];

  const handleShare = (dest: Destination) => {
    alert(`Tautan lokasi ${dest.name} disalin ke papan klip! Koordinat: ${dest.latitude}, ${dest.longitude}`);
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDest || !newReviewComment) return;

    const addedReview: Review = {
      id: `rev-local-${Date.now()}`,
      destinationId: selectedDest.id,
      author: 'Anda (Wisatawan Smart)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewComment,
    };

    setLocalReviews([addedReview, ...localReviews]);
    setNewReviewComment('');
    setNewReviewRating(5);
  };

  const currentReviews = localReviews.filter(r => selectedDest && r.destinationId === selectedDest.id);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDest) return;

    const cost = selectedDest.category === 'accommodation' 
      ? selectedDest.ticketPrice * participantsCount 
      : (selectedDest.ticketPrice || 10000) * participantsCount;

    onAddBooking({
      id: `B-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: 'Sobat Wisatawan',
      email: 'wisatawan@ciletuhsmart.com',
      phone: '0812-3456-7890',
      serviceId: selectedDest.id,
      serviceName: selectedDest.category === 'accommodation' ? `Sewa Kamar ${selectedDest.name}` : `Paket Tiket ${selectedDest.name}`,
      serviceType: selectedDest.category === 'accommodation' ? 'accommodation' : 'tour',
      date: bookingDate,
      totalPrice: cost,
      status: 'confirmed',
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
    }, 4000);
  };

  // Filter & Sort Logic
  const filtered = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(search.toLowerCase()) || 
                          dest.location.toLowerCase().includes(search.toLowerCase()) ||
                          dest.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || dest.category === selectedCategory;
    return matchesSearch && matchesCat;
  }).sort((a, b) => {
    if (sortOrder === 'rating') return b.rating - a.rating;
    if (sortOrder === 'priceAsc') return a.ticketPrice - b.ticketPrice;
    if (sortOrder === 'priceDesc') return b.ticketPrice - a.ticketPrice;
    return 0;
  });

  return (
    <div className="space-y-6" id="explore-wisata-root">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300">
        <div className="relative flex-1 max-w-lg">
          <input
            type="text"
            className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 font-sans text-slate-800 text-sm"
            placeholder="Cari air terjun, geosite purba, hotel, kuliner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search_destination_input"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-ui whitespace-nowrap">Urutan:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-700 outline-none focus:ring-2 focus:ring-sky-400"
            id="sort_destination_select"
          >
            <option value="rating">Rating Wisatawan tertinggi</option>
            <option value="priceAsc">Tarif Terendah</option>
            <option value="priceDesc">Tarif Tertinggi</option>
          </select>
        </div>
      </div>

      {/* Categories Horizontal Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-full text-xs font-ui font-semibold shrink-0 transition-all duration-300 ${
              selectedCategory === cat.id
                ? 'bg-sky-500 text-white shadow-md shadow-sky-100 ring-2 ring-offset-2 ring-sky-300'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100 hover:text-sky-500 shadow-sm'
            }`}
            id={`category_btn_${cat.id}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((dest) => {
            const isFav = favorites.includes(dest.id);
            return (
              <div
                key={dest.id}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer relative"
                onClick={() => setSelectedDest(dest)}
                id={`card_${dest.id}`}
              >
                {/* Badge Category */}
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-ui px-2.5 py-1 rounded-full z-10 font-bold uppercase tracking-wider">
                  {dest.categoryLabel}
                </span>

                {/* Love Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(dest.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/70 backdrop-blur-md text-slate-700 hover:text-red-500 hover:bg-white transition-all duration-200 shadow-sm z-10"
                  id={`fav_btn_${dest.id}`}
                >
                  <Heart className={`w-4 h-4 transition-colors duration-200 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                {/* Cover Image */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-xs font-medium flex items-center gap-1">
                      Lihat Detail Wisata <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5Packed">
                      <div className="flex items-center text-xs text-orange-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                        <span>{dest.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal ml-1">({dest.reviewsCount})</span>
                      </div>
                      <div className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                        dest.weatherRealtime.crowdLevel === 'Low' ? 'bg-green-50 text-green-600' :
                        dest.weatherRealtime.crowdLevel === 'Medium' ? 'bg-orange-50 text-orange-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {dest.weatherRealtime.crowdLevel === 'High' ? 'Sangat Ramai' : dest.weatherRealtime.crowdLevel === 'Medium' ? 'Sedang' : 'Sepi'}
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-slate-800 text-base mb-1 group-hover:text-sky-500 transition-colors duration-200">
                      {dest.name}
                    </h3>

                    <div className="flex items-center text-slate-500 text-xs gap-1.5 mb-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{dest.location}</span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2">
                      {dest.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-50 mt-4 pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-ui">Mulai Dari</span>
                      <span className="text-xs font-bold text-slate-800 font-mono">
                        {dest.ticketPrice === 0 ? (
                          <span className="text-emerald-500 font-ui font-semibold">Gratis</span>
                        ) : (
                          `Rp ${dest.ticketPrice.toLocaleString('id-ID')}`
                        )}
                        {dest.category === 'accommodation' ? ' /malam' : ' /pax'}
                      </span>
                    </div>

                    <button className="bg-sky-50 py-1.5 px-3 rounded-lg text-[11px] font-ui font-bold text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                      Eksplor
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center text-slate-400 bg-white/50 rounded-2xl border border-slate-100">
            <Sparkles className="w-8 h-8 opacity-40 mb-2 text-sky-500" />
            <span className="text-sm">Tidak menemukan wisata sesuai pencarian Anda</span>
          </div>
        )}
      </div>

      {/* Airbnb-style Drawer Details Overlay */}
      {selectedDest && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300">
          <div className="absolute inset-0" onClick={() => setSelectedDest(null)}></div>
          
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-slide-in duration-300">
            {/* Drawer Header Toolbar */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-20">
              <span className="text-xs font-ui font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2.5 py-1 rounded">
                Eksplorasi {selectedDest.categoryLabel}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleFavorite(selectedDest.id)}
                  className={`p-2 rounded-full border border-slate-200 transition-colors ${
                    favorites.includes(selectedDest.id) ? 'text-red-500 bg-red-50 border-red-200' : 'text-slate-400 hover:text-slate-600'
                  }`}
                  id="drawer_fav_btn"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(selectedDest.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => handleShare(selectedDest)}
                  className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                  id="drawer_share_btn"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedDest(null)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors ml-2"
                  id="drawer_close_btn"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Immersive Gallery Deck */}
            <div className="relative aspect-video w-full bg-slate-950">
              <img
                src={selectedDest.image}
                alt={selectedDest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent p-6 text-white">
                <h2 className="text-2xl font-heading font-extrabold mb-1">
                  {selectedDest.name}
                </h2>
                <div className="flex items-center text-slate-200 text-xs gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{selectedDest.location}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Climate and Crowd Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] font-ui text-slate-400 block uppercase">Real-Time Cuaca</span>
                  <span className="text-sm font-heading font-bold text-slate-800">
                    {selectedDest.weatherRealtime.temp}°C
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {selectedDest.weatherRealtime.condition}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] font-ui text-slate-400 block uppercase">Kelembaban</span>
                  <span className="text-sm font-heading font-bold text-slate-800">
                    {selectedDest.weatherRealtime.humidity}%
                  </span>
                  <span className="text-[10px] text-slate-500 block">Udara Lokal</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] font-ui text-slate-400 block uppercase">Kepadatan</span>
                  <span className="text-sm font-heading font-bold text-slate-800 flex items-center justify-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${
                      selectedDest.weatherRealtime.crowdLevel === 'High' ? 'bg-red-500' :
                      selectedDest.weatherRealtime.crowdLevel === 'Medium' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}></span>
                    {selectedDest.weatherRealtime.crowdLevel}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Crowd Index</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] font-ui text-slate-400 block uppercase">Jam Operasional</span>
                  <span className="text-xs font-heading font-bold text-slate-800 truncate block">
                    {selectedDest.openingHours}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Setiap Hari</span>
                </div>
              </div>

              {/* General Description */}
              <div>
                <h3 className="font-heading font-bold text-slate-800 text-sm mb-2 uppercase tracking-wide">
                  Tentang Destinasi
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {selectedDest.description}
                </p>
              </div>

              {/* Facilities and Photo Spots Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-sky-50/40 p-4 rounded-xl border border-sky-100/60">
                  <h4 className="text-xs font-heading font-bold text-sky-800 mb-2 uppercase flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-sky-500" /> Fasilitas Wisata
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 font-sans">
                    {selectedDest.facilities.map((fac, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-sky-500 shrink-0"></span>
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50/40 p-4 rounded-xl border border-orange-100/60">
                  <h4 className="text-xs font-heading font-bold text-orange-850 mb-2 uppercase flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-orange-500" /> Spot Foto Menarik
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 font-sans">
                    {selectedDest.spots.map((spot, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>
                        <span>{spot}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Interactive Booking Module */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-sky-500/10 rounded-full blur-xl"></div>
                
                <h3 className="font-heading font-bold text-sm mb-4 uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                  Pemesanan Tiket Instant & Akomodasi
                </h3>

                <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  <div>
                    <label className="text-[10px] text-slate-400 font-ui block mb-1">Tanggal Kunjungan</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-slate-800 text-white border border-slate-700 px-3 py-2 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-ui block mb-1">Jumlah Peserta</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={participantsCount}
                      onChange={(e) => setParticipantsCount(Number(e.target.value))}
                      className="w-full bg-slate-800 text-white border border-slate-700 px-3 py-2 rounded-lg text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-sky-500 text-white hover:bg-sky-600 text-xs font-ui font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1"
                    id="booking_confirm_btn"
                  >
                    Booking Sekarang <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </form>

                {bookingSuccess && (
                  <div className="mt-3 bg-emerald-500/20 border border-emerald-400/40 p-2.5 rounded-lg text-[11px] text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Booking berhasil dikonfirmasi! Sobat bisa melihat tiket di menu "Paket & Booking".</span>
                  </div>
                )}
              </div>

              {/* Reviews and Ratings Center */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-heading font-extrabold text-slate-800 text-sm uppercase">
                    Ulasan Pengunjung ({currentReviews.length})
                  </h3>
                  <div className="flex items-center text-xs text-orange-500 font-bold">
                    <Star className="w-4.5 h-4.5 fill-current mr-0.5" />
                    <span>{selectedDest.rating} / 5.0</span>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {currentReviews.length > 0 ? (
                    currentReviews.map((rev) => (
                      <div key={rev.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100/60 text-xs font-sans">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <img src={rev.avatar} alt={rev.author} className="w-6 h-6 rounded-full object-cover" />
                            <span className="font-bold text-slate-800">{rev.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400 text-[10px]">{rev.date}</span>
                            <div className="flex text-orange-500 leading-none">
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-600 italic">"{rev.comment}"</p>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-slate-400 text-xs italic bg-slate-50/50 rounded-xl">
                      Belum ada ulasan untuk wisata ini. Jadilah yang pertama memberikan ulasan!
                    </div>
                  )}
                </div>

                {/* Add Custom User Review Form */}
                <form onSubmit={handleCreateReview} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                  <span className="text-xs font-ui font-semibold text-slate-800 block">Tulis Ulasan Anda</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">Beri Rating:</span>
                    <div className="flex items-center gap-1 text-slate-300">
                      {[1, 2, 3, 4, 5].map((starIdx) => (
                        <button
                          key={starIdx}
                          type="button"
                          onClick={() => setNewReviewRating(starIdx)}
                          className={`text-base hover:scale-110 transition-transform ${
                            starIdx <= newReviewRating ? 'text-orange-500' : 'text-slate-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Ceritakan pengalaman tak terlupakan Sobat di destinasi ini..."
                    className="w-full bg-white border border-slate-200 p-2.5 rounded-lg text-xs font-sans outline-none focus:ring-2 focus:ring-sky-400 text-slate-800"
                    required
                  />

                  <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 transition-colors text-white py-1.5 px-4 rounded-lg text-xs font-ui font-bold select-none"
                  >
                    Kirim Ulasan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
