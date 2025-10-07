-- Migration: Add images column to group_projects table
ALTER TABLE group_projects
ADD COLUMN images jsonb DEFAULT '[]';
