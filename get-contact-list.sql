-- Email Contact List Query
-- Run this in your Supabase SQL Editor to get a contact list
-- Copy the results and paste into Google Docs

SELECT
  p.full_name as "Name",
  u.email as "Email"
FROM
  profiles p
JOIN
  auth.users u ON p.id = u.id
WHERE
  p.full_name IS NOT NULL
  AND p.full_name != ''
  AND u.email IS NOT NULL
ORDER BY
  p.full_name;

-- Alternative: Get as CSV format
-- SELECT 'Name,Email' as header
-- UNION ALL
-- SELECT CONCAT('"', p.full_name, '","', u.email, '"')
-- FROM profiles p
-- JOIN auth.users u ON p.id = u.id
-- WHERE p.full_name IS NOT NULL AND p.full_name != '' AND u.email IS NOT NULL
-- ORDER BY p.full_name;