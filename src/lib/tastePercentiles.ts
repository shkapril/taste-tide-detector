/**
 * Baseline taste distributions used to estimate where a user's score sits
 * among all quiz takers. Values are on the 0–10 UX scale.
 * (Reference distribution — replaced by real user data once a backend exists.)
 */

export interface TasteDistribution {
  key: string;
  label: string;
  emoji: string;
  mean: number;
  sd: number;
}

export const TASTE_DISTRIBUTIONS: TasteDistribution[] = [
  { key: 'sweet', label: 'Sweet', emoji: '🍫', mean: 6.2, sd: 1.9 },
  { key: 'sour', label: 'Sour', emoji: '🍋', mean: 4.8, sd: 2.0 },
  { key: 'rich', label: 'Rich', emoji: '🧈', mean: 5.9, sd: 1.8 },
  { key: 'bitter', label: 'Bitter', emoji: '☕', mean: 3.9, sd: 2.1 },
  { key: 'salty', label: 'Salty', emoji: '🧂', mean: 6.0, sd: 1.7 },
  { key: 'spicy', label: 'Spicy', emoji: '🌶️', mean: 5.4, sd: 2.3 },
  { key: 'umami', label: 'Umami', emoji: '🥫', mean: 5.7, sd: 1.9 },
];

/** Standard normal CDF (Abramowitz & Stegun approximation). */
function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p =
    d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

export interface TastePercentile extends TasteDistribution {
  score: number;
  /** 1–99: percentage of users this user scores above */
  percentile: number;
  /** Short human-readable comparison */
  blurb: string;
}

export function getTastePercentiles(scores: Record<string, number>): TastePercentile[] {
  return TASTE_DISTRIBUTIONS.map(d => {
    const score = scores[d.key] ?? 0;
    const z = (score - d.mean) / d.sd;
    const pct = Math.min(99, Math.max(1, Math.round(normalCdf(z) * 100)));
    const top = 100 - pct;
    const blurb =
      pct >= 80
        ? `Top ${Math.max(1, top)}% — you love ${d.label.toLowerCase()} far more than most`
        : pct >= 60
        ? `Above average — more ${d.label.toLowerCase()} than ${pct}% of people`
        : pct >= 40
        ? `Right around average for ${d.label.toLowerCase()}`
        : pct >= 20
        ? `Below average — less ${d.label.toLowerCase()} than most`
        : `Bottom ${Math.max(1, pct)}% — you avoid ${d.label.toLowerCase()}`;
    return { ...d, score, percentile: pct, blurb };
  });
}
