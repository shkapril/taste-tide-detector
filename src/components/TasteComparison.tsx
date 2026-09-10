import { motion } from 'framer-motion';
import { getTastePercentiles } from '@/lib/tastePercentiles';

interface TasteComparisonProps {
  scores: Record<string, number>;
}

const TasteComparison = ({ scores }: TasteComparisonProps) => {
  const rows = getTastePercentiles(scores);

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Here's how your taste levels compare with everyone else who took the quiz.
      </p>
      {rows.map((r, i) => (
        <motion.div
          key={r.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">{r.emoji}</span>
            <span className="text-sm font-medium text-foreground">{r.label}</span>
            <span className="ml-auto text-sm font-semibold text-primary">
              Top {Math.max(1, 100 - r.percentile)}%
            </span>
          </div>
          <div className="relative h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${r.percentile}%` }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.05 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{r.blurb}</p>
        </motion.div>
      ))}
      <p className="text-[11px] text-muted-foreground pt-2 border-t border-border">
        Based on a reference set of taste profiles.
      </p>
    </div>
  );
};

export default TasteComparison;
