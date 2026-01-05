import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { QuizItem } from '@/data/quizData';

interface SwipeCardProps {
  item: QuizItem;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

const SwipeCard = ({ item, onSwipe, isTop }: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

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
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          
          {/* Like indicator */}
          <motion.div
            className="absolute top-6 right-6 bg-success px-4 py-2 rounded-lg border-2 border-success rotate-12"
            style={{ opacity: likeOpacity }}
          >
            <span className="text-success-foreground font-bold text-xl tracking-wide">LIKE</span>
          </motion.div>
          
          {/* Nope indicator */}
          <motion.div
            className="absolute top-6 left-6 bg-taste-dislike px-4 py-2 rounded-lg border-2 border-taste-dislike -rotate-12"
            style={{ opacity: nopeOpacity }}
          >
            <span className="text-primary-foreground font-bold text-xl tracking-wide">NOPE</span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-2xl font-semibold text-card-foreground mb-2">
            {item.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {item.description}
          </p>
          
          {/* Intensity indicator */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Intensity</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-taste-mild to-taste-intense rounded-full transition-all duration-300"
                style={{ width: `${item.intensityLevel * 10}%` }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{item.intensityLevel}/10</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
