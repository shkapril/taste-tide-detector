CREATE TABLE public.quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  category text NOT NULL,
  score numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, category)
);
GRANT INSERT ON public.quiz_results TO anon, authenticated;
GRANT ALL ON public.quiz_results TO service_role;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit valid quiz results" ON public.quiz_results
FOR INSERT TO anon, authenticated
WITH CHECK (
  category IN ('sweet','sour','rich','bitter','salty','spicy','umami')
  AND score >= 0 AND score <= 10
  AND length(session_id) BETWEEN 8 AND 64
);

CREATE OR REPLACE FUNCTION public.get_taste_stats()
RETURNS TABLE(category text, mean numeric, sd numeric, n bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT category, avg(score), coalesce(stddev_samp(score), 0), count(*)
  FROM public.quiz_results GROUP BY category;
$$;
GRANT EXECUTE ON FUNCTION public.get_taste_stats() TO anon, authenticated;