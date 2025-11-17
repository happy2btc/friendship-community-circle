-- SQL commands to fix affirmation_text for existing members
-- Run these in your Supabase SQL editor

-- Option 1: Fix ALL members with NULL affirmation_text
UPDATE profiles
SET
  affirmation_text = NOW()::text,
  affirmation_date = NOW()
WHERE affirmation_text IS NULL;

-- Option 2: Fix a specific member by ID
-- Replace 'user-id-here' with the actual user ID
UPDATE profiles
SET
  affirmation_text = NOW()::text,
  affirmation_date = NOW()
WHERE id = 'user-id-here';

-- Option 3: Fix members who registered after a certain date
-- For example, members who registered today (November 16, 2025)
UPDATE profiles
SET
  affirmation_text = NOW()::text,
  affirmation_date = NOW()
WHERE affirmation_text IS NULL
  AND created_at >= '2025-11-16 00:00:00';

-- Option 4: Check which members still have NULL affirmation_text
SELECT id, full_name, email, created_at
FROM profiles
WHERE affirmation_text IS NULL
ORDER BY created_at DESC;