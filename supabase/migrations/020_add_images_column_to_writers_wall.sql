-- Migration: Add images column to writers_wall table for image gallery support
ALTER TABLE writers_wall ADD COLUMN images jsonb DEFAULT '[]';
