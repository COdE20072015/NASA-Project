export type PlanetaryBody = 'Moon' | 'Mars';

export type AnalogTier = 'Novel/Understudied' | 'Benchmark';

export type ExplorationObjective = 
  | 'Rover Mobility & Trafficability'
  | 'Cryogenic Ice & Drilling (ISRU)'
  | 'Subsurface Shelter & Lava Tubes'
  | 'Basaltic Sintering & Construction'
  | 'EVA Space Suit & Dust Abrasion'
  | 'Astrobiology & Biosignature Detection';

export interface DimensionScores {
  topography: number;    // Slope, RMS roughness, crater morphology (0-100)
  thermal: number;       // Diurnal range, cryogenic minimums, thermal inertia (0-100)
  geology: number;       // Basalt, anorthosite, clays, sulfates, impact shock (0-100)
  cryosphere: number;    // Ground ice, permafrost, hyper-aridity (0-100)
  sarRadar: number;      // C-band radar backscatter, dielectric constant, penetration (0-100)
  operations: number;    // Testing feasibility, rover traversability, hazard profile (0-100)
}

export interface PlanetaryTarget {
  id: string;
  name: string;
  body: PlanetaryBody;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
    displayCoords: string;
  };
  missionContext: string; // e.g. Artemis Base Camp, Mars 2020, Human Mars Architecture
  elevationMeters: number;
  temperatureRangeK: [number, number];
  primaryGeology: string;
  regolithComposition: string;
  targetObjectives: ExplorationObjective[];
  description: string;
  scientificRelevance: string;
  keyMissions: string[];
  datasetSources: string[];
  imageUrl: string;
}

export interface EarthAnalog {
  id: string;
  name: string;
  tier: AnalogTier;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
    displayCoords: string;
  };
  elevationMeters: number;
  temperatureRangeC: [number, number];
  primaryGeology: string;
  bestMatchedPlanetaryTargets: {
    targetId: string;
    similarityScore: number;
    dimensions: DimensionScores;
  }[];
  primaryObjectives: ExplorationObjective[];
  whyAnalogous: string;
  whereAnalogyBreaksDown: {
    gravity: string;
    atmosphere: string;
    radiation: string;
    hydrologyOrBiology: string;
  };
  sarDataProfile: {
    sensor: string; // e.g. RADARSAT-1 C-Band, Sentinel-1
    polarization: string;
    roughnessEstimation: string;
    dielectricPermittivity: number;
    subsurfacePenetrationDepth: string;
    planetarySensorEquivalent: string; // e.g. LRO Mini-RF, Mars SHARAD
  };
  testingUseCases: {
    title: string;
    description: string;
    hardwareTarget: string; // e.g. VIPER Drill, Pressurized Rover, Autonomous Drone
  }[];
  nasaAndSpaceAgencyDatasets: {
    datasetName: string;
    agency: 'NASA' | 'CSA' | 'ESA';
    url: string;
    dataProduct: string;
  }[];
  imageUrl: string;
}
