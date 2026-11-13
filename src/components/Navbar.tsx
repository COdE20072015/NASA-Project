import React from 'react';
import { PlanetaryBody } from '../types';
import { Orbit, Compass, Radio, Wrench, FileText, Globe, Layers, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeBody: PlanetaryBody;
  onSelectBody: (body: PlanetaryBody) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  novelCount: number;
  benchmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeBody,
  onSelectBody,
  activeTab,
  onSelectTab,
  novelCount,
  benchmarkCount,
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & NASA Space Apps Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-emerald-500 to-amber-500 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-950">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Orbit className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-400 bg-clip-text text-transparent">
                  AEGIS
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
                  NASA Space Apps 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">
                Analog Earth Geospatial Intelligence System • Autonomous Discovery
              </p>
            </div>
          </div>

          {/* Planetary Target Switcher (Moon vs Mars) */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onSelectBody('Moon')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeBody === 'Moon'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-md border border-slate-600'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <span>Moon Bases</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">Artemis</span>
            </button>
            <button
              onClick={() => onSelectBody('Mars')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeBody === 'Mars'
                  ? 'bg-gradient-to-r from-red-900 to-red-800 text-white shadow-md border border-red-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <span>Mars Landing</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950/60 text-red-300 font-mono">Human/MSR</span>
            </button>
          </div>

          {/* Quick Counter Badges */}
          <div className="hidden lg:flex items-center space-x-2 text-xs font-mono">
            <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{novelCount} Novel Sites</span>
            </span>
            <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-300">
              <Layers className="w-3 h-3 text-slate-400" />
              <span>{benchmarkCount} Benchmarks</span>
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-3 border-t border-slate-800/80 pt-2 pb-2 overflow-x-auto text-xs font-medium scrollbar-none">
          <button
            onClick={() => onSelectTab('discovery')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'discovery'
                ? 'bg-gradient-to-r from-emerald-900 to-teal-900 text-emerald-200 border border-emerald-500 font-bold shadow-md shadow-emerald-950/50'
                : 'text-emerald-400/90 hover:text-emerald-200 hover:bg-emerald-950/40 border border-emerald-900/40 font-semibold'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Find New Analogs (APADE)</span>
          </button>

          <button
            onClick={() => onSelectTab('explorer')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'explorer'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Global Map Explorer</span>
          </button>

          <button
            onClick={() => onSelectTab('comparison')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'comparison'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Dual Comparison</span>
          </button>

          <button
            onClick={() => onSelectTab('sar-lab')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'sar-lab'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>SAR Radar Sounding</span>
          </button>

          <button
            onClick={() => onSelectTab('simulator')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'simulator'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Hardware Protocols</span>
          </button>

          <button
            onClick={() => onSelectTab('dossier')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'dossier'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Whitepaper & Datasets</span>
          </button>
        </div>
      </div>
    </header>
  );
};
