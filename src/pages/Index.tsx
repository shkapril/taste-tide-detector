import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Users, ChartBar, Check, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AllergySelection from '@/components/AllergySelection';
import { Allergen } from '@/data/allergens';

type QuizType = 'sweet' | 'sour' | 'bitter' | 'salty' | 'rich' | 'spicy';

const quizOptions: { value: QuizType; label: string; emoji: string; description: string }[] = [
  { value: 'sweet', label: 'Sweet', emoji: '🍫', description: 'Chocolate, desserts & treats' },
  { value: 'sour', label: 'Sour', emoji: '🍋', description: 'Citrus, tangy & tart' },
  { value: 'bitter', label: 'Bitter', emoji: '☕', description: 'Coffee, dark greens & cocoa' },
  { value: 'salty', label: 'Salty', emoji: '🧂', description: 'Savory snacks & umami' },
  { value: 'rich', label: 'Rich & Buttery', emoji: '🧈', description: 'Creamy, indulgent & pastries' },
  { value: 'spicy', label: 'Spicy', emoji: '🌶️', description: 'Hot peppers, chili & heat' },
];

interface IndexLocationState {
  startAtQuizSelection?: boolean;
}

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as IndexLocationState | null;
  
  const [step, setStep] = useState(locationState?.startAtQuizSelection ? 2 : 0);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<QuizType[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<Allergen[]>([]);

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem('quizScores') || '{}');
    setCompletedQuizzes(Object.keys(scores) as QuizType[]);
  }, []);

  const features = [
    {
      icon: Users,
      title: 'Compare Globally',
      description: 'See how your palate ranks among others worldwide',
      onClick: undefined as (() => void) | undefined,
    },
    {
      icon: ChartBar,
      title: 'Personalized Profile',
      description: 'Get insights into your unique taste preferences',
      onClick: () => navigate('/profile'),
    },
  ];

  const handleStartQuiz = () => {
    if (selectedQuiz) {
      navigate('/quiz', { state: { quizType: selectedQuiz, allergies: selectedAllergies } });
    }
  };

  const handleToggleAllergy = (allergen: Allergen) => {
    setSelectedAllergies(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    );
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
                  <span className="block text-gradient italic">Taste Level?</span>
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
                  2 min • 12 questions
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
          <AllergySelection
            selectedAllergies={selectedAllergies}
            onToggleAllergy={handleToggleAllergy}
            onBack={() => setStep(0)}
            onContinue={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <motion.div
            key="quiz-type"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen px-8 pt-14 pb-10"
          >
            {/* Header */}
            <div className="flex items-center mb-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setStep(1)}
                className="mr-3 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex-1">
              <h2 className="text-3xl font-display text-foreground tracking-tight">
                  Choose Your Quiz
                </h2>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Some foods can be made in different ways. Answer based on versions you usually eat or would choose that fit your dietary habits.
                </p>
              </div>
            </div>

            {/* Quiz Type Options */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {quizOptions.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedQuiz(option.value)}
                  className={`relative p-5 rounded-2xl text-left transition-all duration-300 ${
                    selectedQuiz === option.value
                      ? 'bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground shadow-md'
                      : 'bg-card chic-border hover:bg-secondary/50'
                  }`}
                >
                  {/* Completion indicator */}
                  <div className="absolute top-4 right-4">
                    {completedQuizzes.includes(option.value) ? (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        selectedQuiz === option.value ? 'bg-primary-foreground/20' : 'bg-success'
                      }`}>
                        <Check className={`w-3 h-3 ${
                          selectedQuiz === option.value ? 'text-primary-foreground' : 'text-success-foreground'
                        }`} />
                      </div>
                    ) : (
                      <Circle className={`w-5 h-5 ${
                        selectedQuiz === option.value ? 'text-primary-foreground/40' : 'text-muted-foreground/30'
                      }`} strokeWidth={1.5} />
                    )}
                  </div>
                  <span className="text-xl mb-2 block">{option.emoji}</span>
                  <span className={`font-display text-lg block mb-0.5 ${
                    selectedQuiz === option.value ? 'text-primary-foreground' : 'text-foreground'
                  }`}>{option.label}</span>
                  <span className={`text-xs leading-relaxed ${
                    selectedQuiz === option.value ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>{option.description}</span>
                </motion.button>
              ))}
            </div>

            {/* Start Quiz Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button
                onClick={handleStartQuiz}
                disabled={!selectedQuiz}
                size="lg"
                className="w-full h-14 text-base font-medium tracking-wide rounded-full"
              >
                Start Quiz
                <ArrowRight className="w-4 h-4 ml-3" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
