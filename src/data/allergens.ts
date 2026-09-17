export type EatingStyle = 'all-good' | 'vegetarian' | 'vegan' | 'pescatarian';

export type Allergen = 
  | 'dairy' 
  | 'gluten' 
  | 'tree_nuts' 
  | 'peanuts'
  | 'eggs' 
  | 'shellfish' 
  | 'fish' 
  | 'soy' 
  | 'fruits'
  | 'seeds'
  | 'meat';

export const allergenInfo: { value: Allergen; label: string; emoji: string; hasCustomInput?: boolean }[] = [
  { value: 'dairy', label: 'Dairy', emoji: '🥛' },
  { value: 'gluten', label: 'Gluten', emoji: '🌾' },
  { value: 'tree_nuts', label: 'Tree Nuts', emoji: '🌰', hasCustomInput: true },
  { value: 'peanuts', label: 'Peanuts', emoji: '🥜' },
  { value: 'eggs', label: 'Eggs', emoji: '🥚' },
  { value: 'shellfish', label: 'Shellfish', emoji: '🦐' },
  { value: 'fish', label: 'Fish', emoji: '🐟' },
  { value: 'soy', label: 'Soy', emoji: '🫘' },
  { value: 'fruits', label: 'Fruits', emoji: '🍎', hasCustomInput: true },
  { value: 'seeds', label: 'Seeds', emoji: '🌻', hasCustomInput: true },
  { value: 'meat', label: 'Meat / Poultry', emoji: '🥩' },
];

// Maps food names (lowercase) to their allergens
const allergenMap: Record<string, Allergen[]> = {
  // DAIRY
  'white chocolate': ['dairy'],
  'milk chocolate': ['dairy'],
  'caramel': ['dairy'],
  'cheesecake': ['dairy', 'gluten', 'eggs'],
  'banana bread': ['dairy', 'gluten', 'eggs', 'tree_nuts'],
  'chocolate cake': ['dairy', 'gluten', 'eggs'],
  'carrot cake': ['dairy', 'gluten', 'eggs'],
  'french macaron': ['dairy', 'eggs', 'tree_nuts'],
  'crème brûlée': ['dairy', 'eggs'],
  'tiramisu': ['dairy', 'eggs', 'gluten'],
  'mont blanc': ['dairy', 'tree_nuts'],
  'glazed donut': ['dairy', 'gluten', 'eggs'],
  'cupcake': ['dairy', 'gluten', 'eggs'],
  'muffin': ['dairy', 'gluten', 'eggs'],
  'pancakes': ['dairy', 'gluten', 'eggs'],
  'chocolate cookie': ['dairy', 'gluten', 'eggs'],
  'oat cookie': ['dairy', 'gluten', 'eggs'],
  'biscotti': ['gluten', 'eggs', 'tree_nuts'],
  'chocolate mousse': ['dairy', 'eggs'],
  'ice cream': ['dairy', 'eggs'],
  'latte': ['dairy'],
  'parmesan': ['dairy'],
  'mozzarella': ['dairy'],
  'feta cheese': ['dairy'],
  'ricotta': ['dairy'],
  'alfredo pasta': ['dairy', 'gluten'],
  'marinara pasta': ['gluten'],
  'croissant': ['dairy', 'gluten', 'eggs'],
  'plain croissant': ['dairy', 'gluten', 'eggs'],
  'butter chicken': ['dairy', 'meat'],
  'garlic butter bread': ['dairy', 'gluten'],
  'eggs benedict (creamy hollandaise sauce)': ['dairy', 'eggs', 'gluten'],
  'poached eggs': ['eggs'],
  'mashed potatoes': ['dairy'],
  'carbonara': ['dairy', 'eggs', 'gluten', 'meat'],
  'movie popcorn': ['dairy'],
  'danish pastry': ['dairy', 'gluten', 'eggs'],
  'mozzarella sticks': ['dairy', 'gluten'],
  'jalapeño poppers': ['dairy', 'gluten'],
  'cream cheese': ['dairy'],
  'vanilla pudding': ['dairy', 'eggs'],
  'greek yogurt': ['dairy'],
  'chicken soup': ['eggs', 'meat'],
  'mushroom soup': ['dairy'],

  // GLUTEN
  'bagel': ['gluten'],
  'sourdough bread': ['gluten'],
  'white bread': ['gluten'],
  'plain bread': ['gluten'],
  'baguette': ['gluten'],
  'breadsticks': ['gluten'],
  'salted pretzels': ['gluten'],
  'plain crackers': ['gluten'],
  'coconut cracker': ['gluten', 'tree_nuts'],
  'date palm (medjool date)': ['fruits'],
  'lo mein': ['gluten', 'soy'],
  'sichuan noodle': ['gluten', 'soy'],
  'spicy ramen': ['gluten', 'eggs', 'soy'],
  'tonkotsu ramen': ['gluten', 'eggs', 'soy'],

  // NUTS
  'baklava': ['tree_nuts', 'gluten'],
  'peanut butter': ['peanuts'],

  // EGGS
  // (most baked goods already listed above)

  // FISH / SHELLFISH
  'anchovies': ['fish'],
  'fresh salmon': ['fish'],
  'smoked salmon': ['fish'],
  'fresh tuna': ['fish'],
  'grilled fish': ['fish'],
  'lime ceviche': ['fish'],
  'spicy tuna roll': ['fish', 'soy', 'gluten'],
  'california roll': ['shellfish', 'gluten', 'soy'],

  // SOY
  'soy sauce': ['soy'],
  'teriyaki sauce': ['soy', 'gluten'],
  'miso soup': ['soy'],
  'sour gummy worms': [],
  'sweet gummy bears': [],

  // FRUITS
  'green apple': ['fruits'],
  'red apple': ['fruits'],
  'orange': ['fruits'],
  'mango': ['fruits'],
  'passion fruit': ['fruits'],
  'grapefruit': ['fruits'],
  'fresh lemon': ['fruits'],
  
  // Spicy items with allergens
  'ghost pepper wings': ['gluten', 'meat'],
  'bbq wings': ['gluten', 'meat'],
  'nashville spicy chicken': ['gluten', 'eggs', 'meat'],
  'fried chicken': ['gluten', 'eggs', 'meat'],
  'vindaloo': ['dairy', 'meat'],
  'korma': ['dairy', 'tree_nuts', 'meat'],
  'coconut curry': ['tree_nuts'],
  'thai green curry': ['fish'],

  // MEAT / POULTRY
  'steak': ['meat'],
};

