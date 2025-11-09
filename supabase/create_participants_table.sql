-- Create the group_project_participants table for tracking project membership
-- Run this in your Supabase SQL editor when ready to implement full participant tracking

CREATE TABLE group_project_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES group_projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- Add RLS (Row Level Security) policies
ALTER TABLE group_project_participants ENABLE ROW LEVEL SECURITY;

-- Allow users to see participants in projects they can access
CREATE POLICY "Users can view project participants" ON group_project_participants
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_projects
      WHERE group_projects.id = group_project_participants.project_id
    )
  );

-- Allow authenticated users to join projects
CREATE POLICY "Users can join projects" ON group_project_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to leave projects (delete their own participation)
CREATE POLICY "Users can leave projects" ON group_project_participants
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_group_project_participants_project_id ON group_project_participants(project_id);
CREATE INDEX idx_group_project_participants_user_id ON group_project_participants(user_id);