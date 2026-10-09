import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/** Minimum real participants per category before real stats replace the baseline. */
export const MIN_SAMPLE = 20;

export interface CategoryStat {
  mean: number;
  sd: number;
  n: number;
}

const SESSION_KEY = 'resultSessionId';

function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/** Call when a user starts over, so their next run counts as a new participant. */
export function resetResultSession() {
  localStorage.removeItem(SESSION_KEY);
}

/** Anonymously record a finished category score (0–10). Failures are ignored. */
export async function submitCategoryScore(category: string, score: number) {
  try {
    const clamped = Math.min(10, Math.max(0, score));
    await supabase
      .from('quiz_results')
      .upsert(
        { session_id: getSessionId(), category, score: clamped },
        { onConflict: 'session_id,category', ignoreDuplicates: true },
      );
  } catch {
    /* offline etc. — the quiz still works locally */
  }
}

/** Live per-category stats from all participants. */
export function useGlobalStats() {
  const [stats, setStats] = useState<Record<string, CategoryStat>>({});
  useEffect(() => {
    supabase.rpc('get_taste_stats').then(({ data }) => {
      if (!data) return;
      const out: Record<string, CategoryStat> = {};
      for (const r of data as { category: string; mean: number; sd: number; n: number }[]) {
        out[r.category] = { mean: Number(r.mean), sd: Number(r.sd), n: Number(r.n) };
      }
      setStats(out);
    });
  }, []);
  return stats;
}
