-- Migration: Create group_project_comments table
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

-- Index for faster lookup by project
CREATE INDEX IF NOT EXISTS idx_group_project_comments_project_id ON group_project_comments(project_id);

-- Index for approved status
CREATE INDEX IF NOT EXISTS idx_group_project_comments_approved ON group_project_comments(approved);

-- Index for created_at for ordering
CREATE INDEX IF NOT EXISTS idx_group_project_comments_created_at ON group_project_comments(created_at);

-- Enable RLS
ALTER TABLE group_project_comments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view approved comments
CREATE POLICY "Users can view approved comments" ON group_project_comments
    FOR SELECT USING (approved = true);

-- Policy: Users can insert their own comments (but they start as unapproved)
CREATE POLICY "Users can insert comments" ON group_project_comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Admins can view all comments
CREATE POLICY "Admins can view all comments" ON group_project_comments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = true
        )
    );

-- Policy: Admins can update comments (for approval)
CREATE POLICY "Admins can update comments" ON group_project_comments
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = true
        )
    );