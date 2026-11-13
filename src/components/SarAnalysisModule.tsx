import React, { useState } from 'react';
import { EarthAnalog, PlanetaryTarget } from '../types';
import { calculateRadarPenetration } from '../utils/pasiAlgorithm';
import { Radio, Layers, Waves, ArrowDown, Activity, Sparkles, ExternalLink, HelpCircle } from 'lucide-react';

interface SarAnalysisModuleProps {
  selectedAnalog: EarthAnalog;
  planetaryTarget: PlanetaryTarget;
}

export const SarAnalysisModule: React.FC<SarAnalysisModuleProps> = ({
  selectedAnalog,
  planetaryTarget
}) => {
  // Interactive Simulation State
  const [freqGHz, setFreqGHz] = useState<number>(5.3); // RADARSAT-1 C-band default
  const [dielectricPermittivity, setDielectricPermittivity] = useState<number>(
    selectedAnalog.sarDataProfile.dielectricPermittivity || 4.5
  );
  const [lossTangent, setLossTangent] = useState<number>(0.005); // low-loss dry medium

  const penetrationDepthMeters = calculateRadarPenetration(
    freqGHz,
    dielectricPermittivity,
    lossTangent
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
                <Radio className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  Canadian Space Agency (CSA) & ESA Earth Observation
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Synthetic Aperture Radar (SAR) Planetary Analog Lab
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Active microwave remote sensing with <strong>CSA RADARSAT-1</strong> and <strong>ESA Copernicus Sentinel-1</strong> penetrates dry regolith, sand, and polar ice—allowing scientists to map buried crater ejecta, determine surface roughness (RMS height), and locate subsurface permafrost on Earth as a direct testing ground for <strong>LRO Mini-RF</strong> and <strong>Mars SHARAD</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 self-start md:self-auto">
            <a
              href="https://github.com/asc-csa/Synthetic_Aperture_Radar_Tutorial"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 hover:border-cyan-500 text-xs font-mono text-cyan-300 flex items-center space-x-1.5 transition-colors"
            >
              <span>CSA SAR Tutorial Code</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://donnees-data.asc-csa.gc.ca/en/dataset/radarsat1"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 hover:border-cyan-500 text-xs font-mono text-slate-300 flex items-center space-x-1.5 transition-colors"
            >
              <span>RADARSAT-1 Open Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Grid: Interactive Skin Depth Calculator & Sensor Cross-Reference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Skin Depth Calculator (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Waves className="w-5 h-5 text-cyan-400" />
              <h4 className="text-base font-bold text-white">
                Radar Skin Depth & Penetration Simulator
              </h4>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Maxwell Microwave Attenuation Model
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            In hyper-dry or frozen planetary regolith (extremely low loss tangent <span className="font-mono">&tan;&delta;</span>), microwave signals penetrate beneath the surface layer:
            <code className="block my-2 p-2 rounded bg-slate-950 font-mono text-cyan-300 text-xs border border-slate-800">
              &delta;<sub>p</sub> &approx; c / (2&pi; &middot; f &middot; &radic;&epsilon;'<sub>r</sub> &middot; tan&delta;)
            </code>
          </p>

          {/* Interactive Sliders */}
          <div className="space-y-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
            {/* Frequency Selector */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-300">Radar Frequency:</span>
                <span className="text-cyan-400 font-bold">{freqGHz} GHz ({freqGHz === 5.3 ? 'C-Band RADARSAT-1 / Sentinel-1' : freqGHz === 1.25 ? 'L-Band PALSAR / NISAR' : freqGHz === 2.8 ? 'S-Band LRO Mini-RF' : 'HF/VHF Sounder'})</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { name: '0.02 GHz (SHARAD)', f: 0.02 },
                  { name: '1.25 GHz (L-Band)', f: 1.25 },
                  { name: '2.8 GHz (Mini-RF)', f: 2.8 },
                  { name: '5.3 GHz (RADARSAT)', f: 5.3 },
                ].map((item) => (
                  <button
                    key={item.f}
                    onClick={() => setFreqGHz(item.f)}
                    className={`text-[10px] py-1.5 px-2 rounded-lg font-mono border transition-all ${
                      freqGHz === item.f
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dielectric Constant Selector */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Target Relative Permittivity (&epsilon;<sub>r</sub>):</span>
                <span className="text-cyan-400 font-bold">{dielectricPermittivity}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                {[
                  { name: 'Cryo Ice (&epsilon;=3.15)', eps: 3.15 },
                  { name: 'Dry Sand (&epsilon;=2.7)', eps: 2.7 },
                  { name: 'Dense Basalt (&epsilon;=6.2)', eps: 6.2 },
                ].map((mat) => (
                  <button
                    key={mat.eps}
                    onClick={() => setDielectricPermittivity(mat.eps)}
                    className={`text-[10px] py-1.5 px-2 rounded-lg font-mono border transition-all ${
                      dielectricPermittivity === mat.eps
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Loss Tangent Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Loss Tangent (tan &delta;):</span>
                <span className="text-amber-400 font-bold">{lossTangent}</span>
              </div>
              <input
                type="range"
                min="0.001"
                max="0.05"
                step="0.001"
                value={lossTangent}
                onChange={(e) => setLossTangent(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-900 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>0.001 (Pure Ice / Glass)</span>
                <span>0.05 (Moist / Dense Iron)</span>
              </div>
            </div>
          </div>

          {/* Result Output Callout */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 to-slate-950 border border-cyan-800/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                Calculated Penetration Depth (&delta;<sub>p</sub>)
              </span>
              <span className="text-3xl font-black text-cyan-400 font-mono">
                {penetrationDepthMeters > 50 ? '> 50.0' : penetrationDepthMeters} meters
              </span>
            </div>
            <div className="text-right text-xs text-slate-300 max-w-xs font-mono">
              Enables sounding through the surface mantle to detect buried structures, voids, and ground ice.
            </div>
          </div>
        </div>

        {/* Right: Sensor Cross-Reference (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h4 className="text-base font-bold text-white">
              Earth vs Planetary Sensor Analogs
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            {/* LRO Mini-RF Match */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-cyan-300 font-semibold font-mono">
                <span>Lunar Target: LRO Mini-RF</span>
                <span>2.38 GHz (S-Band)</span>
              </div>
              <p className="text-slate-400 mt-1">
                Earth Benchmark: <strong>CSA RADARSAT-1 (5.3 GHz C-band)</strong> and <strong>NASA UAVSAR (1.26 GHz)</strong>.
              </p>
              <div className="mt-2 text-[11px] text-slate-300 bg-slate-900/80 p-2 rounded border border-slate-800">
                <strong>Science Application:</strong> Circular Polarization Ratio (CPR) signatures in shadowed craters like Shackleton to differentiate blocky crater walls from volume-scattering ice.
              </div>
            </div>

            {/* Mars SHARAD Match */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-red-300 font-semibold font-mono">
                <span>Mars Target: MRO SHARAD</span>
                <span>20 MHz (HF Sounder)</span>
              </div>
              <p className="text-slate-400 mt-1">
                Earth Benchmark: <strong>Arctic Glacial VHF Radar Sounding (Ellesmere Island / Devon Island)</strong>.
              </p>
              <div className="mt-2 text-[11px] text-slate-300 bg-slate-900/80 p-2 rounded border border-slate-800">
                <strong>Science Application:</strong> Mapping the 1-2 meter dust insulation layer over pure sheet ice in Arcadia Planitia to establish human water mining reserves.
              </div>
            </div>

            {/* Current Site Profile */}
            <div className="bg-slate-950 p-3 rounded-xl border border-cyan-900/40">
              <span className="text-[10px] font-mono uppercase text-cyan-400 block font-semibold">
                Current Site SAR Profile ({selectedAnalog.name})
              </span>
              <p className="text-slate-300 mt-1 font-mono text-[11px]">
                {selectedAnalog.sarDataProfile.sensor} • {selectedAnalog.sarDataProfile.roughnessEstimation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
