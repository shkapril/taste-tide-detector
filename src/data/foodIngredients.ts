/**
 * Digitalized menu — ingredient breakdown for every food in the quiz.
 *
 * Each food name (lowercase) maps to an array of ingredient slugs.
 * Slugs are organized into categories so users can quickly browse a
 * master ingredient picker.
 *
 * Used by the quiz to filter out any item containing an ingredient the
 * user avoids (e.g. apple allergy → hide every food with apple).
 */

export type IngredientCategory =
  | 'vegetables'
  | 'fruits'
  | 'meat'
  | 'fish_seafood'
  | 'dairy'
  | 'nuts'
  | 'other';

export interface Ingredient {
  slug: string;
  label: string;
  category: IngredientCategory;
  /** If true, the ingredient is hidden from the category grid but still searchable. */
  searchOnly?: boolean;
}

// ── Master ingredient catalog (for the picker UI) ──
export const ingredientCatalog: Ingredient[] = [
  // FRUITS
  { slug: 'apple', label: 'Apple', category: 'fruits' },
  { slug: 'kiwi', label: 'Kiwi', category: 'fruits' },
  { slug: 'mango', label: 'Mango', category: 'fruits' },
  { slug: 'peach', label: 'Peach', category: 'fruits' },
  { slug: 'pear', label: 'Pear', category: 'fruits' },
  { slug: 'strawberry', label: 'Strawberry', category: 'fruits' },

  // VEGETABLES
  { slug: 'tomato', label: 'Tomato', category: 'vegetables' },
  { slug: 'potato', label: 'Potato', category: 'vegetables' },
  { slug: 'onion', label: 'Onion', category: 'vegetables' },
  { slug: 'garlic', label: 'Garlic', category: 'vegetables' },
  { slug: 'carrot', label: 'Carrot', category: 'vegetables' },
  { slug: 'mushroom', label: 'Mushroom', category: 'vegetables' },
  { slug: 'soybean', label: 'Soybean', category: 'vegetables' },
  { slug: 'celery', label: 'Celery', category: 'vegetables' },

  // DAIRY & EGG
  { slug: 'butter', label: 'Butter', category: 'dairy' },
  { slug: 'egg', label: 'Egg', category: 'dairy' },
  { slug: 'milk', label: 'Milk', category: 'dairy' },
  { slug: 'cream', label: 'Cream', category: 'dairy' },
  { slug: 'yogurt', label: 'Yogurt', category: 'dairy' },
  { slug: 'cheese', label: 'Cheese', category: 'dairy' },

  // MEAT
  { slug: 'chicken', label: 'Chicken', category: 'meat' },
  { slug: 'turkey', label: 'Turkey', category: 'meat' },
  { slug: 'beef', label: 'Beef', category: 'meat' },
  { slug: 'pork', label: 'Pork', category: 'meat' },
  { slug: 'lamb', label: 'Lamb', category: 'meat' },
  { slug: 'gelatin', label: 'Gelatin', category: 'meat' },

  // FISH & SEAFOOD
  { slug: 'salmon', label: 'Salmon', category: 'fish_seafood' },
  { slug: 'tuna', label: 'Tuna', category: 'fish_seafood' },
  { slug: 'anchovy', label: 'Anchovy', category: 'fish_seafood' },
  { slug: 'dashi', label: 'Dashi', category: 'fish_seafood' },
  { slug: 'katsuobushi', label: 'Katsuobushi', category: 'fish_seafood' },
  { slug: 'fish_sauce', label: 'Fish Sauce', category: 'fish_seafood' },
  { slug: 'fish_generic', label: 'Fish (generic)', category: 'fish_seafood' },
  { slug: 'octopus', label: 'Octopus', category: 'fish_seafood' },
  { slug: 'squid', label: 'Squid', category: 'fish_seafood' },
  { slug: 'shellfish', label: 'Shellfish', category: 'fish_seafood' },

  // NUTS
  { slug: 'almond', label: 'Almond', category: 'nuts' },
  { slug: 'walnut', label: 'Walnut', category: 'nuts' },
  { slug: 'pistachio', label: 'Pistachio', category: 'nuts' },
  { slug: 'peanut', label: 'Peanut', category: 'nuts' },
  { slug: 'pine_nuts', label: 'Pine Nuts', category: 'nuts' },
  { slug: 'sesame', label: 'Sesame', category: 'nuts' },


  // SAUCE & OTHER — shown in the searching section, not the category grid
  { slug: 'honey', label: 'Honey', category: 'other', searchOnly: true },
  { slug: 'soy_sauce', label: 'Soy Sauce', category: 'other', searchOnly: true },
  { slug: 'miso', label: 'Miso', category: 'other', searchOnly: true },
  { slug: 'mustard', label: 'Mustard', category: 'other', searchOnly: true },
  { slug: 'alcohol', label: 'Alcohol', category: 'other', searchOnly: true },
  { slug: 'corn', label: 'Corn', category: 'other', searchOnly: true },
  { slug: 'oat', label: 'Oat', category: 'other', searchOnly: true },
  { slug: 'yeast', label: 'Yeast', category: 'other', searchOnly: true },
];

