-- Migration: create visitor_mappings table to map persistent visitor IDs to profiles
CREATE TABLE IF NOT EXISTS public.visitor_mappings (
  visitor_id text PRIMARY KEY,
  profile_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS visitor_mappings_profile_idx ON public.visitor_mappings (profile_id);
