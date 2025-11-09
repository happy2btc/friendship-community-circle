-- Update the group_projects policies to be more permissive
-- Drop the restrictive policy and create a more flexible one

DROP POLICY IF EXISTS "Users can update their own group projects" ON public.group_projects;

-- Allow users to update any project (more permissive for now)
-- In production, you might want to restrict this more
CREATE POLICY "Users can update group projects"
  ON public.group_projects
  FOR UPDATE
  USING (true);

-- Also ensure users can view projects
DROP POLICY IF EXISTS "Users can view group projects" ON public.group_projects;
CREATE POLICY "Users can view group projects"
  ON public.group_projects
  FOR SELECT
  USING (true);