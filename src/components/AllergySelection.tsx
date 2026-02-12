import { useState } from 'react';
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
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({});

  const handleCustomInputChange = (allergen: Allergen, value: string) => {
    setCustomInputs(prev => ({ ...prev, [allergen]: value }));
    // Auto-select if user starts typing
    if (value.length > 0 && !selectedAllergies.includes(allergen)) {
      onToggleAllergy(allergen);
    }
  };

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
        Select anything you avoid including allergies. Choose based on your daily eating habits.
        <br />
        We'll hide foods containing those ingredients and tailor the quiz for you.
      </p>

      {/* Allergy Options */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {allergenInfo.map((allergen, index) => {
          const isSelected = selectedAllergies.includes(allergen.value);
          return (
            <motion.div
              key={allergen.value}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => onToggleAllergy(allergen.value)}
                className={`relative w-full p-4 rounded-2xl text-left transition-all duration-300 ${
                  isSelected
                    ? 'bg-destructive/10 border-2 border-destructive/40 shadow-sm'
                    : 'bg-card chic-border hover:bg-secondary/50'
                }`}
              >
                <span className="text-xl mb-1 block">{allergen.emoji}</span>
                <div className="flex items-center gap-2">
                  <span className={`font-display text-base ${
                    isSelected ? 'text-destructive' : 'text-foreground'
                  }`}>{allergen.label}</span>
                </div>
                {allergen.hasCustomInput && (
                  <input
                    type="text"
                    placeholder={allergen.value === 'tree_nuts' ? 'e.g. almonds, cashews' : allergen.value === 'fruits' ? 'e.g. kiwi, mango' : 'e.g. sesame, sunflower'}
                    value={customInputs[allergen.value] || ''}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleCustomInputChange(allergen.value, e.target.value)}
                    className="w-full mt-2 px-2 py-1.5 text-xs rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-destructive/40 transition-colors"
                    maxLength={100}
                  />
                )}
              </button>
            </motion.div>
          );
        })}

        {/* Others box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: allergenInfo.length * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            onClick={() => {
              if (!customInputs['others']) {
                setCustomInputs(prev => ({ ...prev, others: '' }));
              }
            }}
            className={`relative w-full h-full p-4 rounded-2xl text-left transition-all duration-300 ${
              customInputs['others']
                ? 'bg-destructive/10 border-2 border-destructive/40 shadow-sm'
                : 'bg-card chic-border hover:bg-secondary/50'
            }`}
          >
            <span className="text-xl mb-1 block">✏️</span>
            <span className={`font-display text-base block ${
              customInputs['others'] ? 'text-destructive' : 'text-foreground'
            }`}>Others</span>
            <input
              type="text"
              placeholder="e.g. corn, celery"
              value={customInputs['others'] || ''}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setCustomInputs(prev => ({ ...prev, others: e.target.value }))}
              className="w-full mt-2 px-2 py-1.5 text-xs rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-destructive/40 transition-colors"
              maxLength={200}
            />
          </button>
        </motion.div>
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
