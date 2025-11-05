-- Create help_requests table for the Community Help Center
-- This table stores requests for help with forms and administrative processes

CREATE TABLE IF NOT EXISTS help_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    requester_name TEXT NOT NULL,
    requester_email TEXT NOT NULL,
    help_category TEXT NOT NULL,
    help_title TEXT NOT NULL,
    urgency TEXT NOT NULL CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
    help_description TEXT NOT NULL,
    preferred_contact TEXT DEFAULT 'email' CHECK (preferred_contact IN ('email', 'phone', 'chat', 'in-person')),
    additional_info TEXT,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'in-progress', 'completed', 'cancelled')),
    assigned_helper_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_help_requests_status ON help_requests(status);
CREATE INDEX IF NOT EXISTS idx_help_requests_category ON help_requests(help_category);
CREATE INDEX IF NOT EXISTS idx_help_requests_urgency ON help_requests(urgency);
CREATE INDEX IF NOT EXISTS idx_help_requests_created_at ON help_requests(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE help_requests ENABLE ROW LEVEL SECURITY;

-- Policies for help_requests table
-- Allow anyone to insert (create help requests)
DROP POLICY IF EXISTS "Anyone can create help requests" ON help_requests;
CREATE POLICY "Anyone can create help requests" ON help_requests
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view all requests (for helpers)
DROP POLICY IF EXISTS "Authenticated users can view help requests" ON help_requests;
CREATE POLICY "Authenticated users can view help requests" ON help_requests
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update requests (for status updates)
DROP POLICY IF EXISTS "Authenticated users can update help requests" ON help_requests;
CREATE POLICY "Authenticated users can update help requests" ON help_requests
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Optional: Create a view for helper dashboard
CREATE OR REPLACE VIEW help_requests_dashboard AS
SELECT
    hr.*,
    p.full_name as assigned_helper_name
FROM help_requests hr
LEFT JOIN profiles p ON hr.assigned_helper_id = p.id
ORDER BY
    CASE hr.urgency
        WHEN 'critical' THEN 1
        WHEN 'high' THEN 2
        WHEN 'medium' THEN 3
        WHEN 'low' THEN 4
    END,
    hr.created_at ASC;

-- Grant access to the view for authenticated users
GRANT SELECT ON help_requests_dashboard TO authenticated;