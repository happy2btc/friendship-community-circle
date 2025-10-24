-- Migration: add moderation fields for group project comments and admin flag on profiles
ALTER TABLE IF EXISTS public.group_project_comments
  ADD COLUMN IF NOT EXISTS display_name text;

ALTER TABLE IF EXISTS public.group_project_comments
  ADD COLUMN IF NOT EXISTS approved boolean DEFAULT false;

ALTER TABLE IF EXISTS public.profiles
  ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;
