import React, { useState } from 'react';
import { PlanetaryBody, EarthAnalog, PlanetaryTarget } from './types';
import { planetaryTargets } from './data/planetaryTargets';
import { earthAnalogs } from './data/earthAnalogs';
import { Navbar } from './components/Navbar';
import { MapViewer } from './components/MapViewer';
import { ComparisonView } from './components/ComparisonView';
import { SarAnalysisModule } from './components/SarAnalysisModule';
import { MissionSimulator } from './components/MissionSimulator';
import { ScienceDossier } from './components/ScienceDossier';
import { DiscoveryScanner } from './components/DiscoveryScanner';

export const App: React.FC = () => {
  const [activeBody, setActiveBody] = useState<PlanetaryBody>('Moon');
  const [activeTab, setActiveTab] = useState<string>('discovery'); // Default to autonomous discovery!

  // Filter planetary targets for current body
  const currentPlanetaryTargets = planetaryTargets.filter((t) => t.body === activeBody);

  const [selectedPlanetaryTarget, setSelectedPlanetaryTarget] = useState<PlanetaryTarget>(
    currentPlanetaryTargets[0]
  );

  const [selectedAnalog, setSelectedAnalog] = useState<EarthAnalog>(earthAnalogs[0]);

  // Handle body switch (Moon <-> Mars)
  const handleSelectBody = (body: PlanetaryBody) => {
    setActiveBody(body);
    const newTargets = planetaryTargets.filter((t) => t.body === body);
    if (newTargets.length > 0) {
      setSelectedPlanetaryTarget(newTargets[0]);
    }
  };

  const novelCount = earthAnalogs.filter((a) => a.tier === 'Novel/Understudied').length;
  const benchmarkCount = earthAnalogs.filter((a) => a.tier === 'Benchmark').length;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeBody={activeBody}
        onSelectBody={handleSelectBody}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        novelCount={novelCount}
        benchmarkCount={benchmarkCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {activeTab === 'discovery' && (
          <DiscoveryScanner
            planetaryTarget={selectedPlanetaryTarget}
            allPlanetaryTargets={planetaryTargets}
            onSelectPlanetaryTarget={setSelectedPlanetaryTarget}
            onSelectDiscoveredAsAnalog={(newAnalog) => {
              setSelectedAnalog(newAnalog);
              setActiveTab('comparison');
            }}
          />
        )}

        {activeTab === 'explorer' && (
          <MapViewer
            analogs={earthAnalogs}
            selectedAnalog={selectedAnalog}
            onSelectAnalog={setSelectedAnalog}
            activePlanetaryTarget={selectedPlanetaryTarget}
            onOpenComparison={() => setActiveTab('comparison')}
          />
        )}

        {activeTab === 'comparison' && (
          <ComparisonView
            planetaryTarget={selectedPlanetaryTarget}
            earthAnalog={selectedAnalog}
            onSelectPlanetaryTarget={setSelectedPlanetaryTarget}
            allPlanetaryTargets={planetaryTargets}
          />
        )}

        {activeTab === 'sar-lab' && (
          <SarAnalysisModule
            selectedAnalog={selectedAnalog}
            planetaryTarget={selectedPlanetaryTarget}
          />
        )}

        {activeTab === 'simulator' && (
          <MissionSimulator
            analogs={earthAnalogs}
            planetaryTargets={planetaryTargets}
            onSelectAnalog={(analog) => {
              setSelectedAnalog(analog);
              setActiveTab('comparison');
            }}
          />
        )}

        {activeTab === 'dossier' && (
          <ScienceDossier
            analogs={earthAnalogs}
            planetaryTargets={planetaryTargets}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">
              NASA International Space Apps Challenge 2026 • Project AEGIS (Autonomous Discovery Engine)
            </span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>NASA Earthdata</span>
            <span>•</span>
            <span>PDS LRO Diviner</span>
            <span>•</span>
            <span>CSA RADARSAT-1</span>
            <span>•</span>
            <span>ESA Copernicus</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
