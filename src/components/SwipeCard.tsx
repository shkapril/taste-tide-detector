import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { QuizItem } from '@/data/quizData';

interface SwipeCardProps {
  item: QuizItem;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

const SwipeCard = ({ item, onSwipe, isTop }: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const leftOpacity = useTransform(x, [-100, 0], [1, 0]);
  const rightOpacity = useTransform(x, [0, 100], [0, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      className="absolute w-full cursor-grab active:cursor-grabbing"
      style={{ x, rotate }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10 }}
      exit={{ 
        x: x.get() > 0 ? 300 : -300, 
        opacity: 0,
        transition: { duration: 0.3 }
      }}
      whileDrag={{ scale: 1.02 }}
    >
      <div className="relative overflow-hidden rounded-2xl card-shadow bg-card">
        {/* VS Header */}
        <div className="bg-primary/10 px-4 py-3 text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Which do you prefer?
          </span>
        </div>

        {/* Two images side by side */}
        <div className="relative flex">
          {/* Option A (Left) - Swipe Right to choose */}
          <div className="relative w-1/2 aspect-square overflow-hidden border-r border-border/50">
            <img
              src={item.optionA.image}
              alt={item.optionA.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="font-display text-lg font-semibold text-white text-center leading-tight">
                {item.optionA.name}
              </h3>
            </div>
            
            {/* Selected indicator for Option A */}
            <motion.div
              className="absolute inset-0 bg-success/30 flex items-center justify-center"
              style={{ opacity: rightOpacity }}
            >
              <span className="bg-success text-success-foreground px-3 py-1 rounded-full font-bold text-sm">
                YOUR PICK
              </span>
            </motion.div>
          </div>

          {/* VS Badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-card border-2 border-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <span className="font-display font-bold text-primary text-sm">VS</span>
            </div>
          </div>

          {/* Option B (Right) - Swipe Left to choose */}
          <div className="relative w-1/2 aspect-square overflow-hidden">
            <img
              src={item.optionB.image}
              alt={item.optionB.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="font-display text-lg font-semibold text-white text-center leading-tight">
                {item.optionB.name}
              </h3>
            </div>
            
            {/* Selected indicator for Option B */}
            <motion.div
              className="absolute inset-0 bg-success/30 flex items-center justify-center"
              style={{ opacity: leftOpacity }}
            >
              <span className="bg-success text-success-foreground px-3 py-1 rounded-full font-bold text-sm">
                YOUR PICK
              </span>
            </motion.div>
          </div>
        </div>

        {/* Swipe Instructions */}
        <div className="p-4 flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>←</span>
            <span>{item.optionB.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{item.optionA.name}</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
