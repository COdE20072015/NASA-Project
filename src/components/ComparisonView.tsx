import React, { useState } from 'react';
import { PlanetaryTarget, EarthAnalog, ExplorationObjective } from '../types';
import { DimensionRadarChart } from './DimensionRadarChart';
import { calculatePASI, DEFAULT_WEIGHTS, OBJECTIVE_PRESET_WEIGHTS, PASIWeights } from '../utils/pasiAlgorithm';
import { ShieldCheck, ShieldAlert, Sliders, RefreshCw, Radio, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

interface ComparisonViewProps {
  planetaryTarget: PlanetaryTarget;
  earthAnalog: EarthAnalog;
  onSelectPlanetaryTarget: (target: PlanetaryTarget) => void;
  allPlanetaryTargets: PlanetaryTarget[];
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  planetaryTarget,
  earthAnalog,
  onSelectPlanetaryTarget,
  allPlanetaryTargets
}) => {
  const [weights, setWeights] = useState<PASIWeights>(DEFAULT_WEIGHTS);
  const [activePreset, setActivePreset] = useState<string>('Default');

  // Find match dimensions
  const match = earthAnalog.bestMatchedPlanetaryTargets.find(
    (m) => m.targetId === planetaryTarget.id
  ) || earthAnalog.bestMatchedPlanetaryTargets[0];

  const currentScore = calculatePASI(match.dimensions, weights);

  const applyPreset = (presetName: string, presetWeights: PASIWeights) => {
    setActivePreset(presetName);
    setWeights(presetWeights);
  };

  const updateWeight = (dim: keyof PASIWeights, val: number) => {
    const newWeights = { ...weights, [dim]: val };
    // Normalize sum to 1.0
    const sum = Object.values(newWeights).reduce((a, b) => a + b, 0);
    if (sum > 0) {
      Object.keys(newWeights).forEach((k) => {
        newWeights[k as keyof PASIWeights] = Math.round((newWeights[k as keyof PASIWeights] / sum) * 100) / 100;
      });
    }
    setWeights(newWeights);
    setActivePreset('Custom');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Target Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
            Planetary Base Candidate to Compare
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {allPlanetaryTargets
              .filter((t) => t.body === planetaryTarget.body)
              .map((target) => (
                <button
                  key={target.id}
                  onClick={() => onSelectPlanetaryTarget(target)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    target.id === planetaryTarget.id
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 shadow-md'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {target.name}
                </button>
              ))}
          </div>
        </div>

        {/* Big Calculated PASI Metric */}
        <div className="flex items-center bg-slate-950 px-5 py-3 rounded-xl border border-slate-800 space-x-4 self-start md:self-auto">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block">
              Multi-Criteria PASI Score
            </span>
            <span className="text-3xl font-black text-cyan-400 font-mono">
              {currentScore}%
            </span>
          </div>
          <div className="text-xs text-slate-400 border-l border-slate-800 pl-4 font-mono">
            <div>Tier: <span className="text-emerald-400 font-semibold">{earthAnalog.tier}</span></div>
            <div>Preset: <span className="text-amber-400 font-semibold">{activePreset}</span></div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Dual Profiles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Planetary Base Profile (Off-World) */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Planetary Base Target ({planetaryTarget.body})
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {planetaryTarget.coordinates.displayCoords}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mt-3">
            {planetaryTarget.name}
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-1">
            {planetaryTarget.missionContext}
          </p>

          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
            {planetaryTarget.description}
          </p>

          {/* Planetary Parameters Table */}
          <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">ELEVATION / RELIEF</span>
              <span className="text-slate-200 font-semibold">{planetaryTarget.elevationMeters} m</span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">TEMPERATURE RANGE</span>
              <span className="text-slate-200 font-semibold">
                {planetaryTarget.temperatureRangeK[0]}K to {planetaryTarget.temperatureRangeK[1]}K
                <span className="text-slate-500 block text-[10px]">
                  ({planetaryTarget.temperatureRangeK[0] - 273}°C to {planetaryTarget.temperatureRangeK[1] - 273}°C)
                </span>
              </span>
            </div>
          </div>

          <div className="mt-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Regolith / Mineralogy</span>
            <p className="text-slate-300 text-xs mt-1 leading-relaxed">
              {planetaryTarget.regolithComposition}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5">
              Open Planetary Datasets (NASA PDS / ESA)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {planetaryTarget.datasetSources.map((ds, i) => (
                <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  {ds}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Terrestrial Earth Analog Profile */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Earth Analog ({earthAnalog.country})
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {earthAnalog.coordinates.displayCoords}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mt-3">
            {earthAnalog.name}
          </h3>
          <p className="text-xs font-mono text-emerald-400 mt-1">
            Classification: {earthAnalog.tier} Terrestrial Testbed
          </p>

          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
            {earthAnalog.whyAnalogous}
          </p>

          {/* Terrestrial Parameters Table */}
          <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">ALTITUDE / ELEVATION</span>
              <span className="text-slate-200 font-semibold">{earthAnalog.elevationMeters} m MSL</span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">SURFACE TEMPERATURE</span>
              <span className="text-slate-200 font-semibold">
                {earthAnalog.temperatureRangeC[0]}°C to {earthAnalog.temperatureRangeC[1]}°C
              </span>
            </div>
          </div>

          <div className="mt-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">SAR Radar Profile (CSA / ESA)</span>
            <p className="text-slate-300 text-xs mt-1">
              Sensor: <span className="text-cyan-300 font-mono">{earthAnalog.sarDataProfile.sensor}</span> ({earthAnalog.sarDataProfile.polarization}) • Dielectric &epsilon;<sub>r</sub> = {earthAnalog.sarDataProfile.dielectricPermittivity}
            </p>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Penetration: {earthAnalog.sarDataProfile.subsurfacePenetrationDepth}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5">
              Satellite Data Products
            </span>
            <div className="flex flex-wrap gap-1.5">
              {earthAnalog.nasaAndSpaceAgencyDatasets.map((ds, i) => (
                <a
                  key={i}
                  href={ds.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300 hover:border-cyan-600 flex items-center space-x-1"
                >
                  <span>{ds.agency}: {ds.dataProduct}</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Analysis: Where the Analogy Holds vs Breaks Down */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h4 className="text-base font-bold text-white">
              Scientific Rigor: Where the Analogy Holds vs Where It Breaks Down
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Required by NASA Space Apps Challenge Criteria
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Gravity Breakdown */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-red-900/30">
            <span className="text-red-400 font-mono font-semibold uppercase block text-[11px] flex items-center space-x-1">
              <span>1. Gravity Discrepancy</span>
            </span>
            <p className="text-slate-300 mt-2 leading-relaxed">
              {earthAnalog.whereAnalogyBreaksDown.gravity}
            </p>
            <div className="mt-2 text-[10px] font-mono text-slate-500">
              Earth: 1.0g • {planetaryTarget.body === 'Moon' ? 'Moon: 0.166g' : 'Mars: 0.38g'}
            </div>
          </div>

          {/* Atmosphere Breakdown */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-900/30">
            <span className="text-amber-400 font-mono font-semibold uppercase block text-[11px] flex items-center space-x-1">
              <span>2. Atmospheric Pressure</span>
            </span>
            <p className="text-slate-300 mt-2 leading-relaxed">
              {earthAnalog.whereAnalogyBreaksDown.atmosphere}
            </p>
            <div className="mt-2 text-[10px] font-mono text-slate-500">
              Earth: ~1013 hPa • {planetaryTarget.body === 'Moon' ? 'Moon: 10⁻¹² hPa (Vacuum)' : 'Mars: ~6 hPa'}
            </div>
          </div>

          {/* Radiation Breakdown */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-900/30">
            <span className="text-sky-400 font-mono font-semibold uppercase block text-[11px] flex items-center space-x-1">
              <span>3. Ionizing Radiation Shielding</span>
            </span>
            <p className="text-slate-300 mt-2 leading-relaxed">
              {earthAnalog.whereAnalogyBreaksDown.radiation}
            </p>
            <div className="mt-2 text-[10px] font-mono text-slate-500">
              Earth: Magnetosphere/Ozone • Off-world: GCR & SPE
            </div>
          </div>

          {/* Hydrology & Biology Breakdown */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-900/30">
            <span className="text-emerald-400 font-mono font-semibold uppercase block text-[11px] flex items-center space-x-1">
              <span>4. Hydrology & Biomes</span>
            </span>
            <p className="text-slate-300 mt-2 leading-relaxed">
              {earthAnalog.whereAnalogyBreaksDown.hydrologyOrBiology}
            </p>
            <div className="mt-2 text-[10px] font-mono text-slate-500">
              Earth: Meteoric cycles & native bacteria
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Weight Tuning & Radar Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dimension Sliders & Presets (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white">
                PASI Objective-Driven Weight Tuning
              </h4>
            </div>
            <button
              onClick={() => {
                setWeights(DEFAULT_WEIGHTS);
                setActivePreset('Default');
              }}
              className="text-xs text-slate-400 hover:text-cyan-400 flex items-center space-x-1 font-mono transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Quick Objective Presets */}
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Select Exploration Mission Objective Preset:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(OBJECTIVE_PRESET_WEIGHTS).map((preset) => (
                <button
                  key={preset}
                  onClick={() =>
                    applyPreset(preset, OBJECTIVE_PRESET_WEIGHTS[preset as ExplorationObjective])
                  }
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono transition-all ${
                    activePreset === preset
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3 pt-2">
            {(
              [
                ['topography', 'Topography & Surface Roughness', match.dimensions.topography],
                ['thermal', 'Thermal & Environmental Extremes', match.dimensions.thermal],
                ['geology', 'Geology, Breccias & Mineralogy', match.dimensions.geology],
                ['cryosphere', 'Cryosphere, Ice & Permafrost', match.dimensions.cryosphere],
                ['sarRadar', 'SAR Radar Backscatter & Dielectric', match.dimensions.sarRadar],
                ['operations', 'Operational & Testing Feasibility', match.dimensions.operations],
              ] as const
            ).map(([key, label, score]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">
                    {label}{' '}
                    <span className="text-cyan-400">({score}/100)</span>
                  </span>
                  <span className="text-slate-400">
                    Weight: {Math.round(weights[key] * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={weights[key]}
                  onChange={(e) => updateWeight(key, parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Polar Radar Chart (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col items-center justify-center">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            Multi-Dimensional Similarity Radar
          </span>
          <DimensionRadarChart scores={match.dimensions} size={260} />
          <div className="mt-3 text-center text-xs text-slate-400 font-mono">
            Overall Similarity:{' '}
            <span className="text-cyan-300 font-bold text-sm">
              {currentScore}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
