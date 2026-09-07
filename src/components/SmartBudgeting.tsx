import React, { useState, useMemo } from 'react';
import { DollarSign, Landmark, HelpCircle, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { Destination } from '../types';

interface SmartBudgetingProps {
  destinations: Destination[];
}

export default function SmartBudgeting({ destinations }: SmartBudgetingProps) {
  const [minBudget, setMinBudget] = useState(300000);
  const [maxBudget, setMaxBudget] = useState(3000000);
  const [days, setDays] = useState(2);
  const [participants, setParticipants] = useState(2);
  
  // Custom Slider metrics representing tiers
  const [lodgingTier, setLodgingTier] = useState<'camping' | 'homestay' | 'hotel' | 'villa'>('homestay');
  const [transitTier, setTransitTier] = useState<'motor' | 'car' | 'bus'>('car');
  const [culinaryTier, setCulinaryTier] = useState<'cheap' | 'medium' | 'premium'>('medium');

  // Calculates total trip estimation
  const calculations = useMemo(() => {
    // Ticket prices (simulates tickets to average 3 attraction spots around 15,000 IDR each)
    const ticketsCost = 15000 * 3 * participants;

    // Lodging costs
    let lodgCostPerNight = 150000; // camping
    if (lodgingTier === 'homestay') lodgCostPerNight = 300000;
    if (lodgingTier === 'hotel') lodgCostPerNight = 550000;
    if (lodgingTier === 'villa') lodgCostPerNight = 1200000;
    const lodgingTotal = lodgCostPerNight * (days - 1 > 0 ? days - 1 : 1);

    // Food cost per day
    let mealPerDayPerPerson = 45000; // cheap
    if (culinaryTier === 'medium') mealPerDayPerPerson = 90000;
    if (culinaryTier === 'premium') mealPerDayPerPerson = 250000;
    const foodTotal = mealPerDayPerPerson * days * participants;

    // Fuel & Transport
    let transFactor = 80000; // motor
    if (transitTier === 'car') transFactor = 250000;
    if (transitTier === 'bus') transFactor = 650000;
    const fuelTotal = transFactor + (40000 * days); // basic rental + gas per day

    // Parking & Misc
    const parkingTotal = (15000 * days) + 20000;

    const absoluteSum = ticketsCost + lodgingTotal + foodTotal + fuelTotal + parkingTotal;
    const costPerPersonVal = Math.round(absoluteSum / participants);

    // Determine Feasibility Status
    const isFeasible = maxBudget >= absoluteSum;
    const difference = maxBudget - absoluteSum;

    return {
      tickets: ticketsCost,
      hotel: lodgingTotal,
      consumption: foodTotal,
      fuel: fuelTotal,
      parking: parkingTotal,
      total: absoluteSum,
      perPerson: costPerPersonVal,
      isFeasible,
      diff: difference,
    };
  }, [days, participants, lodgingTier, transitTier, culinaryTier, maxBudget]);

  // Data representing percentages for Donut Chart
  const donutData = useMemo(() => {
    const total = calculations.total || 1;
    const pTickets = (calculations.tickets / total) * 100;
    const pHotel = (calculations.hotel / total) * 100;
    const pConsumption = (calculations.consumption / total) * 100;
    const pFuel = (calculations.fuel / total) * 100;
    const pParking = (calculations.parking / total) * 100;

    return [
      { label: 'Tiket', val: pTickets, color: '#38BDF8', amount: calculations.tickets },
      { label: 'Hotel/Camp', val: pHotel, color: '#10B981', amount: calculations.hotel },
      { label: 'Konsumsi', val: pConsumption, color: '#F97316', amount: calculations.consumption },
      { label: 'Bahan Bakar', val: pFuel, color: '#EF4444', amount: calculations.fuel },
      { label: 'Parkir/Sewa', val: pParking, color: '#8B5CF6', amount: calculations.parking },
    ];
  }, [calculations]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in font-sans" id="smart-budget-root">
      
      {/* Parameters Panel inputs (5 columns) */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-5">
        <div>
          <h2 className="text-sm font-heading font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-50 pb-2">
            <Landmark className="w-4.5 h-4.5 text-sky-500" />
            Parameter Finansial
          </h2>
          <span className="text-[10px] text-slate-400 block mt-1">Simulasikan Anggaran & Dapatkan Rekomendasi Terhemat</span>
        </div>

        {/* Inputs list */}
        <div className="space-y-4">
          
          {/* Sliders max budget */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] text-slate-500 uppercase font-bold block">Batas Maks Anggaran Sobat</label>
              <span className="text-xs font-bold text-sky-600 font-mono">Rp {maxBudget.toLocaleString('id-ID')}</span>
            </div>
            <input
              type="range"
              min="200000"
              max="10000000"
              step="100000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-500"
              id="budget_range_slider"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="text-[10px] text-slate-450 uppercase block mb-1">Lama Perjalanan</label>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-lg text-xs font-medium text-slate-700"
                id="budget_days_select"
              >
                <option value="1">1 Hari Penuh</option>
                <option value="2">2 Hari 1 Malam</option>
                <option value="3">3 Hari 2 Malam</option>
                <option value="4">4 Hari 3 Malam</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-450 uppercase block mb-1">Wisatawan (Orang)</label>
              <input
                type="number"
                min="1"
                max="30"
                value={participants}
                onChange={(e) => setParticipants(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-lg text-xs text-slate-755"
                id="budget_participants_input"
              />
            </div>
          </div>

          <div className="space-y-3.5 pt-3 border-t border-slate-50">
            <span className="text-[10px] text-slate-450 uppercase font-bold block">Preferensi Layanan</span>

            {/* Lodging Tier selection */}
            <div>
              <label className="text-[9px] text-slate-400 uppercase block mb-1">Kelas Penginapan</label>
              <div className="grid grid-cols-4 gap-1.5 text-center">
                {[
                  { id: 'camping', label: 'Camp' },
                  { id: 'homestay', label: 'Homestay' },
                  { id: 'hotel', label: 'Hotel' },
                  { id: 'villa', label: 'Villa' },
                ].map(tier => (
                  <button
                    key={tier.id}
                    onClick={() => setLodgingTier(tier.id as any)}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all border ${
                      lodgingTier === tier.id
                        ? 'bg-emerald-500 text-white border-emerald-400'
                        : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Transport Tier selection */}
            <div>
              <label className="text-[9px] text-slate-400 uppercase block mb-1">Kelas Transportasi</label>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {[
                  { id: 'motor', label: 'Motor' },
                  { id: 'car', label: 'Mobil' },
                  { id: 'bus', label: 'Bus' },
                ].map(tier => (
                  <button
                    key={tier.id}
                    onClick={() => setTransitTier(tier.id as any)}
                    className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all border ${
                      transitTier === tier.id
                        ? 'bg-sky-500 text-white border-sky-450'
                        : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Culinary Tier selection */}
            <div>
              <label className="text-[9px] text-slate-400 uppercase block mb-1">Kelas Kuliner & Konsumsi</label>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {[
                  { id: 'cheap', label: 'Warung Lokal' },
                  { id: 'medium', label: 'Seafood Snd' },
                  { id: 'premium', label: 'Resort Resto' },
                ].map(tier => (
                  <button
                    key={tier.id}
                    onClick={() => setCulinaryTier(tier.id as any)}
                    className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all border ${
                      culinaryTier === tier.id
                        ? 'bg-orange-500 text-white border-orange-450'
                        : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Visual Analytics Graphs Center (7 columns) */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
        
        {/* Results meter headers */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-50 pb-3 gap-3">
          <div>
            <h3 className="font-heading font-extrabold text-slate-800 text-sm uppercase">Fesibilitas Anggaran Perjalanan</h3>
            <span className="text-[10px] text-slate-400 block">Bagaimana dana Anda teralokasikan secara spasial</span>
          </div>

          <div className="flex items-center gap-2">
            {calculations.isFeasible ? (
              <span className="bg-green-50 text-green-600 text-[10px] font-bold font-ui px-2.5 py-1 rounded-full border border-green-200 flex items-center gap-1 shrink-0">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                DANA AMAN (FEASIBLE)
              </span>
            ) : (
              <span className="bg-red-50 text-red-600 text-[10px] font-bold font-ui px-2.5 py-1 rounded-full border border-red-200 flex items-center gap-1 shrink-0">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                KURANG DANA (OVER BUDGET)
              </span>
            )}
          </div>
        </div>

        {/* Cost breakdown cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="text-center md:text-left">
            <span className="text-[9px] text-slate-400 block uppercase font-ui">Total Estimasi</span>
            <span className="font-heading font-extrabold text-sm text-slate-800 font-mono">Rp {calculations.total.toLocaleString('id-ID')}</span>
          </div>

          <div className="text-center md:text-left">
            <span className="text-[9px] text-slate-400 block uppercase font-ui">Per Orang</span>
            <span className="font-heading font-extrabold text-sm text-slate-800 font-mono">Rp {calculations.perPerson.toLocaleString('id-ID')}</span>
          </div>

          <input type="hidden" name="min-budget" value={minBudget}/>

          <div className="col-span-2 text-center md:text-right border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-4">
            <span className="text-[9px] text-slate-400 block uppercase font-ui">Sisa Anggaran Sobat</span>
            <span className={`font-heading font-extrabold text-sm font-mono ${calculations.diff >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {calculations.diff >= 0 
                ? `+Rp ${calculations.diff.toLocaleString('id-ID')}` 
                : `-Rp ${Math.abs(calculations.diff).toLocaleString('id-ID')}`}
            </span>
          </div>
        </div>

        {/* Custom Native Interactive SVG Breakdown Chart & Legends */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Custom SVG Donut representation */}
          <div className="relative w-40 h-40 mx-auto select-none">
            <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F1F5F9" strokeWidth="4.2" />
              
              {/* Plot segments dynamically */}
              {(() => {
                let accumulatedPercent = 0;
                return donutData.map((item, idx) => {
                  const dashArray = `${item.val} ${100 - item.val}`;
                  const dashOffset = 100 - accumulatedPercent;
                  accumulatedPercent += item.val;
                  return (
                    <circle
                      key={idx}
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="transparent"
                      stroke={item.color}
                      strokeWidth="4.5"
                      strokeDasharray={dashArray}
                      strokeDashoffset={dashOffset}
                      className="transition-all duration-500 ease-out"
                    />
                  );
                });
              })()}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[9px] text-slate-400 uppercase font-ui">Mulai Per Pax</span>
              <span className="font-heading font-extrabold text-xs text-slate-800 font-mono">Rp {calculations.perPerson.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Detailed Labels with Absolute currency sums */}
          <div className="space-y-2">
            {donutData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between font-sans text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded shrink-0" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-600 font-medium">{item.label}</span>
                </div>
                <div className="text-right font-mono text-slate-750">
                  <span className="font-bold text-slate-850 block">Rp {item.amount.toLocaleString('id-ID')}</span>
                  <span className="text-[10px] text-slate-450 font-normal">{item.val.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warnings or Smart Savings Hack overlay */}
        {!calculations.isFeasible ? (
          <div className="bg-red-50 border border-red-200/50 rounded-2xl p-4 space-y-2">
            <h4 className="font-heading font-extrabold text-xs text-red-800 uppercase flex items-center gap-1 leading-none">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Rekomendasi Pemotongan Anggaran (Saver Hacks)
            </h4>
            <p className="text-[11px] text-red-700 font-sans leading-relaxed">
              Anggaran maksimum Sobat kurang bersahabat dengan parameter saat ini. Cobalah lakukan beberapa trik hemat berikut:
            </p>
            <ul className="text-[10px] text-slate-600 space-y-1 pl-4 list-disc font-sans font-medium">
              <li>Pilihlah <strong className="text-slate-800">Camping Ground</strong> atau homestay murah pedesaan untuk menghemat biaya pondokan hotel.</li>
              <li>Sewa kendaraan <strong className="text-slate-800">Roda Dua/Motor</strong> lokal, BBM motor murni Ciletuh sangat irit untuk dikemudikan.</li>
              <li>Belilah kuliner <strong className="text-slate-800">Warung Makan Sederhana</strong> alih-alih seafood bar pinggir pelabuhan mewah.</li>
              <li>Kurangi jumlah hari perjalanan atau ajak lebih banyak kawan untuk berbagi biaya sewa sekat penampung.</li>
            </ul>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-250/50 rounded-2xl p-4 space-y-1">
            <h4 className="font-heading font-bold text-xs text-emerald-800 uppercase flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Anggaran Aman Terkendali!
            </h4>
            <p className="text-[11px] text-emerald-700 leading-relaxed font-sans">
              Selamat! Anggaran maksimum Sobat sangat melimpah dan aman untuk melakukan perjalanan premium Geopark. Sobat memiliki kelebihan saldo <strong className="text-slate-800">Rp {calculations.diff.toLocaleString('id-ID')}</strong> yang bisa dialokasikan di sentra Cinderamata Marketplace UMKM Kerajinan dan Batik Geopark Ciletuh!
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
