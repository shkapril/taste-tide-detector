import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, X } from 'lucide-react';
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
  fish: '🐟 Fish',
  fruits: '🍎 Fruits',
  grains: '🌾 Grains & Bread',
  meat: '🥩 Meat & Poultry',
  nuts: '🥜 Nuts & Seeds',
  other: '🧂 Pantry & Other',
  seafood: '🦐 Seafood',
  vegetables: '🥬 Vegetables',
};

const categoryOrder: IngredientCategory[] = [
  'dairy',
  'fish',
  'fruits',
  'grains',
  'meat',
  'nuts',
  'other',
  'seafood',
  'vegetables',
];

const IngredientPicker = ({ selected, onToggle }: IngredientPickerProps) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ingredientCatalog;
    return ingredientCatalog.filter(i =>
      i.label.toLowerCase().includes(q) || i.slug.includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof ingredientCatalog> = {};
    for (const ing of filtered) {
      (map[ing.category] ||= []).push(ing);
    }
    return map;
  }, [filtered]);

  const selectedSet = new Set(selected);

  const [custom, setCustom] = useState('');
  const customSlug = toIngredientSlug(custom);
  const canAddCustom =
    customSlug.length > 1 && !selectedSet.has(customSlug);

  const handleAddCustom = () => {
    if (!canAddCustom) return;
    onToggle(customSlug);
    setCustom('');
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search ingredients (e.g. apple, shrimp)…"
          maxLength={40}
          className="w-full h-11 pl-11 pr-10 rounded-full bg-card chic-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Add your own ingredient */}
      <div className="flex gap-2">
        <input
          type="text"
          value={custom}
          onChange={e => setCustom(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddCustom();
            }
          }}
          placeholder="Not on the list? Type it here…"
          maxLength={40}
          className="flex-1 h-11 px-4 rounded-full bg-card chic-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
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

      {/* Selected pills */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map(slug => (
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
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No ingredients match "{query}"
          </p>
        )}
      </div>
    </div>
  );
};

export default IngredientPicker;
