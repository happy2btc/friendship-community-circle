-- 023_create_table_circle_announcements.sql
-- Create a `circle_announcements` table for community weekly announcements.
-- Includes an `approved` flag and Row Level Security (RLS) policies:
--  - Public can SELECT approved rows
--  - Authenticated users can INSERT but only with approved = false and profile_id matching their auth.uid()
--  - Moderators (profiles.is_admin) have full access (SELECT/INSERT/UPDATE/DELETE)

BEGIN;

-- pgcrypto provides gen_random_uuid(); Supabase usually has this extension, but ensure it's available.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Main table
CREATE TABLE IF NOT EXISTS public.circle_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  body text,
  display_name text,
  profile_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS circle_announcements_created_idx ON public.circle_announcements (created_at DESC);

-- Trigger to keep updated_at current
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_updated_at ON public.circle_announcements;
CREATE TRIGGER trg_set_updated_at
  BEFORE UPDATE ON public.circle_announcements
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Enable Row Level Security
ALTER TABLE public.circle_announcements ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anon) to SELECT only approved announcements
CREATE POLICY "select_approved" ON public.circle_announcements
  FOR SELECT
  TO public
  USING (approved = true);

-- Allow authenticated users to INSERT announcements but require that they are unapproved
-- and that profile_id is either NULL or matches the inserting user.
CREATE POLICY "insert_authenticated" ON public.circle_announcements
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND (approved = false)
    AND (profile_id IS NULL OR profile_id = auth.uid())
  );

-- Moderators (profiles.is_admin = true) should have full access to manage announcements.
-- This policy grants full-row access to authenticated users who have is_admin in profiles.
CREATE POLICY "moderator_full_access" ON public.circle_announcements
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true
    )
  );

COMMIT;

-- Notes:
-- 1) Run this in the Supabase SQL editor under the project that hosts your `profiles` table.
-- 2) If you prefer announcements to be visible to authenticated users only, change the
--    "select_approved" policy TO authenticated instead of public.
-- 3) You can create an additional policy to allow the announcement creator to UPDATE their own row
--    (for small edits) by adding a policy similar to:
--      CREATE POLICY "update_own" ON public.circle_announcements FOR UPDATE TO authenticated
--        USING (profile_id = auth.uid()) WITH CHECK (profile_id = auth.uid());