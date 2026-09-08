import { motion } from 'framer-motion';

interface HexRadarChartProps {
  /** scores 0-10 keyed by dimension */
  scores: Record<string, number>;
  size?: number;
}

const axes: { key: string; label: string }[] = [
  { key: 'sweet', label: 'sweetness' },
  { key: 'salty', label: 'saltiness' },
  { key: 'rich', label: 'richness' },
  { key: 'bitter', label: 'bitterness' },
  { key: 'sour', label: 'sourness' },
  { key: 'spicy', label: 'spiciness' },
  { key: 'umami', label: 'umami' },
];

const HexRadarChart = ({ scores, size = 320 }: HexRadarChartProps) => {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.32;
  const labelRadius = radius + 28;
  const rings = 4;

  // angle: start at top, go clockwise
  const angleFor = (i: number) => (Math.PI * 2 * i) / 6 - Math.PI / 2;

  const pointAt = (i: number, r: number) => {
    const a = angleFor(i);
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
  };

  // Grid hexagons
  const ringPaths = Array.from({ length: rings }, (_, ri) => {
    const r = (radius * (ri + 1)) / rings;
    const pts = Array.from({ length: 6 }, (_, i) => pointAt(i, r));
    return pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  });

  // Spokes
  const spokes = Array.from({ length: 6 }, (_, i) => pointAt(i, radius));

  // Data polygon
  const dataPts = axes.map((ax, i) => {
    const v = Math.max(0, Math.min(10, scores[ax.key] ?? 0));
    const r = (v / 10) * radius;
    return pointAt(i, r);
  });
  const dataStr = dataPts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

  return (
    <div className="w-full flex justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Grid rings */}
        {ringPaths.map((pts, i) => (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={1}
          />
        ))}
        {/* Spokes */}
        {spokes.map(([x, y], i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="hsl(var(--border))"
            strokeWidth={1}
          />
        ))}

        {/* Data polygon */}
        <motion.polygon
          points={dataStr}
          fill="hsl(var(--primary) / 0.18)"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Data points */}
        {dataPts.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={4}
            fill="hsl(var(--primary))"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.05 }}
          />
        ))}

        {/* Labels */}
        {axes.map((ax, i) => {
          const [lx, ly] = pointAt(i, labelRadius);
          return (
            <text
              key={ax.key}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground"
              style={{ fontSize: 12, letterSpacing: '0.02em' }}
            >
              {ax.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default HexRadarChart;
