-- 001_create_table_suggestions.sql

CREATE TABLE suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'suggestion',
  submitted_by TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
