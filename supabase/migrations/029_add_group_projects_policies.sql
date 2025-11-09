-- Migration: Add missing policies for group_projects table
-- Users need to be able to update and view projects

-- Allow users to update projects they created
CREATE POLICY "Users can update their own group projects"
  ON public.group_projects
  FOR UPDATE
  USING (proposer_id = auth.uid());

-- Allow users to view all group projects
CREATE POLICY "Users can view group projects"
  ON public.group_projects
  FOR SELECT
  USING (true);