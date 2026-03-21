import type { TasteVector7 } from './foodDataset';
import turkeyCatImg from '@/assets/Turkey_cat.png';
import vietnamImg from '@/assets/vietnam-water_buffalo_V.png';
import koreaImg from '@/assets/tiger_korea.png';

export interface TasteCharacter {
  name: string;
  emoji: string;
  description: string;
  image?: string;
  /** Ideal score profile on 0-100 scale for each taste dimension (7D internal) */
  idealScores: TasteVector7;
}

export const tasteCharacters: TasteCharacter[] = [
  {
    name: 'India',
    emoji: '🇮🇳',
    description: 'Bold spice meets deep richness — your palate craves fiery, indulgent flavors.',
    idealScores: { sweet: 30, sour: 10, rich: 70, bitter: 10, salty: 40, spicy: 90, umami: 80 },
  },
  {
    name: 'Korea',
    emoji: '🇰🇷',
    image: koreaImg,
    description: 'Spicy and savory with sweet-sour balance — fermented, bold, and layered.',
    idealScores: { sweet: 40, sour: 50, rich: 60, bitter: 10, salty: 50, spicy: 80, umami: 70 },
  },
  {
    name: 'Indonesia',
    emoji: '🇮🇩',
    description: 'A triple threat of spice, richness, and umami — complex and aromatic.',
    idealScores: { sweet: 30, sour: 20, rich: 70, bitter: 10, salty: 40, spicy: 80, umami: 90 },
  },
  {
    name: 'Thailand',
    emoji: '🇹🇭',
    description: 'Fiery spice meets sharp sourness with herbal undertones — fresh and electrifying.',
    idealScores: { sweet: 20, sour: 70, rich: 50, bitter: 10, salty: 40, spicy: 90, umami: 60 },
  },
  {
    name: 'Mexico',
    emoji: '🇲🇽',
    description: 'Warm spice, deep umami, and tangy notes — earthy and vibrant.',
    idealScores: { sweet: 30, sour: 40, rich: 60, bitter: 10, salty: 50, spicy: 70, umami: 80 },
  },
  {
    name: 'Japan',
    emoji: '🇯🇵',
    description: 'Delicate sweetness, masterful umami, and subtle balance — refined and precise.',
    idealScores: { sweet: 50, sour: 20, rich: 40, bitter: 10, salty: 30, spicy: 10, umami: 90 },
  },
  {
    name: 'United States',
    emoji: '🇺🇸',
    description: 'Sweet, rich, and salty — go big or go home with bold, indulgent flavors.',
    idealScores: { sweet: 80, sour: 20, rich: 70, bitter: 10, salty: 60, spicy: 20, umami: 40 },
  },
  {
    name: 'Vietnam',
    emoji: '🇻🇳',
    image: vietnamImg,
    description: 'Bright sourness, clean umami, and light freshness — spicy, light, and vibrant.',
    idealScores: { sweet: 30, sour: 60, rich: 40, bitter: 10, salty: 30, spicy: 20, umami: 70 },
  },
  {
    name: 'Greece',
    emoji: '🇬🇷',
    description: 'Rich and gently tangy — Mediterranean warmth in every bite.',
    idealScores: { sweet: 30, sour: 40, rich: 60, bitter: 10, salty: 40, spicy: 10, umami: 50 },
  },
  {
    name: 'France',
    emoji: '🇫🇷',
    description: 'Luxurious richness and deep umami with no need for heat — elegant and savory.',
    idealScores: { sweet: 40, sour: 30, rich: 80, bitter: 10, salty: 40, spicy: 10, umami: 80 },
  },
  {
    name: 'Italy',
    emoji: '🇮🇹',
    description: 'A symphony of all flavors — rich, savory, with bitter and sour accents.',
    idealScores: { sweet: 30, sour: 30, rich: 70, bitter: 20, salty: 40, spicy: 10, umami: 70 },
  },
  {
    name: 'Spain',
    emoji: '🇪🇸',
    description: 'Sky-high umami with moderate richness — bold savory with subtle complexity.',
    idealScores: { sweet: 30, sour: 20, rich: 60, bitter: 10, salty: 40, spicy: 20, umami: 90 },
  },
  {
    name: 'Turkey',
    emoji: '🇹🇷',
    image: turkeyCatImg,
    description: 'Savory warmth with gentle spice and earthy bitterness — welcoming and layered.',
    idealScores: { sweet: 30, sour: 20, rich: 60, bitter: 20, salty: 40, spicy: 0, umami: 50 },
  },
  {
    name: 'Peru',
    emoji: '🇵🇪',
    description: 'Bright, tangy, and slightly bitter — citrus-forward and refreshing.',
    idealScores: { sweet: 30, sour: 60, rich: 40, bitter: 20, salty: 30, spicy: 10, umami: 50 },
  },
  {
    name: 'China',
    emoji: '🇨🇳',
    description: 'Deep umami, balanced richness, and a touch of everything — harmonious complexity.',
    idealScores: { sweet: 30, sour: 30, rich: 70, bitter: 10, salty: 40, spicy: 30, umami: 80 },
  },
  {
    name: 'Belgium',
    emoji: '🇧🇪',
    description: 'The sweetest palate of all — chocolate, waffles, and pure sugar bliss.',
    idealScores: { sweet: 90, sour: 10, rich: 60, bitter: 10, salty: 30, spicy: 10, umami: 40 },
  },
];

const fallback: TasteCharacter = {
  name: 'The Explorer',
  emoji: '🧬',
  description: 'Your taste journey begins — take the quiz to discover your flavor identity!',
  idealScores: { sweet: 50, sour: 50, rich: 50, bitter: 50, salty: 50, spicy: 50, umami: 50 },
};

/**
 * Find the closest matching country character using Euclidean distance
 * between the user's 7D internal vector and each character's ideal profile.
 * Input: user's internal mean vector on 0-100 scale.
 */
export const getCharacter = (userMean: TasteVector7): TasteCharacter => {
  let bestMatch = tasteCharacters[0];
  let bestDist = Infinity;

  for (const char of tasteCharacters) {
    let dist = 0;
    for (const key of ['sweet', 'sour', 'rich', 'bitter', 'salty', 'spicy', 'umami'] as (keyof TasteVector7)[]) {
      const userVal = userMean[key] ?? 50;
      const idealVal = char.idealScores[key] ?? 50;
      dist += (userVal - idealVal) ** 2;
    }
    if (dist < bestDist) {
      bestDist = dist;
      bestMatch = char;
    }
  }

  return bestMatch;
};
