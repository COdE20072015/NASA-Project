import { PlanetaryTarget } from '../types';

export const planetaryTargets: PlanetaryTarget[] = [
  {
    id: 'luna-shackleton-rim',
    name: 'Shackleton Crater Rim',
    body: 'Moon',
    location: 'Lunar South Pole (89.9°S, 0.0°E)',
    coordinates: {
      lat: -89.9,
      lng: 0.0,
      displayCoords: '89.9°S, 0.0°E'
    },
    missionContext: 'Artemis Base Camp Prime Site & CLPS Polar Delivery',
    elevationMeters: 4200, // Peak above crater floor
    temperatureRangeK: [40, 225], // -233°C to -48°C
    primaryGeology: 'Highland Anorthosite with Shocked Regolith Breccia',
    regolithComposition: 'Plagioclase-rich anorthosite, high titanium/iron micro-crushed agglutinates, cryogenic water ice (<1 wt% surface, up to 5 wt% subsurface traps)',
    targetObjectives: [
      'Cryogenic Ice & Drilling (ISRU)',
      'Rover Mobility & Trafficability',
      'EVA Space Suit & Dust Abrasion',
      'Basaltic Sintering & Construction'
    ],
    description: 'The Shackleton rim provides continuous or near-continuous peaks of solar illumination (up to 86-92% of the lunar year) directly adjacent to permanently shadowed regions (PSRs) where temperatures plummet to 40 K, preserving billion-year-old volatile reserves.',
    scientificRelevance: 'Primary location for extracting volatiles for propellant synthesis (liquid hydrogen and oxygen) and setting up long-term solar/fission surface power arrays.',
    keyMissions: ['LRO (Diviner, LOLA, Mini-RF)', 'Artemis III/IV', 'VIPER / Polar Resource Rovers', 'LCROSS'],
    datasetSources: [
      'LRO LOLA Polar DEMs (10m/pixel)',
      'LRO Diviner Lunar Radiometer Ice Stability Maps',
      'LRO Mini-RF C-band/S-band CPR Scattering'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'luna-marius-hills',
    name: 'Marius Hills Lava Tube Skylight',
    body: 'Moon',
    location: 'Oceanus Procellarum (14.09°N, 56.77°W)',
    coordinates: {
      lat: 14.09,
      lng: -56.77,
      displayCoords: '14.09°N, 56.77°W'
    },
    missionContext: 'Subsurface Habitation & Radiation-Shielded Base',
    elevationMeters: -1200, // Pit depression
    temperatureRangeK: [253, 256], // Subsurface microclimate is virtually constant at -20°C!
    primaryGeology: 'Thick Lunar Mare Basalt Flow Sequences',
    regolithComposition: 'Titanium-rich mare basalts, pyroxene, ilmenite, minimal weathering inside the cavern vault.',
    targetObjectives: [
      'Subsurface Shelter & Lava Tubes',
      'Rover Mobility & Trafficability',
      'Basaltic Sintering & Construction'
    ],
    description: 'A 65-meter diameter collapse pit opening into a subterranean lava tube vault estimated to be over 100 meters wide and hundreds of meters long, discovered by JAXA SELENE (Kaguya) and confirmed by LRO LROC.',
    scientificRelevance: 'Natural shielding that reduces Galactic Cosmic Rays (GCR) and Solar Particle Events (SPE) to safe terrestrial levels, eliminates micrometeorite risk, and provides a thermally stable permanent habitat chamber without massive surface shielding mass.',
    keyMissions: ['JAXA Kaguya Terrain Camera', 'LRO LROC NAC', 'GRAIL Gravity Sounding'],
    datasetSources: [
      'PDS Geosciences LROC NAC Narrow-Angle Pit Imagery',
      'GRAIL Lunar Gravity Subsurface Void Density Models'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'luna-malapert-mountain',
    name: 'Malapert Mountain (Peak M)',
    body: 'Moon',
    location: 'Lunar South Pole Region (84.9°S, 12.9°E)',
    coordinates: {
      lat: -84.9,
      lng: 12.9,
      displayCoords: '84.9°S, 12.9°E'
    },
    missionContext: 'Primary Deep Space Communication & Surface Relay Mast',
    elevationMeters: 5100, // 5.1 km above surrounding plains
    temperatureRangeK: [120, 240],
    primaryGeology: 'Ancient Lunar Crustal Massif / Impact Uplift',
    regolithComposition: 'Pure crystalline anorthosite regolith with low dielectric loss and high mechanical bearing strength.',
    targetObjectives: [
      'Rover Mobility & Trafficability',
      'Basaltic Sintering & Construction',
      'EVA Space Suit & Dust Abrasion'
    ],
    description: 'A colossal highland massif standing over 5,000 meters above the southern cratered terrain, providing uninterrupted line-of-sight communication to Earth and extreme operational range for high-gain transmission towers.',
    scientificRelevance: 'Essential telecommunication hub for relaying signals from Artemis surface crews in shadowed craters directly back to Earth ground stations (Deep Space Network).',
    keyMissions: ['LRO LOLA', 'Intuitive Machines IM-1', 'Artemis Surface Architecture'],
    datasetSources: [
      'LRO LOLA High-Resolution Topographic Profiles',
      'NASA Planetary Data System (PDS) Lunar Geosciences'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mars-jezero-crater',
    name: 'Jezero Crater Paleolake Delta',
    body: 'Mars',
    location: 'Isidis Planitia / Syrtis Major Margin (18.38°N, 77.58°E)',
    coordinates: {
      lat: 18.38,
      lng: 77.58,
      displayCoords: '18.38°N, 77.58°E'
    },
    missionContext: 'Mars 2020 Perseverance Rover & Mars Sample Return (MSR)',
    elevationMeters: -2500,
    temperatureRangeK: [180, 290], // -93°C to +17°C
    primaryGeology: 'Fluvial-Lacustrine Sedimentary Fan with Smectite Clays & Carbonates',
    regolithComposition: 'Fine-grained mudstones, iron-magnesium smectite clays, hydrated magnesium carbonates, olivine-rich volcanic floor unit.',
    targetObjectives: [
      'Astrobiology & Biosignature Detection',
      'Rover Mobility & Trafficability',
      'EVA Space Suit & Dust Abrasion'
    ],
    description: 'Ancient 45-km diameter impact basin that hosted an open-system paleolake fed by Neretva Vallis, preserving layered deltaic bottomsets, foresets, and shorelines rich in biosignature-preserving clays.',
    scientificRelevance: 'The pinnacle Mars landing location for searching for ancient fossilized microbial life and understanding planetary aqueous evolution from warm-wet to hyper-arid cold conditions.',
    keyMissions: ['Mars 2020 Perseverance', 'Mars Reconnaissance Orbiter (CRISM, HiRISE)', 'Mars Express (OMEGA)'],
    datasetSources: [
      'MRO CRISM Hyperspectral Mineralogy Cubes',
      'MRO HiRISE Stereo Digital Terrain Models (1m/pixel)',
      'NASA PDS Geosciences Mars Node'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mars-arcadia-planitia',
    name: 'Arcadia Planitia (Subsurface Sheet Ice)',
    body: 'Mars',
    location: 'Northern Lowlands (39.3°N, 189.7°E)',
    coordinates: {
      lat: 39.3,
      lng: 189.7,
      displayCoords: '39.3°N, 189.7°E'
    },
    missionContext: 'SpaceX Starship & NASA Human Mars Base Prime Candidate',
    elevationMeters: -3800, // Deep lowlands providing dense atmospheric deceleration
    temperatureRangeK: [160, 275],
    primaryGeology: 'Amazonian Smooth Volcanic Plains with Massive Glacial Mantle',
    regolithComposition: 'Thin (1-2.5m) aeolian dust/sand insulating cover overlying pure glacial sheet ice (>90% purity) extending across hundreds of square kilometers.',
    targetObjectives: [
      'Cryogenic Ice & Drilling (ISRU)',
      'Rover Mobility & Trafficability',
      'Basaltic Sintering & Construction'
    ],
    description: 'Extensive low-elevation northern plain featuring widespread lobate debris aprons and polygonal thermal contraction patterns, where radar sounding (SHARAD) confirmed pure subsurface slab ice within human drilling depth.',
    scientificRelevance: 'Prime human landing architecture site because deep atmospheric pressure enables aerodynamic landing mass deceleration, and shallow clean ice eliminates the need to haul water or propellant from Earth.',
    keyMissions: ['MRO SHARAD Radar Sounder', 'Mars Odyssey THEMIS', 'MOLA Mars Global Surveyor'],
    datasetSources: [
      'MRO SHARAD Subsurface Radar Sounding Profiles',
      'NASA PDS Mars Subsurface Ice Mapping (SWIM) Project'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mars-mawrth-vallis',
    name: 'Mawrth Vallis Layered Stratigraphy',
    body: 'Mars',
    location: 'Oxia Palus boundary (23.99°N, 341.04°E)',
    coordinates: {
      lat: 23.99,
      lng: 341.04,
      displayCoords: '23.99°N, 341.04°E'
    },
    missionContext: 'Noachian-Hesperian Habitable Evolution Exploration',
    elevationMeters: -2100,
    temperatureRangeK: [175, 285],
    primaryGeology: 'Ancient Stratified Phyllosilicates (Nontronite, Saponite, Kaolinite, Al-Smectites)',
    regolithComposition: 'Multi-tiered hydrated aluminum and iron-magnesium silicate clay deposits reaching over 200m thickness.',
    targetObjectives: [
      'Astrobiology & Biosignature Detection',
      'Rover Mobility & Trafficability',
      'Basaltic Sintering & Construction'
    ],
    description: 'Ancient catastrophic outflow channel carved into the Noachian crust, revealing a pristine 200-meter vertical cross-section of Earth-like clay minerals documenting the transition from neutral-pH waters to acidic desiccated conditions.',
    scientificRelevance: 'Exceptional preservation of organic molecules locked within expandable smectite interlayer sheets, offering the deepest look into Mars primeval habitability.',
    keyMissions: ['MRO CRISM', 'Mars Express OMEGA', 'Mars Global Surveyor MOC'],
    datasetSources: [
      'ESA Open Science Data Hub Mars Express OMEGA Spectra',
      'NASA PDS Geosciences CRISM Mineral Maps'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80'
  }
];
