import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Share2, Link as LinkIcon, Download, MessageCircle, Check, BarChart3 } from 'lucide-react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import ResultsChart from '@/components/ResultsChart';
import HexRadarChart from '@/components/HexRadarChart';
import TasteComparison from '@/components/TasteComparison';
import { getCharacter } from '@/data/tasteCharacters';
import { ingredientLabel } from '@/data/foodIngredients';
import chefImage from '@/assets/chef.png';
import type { TasteVector7 } from '@/data/foodDataset';
import type { EatingStyle } from '@/data/allergens';

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

  // Load saved dietary preferences
  const prefs = JSON.parse(localStorage.getItem('tastePreferences') || 'null');
  const savedEatingStyle: EatingStyle | null = prefs?.eatingStyle || null;
  const savedBlocked: string[] = prefs?.blockedIngredients || [];
  const hasPreferences = !!savedEatingStyle || savedBlocked.length > 0;

  const styleLabel: Record<EatingStyle, string> = {
    'all-good': 'All Good',
    vegetarian: 'Vegetarian',
    vegan: 'Vegan',
    pescatarian: 'Pescatarian',
  };

  const [shareOpen, setShareOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareText = character
    ? `🧬 My Taste DNA: ${character.emoji} ${character.name} — Discover yours at ${shareUrl}`
    : `Discover your Taste DNA at ${shareUrl}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ title: 'Link copied!' });
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownloadImage = async () => {
    if (!shareCardRef.current) return;
    try {
      const dataUrl = await toPng(shareCardRef.current, { cacheBust: true, pixelRatio: 2, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = `taste-dna-${character?.name?.replace(/\s+/g, '-').toLowerCase() || 'profile'}.png`;
      link.href = dataUrl;
      link.click();
      toast({ title: 'Image downloaded' });
    } catch {
      toast({ title: 'Could not download image', variant: 'destructive' });
    }
  };

  const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  const handleKakao = () =>
    openExternal(`https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`);
  const handleWeChat = () => {
    // WeChat has no web share URL — copy link and prompt to paste
    navigator.clipboard.writeText(shareText);
    toast({ title: 'Link copied — paste in WeChat to share' });
  };
  const handleWhatsApp = () =>
    openExternal(`https://wa.me/?text=${encodeURIComponent(shareText)}`);

  const handleShare = () => setShareOpen(true);

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
            <div ref={shareCardRef} className="bg-background space-y-6 rounded-2xl">
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
                  className="px-6 pb-6"
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

            <Button
              onClick={() => setInfoOpen(true)}
              size="lg"
              variant="outline"
              className="w-full h-14 mt-3 text-base font-medium tracking-wide rounded-full"
              disabled={!hasResults}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              More Information
            </Button>
            {!hasResults && (
              <p className="text-xs text-muted-foreground text-center mt-3">
                Complete the quiz to share your profile
              </p>
            )}
          </motion.div>

          {/* Share Dialog */}
          <Dialog open={shareOpen} onOpenChange={setShareOpen}>
            <DialogContent className="sm:max-w-sm rounded-2xl">
              <DialogHeader>
                <DialogTitle className="font-display">Share your Taste DNA</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleCopyLink}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border p-4 hover:bg-accent/40 transition-colors"
                >
                  {copied ? <Check className="w-6 h-6 text-primary" /> : <LinkIcon className="w-6 h-6" />}
                  <span className="text-sm">{copied ? 'Copied' : 'Copy link'}</span>
                </button>
                <button
                  onClick={handleDownloadImage}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border p-4 hover:bg-accent/40 transition-colors"
                >
                  <Download className="w-6 h-6" />
                  <span className="text-sm">Download image</span>
                </button>
                <button
                  onClick={handleKakao}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#FEE500', color: '#3C1E1E' }}
                >
                  <span className="text-lg font-bold">K</span>
                  <span className="text-sm font-medium">KakaoTalk</span>
                </button>
                <button
                  onClick={handleWeChat}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl p-4 text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#07C160' }}
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-sm font-medium">WeChat</span>
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="col-span-2 flex items-center justify-center gap-2 rounded-xl p-4 text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">WhatsApp</span>
                </button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Comparison Dialog */}
          <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
            <DialogContent className="sm:max-w-md rounded-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display">How you compare</DialogTitle>
              </DialogHeader>
              {uxScores && <TasteComparison scores={uxScores} />}
            </DialogContent>
          </Dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Profile;
