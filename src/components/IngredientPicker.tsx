import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import {
  ingredientCatalog,
  IngredientCategory,
  ingredientLabel,
  toIngredientSlug,
} from '@/data/foodIngredients';

interface IngredientPickerProps {
  selected: string[];
  onToggle: (slug: string) => void;
}

const categoryLabel: Record<IngredientCategory, string> = {
  dairy: '🥛 Dairy & Egg',
  fish_seafood: '🐟 Fish & Seafood',
  fruits: '🍎 Fruits',
  grains: '🌾 Grains & Bread',
  meat: '🥩 Meat & Poultry',
  nuts: '🥜 Nuts & Seeds',
  other: '🧂 Pantry & Other',
  vegetables: '🥬 Vegetables',
};

const categoryOrder: IngredientCategory[] = [
  'dairy',
  'fish_seafood',
  'fruits',
  'grains',
  'meat',
  'nuts',
  'other',
  'vegetables',
];

const IngredientPicker = ({ selected, onToggle }: IngredientPickerProps) => {
  const [custom, setCustom] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const selectedSet = new Set(selected);
  const catalogSlugs = useMemo(
    () => new Set(ingredientCatalog.map(i => i.slug)),
    []
  );
  const customSelected = selected.filter(slug => !catalogSlugs.has(slug));

  const customSlug = toIngredientSlug(custom);
  const canAddCustom = customSlug.length > 1 && !selectedSet.has(customSlug);

  const suggestions = useMemo(() => {
    const q = custom.trim().toLowerCase();
    if (q.length === 0) return [];
    return ingredientCatalog
      .filter(
        i => i.label.toLowerCase().startsWith(q) && !selectedSet.has(i.slug)
      )
      .slice(0, 8);
  }, [custom, selectedSet]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof ingredientCatalog> = {};
    for (const ing of ingredientCatalog) {
      (map[ing.category] ||= []).push(ing);
    }
    return map;
  }, []);

  const handleAddCustom = () => {
    if (!canAddCustom) return;
    onToggle(customSlug);
    setCustom('');
  };

  const handleSelectSuggestion = (slug: string) => {
    onToggle(slug);
    setCustom('');
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-4">
      {/* Type to find an ingredient or add your own */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={custom}
            onChange={e => {
              setCustom(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (suggestions.length > 0) {
                  handleSelectSuggestion(suggestions[0].slug);
                } else {
                  handleAddCustom();
                }
              }
              if (e.key === 'Escape') {
                setShowSuggestions(false);
              }
            }}
            placeholder="Not on the list? Type it here…"
            maxLength={40}
            className="w-full h-11 px-4 rounded-full bg-card chic-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 left-0 right-0 top-full mt-2 max-h-48 overflow-y-auto rounded-2xl bg-card chic-border shadow-lg p-2 space-y-1">
              {suggestions.map(i => (
                <button
                  key={i.slug}
                  type="button"
                  onMouseDown={e => {
                    e.preventDefault();
                    handleSelectSuggestion(i.slug);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-secondary/50 transition-colors"
                >
                  {i.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddCustom}
          disabled={!canAddCustom}
          className="h-11 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-1 disabled:opacity-40 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* Selected pills — only custom (not-on-the-list) ingredients */}
      {customSelected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {customSelected.map(slug => (
            <button
              key={slug}
              onClick={() => onToggle(slug)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/40 text-xs font-medium text-destructive"
            >
              {ingredientLabel(slug)}
              <X className="w-3 h-3" />
            </button>
          ))}
        </div>
      )}

      {/* Grouped results */}
      <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {categoryOrder.map(cat => {
            const items = grouped[cat];
            if (!items || items.length === 0) return null;
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  {categoryLabel[cat]}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {items.map(ing => {
                    const active = selectedSet.has(ing.slug);
                    return (
                      <button
                        key={ing.slug}
                        onClick={() => onToggle(ing.slug)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          active
                            ? 'bg-destructive/10 border border-destructive/40 text-destructive'
                            : 'bg-card chic-border text-foreground hover:bg-secondary/50'
                        }`}
                      >
                        {ing.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IngredientPicker;
