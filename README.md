# AEGIS: Analog Earth Geospatial Intelligence System
### NASA International Space Apps Challenge 2026
**Challenge**: *Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars*

---

## 🚀 Overview

Selecting future landing sites and permanent surface base locations for the **Moon (Artemis Base Camp)** and **Mars (Starship / MSR)** depends on topography, geology, thermal extremes, and in-situ resources. 

While classical analog sites like the Atacama Desert or Devon Island are well known, **they do not capture all critical planetary dimensions and leave many regimes unaddressed**.

**AEGIS (Analog Earth Geospatial Intelligence System)** combines open data from **NASA, the Canadian Space Agency (CSA), and the European Space Agency (ESA)** to systematically discover, characterize, and rank **novel, previously understudied Earth analogs** using a multi-criteria mathematical scoring framework called **PASI** (Planetary Analog Similarity Index).

---

## 🌟 The "Surprise Factor": Newly Characterized Understudied Analogs

Meeting the NASA Space Apps directive to *"Look beyond well-known analog sites"* and *"Surprise us"*, AEGIS actively **searches Earth observation grids to discover previously unrecognized sites**, rather than just displaying popular ones:

### Autonomous Planetary Analog Discovery Engine (APADE) Features:
1. **Global Earth Raster Scanner**: Automatically evaluates terrain roughness, thermal inertia, C-band radar scattering, and lithological indices across unconventional global regions.
2. **On-the-Fly GPS Coordinate Diagnostic Probe**: Enter **any latitude and longitude on Earth** (or click any point) to dynamically calculate its analog fidelity, dielectric skin depth, and breakdown limitations against Moon and Mars targets.
3. **Newly Discovered Non-Mainstream Analogs**:
   * **Batagaika Permafrost Megaslump (Siberian Yana Highlands, 67.58°N, 134.77°E)**: World's largest permafrost retrogressive thaw slump exposing 650,000-year-old Yedoma ice wedges, identically mirroring Martian scalloped depressions in Arcadia Planitia.
   * **Harrat Ash Shaam (Jordan / Saudi Arabia, 32.18°N, 36.95°E)**: Vast, unstudied 40,000 km² basalt volcanic field with hundreds of intact lava tubes and collapse skylights directly simulating the Marius Hills lunar pit.
   * **Dallol Hydrothermal Field (Danakil Depression, Ethiopia, 14.24°N, 40.30°E)**: Lowest sub-aerial depression on Earth (-125m) with boiling pH < 0 hyper-acidic brine pools and sulfur chimneys, simulating early Martian Noachian volcano-lacustrine hydrothermal systems.
   * **Tanezrouft Basin (Southern Algerian Sahara, 25.10°N, -0.15°W)**: "Land of Terror" with 0 mm rainfall, 0% vegetation, and barren concentric folded bedrock with ultra-high radar penetration.
   * **Zackenberg Polar Valley (Northeast Greenland, 74.47°N, -20.57°W)**: 300m deep permafrost with cryogenic thermal-contraction stone polygons and rock glaciers mimicking lunar South Pole cryogenic regolith.
   * **Lonar Impact Crater (Maharashtra, India)**: Earth's only hypervelocity impact crater formed entirely within continental flood basalt (Deccan Traps).
   * **Qaidam Basin Yardangs (Tibetan Plateau, China)**: Highest and coldest hyper-arid desert on Earth (3,100m elevation) with -32°C winter freezes and polyhydrated magnesium sulfates.


---

## 📐 Scientific Formulation: Planetary Analog Similarity Index (PASI)

AEGIS scores analog candidates using a multi-criteria weighted index:

$$\text{PASI} = \sum_{i=1}^{6} w_i \cdot S_i \quad \text{where} \quad \sum w_i = 1.0$$

The six dimensions evaluated are:
* **$S_{\text{topo}}$ (Topography & Roughness)**: Slope distribution ($\theta$), RMS surface roughness ($\xi_{\text{RMS}}$), crater morphology (LOLA/HiRISE vs SRTM/ASTER).
* **$S_{\text{therm}}$ (Thermal Extremes)**: Diurnal temperature swing, cryogenic minimums, and thermal inertia ($I = \sqrt{k\rho c}$) from LRO Diviner & MODIS LST.
* **$S_{\text{geo}}$ (Geology & Shock Metamorphism)**: Basalt geochemistry, maskelynite, clay phyllosilicates, and evaporites.
* **$S_{\text{cryo}}$ (Cryosphere & Permafrost)**: Ground ice stability, sub-zero permafrost depth, and desiccation.
* **$S_{\text{sar}}$ (Synthetic Aperture Radar & Dielectrics)**: C-band backscatter ($\sigma^0$), dielectric constant ($\varepsilon_r$), and radar skin depth ($\delta_p$) using CSA RADARSAT-1 and Sentinel-1.
* **$S_{\text{ops}}$ (Hardware Testing Utility)**: Practical testability for rover wheels, cryogenic ice coring, space suit abrasion, and microwave sintering.

---

## ⚖️ Scientific Rigor: Where the Analogy Breaks Down

As required by NASA Space Apps Challenge evaluation criteria:
* **Gravity Discrepancy**: Earth (1.0g) vs Moon (0.166g) vs Mars (0.38g) alters rover wheel slip, soil compaction, and angle of repose.
* **Atmospheric Density**: Earth (1013 hPa) vs Moon ($10^{-12}$ hPa hard vacuum) vs Mars (~6 hPa) results in terrestrial convective heat loss and chemical weathering of impact glasses.
* **Ionizing Radiation**: Terrestrial magnetosphere and ozone shield block Solar Particle Events (SPE) and Galactic Cosmic Rays (GCR).
* **Hydrology & Biology**: Seasonal meteoric water and native extremophile biomes contrast with sterile extraterrestrial environments.

---

## 🛰️ Open Space Agency Datasets Integrated

* **NASA Earthdata**: SRTM 30m DEM, ASTER GDEM v3, MODIS Land Surface Temperature (MOD11A1), Landsat-8/9 Surface Reflectance.
* **NASA Planetary Data System (PDS)**: LRO Diviner Lunar Radiometer, LRO LOLA Topography, LROC NAC, MRO CRISM/SHARAD.
* **Canadian Space Agency (CSA)**: RADARSAT-1 C-Band Open Data, Synthetic Aperture Radar Tutorial & Polarimetric code.
* **European Space Agency (ESA)**: Copernicus Data Space Ecosystem (Sentinel-1 C-SAR, Sentinel-2), ESA Open Science Data Hub.

---

## 🛠️ Quickstart

### 1. Run Interactive Web Application (Mission Control)
```bash
# Install dependencies (already installed in workspace)
npm install

# Start local development server
npm run dev
```
Open `http://localhost:3000` in your browser.

### 2. Build for Production
```bash
npm run build
```

### 3. Run Python Scientific Engine
```bash
python scripts/pasi_processor.py
```
Outputs automated PASI multi-dimensional scores and Maxwell microwave penetration depths across geological media.
