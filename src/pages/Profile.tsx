import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuizType, quizLabels } from '@/data/quizData';
import { getCharacter } from '@/data/tasteCharacters';
import chefImage from '@/assets/chef.png';

const allQuizTypes: { type: QuizType; emoji: string }[] = [
  { type: 'sweet', emoji: '🍫' },
  { type: 'sour', emoji: '🍋' },
  { type: 'bitter', emoji: '☕' },
  { type: 'salty', emoji: '🧂' },
  { type: 'rich', emoji: '🧈' },
  { type: 'spicy', emoji: '🌶️' },
];

const Profile = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const scores: Partial<Record<QuizType, number>> = JSON.parse(
    localStorage.getItem('quizScores') || '{}'
  );
  const completedCount = Object.keys(scores).length;
  const character = getCharacter(scores);

  const handleShare = async () => {
    const lines = allQuizTypes
      .filter(q => scores[q.type] !== undefined)
      .map(q => `${q.emoji} ${quizLabels[q.type].label}: ${scores[q.type]!.toFixed(1)}/10`)
      .join('\n');

    const text = `🍽️ My Taste Character: ${character.emoji} ${character.name}\n\n${lines}\n\nDiscover your taste at ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Taste Profile', text, url: window.location.origin });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isAnalyzing ? (
        <motion.div
          key="analyzing"
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
            animate={{
              y: [0, -8, 0],
            }}
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
      ) : (
        <motion.div
          key="profile"
          className="min-h-screen bg-background flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <header className="px-6 pt-8 pb-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-display tracking-tight text-foreground">
                Your Taste Profile
              </h1>
            </div>
          </header>

          <div className="flex-1 px-6 py-4 space-y-6">
            {/* Character Card */}
            <motion.div
              className="rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {completedCount >= 6 ? (
                <>
                  {character.image ? (
                    <motion.img
                      src={character.image}
                      alt={character.name}
                      className="w-48 h-48 mx-auto mb-4 rounded-2xl object-cover shadow-lg"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ) : (
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {character.emoji}
                    </motion.div>
                  )}
                  <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                    {character.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {character.description}
                  </p>
                </>
              ) : (
                <>
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    🔒
                  </motion.div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Mystery Character
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {completedCount === 0
                      ? 'Complete all 6 taste quizzes to reveal your country character!'
                      : `${completedCount}/6 quizzes done — keep going to unlock your character!`}
                  </p>
                  <Button
                    onClick={() => navigate('/', { state: { startAtQuizSelection: true } })}
                    size="lg"
                    className="mt-6 w-full h-12 text-base font-medium tracking-wide rounded-full"
                  >
                    {completedCount === 0 ? 'Start a Quiz' : `Keep Exploring (${completedCount}/6)`}
                  </Button>
                </>
              )}
            </motion.div>

            {/* Taste Levels */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                Taste Levels
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {allQuizTypes.map((q, i) => {
                  const score = scores[q.type];
                  const label = quizLabels[q.type];
                  return (
                    <motion.div
                      key={q.type}
                      className="bg-card rounded-xl p-4 chic-border"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{q.emoji}</span>
                          <span className="font-display text-sm text-foreground">{label.label}</span>
                        </div>
                        {score !== undefined ? (
                          <span className="text-sm font-medium text-primary">{score.toFixed(1)}/10</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">Not taken</span>
                        )}
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: score !== undefined ? `${(score / 10) * 100}%` : '0%' }}
                          transition={{ duration: 0.8, delay: 0.5 + i * 0.05 }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[10px] text-muted-foreground">{label.lowLabel}</span>
                        <span className="text-[10px] text-muted-foreground">{label.highLabel}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Share Button */}
          <motion.div
            className="px-6 pb-8 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={handleShare}
              size="lg"
              className="w-full h-14 text-base font-medium tracking-wide rounded-full"
              disabled={completedCount === 0}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share My Taste Profile
            </Button>
            {completedCount === 0 && (
              <p className="text-xs text-muted-foreground text-center mt-3">
                Complete at least one quiz to share your profile
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Profile;
