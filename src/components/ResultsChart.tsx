import { motion } from 'framer-motion';
import { TasteProfile } from '@/data/quizData';

interface ResultsChartProps {
  profile: TasteProfile;
  labels?: { label: string; lowLabel: string; highLabel: string };
}

const ResultsChart = ({ profile, labels }: ResultsChartProps) => {
  const markerPosition = (profile.level / 10) * 100;
  const labelName = labels?.label || 'Sweetness';
  const lowLabel = labels?.lowLabel || 'Bitter';
  const highLabel = labels?.highLabel || 'Very Sweet';

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Spectrum Bar */}
      <div className="relative mb-8">
        <div className="h-4 rounded-full bg-gradient-to-r from-amber-800 via-amber-500 via-50% to-pink-400 overflow-hidden shadow-inner" />
        
        {/* Marker */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          initial={{ left: '0%' }}
          animate={{ left: `${markerPosition}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
        >
          <div className="relative -translate-x-1/2">
            <motion.div
              className="w-8 h-8 rounded-full bg-card border-4 border-primary shadow-lg flex items-center justify-center"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-sm">{profile.emoji}</span>
            </motion.div>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                You: {profile.level.toFixed(1)}/10
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Labels */}
      <div className="flex justify-between mb-6 px-2">
        <span className="text-xs text-muted-foreground">{lowLabel}</span>
        <span className="text-xs text-muted-foreground">{highLabel}</span>
      </div>

      {/* Percentile */}
      <motion.div
        className="bg-secondary/50 rounded-xl p-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-sm text-muted-foreground mb-1">
          Compared to others who took this quiz
        </p>
        <p className="text-2xl font-display font-semibold text-foreground">
          Top <span className="text-primary">{100 - profile.percentile}%</span> highest {labelName.toLowerCase()}
        </p>
      </motion.div>
    </div>
  );
};

export default ResultsChart;
