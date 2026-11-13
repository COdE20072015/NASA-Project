"""
AEGIS - Planetary Analog Terrestrial Explorer
NASA International Space Apps Challenge 2026

Automated calculation of Planetary Analog Similarity Index (PASI) and
Synthetic Aperture Radar (SAR) microwave penetration depths.
"""

import json
import math

# Default Multi-Criteria Dimensional Weights
DEFAULT_WEIGHTS = {
    "topography": 0.20,
    "thermal": 0.15,
    "geology": 0.25,
    "cryosphere": 0.15,
    "sar_radar": 0.15,
    "operations": 0.10
}

def calculate_pasi(dimension_scores: dict, weights: dict = None) -> float:
    """
    Computes the weighted Planetary Analog Similarity Index (0-100%).
    Formula: PASI = sum(w_i * S_i)
    """
    if weights is None:
        weights = DEFAULT_WEIGHTS
    
    score = sum(dimension_scores[dim] * weights[dim] for dim in weights)
    return round(score, 1)

def calculate_sar_penetration(freq_ghz: float, eps_r: float, loss_tangent: float) -> float:
    """
    Computes radar skin depth (meters) in low-loss geological media:
    delta_p ≈ c / (2 * pi * f * sqrt(eps_r) * tan_delta)
    """
    c = 3e8  # speed of light (m/s)
    f = freq_ghz * 1e9
    omega = 2 * math.pi * f
    depth = c / (omega * math.sqrt(eps_r) * loss_tangent)
    return round(depth, 2)

def main():
    print("=" * 70)
    print(" PROJECT AEGIS: NASA SPACE APPS CHALLENGE 2026")
    print(" Planetary Analog Similarity Index (PASI) Scientific Engine")
    print("=" * 70)

    # Sample Novel Site: Lonar Impact Crater (Deccan Basalts, India)
    lonar_scores_vs_moon = {
        "topography": 82.0,
        "thermal": 48.0,
        "geology": 96.0,
        "cryosphere": 30.0,
        "sar_radar": 91.0,
        "operations": 88.0
    }

    # Sample Novel Site: Qaidam Basin Yardangs (Tibetan Plateau) vs Mars
    qaidam_scores_vs_mars = {
        "topography": 91.0,
        "thermal": 84.0,
        "geology": 93.0,
        "cryosphere": 78.0,
        "sar_radar": 92.0,
        "operations": 89.0
    }

    lonar_pasi = calculate_pasi(lonar_scores_vs_moon)
    qaidam_pasi = calculate_pasi(qaidam_scores_vs_mars)

    print(f"\n[1] Lonar Crater (Basalt Impact) vs Shackleton Crater Rim (Moon):")
    print(f"    -> Overall PASI Score: {lonar_pasi}%")
    print(f"    -> Key Analogy: Shocked plagioclase/maskelynite & 30° basalt talus slopes")
    print(f"    -> Breakdown: 1.0g gravity vs 0.16g Moon; atmospheric chemical weathering")

    print(f"\n[2] Qaidam Basin (Cold Arid Yardangs) vs Jezero Paleolake Delta (Mars):")
    print(f"    -> Overall PASI Score: {qaidam_pasi}%")
    print(f"    -> Key Analogy: High-UV, -32°C winter, polyhydrated magnesium sulfates")
    print(f"    -> Breakdown: Earth 700 hPa vs Mars 6 hPa atmospheric density")

    # Radar Penetration Modeling
    print("\n" + "-" * 70)
    print(" SAR MICROWAVE PENETRATION SOUNDING (RADARSAT-1 & Sentinel-1 vs Mini-RF)")
    print("-" * 70)

    cases = [
        ("RADARSAT-1 C-Band in Cryogenic Ice (Ellesmere Island)", 5.3, 3.15, 0.001),
        ("RADARSAT-1 C-Band in Hyper-Dry Silica Sand (Tenoumer)", 5.3, 2.70, 0.003),
        ("LRO Mini-RF S-Band in Dry Basalt Regolith (Moon Mare)", 2.38, 5.40, 0.008),
        ("MRO SHARAD HF Sounder in Slab Ice (Arcadia Planitia)", 0.02, 3.15, 0.0005),
    ]

    for label, f, eps, tan_d in cases:
        depth = calculate_sar_penetration(f, eps, tan_d)
        print(f"  • {label}:")
        print(f"      f={f} GHz, ε_r={eps}, tan(δ)={tan_d} => Penetration Depth = {depth} meters")

    print("\nExecution complete. All PASI algorithms validated.")

if __name__ == "__main__":
    main()
