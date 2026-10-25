import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EatingStyleSelection, IngredientSelection } from '@/components/AllergySelection';
import { Allergen, EatingStyle } from '@/data/allergens';
import { defaultAvoidancesForStyle } from '@/data/foodIngredients';
import redVelvetCakeImg from '@/assets/red_velvet_cake.png.asset.json';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [selectedAllergies, setSelectedAllergies] = useState<Allergen[]>([]);
  // Restore previously saved dietary preferences so they keep applying
  // to every new quiz run (also shown on the Profile page).
  const [savedPrefs] = useState<{ eatingStyle: EatingStyle | null; blockedIngredients: string[] } | null>(() =>
    JSON.parse(localStorage.getItem('tastePreferences') || 'null')
  );
  const [eatingStyle, setEatingStyle] = useState<EatingStyle | null>(savedPrefs?.eatingStyle || null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(savedPrefs?.blockedIngredients || []);

  const savePreferences = (style: EatingStyle | null, ingredients: string[]) => {
    localStorage.setItem(
      'tastePreferences',
      JSON.stringify({
        eatingStyle: style,
        blockedIngredients: ingredients,
        savedAt: Date.now(),
      })
    );
  };

  const handleStartQuiz = () => {
    savePreferences(eatingStyle, selectedIngredients);
    navigate('/categories', {
      state: {
        allergies: selectedAllergies,
        eatingStyles: eatingStyle ? [eatingStyle] : [],
        blockedIngredients: selectedIngredients,
      },
    });
  };

  const handleSkipAllIngredients = () => {
    setSelectedIngredients([]);
    savePreferences(eatingStyle, []);
    navigate('/categories', {
      state: {
        allergies: selectedAllergies,
        eatingStyles: eatingStyle ? [eatingStyle] : [],
        blockedIngredients: [],
      },
    });
  };

  const handleToggleIngredient = (slug: string) => {
    setSelectedIngredients(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const handleSelectEatingStyle = (style: EatingStyle) => {
    setEatingStyle(style);
    setSelectedIngredients(defaultAvoidancesForStyle(style));
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Hero Section */}
            <div className="relative px-8 pt-16 pb-10">
              {/* Subtle decorative elements */}
              <motion.div
                className="absolute top-24 right-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-48 left-6 w-24 h-24 rounded-full bg-primary/8 blur-2xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
              />

              {(() => {
                const imgs = [
                  ['https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop','Donuts'],
                  ['/images/steak.png','Grilled steak'],
                  ['https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=400&fit=crop','Macarons'],
                  ['/images/aglio_e_olio.png','Aglio e Olio'],
                  ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop','Chocolate cake'],
                  ['https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop','Chocolate'],
                  [redVelvetCakeImg.url, 'Red velvet cake'],
                  ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop','Salad'],
                ];
                const cells = [...imgs.slice(0, 4), null, ...imgs.slice(4)];
                return (
                  <div className="relative grid grid-cols-3 gap-2 md:gap-3 max-w-2xl mx-auto mb-10">
                    {cells.map((c, i) => c ? (
                      <motion.div key={i} className="aspect-square rounded-2xl overflow-hidden card-shadow"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * i }}>
                        <img src={c[0]} alt={c[1]} className="w-full h-full object-cover" />
                      </motion.div>
                    ) : (
                      <motion.div key={i} className="aspect-square rounded-2xl bg-card elevated-shadow flex flex-col items-center justify-center text-center p-2"
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h1 className="text-lg sm:text-2xl md:text-4xl font-display text-foreground leading-tight tracking-tight">
                          What's Your<span className="block italic text-primary">Taste Level?</span>
                        </h1>
                      </motion.div>
                    ))}
                  </div>
                );
              })()}

              <p className="text-muted-foreground text-base max-w-xs mx-auto leading-relaxed tracking-wide text-center mb-8">
                Click through food and find out your true taste preference
              </p>

              <div className="text-center mb-16">
                <Button onClick={() => setStep(1)} size="lg"
                  className="h-14 px-10 text-lg font-display tracking-wide rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                  Discover Your Taste
                  <ArrowRight className="w-4 h-4 ml-3" />
                </Button>
                <p className="text-xs text-muted-foreground mt-4 tracking-widest uppercase">2 min • 8 questions</p>
              </div>
            </div>


            {/* Footer */}
            <footer className="px-8 pb-10 text-center">
              <p className="text-xs text-muted-foreground/60 tracking-widest uppercase">
                Join thousands discovering their taste
              </p>
            </footer>
          </motion.div>
        )}

        {step === 1 && (
          <EatingStyleSelection
            selected={eatingStyle}
            onSelect={handleSelectEatingStyle}
            onBack={() => setStep(0)}
          />
        )}

        {step === 2 && (
          <IngredientSelection
            selectedIngredients={selectedIngredients}
            onToggleIngredient={handleToggleIngredient}
            onSkipAll={handleSkipAllIngredients}
            onBack={() => setStep(1)}
            onContinue={handleStartQuiz}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
