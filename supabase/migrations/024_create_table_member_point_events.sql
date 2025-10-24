-- Migration: create member_point_events table to record point-awarding actions
CREATE TABLE IF NOT EXISTS public.member_point_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NULL,
  display_name text NULL,
  action text NOT NULL,
  meta jsonb NULL,
  points int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS member_point_events_created_idx ON public.member_point_events (created_at DESC);

-- If your DB doesn't allow pgcrypto, remove the gen_random_uuid() default and create IDs client-side
