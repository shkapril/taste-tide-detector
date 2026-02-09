import { motion } from 'framer-motion';
import { QuizItem } from '@/data/quizData';

interface SwipeCardProps {
  item: QuizItem;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

const SwipeCard = ({ item, onSwipe, isTop }: SwipeCardProps) => {
  const handleChooseA = () => {
    if (!isTop) return;
    onSwipe('right'); // Choosing A = swipe right
  };

  const handleChooseB = () => {
    if (!isTop) return;
    onSwipe('left'); // Choosing B = swipe left
  };

  return (
    <motion.div
      className="absolute w-full"
      initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10, opacity: isTop ? 1 : 0.5 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10, opacity: isTop ? 1 : 0.5 }}
      exit={{ 
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative overflow-hidden rounded-2xl card-shadow bg-card">
        {/* VS Header */}
        <div className="bg-accent/30 px-4 py-3 text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Tap your preference
          </span>
        </div>

        {/* Two images side by side */}
        <div className="relative flex">
          {/* Option A (Left) */}
          <motion.button
            onClick={handleChooseA}
            disabled={!isTop}
            className="relative w-1/2 aspect-square overflow-hidden border-r border-border/50 focus:outline-none group"
            whileHover={isTop ? { scale: 1.02 } : {}}
            whileTap={isTop ? { scale: 0.98 } : {}}
          >
            <img
              src={item.optionA.image}
              alt={item.optionA.name}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute inset-0 bg-success/0 group-hover:bg-success/20 transition-colors duration-200" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="font-sans text-base font-medium text-white text-center leading-tight">
                {item.optionA.name}
              </h3>
            </div>
          </motion.button>

          {/* VS Badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="bg-card border-2 border-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <span className="font-display font-bold text-primary text-sm">VS</span>
            </div>
          </div>

          {/* Option B (Right) */}
          <motion.button
            onClick={handleChooseB}
            disabled={!isTop}
            className="relative w-1/2 aspect-square overflow-hidden focus:outline-none group"
            whileHover={isTop ? { scale: 1.02 } : {}}
            whileTap={isTop ? { scale: 0.98 } : {}}
          >
            <img
              src={item.optionB.image}
              alt={item.optionB.name}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute inset-0 bg-success/0 group-hover:bg-success/20 transition-colors duration-200" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="font-sans text-base font-medium text-white text-center leading-tight">
                {item.optionB.name}
              </h3>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
