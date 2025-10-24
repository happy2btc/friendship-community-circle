-- Migration: add visitor_id, referrer and utm columns to site_visits
ALTER TABLE IF EXISTS public.site_visits
  ADD COLUMN IF NOT EXISTS visitor_id text NULL,
  ADD COLUMN IF NOT EXISTS referrer text NULL,
  ADD COLUMN IF NOT EXISTS landing_url text NULL,
  ADD COLUMN IF NOT EXISTS utm_source text NULL,
  ADD COLUMN IF NOT EXISTS utm_medium text NULL,
  ADD COLUMN IF NOT EXISTS utm_campaign text NULL;

CREATE INDEX IF NOT EXISTS site_visits_visitor_idx ON public.site_visits (visitor_id);

-- Optional: add profile_id if you want to link visits to authenticated profiles server-side
ALTER TABLE IF EXISTS public.site_visits
  ADD COLUMN IF NOT EXISTS profile_id uuid NULL;
