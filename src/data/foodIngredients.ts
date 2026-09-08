/**
 * Digitalized menu — ingredient breakdown for every food in the quiz.
 *
 * Each food name (lowercase) maps to an array of ingredient slugs.
 * Slugs are also organized into 5 categories (vegetables, fruits, meat,
 * fish, seafood) so users can quickly browse a master ingredient picker.
 *
 * Used by the quiz to filter out any item containing an ingredient the
 * user is allergic to (e.g. apple allergy → hide every food with apple).
 */

export type IngredientCategory = 'vegetables' | 'fruits' | 'meat' | 'fish' | 'seafood';

export interface Ingredient {
  slug: string;
  label: string;
  category: IngredientCategory;
}

// ── Master ingredient catalog (for the picker UI) ──
export const ingredientCatalog: Ingredient[] = [
  // FRUITS
  { slug: 'apple', label: 'Apple', category: 'fruits' },
  { slug: 'lemon', label: 'Lemon', category: 'fruits' },
  { slug: 'lime', label: 'Lime', category: 'fruits' },
  { slug: 'orange', label: 'Orange', category: 'fruits' },
  { slug: 'grapefruit', label: 'Grapefruit', category: 'fruits' },
  { slug: 'mango', label: 'Mango', category: 'fruits' },
  { slug: 'grape', label: 'Grape', category: 'fruits' },
  { slug: 'passion_fruit', label: 'Passion Fruit', category: 'fruits' },
  { slug: 'coconut', label: 'Coconut', category: 'fruits' },
  { slug: 'banana', label: 'Banana', category: 'fruits' },
  { slug: 'strawberry', label: 'Strawberry', category: 'fruits' },
  { slug: 'pineapple', label: 'Pineapple', category: 'fruits' },

  // VEGETABLES
  { slug: 'tomato', label: 'Tomato', category: 'vegetables' },
  { slug: 'potato', label: 'Potato', category: 'vegetables' },
  { slug: 'onion', label: 'Onion', category: 'vegetables' },
  { slug: 'garlic', label: 'Garlic', category: 'vegetables' },
  { slug: 'carrot', label: 'Carrot', category: 'vegetables' },
  { slug: 'broccoli', label: 'Broccoli', category: 'vegetables' },
  { slug: 'cauliflower', label: 'Cauliflower', category: 'vegetables' },
  { slug: 'cabbage', label: 'Cabbage', category: 'vegetables' },
  { slug: 'lettuce', label: 'Lettuce', category: 'vegetables' },
  { slug: 'arugula', label: 'Arugula / Rocket', category: 'vegetables' },
  { slug: 'spinach', label: 'Spinach', category: 'vegetables' },
  { slug: 'kale', label: 'Kale', category: 'vegetables' },
  { slug: 'endive', label: 'Endive', category: 'vegetables' },
  { slug: 'radicchio', label: 'Radicchio', category: 'vegetables' },
  { slug: 'cucumber', label: 'Cucumber', category: 'vegetables' },
  { slug: 'mushroom', label: 'Mushroom', category: 'vegetables' },
  { slug: 'shiitake', label: 'Shiitake', category: 'vegetables' },
  { slug: 'porcini', label: 'Porcini', category: 'vegetables' },
  { slug: 'truffle', label: 'Truffle', category: 'vegetables' },
  { slug: 'natto', label: 'Natto', category: 'vegetables' },
  { slug: 'brussels_sprouts', label: 'Brussels Sprouts', category: 'vegetables' },
  { slug: 'jalapeno', label: 'Jalapeño', category: 'vegetables' },
  { slug: 'bell_pepper', label: 'Bell Pepper', category: 'vegetables' },
  { slug: 'chili_pepper', label: 'Chili Pepper', category: 'vegetables' },
  { slug: 'olive', label: 'Olive', category: 'vegetables' },
  { slug: 'ginger', label: 'Ginger', category: 'vegetables' },
  { slug: 'seaweed', label: 'Seaweed', category: 'vegetables' },

  // MEAT
  { slug: 'chicken', label: 'Chicken', category: 'meat' },
  { slug: 'turkey', label: 'Turkey', category: 'meat' },
  { slug: 'beef', label: 'Beef', category: 'meat' },
  { slug: 'pork', label: 'Pork', category: 'meat' },
  { slug: 'bacon', label: 'Bacon', category: 'meat' },
  { slug: 'prosciutto', label: 'Prosciutto', category: 'meat' },
  { slug: 'lamb', label: 'Lamb', category: 'meat' },

  // FISH
  { slug: 'salmon', label: 'Salmon', category: 'fish' },
  { slug: 'tuna', label: 'Tuna', category: 'fish' },
  { slug: 'anchovy', label: 'Anchovy', category: 'fish' },
  { slug: 'dashi', label: 'Dashi', category: 'fish' },
  { slug: 'fish_generic', label: 'Fish (generic)', category: 'fish' },

  // SEAFOOD
  { slug: 'shrimp', label: 'Shrimp', category: 'seafood' },
  { slug: 'crab', label: 'Crab', category: 'seafood' },
  { slug: 'lobster', label: 'Lobster', category: 'seafood' },
  { slug: 'octopus', label: 'Octopus', category: 'seafood' },
  { slug: 'squid', label: 'Squid', category: 'seafood' },
];

