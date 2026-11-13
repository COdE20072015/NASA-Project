import { EarthAnalog } from '../types';

export const earthAnalogs: EarthAnalog[] = [
  {
    id: 'lonar-impact-crater',
    name: 'Lonar Impact Crater (Deccan Basalt)',
    tier: 'Novel/Understudied',
    country: 'Maharashtra, India',
    coordinates: {
      lat: 19.976,
      lng: 76.507,
      displayCoords: '19°58\'N, 76°30\'E'
    },
    elevationMeters: 480,
    temperatureRangeC: [12, 44],
    primaryGeology: 'Thick Deccan Continental Flood Basalt (Tholeiitic Basalt Sequences)',
    bestMatchedPlanetaryTargets: [
      {
        targetId: 'luna-shackleton-rim',
        similarityScore: 84.5,
        dimensions: {
          topography: 82,
          thermal: 48,
          geology: 96,
          cryosphere: 30,
          sarRadar: 91,
          operations: 88
        }
      },
      {
        targetId: 'mars-jezero-crater',
        similarityScore: 81.2,
        dimensions: {
          topography: 79,
          thermal: 55,
          geology: 94,
          cryosphere: 35,
          sarRadar: 89,
          operations: 86
        }
      }
    ],
    primaryObjectives: [
      'Rover Mobility & Trafficability',
      'Basaltic Sintering & Construction',
      'EVA Space Suit & Dust Abrasion'
    ],
    whyAnalogous: 'Lonar is one of only four known hypervelocity impact structures on Earth formed entirely within pure basaltic target rock (Deccan flood basalts). It produces shocked plagioclase (diaplectic glass/maskelynite), impact breccias, and shock-melt spherules with iron-titanium geochemistry virtually identical to Apollo lunar mare samples and Martian shergottite meteorites. The crater rim slope (25°-32°) matches the inner walls of lunar craters.',
    whereAnalogyBreaksDown: {
      gravity: 'Earth 1.0g vs Lunar 0.166g and Mars 0.38g alters rover wheel compaction and projectile ballistic trajectories.',
      atmosphere: 'Dense humid Earth atmosphere causes chemical weathering of impact glass into smectite clays over 50,000 years, whereas lunar impact glass remains pristine.',
      radiation: 'Terrestrial magnetosphere and ozone shield block solar wind implantation and galactic cosmic rays.',
      hydrologyOrBiology: 'A hyper-alkaline saline lake occupies the crater floor with dense cyanobacterial and haloalkaliphilic microbial communities not present on the Moon.'
    },
    sarDataProfile: {
      sensor: 'RADARSAT-1 C-Band (5.3 GHz) & Sentinel-1 C-SAR',
      polarization: 'HH / VV (Cross-polarized roughness detection)',
      roughnessEstimation: 'High RMS surface roughness (2.8 - 4.5 cm) on steep crater inner wall basalt talus',
      dielectricPermittivity: 6.2, // Dry basalt target rock
      subsurfacePenetrationDepth: '0.4 - 0.8 meters through dry basaltic regolith talus',
      planetarySensorEquivalent: 'LRO Mini-RF Bistatic Radar & Chandrayaan-2 SAR'
    },
    testingUseCases: [
      {
        title: 'Basaltic Talus Rover Wheel Traction & Slip Testing',
        description: 'Testing active chassis articulation and grousers on angular basalt boulders and loose shock-melt fragments to benchmark Artemis Lunar Terrain Vehicle (LTV) slip dynamics.',
        hardwareTarget: 'Artemis Lunar Terrain Vehicle (LTV) Prototype Wheels'
      },
      {
        title: 'Microwave Sintering of Basaltic Regolith Simulant',
        description: 'Harvesting natural Deccan basaltic impact breccia to test in-situ microwave sintering for lunar landing pad construction and habitat bricks.',
        hardwareTarget: 'ISRU Microwave Sintering Rig'
      }
    ],
    nasaAndSpaceAgencyDatasets: [
      {
        datasetName: 'NASA Earthdata SRTM 30m Digital Elevation Model',
        agency: 'NASA',
        url: 'https://search.earthdata.nasa.gov/',
        dataProduct: 'SRTMGL1 (Topographic slope & curvature)'
      },
      {
        datasetName: 'CSA RADARSAT-1 C-Band SAR Archive',
        agency: 'CSA',
        url: 'https://donnees-data.asc-csa.gc.ca/en/dataset/radarsat1',
        dataProduct: 'Standard Beam SAR Georeferenced Amplitude'
      },
      {
        datasetName: 'ESA Sentinel-1 Interferometric Wide (IW)',
        agency: 'ESA',
        url: 'https://dataspace.copernicus.eu/',
        dataProduct: 'Level-1 Ground Range Detected (GRD) Backscatter'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'qaidam-basin-yardangs',
    name: 'Qaidam Basin Hyper-Arid Yardang Fields',
    tier: 'Novel/Understudied',
    country: 'Qinghai Province, Tibetan Plateau',
    coordinates: {
      lat: 37.85,
      lng: 93.67,
      displayCoords: '37°51\'N, 93°40\'E'
    },
    elevationMeters: 3100, // Extreme high altitude
    temperatureRangeC: [-32, 35],
    primaryGeology: 'Lacustrine Sediments sculpted into Yardangs with Polyhydrated Sulfates & Perchlorates',
    bestMatchedPlanetaryTargets: [
      {
        targetId: 'mars-jezero-crater',
        similarityScore: 89.2,
        dimensions: {
          topography: 91,
          thermal: 84,
          geology: 93,
          cryosphere: 78,
          sarRadar: 92,
          operations: 89
        }
      },
      {
        targetId: 'mars-mawrth-vallis',
        similarityScore: 87.8,
        dimensions: {
          topography: 86,
          thermal: 82,
          geology: 95,
          cryosphere: 75,
          sarRadar: 88,
          operations: 85
        }
      }
    ],
    primaryObjectives: [
      'Rover Mobility & Trafficability',
      'Astrobiology & Biosignature Detection',
      'EVA Space Suit & Dust Abrasion'
    ],
    whyAnalogous: 'The Qaidam Basin is the highest, coldest, and largest hyper-arid cold desert on Earth. It features thousands of square kilometers of wind-carved yardangs, dry salt lakes (playas), and evaporite deposits composed of magnesium sulfate (epsomite, hexahydrite), gypsum, halite, and trace perchlorates—mirroring the mineralogy of Mars Gale Crater and Medusae Fossae. Cold winters plunge to -32°C under harsh ultraviolet radiation due to high altitude (>3,000m).',
    whereAnalogyBreaksDown: {
      gravity: '1.0g suppresses fine aerosol suspension times compared to Martian 0.38g low-gravity saltation.',
      atmosphere: 'Surface pressure of ~700 hPa is low for Earth, but roughly 100 times denser than Mars 6 hPa atmosphere.',
      radiation: 'Though UV flux is the highest in Asia, galactic cosmic ray dosage is mitigated by the remaining atmosphere.',
      hydrologyOrBiology: 'Subsurface brines support haloarchaea and endolithic microorganisms beneath salt crusts.'
    },
    sarDataProfile: {
      sensor: 'Copernicus Sentinel-1 SAR & RADARSAT-1',
      polarization: 'VV + VH Dual-polarization',
      roughnessEstimation: 'Distinct directional scattering asymmetry due to aerodynamic ridge orientation (wind azimuth)',
      dielectricPermittivity: 3.8, // Dry porous sulfate evaporite crust
      subsurfacePenetrationDepth: '1.2 - 2.5 meters in dry salt-sand sheets',
      planetarySensorEquivalent: 'Mars Reconnaissance Orbiter (MRO) SHARAD Sounder'
    },
    testingUseCases: [
      {
        title: 'Mars Rover High-Centering & Soft Sulfate Sand Navigation',
        description: 'Simulating the Pahrump Hills and sulfate unit rover traversals to validate autonomous path planners against sinkage hazards.',
        hardwareTarget: 'Autonomous Mars Rover Drive System & Stereo Cameras'
      },
      {
        title: 'Deep-UV Raman & Luminescence Spectrometer Calibration',
        description: 'Field testing SHERLOC-equivalent deep-UV Raman spectrometers on polyhydrated sulfates and endolithic organic biosignatures.',
        hardwareTarget: 'Deep-UV Raman / Luminescence Spectrometer'
      }
    ],
    nasaAndSpaceAgencyDatasets: [
      {
        datasetName: 'NASA Terra/Aqua MODIS Surface Temperature & Albedo',
        agency: 'NASA',
        url: 'https://worldview.earthdata.nasa.gov/',
        dataProduct: 'MOD11A1 Daily Land Surface Temperature'
      },
      {
        datasetName: 'ESA Copernicus Sentinel-1 C-SAR GRD',
        agency: 'ESA',
        url: 'https://dataspace.copernicus.eu/',
        dataProduct: 'IW High-Resolution Backscatter Mosaic'
      },
      {
        datasetName: 'NASA ASTER Global Digital Elevation Model (GDEM v3)',
        agency: 'NASA',
        url: 'https://search.earthdata.nasa.gov/',
        dataProduct: 'ASTGTM 1-arc-second'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tenoumer-impact-crater',
    name: 'Tenoumer Impact Crater (Saharan Breccia)',
    tier: 'Novel/Understudied',
    country: 'Mauritania, Western Sahara',
    coordinates: {
      lat: 22.918,
      lng: -10.407,
      displayCoords: '22°55\'N, 10°24\'W'
    },
    elevationMeters: 410,
    temperatureRangeC: [6, 49],
    primaryGeology: 'Deep Impact Crater excavated into Crystalline Basement and Sandstone, veiled by hyper-arid active dunes',
    bestMatchedPlanetaryTargets: [
      {
        targetId: 'luna-shackleton-rim',
        similarityScore: 82.4,
        dimensions: {
          topography: 94,
          thermal: 42,
          geology: 85,
          cryosphere: 20,
          sarRadar: 96,
          operations: 89
        }
      },
      {
        targetId: 'mars-arcadia-planitia',
        similarityScore: 78.6,
        dimensions: {
          topography: 88,
          thermal: 50,
          geology: 84,
          cryosphere: 30,
          sarRadar: 95,
          operations: 83
        }
      }
    ],
    primaryObjectives: [
      'Rover Mobility & Trafficability',
      'EVA Space Suit & Dust Abrasion'
    ],
    whyAnalogous: 'Tenoumer is a textbook simple bowl-shaped impact crater (1.9 km diameter, 110 m depth) sitting in a hyper-arid desert. Its geometry is preserved almost without water fluvial erosion, providing an ideal morphometric analog for fresh simple craters on the Moon and Mars. Most critically, because it is surrounded by hyper-dry quartz sand sheets with extremely low dielectric loss (loss tangent tan delta < 0.005), Synthetic Aperture Radar (SAR) can penetrate the dry surface sand to reveal the buried ejecta blanket, mirroring radar sounding on the Moon and Mars.',
    whereAnalogyBreaksDown: {
      gravity: '1.0g causes steeper stable scree slopes (34° angle of repose) than lunar lower gravity talus fields.',
      atmosphere: 'High surface wind velocities drive rapid sand dune saltation and abrasive quartz dust.',
      radiation: 'High daytime temperatures reaching 49°C without the extreme cryogenic drops found on the lunar night side.',
      hydrologyOrBiology: 'Completely arid and devoid of surface water, but lacks the permafrost or polar ice of Shackleton.'
    },
    sarDataProfile: {
      sensor: 'RADARSAT-1 C-Band (HH) & ALOS PALSAR L-Band',
      polarization: 'HH / HV Polarimetric',
      roughnessEstimation: 'Smooth overlying sand dune cover (RMS < 0.8 cm) contrasting sharply with hidden jagged ejecta blocks (RMS > 6 cm)',
      dielectricPermittivity: 2.7, // Bone-dry hyper-arid silica/ejecta
      subsurfacePenetrationDepth: '3.0 - 5.5 meters beneath dry sand sheet',
      planetarySensorEquivalent: 'LRO Mini-RF & Mars SHARAD Subsurface Sounding'
    },
    testingUseCases: [
      {
        title: 'Radar Sounder Inversion Algorithm Validation',
        description: 'Using orbital C-band and L-band SAR to test blind inversion algorithms for reconstructing buried crater rims and basalt ejecta blocks under dust.',
        hardwareTarget: 'Orbital Ground-Penetrating Radar / Rover GPR'
      },
      {
        title: 'Steep Rim Traverse & Tethered Rover Belay',
        description: 'Deploying rappelling cliff-rover prototypes down the 30° inner slopes of the crater rim to test anchor placement and winching.',
        hardwareTarget: 'Axel / Extreme Terrain Rappelling Rover'
      }
    ],
    nasaAndSpaceAgencyDatasets: [
      {
        datasetName: 'CSA RADARSAT-1 High-Resolution SAR Mosaic',
        agency: 'CSA',
        url: 'https://donnees-data.asc-csa.gc.ca/en/dataset/radarsat1',
        dataProduct: 'Fine Beam SAR Mode (8m pixel resolution)'
      },
      {
        datasetName: 'NASA Earthdata Landsat-8/9 OLI Thermal & Optical',
        agency: 'NASA',
        url: 'https://search.earthdata.nasa.gov/',
        dataProduct: 'Level-2 Surface Reflectance'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'askja-dyngjufjoll-caldera',
    name: 'Askja & Holuhraun Lava Fields',
    tier: 'Novel/Understudied',
    country: 'Central Highlands, Iceland',
    coordinates: {
      lat: 65.03,
      lng: -16.75,
      displayCoords: '65°02\'N, 16°45\'W'
    },
    elevationMeters: 1100,
    temperatureRangeC: [-24, 15],
    primaryGeology: 'Glaciovolcanic Tholeiitic Basalts, Pumice Deposits, and Fresh 2014-2015 Holuhraun Flood Basalts',
    bestMatchedPlanetaryTargets: [
      {
        targetId: 'luna-shackleton-rim',
        similarityScore: 86.7,
        dimensions: {
          topography: 85,
          thermal: 78,
          geology: 96,
          cryosphere: 79,
          sarRadar: 94,
          operations: 91
        }
      },
      {
        targetId: 'luna-malapert-mountain',
        similarityScore: 85.3,
        dimensions: {
          topography: 90,
          thermal: 74,
          geology: 93,
          cryosphere: 70,
          sarRadar: 92,
          operations: 88
        }
      }
    ],
    primaryObjectives: [
      'Rover Mobility & Trafficability',
      'Basaltic Sintering & Construction',
      'EVA Space Suit & Dust Abrasion'
    ],
    whyAnalogous: 'Askja is a remote volcanic caldera in the volcanic highlands of Iceland where Apollo 11, 15, and 17 astronauts originally trained. Today, the adjacent Holuhraun lava field (emplaced in 2014-2015) provides the freshest, least-weathered basaltic lava flow on Earth. The black basaltic tephra, zero vegetation, sub-zero snow cover, and high-relief volcanic peaks offer an exact morphological and chemical analog for young lunar volcanic surfaces and martian volcanic plains.',
    whereAnalogyBreaksDown: {
      gravity: '1.0g reduces the height of volcanic fountains and lava flow spread thickness compared to lunar vacuum volcanism.',
      atmosphere: 'High winds, rain, and snow melting cycle create seasonal freeze-thaw and hydrological runoff.',
      radiation: 'Terrestrial ozone layer prevents hard ionizing radiation exposure.',
      hydrologyOrBiology: 'Geothermal hot springs (Víti crater) harbor thermophilic bacteria with liquid water present.'
    },
    sarDataProfile: {
      sensor: 'Copernicus Sentinel-1 SAR & RADARSAT-1',
      polarization: 'Dual-pol VV/VH with Coherence Tracking',
      roughnessEstimation: 'Extreme jagged `a`ā lava roughness with RMS height > 8 cm causing intense diffuse backscatter',
      dielectricPermittivity: 5.4, // Dry fresh basalt
      subsurfacePenetrationDepth: '0.8 - 1.5 meters into vesicular basalt crust',
      planetarySensorEquivalent: 'LRO Mini-RF & Chandrayaan-2 DFSAR'
    },
    testingUseCases: [
      {
        title: 'Artemis Surface EVA Suit Joint Abrasion Testing',
        description: 'Simulating crew planetary geology traverses on sharp, vesicular basaltic scoria to test spacesuit fabric wear, seal integrity, and joint mobility.',
        hardwareTarget: 'Axiom Space Artemis III xEVAS Spacesuit Prototypes'
      },
      {
        title: 'Multi-Agent Autonomous Rover Swarm Navigation',
        description: 'Field deploying cooperative scout rovers to map obstacle fields and navigate GPS-denied volcanic terrain using visual SLAM and LiDAR.',
        hardwareTarget: 'Cooperative Autonomous Scout Rovers (CADRE)'
      }
    ],
    nasaAndSpaceAgencyDatasets: [
      {
        datasetName: 'ESA Sentinel-1 SAR Interferometry Data',
        agency: 'ESA',
        url: 'https://dataspace.copernicus.eu/',
        dataProduct: 'Level-1 Single Look Complex (SLC) Coherence'
      },
      {
        datasetName: 'NASA Earthdata Worldview Daily Snow Cover / Surface Thermal',
        agency: 'NASA',
        url: 'https://worldview.earthdata.nasa.gov/',
        dataProduct: 'VIIRS Daily Snow Cover & Surface Reflectance'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'owyhee-malheur-cave',
    name: 'Owyhee Plateau & Malheur Lava Tube System',
    tier: 'Novel/Understudied',
    country: 'Oregon / Idaho, USA',
    coordinates: {
      lat: 43.15,
      lng: -117.82,
      displayCoords: '43°09\'N, 117°49\'W'
    },
    elevationMeters: 1350,
    temperatureRangeC: [-18, 38], // Surface extremes, but subterranean cave is stable at +4°C to -2°C
    primaryGeology: 'Plio-Pleistocene Basalt Flows with Massive Intact Lava Tube Caverns and Skylight Collapses',
    bestMatchedPlanetaryTargets: [
      {
        targetId: 'luna-marius-hills',
        similarityScore: 92.4,
        dimensions: {
          topography: 95,
          thermal: 91,
          geology: 96,
          cryosphere: 80,
          sarRadar: 88,
          operations: 94
        }
      },
      {
        targetId: 'mars-arcadia-planitia',
        similarityScore: 83.1,
        dimensions: {
          topography: 85,
          thermal: 80,
          geology: 89,
          cryosphere: 78,
          sarRadar: 84,
          operations: 82
        }
      }
    ],
    primaryObjectives: [
      'Subsurface Shelter & Lava Tubes',
      'Rover Mobility & Trafficability',
      'Basaltic Sintering & Construction'
    ],
    whyAnalogous: 'The Owyhee volcanic province contains some of North America’s best-preserved basaltic lava tube structures, featuring large skylight collapses (analogous to the Marius Hills pit on the Moon and Arsia Mons pits on Mars). Inside the lava tubes, temperature remains completely decoupled from violent surface thermal swings, hovering near freezing year-round, and preserving perennial subterranean ice deposits and mineral speleothems.',
    whereAnalogyBreaksDown: {
      gravity: 'Under Earth 1.0g gravity, lava tube ceiling spans rarely exceed 30 meters without collapsing. Under lunar 0.16g, structural engineering models prove lava tubes can safely span over 300 to 500 meters.',
      atmosphere: 'Earth cave air is breathable and moist; lunar tubes are in absolute hard vacuum.',
      radiation: 'Surface cosmic rays are shielded by rock overhead similarly to the Moon, but subterranean radon accumulation is higher on Earth.',
      hydrologyOrBiology: 'Dripping seasonal meteoric waters support bat colonies and terrestrial fungal/bacterial biomes.'
    },
    sarDataProfile: {
      sensor: 'NASA/JAXA UAVSAR & Sentinel-1 C-SAR',
      polarization: 'Full Quad-Pol / Interferometric',
      roughnessEstimation: 'Smooth ceiling pahoehoe vs blocky breakdown floor talus',
      dielectricPermittivity: 6.8, // Dense basalt roof rock
      subsurfacePenetrationDepth: 'Subsurface cavity geometry detected via surface subsidence and SAR interferometry phase decorrelation',
      planetarySensorEquivalent: 'SELENE (Kaguya) Lunar Radar Sounder & LROC NAC'
    },
    testingUseCases: [
      {
        title: 'Autonomous Subsurface Drone & LiDAR Mapping',
        description: 'Testing optical-inertial SLAM autonomous micro-drones for penetrating unlit, GPS-denied lava tubes through skylights.',
        hardwareTarget: 'Autonomous Subterranean Micro-Drone / LiDAR Scout'
      },
      {
        title: 'Inflatable Habitat Deployment Inside Basalt Vaults',
        description: 'Deploying expandable habitat mockups within subterranean basalt caverns to test pressure seal anchoring against basalt rock walls.',
        hardwareTarget: 'Pneumatic Expandable Surface/Subsurface Habitat Module'
      }
    ],
    nasaAndSpaceAgencyDatasets: [
      {
        datasetName: 'NASA Earthdata 3DEP 1-Meter Lidar Bare-Earth DEM',
        agency: 'NASA',
        url: 'https://search.earthdata.nasa.gov/',
        dataProduct: '3D Elevation Program (3DEP) High-Resolution LiDAR'
      },
      {
        datasetName: 'ESA Sentinel-1 InSAR Deformation Products',
        agency: 'ESA',
        url: 'https://dataspace.copernicus.eu/',
        dataProduct: 'InSAR Ground Displacement'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ellesmere-borup-pass',
    name: 'Ellesmere Island & Borup Pass Cryogenic Springs',
    tier: 'Novel/Understudied',
    country: 'Nunavut, Canadian High Arctic',
    coordinates: {
      lat: 80.95,
      lng: -82.15,
      displayCoords: '80°57\'N, 82°09\'W'
    },
    elevationMeters: 450,
    temperatureRangeC: [-48, 8],
    primaryGeology: 'Continuous High-Latitude Permafrost with Cryogenic Sulfide Springs Discharging over Glacial Ice',
    bestMatchedPlanetaryTargets: [
      {
        targetId: 'luna-shackleton-rim',
        similarityScore: 91.8,
        dimensions: {
          topography: 88,
          thermal: 92,
          geology: 85,
          cryosphere: 98,
          sarRadar: 95,
          operations: 89
        }
      },
      {
        targetId: 'mars-arcadia-planitia',
        similarityScore: 93.5,
        dimensions: {
          topography: 92,
          thermal: 93,
          geology: 88,
          cryosphere: 99,
          sarRadar: 96,
          operations: 91
        }
      }
    ],
    primaryObjectives: [
      'Cryogenic Ice & Drilling (ISRU)',
      'Astrobiology & Biosignature Detection',
      'EVA Space Suit & Dust Abrasion'
    ],
    whyAnalogous: 'Borup Pass on Ellesmere Island is the only known site on Earth where low-temperature sub-zero sulfuric springs discharge elemental sulfur, gypsum, and hydrogen sulfide directly onto glacial ice sheets. Continuous permafrost extends over 500 meters deep under multi-month polar night conditions (-48°C), making it the premier terrestrial analog for studying volatile ice preservation in lunar South Pole PSRs and the ice-mantled plains of Arcadia Planitia on Mars.',
    whereAnalogyBreaksDown: {
      gravity: '1.0g gravity affects ice creep rates and slurry flow viscosity.',
      atmosphere: 'Polar atmosphere retains moisture and ozone, protecting against direct cosmic ray bombardment.',
      radiation: 'Though exposed to months of 24-hour polar winter darkness, it does not experience the hard 40 K cryogenic minimums of lunar permanently shadowed craters.',
      hydrologyOrBiology: 'Liquid brine springs are sustained by deep geothermal gradients and harbor specialized cold-tolerant sulfur-oxidizing bacteria.'
    },
    sarDataProfile: {
      sensor: 'RADARSAT-1 C-Band & Sentinel-1 SAR',
      polarization: 'HH / VV Dual-pol interferometric',
      roughnessEstimation: 'Glacial ice with micro-crevasses and permafrost polygonal patterned ground (RMS 1.5 - 3.2 cm)',
      dielectricPermittivity: 3.15, // Low-loss pure glacier ice
      subsurfacePenetrationDepth: '10 to 25 meters through cryogenic dry ice / permafrost',
      planetarySensorEquivalent: 'LRO Mini-RF & Mars SHARAD Subsurface Sounding'
    },
    testingUseCases: [
      {
        title: 'Deep Cryogenic Permafrost Core Drilling & Volatile Seal',
        description: 'Operating rotary-percussive drills in sub-zero permafrost to extract volatile-bearing ice cores without thermal sublimation during retrieval.',
        hardwareTarget: 'VIPER / TRIDENT 1-Meter Cryogenic Ice Drill'
      },
      {
        title: 'Subsurface Radar Ice Sounding Calibration',
        description: 'Validating VHF/UHF radar sounder echoes against known permafrost ice-wedge depths to tune Mars SHARAD and Europa Clipper algorithms.',
        hardwareTarget: 'Ground-Penetrating Ice Radar Sounder'
      }
    ],
    nasaAndSpaceAgencyDatasets: [
      {
        datasetName: 'CSA RADARSAT-1 High Arctic Mosaic Product',
        agency: 'CSA',
        url: 'https://donnees-data.asc-csa.gc.ca/en/dataset/radarsat1',
        dataProduct: 'Calibrated Polar C-Band Backscatter'
      },
      {
        datasetName: 'NASA Earthdata Cryosphere / MEaSUREs Greenland & Arctic DEM',
        agency: 'NASA',
        url: 'https://search.earthdata.nasa.gov/',
        dataProduct: 'ArcticDEM 2m Resolution'
      },
      {
        datasetName: 'CSA SAR Tutorial Polarimetry & Dielectric Code',
        agency: 'CSA',
        url: 'https://github.com/asc-csa/Synthetic_Aperture_Radar_Tutorial',
        dataProduct: 'SAR Polarimetric Decomposition Notebooks'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'salar-de-uyuni-altiplano',
    name: 'Salar de Uyuni & Laguna Diamante (Altiplano)',
    tier: 'Novel/Understudied',
    country: 'Bolivian Altiplano & Argentine Andes',
    coordinates: {
      lat: -20.13,
      lng: -67.48,
      displayCoords: '20°08\'S, 67°29\'W'
    },
    elevationMeters: 3656,
    temperatureRangeC: [-20, 22],
    primaryGeology: 'Vast Lithium-Magnesium Evaporitic Halite Crust with Hydrothermal Inflows and Extremo-Microbial Mats',
    bestMatchedPlanetaryTargets: [
      {
        targetId: 'mars-jezero-crater',
        similarityScore: 88.5,
        dimensions: {
          topography: 93,
          thermal: 85,
          geology: 91,
          cryosphere: 72,
          sarRadar: 94,
          operations: 86
        }
      },
      {
        targetId: 'mars-mawrth-vallis',
        similarityScore: 86.4,
        dimensions: {
          topography: 90,
          thermal: 82,
          geology: 93,
          cryosphere: 70,
          sarRadar: 91,
          operations: 84
        }
      }
    ],
    primaryObjectives: [
      'Astrobiology & Biosignature Detection',
      'Rover Mobility & Trafficability',
      'EVA Space Suit & Dust Abrasion'
    ],
    whyAnalogous: 'At over 3,600 meters elevation, Salar de Uyuni is the world’s largest salt flat (10,500 km²), subjected to extreme ultraviolet radiation, sub-zero nighttime temperatures, and hyper-saline brines rich in lithium, magnesium, boron, and carbonates. Nearby Laguna Diamante hosts living stromatolites and extremophilic microbial consortia thriving under toxic arsenic, UV-B levels 30% higher than sea level, and severe desiccation—providing a direct window into Mars paleolake biosignature preservation.',
    whereAnalogyBreaksDown: {
      gravity: '1.0g gravity influences crystal nucleation and brine capillary rise.',
      atmosphere: 'Barometric pressure (~650 hPa) is low for humans but far higher than Mars 6 hPa.',
      radiation: 'High UV-B and UV-A fluxes, but solar cosmic rays and hard gamma rays are attenuated.',
      hydrologyOrBiology: 'Extensive seasonal water sheets flood the salt flat during the southern summer, creating shallow standing brine.'
    },
    sarDataProfile: {
      sensor: 'Copernicus Sentinel-1 SAR & RADARSAT-1',
      polarization: 'VV / VH Co-pol and Cross-pol',
      roughnessEstimation: 'Polygonal salt ridge heave (ridges 5-15 cm high) producing specular reflection when wet, rough diffuse scatter when dry',
      dielectricPermittivity: 4.2, // Dry halite/sulfate crust
      subsurfacePenetrationDepth: '1.5 to 3.0 meters into dry salt beds',
      planetarySensorEquivalent: 'Mars Express OMEGA & MRO CRISM/SHARAD'
    },
    testingUseCases: [
      {
        title: 'Biosignature Laser Induced Fluorescence Testing',
        description: 'Testing bio-fluorescence imager sensitivity on living extremophilic endoliths embedded inside halite crystal fluid inclusions.',
        hardwareTarget: 'SHERLOC / UV Fluorescence Biosignature Imager'
      },
      {
        title: 'Salt Crust Rover Traction & Wheel Chemical Corrosion',
        description: 'Evaluating metal alloy wheel degradation, bearing seals, and motor torque against abrasive, corrosive evaporite salts.',
        hardwareTarget: 'Titanium / Shape Memory Alloy Rover Wheels'
      }
    ],
    nasaAndSpaceAgencyDatasets: [
      {
        datasetName: 'NASA Earthdata Landsat Surface Water & Evaporite Mineral Index',
        agency: 'NASA',
        url: 'https://search.earthdata.nasa.gov/',
        dataProduct: 'Landsat-8 Surface Reflectance (SWIR/VNIR)'
      },
      {
        datasetName: 'ESA Sentinel-1 SAR Backscatter Time Series',
        agency: 'ESA',
        url: 'https://dataspace.copernicus.eu/',
        dataProduct: 'Sentinel-1 Dual-Pol GRD Time Series'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'haughton-impact-crater',
    name: 'Haughton Impact Crater (Devon Island)',
    tier: 'Benchmark',
    country: 'Nunavut, Canadian High Arctic',
    coordinates: {
      lat: 75.38,
      lng: -89.67,
      displayCoords: '75°23\'N, 89°40\'W'
    },
    elevationMeters: 200,
    temperatureRangeC: [-45, 10],
    primaryGeology: 'Complex Impact Crater in Dolomite & Limestone Target Rock with Impact Breccia & Permafrost Patterned Ground',
    bestMatchedPlanetaryTargets: [
      {
        targetId: 'luna-shackleton-rim',
        similarityScore: 88.9,
        dimensions: {
          topography: 92,
          thermal: 87,
          geology: 84,
          cryosphere: 96,
          sarRadar: 92,
          operations: 94
        }
      },
      {
        targetId: 'mars-jezero-crater',
        similarityScore: 90.1,
        dimensions: {
          topography: 93,
          thermal: 89,
          geology: 86,
          cryosphere: 95,
          sarRadar: 91,
          operations: 95
        }
      }
    ],
    primaryObjectives: [
      'Rover Mobility & Trafficability',
      'EVA Space Suit & Dust Abrasion',
      'Cryogenic Ice & Drilling (ISRU)'
    ],
    whyAnalogous: 'Devon Island hosts the NASA Haughton-Mars Project (HMP) test site. It is a 23-km diameter complex impact structure in a high-latitude polar desert with shatter cones, hydrothermal paleo-vent deposits, and continuous permafrost. The rocky, unvegetated valley bottoms and steep crater walls simulate both the morphology of lunar polar craters and Martian impact craters.',
    whereAnalogyBreaksDown: {
      gravity: '1.0g gravity limits rover hop dynamics and regolith kickup compared to Moon (0.16g).',
      atmosphere: 'High arctic winds create freeze-drying and blizzard drifts with terrestrial atmospheric pressure.',
      radiation: 'Terrestrial geomagnetic field deflects major solar particle events.',
      hydrologyOrBiology: 'Target rock is predominantly carbonate/dolomite rather than pure basalt/anorthosite.'
    },
    sarDataProfile: {
      sensor: 'RADARSAT-1 C-Band & Sentinel-1',
      polarization: 'HH / VV Polarimetric',
      roughnessEstimation: 'Polygonal permafrost cracking and polymict impact breccia hills (RMS 3.0 - 5.5 cm)',
      dielectricPermittivity: 5.8, // Dolomitic impact breccia
      subsurfacePenetrationDepth: '1.5 - 4.0 meters in dry permafrost breccia',
      planetarySensorEquivalent: 'LRO Mini-RF & Mars SHARAD'
    },
    testingUseCases: [
      {
        title: 'Long-Range Crewed Rover Traverse & Habitation Protocol',
        description: 'Conducting multi-day simulated lunar/martian surface EVAs to benchmark crew communication delays, metabolic rates, and rover autonomy.',
        hardwareTarget: 'NASA Space Exploration Vehicle (SEV) Analog'
      }
    ],
    nasaAndSpaceAgencyDatasets: [
      {
        datasetName: 'CSA RADARSAT-1 Devon Island Product',
        agency: 'CSA',
        url: 'https://donnees-data.asc-csa.gc.ca/en/dataset/radarsat1',
        dataProduct: 'RADARSAT-1 Fine Mode Orthorectified Image'
      },
      {
        datasetName: 'NASA Earthdata ASTER Thermal & Mineral Indices',
        agency: 'NASA',
        url: 'https://search.earthdata.nasa.gov/',
        dataProduct: 'AST_07 Surface Reflectance'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'atacama-yungay',
    name: 'Atacama Desert (Yungay Hyper-Arid Core)',
    tier: 'Benchmark',
    country: 'Antofagasta Region, Chile',
    coordinates: {
      lat: -24.06,
      lng: -69.87,
      displayCoords: '24°04\'S, 69°52\'W'
    },
    elevationMeters: 1020,
    temperatureRangeC: [2, 38],
    primaryGeology: 'Hyper-Arid Soil with Nitrate & Perchlorate Crusts, Palygorskite, and Gypsum',
    bestMatchedPlanetaryTargets: [
      {
        targetId: 'mars-jezero-crater',
        similarityScore: 87.2,
        dimensions: {
          topography: 82,
          thermal: 76,
          geology: 94,
          cryosphere: 85,
          sarRadar: 95,
          operations: 88
        }
      },
      {
        targetId: 'mars-arcadia-planitia',
        similarityScore: 84.6,
        dimensions: {
          topography: 86,
          thermal: 72,
          geology: 90,
          cryosphere: 80,
          sarRadar: 94,
          operations: 86
        }
      }
    ],
    primaryObjectives: [
      'Astrobiology & Biosignature Detection',
      'EVA Space Suit & Dust Abrasion',
      'Rover Mobility & Trafficability'
    ],
    whyAnalogous: 'The Yungay region in the Atacama Desert is the driest non-polar desert on Earth, with rainfall absent for decades. The soil contains natural oxychlorine species (perchlorates) identical to those discovered by the NASA Phoenix lander and Curiosity on Mars. Organic carbon content is below detection limits in surface soils, making it the classic benchmark for testing Mars life-detection instruments at the threshold of detectability.',
    whereAnalogyBreaksDown: {
      gravity: '1.0g gravity affects soil bearing capacity and wheel grouser shear resistance.',
      atmosphere: 'Ambient pressure (~900 hPa) with standard Earth air composition.',
      radiation: 'Intense surface solar irradiance and UV, but zero cosmic ray exposure.',
      hydrologyOrBiology: 'Microbial hypolithic communities survive beneath translucent quartz pebbles that condense morning fog.'
    },
    sarDataProfile: {
      sensor: 'RADARSAT-1 & Sentinel-1 C-Band',
      polarization: 'HH / VV Co-pol',
      roughnessEstimation: 'Extremely flat desert pavement with wind-deflated lag gravel (RMS 0.5 - 1.2 cm)',
      dielectricPermittivity: 2.8, // Ultra-dry nitrate/perchlorate soil
      subsurfacePenetrationDepth: '2.5 to 5.0 meters in hyper-dry regolith',
      planetarySensorEquivalent: 'Mars SHARAD Subsurface Radar'
    },
    testingUseCases: [
      {
        title: 'Vapor-Phase & Organic Carbon Life Detection Thresholds',
        description: 'Benchmarking mass spectrometry and gas chromatography pyrolysis systems on low-biomass soils to evaluate false-positive contamination risks.',
        hardwareTarget: 'SAM / MOMA Gas Chromatography Mass Spectrometer'
      }
    ],
    nasaAndSpaceAgencyDatasets: [
      {
        datasetName: 'NASA Earthdata MODIS / ASTER Surface Temperature and Emissivity',
        agency: 'NASA',
        url: 'https://search.earthdata.nasa.gov/',
        dataProduct: 'AST_08 Surface Emissivity'
      },
      {
        datasetName: 'ESA Sentinel-1 C-SAR Surface Roughness',
        agency: 'ESA',
        url: 'https://dataspace.copernicus.eu/',
        dataProduct: 'Sentinel-1 Dual-Pol GRD'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
  }
];
