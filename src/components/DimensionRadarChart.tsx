import React from 'react';
import { DimensionScores } from '../types';

interface DimensionRadarChartProps {
  scores: DimensionScores;
  size?: number;
  highlightedDimension?: string | null;
}

export const DimensionRadarChart: React.FC<DimensionRadarChartProps> = ({
  scores,
  size = 280,
  highlightedDimension
}) => {
  const center = size / 2;
  const radius = size * 0.38;

  const dimensions = [
    { key: 'topography', label: 'Topography', score: scores.topography },
    { key: 'thermal', label: 'Thermal', score: scores.thermal },
    { key: 'geology', label: 'Geology', score: scores.geology },
    { key: 'cryosphere', label: 'Cryosphere', score: scores.cryosphere },
    { key: 'sarRadar', label: 'SAR Radar', score: scores.sarRadar },
    { key: 'operations', label: 'Operations', score: scores.operations },
  ];

  const totalPoints = dimensions.length;

  // Compute (x, y) coordinates for an angle and radius
  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (Math.PI * 2 / totalPoints) * index - Math.PI / 2;
    const r = radius * valueRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Build grid rings (25%, 50%, 75%, 100%)
  const gridRings = [0.25, 0.5, 0.75, 1.0].map((ringRatio) => {
    const points = dimensions.map((_, i) => {
      const { x, y } = getCoordinates(i, ringRatio);
      return `${x},${y}`;
    }).join(' ');
    return points;
  });

  // Build data polygon
  const dataPolygon = dimensions.map((dim, i) => {
    const ratio = Math.max(0.1, dim.score / 100);
    const { x, y } = getCoordinates(i, ratio);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Radial Rings */}
        {gridRings.map((points, idx) => (
          <polygon
            key={idx}
            points={points}
            fill="none"
            stroke="#1f2937"
            strokeWidth="1"
            strokeDasharray={idx < 3 ? "2,2" : "none"}
          />
        ))}

        {/* Axis Lines */}
        {dimensions.map((dim, i) => {
          const { x, y } = getCoordinates(i, 1.0);
          return (
            <line
              key={dim.key}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#374151"
              strokeWidth="1"
            />
          );
        })}

        {/* Data Polygon Area */}
        <polygon
          points={dataPolygon}
          fill="rgba(56, 189, 248, 0.25)"
          stroke="#38bdf8"
          strokeWidth="2.5"
          className="transition-all duration-500 ease-out"
        />

        {/* Data Points */}
        {dimensions.map((dim, i) => {
          const ratio = Math.max(0.1, dim.score / 100);
          const { x, y } = getCoordinates(i, ratio);
          const isHighlighted = highlightedDimension === dim.key;

          return (
            <g key={dim.key}>
              <circle
                cx={x}
                cy={y}
                r={isHighlighted ? 6 : 4}
                fill={isHighlighted ? "#f59e0b" : "#38bdf8"}
                stroke="#0b0f19"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />
            </g>
          );
        })}

        {/* Axis Labels */}
        {dimensions.map((dim, i) => {
          const { x, y } = getCoordinates(i, 1.25);
          const isHighlighted = highlightedDimension === dim.key;

          return (
            <text
              key={dim.key}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11}
              fontWeight={isHighlighted ? "700" : "500"}
              fill={isHighlighted ? "#f59e0b" : "#94a3b8"}
              className="select-none font-mono"
            >
              {dim.label} ({dim.score})
            </text>
          );
        })}
      </svg>
    </div>
  );
};
