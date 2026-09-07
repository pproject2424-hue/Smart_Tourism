import React, { useState } from 'react';
import { Compass, Calendar, Users, Car, MapPin, Sparkles, HelpCircle, DollarSign, Eye, Clock, CheckCircle } from 'lucide-react';
import { Destination, TripPlanResult, PlannerInput } from '../types';

interface SmartTripPlannerProps {
  destinations: Destination[];
}

export default function SmartTripPlanner({ destinations }: SmartTripPlannerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDests, setSelectedDests] = useState<string[]>(['puncak-darma', 'curug-cimarinjung', 'pantai-palangpang']);
  const [days, setDays] = useState(2);
  const [participants, setParticipants] = useState(2);
  const [transportation, setTransportation] = useState<'motorcycle' | 'car' | 'bus' | 'shuttle'>('car');
  const [travelType, setTravelType] = useState<'family' | 'adventure' | 'education' | 'culture' | 'photography' | 'backpacker'>('adventure');
  const [accommodationType, setAccommodationType] = useState<'hotel' | 'homestay' | 'villa' | 'camping'>('homestay');
  const [budgetLevel, setBudgetLevel] = useState<'backpacker' | 'moderate' | 'premium'>('moderate');

  const [loading, setLoading] = useState(false);
  const [planResult, setPlanResult] = useState<TripPlanResult | null>(null);
  const [isAiPowered, setIsAiPowered] = useState(false);

  const toggleSelectDest = (id: string) => {
    if (selectedDests.includes(id)) {
      setSelectedDests(selectedDests.filter(d => d !== id));
    } else {
      setSelectedDests([...selectedDests, id]);
    }
  };

  const handleGeneratePlan = async () => {
    setLoading(true);
    setPlanResult(null);

    const inputData: PlannerInput = {
      destinations: selectedDests,
      days,
      budgetLevel,
      participants,
      transportation,
      travelType,
      accommodationType,
    };

    try {
      // Direct call to our backend API /api/planner
      const response = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        throw new Error('API server failed or key missing');
      }

      const generatedData = await response.json();
      setPlanResult(generatedData);
      setIsAiPowered(true);
    } catch (err) {
      console.warn('Redirecting to smart client-side heuristic planner fallback...', err);
      // Client-side heuristics generator
      const simulatedResult = generateSimulatedItinerary(inputData);
      setPlanResult(simulatedResult);
      setIsAiPowered(false);
    } finally {
      setLoading(false);
    }
  };

  // Heuristic simulation algorithm for Geopark Ciletuh
  const generateSimulatedItinerary = (input: PlannerInput): TripPlanResult => {
    const dLimit = input.days;
    const itinerary: any[] = [];

    // Prices calculation helpers
    let lodgPerNight = 250000; // Homestay
    if (input.accommodationType === 'hotel') lodgPerNight = 500000;
    if (input.accommodationType === 'villa') lodgPerNight = 1200000;
    if (input.accommodationType === 'camping') lodgPerNight = 100000;

    let mealFactor = 30000; // moderate
    if (input.budgetLevel === 'backpacker') mealFactor = 15000;
    if (input.budgetLevel === 'premium') mealFactor = 80000;

    let transCost = 250000;
    if (input.transportation === 'motorcycle') transCost = 80000;
    if (input.transportation === 'bus') transCost = 900000;

    let ticketPriceTotal = 0;

    // Standard schedule template generator
    for (let day = 1; day <= dLimit; day++) {
      const activities: any[] = [];
      
      // Morning
      activities.push({
        time: '07:30 - 08:30 WIB',
        title: 'Sarapan Pagi Sunda',
        description: `Sarapan bersama di warung lokal mencicipi nasi uduk / soto khas pesisir Pantai Ciletuh.`,
        cost: mealFactor * input.participants,
        category: 'meal',
      });

      // Destination 1
      const d1Id = input.destinations[(day * 2 - 2) % input.destinations.length] || 'puncak-darma';
      const d1Obj = destinations.find(d => d.id === d1Id);
      activities.push({
        time: '09:00 - 11:30 WIB',
        title: `Jelajah ${d1Obj?.name || 'Situs Geopark'}`,
        description: `Melakukan aktivitas trekking ringan, berfoto ria, dan menikmati panel informasi edukasi geologi.`,
        cost: (d1Obj?.ticketPrice || 10000) * input.participants,
        category: 'destination',
      });
      ticketPriceTotal += (d1Obj?.ticketPrice || 10000) * input.participants;

      // Lunch
      activities.push({
        time: '12:00 - 13:30 WIB',
        title: 'Makan Siang Seafood Bakar',
        description: 'Menikmati sajian menu seafood laut segar khas Pantai Palangpang menghadap deburan samudera.',
        cost: (mealFactor * 1.5) * input.participants,
        category: 'meal',
      });

      // Afternoon
      const d2Id = input.destinations[(day * 2 - 1) % input.destinations.length] || 'curug-cimarinjung';
      const d2Obj = destinations.find(d => d.id === d2Id);
      activities.push({
        time: '14:00 - 16:30 WIB',
        title: `Observasi ${d2Obj?.name || 'Air Terjun'}`,
        description: `Melihat kedalaman aliran sungai purba, formasi batu kuarsa, dan keunikan hayati.`,
        cost: (d2Obj?.ticketPrice || 5000) * input.participants,
        category: 'destination',
      });
      ticketPriceTotal += (d2Obj?.ticketPrice || 5050) * input.participants;

      // Lodging
      activities.push({
        time: '17:30 - Selesai',
        title: `Check-in di ${input.accommodationType === 'hotel' ? 'Hotel' : input.accommodationType === 'villa' ? 'Villa' : input.accommodationType === 'camping' ? 'Taman Camp' : 'Homestay'}`,
        description: 'Istirahat santai melepas penat sembari menyeduh kopi hanjeli di lobi penginapan.',
        cost: day < dLimit ? lodgPerNight : 0, // No lodging fee on last departure day
        category: 'lodging',
      });

      itinerary.push({ day, activities });
    }

    const tTotalCost = ticketPriceTotal + (lodgPerNight * (dLimit - 1)) + (mealFactor * 2 * dLimit * input.participants) + transCost;

    return {
      itinerary,
      summaryCost: {
        ticketPriceTotal,
        accommodationTotal: lodgPerNight * (dLimit - 1),
        consumptionTotal: mealFactor * 2 * dLimit * input.participants,
        transportationTotal: transCost,
        otherCosts: 50000,
        total: tTotalCost,
        perPerson: Math.round(tTotalCost / input.participants),
      },
      aiRecommendationText: `Sore hari di daerah Ciletuh rawan rintik hujan lokal. Bawalah payung/jas hujan ringan saat trekking air terjun. Gunakan alas kaki anti-selip karena tebing andesit purba agak berlumut. Selamat menikmati petualangan Geopark Ciletuh!`,
    };
  };

  const currentDestObjects = selectedDests.map(id => destinations.find(d => d.id === id)).filter(Boolean);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6" id="planner-wizard">
      
      {/* Wizard Header Progress */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-heading font-extrabold text-slate-800 flex items-center gap-1.5 uppercase">
            <Compass className="w-5.5 h-5.5 text-sky-500" />
            AI Smart Trip Planner
          </h2>
          <span className="text-[10px] text-slate-400 font-sans block">Merancang Jadwal Perjalanan Geopark Otomatis</span>
        </div>

        {/* Steps Indicators */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === step 
                  ? 'bg-sky-500 text-white shadow-md' 
                  : currentStep > step 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: SELECT DESTINATIONS */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-1">
            <h3 className="font-heading font-extrabold text-slate-800 text-sm">Langkah 1: Pilih Destinasi Impian</h3>
            <p className="text-xs text-slate-500">Pilih obyek wisata yang ingin Sobat kunjungi dalam trip ini (Minimal pilih 2):</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {destinations.map((dest) => {
              const isSelected = selectedDests.includes(dest.id);
              return (
                <button
                  key={dest.id}
                  onClick={() => toggleSelectDest(dest.id)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all ${
                    isSelected 
                      ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-200' 
                      : 'bg-white hover:bg-slate-50 border-slate-100'
                  }`}
                  id={`planner_dest_card_${dest.id}`}
                >
                  <span className={`text-[9px] font-bold uppercase rounded-full px-1.5 py-0.5 ${
                    isSelected ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {dest.categoryLabel}
                  </span>
                  <div className="mt-2">
                    <span className="font-bold text-xs text-slate-800 line-clamp-1 block">{dest.name}</span>
                    <span className="text-[9px] text-slate-400 truncate block mt-0.5">{dest.location}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              disabled={selectedDests.length < 2}
              className={`py-2 px-5 rounded-xl text-xs font-ui font-extrabold text-white transition-all ${
                selectedDests.length >= 2 ? 'bg-sky-500 hover:bg-sky-600 shadow-lg' : 'bg-slate-250 cursor-not-allowed text-slate-400'
              }`}
              id="planner_next_1_btn"
            >
              Lanjutkan ke Langkah 2
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: TRAVEL DETAILS */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-1">
            <h3 className="font-heading font-extrabold text-slate-800 text-sm">Langkah 2: Durasi & Model Transportasi</h3>
            <p className="text-xs text-slate-500">Tentukan durasi tinggal, jumlah peserta, dan jenis kendaraan:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Days selection */}
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">Durasi Liburan</label>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-250 p-2.5 rounded-xl text-xs text-slate-800"
                id="planner_days_select"
              >
                <option value="1">1 Hari Penuh (One Day Trip)</option>
                <option value="2">2 Hari 1 Malam (Rekomendasi)</option>
                <option value="3">3 Hari 2 Malam (Puas)</option>
                <option value="4">4 Hari 3 Malam (Eksklusif)</option>
              </select>
            </div>

            {/* Participants */}
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">Jumlah Peserta (Pax)</label>
              <input
                type="number"
                min="1"
                max="50"
                value={participants}
                onChange={(e) => setParticipants(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-250 p-2.5 rounded-xl text-xs text-slate-800"
                id="planner_pax_input"
              />
            </div>

            {/* Vehicular */}
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">Transportasi Lokal</label>
              <select
                value={transportation}
                onChange={(e) => setTransportation(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-250 p-2.5 rounded-xl text-xs text-slate-800"
                id="planner_trans_select"
              >
                <option value="motorcycle">Motor Ringan Pengendara tunggal</option>
                <option value="car">Jeep / Mobil Keluarga roda empat</option>
                <option value="bus">Mini Bus / Travel rombongan</option>
                <option value="shuttle">Shuttle Wisata Pengurus</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="py-2 px-4 rounded-xl text-xs bg-slate-100 hover:bg-slate-200 text-slate-650"
              id="planner_prev_2_btn"
            >
              Kembali
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="py-2 px-5 rounded-xl text-xs font-ui font-extrabold bg-sky-500 hover:bg-sky-600 text-white shadow-lg"
              id="planner_next_2_btn"
            >
              Lanjutkan ke Langkah 3
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: AMENITIES & ANGGARAN */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-1">
            <h3 className="font-heading font-extrabold text-slate-800 text-sm">Langkah 3: Minat Wisata & Lodging</h3>
            <p className="text-xs text-slate-500">Pilih tipe penginapan, kategori kegemaran, dan level budget:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Travel category */}
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">Gaya Wisata</label>
              <select
                value={travelType}
                onChange={(e) => setTravelType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-250 p-2.5 rounded-xl text-xs text-slate-800"
                id="planner_type_select"
              >
                <option value="adventure">Petualangan Alam Liar (Adventure)</option>
                <option value="family">Keluarga Santai (Relaxing Family)</option>
                <option value="education">Edukasi Sejarah Geologi (School Trip)</option>
                <option value="culture">Kebudayaan Lokal (Indigenous)</option>
                <option value="photography">Berburu Lanskap Foto Sunset (Lens)</option>
                <option value="backpacker">Hemat Super Sederhana (Minimalist)</option>
              </select>
            </div>

            {/* Accommodation preference */}
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">Akomodasi Bermalam</label>
              <select
                value={accommodationType}
                onChange={(e) => setAccommodationType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-250 p-2.5 rounded-xl text-xs text-slate-800"
                id="planner_accom_select"
              >
                <option value="homestay">Homestay Penduduk Desa (Interaktif)</option>
                <option value="hotel">Standard Resort Tepi Pantai</option>
                <option value="villa">Eco-Lodge Private Luxury Villa</option>
                <option value="camping">Camping Ground Alam Terbuka</option>
              </select>
            </div>

            {/* Target Budget scale */}
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">Target Kelas Anggaran</label>
              <select
                value={budgetLevel}
                onChange={(e) => setBudgetLevel(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-255 p-2.5 rounded-xl text-xs text-slate-800"
                id="planner_budget_select"
              >
                <option value="backpacker">Budget Backpacker (Super Hemat)</option>
                <option value="moderate">Budget Moderate (Menengah Umum)</option>
                <option value="premium">Budget Premium (Mewah Nyaman)</option>
              </select>
            </div>

          </div>

          <div className="flex justify-between pt-2 border-t border-slate-100 mt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="py-2 px-4 rounded-xl text-xs bg-slate-100 hover:bg-slate-200 text-slate-650"
              id="planner_prev_3_btn"
            >
              Kembali
            </button>
            <button
              onClick={handleGeneratePlan}
              disabled={loading}
              className="py-2.5 px-6 rounded-xl text-xs font-ui font-extrabold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg flex items-center gap-1.5"
              id="planner_generate_btn"
            >
              {loading ? 'Sedang Memproses AI Plan...' : 'Buat Itinerary Sekarang!'}
            </button>
          </div>
        </div>
      )}

      {/* RENDER PLANNER RESULT */}
      {loading && (
        <div className="py-12 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <span className="text-xs text-slate-500 font-sans block animate-pulse">Menghubungi Aki Ciletuh AI Assistant & menghitung geofiles...</span>
        </div>
      )}

      {planResult && !loading && (
        <div className="border-t border-slate-100 pt-6 space-y-6 animate-fade-in font-sans">
          
          {/* AI Banner header */}
          <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
            isAiPowered 
              ? 'bg-sky-50/50 border-sky-100 text-sky-900' 
              : 'bg-orange-50/50 border-orange-100 text-orange-950'
          }`}>
            <div className="flex items-center gap-2">
              <Sparkles className={`w-5 h-5 shrink-0 ${isAiPowered ? 'text-sky-500' : 'text-orange-500 animate-pulse'}`} />
              <div>
                <span className="font-heading font-extrabold text-xs uppercase tracking-wide block">
                  {isAiPowered ? 'Rencana Terbuat berbasis AI Gemini' : 'Rencana Terbuat Berbasis Algoritma Heuristik Lokal'}
                </span>
                <p className="text-[10px] text-slate-500">
                  {isAiPowered 
                    ? 'Gemini berhasil mengevaluasi lintasan geosite purba dan menyeimbangkan biaya.' 
                    : 'Untuk rencana kustom AI murni tanpa batas, konfigurasikan API key Anda di panel Secrets.'}
                </p>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 bg-white/85 px-3 py-1.5 rounded-lg border border-slate-150 self-start md:self-auto uppercase font-bold font-mono">
              STATUS: COMPLETE
            </div>
          </div>

          {/* Cost Allocation cards */}
          <div>
            <h3 className="font-heading font-extrabold text-slate-800 text-xs mb-3 uppercase tracking-wider">Metrik Estimasi Biaya Seluruhnya</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[9px] text-slate-400 block uppercase font-ui">Tiket Masuk total</span>
                <span className="text-xs font-bold text-slate-800 block">Rp {planResult.summaryCost.ticketPriceTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[9px] text-slate-400 block uppercase font-ui">Akomodasi</span>
                <span className="text-xs font-bold text-slate-800 block">Rp {planResult.summaryCost.accommodationTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[9px] text-slate-400 block uppercase font-ui">Konsumsi / Makan</span>
                <span className="text-xs font-bold text-slate-800 block">Rp {planResult.summaryCost.consumptionTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[9px] text-slate-400 block uppercase font-ui">Transportasi / BBM</span>
                <span className="text-xs font-bold text-slate-800 block">Rp {planResult.summaryCost.transportationTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-sky-500 text-white p-3 rounded-xl border border-sky-400 shadow-md col-span-2 md:col-span-1">
                <span className="text-[9px] text-sky-100 block uppercase font-ui">Estimasi per orang</span>
                <span className="text-sm font-heading font-bold block">Rp {planResult.summaryCost.perPerson.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Step schedule itinerary views */}
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-slate-800 text-xs uppercase tracking-wider">Rincian Perjalanan Harian (Itinerary)</h3>
            
            <div className="space-y-4">
              {planResult.itinerary.map((dayPlan) => (
                <div key={dayPlan.day} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-heading font-bold text-xs text-slate-800 flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-sky-500" /> HARI {dayPlan.day}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">Wisata: {travelType.toUpperCase()}</span>
                  </div>

                  <div className="divide-y divide-slate-100 px-4">
                    {dayPlan.activities.map((act: any, idx: number) => (
                      <div key={idx} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                        <div className="flex items-start gap-3">
                          <span className="bg-slate-100 text-slate-650 px-2 py-1 rounded text-[10px] font-mono shrink-0 font-bold">
                            {act.time}
                          </span>
                          <div>
                            <span className="font-bold text-slate-800 block">{act.title}</span>
                            <p className="text-slate-500 text-[11px] mt-0.5">{act.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-auto">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            act.category === 'meal' ? 'bg-orange-50 text-orange-650' :
                            act.category === 'lodging' ? 'bg-emerald-50 text-emerald-650' :
                            act.category === 'travel' ? 'bg-indigo-50 text-indigo-650' :
                            'bg-sky-50 text-sky-650'
                          }`}>
                            {act.category}
                          </span>
                          <span className="font-mono text-slate-700 font-medium">
                            {act.cost === 0 ? 'Gratis' : `Rp ${act.cost.toLocaleString('id-ID')}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advice bubble */}
          <div className="bg-emerald-50/50 p-4 border border-emerald-100 rounded-2xl text-xs flex items-start gap-2 text-emerald-950 leading-relaxed font-sans">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-heading mb-0.5">Saran & Evaluasi Lokal Aki:</strong>
              {planResult.aiRecommendationText}
            </div>
          </div>

          {/* Reset Planner */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                setCurrentStep(1);
                setPlanResult(null);
              }}
              className="text-xs text-sky-500 font-bold hover:text-sky-600 border border-sky-200 px-4 py-2 rounded-xl transition-all"
              id="planner_reset_btn"
            >
              Rancang Ulang Rute Liburan
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
