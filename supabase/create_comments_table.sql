-- Create the group_project_comments table
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)

CREATE TABLE IF NOT EXISTS group_project_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES group_projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  author_name TEXT,
  display_name TEXT,
  comment TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_group_project_comments_project_id ON group_project_comments(project_id);
CREATE INDEX IF NOT EXISTS idx_group_project_comments_approved ON group_project_comments(approved);
CREATE INDEX IF NOT EXISTS idx_group_project_comments_created_at ON group_project_comments(created_at);

-- Enable Row Level Security
ALTER TABLE group_project_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for security
CREATE POLICY "Users can view approved comments" ON group_project_comments
  FOR SELECT USING (approved = true);

CREATE POLICY "Users can insert comments" ON group_project_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all comments" ON group_project_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update comments" ON group_project_comments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );