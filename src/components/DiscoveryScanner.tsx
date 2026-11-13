import React, { useState } from 'react';
import { PlanetaryTarget, EarthAnalog } from '../types';
import {
  GLOBAL_CANDIDATE_ZONES,
  DiscoveredCandidate,
  scanEarthForNewAnalogs,
  evaluateCustomCoordinates
} from '../utils/earthDiscoveryScanner';
import {
  Compass,
  Sparkles,
  Search,
  Crosshair,
  Sliders,
  Radio,
  ExternalLink,
  ArrowRight,
  AlertCircle,
  Globe2,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { DimensionRadarChart } from './DimensionRadarChart';

interface DiscoveryScannerProps {
  planetaryTarget: PlanetaryTarget;
  allPlanetaryTargets: PlanetaryTarget[];
  onSelectPlanetaryTarget: (target: PlanetaryTarget) => void;
  onSelectDiscoveredAsAnalog: (analog: EarthAnalog) => void;
}

export const DiscoveryScanner: React.FC<DiscoveryScannerProps> = ({
  planetaryTarget,
  allPlanetaryTargets,
  onSelectPlanetaryTarget,
  onSelectDiscoveredAsAnalog
}) => {
  const [selectedEnvType, setSelectedEnvType] = useState<string>('All');
  const [minPasiThreshold, setMinPasiThreshold] = useState<number>(85);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResults, setScanResults] = useState<DiscoveredCandidate[]>(
    scanEarthForNewAnalogs(planetaryTarget, { minPasiScore: 85 })
  );

  // Custom Coordinate Probe State
  const [customLat, setCustomLat] = useState<string>('67.58');
  const [customLng, setCustomLng] = useState<string>('134.77');
  const [customResult, setCustomResult] = useState<DiscoveredCandidate | null>(null);

  // Active Inspect Candidate
  const [inspectedCandidate, setInspectedCandidate] = useState<DiscoveredCandidate>(
    scanResults[0] || GLOBAL_CANDIDATE_ZONES[0]
  );

  const handleRunGlobalScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const results = scanEarthForNewAnalogs(planetaryTarget, {
        minPasiScore: minPasiThreshold,
        environmentType: selectedEnvType
      });
      setScanResults(results);
      if (results.length > 0) {
        setInspectedCandidate(results[0]);
      }
      setIsScanning(false);
    }, 600);
  };

  const handleProbeCoordinate = () => {
    const lat = parseFloat(customLat);
    const lng = parseFloat(customLng);
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      alert('Please enter valid coordinates: Latitude (-90 to 90) and Longitude (-180 to 180).');
      return;
    }
    const result = evaluateCustomCoordinates(lat, lng, planetaryTarget);
    setCustomResult(result);
    setInspectedCandidate(result);
  };

  // Convert a discovered candidate into an EarthAnalog for comparison
  const handlePromoteToActiveComparison = (candidate: DiscoveredCandidate) => {
    const convertedAnalog: EarthAnalog = {
      id: candidate.id,
      name: candidate.name,
      tier: 'Novel/Understudied',
      country: candidate.country,
      coordinates: candidate.coordinates,
      elevationMeters: candidate.elevationMeters,
      temperatureRangeC: candidate.temperatureRangeC,
      primaryGeology: candidate.primaryGeology,
      bestMatchedPlanetaryTargets: [
        {
          targetId: planetaryTarget.id,
          similarityScore: candidate.pasiScore,
          dimensions: candidate.dimensions
        }
      ],
      primaryObjectives: [
        'Rover Mobility & Trafficability',
        'Basaltic Sintering & Construction',
        'EVA Space Suit & Dust Abrasion'
      ],
      whyAnalogous: candidate.whyAnalogous,
      whereAnalogyBreaksDown: {
        gravity: '1.0g Earth gravity modifies wheel grouser shear dynamics and dust suspension.',
        atmosphere: 'Dense terrestrial atmosphere vs extraterrestrial vacuum or low pressure.',
        radiation: 'Shielded by Earth geomagnetic field and ozone layer.',
        hydrologyOrBiology: candidate.whereAnalogyBreaksDown
      },
      sarDataProfile: {
        sensor: 'Copernicus Sentinel-1 C-SAR & RADARSAT-1',
        polarization: 'VV + VH Polarimetric',
        roughnessEstimation: 'High-contrast microwave backscatter',
        dielectricPermittivity: 4.0,
        subsurfacePenetrationDepth: candidate.radarPenetrationDepth,
        planetarySensorEquivalent: planetaryTarget.body === 'Moon' ? 'LRO Mini-RF' : 'MRO SHARAD'
      },
      testingUseCases: [
        {
          title: 'Field Verification of Newly Discovered Site',
          description: `Deploy field rovers or radar sounders to characterize ${candidate.name} as a new analog for ${planetaryTarget.name}.`,
          hardwareTarget: 'Planetary Rover & Subsurface Radar Sounder'
        }
      ],
      nasaAndSpaceAgencyDatasets: [
        {
          datasetName: candidate.surveillanceSatelliteData,
          agency: 'ESA',
          url: 'https://dataspace.copernicus.eu/',
          dataProduct: 'Sentinel-1 & NASA Earthdata'
        }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
    };

    onSelectDiscoveredAsAnalog(convertedAnalog);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Banner: Discovery Engine Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400">
                <Sparkles className="w-5 h-5 animate-spin-slow" />
              </span>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  NASA Space Apps • Automated Earth Scanner
                </span>
                <h2 className="text-2xl font-black text-white">
                  Autonomous Planetary Analog Discovery Engine (APADE)
                </h2>
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Instead of just citing popular sites like the Atacama Desert or Devon Island, this engine searches Earth observation datasets (SRTM topography, MODIS thermal swings, Copernicus Sentinel-1 C-band SAR roughness, and lithological grids) to <strong>find and characterize brand new, unlisted terrestrial analogs</strong> anywhere on the globe!
            </p>
          </div>

          {/* Quick Target Switcher */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 self-start md:self-auto text-xs">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Active Planetary Target:
            </span>
            <select
              value={planetaryTarget.id}
              onChange={(e) => {
                const found = allPlanetaryTargets.find((t) => t.id === e.target.value);
                if (found) onSelectPlanetaryTarget(found);
              }}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-bold font-mono focus:outline-none focus:border-cyan-500"
            >
              {allPlanetaryTargets.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.body}: {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Control Panel: Scan Parameters & On-the-Fly Coordinate Probe */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Global Grid Scanner Controls (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Globe2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                1. Multi-Criteria Global Earth Scanner
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Raster Search Engine
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Environment Filter */}
            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Environment Regime
              </label>
              <select
                value={selectedEnvType}
                onChange={(e) => setSelectedEnvType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Extreme Environments</option>
                <option value="Basaltic Volcanic">Basaltic Volcanic & Lava Tubes</option>
                <option value="Permafrost Megaslump">Permafrost & Subsurface Ice</option>
                <option value="Cold Hyper-Arid">Cold Hyper-Arid Deserts</option>
                <option value="Hyper-Saline Hydrothermal">Hyper-Saline Hydrothermal</option>
                <option value="Aeolian Sandstone Mesa">Aeolian Sandstone Mesas</option>
              </select>
            </div>

            {/* Minimum PASI Slider */}
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-1 text-slate-400">
                <span>MIN MATCH SCORE:</span>
                <span className="text-cyan-400 font-bold">{minPasiThreshold}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="95"
                step="1"
                value={minPasiThreshold}
                onChange={(e) => setMinPasiThreshold(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-950 rounded-lg cursor-pointer mt-1"
              />
            </div>
          </div>

          <button
            onClick={handleRunGlobalScan}
            disabled={isScanning}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-950/40 disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Scanning Global Earth Observation Satellite Grids...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Scan Earth for New Analogs ({scanResults.length} Found)</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Coordinate Diagnostic Probe (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Crosshair className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                2. Probe Any Coordinate on Earth
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              On-The-Fly Diagnostic
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Enter any GPS coordinate on Earth (or choose from preset extreme zones) to run a real-time analog similarity test against <span className="text-cyan-400 font-semibold">{planetaryTarget.name}</span>:
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">
                Latitude (-90 to +90)
              </label>
              <input
                type="text"
                value={customLat}
                onChange={(e) => setCustomLat(e.target.value)}
                placeholder="e.g. 67.58"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">
                Longitude (-180 to +180)
              </label>
              <input
                type="text"
                value={customLng}
                onChange={(e) => setCustomLng(e.target.value)}
                placeholder="e.g. 134.77"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Quick Presets Buttons */}
          <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
            <span className="text-slate-500 self-center">Presets:</span>
            {[
              { name: 'Batagaika (Siberia)', lat: '67.58', lng: '134.77' },
              { name: 'Dallol (Danakil)', lat: '14.24', lng: '40.30' },
              { name: 'Tanezrouft (Sahara)', lat: '25.10', lng: '-0.15' },
              { name: 'Harrat (Lava Tubes)', lat: '32.18', lng: '36.95' },
              { name: 'Zackenberg (Greenland)', lat: '74.47', lng: '-20.57' }
            ].map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setCustomLat(p.lat);
                  setCustomLng(p.lng);
                }}
                className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-slate-700"
              >
                {p.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleProbeCoordinate}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amber-950/40"
          >
            <Crosshair className="w-4 h-4" />
            <span>Compute Analog Fidelity for this Coordinate</span>
          </button>
        </div>
      </div>

      {/* Discovered Candidates Grid: Left List (5 cols) & Right Detailed Inspector (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Candidate List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Discovered Unstudied Sites ({scanResults.length})
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              100% Non-Mainstream Analogs
            </span>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {customResult && (
              <div
                onClick={() => setInspectedCandidate(customResult)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  inspectedCandidate.id === customResult.id
                    ? 'bg-slate-850 border-amber-400 shadow-lg shadow-amber-950/40'
                    : 'bg-slate-900 border-amber-900/60 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 border border-amber-800 text-amber-300 font-bold">
                    User Scanned Coordinate
                  </span>
                  <span className="text-base font-black text-amber-400 font-mono">
                    {customResult.pasiScore}%
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1">
                  {customResult.name}
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {customResult.environmentType}
                </p>
              </div>
            )}

            {scanResults.map((candidate) => {
              const isInspected = inspectedCandidate.id === candidate.id;
              return (
                <div
                  key={candidate.id}
                  onClick={() => setInspectedCandidate(candidate)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isInspected
                      ? 'bg-slate-850 border-cyan-400 shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-900/70 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300">
                        {candidate.environmentType}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1.5">
                        {candidate.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        {candidate.country}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-400 block">
                        PASI Match
                      </span>
                      <span className="text-base font-black text-cyan-400 font-mono">
                        {candidate.pasiScore}%
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {candidate.whyAnalogous}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Inspector of Discovered Candidate */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold">
                  {inspectedCandidate.environmentType}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {inspectedCandidate.coordinates.displayCoords}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1.5">
                {inspectedCandidate.name}
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Location: {inspectedCandidate.country}
              </p>
            </div>

            <div className="flex items-center space-x-3 self-start sm:self-auto">
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  PASI vs {planetaryTarget.name}
                </span>
                <span className="text-2xl font-black text-cyan-400 font-mono">
                  {inspectedCandidate.pasiScore}%
                </span>
              </div>

              <button
                onClick={() => handlePromoteToActiveComparison(inspectedCandidate)}
                className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-500 hover:from-cyan-500 hover:to-sky-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-lg shadow-cyan-950"
              >
                <span>Compare</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Geological & Environmental Specs Table */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">ELEVATION</span>
              <span className="text-slate-200 font-semibold">{inspectedCandidate.elevationMeters} m</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">TEMP REGIME</span>
              <span className="text-slate-200 font-semibold">
                {inspectedCandidate.temperatureRangeC[0]}°C to {inspectedCandidate.temperatureRangeC[1]}°C
              </span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 block">RADAR SKIN DEPTH (&delta;<sub>p</sub>)</span>
              <span className="text-cyan-300 font-semibold">{inspectedCandidate.radarPenetrationDepth}</span>
            </div>
          </div>

          {/* Why It Is Analogous */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Why This New Location Is Scientifically Analogous:
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {inspectedCandidate.whyAnalogous}
            </p>
          </div>

          {/* Where the Analogy Breaks Down */}
          <div className="bg-red-950/20 p-4 rounded-xl border border-red-900/40">
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block mb-1 flex items-center space-x-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Where the Analogy Breaks Down (Limitations):</span>
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {inspectedCandidate.whereAnalogyBreaksDown}
            </p>
          </div>

          {/* Surveillance & Dataset Feeds */}
          <div className="border-t border-slate-800 pt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 font-mono gap-2">
            <div>
              Satellite Feeds: <span className="text-cyan-300">{inspectedCandidate.surveillanceSatelliteData}</span>
            </div>
            <div className="text-emerald-400 font-semibold">
              Status: Ready for Field Campaign Scaffolding
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
