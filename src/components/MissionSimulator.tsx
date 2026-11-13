import React, { useState } from 'react';
import { EarthAnalog, PlanetaryTarget } from '../types';
import { Wrench, Shield, CheckCircle2, ChevronRight, Play, Crosshair, ArrowRight } from 'lucide-react';

interface MissionSimulatorProps {
  analogs: EarthAnalog[];
  planetaryTargets: PlanetaryTarget[];
  onSelectAnalog: (analog: EarthAnalog) => void;
}

interface TestProtocol {
  id: string;
  title: string;
  category: string;
  hardwareTarget: string;
  targetPlanetaryRisk: string;
  recommendedAnalogs: string[];
  protocolSteps: string[];
  criticalTelemetry: string[];
  expectedImpact: string;
}

const TEST_PROTOCOLS: TestProtocol[] = [
  {
    id: 'rover-traction',
    title: 'Extreme Slope Basalt Talus & Slip Testing',
    category: 'Robotics & Mobility',
    hardwareTarget: 'Artemis Lunar Terrain Vehicle (LTV) & Autonomous Scout Rovers',
    targetPlanetaryRisk: 'High-centering, wheel slip >80%, and fatal regolith entrapment on 25° inner crater walls.',
    recommendedAnalogs: ['Lonar Impact Crater (Deccan Basalt)', 'Askja & Holuhraun Lava Fields', 'Tenoumer Impact Crater (Saharan Breccia)'],
    protocolSteps: [
      'Calibrate wheel grouser penetration on natural shocked basalt talus (25° - 32° slope).',
      'Test autonomous slip-compensation algorithms using real-time motor torque and visual odometry.',
      'Measure wheel rim abrasion against sharp, vesicular shock-melt glass shards.'
    ],
    criticalTelemetry: ['Slip Ratio (s)', 'Drawbar Pull (N)', 'Motor Thermal Dissipation', 'Tire Grouser Wear Rate (mm/km)'],
    expectedImpact: 'Validates active chassis suspension and ensures 100% ascent capability for Artemis astronauts scaling crater rims.'
  },
  {
    id: 'cryo-drill',
    title: '1-Meter Cryogenic Permafrost Core Extraction',
    category: 'ISRU & Resource Extraction',
    hardwareTarget: 'TRIDENT / VIPER Rotary-Percussive 1m Drill & Sealed Sample Cask',
    targetPlanetaryRisk: 'Frictional drill heat sublimating cryogenic volatiles before volatile capture can occur.',
    recommendedAnalogs: ['Ellesmere Island & Borup Pass Cryogenic Springs', 'Haughton Impact Crater (Devon Island)'],
    protocolSteps: [
      'Bore into sub-zero (-40°C) permafrost to 100 cm depth in continuous 10 cm increments.',
      'Monitor drill bit thermal spikes to maintain sample temperatures strictly below sublimation threshold (110 K equiv).',
      'Transfer pulverized ice-cuttings into hermetically sealed carousel chambers under cold ambient conditions.'
    ],
    criticalTelemetry: ['Drill Bit Tip Temperature (°C)', 'Percussion Frequency (Hz)', 'Ice Core Recovery Ratio (%)', 'Volatile Loss Fraction'],
    expectedImpact: 'Guarantees that lunar water ice prospectors will return uncorrupted samples for rocket fuel distillation.'
  },
  {
    id: 'lava-tube-drone',
    title: 'GPS-Denied Subterranean Drone SLAM Exploration',
    category: 'Subsurface Exploration',
    hardwareTarget: 'Autonomous Subterranean Micro-Drone with LiDAR-Visual SLAM',
    targetPlanetaryRisk: 'Loss of RF signal, spatial disorientation, and collision within unlit lava tube caverns.',
    recommendedAnalogs: ['Owyhee Plateau & Malheur Lava Tube System'],
    protocolSteps: [
      'Drop drone through simulated skylight collapse into unlit basalt cavern vault.',
      'Achieve autonomous 3D volumetric LiDAR meshing in zero-light, GPS-denied environments.',
      'Drop ultra-wideband (UWB) mesh communication repeaters at line-of-sight inflection points.'
    ],
    criticalTelemetry: ['Point Cloud Drift (cm/100m)', 'Obstacle Standoff Distance (m)', 'RF Relay Mesh Throughput', 'Flight Battery Reserve'],
    expectedImpact: 'Enables scouting lunar lava tube vaults at Marius Hills for safe permanent human underground bases.'
  },
  {
    id: 'basalt-sintering',
    title: 'In-Situ Microwave Sintering of Regolith Landing Pads',
    category: 'Construction & Civil Engineering',
    hardwareTarget: '2.45 GHz Concentrated Microwave Beam Surface Sintering Rig',
    targetPlanetaryRisk: 'Rocket exhaust plumes excavating high-velocity ejecta craters and sandblasting nearby lunar habitats.',
    recommendedAnalogs: ['Lonar Impact Crater (Deccan Basalt)', 'Askja & Holuhraun Lava Fields'],
    protocolSteps: [
      'Collect natural tholeiitic basalt regolith with 8-12% iron-titanium oxides.',
      'Apply concentrated 2.45 GHz microwave power to melt intergranular contacts without volatile foaming.',
      'Perform mechanical core shear and compressive strength testing on the resulting basalt ceramic slab.'
    ],
    criticalTelemetry: ['Compressive Strength (MPa)', 'Sintering Rate (m²/hr)', 'Thermal Penetration Depth (cm)', 'Microwave Coupling Efficiency'],
    expectedImpact: 'Allows building blast shields, paved rover roads, and durable landing pads on the Moon without launching concrete from Earth.'
  },
  {
    id: 'biosignature-spectroscopy',
    title: 'Deep-UV Raman & Organic Carbon Detection Thresholds',
    category: 'Astrobiology & Life Detection',
    hardwareTarget: 'Deep-UV Raman / Luminescence Spectrometer (SHERLOC / MOMA class)',
    targetPlanetaryRisk: 'False-negative readings on trace organic molecules or false-positive contamination from hardware.',
    recommendedAnalogs: ['Salar de Uyuni & Laguna Diamante (Altiplano)', 'Atacama Desert (Yungay Hyper-Arid Core)', 'Qaidam Basin Hyper-Arid Yardang Fields'],
    protocolSteps: [
      'Illuminate endolithic halite crystals and evaporite crusts with 248.6 nm pulsed laser.',
      'Discriminate native polycyclic aromatic hydrocarbons (PAHs) from terrestrial cleaning solvent residues.',
      'Map bio-mineral fluorescence patterns at 100-micron spatial resolution.'
    ],
    criticalTelemetry: ['Signal-to-Noise Ratio (SNR)', 'Fluorescence Lifetime (ns)', 'Aromatic Carbon Peak Ratio (1600 cm⁻¹)', 'Limit of Detection (ppb)'],
    expectedImpact: 'Guarantees unequivocal detection of ancient microbial biosignatures in Jezero Crater delta clays.'
  }
];

