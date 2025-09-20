-- Migration: Create group_projects table for circle projects
CREATE TABLE group_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    circle_id UUID REFERENCES circles(id) ON DELETE CASCADE,
    proposer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    entered_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    name TEXT NOT NULL,
    description TEXT,
    num_participants INTEGER DEFAULT 0,
    status TEXT CHECK (status IN ('pending', 'started', 'in process', 'completed')) DEFAULT 'pending'
);

-- Index for faster lookup by circle
CREATE INDEX idx_group_projects_circle_id ON group_projects(circle_id);

-- Index for status
CREATE INDEX idx_group_projects_status ON group_projects(status);