import { motion } from 'framer-motion';

interface ResultsChartProps {
  /** UX scores on 0–10 scale keyed by dimension name */
  scores: Record<string, number>;
}

const dimensionConfig: { key: string; label: string; emoji: string; color: string }[] = [
  { key: 'sweet', label: 'Sweet', emoji: '🍫', color: 'bg-pink-400' },
  { key: 'sour', label: 'Sour', emoji: '🍋', color: 'bg-yellow-400' },
  { key: 'rich', label: 'Rich', emoji: '🧈', color: 'bg-amber-500' },
  { key: 'bitter', label: 'Bitter', emoji: '☕', color: 'bg-stone-500' },
  { key: 'salty', label: 'Salty', emoji: '🧂', color: 'bg-blue-400' },
  { key: 'spicy', label: 'Spicy', emoji: '🌶️', color: 'bg-red-500' },
];

const ResultsChart = ({ scores }: ResultsChartProps) => {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {dimensionConfig.map((dim, i) => {
        const val = scores[dim.key] ?? 5;
        const pct = (val / 10) * 100;
        return (
          <motion.div
            key={dim.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg">{dim.emoji}</span>
              <span className="text-sm font-medium text-foreground w-14">{dim.label}</span>
              <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${dim.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.08 }}
                />
              </div>
              <span className="text-sm font-medium text-primary w-10 text-right">
                {val.toFixed(1)}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ResultsChart;
