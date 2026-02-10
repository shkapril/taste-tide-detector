import { QuizType } from './quizData';

export interface TasteCharacter {
  name: string;
  emoji: string;
  description: string;
  condition: (scores: Partial<Record<QuizType, number>>) => boolean;
}

const avg = (scores: Partial<Record<QuizType, number>>): number => {
  const vals = Object.values(scores).filter((v): v is number => v !== undefined);
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
};

const high = (v?: number) => (v ?? 0) > 6;
const low = (v?: number) => (v ?? 10) <= 4;
const has = (v?: number) => v !== undefined;

export const tasteCharacters: TasteCharacter[] = [
  {
    name: 'The Inferno',
    emoji: '🌋',
    description: 'You crave maximum heat and bold spice in everything.',
    condition: (s) => high(s.spicy) && (s.spicy ?? 0) >= 8,
  },
  {
    name: 'The Sugar Rush',
    emoji: '🍭',
    description: 'Sweet tooth to the extreme — desserts are your main course.',
    condition: (s) => high(s.sweet) && (s.sweet ?? 0) >= 8,
  },
  {
    name: 'The Pucker',
    emoji: '😖',
    description: 'You love sour flavors that make others wince.',
    condition: (s) => high(s.sour) && (s.sour ?? 0) >= 8,
  },
  {
    name: 'The Umami King',
    emoji: '🧂',
    description: 'Savory and salty is your comfort zone.',
    condition: (s) => high(s.salty) && (s.salty ?? 0) >= 8,
  },
  {
    name: 'The Espresso Soul',
    emoji: '☕',
    description: 'Bitterness is your superpower — the darker, the better.',
    condition: (s) => high(s.bitter) && (s.bitter ?? 0) >= 8,
  },
  {
    name: 'The Butter Baron',
    emoji: '🧈',
    description: 'Rich, creamy indulgence defines your palate.',
    condition: (s) => high(s.rich) && (s.rich ?? 0) >= 8,
  },
  {
    name: 'The Sweet & Spicy',
    emoji: '🍫🌶️',
    description: 'You love the thrill of contrasting sweet heat.',
    condition: (s) => high(s.sweet) && high(s.spicy),
  },
  {
    name: 'The Gourmet',
    emoji: '👨‍🍳',
    description: 'Rich and salty — you appreciate the finer savory things.',
    condition: (s) => high(s.rich) && high(s.salty),
  },
  {
    name: 'The Adventurer',
    emoji: '🗺️',
    description: 'Sour and spicy together? You live for bold combos.',
    condition: (s) => high(s.sour) && high(s.spicy),
  },
  {
    name: 'The Sophisticate',
    emoji: '🎩',
    description: 'Bitter and rich — your palate is mature and refined.',
    condition: (s) => high(s.bitter) && high(s.rich),
  },
  {
    name: 'The Maximalist',
    emoji: '🎆',
    description: 'You love it all — intense flavors across the board!',
    condition: (s) => avg(s) > 6.5,
  },
  {
    name: 'The Minimalist',
    emoji: '🍃',
    description: 'Subtle, gentle flavors — you appreciate simplicity.',
    condition: (s) => avg(s) < 3.5 && Object.keys(s).length >= 2,
  },
  {
    name: 'The Balanced Chef',
    emoji: '⚖️',
    description: 'Your palate is perfectly centered — no extremes.',
    condition: (s) => {
      const vals = Object.values(s).filter((v): v is number => v !== undefined);
      return vals.length >= 3 && vals.every(v => v >= 3.5 && v <= 6.5);
    },
  },
  {
    name: 'The Sweet Tooth',
    emoji: '🍰',
    description: 'Sweet flavors dominate your taste world.',
    condition: (s) => high(s.sweet),
  },
  {
    name: 'The Bold Explorer',
    emoji: '🔥',
    description: 'You lean into strong, assertive flavors.',
    condition: (s) => avg(s) > 5,
  },
  {
    name: 'The Newcomer',
    emoji: '✨',
    description: 'Your taste journey is just beginning — keep exploring!',
    condition: () => true, // fallback
  },
];

export const getCharacter = (scores: Partial<Record<QuizType, number>>): TasteCharacter => {
  if (Object.keys(scores).length === 0) return tasteCharacters[tasteCharacters.length - 1];
  for (const char of tasteCharacters) {
    if (char.condition(scores)) return char;
  }
  return tasteCharacters[tasteCharacters.length - 1];
};