/**
 * Get allergens for a food item by name (case-insensitive match)
 */
export function getFoodAllergens(foodName: string): Allergen[] {
  return allergenMap[foodName.toLowerCase()] || [];
}

/**
 * When the user selected 'vegan', any option flagged with vegan: true is
 * treated as a "vegan version" of that dish. Such items are always shown,
 * overriding other dietary exclusions (blocked ingredients, dietary tags).
 */
export function hasVeganOverride(
  optionAVegan: boolean | undefined,
  optionBVegan: boolean | undefined,
  eatingStyles: EatingStyle[]
): boolean {
  return eatingStyles.includes('vegan') && !!(optionAVegan || optionBVegan);
}

/**
 * Check if a quiz item should be filtered out based on user's eating style.
 * For vegetarian/vegan/pescatarian: uses the dietary tag on the item.
 */
export function shouldFilterByDiet(
  itemDietary: string[],
  optionAName: string,
  optionBName: string,
  eatingStyles: EatingStyle[]
): boolean {
  if (eatingStyles.length === 0 || eatingStyles.includes('all-good')) return false;

  for (const style of eatingStyles) {
    if (style === 'all-good') continue;

    // vegetarian, vegan, pescatarian: use dietary tag
    if (!itemDietary.includes(style)) return true;
  }

  return false;
}

/**
 * Check if a quiz item should be filtered out based on user's allergies.
 * Filters if EITHER option contains an allergen the user is allergic to.
 */
export function shouldFilterItem(
  optionAName: string,
  optionBName: string,
  userAllergies: Allergen[]
): boolean {
  if (userAllergies.length === 0) return false;
  
  const allergySet = new Set(userAllergies);
  const aAllergens = getFoodAllergens(optionAName);
  const bAllergens = getFoodAllergens(optionBName);
  
  const aHasAllergen = aAllergens.some(a => allergySet.has(a));
  const bHasAllergen = bAllergens.some(a => allergySet.has(a));
  
  return aHasAllergen || bHasAllergen;
}
