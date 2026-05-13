import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResultsChart from '@/components/ResultsChart';
import { getCharacter } from '@/data/tasteCharacters';
import chefImage from '@/assets/chef.png';
import type { TasteVector7 } from '@/data/foodDataset';

const Profile = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Load saved taste DNA
  const saved = JSON.parse(localStorage.getItem('tasteDNA') || 'null');
  const uxScores: Record<string, number> | null = saved?.uxScores || null;
  const internalMean: TasteVector7 | null = saved?.internalMean || null;
  const character = internalMean ? getCharacter(internalMean) : null;
  const hasResults = !!uxScores;

  const handleShare = async () => {
    if (!uxScores || !character) return;
    const lines = Object.entries(uxScores)
      .map(([k, v]) => `${k}: ${(v as number).toFixed(1)}/10`)
      .join('\n');
    const text = `🧬 My Taste DNA: ${character.emoji} ${character.name}\n\n${lines}\n\nDiscover yours at ${window.location.origin}`;

    if (navigator.share) {
      try { await navigator.share({ title: 'My Taste DNA', text, url: window.location.origin }); }
      catch { /* cancelled */ }
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
              Loading Profile...
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
                Your Taste DNA
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
              {hasResults && character ? (
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
                    🧬
                  </motion.div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Discover Your Taste DNA
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    Take the 8-question taste quiz to reveal your unique flavor profile!
                  </p>
                  <Button
                    onClick={() => navigate('/')}
                    size="lg"
                    className="mt-6 w-full h-12 text-base font-medium tracking-wide rounded-full"
                  >
                    Start the Quiz
                  </Button>
                </>
              )}
            </motion.div>

            {/* Taste Levels */}
            {hasResults && uxScores && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                  Taste Spectrum
                </h3>
                <HexRadarChart scores={uxScores} />
                <div className="mt-8">
                  <ResultsChart scores={uxScores} />
                </div>
              </motion.div>
            )}
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
              disabled={!hasResults}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share My Taste DNA
            </Button>
            {!hasResults && (
              <p className="text-xs text-muted-foreground text-center mt-3">
                Complete the quiz to share your profile
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Profile;
