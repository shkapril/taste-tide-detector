import { useState, useCallback, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from '@/components/SwipeCard';
import ActionButtons from '@/components/ActionButtons';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { foodDataset } from '@/data/foodDataset';
import { Allergen, EatingStyle } from '@/data/allergens';
import {
  BayesianState,
  QuizPair,
  createInitialState,
  updateState,
  selectNextPair,
  filterFoods,
  toUXScores,
} from '@/lib/bayesianModel';
import { motion } from 'framer-motion';

const TOTAL_QUESTIONS = 12;

interface LocationState {
  allergies?: Allergen[];
  eatingStyles?: EatingStyle[];
}

interface HistoryEntry {
  pair: QuizPair;
  state: BayesianState;
  usedIds: Set<string>;
}

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locState = location.state as LocationState | null;
  const allergies = locState?.allergies || [];
  const eatingStyles = locState?.eatingStyles || [];

  // Filter foods once
  const availableFoods = useMemo(
    () => filterFoods(foodDataset, allergies, eatingStyles),
    [allergies, eatingStyles]
  );

  const [bayesState, setBayesState] = useState<BayesianState>(createInitialState);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [currentPair, setCurrentPair] = useState<QuizPair>(() =>
    selectNextPair(createInitialState(), new Set(), availableFoods)
  );
  const [questionNum, setQuestionNum] = useState(1);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Pre-compute next pair for the background card
  const nextPairRef = useRef<QuizPair | null>(null);

  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      // Save history for undo
      setHistory(prev => [...prev, { pair: currentPair, state: bayesState, usedIds: new Set(usedIds) }]);

      // right = chose A, left = chose B
      const chosenFood = direction === 'right' ? currentPair.foodA : currentPair.foodB;
      const newState = updateState(bayesState, chosenFood);

      // Track used food IDs
      const newUsed = new Set(usedIds);
      newUsed.add(currentPair.foodA.id);
      newUsed.add(currentPair.foodB.id);

      setBayesState(newState);
      setUsedIds(newUsed);

      setTimeout(() => {
        if (questionNum >= TOTAL_QUESTIONS) {
          // Navigate to results with the final Bayesian state
          const uxScores = toUXScores(newState.mean);
          navigate('/results', {
            state: {
              uxScores,
              internalMean: newState.mean,
              totalAnswered: TOTAL_QUESTIONS,
            },
          });
        } else {
          const pair = selectNextPair(newState, newUsed, availableFoods);
          setCurrentPair(pair);
          setQuestionNum(prev => prev + 1);
        }
      }, 200);
    },
    [bayesState, currentPair, usedIds, questionNum, navigate, availableFoods]
  );

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setBayesState(last.state);
    setUsedIds(last.usedIds);
    setCurrentPair(last.pair);
    setQuestionNum(prev => prev - 1);
    setHistory(prev => prev.slice(0, -1));
  }, [history]);

  const handleRestart = useCallback(() => {
    const initial = createInitialState();
    setBayesState(initial);
    setUsedIds(new Set());
    setCurrentPair(selectNextPair(initial, new Set(), availableFoods));
    setQuestionNum(1);
    setHistory([]);
  }, [availableFoods]);

  // Compute a preview next pair for the background card
  const previewPair = useMemo(() => {
    if (questionNum >= TOTAL_QUESTIONS) return null;
    const tempUsed = new Set(usedIds);
    tempUsed.add(currentPair.foodA.id);
    tempUsed.add(currentPair.foodB.id);
    return selectNextPair(bayesState, tempUsed, availableFoods);
  }, [bayesState, usedIds, currentPair, questionNum, availableFoods]);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-y-auto">
      <header className="px-6 pt-8 pb-4">
        <motion.h1
          className="text-2xl font-display font-semibold text-center text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Taste DNA Quiz
        </motion.h1>
        <p className="text-center text-muted-foreground text-sm mt-1">
          Tap the one you prefer
        </p>
      </header>

      <div className="px-6">
        <ProgressBar current={questionNum} total={TOTAL_QUESTIONS} />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-4">
        <div className="relative w-full max-w-sm h-[500px]">
          <AnimatePresence mode="popLayout">
            {previewPair && (
              <SwipeCard
                key={`bg-${previewPair.foodA.id}-${previewPair.foodB.id}`}
                optionA={{ name: previewPair.foodA.name, image: previewPair.foodA.image }}
                optionB={{ name: previewPair.foodB.name, image: previewPair.foodB.image }}
                onSwipe={() => {}}
                isTop={false}
              />
            )}
            <SwipeCard
              key={`top-${currentPair.foodA.id}-${currentPair.foodB.id}-${questionNum}`}
              optionA={{ name: currentPair.foodA.name, image: currentPair.foodA.image }}
              optionB={{ name: currentPair.foodB.name, image: currentPair.foodB.image }}
              onSwipe={handleSwipe}
              isTop={true}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="px-6 pb-4">
        <ActionButtons onUndo={handleUndo} canUndo={history.length > 0} />
      </div>

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
          onClick={() => navigate('/')}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          ← Back to home
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
