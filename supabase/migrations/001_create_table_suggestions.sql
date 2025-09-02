-- migrate:up
CREATE TABLE IF NOT EXISTS public.suggestions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  visibility text NOT NULL DEFAULT 'private' CHECK (visibility IN ('private', 'circle', 'public')),
  submitted_by uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_at timestamp without time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;

-- View own suggestions
CREATE POLICY "Can view own suggestions"
  ON public.suggestions
  FOR SELECT
  USING (auth.uid() = submitted_by);

-- Insert own suggestions
CREATE POLICY "Can insert own suggestions"
  ON public.suggestions
  FOR INSERT
  WITH CHECK (auth.uid() = submitted_by);

-- Update own suggestions
CREATE POLICY "Can update own suggestions"
  ON public.suggestions
  FOR UPDATE
  USING (auth.uid() = submitted_by);

-- Delete own suggestions
CREATE POLICY "Can delete own suggestions"
  ON public.suggestions
  FOR DELETE
  USING (auth.uid() = submitted_by);

-- migrate:down
DROP POLICY IF EXISTS "Can delete own suggestions" ON public.suggestions;
DROP POLICY IF EXISTS "Can update own suggestions" ON public.suggestions;
DROP POLICY IF EXISTS "Can insert own suggestions" ON public.suggestions;
DROP POLICY IF EXISTS "Can view own suggestions" ON public.suggestions;

ALTER TABLE public.suggestions DISABLE ROW LEVEL SECURITY;

DROP TABLE IF EXISTS public.suggestions;