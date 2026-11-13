import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { EarthAnalog, PlanetaryTarget, AnalogTier, ExplorationObjective } from '../types';
import { MapPin, Search, Filter, Sparkles, Layers, Info, ExternalLink, ArrowRight } from 'lucide-react';
import { DimensionRadarChart } from './DimensionRadarChart';

interface MapViewerProps {
  analogs: EarthAnalog[];
  selectedAnalog: EarthAnalog;
  onSelectAnalog: (analog: EarthAnalog) => void;
  activePlanetaryTarget: PlanetaryTarget;
  onOpenComparison: () => void;
}

export const MapViewer: React.FC<MapViewerProps> = ({
  analogs,
  selectedAnalog,
  onSelectAnalog,
  activePlanetaryTarget,
  onOpenComparison
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'All' | AnalogTier>('All');
  const [objectiveFilter, setObjectiveFilter] = useState<string>('All');

  // Filter analogs
  const filteredAnalogs = analogs.filter((analog) => {
    const matchesSearch =
      analog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analog.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analog.primaryGeology.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier = tierFilter === 'All' || analog.tier === tierFilter;
    const matchesObjective =
      objectiveFilter === 'All' ||
      analog.primaryObjectives.includes(objectiveFilter as ExplorationObjective);

    return matchesSearch && matchesTier && matchesObjective;
  });

  // Find match score for currently selected planetary target
  const activeMatch = selectedAnalog.bestMatchedPlanetaryTargets.find(
    (m) => m.targetId === activePlanetaryTarget.id
  ) || selectedAnalog.bestMatchedPlanetaryTargets[0];

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    const map = L.map(mapContainerRef.current, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 14,
      zoomControl: true,
      attributionControl: true
    });

    // Satellite imagery base layer (Esri World Imagery)
    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics, USDA, USGS',
        maxZoom: 17
      }
    );

    // Dark carto layer for high-contrast geospatial boundaries
    const darkLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; CartoDB & OpenStreetMap contributors',
        maxZoom: 19
      }
    );

    satelliteLayer.addTo(map);

    L.control.layers(
      {
        'Satellite Imagery (Esri)': satelliteLayer,
        'Dark Planetary (CartoDB)': darkLayer
      },
      undefined,
      { position: 'topright' }
    ).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    filteredAnalogs.forEach((analog) => {
      const isSelected = analog.id === selectedAnalog.id;
      const isNovel = analog.tier === 'Novel/Understudied';

      const match = analog.bestMatchedPlanetaryTargets.find(
        (m) => m.targetId === activePlanetaryTarget.id
      ) || analog.bestMatchedPlanetaryTargets[0];

      // Custom HTML Marker Icon
      const markerHtml = `
        <div class="relative group cursor-pointer">
          <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-transform duration-300 ${
            isSelected
              ? 'scale-125 ring-4 ring-cyan-400 bg-cyan-500 text-slate-950 font-black'
              : isNovel
              ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 ring-2 ring-emerald-300'
              : 'bg-gradient-to-tr from-amber-500 to-orange-400 text-slate-950 ring-2 ring-amber-300'
          }">
            ${Math.round(match.similarityScore)}
          </div>
          ${
            isNovel
              ? '<span class="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-slate-900 animate-ping"></span>'
              : ''
          }
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-analog-marker',
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([analog.coordinates.lat, analog.coordinates.lng], {
        icon: customIcon
      }).addTo(map);

      marker.on('click', () => {
        onSelectAnalog(analog);
      });

      markersRef.current[analog.id] = marker;
    });
  }, [filteredAnalogs, selectedAnalog.id, activePlanetaryTarget.id, onSelectAnalog]);

  // Pan to selected analog when selection changes
  const panToAnalog = (analog: EarthAnalog) => {
    onSelectAnalog(analog);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([analog.coordinates.lat, analog.coordinates.lng], 5, {
        duration: 1.2
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Left Column: Filter Sidebar & Site List (5 cols) */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        {/* Active Target Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-400">
              Active Planetary Target
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 border border-cyan-800 text-cyan-300">
              {activePlanetaryTarget.body.toUpperCase()}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            {activePlanetaryTarget.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {activePlanetaryTarget.location}
          </p>
          <div className="mt-3 flex items-center justify-between text-xs border-t border-slate-800/80 pt-2.5">
            <span className="text-slate-400">Mission Focus:</span>
            <span className="font-semibold text-slate-200">
              {activePlanetaryTarget.missionContext}
            </span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by site, country, geology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Tier Filter */}
            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Classification Tier
              </label>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Tiers ({analogs.length})</option>
                <option value="Novel/Understudied">Novel & Understudied Sites</option>
                <option value="Benchmark">Benchmark Sites (Atacama/HMP)</option>
              </select>
            </div>

            {/* Objective Filter */}
            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Mission Objective
              </label>
              <select
                value={objectiveFilter}
                onChange={(e) => setObjectiveFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 truncate"
              >
                <option value="All">All Objectives</option>
                <option value="Rover Mobility & Trafficability">Rover Mobility</option>
                <option value="Cryogenic Ice & Drilling (ISRU)">Cryo Ice & Drilling</option>
                <option value="Subsurface Shelter & Lava Tubes">Lava Tubes / Shelter</option>
                <option value="Basaltic Sintering & Construction">Basalt Sintering</option>
                <option value="EVA Space Suit & Dust Abrasion">EVA Suit Testing</option>
                <option value="Astrobiology & Biosignature Detection">Astrobiology</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scrollable Analog Cards List */}
        <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
          {filteredAnalogs.map((analog) => {
            const isSelected = analog.id === selectedAnalog.id;
            const match = analog.bestMatchedPlanetaryTargets.find(
              (m) => m.targetId === activePlanetaryTarget.id
            ) || analog.bestMatchedPlanetaryTargets[0];

            return (
              <div
                key={analog.id}
                onClick={() => panToAnalog(analog)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'bg-slate-850 border-cyan-500/80 shadow-lg shadow-cyan-950/40'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          analog.tier === 'Novel/Understudied'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {analog.tier}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {analog.country}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                      {analog.name}
                    </h4>
                  </div>

                  {/* Match Score Badge */}
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400 block">
                      PASI Score
                    </span>
                    <span className="text-base font-black text-cyan-400 font-mono">
                      {Math.round(match.similarityScore)}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {analog.whyAnalogous}
                </p>

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{analog.coordinates.displayCoords}</span>
                  <span className="text-cyan-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Interactive Map & Live Inspector (7 cols) */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        {/* Leaflet Map Card */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 h-[380px] sm:h-[440px]">
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Map Overlay Badge */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-lg">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-200">
                Global Terrestrial Analogs • High-Res Earth Observation
              </span>
            </div>
          </div>
        </div>

        {/* Selected Site Detail Inspector Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold ${
                    selectedAnalog.tier === 'Novel/Understudied'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {selectedAnalog.tier} Analog
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedAnalog.country} • {selectedAnalog.coordinates.displayCoords}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {selectedAnalog.name}
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Primary Geology: {selectedAnalog.primaryGeology}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Match vs {activePlanetaryTarget.name}
                </span>
                <span className="text-2xl font-black text-cyan-400 font-mono">
                  {activeMatch.similarityScore}%
                </span>
              </div>
              <button
                onClick={onOpenComparison}
                className="bg-gradient-to-r from-cyan-600 to-sky-500 hover:from-cyan-500 hover:to-sky-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shadow-cyan-950"
              >
                <span>Deep Compare</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Scientific Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-1">
            {/* Left: Scientific Justification */}
            <div className="space-y-3">
              <div>
                <h5 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                  Why It Is Analogous
                </h5>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {selectedAnalog.whyAnalogous}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-mono font-semibold text-red-400 uppercase tracking-wider">
                  Key Terrestrial Limitation (Breakdown)
                </h5>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {selectedAnalog.whereAnalogyBreaksDown.gravity}
                </p>
              </div>
            </div>

            {/* Right: Radar Chart Visualization */}
            <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 flex flex-col items-center justify-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                Multi-Dimensional Similarity Radar (0-100)
              </span>
              <DimensionRadarChart scores={activeMatch.dimensions} size={220} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
