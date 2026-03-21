import { QuizType } from './quizData';

export interface TasteCharacter {
  name: string;
  emoji: string;
  description: string;
  /** Optional character illustration */
  image?: string;
  /** Ideal score profile on 0-10 scale for each taste dimension */
  idealScores: Partial<Record<QuizType, number>>;
}

export const tasteCharacters: TasteCharacter[] = [
  {
    name: 'India',
    emoji: '🇮🇳',
    description: 'Bold spice meets deep richness — your palate craves fiery, indulgent flavors.',
    image: '/src/assets/characters/india.png',
    idealScores: { sweet: 3, sour: 1, rich: 7, bitter: 1, salty: 4, spicy: 9 },
  },
  {
    name: 'Korea',
    emoji: '🇰🇷',
    description: 'Spicy and savory with sweet-sour balance — fermented, bold, and layered.',
    idealScores: { sweet: 4, sour: 5, rich: 6, bitter: 1, salty: 5, spicy: 8 },
  },
  {
    name: 'Indonesia',
    emoji: '🇮🇩',
    description: 'A triple threat of spice, richness, and umami — complex and aromatic.',
    idealScores: { sweet: 3, sour: 2, rich: 7, bitter: 1, salty: 4, spicy: 8 },
  },
  {
    name: 'Thailand',
    emoji: '🇹🇭',
    description: 'Fiery spice meets sharp sourness with herbal undertones — fresh and electrifying.',
    idealScores: { sweet: 2, sour: 7, rich: 5, bitter: 1, salty: 4, spicy: 9 },
  },
  {
    name: 'Mexico',
    emoji: '🇲🇽',
    description: 'Warm spice, deep umami, and tangy notes — earthy and vibrant.',
    idealScores: { sweet: 3, sour: 4, rich: 6, bitter: 1, salty: 5, spicy: 7 },
  },
  {
    name: 'Japan',
    emoji: '🇯🇵',
    description: 'Delicate sweetness, masterful umami, and subtle balance — refined and precise.',
    idealScores: { sweet: 5, sour: 2, rich: 4, bitter: 1, salty: 3, spicy: 1 },
  },
  {
    name: 'United States',
    emoji: '🇺🇸',
    description: 'Sweet, rich, and salty — go big or go home with bold, indulgent flavors.',
    idealScores: { sweet: 8, sour: 2, rich: 7, bitter: 1, salty: 6, spicy: 2 },
  },
  {
    name: 'Vietnam',
    emoji: '🇻🇳',
    description: 'Bright sourness, clean umami, and light freshness — spicy, light, and vibrant.',
    image: '/src/assets/characters/vietnam.png',
    idealScores: { sweet: 3, sour: 6, rich: 4, bitter: 1, salty: 3, spicy: 2 },
  },
  {
    name: 'Greece',
    emoji: '🇬🇷',
    description: 'Rich and gently tangy — Mediterranean warmth in every bite.',
    idealScores: { sweet: 3, sour: 4, rich: 6, bitter: 1, salty: 4, spicy: 1 },
  },
  {
    name: 'France',
    emoji: '🇫🇷',
    description: 'Luxurious richness and deep umami with no need for heat — elegant and savory.',
    image: '/src/assets/characters/france.png',
    idealScores: { sweet: 4, sour: 3, rich: 8, bitter: 1, salty: 4, spicy: 1 },
  },
  {
    name: 'Italy',
    emoji: '🇮🇹',
    description: 'A symphony of all flavors — rich, savory, with bitter and sour accents.',
    idealScores: { sweet: 3, sour: 3, rich: 7, bitter: 2, salty: 4, spicy: 1 },
  },
  {
    name: 'Spain',
    emoji: '🇪🇸',
    description: 'Sky-high umami with moderate richness — bold savory with subtle complexity.',
    idealScores: { sweet: 3, sour: 2, rich: 6, bitter: 1, salty: 4, spicy: 2 },
  },
  {
    name: 'Turkey',
    emoji: '🇹🇷',
    description: 'Savory warmth with gentle spice and earthy bitterness — welcoming and layered.',
    idealScores: { sweet: 3, sour: 2, rich: 6, bitter: 2, salty: 4, spicy: 0 },
  },
  {
    name: 'Peru',
    emoji: '🇵🇪',
    description: 'Bright, tangy, and slightly bitter — citrus-forward and refreshing.',
    idealScores: { sweet: 3, sour: 6, rich: 4, bitter: 2, salty: 3, spicy: 1 },
  },
  {
    name: 'China',
    emoji: '🇨🇳',
    description: 'Deep umami, balanced richness, and a touch of everything — harmonious complexity.',
    image: '/src/assets/characters/china.png',
    idealScores: { sweet: 3, sour: 3, rich: 7, bitter: 1, salty: 4, spicy: 3 },
  },
  {
    name: 'Belgium',
    emoji: '🇧🇪',
    description: 'The sweetest palate of all — chocolate, waffles, and pure sugar bliss.',
    idealScores: { sweet: 9, sour: 1, rich: 6, bitter: 1, salty: 3, spicy: 1 },
  },
];

const fallback: TasteCharacter = {
  name: 'The Newcomer',
  emoji: '✨',
  description: 'Your taste journey just begins — Start exploring!',
  idealScores: {},
};

/**
 * Find the closest matching country character using Euclidean distance
 * between the user's scores and each character's ideal profile.
 */
export const getCharacter = (scores: Partial<Record<QuizType, number>>): TasteCharacter => {
  const completedCount = Object.keys(scores).length;

  // Show newcomer until all 6 quizzes are done
  if (completedCount < 6) return fallback;

  let bestMatch = tasteCharacters[0];
  let bestDist = Infinity;

  for (const char of tasteCharacters) {
    let dist = 0;
    for (const key of Object.keys(char.idealScores) as QuizType[]) {
      const userVal = scores[key] ?? 5;
      const idealVal = char.idealScores[key] ?? 5;
      dist += (userVal - idealVal) ** 2;
    }
    if (dist < bestDist) {
      bestDist = dist;
      bestMatch = char;
    }
  }

  return bestMatch;
};
