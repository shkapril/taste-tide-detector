import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SwipeCard from '@/components/SwipeCard';
import ActionButtons from '@/components/ActionButtons';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { quizDataMap, QuizItem, QuizType, quizLabels } from '@/data/quizData';

interface Answer {
  item: QuizItem;
  chosenIntensity: number;
  addedBranchIds?: string[]; // Track which branch questions were added after this answer
}

interface LocationState {
  quizType?: QuizType;
}

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  
  const quizType = state?.quizType || 'sweet';
  
  // Get base quiz items (excluding branch questions)
  const baseQuizItems = useMemo(() => {
    const allItems = quizDataMap[quizType] || quizDataMap.sweet;
    return allItems.filter(item => !item.isBranchQuestion);
  }, [quizType]);

  // Get all items including branch questions for lookup
  const allQuizItems = useMemo(() => {
    return quizDataMap[quizType] || quizDataMap.sweet;
  }, [quizType]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const [dynamicQuestions, setDynamicQuestions] = useState<QuizItem[]>([...baseQuizItems]);

  const currentItem = dynamicQuestions[currentIndex];
  const nextItem = dynamicQuestions[currentIndex + 1];
  const labels = quizLabels[quizType];

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (currentIndex >= dynamicQuestions.length) return;

    // Right swipe = prefer option A, Left swipe = prefer option B
    const chosenIntensity = direction === 'right' 
      ? currentItem.intensityA 
      : currentItem.intensityB;
    
    setExitDirection(direction);
    
    // Check for branching logic
    const branchIds = direction === 'right' ? currentItem.branchOnA : currentItem.branchOnB;
    let newDynamicQuestions = [...dynamicQuestions];
    
    if (branchIds && branchIds.length > 0) {
      // Find the branch questions and insert them after the current question
      const branchQuestions = branchIds
        .map(id => allQuizItems.find(item => item.id === id))
        .filter((item): item is QuizItem => item !== undefined);
      
      // Insert branch questions right after the current question
      newDynamicQuestions = [
        ...dynamicQuestions.slice(0, currentIndex + 1),
        ...branchQuestions,
        ...dynamicQuestions.slice(currentIndex + 1)
      ];
      setDynamicQuestions(newDynamicQuestions);
    }

    const newAnswers = [...answers, { item: currentItem, chosenIntensity, addedBranchIds: branchIds }];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentIndex + 1 >= newDynamicQuestions.length) {
        // Calculate average intensity from all choices
        const avgIntensity = newAnswers.reduce((sum, a) => sum + a.chosenIntensity, 0) / newAnswers.length;
        
        navigate('/results', { 
          state: { 
            averageIntensity: avgIntensity,
            totalAnswered: newAnswers.length,
            likedCount: newAnswers.length,
            quizType: quizType,
          }
        });
      } else {
        setCurrentIndex(prev => prev + 1);
        setExitDirection(null);
      }
    }, 200);
  }, [currentIndex, answers, currentItem, navigate, dynamicQuestions, allQuizItems, quizType]);

  const handleUndo = useCallback(() => {
    if (answers.length === 0) return;
    
    const lastAnswer = answers[answers.length - 1];
    
    // If the last answer added branch questions, we need to remove them
    if (lastAnswer.addedBranchIds && lastAnswer.addedBranchIds.length > 0) {
      setDynamicQuestions(prev => 
        prev.filter(item => !lastAnswer.addedBranchIds?.includes(item.id))
      );
    }
    
    setAnswers(prev => prev.slice(0, -1));
    setCurrentIndex(prev => prev - 1);
  }, [answers]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setDynamicQuestions([...baseQuizItems]);
  }, [baseQuizItems]);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-y-auto">
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
          Tap the one you prefer
        </p>
      </header>

      {/* Progress */}
      <div className="px-6">
        <ProgressBar current={currentIndex + 1} total={dynamicQuestions.length} />
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
      <div className="px-6 pb-4">
        <ActionButtons
          onUndo={handleUndo}
          canUndo={answers.length > 0}
        />
      </div>

      {/* Bottom Buttons */}
      <div className="px-6 pb-8 space-y-2">
        <Button
          variant="ghost"
          onClick={handleRestart}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          Take quiz again
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate('/', { state: { startAtQuizSelection: true } })}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          ← Back to taste quizzes
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
