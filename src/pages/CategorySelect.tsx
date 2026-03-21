import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { QuizType } from '@/data/quizData';
import type { Allergen, EatingStyle } from '@/data/allergens';

interface LocationState {
  allergies?: Allergen[];
  eatingStyles?: EatingStyle[];
}

const categories: { type: QuizType; label: string; emoji: string; color: string }[] = [
  { type: 'sweet', label: 'Sweet', emoji: '🍫', color: 'bg-pink-500/15 border-pink-500/30' },
  { type: 'sour', label: 'Sour', emoji: '🍋', color: 'bg-yellow-500/15 border-yellow-500/30' },
  { type: 'rich', label: 'Rich & Buttery', emoji: '🧈', color: 'bg-amber-500/15 border-amber-500/30' },
  { type: 'bitter', label: 'Bitter', emoji: '☕', color: 'bg-stone-500/15 border-stone-500/30' },
  { type: 'salty', label: 'Salty', emoji: '🧂', color: 'bg-blue-500/15 border-blue-500/30' },
  { type: 'spicy', label: 'Spicy', emoji: '🌶️', color: 'bg-red-500/15 border-red-500/30' },
];

const QUESTIONS_PER_QUIZ = 12;

const CategorySelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locState = location.state as LocationState | null;
  const allergies = locState?.allergies || [];
  const eatingStyles = locState?.eatingStyles || [];

  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('completedQuizzes') || '[]');
    setCompletedQuizzes(saved);
  }, []);

  const allCompleted = completedQuizzes.length >= 6;

  const handleSelectCategory = (type: QuizType) => {
    navigate('/quiz', {
      state: { quizType: type, allergies, eatingStyles },
    });
  };

  const handleViewResults = () => {
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-display font-semibold text-foreground">
            Choose a Category
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Complete all 6 taste quizzes to discover your Taste DNA
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${(completedQuizzes.length / 6) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {completedQuizzes.length}/6
          </span>
        </div>
      </header>

      <div className="flex-1 px-6 py-4">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat, i) => {
            const isCompleted = completedQuizzes.includes(cat.type);
            return (
              <motion.button
                key={cat.type}
                onClick={() => handleSelectCategory(cat.type)}
                className={`relative p-5 rounded-2xl border text-left transition-all ${cat.color} ${
                  isCompleted ? 'opacity-70' : 'hover:scale-[1.02]'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileTap={{ scale: 0.97 }}
              >
                {isCompleted && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                )}
                <span className="text-3xl mb-2 block">{cat.emoji}</span>
                <h3 className="font-display font-semibold text-foreground text-base">
                  {cat.label}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {QUESTIONS_PER_QUIZ} questions
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-8 space-y-3">
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button onClick={handleViewResults} className="w-full h-14 text-lg font-medium" size="lg">
              🧬 See My Taste DNA
            </Button>
          </motion.div>
        )}
        {!allCompleted && completedQuizzes.length > 0 && (
          <Button
            onClick={handleViewResults}
            variant="outline"
            className="w-full h-12 text-base"
          >
            View Partial Results
          </Button>
        )}
      </div>
    </div>
  );
};

export default CategorySelect;
