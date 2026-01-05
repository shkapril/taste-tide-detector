export interface QuizItem {
  id: string;
  name: string;
  description: string;
  image: string;
  sweetnessLevel: number; // 1-10 scale
  category: 'chocolate' | 'dessert' | 'drink' | 'pastry' | 'candy';
}

export const quizItems: QuizItem[] = [
  {
    id: '1',
    name: 'Dark Chocolate (85%)',
    description: 'Intense, bitter cocoa with minimal sweetness',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop',
    sweetnessLevel: 2,
    category: 'chocolate',
  },
  {
    id: '2',
    name: 'Belgian White Chocolate',
    description: 'Creamy, rich, and intensely sweet',
    image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=600&h=600&fit=crop',
    sweetnessLevel: 9,
    category: 'chocolate',
  },
  {
    id: '3',
    name: 'Japanese Matcha Latte',
    description: 'Earthy green tea with subtle sweetness',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&h=600&fit=crop',
    sweetnessLevel: 4,
    category: 'drink',
  },
  {
    id: '4',
    name: 'New York Cheesecake',
    description: 'Dense, creamy with a tangy undertone',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&h=600&fit=crop',
    sweetnessLevel: 6,
    category: 'dessert',
  },
  {
    id: '5',
    name: 'French Macaron',
    description: 'Delicate almond meringue with sweet filling',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&h=600&fit=crop',
    sweetnessLevel: 8,
    category: 'pastry',
  },
  {
    id: '6',
    name: 'Tiramisu',
    description: 'Coffee-soaked layers with mascarpone cream',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=600&fit=crop',
    sweetnessLevel: 5,
    category: 'dessert',
  },
  {
    id: '7',
    name: 'Milk Chocolate Bar',
    description: 'Classic creamy chocolate with balanced sweetness',
    image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=600&h=600&fit=crop',
    sweetnessLevel: 7,
    category: 'chocolate',
  },
  {
    id: '8',
    name: 'Espresso',
    description: 'Pure, intense coffee with no added sugar',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&h=600&fit=crop',
    sweetnessLevel: 1,
    category: 'drink',
  },
  {
    id: '9',
    name: 'Crème Brûlée',
    description: 'Caramelized sugar crust over vanilla custard',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&h=600&fit=crop',
    sweetnessLevel: 7,
    category: 'dessert',
  },
  {
    id: '10',
    name: 'Salted Caramel',
    description: 'Sweet and salty balance with buttery notes',
    image: 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=600&h=600&fit=crop',
    sweetnessLevel: 6,
    category: 'candy',
  },
  {
    id: '11',
    name: 'Greek Yogurt with Honey',
    description: 'Tangy yogurt drizzled with natural honey',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=600&fit=crop',
    sweetnessLevel: 4,
    category: 'dessert',
  },
  {
    id: '12',
    name: 'Cotton Candy',
    description: 'Pure spun sugar, maximum sweetness',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
    sweetnessLevel: 10,
    category: 'candy',
  },
];

export interface TasteProfile {
  level: number;
  label: string;
  description: string;
  emoji: string;
  percentile: number;
}

export const getTasteProfile = (averageSweet: number): TasteProfile => {
  if (averageSweet <= 2) {
    return {
      level: averageSweet,
      label: 'Bitter Lover',
      description: 'You appreciate the complexity of bitter flavors. Dark chocolate and espresso are your friends!',
      emoji: '🍫',
      percentile: 15,
    };
  } else if (averageSweet <= 4) {
    return {
      level: averageSweet,
      label: 'Subtle Sweet',
      description: 'You prefer delicate, understated sweetness. Quality over intensity is your motto.',
      emoji: '🍵',
      percentile: 25,
    };
  } else if (averageSweet <= 6) {
    return {
      level: averageSweet,
      label: 'Balanced Palate',
      description: 'You enjoy the perfect harmony of flavors. Not too sweet, not too bitter - just right!',
      emoji: '⚖️',
      percentile: 45,
    };
  } else if (averageSweet <= 8) {
    return {
      level: averageSweet,
      label: 'Sweet Enthusiast',
      description: 'You embrace sweetness with open arms. Desserts are your happy place!',
      emoji: '🧁',
      percentile: 75,
    };
  } else {
    return {
      level: averageSweet,
      label: 'Sugar Maximalist',
      description: 'Go big or go home! You love intense sweetness and aren\'t afraid to show it.',
      emoji: '🍭',
      percentile: 95,
    };
  }
};
