import { useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResultsChart from '@/components/ResultsChart';
import { getTasteProfile, QuizType, quizLabels, TasteProfile } from '@/data/quizData';

interface LocationState {
  averageIntensity: number;
  totalAnswered: number;
  likedCount: number;
  quizType: QuizType;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const quizType = state?.quizType || 'sweet';
  const labels = quizLabels[quizType];
  const profile = state ? getTasteProfile(state.averageIntensity, quizType) : null;

  // Mark quiz as completed and save score
  useEffect(() => {
    if (!state) return;
    const stored = localStorage.getItem('completedQuizzes');
    const completed: QuizType[] = stored ? JSON.parse(stored) : [];
    if (!completed.includes(quizType)) {
      completed.push(quizType);
      localStorage.setItem('completedQuizzes', JSON.stringify(completed));
    }
    // Save individual quiz score
    const scores = JSON.parse(localStorage.getItem('quizScores') || '{}');
    scores[quizType] = state.averageIntensity;
    localStorage.setItem('quizScores', JSON.stringify(scores));
  }, [quizType, state]);

  if (!state || !profile) {
    return <Navigate to="/" replace />;
  }

  const handleShare = async () => {
    const text = `I'm a "${profile.label}" ${profile.emoji}! My ${labels.label.toLowerCase()} preference level is ${profile.level.toFixed(1)}/10. Take the Taste Quiz to discover your palate!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Taste Profile',
          text,
          url: window.location.origin,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Results Ready!</span>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-6 py-4">
        {/* Profile Card */}
        <motion.div
          className="bg-card rounded-2xl p-8 card-shadow mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-6">
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {profile.emoji}
            </motion.div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              {profile.label}
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
              {profile.description}
            </p>
          </div>

        </motion.div>

        {/* Spectrum Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-display font-semibold text-center text-foreground mb-6">
            Your {labels.label} Spectrum
          </h2>
          <ResultsChart profile={profile} labels={labels} />
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        className="px-6 pb-8 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={handleShare}
          className="w-full h-14 text-lg font-medium"
          size="lg"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share Your Results
        </Button>
        
        <Button
          onClick={() => navigate('/', { state: { startAtQuizSelection: true } })}
          variant="outline"
          className="w-full h-14 text-lg font-medium bg-primary/15 border-primary/30 text-primary hover:bg-primary/25"
          size="lg"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Again
        </Button>

        <Button
          onClick={() => navigate('/', { state: { startAtQuizSelection: true } })}
          variant="ghost"
          className="w-full h-14 text-lg font-medium bg-white text-foreground hover:bg-white/80"
          size="lg"
        >
          Try Other Quizzes
        </Button>
      </motion.div>
    </div>
  );
};

export default Results;
