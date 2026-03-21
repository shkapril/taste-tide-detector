import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, RotateCcw, Sparkles } from 'lucide-react';
import chefImage from '@/assets/chef.png';
import { Button } from '@/components/ui/button';
import ResultsChart from '@/components/ResultsChart';
import { getCharacter } from '@/data/tasteCharacters';
import type { TasteVector7 } from '@/data/foodDataset';

interface LocationState {
  uxScores: Record<string, number>;
  internalMean: TasteVector7;
  totalAnswered: number;
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

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  const uxScores = state?.uxScores;
  const internalMean = state?.internalMean;
  const character = internalMean ? getCharacter(internalMean) : null;

  // Save results to localStorage
  useEffect(() => {
    if (!state) return;
    localStorage.setItem('tasteDNA', JSON.stringify({
      uxScores: state.uxScores,
      internalMean: state.internalMean,
      completedAt: Date.now(),
    }));
    // Also save in old format for backward compat with profile
    const scores: Record<string, number> = {};
    for (const [k, v] of Object.entries(state.uxScores)) {
      scores[k] = v;
    }
    localStorage.setItem('quizScores', JSON.stringify(scores));
    localStorage.setItem('completedQuizzes', JSON.stringify(['sweet', 'sour', 'bitter', 'salty', 'rich', 'spicy']));
  }, [state]);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!state || !uxScores) {
    return <Navigate to="/" replace />;
  }

  const handleShare = async () => {
    const lines = Object.entries(uxScores)
      .map(([k, v]) => `${k}: ${v.toFixed(1)}/10`)
      .join('\n');
    const charLine = character ? `${character.emoji} ${character.name}` : '';
    const text = `🧬 My Taste DNA:\n${charLine}\n\n${lines}\n\nDiscover yours at ${window.location.origin}`;

    if (navigator.share) {
      try { await navigator.share({ title: 'My Taste DNA', text, url: window.location.origin }); }
      catch { /* cancelled */ }
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isAnalyzing ? (
        <AnalyzingScreen key="analyzing" />
      ) : (
        <motion.div
          key="results"
          className="min-h-screen bg-background flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="px-6 pt-8 pb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Your Taste DNA</span>
              </div>
            </motion.div>
          </header>

          <div className="flex-1 px-6 py-4">
            {/* Character Card */}
            {character && (
              <motion.div
                className="bg-card rounded-2xl p-8 card-shadow mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-center mb-2">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {character.emoji}
                  </motion.div>
                  <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                    {character.name}
                  </h1>
                  <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    {character.description}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Taste Profile Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-display font-semibold text-center text-foreground mb-6">
                Your Taste Spectrum
              </h2>
              <ResultsChart scores={uxScores} />
            </motion.div>
          </div>

          <motion.div
            className="px-6 pb-8 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button onClick={handleShare} className="w-full h-14 text-lg font-medium" size="lg">
              <Share2 className="w-5 h-5 mr-2" />
              Share Your Taste DNA
            </Button>

            <Button
              onClick={() => navigate('/quiz', { state: { allergies: [], eatingStyles: [] } })}
              variant="outline"
              className="w-full h-14 text-lg font-medium bg-primary/15 border-primary/30 text-primary hover:bg-primary/25"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Retake Quiz
            </Button>

            <Button
              onClick={() => navigate('/profile')}
              variant="ghost"
              className="w-full h-14 text-lg font-medium text-primary hover:text-primary/80"
              size="lg"
            >
              See My Full Profile
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Results;
