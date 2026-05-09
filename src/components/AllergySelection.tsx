import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Allergen, EatingStyle } from '@/data/allergens';
import IngredientPicker from '@/components/IngredientPicker';
import halalLogo from '@/assets/halal-logo.png';

const eatingStyles: { value: EatingStyle; label: string; emoji: string }[] = [
  { value: 'all-good', label: 'All Good', emoji: '😋' },
  { value: 'vegetarian', label: 'Vegetarian', emoji: '🥬' },
  { value: 'vegan', label: 'Vegan', emoji: '🌱' },
  { value: 'pescatarian', label: 'Pescatarian', emoji: '🐟' },
  { value: 'halal', label: 'Halal', emoji: '' },
  { value: 'kosher', label: 'Kosher', emoji: '✡️' },
];

interface AllergySelectionProps {
  selectedAllergies: Allergen[];
  selectedEatingStyles: EatingStyle[];
  selectedIngredients: string[];
  onToggleAllergy: (allergen: Allergen) => void;
  onToggleEatingStyle: (style: EatingStyle) => void;
  onToggleIngredient: (slug: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const AllergySelection = ({ selectedAllergies, selectedEatingStyles, selectedIngredients, onToggleAllergy, onToggleEatingStyle, onToggleIngredient, onBack, onContinue }: AllergySelectionProps) => {

  return (
    <motion.div
      key="allergy-selection"
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

      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
        Select anything you avoid including allergies. Choose based on your daily eating habits.
        <br />
        We'll hide foods containing those ingredients and tailor the quiz for you.
      </p>

      {/* Eating Style */}
      <div className="mb-6">
        <h3 className="font-display text-lg text-foreground mb-3">Eating Style</h3>
        <div className="flex flex-wrap gap-2">
          {eatingStyles.map((style, index) => {
            const isActive = selectedEatingStyles.includes(style.value);
            return (
              <motion.button
                key={style.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => onToggleEatingStyle(style.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-card chic-border hover:bg-secondary/50 text-foreground'
                }`}
              >
                {style.value === 'halal' ? (
                  <img src={halalLogo} alt="Halal" className="w-4 h-4 inline-block" />
                ) : (
                  style.emoji
                )}{' '}{style.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Specific ingredient avoidances */}
      <div className="mb-6">
        <h3 className="font-display text-lg text-foreground mb-1">Specific Ingredients to Avoid</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Search any ingredient (e.g. apple, shrimp). We'll hide every dish that contains it.
        </p>
        <IngredientPicker selected={selectedIngredients} onToggle={onToggleIngredient} />
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Button
          onClick={onContinue}
          size="lg"
          className="w-full h-14 text-base font-medium tracking-wide rounded-full"
        >
          {selectedAllergies.length > 0 
            ? `Continue (${selectedAllergies.length} selected)` 
            : 'Continue'}
          <ArrowRight className="w-4 h-4 ml-3" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AllergySelection;
