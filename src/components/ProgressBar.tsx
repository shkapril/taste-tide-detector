import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">
          {current} of {total}
        </span>
        <span className="text-sm font-medium text-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
