import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface ActionButtonsProps {
  onUndo?: () => void;
  canUndo?: boolean;
}

const ActionButtons = ({ onUndo, canUndo }: ActionButtonsProps) => {
  return (
    <div className="flex items-center justify-center mt-8">
      {onUndo && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onUndo}
          disabled={!canUndo}
          className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5 text-secondary-foreground" />
        </motion.button>
      )}
    </div>
  );
};

export default ActionButtons;