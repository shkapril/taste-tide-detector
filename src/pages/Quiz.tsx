import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SwipeCard from '@/components/SwipeCard';
import ActionButtons from '@/components/ActionButtons';
import ProgressBar from '@/components/ProgressBar';
import { quizDataMap, QuizItem, QuizType, quizLabels } from '@/data/quizData';

interface Answer {
  item: QuizItem;
  liked: boolean;
}

interface LocationState {
  diet?: 'all-good' | 'pescatarian' | 'vegetarian' | 'vegan';
  quizType?: QuizType;
}

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  
  const quizType = state?.quizType || 'sweet';
  const dietPreference = state?.diet || 'all-good';
  
  const quizItems = useMemo(() => {
    const items = quizDataMap[quizType] || quizDataMap.sweet;
    // Filter by dietary preference
    return items.filter(item => item.dietary.includes(dietPreference));
  }, [quizType, dietPreference]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const currentItem = quizItems[currentIndex];
  const nextItem = quizItems[currentIndex + 1];
  const labels = quizLabels[quizType];

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (currentIndex >= quizItems.length) return;

    const liked = direction === 'right';
    setExitDirection(direction);
    
    const newAnswers = [...answers, { item: currentItem, liked }];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentIndex + 1 >= quizItems.length) {
        // Calculate results and navigate
        const likedItems = newAnswers.filter(a => a.liked);
        const avgIntensity = likedItems.length > 0
          ? likedItems.reduce((sum, a) => sum + a.item.intensityLevel, 0) / likedItems.length
          : 5;
        
        navigate('/results', { 
          state: { 
            averageIntensity: avgIntensity,
            totalAnswered: newAnswers.length,
            likedCount: likedItems.length,
            quizType: quizType,
          }
        });
      } else {
        setCurrentIndex(prev => prev + 1);
        setExitDirection(null);
      }
    }, 200);
  }, [currentIndex, answers, currentItem, navigate, quizItems.length, quizType]);

  const handleUndo = useCallback(() => {
    if (answers.length === 0) return;
    setAnswers(prev => prev.slice(0, -1));
    setCurrentIndex(prev => prev - 1);
  }, [answers.length]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <motion.h1 
          className="text-2xl font-display font-semibold text-center text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {labels.label} Quiz
        </motion.h1>
        <p className="text-center text-muted-foreground text-sm mt-1">
          Swipe right if you like it, left if you don't
        </p>
      </header>

      {/* Progress */}
      <div className="px-6">
        <ProgressBar current={currentIndex + 1} total={quizItems.length} />
      </div>

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center px-6 py-4">
        <div className="relative w-full max-w-sm h-[500px]">
          <AnimatePresence mode="popLayout">
            {/* Background card */}
            {nextItem && (
              <SwipeCard
                key={nextItem.id}
                item={nextItem}
                onSwipe={() => {}}
                isTop={false}
              />
            )}
            
            {/* Top card */}
            {currentItem && (
              <SwipeCard
                key={currentItem.id}
                item={currentItem}
                onSwipe={handleSwipe}
                isTop={true}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-8">
        <ActionButtons
          onSwipeLeft={() => handleSwipe('left')}
          onSwipeRight={() => handleSwipe('right')}
          onUndo={handleUndo}
          canUndo={answers.length > 0}
        />
      </div>
    </div>
  );
};

export default Quiz;
