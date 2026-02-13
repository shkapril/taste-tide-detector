import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuizType, quizLabels } from '@/data/quizData';
import { getCharacter } from '@/data/tasteCharacters';

const allQuizTypes: { type: QuizType; emoji: string }[] = [
  { type: 'sweet', emoji: '🍫' },
  { type: 'sour', emoji: '🍋' },
  { type: 'bitter', emoji: '☕' },
  { type: 'salty', emoji: '🧂' },
  { type: 'rich', emoji: '🧈' },
  { type: 'spicy', emoji: '🌶️' },
];

const Profile = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-background flex flex-col">
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
          className="bg-card rounded-2xl p-8 card-shadow text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {character.image ? (
            <motion.img
              src={character.image}
              alt={character.name}
              className="w-32 h-32 mx-auto mb-4 rounded-2xl object-cover shadow-lg"
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
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
            Your character
          </p>
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">
            {character.name}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
            {character.description}
          </p>
          {completedCount >= 6 && (
            <p className="text-xs text-muted-foreground/60 mt-4">
              1 of 16 possible characters
            </p>
          )}
          {completedCount === 0 && (
            <Button
              onClick={() => navigate('/', { state: { startAtQuizSelection: true } })}
              size="lg"
              className="mt-6 w-full h-12 text-base font-medium tracking-wide rounded-full"
            >
              Start a Quiz
            </Button>
          )}
          {completedCount > 0 && completedCount < 6 && (
            <Button
              onClick={() => navigate('/', { state: { startAtQuizSelection: true } })}
              variant="outline"
              size="lg"
              className="mt-6 w-full h-12 text-base font-medium tracking-wide rounded-full"
            >
              Keep Exploring ({completedCount}/6)
            </Button>
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
          <div className="space-y-3">
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
    </div>
  );
};

export default Profile;
