-- Migration: create site_visits table for recording page visits
-- Run this in your Supabase SQL editor to enable visit counting from the client.

-- If your Supabase project allows the pgcrypto extension, this creates UUID defaults.
-- If not, remove the gen_random_uuid() default and use text IDs or let the DB assign serial ids.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.site_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS site_visits_created_idx ON public.site_visits (created_at DESC);
