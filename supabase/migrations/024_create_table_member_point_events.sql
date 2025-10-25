-- Deprecated migration: member_point_events
-- The project no longer creates or uses a dedicated `member_point_events` table.
-- This migration file is retained for history but intentionally does not create any objects.
-- If you previously applied a migration that created `member_point_events`, drop it manually:
--   DROP TABLE IF EXISTS public.member_point_events;

-- Note: Circle Pulse now aggregates activity directly from canonical tables
-- (agreement_votes, suggestions, comments, celebrations, events, group_projects, writers_wall).

