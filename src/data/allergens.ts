export type Allergen = 
  | 'dairy' 
  | 'gluten' 
  | 'nuts' 
  | 'eggs' 
  | 'shellfish' 
  | 'fish' 
  | 'soy' 
  | 'fruits'
  | 'seeds';

export const allergenInfo: { value: Allergen; label: string; emoji: string; hasCustomInput?: boolean }[] = [
  { value: 'dairy', label: 'Dairy', emoji: '🥛' },
  { value: 'gluten', label: 'Gluten', emoji: '🌾' },
  { value: 'nuts', label: 'Nuts', emoji: '🥜', hasCustomInput: true },
  { value: 'eggs', label: 'Eggs', emoji: '🥚' },
  { value: 'shellfish', label: 'Shellfish', emoji: '🦐' },
  { value: 'fish', label: 'Fish', emoji: '🐟' },
  { value: 'soy', label: 'Soy', emoji: '🫘' },
  { value: 'fruits', label: 'Fruits', emoji: '🍎', hasCustomInput: true },
  { value: 'seeds', label: 'Seeds', emoji: '🌻', hasCustomInput: true },
];

// Maps food names (lowercase) to their allergens
const allergenMap: Record<string, Allergen[]> = {
  // DAIRY
  'white chocolate': ['dairy'],
  'milk chocolate': ['dairy'],
  'caramel': ['dairy'],
  'cheesecake': ['dairy', 'gluten', 'eggs'],
  'chocolate cake': ['dairy', 'gluten', 'eggs'],
  'carrot cake': ['dairy', 'gluten', 'eggs'],
  'french macaron': ['dairy', 'eggs', 'nuts'],
  'crème brûlée': ['dairy', 'eggs'],
  'tiramisu': ['dairy', 'eggs', 'gluten'],
  'mont blanc': ['dairy', 'nuts'],
  'glazed donut': ['dairy', 'gluten', 'eggs'],
  'cupcake': ['dairy', 'gluten', 'eggs'],
  'muffin': ['dairy', 'gluten', 'eggs'],
  'pancakes': ['dairy', 'gluten', 'eggs'],
  'chocolate cookie': ['dairy', 'gluten', 'eggs'],
  'oat cookie': ['dairy', 'gluten', 'eggs'],
  'biscotti': ['gluten', 'eggs', 'nuts'],
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
  'butter chicken': ['dairy'],
  'garlic butter bread': ['dairy', 'gluten'],
  'eggs benedict (creamy hollandaise sauce)': ['dairy', 'eggs', 'gluten'],
  'poached eggs': ['eggs'],
  'mashed potatoes': ['dairy'],
  'carbonara': ['dairy', 'eggs', 'gluten'],
  'movie popcorn': ['dairy'],
  'danish pastry': ['dairy', 'gluten', 'eggs'],
  'mozzarella sticks': ['dairy', 'gluten'],
  'jalapeño poppers': ['dairy', 'gluten'],
  'cream cheese': ['dairy'],
  'vanilla pudding': ['dairy', 'eggs'],
  'greek yogurt': ['dairy'],
  'chicken soup': ['eggs'],
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
  'lo mein': ['gluten', 'soy'],
  'szechuan noodles': ['gluten', 'soy'],
  'spicy ramen': ['gluten', 'eggs', 'soy'],
  'tonkotsu ramen': ['gluten', 'eggs', 'soy'],

  // NUTS
  'baklava': ['nuts', 'gluten'],
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
  
  // Spicy items with allergens
  'ghost pepper wings': ['gluten'],
  'bbq wings': ['gluten'],
  'nashville hot chicken': ['gluten', 'eggs'],
  'fried chicken': ['gluten', 'eggs'],
  'vindaloo': ['dairy'],
  'korma': ['dairy', 'nuts'],
  'coconut curry': ['nuts'],
  'thai green curry': ['fish'],
};

/**
 * Get allergens for a food item by name (case-insensitive match)
 */
export function getFoodAllergens(foodName: string): Allergen[] {
  return allergenMap[foodName.toLowerCase()] || [];
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
