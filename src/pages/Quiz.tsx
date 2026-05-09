import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SwipeCard from '@/components/SwipeCard';
import ActionButtons from '@/components/ActionButtons';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import {
  QuizItem,
  QuizType,
  quizDataMap,
  quizLabels,
} from '@/data/quizData';
import { Allergen, EatingStyle, shouldFilterItem, shouldFilterByDiet } from '@/data/allergens';
import { foodContainsBlockedIngredient } from '@/data/foodIngredients';

const TOTAL_QUESTIONS = 8;

interface LocationState {
  quizType: QuizType;
  allergies?: Allergen[];
  eatingStyles?: EatingStyle[];
  blockedIngredients?: string[];
}

// ── 1D Bayesian State ──
interface BayesState {
  mean: number;       // current estimate (1-10 scale)
  uncertainty: number; // variance
  questionsAnswered: number;
}

function createInitialState(): BayesState {
  return { mean: 5, uncertainty: 3, questionsAnswered: 0 };
}

const NOISE = 2.5;

function updateBayes(state: BayesState, chosenIntensity: number): BayesState {
  const alpha = state.uncertainty / (state.uncertainty + NOISE);
  const newMean = state.mean + alpha * (chosenIntensity - state.mean);
  const newUnc = Math.max(0.3, state.uncertainty * (1 - alpha * 0.5));
  return { mean: newMean, uncertainty: newUnc, questionsAnswered: state.questionsAnswered + 1 };
}

// ── Adaptive Question Selection ──
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function selectNextQuestion(
  state: BayesState,
  usedIds: Set<string>,
  pool: QuizItem[]
): QuizItem {
  const available = pool.filter(q => !usedIds.has(q.id));
  if (available.length === 0) {
    // Fallback: allow re-use
    return shuffle(pool)[0];
  }

  const q = state.questionsAnswered;

  // Phase 1 (Q1-3): Random exploration
  if (q < 3) {
    return shuffle(available)[0];
  }

  // Phase 2 (Q4-10): Adaptive — pick items that bracket the current mean
  if (q < 10) {
    // Prefer items where one intensity is above mean and one below
    const mean = state.mean;
    const scored = available.map(item => {
      const minI = Math.min(item.intensityA, item.intensityB);
      const maxI = Math.max(item.intensityA, item.intensityB);
      // Best: brackets the mean
      const brackets = minI <= mean && maxI >= mean;
      // Score: how well it straddles the mean
      const spread = Math.abs(item.intensityA - item.intensityB);
      const centerDist = Math.abs((item.intensityA + item.intensityB) / 2 - mean);
      return {
        item,
        score: (brackets ? 10 : 0) + spread - centerDist,
      };
    });
    scored.sort((a, b) => b.score - a.score);
    // Pick from top 3 randomly for variety
    const top = scored.slice(0, Math.min(3, scored.length));
    return top[Math.floor(Math.random() * top.length)].item;
  }

  // Phase 3 (Q11-12): Refinement — pick items with intensities close to mean
  const mean = state.mean;
  const scored = available.map(item => {
    const distA = Math.abs(item.intensityA - mean);
    const distB = Math.abs(item.intensityB - mean);
    return { item, score: distA + distB };
  });
  scored.sort((a, b) => a.score - b.score);
  const top = scored.slice(0, Math.min(3, scored.length));
  return top[Math.floor(Math.random() * top.length)].item;
}

