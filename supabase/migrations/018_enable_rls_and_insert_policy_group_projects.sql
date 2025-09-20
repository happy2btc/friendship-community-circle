-- Migration: Enable RLS and add insert policy for group_projects
ALTER TABLE public.group_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create group projects"
  ON public.group_projects
  FOR INSERT
  WITH CHECK (proposer_id = auth.uid());