// ── Per-food ingredient breakdown (lowercase food name → slug list) ──
export const foodIngredientMap: Record<string, string[]> = {
  // ── Fruits & fruit-based ──
  'green apple': ['apple'],
  'red apple': ['apple'],
  'fresh lemon': ['lemon'],
  'lemonade': ['lemon', 'sugar'],
  'lemon candy': ['lemon', 'sugar'],
  'orange': ['orange'],
  'orange juice': ['orange'],
  'grapefruit': ['grapefruit'],
  'mango': ['mango'],
  'passion fruit': ['passion_fruit'],
  'grapes': ['grape'],
  'lime juice': ['lime'],
  'fruit salad': ['apple', 'orange', 'grape', 'strawberry', 'pineapple', 'banana'],
  'sorbet': ['lemon', 'sugar'],
  'lime ceviche': ['lime', 'fish_generic', 'onion', 'chili_pepper', 'salt'],
  'coconut curry': ['coconut', 'onion', 'garlic', 'ginger', 'chili_pepper'],

  // ── Salads & vegetables ──
  'arugula/rocket': ['arugula'],
  'kale salad': ['kale', 'olive_oil', 'lemon'],
  'spinach salad': ['spinach', 'olive_oil'],
  'iceberg lettuce': ['lettuce'],
  'romaine lettuce': ['lettuce'],
  'butter lettuce': ['lettuce'],
  'endive': ['endive'],
  'radicchio': ['radicchio'],
  'cucumber': ['cucumber'],
  'broccoli': ['broccoli'],
  'roasted cauliflower': ['cauliflower', 'olive_oil', 'salt'],
  'buffalo cauliflower': ['cauliflower', 'chili_pepper', 'butter', 'wheat_flour'],
  'brussels sprouts': ['brussels_sprouts', 'olive_oil'],
  'coleslaw': ['cabbage', 'carrot', 'egg', 'vinegar'],
  'kimchi': ['cabbage', 'chili_pepper', 'garlic', 'ginger', 'fish_sauce', 'scallion', 'salt'],
  'pickles': ['cucumber', 'vinegar', 'salt'],
  'baked potato': ['potato', 'salt'],
  'mashed potatoes': ['potato', 'butter', 'milk', 'salt'],
  'vegetable broth': ['onion', 'carrot', 'celery', 'garlic', 'salt'],
  'clear broth': ['onion', 'carrot', 'celery', 'salt'],
  'mushroom soup': ['mushroom', 'onion', 'cream', 'butter'],
  'seaweed snacks': ['seaweed', 'sesame', 'salt'],
  'jalapeño poppers': ['jalapeno', 'cream_cheese', 'wheat_flour', 'bacon'],
  'habanero salsa': ['chili_pepper', 'tomato', 'onion', 'garlic', 'lime'],
  'tomato salsa': ['tomato', 'onion', 'garlic', 'lime'],
  'olive': ['olive', 'salt'],
  'olives': ['olive', 'salt'],
  'olive oil': ['olive', 'olive_oil'],
  'tomato': ['tomato'],
  'fresh tomatoes': ['tomato'],
  'sun-dried tomato': ['tomato', 'salt', 'olive_oil'],
  'sun-dried tomatoes': ['tomato', 'salt', 'olive_oil'],
  'wasabi': ['horseradish'],
  'date palm': ['date'],
  'coconut cracker': ['coconut', 'wheat_flour', 'sugar'],

  // ── Meat / poultry ──
  'chicken soup': ['chicken', 'carrot', 'onion', 'celery', 'salt'],
  'grilled chicken': ['chicken', 'salt', 'olive_oil'],
  'steamed chicken': ['chicken', 'ginger', 'scallion'],
  'roasted chicken': ['chicken', 'butter', 'garlic', 'salt'],
  'fried chicken': ['chicken', 'wheat_flour', 'egg', 'salt'],
  'korean fried chicken': ['chicken', 'wheat_flour', 'garlic', 'soy_sauce', 'chili_pepper', 'sugar'],
  'nashville spicy chicken': ['chicken', 'wheat_flour', 'chili_pepper', 'butter'],
  'buffalo wings': ['chicken', 'butter', 'chili_pepper', 'vinegar'],
  'bbq wings': ['chicken', 'tomato', 'sugar', 'vinegar'],
  'ghost pepper wings': ['chicken', 'chili_pepper', 'butter'],
  'tandoori chicken': ['chicken', 'yogurt', 'garlic', 'ginger', 'chili_pepper'],
  'butter chicken': ['chicken', 'butter', 'cream', 'tomato', 'onion', 'garlic', 'ginger'],
  'korma': ['chicken', 'onion', 'garlic', 'cream', 'almond', 'yogurt'],
  'vindaloo': ['pork', 'chili_pepper', 'garlic', 'vinegar', 'onion'],
  'roast turkey': ['turkey', 'butter', 'salt'],
  'turkey breast': ['turkey', 'salt'],
  'beef stew': ['beef', 'onion', 'carrot', 'potato', 'celery', 'salt'],
  'bacon': ['pork', 'bacon', 'salt'],
  'prosciutto': ['pork', 'prosciutto', 'salt'],

  // ── Fish & seafood ──
  'fresh salmon': ['salmon', 'fish_generic'],
  'smoked salmon': ['salmon', 'fish_generic', 'salt'],
  'fresh tuna': ['tuna', 'fish_generic'],
  'spicy tuna roll': ['tuna', 'fish_generic', 'rice', 'seaweed', 'chili_pepper'],
  'california roll': ['crab', 'rice', 'seaweed', 'cucumber'],
  'grilled fish': ['fish_generic', 'salt', 'olive_oil'],
  'grilled white fish': ['fish_generic', 'salt', 'olive_oil'],
  'anchovies': ['anchovy', 'fish_generic', 'salt'],
  'anchovy': ['anchovy', 'fish_generic', 'salt'],
  'fish sauce': ['fish_sauce', 'fish_generic', 'anchovy', 'salt'],
  'pollock roe (mentaiko)': ['pollock_roe', 'fish_generic', 'chili_pepper', 'salt'],
  'pollock roe': ['pollock_roe', 'fish_generic', 'salt'],
  'mentaiko': ['pollock_roe', 'fish_generic', 'chili_pepper', 'salt'],
  'mentaiko pasta': ['pollock_roe', 'fish_generic', 'pasta', 'wheat_flour', 'butter', 'seaweed'],

  // ── Pasta / noodles / rice ──
  'marinara pasta': ['pasta', 'wheat_flour', 'tomato', 'garlic', 'basil', 'olive_oil'],
  'aglio e olio': ['pasta', 'wheat_flour', 'garlic', 'olive', 'olive_oil', 'chili_pepper'],
  'alfredo pasta': ['pasta', 'wheat_flour', 'cream', 'butter', 'parmesan', 'cheese', 'garlic'],
  'anchovy pasta': ['pasta', 'wheat_flour', 'anchovy', 'fish_generic', 'garlic', 'olive', 'olive_oil'],
  'mushroom cream pasta': ['pasta', 'wheat_flour', 'mushroom', 'cream', 'butter', 'garlic', 'parmesan', 'cheese'],
  'carbonara': ['pasta', 'wheat_flour', 'pork', 'bacon', 'egg', 'parmesan', 'cheese'],
  'classic carbonara with pork': ['pasta', 'wheat_flour', 'pork', 'bacon', 'egg', 'parmesan', 'cheese'],
  'pad thai': ['noodles', 'rice', 'egg', 'peanut', 'fish_sauce', 'lime', 'onion', 'garlic', 'sugar'],
  'lo mein': ['noodles', 'wheat_flour', 'soy_sauce', 'garlic', 'scallion', 'sesame'],
  'sichuan noodle': ['noodles', 'wheat_flour', 'szechuan_pepper', 'chili_pepper', 'garlic', 'soy_sauce', 'sesame'],
  'spicy ramen': ['noodles', 'wheat_flour', 'chili_pepper', 'garlic', 'soy_sauce', 'scallion', 'egg'],
  'buldak hot chicken ramen': ['chicken', 'noodles', 'wheat_flour', 'chili_pepper', 'garlic', 'soy_sauce', 'sugar'],
  'tonkotsu ramen': ['noodles', 'wheat_flour', 'pork', 'garlic', 'scallion', 'egg', 'soy_sauce'],
  'plain rice': ['rice'],
  'rice cakes': ['rice'],
  'thai green curry': ['coconut', 'chili_pepper', 'lemongrass', 'garlic', 'ginger', 'fish_sauce', 'basil'],

  // ── Bread & baked goods ──
  'plain bread': ['bread', 'wheat_flour', 'yeast', 'salt'],
  'white bread': ['bread', 'wheat_flour', 'yeast', 'sugar', 'salt'],
  'sourdough bread': ['bread', 'wheat_flour', 'yeast', 'salt'],
  'baguette': ['bread', 'wheat_flour', 'yeast', 'salt'],
  'bagel': ['bread', 'wheat_flour', 'yeast', 'salt'],
  'breadsticks': ['bread', 'wheat_flour', 'yeast', 'olive_oil', 'salt'],
  'garlic butter bread': ['bread', 'wheat_flour', 'butter', 'garlic', 'salt'],
  'plain crackers': ['wheat_flour', 'salt'],
  'salted pretzels': ['wheat_flour', 'yeast', 'salt', 'butter'],
  'salted chips': ['potato', 'salt'],
  'croissant': ['wheat_flour', 'butter', 'yeast', 'milk', 'sugar'],
  'plain croissant': ['wheat_flour', 'butter', 'yeast', 'milk'],
  'danish pastry': ['wheat_flour', 'butter', 'egg', 'sugar', 'milk'],
  'muffin': ['wheat_flour', 'egg', 'butter', 'sugar', 'milk'],
  'pancakes': ['wheat_flour', 'egg', 'milk', 'butter', 'sugar'],
  'biscotti': ['wheat_flour', 'egg', 'sugar', 'almond'],
  'oat cookie': ['oat', 'wheat_flour', 'butter', 'sugar', 'egg'],
  'chocolate cookie': ['wheat_flour', 'chocolate', 'cocoa', 'butter', 'sugar', 'egg'],
  'baklava': ['wheat_flour', 'pistachio', 'walnut', 'butter', 'honey', 'sugar'],
  'french macaron': ['almond', 'egg', 'sugar', 'butter'],
  'glazed donut': ['wheat_flour', 'yeast', 'sugar', 'egg', 'milk'],
  'cupcake': ['wheat_flour', 'egg', 'butter', 'sugar', 'milk'],
  'banana bread': ['banana', 'wheat_flour', 'egg', 'sugar', 'butter', 'walnut'],
  'carrot cake': ['carrot', 'wheat_flour', 'egg', 'sugar', 'cream_cheese', 'walnut', 'raisin'],
  'chocolate cake': ['wheat_flour', 'cocoa', 'chocolate', 'egg', 'sugar', 'butter', 'milk'],
  'cheesecake': ['cream_cheese', 'cheese', 'egg', 'sugar', 'butter', 'wheat_flour'],
  'tiramisu': ['mascarpone', 'cheese', 'egg', 'sugar', 'espresso', 'coffee', 'cocoa', 'wheat_flour', 'alcohol'],
  'mont blanc': ['chestnut_puree', 'cream', 'sugar', 'wheat_flour', 'butter'],
  'crème brûlée': ['cream', 'egg', 'sugar', 'vanilla'],
  'chocolate mousse': ['chocolate', 'cocoa', 'cream', 'egg', 'sugar'],

  // ── Sweets ──
  'milk chocolate': ['chocolate', 'cocoa', 'milk', 'sugar'],
  'white chocolate': ['cocoa', 'milk', 'sugar', 'vanilla'],
  'dark chocolate (70%)': ['chocolate', 'cocoa', 'sugar'],
  '70% dark chocolate': ['chocolate', 'cocoa', 'sugar'],
  'dark chocolate (85%)': ['chocolate', 'cocoa', 'sugar'],
  '85% cacao': ['chocolate', 'cocoa', 'sugar'],
  '90% cacao': ['chocolate', 'cocoa'],
  'caramel': ['sugar', 'cream', 'butter'],
  'salted caramel': ['sugar', 'cream', 'butter', 'salt'],
  'brownie': ['wheat_flour', 'chocolate', 'cocoa', 'butter', 'sugar', 'egg'],
  'fudge': ['chocolate', 'sugar', 'butter', 'milk', 'cream'],
  'cotton candy': ['sugar'],
  'honey': ['honey'],
  'ice cream': ['milk', 'cream', 'sugar', 'egg', 'vanilla'],
  'sweet gummy bears': ['sugar', 'gelatin'],
  'sour gummy worms': ['sugar', 'gelatin', 'vinegar'],

  // ── Dairy & eggs ──
  'butter': ['butter', 'milk'],
  'garlic butter': ['butter', 'milk', 'garlic'],
  'seaweed butter': ['butter', 'milk', 'seaweed'],
  'truffle butter': ['butter', 'milk', 'truffle'],
  'greek yogurt': ['yogurt', 'milk'],
  'plain yogurt': ['yogurt', 'milk'],
  'natural yogurt': ['yogurt', 'milk'],
  'fruit flavored yogurt': ['yogurt', 'milk', 'sugar', 'strawberry'],
  'popcorn': ['corn', 'salt'],
  'caramel popcorn': ['corn', 'sugar', 'butter', 'salt'],
  'cream cheese': ['cream_cheese', 'cheese', 'milk'],
  'ricotta': ['ricotta', 'cheese', 'milk'],
  'mozzarella': ['mozzarella', 'cheese', 'milk'],
  'mozzarella sticks': ['mozzarella', 'cheese', 'milk', 'wheat_flour', 'egg'],
  'parmesan': ['parmesan', 'cheese', 'milk'],
  'parmesan cheese': ['parmesan', 'cheese', 'milk'],
  'aged cheddar': ['cheddar', 'cheese', 'milk'],
  'feta cheese': ['feta', 'cheese', 'milk', 'salt'],
  'poached egg': ['egg'],
  'poached eggs': ['egg'],
  'scrambled egg': ['egg', 'butter', 'milk'],
  'eggs benedict (creamy hollandaise sauce)': ['egg', 'butter', 'lemon', 'bread', 'wheat_flour'],

  // ── Umami pantry ──
  'dashi': ['dashi', 'fish_generic', 'katsuobushi', 'seaweed'],
  'katsuobushi': ['katsuobushi', 'fish_generic'],
  'natto': ['natto', 'soybean'],
  'porcini mushrooms': ['porcini', 'mushroom'],
  'button mushrooms': ['mushroom'],
  'shiitake mushrooms': ['shiitake', 'mushroom'],
  'shiitake miso': ['shiitake', 'mushroom', 'miso', 'soybean', 'salt'],
  'plain miso': ['miso', 'soybean', 'salt'],
  'miso soup': ['miso', 'soybean', 'dashi', 'fish_generic', 'seaweed', 'scallion'],
  'truffle oil': ['truffle', 'olive', 'olive_oil'],
  'soy sauce': ['soy_sauce', 'soybean', 'wheat_flour', 'salt'],
  'teriyaki sauce': ['soy_sauce', 'soybean', 'sugar', 'ginger', 'garlic', 'alcohol'],
  'marmite': ['yeast_extract', 'yeast', 'salt'],
  'mustard': ['mustard', 'vinegar', 'salt'],
  'balsamic vinegar': ['vinegar', 'grape'],
  'rice vinegar': ['vinegar', 'rice'],

  // ── Drinks ──
  'espresso': ['espresso', 'coffee'],
  'black coffee': ['coffee'],
  'americano': ['coffee', 'espresso'],
  'latte': ['coffee', 'espresso', 'milk'],
  'black tea': ['tea'],
  'green tea': ['tea', 'green_tea'],
  'chamomile tea': ['tea', 'chamomile'],
  'kombucha': ['tea', 'sugar', 'yeast'],
  'ipa beer': ['alcohol', 'barley', 'yeast', 'wheat_flour'],
  'lager beer': ['alcohol', 'barley', 'yeast', 'wheat_flour'],
  'sparkling water': [],
};

