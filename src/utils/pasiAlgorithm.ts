import { DimensionScores, ExplorationObjective } from '../types';

export interface PASIWeights {
  topography: number;
  thermal: number;
  geology: number;
  cryosphere: number;
  sarRadar: number;
  operations: number;
}

export const DEFAULT_WEIGHTS: PASIWeights = {
  topography: 0.20,
  thermal: 0.15,
  geology: 0.25,
  cryosphere: 0.15,
  sarRadar: 0.15,
  operations: 0.10
};

export const OBJECTIVE_PRESET_WEIGHTS: Record<ExplorationObjective, PASIWeights> = {
  'Rover Mobility & Trafficability': {
    topography: 0.35,
    thermal: 0.10,
    geology: 0.15,
    cryosphere: 0.05,
    sarRadar: 0.15,
    operations: 0.20
  },
  'Cryogenic Ice & Drilling (ISRU)': {
    topography: 0.10,
    thermal: 0.25,
    geology: 0.10,
    cryosphere: 0.40,
    sarRadar: 0.10,
    operations: 0.05
  },
  'Subsurface Shelter & Lava Tubes': {
    topography: 0.25,
    thermal: 0.20,
    geology: 0.25,
    cryosphere: 0.05,
    sarRadar: 0.15,
    operations: 0.10
  },
  'Basaltic Sintering & Construction': {
    topography: 0.10,
    thermal: 0.10,
    geology: 0.45,
    cryosphere: 0.05,
    sarRadar: 0.15,
    operations: 0.15
  },
  'EVA Space Suit & Dust Abrasion': {
    topography: 0.20,
    thermal: 0.20,
    geology: 0.25,
    cryosphere: 0.05,
    sarRadar: 0.10,
    operations: 0.20
  },
  'Astrobiology & Biosignature Detection': {
    topography: 0.10,
    thermal: 0.15,
    geology: 0.35,
    cryosphere: 0.20,
    sarRadar: 0.10,
    operations: 0.10
  }
};

/**
 * Calculates the Planetary Analog Similarity Index (PASI)
 * PASI = Sum(w_i * S_i)
 */
export function calculatePASI(scores: DimensionScores, weights: PASIWeights = DEFAULT_WEIGHTS): number {
  const weightedSum =
    scores.topography * weights.topography +
    scores.thermal * weights.thermal +
    scores.geology * weights.geology +
    scores.cryosphere * weights.cryosphere +
    scores.sarRadar * weights.sarRadar +
    scores.operations * weights.operations;

  return Math.round(weightedSum * 10) / 10;
}

/**
 * Radar scattering skin depth formula:
 * delta_p = (c / (2 * pi * f)) / sqrt( (eps_r / 2) * (sqrt(1 + tan_delta^2) - 1) )
 */
export function calculateRadarPenetration(freqGHz: number, dielectricPermittivity: number, lossTangent: number): number {
  const c = 3e8; // speed of light m/s
  const f = freqGHz * 1e9;
  const omega = 2 * Math.PI * f;
  
  // Approximation for low-loss geological media:
  // delta_p ≈ (c / (2 * pi * f)) * (sqrt(eps_r) / (eps_r * lossTangent)) = c / (omega * sqrt(eps_r) * lossTangent)
  const depth = (c) / (2 * Math.PI * f * Math.sqrt(dielectricPermittivity) * lossTangent);
  return Math.round(depth * 100) / 100;
}
