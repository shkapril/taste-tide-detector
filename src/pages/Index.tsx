import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, ChartBar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: 'Discover Your Taste',
      description: 'Find out where you fall on the sweetness spectrum',
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

  return (
    <div className="min-h-screen bg-background overflow-hidden">
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
            Swipe through delicious treats to discover your true sweetness preference
          </p>
        </motion.div>

        {/* Preview Cards */}
        <motion.div
          className="relative h-48 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-32 h-40 rounded-xl overflow-hidden card-shadow"
            style={{ rotate: -8, top: 8 }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            <img
              src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&h=400&fit=crop"
              alt="Dark chocolate"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-36 h-44 rounded-xl overflow-hidden elevated-shadow z-10"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <img
              src="https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=300&h=400&fit=crop"
              alt="Macarons"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
          </motion.div>
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-32 h-40 rounded-xl overflow-hidden card-shadow"
            style={{ rotate: 8, top: 8 }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            <img
              src="https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=300&h=400&fit=crop"
              alt="White chocolate"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => navigate('/quiz')}
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
    </div>
  );
};

export default Index;