export const MissionSimulator: React.FC<MissionSimulatorProps> = ({
  analogs,
  planetaryTargets,
  onSelectAnalog
}) => {
  const [selectedProtocol, setSelectedProtocol] = useState<TestProtocol>(TEST_PROTOCOLS[0]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Operational Readiness & Risk Reduction
            </span>
            <h3 className="text-2xl font-bold text-white">
              Planetary Mission Hardware Testing Protocols
            </h3>
          </div>
        </div>
        <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Terrestrial analogs are valuable only when tied directly to reducing exploration risk. Below are verified engineering testing campaigns designed to qualify Artemis Moon base hardware and Mars 2020/human architecture before launch.
        </p>
      </div>

      {/* Main Grid: Protocols List (5 cols) & Active Protocol Dossier (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Protocol List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Select Testing Campaign ({TEST_PROTOCOLS.length})
          </span>

          <div className="space-y-2.5">
            {TEST_PROTOCOLS.map((protocol) => {
              const isSelected = protocol.id === selectedProtocol.id;
              return (
                <div
                  key={protocol.id}
                  onClick={() => setSelectedProtocol(protocol)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-850 border-cyan-500 shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-900/70 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                      {protocol.category}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
                  </div>
                  <h4 className="text-sm font-bold text-white mt-2">
                    {protocol.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-mono">
                    Target: {protocol.hardwareTarget}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Protocol Dossier */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
              Campaign Specification
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              {selectedProtocol.title}
            </h3>
            <p className="text-xs text-slate-300 font-mono mt-1">
              Primary Hardware: <span className="text-cyan-300 font-bold">{selectedProtocol.hardwareTarget}</span>
            </p>
          </div>

          {/* Risk Mitigated Callout */}
          <div className="bg-red-950/30 border border-red-900/50 p-3.5 rounded-xl text-xs">
            <span className="font-mono text-red-400 font-bold uppercase block text-[11px]">
              Critical Planetary Risk to Eliminate:
            </span>
            <p className="text-slate-200 mt-1 leading-relaxed">
              {selectedProtocol.targetPlanetaryRisk}
            </p>
          </div>

          {/* Step-by-Step Field Testing Protocol */}
          <div>
            <span className="text-xs font-mono font-semibold text-slate-300 uppercase block mb-2">
              Standard Field Testing Sequence:
            </span>
            <div className="space-y-2">
              {selectedProtocol.protocolSteps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-slate-300 leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Telemetry Stream */}
          <div>
            <span className="text-xs font-mono font-semibold text-slate-300 uppercase block mb-2">
              Key Sensor Telemetry & Success Criteria:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedProtocol.criticalTelemetry.map((item, idx) => (
                <span key={idx} className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Analog Sites */}
          <div className="border-t border-slate-800 pt-4">
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase block mb-2">
              Recommended Earth Analog Field Locations:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedProtocol.recommendedAnalogs.map((siteName, idx) => {
                const matchedAnalog = analogs.find((a) => a.name === siteName);
                return (
                  <button
                    key={idx}
                    onClick={() => matchedAnalog && onSelectAnalog(matchedAnalog)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-200 hover:bg-emerald-900/80 font-mono flex items-center space-x-1.5 transition-colors"
                  >
                    <span>{siteName}</span>
                    <ArrowRight className="w-3 h-3 text-emerald-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expected Outcome */}
          <div className="bg-slate-950 p-3 rounded-xl border border-cyan-900/30 text-xs font-mono text-cyan-300">
            <strong>Flight Readiness Outcome:</strong> {selectedProtocol.expectedImpact}
          </div>
        </div>
      </div>
    </div>
  );
};