// Ensure every food that contains a specific cheese also maps to the generic
// "cheese" ingredient, so blocking generic cheese hides all cheese dishes.
const SPECIFIC_CHEESE_SLUGS = new Set([
  'cream_cheese',
  'mascarpone',
  'ricotta',
  'mozzarella',
  'parmesan',
  'cheddar',
  'feta',
]);
for (const ingredients of Object.values(foodIngredientMap)) {
  if (
    ingredients.some(i => SPECIFIC_CHEESE_SLUGS.has(i)) &&
    !ingredients.includes('cheese')
  ) {
    ingredients.push('cheese');
  }
}

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
  const blockedSet = new Set(blocked);
  if (ingredients.length > 0 && ingredients.some(i => blockedSet.has(i))) return true;

  // Custom (user-typed) ingredients are not in the catalog: fall back to
  // matching the typed word against the food name itself.
  const catalogSlugs = new Set(ingredientCatalog.map(i => i.slug));
  const lowerName = foodName.toLowerCase();
  return blocked.some(slug => {
    if (catalogSlugs.has(slug)) return false;
    const term = slug.replace(/_/g, ' ').trim();
    return term.length > 1 && lowerName.includes(term);
  });
}

/**
 * True when a dish contains no animal-derived ingredient
 * (dairy, egg, meat, fish/seafood, honey).
 */
