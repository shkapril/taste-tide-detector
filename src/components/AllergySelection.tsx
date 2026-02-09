import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Allergen, allergenInfo } from '@/data/allergens';

interface AllergySelectionProps {
  selectedAllergies: Allergen[];
  onToggleAllergy: (allergen: Allergen) => void;
  onBack: () => void;
  onContinue: () => void;
}

const AllergySelection = ({ selectedAllergies, onToggleAllergy, onBack, onContinue }: AllergySelectionProps) => {
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

      <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
        Select any food allergies you have. We'll skip items containing those ingredients so you only see foods that are safe for you.
      </p>

      {/* Allergy Options */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {allergenInfo.map((allergen, index) => {
          const isSelected = selectedAllergies.includes(allergen.value);
          return (
            <motion.button
              key={allergen.value}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onToggleAllergy(allergen.value)}
              className={`relative p-4 rounded-2xl text-left transition-all duration-300 ${
                isSelected
                  ? 'bg-destructive/10 border-2 border-destructive/40 shadow-sm'
                  : 'bg-card chic-border hover:bg-secondary/50'
              }`}
            >
              <span className="text-xl mb-1 block">{allergen.emoji}</span>
              <span className={`font-display text-base block ${
                isSelected ? 'text-destructive' : 'text-foreground'
              }`}>{allergen.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* No allergies note */}
      {selectedAllergies.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 p-4 bg-secondary/50 rounded-2xl mb-8"
        >
          <ShieldCheck className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            No allergies? Just tap continue — you'll see all food options.
          </p>
        </motion.div>
      )}

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
            : 'No Allergies — Continue'}
          <ArrowRight className="w-4 h-4 ml-3" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AllergySelection;
