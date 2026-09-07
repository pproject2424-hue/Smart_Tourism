import React, { useState, useMemo } from 'react';
import { Compass, MapPin, Eye, Navigation, ShieldCheck, Flame, Tag, DollarSign, Activity, Settings, HelpCircle } from 'lucide-react';
import { Destination } from '../types';

interface PetaInteraktifProps {
  destinations: Destination[];
}

interface MapNode {
  id: string;
  name: string;
  x: number; // percentage width
  y: number; // percentage height
  type: 'attraction' | 'hotel' | 'dining' | 'gas' | 'atm' | 'hospital' | 'security';
  description: string;
}

export default function PetaInteraktif({ destinations }: PetaInteraktifProps) {
  const [selectedStart, setSelectedStart] = useState<string>('panenjoan');
  const [selectedEnd, setSelectedEnd] = useState<string>('puncak-darma');
  const [gpsSimulating, setGpsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);

  // Layer filters
  const [activeLayers, setActiveLayers] = useState<string[]>([
    'attraction', 'hotel', 'dining', 'gas', 'atm', 'hospital', 'security'
  ]);

  const toggleLayer = (layer: string) => {
    if (activeLayers.includes(layer)) {
      setActiveLayers(activeLayers.filter(l => l !== layer));
    } else {
      setActiveLayers([...activeLayers, layer]);
    }
  };

  // Coordinates data nodes representing Geopark Ciletuh Map (100x100 grid scale)
  const mapNodes = useMemo<MapNode[]>(() => {
    const customNodes: MapNode[] = [
      { id: 'panenjoan', name: 'Amphitheatre Panenjoan (GIS Center)', x: 70, y: 72, type: 'attraction', description: 'Titik pusat observasi patahan tebing raksasa.' },
      { id: 'puncak-darma', name: 'Puncak Darma', x: 25, y: 40, type: 'attraction', description: 'Keindahan sunset di teluk tapal kuda.' },
      { id: 'curug-cimarinjung', name: 'Curug Cimarinjung', x: 38, y: 55, type: 'attraction', description: 'Air terjun tebing batuan andesit purba.' },
      { id: 'curug-awang', name: 'Curug Awang', x: 80, y: 48, type: 'attraction', description: 'Air terjun niagara purba bentang lebar.' },
      { id: 'pantai-palangpang', name: 'Pantai Palangpang', x: 32, y: 22, type: 'attraction', description: 'Gerbang utama pesisir nelayan tradisional.' },
      { id: 'desa-hanjeli', name: 'Desa Wisata Hanjeli', x: 88, y: 82, type: 'attraction', description: 'Pusat budidaya pangan lokal Hanjeli.' },
      { id: 'sinarresmi', name: 'Kasepuhan Sinar Resmi', x: 15, y: 88, type: 'attraction', description: 'Adat bertanam padi kuno Seren Taun.' },
      
      // Hotels & Homestay
      { id: 'lodge-1', name: 'Ciletuh Hills Eco-Lodge', x: 30, y: 46, type: 'hotel', description: 'Resort tebing mewah pemandangan laut.' },
      { id: 'home-1', name: 'Homestay Tamanjaya', x: 67, y: 78, type: 'hotel', description: 'Menginap nyaman bernuansa pedesaan.' },
      { id: 'camp-1', name: 'Camping Ground Palangpang', x: 26, y: 18, type: 'hotel', description: 'Bermalam di bawah taburan bintang pesisir Pantai.' },

      // Dining / Restoran
      { id: 'resto-1', name: 'Warung Seafood Palangpang', x: 34, y: 28, type: 'dining', description: 'Kuliner Lobster bakar segar dari laut.' },
      { id: 'resto-2', name: 'Dapoer Hanjeli', x: 85, y: 85, type: 'dining', description: 'Bubur legit dan kreasi kue hanjeli sehat.' },

      // Public Services
      { id: 'spbu-1', name: 'SPBU Shell Pertamina Ciemas', x: 50, y: 60, type: 'gas', description: 'Stasiun Pengisian Bahan Bakar terdekat.' },
      { id: 'atm-1', name: 'Unit ATM Bersama Mandiri & BJS', x: 65, y: 70, type: 'atm', description: 'Penarikan tunai kartu debit & kredit.' },
      { id: 'rs-1', name: 'Puskesmas Rawat Inap Ciemas', x: 52, y: 65, type: 'hospital', description: 'Unit pelayanan medis darurat 24 jam.' },
      { id: 'sec-1', name: 'Pos Polairud keamanan Geopark', x: 22, y: 25, type: 'security', description: 'Pos pengamanan wisata Pantai & Basarnas.' }
    ];
    return customNodes;
  }, []);

  // Filtered nodes to show
  const visibleNodes = mapNodes.filter(node => activeLayers.includes(node.type));

  // Routing calculation
  const routeCalculation = useMemo(() => {
    const startNode = mapNodes.find(n => n.id === selectedStart);
    const endNode = mapNodes.find(n => n.id === selectedEnd);
    if (!startNode || !endNode) return null;

    // Standard Euclidean distance on 100x100 grid multiplied by factor for conversion to KM (~0.32 Km per unit grid)
    const dx = startNode.x - endNode.x;
    const dy = startNode.y - endNode.y;
    const distanceVal = Math.sqrt(dx * dx + dy * dy) * 0.35; // Km
    
    // Estimations: Motorcycle takes ~1.5 mins per km, Car takes ~2 mins per km due to winding Geopark roads
    const timeValMinutes = Math.round(distanceVal * 1.8);
    
    // Estimations for fuel prices in IDR: ~12,000 IDR per 10 Km (BBM)
    const fuelCost = Math.round((distanceVal / 10) * 14000);

    return {
      distance: Number(distanceVal.toFixed(1)),
      time: timeValMinutes,
      fuel: fuelCost,
      startCoord: { x: startNode.x, y: startNode.y },
      endCoord: { x: endNode.x, y: endNode.y }
    };
  }, [selectedStart, selectedEnd, mapNodes]);

  // Handler to simulate GPS car pathing along the line
  const handleSimulateGPS = () => {
    if (gpsSimulating) return;
    setGpsSimulating(true);
    setSimProgress(0);

    const timer = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setGpsSimulating(false);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
  };

  // Interpolated car coordinates along the line
  const vehiclePos = useMemo(() => {
    if (!routeCalculation) return { x: 50, y: 50 };
    const p = simProgress / 100;
    const x = routeCalculation.startCoord.x + (routeCalculation.endCoord.x - routeCalculation.startCoord.x) * p;
    const y = routeCalculation.startCoord.y + (routeCalculation.endCoord.y - routeCalculation.startCoord.y) * p;
    return { x, y };
  }, [simProgress, routeCalculation]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="peta-interaktif-container">
      {/* Sidebar Controls (4 columns) */}
      <div className="lg:col-span-4 space-y-6">
        {/* Layer Manager Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <h3 className="font-heading font-extrabold text-slate-800 text-sm uppercase tracking-wide flex items-center gap-1.5">
            <Compass className="w-4.5 h-4.5 text-sky-500" />
            Layer Pariwisata GIS
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Aktifkan layer peta GIS di bawah ini untuk melihat ketersediaan fasilitas sekitar Geopark Ciletuh:
          </p>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'attraction', label: '📍 Obyek Wisata', color: 'bg-sky-500' },
              { id: 'hotel', label: '🏨 Homestay/Resort', color: 'bg-emerald-500' },
              { id: 'dining', label: '🍽️ Kuliner Lokal', color: 'bg-orange-500' },
              { id: 'gas', label: '🚗 SPBU Bensin', color: 'bg-red-500' },
              { id: 'atm', label: '💵 Mesin ATM', color: 'bg-indigo-500' },
              { id: 'hospital', label: '🏥 Rumah Sakit', color: 'bg-rose-500' },
              { id: 'security', label: '🛡️ Pos Keamanan', color: 'bg-slate-700' },
            ].map(layer => (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all border ${
                  activeLayers.includes(layer.id)
                    ? 'bg-slate-50 border-slate-200 text-slate-800 font-bold'
                    : 'bg-white border-slate-100 text-slate-400 font-normal'
                }`}
                id={`layer_toggle_${layer.id}`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${activeLayers.includes(layer.id) ? layer.color : 'bg-slate-200 animate-none'}`}></span>
                <span className="truncate">{layer.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* GPS Routing Simulator Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <h3 className="font-heading font-extrabold text-slate-800 text-sm uppercase tracking-wide flex items-center gap-1.5">
            <Navigation className="w-4.5 h-4.5 text-emerald-500" />
            Simulator Rute Tercepat
          </h3>

          <div className="space-y-3 font-sans">
            <div>
              <label className="text-[10px] text-slate-450 uppercase block mb-1">Titik Awal (Start Point)</label>
              <select
                value={selectedStart}
                onChange={(e) => setSelectedStart(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800"
                id="route_start_select"
              >
                {mapNodes.map(node => (
                  <option key={node.id} value={node.id}>{node.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-450 uppercase block mb-1">Destinasi Akhir (End Point)</label>
              <select
                value={selectedEnd}
                onChange={(e) => setSelectedEnd(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800"
                id="route_end_select"
              >
                {mapNodes.map(node => (
                  <option key={node.id} value={node.id}>{node.name}</option>
                ))}
              </select>
            </div>

            {routeCalculation && (
              <div className="bg-emerald-50/50 p-4 border border-emerald-100 rounded-xl space-y-3 text-xs">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-ui uppercase">Jarak</span>
                    <span className="font-heading font-extrabold text-slate-800 text-sm">{routeCalculation.distance} KM</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-ui uppercase">Waktu Tempuh</span>
                    <span className="font-heading font-extrabold text-slate-800 text-sm">~{routeCalculation.time} Mnt</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-ui uppercase">BBM Realistis</span>
                    <span className="font-heading font-bold text-slate-800 text-sm">{routeCalculation.fuel === 0 ? 'Rp 0' : `Rp ${routeCalculation.fuel.toLocaleString('id-ID')}`}</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 text-center italic border-t border-slate-100 pt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  Rute melewati sabuk jalan anyar Geopark Sabuk Ciletuh beraspar mulus.
                </div>

                <button
                  onClick={handleSimulateGPS}
                  disabled={gpsSimulating}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-ui font-extrabold text-white transition-all shadow-md ${
                    gpsSimulating
                      ? 'bg-emerald-400 cursor-not-allowed shadow-none'
                      : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100'
                  }`}
                  id="simulate_gps_btn"
                >
                  {gpsSimulating ? 'Mensimulasikan Jejak GPS...' : 'Simulasikan Navigasi GPS'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-Screen Stylized SVG Geographical GIS Map Console (8 columns) */}
      <div className="lg:col-span-8 bg-slate-900 rounded-2xl p-4 border border-slate-800 relative shadow-inner h-[500px] overflow-hidden flex flex-col justify-between select-none">
        {/* Map Header overlay */}
        <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <div className="relative">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <h4 className="text-white text-xs font-heading font-extrabold uppercase tracking-wide">Peta Satelit GIS Interaktif</h4>
            <span className="text-[10px] text-slate-400">Geopark Ciletuh Map Console v3.1</span>
          </div>
        </div>

        {/* Legend Overlay on Right bottom */}
        <div className="absolute bottom-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-[10px] text-slate-300 space-y-1 block max-h-40 overflow-y-auto">
          <span className="font-bold text-white block uppercase mb-1 border-b border-slate-800 pb-1">Legend</span>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500"></span> Attraction Spot</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Lodging/Hotel</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Seafood Resto</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> SPBU Gas</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Unit ATM</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Emergency Hospital</div>
        </div>

        {/* Map Board SVG Area */}
        <div className="relative flex-1 w-full h-full mt-10">
          <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Background grids styling */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />

            {/* Simulated Ocean and Beachline Coast */}
            <path
              d="M 0,10 C 20,15 25,30 30,50 C 35,70 20,85 0,95 L 0,100 L 100,100 L 100,0 L 0,0 Z"
              fill="#0F172A"
              stroke="#1E293B"
              strokeWidth="0.8"
            />
            {/* Outline Beach Sand Area */}
            <path
              d="M 0,10 C 20,15 25,30 30,50 C 35,70 20,85 0,95"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1.2"
              strokeDasharray="1,1"
              opacity="0.4"
            />

            {/* Mountain decor curves to represent Amphitheatre walls */}
            <path
              d="M 45,20 Q 60,30 85,15 Q 90,40 65,45 Q 75,70 95,90"
              fill="none"
              stroke="rgba(16,185,129,0.15)"
              strokeWidth="3"
            />

            {/* Custom Interactive Route Connector dashed line */}
            {routeCalculation && (
              <>
                <line
                  x1={routeCalculation.startCoord.x}
                  y1={routeCalculation.startCoord.y}
                  x2={routeCalculation.endCoord.x}
                  y2={routeCalculation.endCoord.y}
                  stroke="#10B981"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                  className="animate-pulse"
                />
                <circle cx={routeCalculation.startCoord.x} cy={routeCalculation.startCoord.y} r="1.5" fill="#EF4444" className="animate-ping" />
                <circle cx={routeCalculation.endCoord.x} cy={routeCalculation.endCoord.y} r="1.5" fill="#EF4444" />
              </>
            )}

            {/* Navigating vehicle simulation DOT */}
            {gpsSimulating && (
              <g transform={`translate(${vehiclePos.x}, ${vehiclePos.y})`}>
                <circle r="2.2" fill="#F97316" className="animate-ping" />
                <circle r="1" fill="#FFFFFF" />
              </g>
            )}
          </svg>

          {/* Interactive Plot Nodes overlay (Standard HTML overlay for ease of clicks, positioning via absolute percentages) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {visibleNodes.map((node) => {
              const isActiveRoute = node.id === selectedStart || node.id === selectedEnd;
              return (
                <div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group mt-2"
                  id={`node_${node.id}`}
                >
                  {/* Pin Dot indicator */}
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-125 ${
                    node.type === 'attraction' ? 'bg-sky-500 ring-2 ring-white' :
                    node.type === 'hotel' ? 'bg-emerald-500 ring-2 ring-white' :
                    node.type === 'dining' ? 'bg-orange-500 ring-2 ring-white' :
                    node.type === 'gas' ? 'bg-red-500 ring-2 ring-white' :
                    node.type === 'atm' ? 'bg-indigo-500 ring-2 ring-white' :
                    node.type === 'hospital' ? 'bg-rose-500 ring-2 ring-white' :
                    'bg-slate-700 ring-2 ring-white'
                  } ${isActiveRoute ? 'ring-yellow-400 scale-125' : ''}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </div>

                  {/* Popover Hover Card */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 text-white border border-slate-850 p-2.5 rounded-xl w-44 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-[10px] space-y-1 shadow-2xl z-40">
                    <span className="font-heading font-extrabold block text-white truncate">{node.name}</span>
                    <p className="text-slate-450 line-clamp-2 leading-tight">{node.description}</p>
                    <span className="text-[8px] bg-slate-800 text-[rgba(255,255,255,0.7)] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider float-right">{node.type}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Console footer detail display */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between text-xs text-slate-350 z-10 font-sans gap-2 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            <span>Rute Aktif: <strong className="text-white">{(mapNodes.find(n => n.id === selectedStart)?.name || selectedStart)}</strong> menuju <strong className="text-white">{(mapNodes.find(n => n.id === selectedEnd)?.name || selectedEnd)}</strong></span>
          </div>
          <div className="text-[10px] text-slate-400">
            *Peta ini menggunakan koordinat murni dari sistem satelit GIS untuk simulasi jalur.
          </div>
        </div>
      </div>
    </div>
  );
}