export function isVeganSafeFood(foodName: string): boolean {
  return !foodContainsBlockedIngredient(foodName, defaultAvoidancesForStyle('vegan'));
}


/**
 * Default blocked ingredients preselected for an eating style.
 * - vegan: dairy & egg, meat, fish, seafood, honey
 * - vegetarian: meat, fish, seafood
 * - pescatarian: meat & poultry
 * - all-good: nothing
 */
export function defaultAvoidancesForStyle(
  style: 'all-good' | 'vegetarian' | 'vegan' | 'pescatarian'
): string[] {
  const byCat = (cat: IngredientCategory) =>
    ingredientCatalog.filter(i => i.category === cat).map(i => i.slug);
  switch (style) {
    case 'vegan':
      return [
        ...byCat('dairy'),
        ...byCat('meat'),
        ...byCat('fish_seafood'),
        'honey',
      ];
    case 'vegetarian':
      return [...byCat('meat'), ...byCat('fish_seafood')];
    case 'pescatarian':
      return byCat('meat');
    default:
      return [];
  }
}

/** Turns free text into a stable slug for a custom ingredient. */
export function toIngredientSlug(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, '_');
}

/** Human-readable label for any slug, catalog or custom. */
export function ingredientLabel(slug: string): string {
  const found = ingredientCatalog.find(i => i.slug === slug);
  if (found) return found.label;
  return slug
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}