// ── History for undo ──
interface HistoryEntry {
  question: QuizItem;
  state: BayesState;
  usedIds: Set<string>;
}

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locState = location.state as LocationState | null;

  const quizType = locState?.quizType || 'sweet';
  const allergies = locState?.allergies || [];
  const eatingStyles = locState?.eatingStyles || [];
  const blockedIngredients = locState?.blockedIngredients || [];
  const labels = quizLabels[quizType];

  // Filter pool based on allergies, eating styles, and specific blocked ingredients
  const pool = useMemo(() => {
    const items = quizDataMap[quizType] || [];
    return items.filter(item => {
      if (shouldFilterItem(item.optionA.name, item.optionB.name, allergies)) return false;
      if (shouldFilterByDiet(item.dietary, item.optionA.name, item.optionB.name, eatingStyles)) return false;
      if (
        foodContainsBlockedIngredient(item.optionA.name, blockedIngredients) ||
        foodContainsBlockedIngredient(item.optionB.name, blockedIngredients)
      ) return false;
      // Filter out branch questions (they'll be added dynamically)
      if (item.isBranchQuestion) return false;
      return true;
    });
  }, [quizType, allergies, eatingStyles, blockedIngredients]);

  const [bayesState, setBayesState] = useState<BayesState>(createInitialState);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [currentQuestion, setCurrentQuestion] = useState<QuizItem>(() =>
    selectNextQuestion(createInitialState(), new Set(), pool)
  );
  const [questionNum, setQuestionNum] = useState(1);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Pre-compute next question for background card
  const previewQuestion = useMemo(() => {
    if (questionNum >= TOTAL_QUESTIONS) return null;
    const tempUsed = new Set(usedIds);
    tempUsed.add(currentQuestion.id);
    return selectNextQuestion(bayesState, tempUsed, pool);
  }, [bayesState, usedIds, currentQuestion, questionNum, pool]);

  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      // Save history
      setHistory(prev => [...prev, { question: currentQuestion, state: bayesState, usedIds: new Set(usedIds) }]);

      // right = chose A, left = chose B
      const chosenIntensity = direction === 'right' ? currentQuestion.intensityA : currentQuestion.intensityB;
      const newState = updateBayes(bayesState, chosenIntensity);

      const newUsed = new Set(usedIds);
      newUsed.add(currentQuestion.id);

      setBayesState(newState);
      setUsedIds(newUsed);

      setTimeout(() => {
        if (questionNum >= TOTAL_QUESTIONS) {
          // Save score for this category
          const score = newState.mean;
          const savedScores = JSON.parse(localStorage.getItem('quizScores') || '{}');
          savedScores[quizType] = score;
          localStorage.setItem('quizScores', JSON.stringify(savedScores));

          // Track completed quizzes
          const completed = JSON.parse(localStorage.getItem('completedQuizzes') || '[]');
          if (!completed.includes(quizType)) {
            completed.push(quizType);
            localStorage.setItem('completedQuizzes', JSON.stringify(completed));
          }

          // Navigate to category result
          navigate('/category-result', {
            state: { quizType, score, allergies, eatingStyles },
          });
        } else {
          const next = selectNextQuestion(newState, newUsed, pool);
          setCurrentQuestion(next);
          setQuestionNum(prev => prev + 1);
        }
      }, 200);
    },
    [bayesState, currentQuestion, usedIds, questionNum, navigate, pool, quizType, allergies, eatingStyles]
  );

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setBayesState(last.state);
    setUsedIds(last.usedIds);
    setCurrentQuestion(last.question);
    setQuestionNum(prev => prev - 1);
    setHistory(prev => prev.slice(0, -1));
  }, [history]);

  const handleRestart = useCallback(() => {
    const initial = createInitialState();
    setBayesState(initial);
    setUsedIds(new Set());
    setCurrentQuestion(selectNextQuestion(initial, new Set(), pool));
    setQuestionNum(1);
    setHistory([]);
  }, [pool]);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-y-auto">
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

      <div className="px-6">
        <ProgressBar current={questionNum} total={TOTAL_QUESTIONS} />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-4">
        <div className="relative w-full max-w-sm h-[500px]">
          <AnimatePresence mode="popLayout">
            {previewQuestion && (
              <SwipeCard
                key={`bg-${previewQuestion.id}`}
                optionA={previewQuestion.optionA}
                optionB={previewQuestion.optionB}
                onSwipe={() => {}}
                isTop={false}
              />
            )}
            <SwipeCard
              key={`top-${currentQuestion.id}-${questionNum}`}
              optionA={currentQuestion.optionA}
              optionB={currentQuestion.optionB}
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
          onClick={() => navigate('/categories', { state: { allergies, eatingStyles } })}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          ← Back to categories
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
