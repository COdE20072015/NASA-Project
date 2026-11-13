import React from 'react';
import { EarthAnalog, PlanetaryTarget } from '../types';
import { FileText, Download, ExternalLink, BookOpen, Database, Award, CheckCircle, Shield } from 'lucide-react';

interface ScienceDossierProps {
  analogs: EarthAnalog[];
  planetaryTargets: PlanetaryTarget[];
}

export const ScienceDossier: React.FC<ScienceDossierProps> = ({
  analogs,
  planetaryTargets
}) => {
  const exportJsonData = () => {
    const payload = {
      project: "AEGIS - Planetary Analog Terrestrial Explorer",
      hackathon: "NASA International Space Apps Challenge 2026",
      challenge: "Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars",
      methodology: "Planetary Analog Similarity Index (PASI)",
      generatedAt: new Date().toISOString(),
      planetaryTargets,
      earthAnalogs: analogs
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AEGIS-Planetary-Analogs-NASA-SpaceApps-2026.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Dossier Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              NASA Space Apps 2026 • Official Scientific Whitepaper
            </span>
            <h2 className="text-3xl font-black text-white mt-1">
              AEGIS: Multi-Dimensional Planetary Analog Framework
            </h2>
            <p className="text-sm text-slate-300 mt-2 font-mono">
              Systematic Discovery of Novel Terrestrial Testbeds for Artemis Lunar Bases and Mars Architecture
            </p>
          </div>

          <button
            onClick={exportJsonData}
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center space-x-2 transition-all shadow-lg shadow-cyan-950 self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Export Complete Dataset (JSON)</span>
          </button>
        </div>
      </div>

      {/* Section 1: Executive Summary */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400 border-b border-slate-800 pb-3">
          <BookOpen className="w-5 h-5" />
          <h3 className="text-lg font-bold text-white">1. Executive Summary & Challenge Framing</h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Planning permanent human surface architecture for the <strong>Lunar South Pole (Artemis Base Camp)</strong> and <strong>Mars (Starship / MSR)</strong> requires extensive terrestrial testing of robotic mobility, drill rigs, life-support, and habitat construction. While classical analog sites like the Atacama Desert and Devon Island are well-known, they do not satisfy all operational vectors and leave many critical planetary regimes unaddressed.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          The <strong>AEGIS (Analog Earth Geospatial Intelligence System)</strong> project combines open-access Earth Observation datasets from <strong>NASA, the Canadian Space Agency (CSA), and the European Space Agency (ESA)</strong> with planetary orbital missions (<strong>LRO Diviner, LOLA, MRO CRISM/SHARAD</strong>) to systematically discover and characterize <em>novel, previously understudied terrestrial analogs</em> around the globe.
        </p>
      </div>

      {/* Section 2: Mathematical Formulation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400 border-b border-slate-800 pb-3">
          <Award className="w-5 h-5" />
          <h3 className="text-lg font-bold text-white">
            2. Planetary Analog Similarity Index (PASI) Formulation
          </h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Rather than relying solely on visual inspection, AEGIS scores analog fidelity across six quantitative physical dimensions:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-sm overflow-x-auto">
          <code>PASI = &sum;<sub>i=1</sub><sup>6</sup> (w<sub>i</sub> &middot; S<sub>i</sub>) &nbsp;&nbsp;&nbsp; where &sum; w<sub>i</sub> = 1.0</code>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
            <span className="text-cyan-400 font-bold block mb-1">1. Topography (S<sub>topo</sub>)</span>
            Evaluates slope distributions (&theta;), RMS surface roughness (&xi;<sub>RMS</sub>), and macro-relief comparing LOLA/HiRISE with SRTM/ASTER elevation models.
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
            <span className="text-cyan-400 font-bold block mb-1">2. Thermal Regime (S<sub>therm</sub>)</span>
            Evaluates diurnal temperature swing, cryogenic minimums, and thermal inertia (I = &radic;(k&rho;c)) derived from LRO Diviner radiometer and MODIS land surface temperatures.
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
            <span className="text-cyan-400 font-bold block mb-1">3. Geology & Shock Metamorphism (S<sub>geo</sub>)</span>
            Matches mineralogical signatures: continental flood basalts (Deccan), impact maskelynite, clay phyllosilicates, and evaporitic polyhydrated sulfates.
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
            <span className="text-cyan-400 font-bold block mb-1">4. Cryosphere & Ice Stability (S<sub>cryo</sub>)</span>
            Evaluates continuous deep permafrost, sub-zero ice wedging, and desiccated regolith conditions mirroring lunar PSR cold traps and Martian ice sheets.
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
            <span className="text-cyan-400 font-bold block mb-1">5. SAR Radar & Dielectric Properties (S<sub>sar</sub>)</span>
            Calculates microwave backscatter (&sigma;<sup>0</sup>), dielectric constant (&epsilon;<sub>r</sub>), and skin depth (&delta;<sub>p</sub>) utilizing CSA RADARSAT-1 and Sentinel-1 C-band radar.
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
            <span className="text-cyan-400 font-bold block mb-1">6. Hardware Testing Utility (S<sub>ops</sub>)</span>
            Assesses practical testability for rover mobility grousers, cryogenic ice coring, space suit abrasion, and microwave sintering.
          </div>
        </div>
      </div>

      {/* Section 3: The "Surprise Factor" - Novel Understudied Analogs */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-emerald-400 border-b border-slate-800 pb-3">
          <CheckCircle className="w-5 h-5" />
          <h3 className="text-lg font-bold text-white">
            3. The Surprise Factor: Newly Characterized Understudied Analogs
          </h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          As encouraged by the NASA challenge guidelines (<em>"Look beyond well-known analog sites"</em> and <em>"Surprise us"</em>), AEGIS reveals five exceptional, understudied sites:
        </p>

        <div className="space-y-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-900/40">
            <h5 className="font-bold text-emerald-300 font-mono text-sm">
              • Lonar Impact Crater (Maharashtra, India)
            </h5>
            <p className="text-slate-300 mt-1 leading-relaxed">
              The world’s only hypervelocity impact crater formed entirely within continental flood basalt (Deccan Traps). Its shock-melt glasses, maskelynite, and basalt talus slopes provide an exact geochemical and mechanical twin for lunar mare impact craters and Martian shergottite meteorites.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-900/40">
            <h5 className="font-bold text-emerald-300 font-mono text-sm">
              • Qaidam Basin Yardang Fields (Tibetan Plateau)
            </h5>
            <p className="text-slate-300 mt-1 leading-relaxed">
              At 3,100m elevation, this is Earth’s coldest and highest hyper-arid desert. It combines extreme UV radiation, -32°C winter freezes, and massive wind-sculpted yardangs of polyhydrated magnesium sulfates, closely resembling the Gale Crater sulfate unit on Mars.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-900/40">
            <h5 className="font-bold text-emerald-300 font-mono text-sm">
              • Tenoumer Crater (Mauritania, Western Sahara)
            </h5>
            <p className="text-slate-300 mt-1 leading-relaxed">
              A pristine 1.9 km simple bowl crater embedded in bone-dry silica sands with ultra-low dielectric loss (&tan;&delta; &lt; 0.005), enabling radar sounders (RADARSAT-1/SHARAD) to penetrate meters below the surface and reveal hidden ejecta blankets.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-900/40">
            <h5 className="font-bold text-emerald-300 font-mono text-sm">
              • Owyhee Plateau & Malheur Lava Tube Caverns (Oregon/Idaho, USA)
            </h5>
            <p className="text-slate-300 mt-1 leading-relaxed">
              Pristine basaltic volcanic tunnels with collapsed skylights directly simulating the 65m Marius Hills pit on the Moon. Subsurface microclimates remain decoupled from violent surface thermal swings.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-900/40">
            <h5 className="font-bold text-emerald-300 font-mono text-sm">
              • Borup Pass (Ellesmere Island, Canadian High Arctic)
            </h5>
            <p className="text-slate-300 mt-1 leading-relaxed">
              Sub-zero cryogenic sulfur springs discharging over glacial ice sheets in continuous polar winter night, simulating volatile preservation in lunar South Pole permanently shadowed regions (PSRs).
            </p>
          </div>
        </div>
      </div>

      {/* Section 4: Open Datasets Directory */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400 border-b border-slate-800 pb-3">
          <Database className="w-5 h-5" />
          <h3 className="text-lg font-bold text-white">4. Space Agency Open Datasets Referenced</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <a
            href="https://search.earthdata.nasa.gov/"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500 transition-colors block"
          >
            <span className="text-cyan-400 font-bold block">NASA Earthdata Search</span>
            <span className="text-slate-400 text-[11px]">SRTM, ASTER GDEM, MODIS LST, Landsat 8/9</span>
          </a>

          <a
            href="https://pds-geosciences.wustl.edu/missions/lro/diviner.htm"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500 transition-colors block"
          >
            <span className="text-cyan-400 font-bold block">NASA PDS LRO Diviner Radiometer</span>
            <span className="text-slate-400 text-[11px]">Lunar South Pole Surface Temperatures & PSR Ice Stability</span>
          </a>

          <a
            href="https://donnees-data.asc-csa.gc.ca/en/dataset/radarsat1"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500 transition-colors block"
          >
            <span className="text-cyan-400 font-bold block">Canadian Space Agency (CSA) RADARSAT-1</span>
            <span className="text-slate-400 text-[11px]">C-Band SAR Surface Roughness & Penetration Data</span>
          </a>

          <a
            href="https://dataspace.copernicus.eu/"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500 transition-colors block"
          >
            <span className="text-cyan-400 font-bold block">ESA Copernicus Data Space</span>
            <span className="text-slate-400 text-[11px]">Sentinel-1 C-SAR Backscatter & Sentinel-2 Optical</span>
          </a>
        </div>
      </div>
    </div>
  );
};
