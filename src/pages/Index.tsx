import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EatingStyleSelection, IngredientSelection } from '@/components/AllergySelection';
import { Allergen, EatingStyle } from '@/data/allergens';
import { defaultAvoidancesForStyle } from '@/data/foodIngredients';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [selectedAllergies, setSelectedAllergies] = useState<Allergen[]>([]);
  const [eatingStyle, setEatingStyle] = useState<EatingStyle | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const features = [
    {
      icon: Users,
      title: 'Compare Globally',
      description: 'See how your palate ranks among others worldwide',
      onClick: undefined as (() => void) | undefined,
    },
  ];

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

              {/* Logo / Title */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="inline-block text-4xl mb-6 opacity-80"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✦
                </motion.div>
                <h1 className="text-5xl md:text-6xl font-display text-foreground mb-5 leading-[1.1] tracking-tight">
                  What's Your
                  <span className="block italic text-primary">Taste Level?</span>
                </h1>
                <p className="text-muted-foreground text-base max-w-xs mx-auto leading-relaxed tracking-wide">
                  Click through food and find out your true taste preference
                </p>
              </motion.div>

              {/* Elegant Food Gallery */}
              <motion.div
                className="relative mb-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Main Featured Row */}
                <div className="flex justify-center gap-3 mb-3">
                  <motion.div
                    className="w-24 h-32 rounded-2xl overflow-hidden card-shadow"
                    style={{ rotate: -6 }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=280&fit=crop"
                      alt="Colorful donuts"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="w-32 h-40 rounded-2xl overflow-hidden elevated-shadow z-10"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=280&h=360&fit=crop"
                      alt="Gourmet chocolate"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                  </motion.div>
                  <motion.div
                    className="w-24 h-32 rounded-2xl overflow-hidden card-shadow"
                    style={{ rotate: 6 }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=200&h=280&fit=crop"
                      alt="French macarons"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                {/* Secondary Row */}
                <div className="flex justify-center gap-2">
                  <motion.div
                    className="w-16 h-20 rounded-xl overflow-hidden card-shadow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                  <img
                      src="/images/steak.png"
                      alt="Grilled steak"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="w-20 h-24 rounded-xl overflow-hidden card-shadow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=160&h=200&fit=crop"
                      alt="Chocolate cake"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="w-20 h-24 rounded-xl overflow-hidden card-shadow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <img
                      src="/images/aglio_e_olio.png"
                      alt="Aglio e Olio pasta"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="w-16 h-20 rounded-xl overflow-hidden card-shadow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=140&h=180&fit=crop"
                      alt="Gourmet dessert"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Button
                  onClick={() => setStep(1)}
                  size="lg"
                  className="h-14 px-10 text-lg font-display tracking-wide rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Discover Your Taste
                  <ArrowRight className="w-4 h-4 ml-3" />
                </Button>
                <p className="text-xs text-muted-foreground mt-4 tracking-widest uppercase">
                  2 min • 8 questions
                </p>
              </motion.div>
            </div>

            {/* Features Section */}
            <div className="px-8 pb-16">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className={`flex items-start gap-5 p-5 bg-card/60 backdrop-blur-sm rounded-2xl chic-border ${feature.onClick ? 'cursor-pointer hover:bg-card/80 transition-colors' : ''}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    onClick={feature.onClick}
                  >
                    <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-foreground/70" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground mb-0.5">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
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
