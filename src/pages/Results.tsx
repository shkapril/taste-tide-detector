import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, RotateCcw, Sparkles } from 'lucide-react';
import chefImage from '@/assets/chef.png';
import { Button } from '@/components/ui/button';
import ResultsChart from '@/components/ResultsChart';
import HexRadarChart from '@/components/HexRadarChart';
import { getCharacter } from '@/data/tasteCharacters';
import type { TasteVector7 } from '@/data/foodDataset';

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
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Load scores from localStorage
  const savedScores: Record<string, number> = JSON.parse(localStorage.getItem('quizScores') || '{}');
  const completedQuizzes: string[] = JSON.parse(localStorage.getItem('completedQuizzes') || '[]');

  const hasResults = completedQuizzes.length > 0;

  // Build UX scores (0-10 scale) for display
  // Only completed quiz categories show their actual score; uncompleted categories are fixed at 0
  const uxScores: Record<string, number> = {
    sweet: completedQuizzes.includes('sweet') ? (savedScores.sweet ?? 5) : 0,
    sour: completedQuizzes.includes('sour') ? (savedScores.sour ?? 5) : 0,
    rich: completedQuizzes.includes('rich') ? (savedScores.rich ?? 5) : 0,
    bitter: completedQuizzes.includes('bitter') ? (savedScores.bitter ?? 5) : 0,
    salty: completedQuizzes.includes('salty') ? (savedScores.salty ?? 5) : 0,
    spicy: completedQuizzes.includes('spicy') ? (savedScores.spicy ?? 5) : 0,
    umami: completedQuizzes.includes('umami') ? (savedScores.umami ?? 5) : 0,
  };

  const allCompleted = completedQuizzes.length >= 7;

  // Build 7D internal vector (0-100 scale) for character matching
  const internalMean: TasteVector7 = {
    sweet: (uxScores.sweet) * 10,
    sour: (uxScores.sour) * 10,
    rich: (uxScores.rich) * 10,
    bitter: (uxScores.bitter) * 10,
    salty: (uxScores.salty) * 10,
    spicy: (uxScores.spicy) * 10,
    umami: (uxScores.umami) * 10,
  };

  const character = getCharacter(internalMean);

  // Save taste DNA for profile page
  useEffect(() => {
    if (!hasResults) return;
    localStorage.setItem('tasteDNA', JSON.stringify({
      uxScores,
      internalMean,
      completedAt: Date.now(),
    }));
  }, [hasResults]);

  if (!hasResults) {
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

  const handleRetake = () => {
    localStorage.removeItem('quizScores');
    localStorage.removeItem('completedQuizzes');
    localStorage.removeItem('tasteDNA');
    navigate('/');
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
            {/* Character Card — only shown when all categories are complete */}
            {allCompleted && character && (
              <motion.div
                className="rounded-2xl overflow-hidden card-shadow mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {character.image ? (
                  <div className="relative">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 pt-16">
                      <h1 className="text-3xl font-display font-bold text-white mb-1">
                        {character.emoji} {character.name}
                      </h1>
                      <p className="text-white/80 text-sm leading-relaxed max-w-sm">
                        {character.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-card p-8 text-center">
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
                )}
              </motion.div>
            )}

            {/* Taste Profile Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-display font-semibold text-center text-foreground mb-6">
                {allCompleted ? 'Your Taste Spectrum' : 'Your Partial Taste Results'}
              </h2>
              {allCompleted && <HexRadarChart scores={uxScores} />}
              <div className={allCompleted ? 'mt-8' : ''}>
                <ResultsChart scores={uxScores} />
              </div>
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
              onClick={handleRetake}
              variant="outline"
              className="w-full h-14 text-lg font-medium bg-primary/15 border-primary/30 text-primary hover:bg-primary/25"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Retake All Quizzes
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
