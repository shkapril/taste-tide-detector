import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { quizLabels, getTasteProfile, QuizType } from '@/data/quizData';
import chefImage from '@/assets/chef.png';
import type { Allergen, EatingStyle } from '@/data/allergens';

interface LocationState {
  quizType: QuizType;
  score: number;
  allergies?: Allergen[];
  eatingStyles?: EatingStyle[];
  blockedIngredients?: string[];
}

const AnalyzingScreen = () => (
  <motion.div
    className="min-h-screen flex flex-col items-center justify-end relative overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4 }}
  >
    <motion.img
      src={chefImage}
      alt="Chef analyzing"
      className="w-full max-w-md object-contain drop-shadow-2xl"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div className="absolute top-1/4 left-0 right-0 flex flex-col items-center">
      <motion.h2
        className="text-3xl font-display font-bold text-white/90 mb-4 tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Analyzing...
      </motion.h2>
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-white/70"
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

const CategoryResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!state) return <Navigate to="/" replace />;

  const { quizType, score, allergies = [], eatingStyles = [], blockedIngredients = [] } = state;
  const labels = quizLabels[quizType];
  const profile = getTasteProfile(score, quizType);
  const completed = JSON.parse(localStorage.getItem('completedQuizzes') || '[]');
  const allDone = completed.length >= 6;

  return (
    <AnimatePresence mode="wait">
      {isAnalyzing ? (
        <AnalyzingScreen key="analyzing" />
      ) : (
        <motion.div
          key="result"
          className="min-h-screen bg-background flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="px-6 pt-8 pb-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-2"
            >
              <span className="text-sm font-medium">{labels.label} Result</span>
            </motion.div>
          </header>

          <div className="flex-1 px-6 py-4">
            <motion.div
              className="bg-card rounded-2xl p-8 card-shadow mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-5xl mb-3"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {profile.emoji}
                </motion.div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  {profile.label}
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto mb-4">
                  {profile.description}
                </p>

                {/* Score bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>{labels.lowLabel}</span>
                    <span>{labels.highLabel}</span>
                  </div>
                  <div className="h-4 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(score / 10) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <p className="text-center text-lg font-bold text-primary mt-2">
                    {score.toFixed(1)} / 10
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.p
              className="text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {allDone
                ? 'All quizzes complete! View your full Taste DNA.'
                : `${completed.length} of 6 categories complete`}
            </motion.p>
          </div>

          <motion.div
            className="px-6 pb-8 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {allDone ? (
              <Button
                onClick={() => navigate('/results')}
                className="w-full h-14 text-lg font-medium"
                size="lg"
              >
                🧬 See My Taste DNA
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/categories', { state: { allergies, eatingStyles, blockedIngredients } })}
                className="w-full h-14 text-lg font-medium"
                size="lg"
              >
                Next Category
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
            <Button
              onClick={() => navigate('/quiz', { state: { quizType, allergies, eatingStyles, blockedIngredients } })}
              variant="outline"
              className="w-full h-12"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake {labels.label} Quiz
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryResult;
