import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, Users, ChartBar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

type QuizType = 'sweet' | 'sour' | 'bitter' | 'salty' | 'rich' | 'buttery';

const quizOptions: { value: QuizType; label: string; emoji: string; description: string }[] = [
  { value: 'sweet', label: 'Sweet', emoji: '🍫', description: 'Chocolate, desserts & treats' },
  { value: 'sour', label: 'Sour', emoji: '🍋', description: 'Citrus, tangy & tart' },
  { value: 'bitter', label: 'Bitter', emoji: '☕', description: 'Coffee, dark greens & cocoa' },
  { value: 'salty', label: 'Salty', emoji: '🧂', description: 'Savory snacks & umami' },
  { value: 'rich', label: 'Rich', emoji: '🧈', description: 'Creamy, indulgent & heavy' },
  { value: 'buttery', label: 'Buttery', emoji: '🥐', description: 'Pastries, baked & flaky' },
];

const Index = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0 = landing, 1 = quiz type
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);

  const features = [
    {
      icon: Sparkles,
      title: 'Discover Your Taste',
      description: 'Find out where you fall on the flavor spectrum',
    },
    {
      icon: Users,
      title: 'Compare Globally',
      description: 'See how your palate ranks among others worldwide',
    },
    {
      icon: ChartBar,
      title: 'Personalized Profile',
      description: 'Get insights into your unique taste preferences',
    },
  ];

  const handleStartQuiz = () => {
    if (selectedQuiz) {
      navigate('/quiz', { state: { quizType: selectedQuiz } });
    }
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
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <div className="relative px-6 pt-12 pb-8">
              {/* Decorative elements */}
              <motion.div
                className="absolute top-20 right-8 w-20 h-20 rounded-full bg-primary/20 blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-40 left-4 w-16 h-16 rounded-full bg-accent/30 blur-xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />

              {/* Logo / Title */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="inline-block text-5xl mb-4"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  🍫
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 leading-tight">
                  What's Your
                  <span className="block text-gradient">Taste Level?</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-sm mx-auto leading-relaxed">
                  Swipe through delicious treats to discover your true taste preference
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
                      src="https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=140&h=180&fit=crop"
                      alt="Chocolate truffles"
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
                      src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=160&h=200&fit=crop"
                      alt="Elegant ice cream"
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
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={() => setStep(1)}
                  size="lg"
                  className="h-14 px-8 text-lg font-medium shadow-lg"
                >
                  Start the Quiz
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  Takes only 2 minutes • 12 questions
                </p>
              </motion.div>
            </div>

            {/* Features Section */}
            <div className="px-6 pb-12">
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl card-shadow"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <footer className="px-6 pb-8 text-center">
              <p className="text-xs text-muted-foreground">
                🌍 Join thousands discovering their taste profile
              </p>
            </footer>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="quiz-type"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen px-6 pt-12 pb-8"
          >
            {/* Header */}
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setStep(0)}
                className="mr-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  Choose Your Quiz
                </h2>
              </div>
            </div>

            {/* Quiz Type Options */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {quizOptions.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => setSelectedQuiz(option.value)}
                  className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                    selectedQuiz === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  {selectedQuiz === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
                  )}
                  <span className="text-2xl mb-2 block">{option.emoji}</span>
                  <span className="font-semibold text-foreground block">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </motion.button>
              ))}
            </div>

            {/* Start Quiz Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={handleStartQuiz}
                disabled={!selectedQuiz}
                size="lg"
                className="w-full h-14 text-lg font-medium"
              >
                Start Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
