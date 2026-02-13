import { QuizType } from './quizData';

export interface TasteCharacter {
  name: string;
  emoji: string;
  description: string;
  /** Ideal score profile on 0-10 scale for each taste dimension */
  idealScores: Partial<Record<QuizType, number>>;
}

export const tasteCharacters: TasteCharacter[] = [
  // 1. India – high spicy + high rich
  {
    name: 'India',
    emoji: '🇮🇳',
    description: 'Bold spice meets deep richness — your palate craves fiery, indulgent flavors.',
    idealScores: { spicy: 9, rich: 8, salty: 5, sweet: 3, sour: 3, bitter: 3 },
  },
  // 2. Korea – high spicy + high umami + sweet(4) + sour(4) + rich(2)
  {
    name: 'Korea',
    emoji: '🇰🇷',
    description: 'Spicy and savory with sweet-sour balance — fermented, bold, and layered.',
    idealScores: { spicy: 8, salty: 9, sweet: 4, sour: 4, rich: 2, bitter: 2 },
  },
  // 3. Indonesia – high spicy + high rich + high umami
  {
    name: 'Indonesia',
    emoji: '🇮🇩',
    description: 'A triple threat of spice, richness, and umami — complex and aromatic.',
    idealScores: { spicy: 9, rich: 8, salty: 8, sweet: 4, sour: 3, bitter: 2 },
  },
  // 4. Thailand – high spicy + high sour + herbal/bitter
  {
    name: 'Thailand',
    emoji: '🇹🇭',
    description: 'Fiery spice meets sharp sourness with herbal undertones — fresh and electrifying.',
    idealScores: { spicy: 9, sour: 9, bitter: 5, sweet: 4, salty: 5, rich: 3 },
  },
  // 5. Mexico – moderate spicy + high umami + medium sour
  {
    name: 'Mexico',
    emoji: '🇲🇽',
    description: 'Warm spice, deep umami, and tangy notes — earthy and vibrant.',
    idealScores: { spicy: 6, salty: 8, sour: 5, rich: 4, sweet: 3, bitter: 3 },
  },
  // 6. Japan – subtle sweet(5) + high umami + rich(3) + sour(4)
  {
    name: 'Japan',
    emoji: '🇯🇵',
    description: 'Delicate sweetness, masterful umami, and subtle balance — refined and precise.',
    idealScores: { salty: 9, sweet: 5, rich: 3, sour: 4, spicy: 2, bitter: 3 },
  },
  // 7. US – high sweet + high rich + high salty
  {
    name: 'United States',
    emoji: '🇺🇸',
    description: 'Sweet, rich, and salty — go big or go home with bold, indulgent flavors.',
    idealScores: { sweet: 9, rich: 9, salty: 8, spicy: 3, sour: 2, bitter: 2 },
  },
  // 8. Vietnam – high sour + high umami + low rich
  {
    name: 'Vietnam',
    emoji: '🇻🇳',
    description: 'Bright sourness, clean umami, and light freshness — spicy, light, and vibrant.',
    idealScores: { sour: 8, salty: 8, rich: 2, spicy: 5, sweet: 3, bitter: 2 },
  },
  // 9. Greece – rich + mild sour
  {
    name: 'Greece',
    emoji: '🇬🇷',
    description: 'Rich and gently tangy — Mediterranean warmth in every bite.',
    idealScores: { rich: 8, sour: 5, salty: 5, sweet: 4, spicy: 2, bitter: 3 },
  },
  // 10. France – high rich + high umami + low spicy
  {
    name: 'France',
    emoji: '🇫🇷',
    description: 'Luxurious richness and deep umami with no need for heat — elegant and savory.',
    idealScores: { rich: 9, salty: 8, spicy: 2, sweet: 4, sour: 3, bitter: 4 },
  },
  // 11. Italy – rich(8) + umami(8) + sour(5) + bitter(6) + sweet(4) + spicy(4)
  {
    name: 'Italy',
    emoji: '🇮🇹',
    description: 'A symphony of all flavors — rich, savory, with bitter and sour accents.',
    idealScores: { rich: 8, salty: 8, sour: 5, bitter: 6, sweet: 4, spicy: 4 },
  },
  // 12. Spain – spicy(3) + sour(4) + rich(6) + umami(10)
  {
    name: 'Spain',
    emoji: '🇪🇸',
    description: 'Sky-high umami with moderate richness — bold savory with subtle complexity.',
    idealScores: { salty: 10, rich: 6, sour: 4, spicy: 3, sweet: 3, bitter: 3 },
  },
  // 13. Turkey – low spicy, mild sour, medium rich, high umami, medium bitter
  {
    name: 'Turkey',
    emoji: '🇹🇷',
    description: 'Savory warmth with gentle spice and earthy bitterness — welcoming and layered.',
    idealScores: { salty: 8, rich: 5, bitter: 5, sour: 4, spicy: 3, sweet: 3 },
  },
  // 14. Peru – high sour + slight bitter
  {
    name: 'Peru',
    emoji: '🇵🇪',
    description: 'Bright, tangy, and slightly bitter — citrus-forward and refreshing.',
    idealScores: { sour: 9, bitter: 4, salty: 5, spicy: 4, sweet: 3, rich: 3 },
  },
  // 15. China – umami(8) + rich(6) + bitter(4) + sour(mild) + sweet(5)
  {
    name: 'China',
    emoji: '🇨🇳',
    description: 'Deep umami, balanced richness, and a touch of everything — harmonious complexity.',
    idealScores: { salty: 8, rich: 6, bitter: 4, sweet: 5, sour: 4, spicy: 4 },
  },
  // 16. Belgium – highest sweet
  {
    name: 'Belgium',
    emoji: '🇧🇪',
    description: 'The sweetest palate of all — chocolate, waffles, and pure sugar bliss.',
    idealScores: { sweet: 10, rich: 7, salty: 4, bitter: 3, sour: 2, spicy: 1 },
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
  if (Object.keys(scores).length === 0) return fallback;

  let bestMatch = tasteCharacters[0];
  let bestDist = Infinity;

  for (const char of tasteCharacters) {
    let dist = 0;
    for (const key of Object.keys(char.idealScores) as QuizType[]) {
      const userVal = scores[key] ?? 5; // default to middle if quiz not taken
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