// ── Per-food ingredient breakdown (lowercase food name → slug list) ──
export const foodIngredientMap: Record<string, string[]> = {
  // Fruits & fruit-based
  'green apple': ['apple'],
  'red apple': ['apple'],
  'fresh lemon': ['lemon'],
  'lemonade': ['lemon'],
  'lemon candy': ['lemon'],
  'orange': ['orange'],
  'orange juice': ['orange'],
  'grapefruit': ['grapefruit'],
  'mango': ['mango'],
  'passion fruit': ['passion_fruit'],
  'grapes': ['grape'],
  'fruit salad': ['apple', 'orange', 'grape', 'strawberry', 'pineapple', 'banana'],
  'sorbet': ['lemon'],
  'lime ceviche': ['lime', 'fish_generic', 'onion'],
  'coconut curry': ['coconut', 'onion', 'garlic', 'ginger', 'chili_pepper'],

  // Salads & vegetables
  'arugula/rocket': ['arugula'],
  'kale salad': ['kale'],
  'spinach salad': ['spinach'],
  'iceberg lettuce': ['lettuce'],
  'romaine lettuce': ['lettuce'],
  'butter lettuce': ['lettuce'],
  'endive': ['endive'],
  'radicchio': ['radicchio'],
  'cucumber': ['cucumber'],
  'broccoli': ['broccoli'],
  'roasted cauliflower': ['cauliflower'],
  'buffalo cauliflower': ['cauliflower'],
  'brussels sprouts': ['brussels_sprouts'],
  'coleslaw': ['cabbage', 'carrot'],
  'kimchi': ['cabbage', 'chili_pepper', 'garlic', 'ginger'],
  'pickles': ['cucumber'],
  'baked potato': ['potato'],
  'mashed potatoes': ['potato'],
  'vegetable broth': ['onion', 'carrot', 'garlic'],
  'mushroom soup': ['mushroom', 'onion'],
  'seaweed snacks': ['seaweed'],
  'jalapeño poppers': ['jalapeno'],
  'habanero salsa': ['chili_pepper', 'tomato', 'onion'],
  'mild salsa': ['tomato', 'onion'],
  'olives': ['olive'],
  'olive oil': ['olive'],

  // Meat / poultry
  'chicken soup': ['chicken', 'carrot', 'onion'],
  'grilled chicken': ['chicken'],
  'roasted chicken': ['chicken'],
  'fried chicken': ['chicken'],
  'korean fried chicken': ['chicken', 'garlic'],
  'nashville hot chicken': ['chicken', 'chili_pepper'],
  'buffalo wings': ['chicken'],
  'bbq wings': ['chicken'],
  'ghost pepper wings': ['chicken', 'chili_pepper'],
  'tandoori chicken': ['chicken', 'garlic', 'ginger'],
  'butter chicken': ['chicken', 'tomato', 'onion', 'garlic'],
  'korma': ['chicken', 'onion', 'garlic'],
  'vindaloo': ['pork', 'chili_pepper', 'garlic'],
  'roast turkey': ['turkey'],
  'bacon': ['pork', 'bacon'],
  'prosciutto': ['pork', 'prosciutto'],
  'carbonara': ['pork', 'bacon'],

  // Fish & seafood
  'fresh salmon': ['salmon', 'fish_generic'],
  'smoked salmon': ['salmon', 'fish_generic'],
  'fresh tuna': ['tuna', 'fish_generic'],
  'spicy tuna roll': ['tuna', 'fish_generic', 'chili_pepper'],
  'grilled fish': ['fish_generic'],
  'anchovies': ['anchovy', 'fish_generic'],
  'california roll': ['crab'],

  // Pasta / bread / sauces (incl. tomato/garlic ingredients)
  'marinara pasta': ['tomato', 'garlic'],
  'aglio e olio': ['garlic', 'olive'],
  'alfredo pasta': ['garlic'],
  'garlic butter bread': ['garlic'],
  'pad thai': ['onion', 'garlic'],

  // Eggs benedict & misc
  'eggs benedict (creamy hollandaise sauce)': ['lemon'],

  // Umami additions
  'dashi': ['dashi', 'fish_generic'],
  'natto': ['natto'],
  'porcini mushrooms': ['porcini', 'mushroom'],
  'truffle oil': ['truffle', 'olive'],
  'shiitake miso': ['shiitake', 'mushroom'],
  'plain miso': [],
  'shiitake mushrooms': ['shiitake', 'mushroom'],
  'button mushrooms': ['mushroom'],
};

// Lower-cased lookup helper
export function getFoodIngredients(foodName: string): string[] {
  return foodIngredientMap[foodName.toLowerCase()] || [];
}

/**
 * Returns true if the food contains ANY of the user's blocked ingredients.
 */
export function foodContainsBlockedIngredient(
  foodName: string,
  blocked: string[]
): boolean {
  if (blocked.length === 0) return false;
  const ingredients = getFoodIngredients(foodName);
  if (ingredients.length === 0) return false;
  const blockedSet = new Set(blocked);
  return ingredients.some(i => blockedSet.has(i));
}
