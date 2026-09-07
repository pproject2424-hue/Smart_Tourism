import React, { useState } from 'react';
import { Activity, Users, DollarSign, Calendar, Landmark, ShieldCheck, CheckCircle, ArrowRight, Download } from 'lucide-react';

export default function AdminAnalytics() {
  const [selectedZone, setSelectedZone] = useState<'all' | 'coast' | 'highland'>('all');

  const visitorTrendPoints = [
    { label: 'Jan', val: 5400 },
    { label: 'Feb', val: 6200 },
    { label: 'Mar', val: 7500 },
    { label: 'Apr', val: 12000 }, // Lebaran Season Peak
    { label: 'Mei', val: 9200 },
    { label: 'Jun', val: 11000 },
  ];

  // Hotspots representing heatmap density in selected Geopark zones
  const densityHeatmap = [
    { spot: 'Puncak Darma (Tebing)', density: 'Sangat Tinggi (High)', travelersCap: 342, zone: 'highland' },
    { spot: 'Pantai Palangpang (Laut)', density: 'Sangat Tinggi (High)', travelersCap: 412, zone: 'coast' },
    { spot: 'Amphitheatre Panenjoan', density: 'Tinggi (Medium-High)', travelersCap: 520, zone: 'highland' },
    { spot: 'Curug Cimarinjung (Situs)', density: 'Sedang (Medium)', travelersCap: 289, zone: 'coast' },
    { spot: 'Desa Wisata Hanjeli', density: 'Rendah (Low)', travelersCap: 120, zone: 'highland' },
  ];

  const filteredHeatmap = densityHeatmap.filter(item => selectedZone === 'all' || item.zone === selectedZone);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in font-sans" id="analytics-console">
      
      {/* Upper Metrics Row (12 columns full) */}
      <div className="col-span-full grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Pengunjung Bulanan</span>
            <Users className="w-4.5 h-4.5 text-sky-505 text-sky-500" />
          </div>
          <span className="text-lg font-heading font-extrabold text-slate-850 block">51.300 Orang</span>
          <span className="text-[9px] text-emerald-600 font-medium">▲ +12% dibanding bulan lalu</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Rata-rata Tinggal</span>
            <Calendar className="w-4.5 h-4.5 text-emerald-500" />
          </div>
          <span className="text-lg font-heading font-extrabold text-slate-850 block">2,4 Hari</span>
          <span className="text-[9px] text-slate-405 font-medium">Stabil pada target Kasepuhan</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Omset UMKM Terpadu</span>
            <DollarSign className="w-4.5 h-4.5 text-orange-500" />
          </div>
          <span className="text-lg font-heading font-extrabold text-slate-850 block">Rp 145,2 Juta</span>
          <span className="text-[9px] text-emerald-600 font-medium">▲ +8% kontribusi batik & kriya</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Rating Pariwisata</span>
            <Activity className="w-4.5 h-4.5 text-indigo-500" />
          </div>
          <span className="text-lg font-heading font-extrabold text-slate-850 block">4,88 / 5,00</span>
          <span className="text-[9px] text-emerald-600 font-medium">Sangat Layak (UNESCO Verified)</span>
        </div>

      </div>

      {/* Dynamic Visitor Trend line Chart (8 columns) */}
      <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-50 pb-2">
          <div>
            <h3 className="font-heading font-extrabold text-slate-800 text-sm uppercase">Grafik Arus Pengunjung Ciletuh</h3>
            <span className="text-[10px] text-slate-404 text-slate-400 block block">Akumulasi statistik kunjungan semester pertama tahun 2026</span>
          </div>

          <button
            onClick={() => alert('File Spreadsheet statistika berhasil diekspor! (analytics_ciletuh_2026.csv saved)')}
            className="bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-[10px] py-1 px-2 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Download className="w-3.5 h-3.5 shrink-0" /> Ekspor CSV
          </button>
        </div>

        {/* Native SVG line plotting with hover metrics */}
        <div className="relative h-48 w-full mt-4 select-none">
          <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
            {/* Guidelines lines */}
            <line x1="0" y1="20" x2="500" y2="20" stroke="#F1F5F9" strokeWidth="0.5" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="#F1F5F9" strokeWidth="0.5" />
            <line x1="0" y1="140" x2="500" y2="140" stroke="#F1F5F9" strokeWidth="0.5" />
            
            {/* Draw Path lines representing visitorTrendPoints */}
            <path
              d="M 40,160 L 120,150 L 200,130 L 280,60 L 360,110 L 440,80"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="2.5"
              className="transition-all duration-300"
            />

            {/* Glowing gradient area under path */}
            <path
              d="M 40,160 L 120,150 L 200,130 L 280,60 L 360,110 L 440,80 L 440,200 L 40,200 Z"
              fill="rgba(14,165,233,0.06)"
            />

            {/* Render Nodes dots points */}
            <circle cx="40" cy="160" r="4" fill="#0EA5E9" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="120" cy="150" r="4" fill="#0EA5E9" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="200" cy="130" r="4" fill="#0EA5E9" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="280" cy="60" r="4" fill="#0EA5E9" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="360" cy="110" r="4" fill="#0EA5E9" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="440" cy="80" r="4" fill="#0EA5E9" stroke="#FFFFFF" strokeWidth="1.5" />
          </svg>

          {/* Render dates descriptions at the bottom margin */}
          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 px-4 border-t border-slate-100 font-sans font-medium">
            {visitorTrendPoints.map((item, idx) => (
              <div key={idx} className="text-center">
                <span className="block text-slate-755 font-bold">{item.label}</span>
                <span className="font-mono text-[9px]">{item.val.toLocaleString('id-ID')} pax</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap density zone indicator (4 columns) */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
        <div>
          <h3 className="font-heading font-extrabold text-slate-800 text-sm uppercase">Kepadatan Destinasi (Thermal)</h3>
          <span className="text-[10px] text-slate-400 block">Mengatur alokasi mitigasi over-tourism secara real-time</span>
        </div>

        {/* Categories toggler */}
        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'coast', label: 'Pantai' },
            { id: 'highland', label: 'Tebing' },
          ].map(z => (
            <button
              key={z.id}
              onClick={() => setSelectedZone(z.id as any)}
              className={`flex-1 text-[10px] font-bold py-1 px-1.5 rounded transition-all ${
                selectedZone === z.id
                  ? 'bg-white text-slate-800 shadow'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>

        {/* Heatmap Spot list */}
        <div className="space-y-3 pt-2 font-sans text-xs">
          {filteredHeatmap.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-1.5">
              <div>
                <span className="font-bold text-slate-800 block">{item.spot}</span>
                <span className="text-[9px] text-slate-400 block">Kapasitas: {item.travelersCap} travelers / jam</span>
              </div>

              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                item.density.includes('Sangat Tinggi') ? 'bg-red-50 text-red-650 font-bold' :
                item.density.includes('Tinggi') ? 'bg-orange-50 text-orange-650' :
                item.density.includes('Sedang') ? 'bg-yellow-50 text-yellow-650' :
                'bg-emerald-50 text-emerald-650'
              }`}>
                {item.density.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
