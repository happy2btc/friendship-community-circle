-- Migration: Add updated_at column to group_projects table
ALTER TABLE group_projects
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();