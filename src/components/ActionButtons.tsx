import { motion } from 'framer-motion';
import { X, Heart, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onUndo?: () => void;
  canUndo?: boolean;
}

const ActionButtons = ({ onSwipeLeft, onSwipeRight, onUndo, canUndo }: ActionButtonsProps) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      {onUndo && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onUndo}
          disabled={!canUndo}
          className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-5 h-5 text-secondary-foreground" />
        </motion.button>
      )}
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onSwipeLeft}
        className="w-16 h-16 rounded-full bg-taste-dislike/10 border-2 border-taste-dislike flex items-center justify-center transition-all hover:bg-taste-dislike group"
      >
        <X className="w-8 h-8 text-taste-dislike group-hover:text-primary-foreground transition-colors" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onSwipeRight}
        className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center transition-all hover:bg-primary group"
      >
        <Heart className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
      </motion.button>
    </div>
  );
};

export default ActionButtons;
