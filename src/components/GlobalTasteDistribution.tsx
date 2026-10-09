import { motion } from 'framer-motion';
import { getTastePercentiles } from '@/lib/tastePercentiles';
import { useGlobalStats, MIN_SAMPLE } from '@/lib/globalStats';

interface Props {
  scores: Record<string, number>;
  /** Taste keys to show, e.g. ['sweet', 'bitter'] */
  keys: string[];
}

const W = 300;
const H = 90;

const pdf = (x: number, mean: number, sd: number) =>
  Math.exp(-0.5 * ((x - mean) / sd) ** 2);

const GlobalTasteDistribution = ({ scores, keys }: Props) => {
  const live = useGlobalStats();
  const rows = getTastePercentiles(scores, live, MIN_SAMPLE).filter(r => keys.includes(r.key));
  if (rows.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {rows.map((r, i) => {
        const d = r;
        const pts: string[] = [];
        for (let s = 0; s <= 100; s++) {
          const x = (s / 100) * 10;
          const y = pdf(x, d.mean, d.sd);
          pts.push(`${(x / 10) * W},${H - y * (H - 10)}`);
        }
        const area = `M0,${H} L${pts.join(' L')} L${W},${H} Z`;
        const ux = (Math.min(10, Math.max(0, r.score)) / 10) * W;
        const top = Math.max(1, 100 - r.percentile);

        return (
          <motion.div
            key={r.key}
            className="bg-card rounded-2xl p-4 card-shadow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{r.emoji}</span>
              <span className="font-medium text-foreground">{r.label}</span>
              <span className="ml-auto text-sm font-semibold text-primary">
                {r.percentile >= 50 ? `Top ${top}%` : `Bottom ${r.percentile}%`}
              </span>
            </div>
            <svg viewBox={`0 0 ${W} ${H + 14}`} className="w-full">
              <path d={area} className="fill-accent/60" />
              <line x1={ux} x2={ux} y1={4} y2={H} className="stroke-primary" strokeWidth={2.5} />
              <circle cx={ux} cy={6} r={4} className="fill-primary" />
              <text x={0} y={H + 12} className="fill-muted-foreground" fontSize={9}>0</text>
              <text x={W} y={H + 12} textAnchor="end" className="fill-muted-foreground" fontSize={9}>10</text>
            </svg>
            <p className="text-xs text-muted-foreground mt-1">
              You: {r.score.toFixed(1)} · Global average: {d.mean.toFixed(1)} — {r.blurb}
              <br />
              {r.isLive ? `Based on ${r.n} real participants` : `Sample curve until ${MIN_SAMPLE}+ people finish this quiz (${r.n} so far)`}
            </p>
          </motion.div>
        );
      })}
      <p className="text-[11px] text-muted-foreground text-center">
        Shaded curve = how quiz takers worldwide are distributed. Line = you.
      </p>
    </div>
  );
};

export default GlobalTasteDistribution;
