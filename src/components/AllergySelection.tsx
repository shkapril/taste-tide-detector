import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EatingStyle } from '@/data/allergens';
import IngredientPicker from '@/components/IngredientPicker';

const eatingStyles: { value: EatingStyle; label: string; emoji: string; description: string }[] = [
  { value: 'all-good', label: 'All Good', emoji: '😋', description: 'I eat everything' },
  { value: 'vegetarian', label: 'Vegetarian', emoji: '🥬', description: 'No meat or fish' },
  { value: 'vegan', label: 'Vegan', emoji: '🌱', description: 'No animal products' },
  { value: 'pescatarian', label: 'Pescatarian', emoji: '🐟', description: 'Fish, but no meat' },
];

interface EatingStyleSelectionProps {
  selected: EatingStyle | null;
  onSelect: (style: EatingStyle) => void;
  onBack: () => void;
}

export const EatingStyleSelection = ({ selected, onSelect, onBack }: EatingStyleSelectionProps) => {
  return (
    <motion.div
      key="eating-style-selection"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen px-8 pt-14 pb-10"
    >
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mr-3 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-display text-foreground tracking-tight">
            Your Eating Style
          </h2>
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
        How do you usually eat? We'll tailor the quiz menu to match.
      </p>

      {/* 2x2 boxes */}
      <div className="grid grid-cols-2 gap-3 mb-10">
        {eatingStyles.map((style, index) => {
          const isActive = selected === style.value;
          return (
            <motion.button
              key={style.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onSelect(style.value)}
              className={`relative flex flex-col items-center justify-center gap-2 aspect-square rounded-3xl transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card chic-border hover:bg-secondary/50 text-foreground'
              }`}
            >
              {isActive && (
                <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
              <span className="text-4xl">{style.emoji}</span>
              <span className="font-display text-lg">{style.label}</span>
              <span className={`text-xs ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                {style.description}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Button
          onClick={onContinue}
          disabled={!selected}
          size="lg"
          className="w-full h-14 text-base font-medium tracking-wide rounded-full"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-3" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

interface IngredientSelectionProps {
  selectedIngredients: string[];
  onToggleIngredient: (slug: string) => void;
  onSkipAll: () => void;
  onBack: () => void;
  onContinue: () => void;
}

export const IngredientSelection = ({ selectedIngredients, onToggleIngredient, onSkipAll, onBack, onContinue }: IngredientSelectionProps) => {
  return (
    <motion.div
      key="ingredient-selection"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen px-8 pt-14 pb-10"
    >
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mr-3 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-display text-foreground tracking-tight">
            Anything You Avoid?
          </h2>
        </div>
      </div>

      {/* I eat everything / Skip */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.22, 1, 0.36, 1] }}
        onClick={onSkipAll}
        className="w-full flex items-center justify-center gap-2 h-14 mb-6 rounded-full bg-secondary/60 chic-border text-foreground font-medium hover:bg-secondary transition-colors"
      >
        <Sparkles className="w-4 h-4 text-primary" />
        I eat everything — Skip
      </motion.button>

      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
        Or pick the specific ingredients you avoid. We'll hide every dish that contains them.
      </p>

      {/* Ingredient picker */}
      <div className="mb-6">
        <IngredientPicker selected={selectedIngredients} onToggle={onToggleIngredient} />
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Button
          onClick={onContinue}
          size="lg"
          className="w-full h-14 text-base font-medium tracking-wide rounded-full"
        >
          {selectedIngredients.length > 0
            ? `Continue (${selectedIngredients.length} avoided)`
            : 'Continue'}
          <ArrowRight className="w-4 h-4 ml-3" />
        </Button>
      </motion.div>
    </motion.div>
  );
};
