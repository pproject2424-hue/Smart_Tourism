import React, { useState, useEffect } from 'react';
import { Camera, Eye, Volume2, Video, Sparkles, ShieldAlert, Play, Pause, Maximize, RotateCcw } from 'lucide-react';
import { initialVirtualTours } from '../data';

export default function VirtualTour() {
  const [selectedTour, setSelectedTour] = useState(initialVirtualTours[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(15);
  const [activeHotspot, setActiveHotspot] = useState<{title: string, desc: string} | null>(null);
  const [vrModeActive, setVrModeActive] = useState(false);
  const [droneFeedOpen, setDroneFeedOpen] = useState(false);

  // Audio progress animation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleSelectTour = (tour: typeof initialVirtualTours[0]) => {
    setSelectedTour(tour);
    setIsPlayingAudio(false);
    setAudioProgress(10 + Math.floor(Math.random() * 20));
    setActiveHotspot(null);
    setDroneFeedOpen(false);
  };

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-900 shadow-2xl relative overflow-hidden space-y-6" id="virtual-tour-root">
      
      {/* Background radial atmosphere glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Immersive Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-900 pb-5 gap-4">
        <div>
          <span className="text-[10px] text-sky-400 font-ui font-extrabold uppercase tracking-wider bg-sky-950/80 px-2.5 py-1 rounded border border-sky-900/35">
            Immersive Virtual Travel (VR)
          </span>
          <h2 className="text-xl font-heading font-extrabold mt-1.5 flex items-center gap-1.5 text-white">
            <Camera className="w-5.5 h-5.5 text-sky-500" />
            Penjelajahan Virtual 360° Geopark Ciletuh
          </h2>
        </div>

        {/* Action Toggles Toolbar */}
        <div className="flex items-center gap-2">
          {/* Stereoscopic VR Toggle */}
          <button
            onClick={() => setVrModeActive(!vrModeActive)}
            className={`px-3.5 py-2 rounded-xl text-xs font-ui font-extrabold flex items-center gap-1.5 transition-all border ${
              vrModeActive 
                ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300' 
                : 'bg-slate-900 hover:bg-slate-800 text-slate-350 border-slate-850'
            }`}
            id="vr_mode_toggle_btn"
          >
            <Maximize className="w-4 h-4" />
            {vrModeActive ? 'Keluar VR Mode' : 'Aktifkan VR Mode (Stereo)'}
          </button>

          {/* Drone Video Feed Trigger */}
          <button
            onClick={() => setDroneFeedOpen(!droneFeedOpen)}
            className={`px-3.5 py-2 rounded-xl text-xs font-ui font-extrabold flex items-center gap-1.5 transition-all border ${
              droneFeedOpen 
                ? 'bg-orange-500 text-white border-orange-400' 
                : 'bg-slate-900 hover:bg-slate-800 text-slate-350 border-slate-850'
            }`}
            id="drone_video_toggle_btn"
          >
            <Video className="w-4 h-4" />
            Drone Cam Feed
          </button>
        </div>
      </div>

      {/* Select Panorama Spot buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
        {initialVirtualTours.map((tour) => (
          <button
            key={tour.id}
            onClick={() => handleSelectTour(tour)}
            className={`px-3 py-2 rounded-xl text-xs font-ui shrink-0 transition-all border font-semibold ${
              selectedTour.id === tour.id
                ? 'bg-sky-500/10 text-sky-400 border-sky-500/60 shadow-md'
                : 'bg-slate-900 hover:bg-slate-850 text-slate-400 border-slate-900 hover:text-slate-200'
            }`}
            id={`vr_select_${tour.id}`}
          >
            {tour.name.replace(' Virtual 360°', '')}
          </button>
        ))}
      </div>

      {/* Dual Eye Stereoscopic viewer layout vs Standard viewport */}
      <div className={`grid gap-4 ${vrModeActive ? 'grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* Left Sight Screen (or Main Full eye) */}
        <div className="relative aspect-video rounded-2xl border border-slate-850 overflow-hidden bg-slate-950 group select-none">
          {/* Panoramic Asset Cover */}
          <img
            src={selectedTour.image360}
            alt={selectedTour.name}
            className="w-full h-full object-cover filter brightness-[0.75] group-hover:scale-[1.03] duration-5000 ease-linear transform origin-center transition-all"
          />

          {/* Hotspot Overlays */}
          {selectedTour.hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              onClick={() => setActiveHotspot({ title: hotspot.title, desc: hotspot.description })}
              id={`hotspot_${hotspot.id}`}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-6 w-6 rounded-full bg-sky-400 opacity-60 animate-ping"></span>
                <div className="bg-sky-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center border font-ui font-bold text-[8px] hover:scale-130 transition-transform">
                  i
                </div>
              </div>
            </div>
          ))}

          {/* Active Hotspot Bubble Detail box inside viewport */}
          {activeHotspot && (
            <div className="absolute top-4 left-4 z-20 bg-slate-950/95 border border-sky-950/60 max-w-xs p-3.5 rounded-xl text-xs space-y-1 animate-fade-in text-slate-100">
              <span className="font-heading font-extrabold text-sky-400 block border-b border-slate-900 pb-1">{activeHotspot.title}</span>
              <p className="text-slate-350 leading-tight text-[10px]">{activeHotspot.desc}</p>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-[9px] text-slate-500 font-bold hover:text-white pt-1 block"
                id="close_hotspot_bubble_btn"
              >
                Tutup Info
              </button>
            </div>
          )}

          {/* VR Overlay HUD directions indicators */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none flex justify-between px-4 text-xs font-mono text-white/20">
            <span>◄ WEST</span>
            <span>EAST ►</span>
          </div>

          <div className="absolute bottom-4 left-4 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-850 text-[10px] text-slate-350 select-none">
            {selectedTour.name} (360° Simulasi)
          </div>

          {/* Interactive Live Drone Video Stream Box */}
          {droneFeedOpen && (
            <div className="absolute inset-0 bg-slate-950 z-30 flex flex-col justify-between">
              {/* Drone HUD controls */}
              <div className="p-4 bg-gradient-to-b from-slate-950 to-transparent flex items-center justify-between text-[11px] font-mono">
                <span className="text-orange-500 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-650 rounded-full animate-ping"></span>
                  LIVE DRONE CAM FEED [ALT: 120M]
                </span>
                <button
                  onClick={() => setDroneFeedOpen(false)}
                  className="bg-slate-900 text-white border border-slate-800 px-2 py-0.5 rounded text-[10px]"
                >
                  Close Cam
                </button>
              </div>

              {/* Simulated Drone Video */}
              <div className="flex-1 w-full flex items-center justify-center text-center p-6 bg-slate-950">
                <div className="space-y-3 max-w-sm">
                  <Camera className="w-10 h-10 text-sky-500 mx-auto animate-pulse" />
                  <span className="text-xs text-white uppercase font-bold tracking-widest block font-heading">Kamera Udara Geopark Ciletuh</span>
                  <p className="text-[10px] text-slate-400">
                    Menampilkan feed video helikopter/drone real-time resolusi 4K melintasi tebing amblasan batuan graben Panenjoan Sukabumi.
                  </p>
                  <video
                    src={selectedTour.droneVideoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full max-w-xs rounded-xl border border-slate-850 aspect-video mx-auto object-cover"
                  />
                </div>
              </div>

              <div className="p-2 text-center text-[10px] font-mono text-slate-500 border-t border-slate-900">
                PITCH: -15° | YAW: 102° | SPEED: 14 KM/H | GPS: LOCK SUCCESS
              </div>
            </div>
          )}
        </div>

        {/* Right Sight Eye (Only appears in VR stereo Mode) */}
        {vrModeActive && (
          <div className="relative aspect-video rounded-2xl border border-slate-850 overflow-hidden bg-slate-950 select-none animate-fade-in">
            <img
              src={selectedTour.image360}
              alt="Stereo Sight Right"
              className="w-full h-full object-cover filter brightness-[0.75] scale-[1.03]"
            />
            {/* Duplicate indicators */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none flex justify-between px-4 text-xs font-mono text-white/20">
              <span>◄ WEST</span>
              <span>EAST ►</span>
            </div>
            <div className="absolute bottom-4 left-4 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-850 text-[10px] text-slate-350">
              Lensa Kanan (Stereoskopis)
            </div>
          </div>
        )}
      </div>

      {/* Guide & Acoustic Audio Narrator Section */}
      <div className="bg-slate-900 rounded-2xl border border-slate-850/85 p-5 flex flex-col md:flex-row items-center justify-between gap-5 font-sans">
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Narrator Play Button */}
          <button
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-600 shadow-lg shrink-0 flex items-center justify-center text-white font-bold transition-all"
            id="narrator_audio_play_btn"
          >
            {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <div>
            <span className="text-[10px] text-slate-450 uppercase tracking-widest block font-bold">Pemandu Suara AI (Audio Guide)</span>
            <span className="text-xs font-heading font-extrabold text-white">Aki Ciletuh Narrator Virtual</span>
            
            {/* Acoustic Bars simulation */}
            <div className="flex items-center gap-1.5 mt-2">
              <Volume2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <div className="flex items-end gap-0.5 h-3.5">
                {[5, 8, 12, 10, 4, 15, 6, 12, 8, 4, 14, 10, 6, 3, 11, 7, 13, 9, 3].map((barVal, idx) => (
                  <span
                    key={idx}
                    style={{
                      height: isPlayingAudio ? `${barVal * 0.9 + 2}px` : '3px',
                      opacity: isPlayingAudio ? 1 : 0.4
                    }}
                    className="w-0.5 bg-sky-400 rounded-full transition-all duration-300 transform origin-bottom"
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-sm w-full bg-slate-950 px-4 py-3 rounded-xl border border-slate-850/60 text-[11px] text-slate-400 leading-normal">
          "{selectedTour.description.substring(0, 150)}..."
        </div>
      </div>
    </div>
  );
}
