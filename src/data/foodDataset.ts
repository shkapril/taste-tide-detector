/**
 * Food dataset for the Taste DNA quiz.
 * Each food has a 6D UX vector (displayed to user) and a 7D internal vector (used for Bayesian updates).
 * Values are on a 0–100 scale.
 */

export interface TasteVector6 {
  sweet: number;
  sour: number;
  rich: number;
  bitter: number;
  salty: number;
  spicy: number;
}

export interface TasteVector7 extends TasteVector6 {
  umami: number;
}

export type DietaryTag = 'vegan' | 'vegetarian' | 'pescatarian' | 'all';

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  uxVector: TasteVector6;
  internalVector: TasteVector7;
  dietary: DietaryTag;
}

export const UX_DIMENSIONS: (keyof TasteVector6)[] = ['sweet', 'sour', 'rich', 'bitter', 'salty', 'spicy'];
export const INTERNAL_DIMENSIONS: (keyof TasteVector7)[] = ['sweet', 'sour', 'rich', 'bitter', 'salty', 'spicy', 'umami'];

export const foodDataset: FoodItem[] = [
  // ─── SWEET-DOMINANT ───
  {
    id: 'macaron',
    name: 'French Macaron',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=400&fit=crop',
    uxVector: { sweet: 90, sour: 5, rich: 40, bitter: 0, salty: 5, spicy: 0 },
    internalVector: { sweet: 90, sour: 5, rich: 40, bitter: 0, salty: 5, spicy: 0, umami: 5 },
    dietary: 'vegetarian',
  },
  {
    id: 'dark_choc_70',
    name: 'Dark Chocolate 70%',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop',
    uxVector: { sweet: 40, sour: 5, rich: 30, bitter: 70, salty: 5, spicy: 0 },
    internalVector: { sweet: 40, sour: 5, rich: 30, bitter: 70, salty: 5, spicy: 0, umami: 20 },
    dietary: 'vegetarian',
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=400&fit=crop',
    uxVector: { sweet: 75, sour: 15, rich: 80, bitter: 0, salty: 10, spicy: 0 },
    internalVector: { sweet: 75, sour: 15, rich: 80, bitter: 0, salty: 10, spicy: 0, umami: 10 },
    dietary: 'vegetarian',
  },
  {
    id: 'honey',
    name: 'Raw Honey',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop',
    uxVector: { sweet: 95, sour: 5, rich: 20, bitter: 0, salty: 0, spicy: 0 },
    internalVector: { sweet: 95, sour: 5, rich: 20, bitter: 0, salty: 0, spicy: 0, umami: 5 },
    dietary: 'vegetarian',
  },
  {
    id: 'ice_cream',
    name: 'Vanilla Ice Cream',
    image: 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=400&h=400&fit=crop',
    uxVector: { sweet: 85, sour: 5, rich: 70, bitter: 0, salty: 5, spicy: 0 },
    internalVector: { sweet: 85, sour: 5, rich: 70, bitter: 0, salty: 5, spicy: 0, umami: 5 },
    dietary: 'vegetarian',
  },
  {
    id: 'baklava',
    name: 'Baklava',
    image: 'https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=400&h=400&fit=crop',
    uxVector: { sweet: 90, sour: 5, rich: 60, bitter: 0, salty: 10, spicy: 0 },
    internalVector: { sweet: 90, sour: 5, rich: 60, bitter: 0, salty: 10, spicy: 0, umami: 5 },
    dietary: 'vegetarian',
  },
  {
    id: 'tiramisu',
    name: 'Tiramisu',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop',
    uxVector: { sweet: 70, sour: 5, rich: 65, bitter: 30, salty: 5, spicy: 0 },
    internalVector: { sweet: 70, sour: 5, rich: 65, bitter: 30, salty: 5, spicy: 0, umami: 10 },
    dietary: 'vegetarian',
  },
  {
    id: 'cotton_candy',
    name: 'Cotton Candy',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop',
    uxVector: { sweet: 95, sour: 0, rich: 5, bitter: 0, salty: 0, spicy: 0 },
    internalVector: { sweet: 95, sour: 0, rich: 5, bitter: 0, salty: 0, spicy: 0, umami: 0 },
    dietary: 'vegan',
  },
  {
    id: 'danish_pastry',
    name: 'Danish Pastry',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&h=400&fit=crop',
    uxVector: { sweet: 65, sour: 5, rich: 70, bitter: 0, salty: 10, spicy: 0 },
    internalVector: { sweet: 65, sour: 5, rich: 70, bitter: 0, salty: 10, spicy: 0, umami: 5 },
    dietary: 'vegetarian',
  },
  {
    id: 'creme_brulee',
    name: 'Crème Brûlée',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=400&fit=crop',
    uxVector: { sweet: 80, sour: 5, rich: 75, bitter: 10, salty: 5, spicy: 0 },
    internalVector: { sweet: 80, sour: 5, rich: 75, bitter: 10, salty: 5, spicy: 0, umami: 10 },
    dietary: 'vegetarian',
  },

  // ─── SOUR-DOMINANT ───
  {
    id: 'lemon',
    name: 'Fresh Lemon',
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=400&fit=crop',
    uxVector: { sweet: 10, sour: 90, rich: 5, bitter: 10, salty: 0, spicy: 0 },
    internalVector: { sweet: 10, sour: 90, rich: 5, bitter: 10, salty: 0, spicy: 0, umami: 5 },
    dietary: 'vegan',
  },
  {
    id: 'pickles',
    name: 'Dill Pickles',
    image: 'https://images.unsplash.com/photo-1601170940943-82e8e6748228?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 75, rich: 5, bitter: 10, salty: 60, spicy: 5 },
    internalVector: { sweet: 5, sour: 75, rich: 5, bitter: 10, salty: 60, spicy: 5, umami: 20 },
    dietary: 'vegan',
  },
  {
    id: 'greek_yogurt',
    name: 'Greek Yogurt',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
    uxVector: { sweet: 15, sour: 60, rich: 30, bitter: 0, salty: 5, spicy: 0 },
    internalVector: { sweet: 15, sour: 60, rich: 30, bitter: 0, salty: 5, spicy: 0, umami: 10 },
    dietary: 'vegetarian',
  },
  {
    id: 'kimchi',
    name: 'Kimchi',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 50, rich: 10, bitter: 5, salty: 55, spicy: 70 },
    internalVector: { sweet: 5, sour: 50, rich: 10, bitter: 5, salty: 55, spicy: 70, umami: 60 },
    dietary: 'vegan',
  },
  {
    id: 'sour_gummy',
    name: 'Sour Gummy Worms',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=400&fit=crop',
    uxVector: { sweet: 70, sour: 80, rich: 5, bitter: 0, salty: 5, spicy: 0 },
    internalVector: { sweet: 70, sour: 80, rich: 5, bitter: 0, salty: 5, spicy: 0, umami: 0 },
    dietary: 'vegetarian',
  },
  {
    id: 'ceviche',
    name: 'Lime Ceviche',
    image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 70, rich: 15, bitter: 5, salty: 30, spicy: 20 },
    internalVector: { sweet: 5, sour: 70, rich: 15, bitter: 5, salty: 30, spicy: 20, umami: 45 },
    dietary: 'pescatarian',
  },
  {
    id: 'green_apple',
    name: 'Green Apple',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop',
    uxVector: { sweet: 30, sour: 65, rich: 5, bitter: 5, salty: 0, spicy: 0 },
    internalVector: { sweet: 30, sour: 65, rich: 5, bitter: 5, salty: 0, spicy: 0, umami: 5 },
    dietary: 'vegan',
  },
  {
    id: 'lemonade',
    name: 'Fresh Lemonade',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop',
    uxVector: { sweet: 55, sour: 60, rich: 5, bitter: 5, salty: 0, spicy: 0 },
    internalVector: { sweet: 55, sour: 60, rich: 5, bitter: 5, salty: 0, spicy: 0, umami: 0 },
    dietary: 'vegan',
  },

  // ─── BITTER-DOMINANT ───
  {
    id: 'espresso',
    name: 'Espresso',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 15, rich: 20, bitter: 85, salty: 0, spicy: 0 },
    internalVector: { sweet: 5, sour: 15, rich: 20, bitter: 85, salty: 0, spicy: 0, umami: 15 },
    dietary: 'vegan',
  },
  {
    id: 'ipa_beer',
    name: 'IPA Beer',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 10, rich: 15, bitter: 80, salty: 5, spicy: 0 },
    internalVector: { sweet: 5, sour: 10, rich: 15, bitter: 80, salty: 5, spicy: 0, umami: 10 },
    dietary: 'vegan',
  },
  {
    id: 'arugula',
    name: 'Arugula Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 5, rich: 5, bitter: 60, salty: 5, spicy: 15 },
    internalVector: { sweet: 5, sour: 5, rich: 5, bitter: 60, salty: 5, spicy: 15, umami: 10 },
    dietary: 'vegan',
  },
  {
    id: 'dark_choc_85',
    name: 'Dark Chocolate 85%',
    image: 'https://images.unsplash.com/photo-1553452118-621e1f860f43?w=400&h=400&fit=crop',
    uxVector: { sweet: 15, sour: 5, rich: 25, bitter: 85, salty: 5, spicy: 0 },
    internalVector: { sweet: 15, sour: 5, rich: 25, bitter: 85, salty: 5, spicy: 0, umami: 25 },
    dietary: 'vegan',
  },
  {
    id: 'matcha',
    name: 'Matcha Tea',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop',
    uxVector: { sweet: 10, sour: 5, rich: 15, bitter: 65, salty: 0, spicy: 0 },
    internalVector: { sweet: 10, sour: 5, rich: 15, bitter: 65, salty: 0, spicy: 0, umami: 30 },
    dietary: 'vegan',
  },
  {
    id: 'grapefruit',
    name: 'Grapefruit',
    image: 'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=400&h=400&fit=crop',
    uxVector: { sweet: 20, sour: 50, rich: 5, bitter: 55, salty: 0, spicy: 0 },
    internalVector: { sweet: 20, sour: 50, rich: 5, bitter: 55, salty: 0, spicy: 0, umami: 5 },
    dietary: 'vegan',
  },
  {
    id: 'brussels_sprouts',
    name: 'Roasted Brussels Sprouts',
    image: 'https://images.unsplash.com/photo-1438118907704-7718ee9a191a?w=400&h=400&fit=crop',
    uxVector: { sweet: 10, sour: 5, rich: 15, bitter: 50, salty: 10, spicy: 0 },
    internalVector: { sweet: 10, sour: 5, rich: 15, bitter: 50, salty: 10, spicy: 0, umami: 20 },
    dietary: 'vegan',
  },

  // ─── SALTY-DOMINANT ───
  {
    id: 'prosciutto',
    name: 'Prosciutto',
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 5, rich: 35, bitter: 0, salty: 80, spicy: 0 },
    internalVector: { sweet: 5, sour: 5, rich: 35, bitter: 0, salty: 80, spicy: 0, umami: 70 },
    dietary: 'all',
  },
  {
    id: 'salted_chips',
    name: 'Salted Chips',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 5, rich: 30, bitter: 0, salty: 85, spicy: 0 },
    internalVector: { sweet: 5, sour: 5, rich: 30, bitter: 0, salty: 85, spicy: 0, umami: 15 },
    dietary: 'vegan',
  },
  {
    id: 'anchovies',
    name: 'Anchovies',
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&h=400&fit=crop',
    uxVector: { sweet: 0, sour: 5, rich: 20, bitter: 10, salty: 85, spicy: 0 },
    internalVector: { sweet: 0, sour: 5, rich: 20, bitter: 10, salty: 85, spicy: 0, umami: 90 },
    dietary: 'pescatarian',
  },
  {
    id: 'miso_soup',
    name: 'Miso Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop',
    uxVector: { sweet: 10, sour: 5, rich: 25, bitter: 5, salty: 65, spicy: 0 },
    internalVector: { sweet: 10, sour: 5, rich: 25, bitter: 5, salty: 65, spicy: 0, umami: 85 },
    dietary: 'vegetarian',
  },
  {
    id: 'feta',
    name: 'Feta Cheese',
    image: 'https://images.unsplash.com/photo-1626957341926-98752fc2ba90?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 20, rich: 40, bitter: 5, salty: 70, spicy: 0 },
    internalVector: { sweet: 5, sour: 20, rich: 40, bitter: 5, salty: 70, spicy: 0, umami: 30 },
    dietary: 'vegetarian',
  },
  {
    id: 'olives',
    name: 'Kalamata Olives',
    image: 'https://images.unsplash.com/photo-1593030103066-0093718e7177?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 10, rich: 30, bitter: 30, salty: 65, spicy: 0 },
    internalVector: { sweet: 5, sour: 10, rich: 30, bitter: 30, salty: 65, spicy: 0, umami: 25 },
    dietary: 'vegan',
  },
  {
    id: 'soy_sauce',
    name: 'Soy Sauce',
    image: 'https://images.unsplash.com/photo-1594020293008-5f99f60bd4d8?w=400&h=400&fit=crop',
    uxVector: { sweet: 10, sour: 5, rich: 10, bitter: 10, salty: 85, spicy: 0 },
    internalVector: { sweet: 10, sour: 5, rich: 10, bitter: 10, salty: 85, spicy: 0, umami: 85 },
    dietary: 'vegan',
  },
  {
    id: 'parmesan',
    name: 'Parmesan',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 10, rich: 45, bitter: 5, salty: 70, spicy: 0 },
    internalVector: { sweet: 5, sour: 10, rich: 45, bitter: 5, salty: 70, spicy: 0, umami: 90 },
    dietary: 'vegetarian',
  },

  // ─── RICH-DOMINANT ───
  {
    id: 'croissant',
    name: 'Butter Croissant',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop',
    uxVector: { sweet: 25, sour: 5, rich: 85, bitter: 0, salty: 15, spicy: 0 },
    internalVector: { sweet: 25, sour: 5, rich: 85, bitter: 0, salty: 15, spicy: 0, umami: 10 },
    dietary: 'vegetarian',
  },
  {
    id: 'butter_chicken',
    name: 'Butter Chicken',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=400&fit=crop',
    uxVector: { sweet: 15, sour: 10, rich: 75, bitter: 5, salty: 35, spicy: 40 },
    internalVector: { sweet: 15, sour: 10, rich: 75, bitter: 5, salty: 35, spicy: 40, umami: 60 },
    dietary: 'all',
  },
  {
    id: 'alfredo',
    name: 'Fettuccine Alfredo',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=400&fit=crop',
    uxVector: { sweet: 10, sour: 5, rich: 85, bitter: 0, salty: 30, spicy: 0 },
    internalVector: { sweet: 10, sour: 5, rich: 85, bitter: 0, salty: 30, spicy: 0, umami: 25 },
    dietary: 'vegetarian',
  },
  {
    id: 'avocado',
    name: 'Avocado',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 5, rich: 65, bitter: 5, salty: 5, spicy: 0 },
    internalVector: { sweet: 5, sour: 5, rich: 65, bitter: 5, salty: 5, spicy: 0, umami: 15 },
    dietary: 'vegan',
  },
  {
    id: 'mac_cheese',
    name: 'Mac & Cheese',
    image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=400&h=400&fit=crop',
    uxVector: { sweet: 10, sour: 5, rich: 80, bitter: 0, salty: 45, spicy: 0 },
    internalVector: { sweet: 10, sour: 5, rich: 80, bitter: 0, salty: 45, spicy: 0, umami: 35 },
    dietary: 'vegetarian',
  },
  {
    id: 'carbonara',
    name: 'Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 5, rich: 80, bitter: 0, salty: 50, spicy: 0 },
    internalVector: { sweet: 5, sour: 5, rich: 80, bitter: 0, salty: 50, spicy: 0, umami: 65 },
    dietary: 'all',
  },
  {
    id: 'chocolate_mousse',
    name: 'Chocolate Mousse',
    image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&h=400&fit=crop',
    uxVector: { sweet: 75, sour: 5, rich: 70, bitter: 25, salty: 5, spicy: 0 },
    internalVector: { sweet: 75, sour: 5, rich: 70, bitter: 25, salty: 5, spicy: 0, umami: 10 },
    dietary: 'vegetarian',
  },

  // ─── SPICY-DOMINANT ───
  {
    id: 'ghost_pepper_wings',
    name: 'Ghost Pepper Wings',
    image: 'https://images.unsplash.com/photo-1608039829572-9b5e0e7e9f7a?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 5, rich: 25, bitter: 5, salty: 30, spicy: 95 },
    internalVector: { sweet: 5, sour: 5, rich: 25, bitter: 5, salty: 30, spicy: 95, umami: 40 },
    dietary: 'all',
  },
  {
    id: 'thai_green_curry',
    name: 'Thai Green Curry',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=400&fit=crop',
    uxVector: { sweet: 15, sour: 20, rich: 55, bitter: 5, salty: 30, spicy: 75 },
    internalVector: { sweet: 15, sour: 20, rich: 55, bitter: 5, salty: 30, spicy: 75, umami: 50 },
    dietary: 'all',
  },
  {
    id: 'wasabi',
    name: 'Wasabi',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=400&fit=crop',
    uxVector: { sweet: 0, sour: 5, rich: 5, bitter: 15, salty: 5, spicy: 90 },
    internalVector: { sweet: 0, sour: 5, rich: 5, bitter: 15, salty: 5, spicy: 90, umami: 10 },
    dietary: 'vegan',
  },
  {
    id: 'hot_sauce',
    name: 'Hot Sauce',
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 20, rich: 5, bitter: 5, salty: 25, spicy: 90 },
    internalVector: { sweet: 5, sour: 20, rich: 5, bitter: 5, salty: 25, spicy: 90, umami: 15 },
    dietary: 'vegan',
  },
  {
    id: 'jalapeno',
    name: 'Jalapeño',
    image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 5, rich: 5, bitter: 5, salty: 5, spicy: 70 },
    internalVector: { sweet: 5, sour: 5, rich: 5, bitter: 5, salty: 5, spicy: 70, umami: 5 },
    dietary: 'vegan',
  },
  {
    id: 'szechuan',
    name: 'Szechuan Pepper',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop',
    uxVector: { sweet: 0, sour: 5, rich: 10, bitter: 15, salty: 10, spicy: 85 },
    internalVector: { sweet: 0, sour: 5, rich: 10, bitter: 15, salty: 10, spicy: 85, umami: 20 },
    dietary: 'vegan',
  },
  {
    id: 'nashville_spicy',
    name: 'Nashville Spicy Chicken',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=400&fit=crop',
    uxVector: { sweet: 10, sour: 5, rich: 40, bitter: 5, salty: 35, spicy: 80 },
    internalVector: { sweet: 10, sour: 5, rich: 40, bitter: 5, salty: 35, spicy: 80, umami: 45 },
    dietary: 'all',
  },

  // ─── UMAMI-RICH (hidden dimension) ───
  {
    id: 'mushroom_risotto',
    name: 'Mushroom Risotto',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=400&fit=crop',
    uxVector: { sweet: 10, sour: 5, rich: 65, bitter: 5, salty: 30, spicy: 0 },
    internalVector: { sweet: 10, sour: 5, rich: 65, bitter: 5, salty: 30, spicy: 0, umami: 75 },
    dietary: 'vegetarian',
  },
  {
    id: 'seaweed',
    name: 'Nori Seaweed',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 5, rich: 10, bitter: 10, salty: 50, spicy: 0 },
    internalVector: { sweet: 5, sour: 5, rich: 10, bitter: 10, salty: 50, spicy: 0, umami: 80 },
    dietary: 'vegan',
  },
  {
    id: 'tomato_paste',
    name: 'Sun-Dried Tomatoes',
    image: 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=400&h=400&fit=crop',
    uxVector: { sweet: 20, sour: 35, rich: 15, bitter: 10, salty: 25, spicy: 0 },
    internalVector: { sweet: 20, sour: 35, rich: 15, bitter: 10, salty: 25, spicy: 0, umami: 70 },
    dietary: 'vegan',
  },
  {
    id: 'fish_sauce',
    name: 'Fish Sauce',
    image: 'https://images.unsplash.com/photo-1594020293008-5f99f60bd4d8?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 10, rich: 10, bitter: 5, salty: 80, spicy: 0 },
    internalVector: { sweet: 5, sour: 10, rich: 10, bitter: 5, salty: 80, spicy: 0, umami: 90 },
    dietary: 'pescatarian',
  },

  // ─── MULTI-DIMENSIONAL ───
  {
    id: 'pad_thai',
    name: 'Pad Thai',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=400&fit=crop',
    uxVector: { sweet: 30, sour: 25, rich: 30, bitter: 5, salty: 40, spicy: 35 },
    internalVector: { sweet: 30, sour: 25, rich: 30, bitter: 5, salty: 40, spicy: 35, umami: 55 },
    dietary: 'all',
  },
  {
    id: 'steak',
    name: 'Grilled Steak',
    image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 5, rich: 60, bitter: 5, salty: 35, spicy: 0 },
    internalVector: { sweet: 5, sour: 5, rich: 60, bitter: 5, salty: 35, spicy: 0, umami: 80 },
    dietary: 'all',
  },
  {
    id: 'salmon_sushi',
    name: 'Salmon Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=400&fit=crop',
    uxVector: { sweet: 10, sour: 15, rich: 40, bitter: 0, salty: 30, spicy: 10 },
    internalVector: { sweet: 10, sour: 15, rich: 40, bitter: 0, salty: 30, spicy: 10, umami: 70 },
    dietary: 'pescatarian',
  },
  {
    id: 'ramen',
    name: 'Tonkotsu Ramen',
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&h=400&fit=crop',
    uxVector: { sweet: 10, sour: 5, rich: 55, bitter: 5, salty: 50, spicy: 20 },
    internalVector: { sweet: 10, sour: 5, rich: 55, bitter: 5, salty: 50, spicy: 20, umami: 85 },
    dietary: 'all',
  },
  {
    id: 'pho',
    name: 'Pho',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 10, rich: 35, bitter: 5, salty: 30, spicy: 15 },
    internalVector: { sweet: 5, sour: 10, rich: 35, bitter: 5, salty: 30, spicy: 15, umami: 75 },
    dietary: 'all',
  },
  {
    id: 'mozzarella',
    name: 'Fresh Mozzarella',
    image: 'https://images.unsplash.com/photo-1625315714730-8a1cfe3f5915?w=400&h=400&fit=crop',
    uxVector: { sweet: 10, sour: 5, rich: 50, bitter: 0, salty: 25, spicy: 0 },
    internalVector: { sweet: 10, sour: 5, rich: 50, bitter: 0, salty: 25, spicy: 0, umami: 20 },
    dietary: 'vegetarian',
  },
  {
    id: 'bbq_wings',
    name: 'BBQ Wings',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b4bfb5?w=400&h=400&fit=crop',
    uxVector: { sweet: 30, sour: 10, rich: 35, bitter: 5, salty: 40, spicy: 15 },
    internalVector: { sweet: 30, sour: 10, rich: 35, bitter: 5, salty: 40, spicy: 15, umami: 50 },
    dietary: 'all',
  },
  {
    id: 'aglio_e_olio',
    name: 'Aglio e Olio',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 5, rich: 50, bitter: 5, salty: 25, spicy: 20 },
    internalVector: { sweet: 5, sour: 5, rich: 50, bitter: 5, salty: 25, spicy: 20, umami: 30 },
    dietary: 'vegan',
  },
  {
    id: 'vindaloo',
    name: 'Vindaloo Curry',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop',
    uxVector: { sweet: 5, sour: 15, rich: 50, bitter: 5, salty: 30, spicy: 85 },
    internalVector: { sweet: 5, sour: 15, rich: 50, bitter: 5, salty: 30, spicy: 85, umami: 55 },
    dietary: 'all',
  },
];
