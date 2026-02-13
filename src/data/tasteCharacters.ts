import { QuizType } from './quizData';

export interface TasteCharacter {
  name: string;
  emoji: string;
  description: string;
  condition: (scores: Partial<Record<QuizType, number>>) => boolean;
}

const s = (scores: Partial<Record<QuizType, number>>, key: QuizType) => scores[key] ?? 0;
const high = (v: number) => v >= 7;
const mid = (v: number) => v >= 4 && v < 7;
const low = (v: number) => v < 4;

export const tasteCharacters: TasteCharacter[] = [
  // 1. India – high spicy + high rich
  {
    name: 'India',
    emoji: '🇮🇳',
    description: 'Bold spice meets deep richness — your palate craves fiery, indulgent flavors.',
    condition: (sc) => high(s(sc, 'spicy')) && high(s(sc, 'rich')) && !high(s(sc, 'salty')),
  },
  // 2. Korea – high spicy + high umami + sweet(4) + sour(4) + rich(2)
  {
    name: 'Korea',
    emoji: '🇰🇷',
    description: 'Spicy and savory with sweet-sour balance — fermented, bold, and layered.',
    condition: (sc) =>
      high(s(sc, 'spicy')) && high(s(sc, 'salty')) && s(sc, 'sweet') <= 5 && s(sc, 'sour') <= 5,
  },
  // 3. Indonesia – high spicy + high rich + high umami
  {
    name: 'Indonesia',
    emoji: '🇮🇩',
    description: 'A triple threat of spice, richness, and umami — complex and aromatic.',
    condition: (sc) => high(s(sc, 'spicy')) && high(s(sc, 'rich')) && high(s(sc, 'salty')),
  },
  // 4. Thailand – high spicy + high sour + herbal/bitter
  {
    name: 'Thailand',
    emoji: '🇹🇭',
    description: 'Fiery spice meets sharp sourness with herbal undertones — fresh and electrifying.',
    condition: (sc) => high(s(sc, 'spicy')) && high(s(sc, 'sour')),
  },
  // 5. Mexico – moderate spicy + high umami + medium sour
  {
    name: 'Mexico',
    emoji: '🇲🇽',
    description: 'Warm spice, deep umami, and tangy notes — earthy and vibrant.',
    condition: (sc) => mid(s(sc, 'spicy')) && high(s(sc, 'salty')) && mid(s(sc, 'sour')),
  },
  // 6. Japan – subtle sweet(5) + high umami + rich(3) + sour(4)
  {
    name: 'Japan',
    emoji: '🇯🇵',
    description: 'Delicate sweetness, masterful umami, and subtle balance — refined and precise.',
    condition: (sc) =>
      high(s(sc, 'salty')) && s(sc, 'sweet') >= 4 && s(sc, 'sweet') <= 6 && !high(s(sc, 'spicy')),
  },
  // 7. US – high sweet + high rich + high salty
  {
    name: 'United States',
    emoji: '🇺🇸',
    description: 'Sweet, rich, and salty — go big or go home with bold, indulgent flavors.',
    condition: (sc) => high(s(sc, 'sweet')) && high(s(sc, 'rich')) && high(s(sc, 'salty')),
  },
  // 8. Vietnam – high sour(8) + high umami + low rich
  {
    name: 'Vietnam',
    emoji: '🇻🇳',
    description: 'Bright sourness, clean umami, and light freshness — spicy, light, and vibrant.',
    condition: (sc) => high(s(sc, 'sour')) && high(s(sc, 'salty')) && low(s(sc, 'rich')),
  },
  // 9. Greece – rich + mild sour
  {
    name: 'Greece',
    emoji: '🇬🇷',
    description: 'Rich and gently tangy — Mediterranean warmth in every bite.',
    condition: (sc) => high(s(sc, 'rich')) && mid(s(sc, 'sour')) && !high(s(sc, 'salty')),
  },
  // 10. France – high rich + high umami + low spicy
  {
    name: 'France',
    emoji: '🇫🇷',
    description: 'Luxurious richness and deep umami with no need for heat — elegant and savory.',
    condition: (sc) => high(s(sc, 'rich')) && high(s(sc, 'salty')) && low(s(sc, 'spicy')),
  },
  // 11. Italy – rich(8) + umami(8) + sour(5) + bitter(6) + sweet(4) + spicy(4)
  {
    name: 'Italy',
    emoji: '🇮🇹',
    description: 'A symphony of all flavors — rich, savory, with bitter and sour accents.',
    condition: (sc) => {
      const vals = Object.values(sc).filter((v): v is number => v !== undefined);
      return vals.length >= 4 && high(s(sc, 'rich')) && high(s(sc, 'salty')) && s(sc, 'bitter') >= 5;
    },
  },
  // 12. Spain – spicy(3) + sour(4) + rich(6) + umami(10)
  {
    name: 'Spain',
    emoji: '🇪🇸',
    description: 'Sky-high umami with moderate richness — bold savory with subtle complexity.',
    condition: (sc) => s(sc, 'salty') >= 8 && mid(s(sc, 'rich')) && !high(s(sc, 'spicy')),
  },
  // 13. Turkey – low spicy, mild sour, medium rich, high umami, medium bitter
  {
    name: 'Turkey',
    emoji: '🇹🇷',
    description: 'Savory warmth with gentle spice and earthy bitterness — welcoming and layered.',
    condition: (sc) =>
      high(s(sc, 'salty')) && low(s(sc, 'spicy')) && mid(s(sc, 'bitter')) && mid(s(sc, 'rich')),
  },
  // 14. Peru – high sour + slight bitter
  {
    name: 'Peru',
    emoji: '🇵🇪',
    description: 'Bright, tangy, and slightly bitter — citrus-forward and refreshing.',
    condition: (sc) => high(s(sc, 'sour')) && s(sc, 'bitter') >= 3 && s(sc, 'bitter') <= 5,
  },
  // 15. China – umami(8) + rich(6) + bitter(4) + sweet(5)
  {
    name: 'China',
    emoji: '🇨🇳',
    description: 'Deep umami, balanced richness, and a touch of everything — harmonious complexity.',
    condition: (sc) =>
      high(s(sc, 'salty')) && mid(s(sc, 'rich')) && s(sc, 'bitter') >= 3 && mid(s(sc, 'sweet')),
  },
  // 16. Belgium – highest sweet (fallback for sweet lovers)
  {
    name: 'Belgium',
    emoji: '🇧🇪',
    description: 'The sweetest palate of all — chocolate, waffles, and pure sugar bliss.',
    condition: (sc) => high(s(sc, 'sweet')),
  },
];

// Fallback character if nothing matches
const fallback: TasteCharacter = {
  name: 'The Newcomer',
  emoji: '✨',
  description: 'Your taste journey just begins — Start exploring!',
  condition: () => true,
};

export const getCharacter = (scores: Partial<Record<QuizType, number>>): TasteCharacter => {
  if (Object.keys(scores).length === 0) return fallback;
  for (const char of tasteCharacters) {
    if (char.condition(scores)) return char;
  }
  return fallback;
};
