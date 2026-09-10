/**
 * Bayesian-like taste model engine.
 * Maintains a 7D internal belief vector with uncertainty,
 * and provides adaptive question selection in 3 phases.
 */

import { FoodItem, TasteVector7, INTERNAL_DIMENSIONS } from '@/data/foodDataset';
import type { Allergen, EatingStyle } from '@/data/allergens';
import { getFoodAllergens } from '@/data/allergens';

// ────────── State ──────────

export interface BayesianState {
  mean: TasteVector7;
  uncertainty: TasteVector7;
  testCount: Record<keyof TasteVector7, number>;
  questionsAnswered: number;
}

export function createInitialState(): BayesianState {
  const base = { sweet: 50, sour: 50, rich: 50, bitter: 50, salty: 50, spicy: 50, umami: 50 };
  const unc = { sweet: 35, sour: 35, rich: 35, bitter: 35, salty: 35, spicy: 35, umami: 35 };
  const cnt = { sweet: 0, sour: 0, rich: 0, bitter: 0, salty: 0, spicy: 0, umami: 0 };
  return { mean: base, uncertainty: unc, testCount: cnt, questionsAnswered: 0 };
}

// ────────── Bayesian Update ──────────

const NOISE = 30; // observation noise — controls learning rate

export function updateState(state: BayesianState, chosenFood: FoodItem): BayesianState {
  const newMean = { ...state.mean };
  const newUnc = { ...state.uncertainty };
  const newCnt = { ...state.testCount };

  for (const dim of INTERNAL_DIMENSIONS) {
    const foodVal = chosenFood.internalVector[dim];
    const diff = Math.abs(foodVal - state.mean[dim]);

    // Only update dimensions where the food provides meaningful signal
    if (foodVal > 10 || diff > 15) {
      const alpha = newUnc[dim] / (newUnc[dim] + NOISE);
      newMean[dim] = state.mean[dim] + alpha * (foodVal - state.mean[dim]);
      newUnc[dim] = Math.max(5, state.uncertainty[dim] * (1 - alpha * 0.5));
      newCnt[dim] = state.testCount[dim] + 1;
    }
  }

  return {
    mean: newMean,
    uncertainty: newUnc,
    testCount: newCnt,
    questionsAnswered: state.questionsAnswered + 1,
  };
}

// ────────── Question Pair ──────────

export interface QuizPair {
  foodA: FoodItem;
  foodB: FoodItem;
}

// ────────── Food Filtering ──────────

function isDietaryCompatible(food: FoodItem, styles: EatingStyle[]): boolean {
  if (styles.length === 0 || styles.includes('all-good')) return true;
  for (const s of styles) {
    if (s === 'all-good') continue;
    if (s === 'vegan' && food.dietary !== 'vegan') return false;
    if (s === 'vegetarian' && food.dietary === 'all') return false;
    if (s === 'pescatarian' && food.dietary === 'all') return false;
  }
  return true;
}

function hasAllergen(food: FoodItem, allergies: Allergen[]): boolean {
  if (allergies.length === 0) return false;
  const allergySet = new Set(allergies);
  const foodAllergens = getFoodAllergens(food.name);
  return foodAllergens.some(a => allergySet.has(a));
}

export function filterFoods(
  foods: FoodItem[],
  allergies: Allergen[],
  eatingStyles: EatingStyle[]
): FoodItem[] {
  return foods.filter(f => !hasAllergen(f, allergies) && isDietaryCompatible(f, eatingStyles));
}

// ────────── Question Selection ──────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function vectorDistance(a: TasteVector7, b: TasteVector7): number {
  let sum = 0;
  for (const d of INTERNAL_DIMENSIONS) sum += (a[d] - b[d]) ** 2;
  return Math.sqrt(sum);
}

/** Phase 1: Random exploration — pick two foods with decent spread */
function selectExplorationPair(available: FoodItem[]): QuizPair {
  const shuffled = shuffle(available);
  // Pick first, then find one that differs enough
  const foodA = shuffled[0];
  let best = shuffled[1];
  let bestDist = 0;
  for (let i = 1; i < Math.min(shuffled.length, 10); i++) {
    const d = vectorDistance(foodA.internalVector, shuffled[i].internalVector);
    if (d > bestDist) { bestDist = d; best = shuffled[i]; }
  }
  return { foodA, foodB: best };
}

/** Phase 2: Adaptive — maximise uncertainty reduction */
function selectAdaptivePair(state: BayesianState, available: FoodItem[]): QuizPair {
  // Find dimension with highest uncertainty
  let maxUncDim: keyof TasteVector7 = 'sweet';
  let maxUnc = 0;
  for (const d of INTERNAL_DIMENSIONS) {
    if (state.uncertainty[d] > maxUnc) { maxUnc = state.uncertainty[d]; maxUncDim = d; }
  }

  // Conditional random sampling: filter foods that differ from current mean on that dimension
  const mean = state.mean[maxUncDim];
  const candidates = available.filter(f => Math.abs(f.internalVector[maxUncDim] - mean) > 20);
  const pool = candidates.length >= 4 ? candidates : available;

  // Pick two foods that differ strongly on the target dimension
  const sorted = [...pool].sort((a, b) =>
    b.internalVector[maxUncDim] - a.internalVector[maxUncDim]
  );

  const highGroup = sorted.slice(0, Math.max(3, Math.floor(sorted.length * 0.3)));
  const lowGroup = sorted.slice(-Math.max(3, Math.floor(sorted.length * 0.3)));

  const foodA = highGroup[Math.floor(Math.random() * highGroup.length)];
  let foodB = lowGroup[Math.floor(Math.random() * lowGroup.length)];
  if (foodB.id === foodA.id && lowGroup.length > 1) {
    foodB = lowGroup.find(f => f.id !== foodA.id) || lowGroup[0];
  }

  return { foodA, foodB };
}

/** Phase 3: Refinement — pick very similar foods */
function selectRefinementPair(state: BayesianState, available: FoodItem[]): QuizPair {
  // Find foods closest to current mean
  const meanVec: TasteVector7 = state.mean;
  const scored = available.map(f => ({
    food: f,
    dist: vectorDistance(f.internalVector, meanVec),
  })).sort((a, b) => a.dist - b.dist);

  const close = scored.slice(0, Math.min(8, scored.length));
  const shuffled = shuffle(close);
  const foodA = shuffled[0].food;
  const foodB = shuffled.length > 1 ? shuffled[1].food : shuffled[0].food;
  return { foodA, foodB };
}

/** Main question selector with 3 phases */
export function selectNextPair(
  state: BayesianState,
  usedIds: Set<string>,
  allFoods: FoodItem[]
): QuizPair {
  const available = allFoods.filter(f => !usedIds.has(f.id));
  if (available.length < 2) {
    // Fallback: allow re-use
    const shuffled = shuffle(allFoods);
    return { foodA: shuffled[0], foodB: shuffled[1] };
  }

  const q = state.questionsAnswered;

  if (q < 3) return selectExplorationPair(available);
  if (q < 10) return selectAdaptivePair(state, available);
  return selectRefinementPair(state, available);
}

/** Convert 7D internal vector (0-100) to 7D UX scores (0-10 scale) for display */
export function toUXScores(mean: TasteVector7): Record<string, number> {
  return {
    sweet: mean.sweet / 10,
    sour: mean.sour / 10,
    rich: mean.rich / 10,
    bitter: mean.bitter / 10,
    salty: mean.salty / 10,
    spicy: mean.spicy / 10,
    umami: mean.umami / 10,
  };
}
