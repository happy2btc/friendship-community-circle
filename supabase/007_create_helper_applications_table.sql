-- Create helper_applications table for the Community Help Center
-- This table stores applications from people who want to become helpers

CREATE TABLE IF NOT EXISTS helper_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    helper_name TEXT NOT NULL,
    helper_email TEXT NOT NULL,
    helper_phone TEXT,
    helper_skills TEXT NOT NULL,
    experience TEXT,
    availability TEXT,
    background TEXT,
    motivation TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'contacted')),
    reviewed_by UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_helper_applications_status ON helper_applications(status);
CREATE INDEX IF NOT EXISTS idx_helper_applications_created_at ON helper_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_helper_applications_email ON helper_applications(helper_email);

-- Enable Row Level Security (RLS)
ALTER TABLE helper_applications ENABLE ROW LEVEL SECURITY;

-- Policies for helper_applications table
-- Allow anyone to insert (create helper applications)
CREATE POLICY "Anyone can submit helper applications" ON helper_applications
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view applications (for admin review)
CREATE POLICY "Authenticated users can view helper applications" ON helper_applications
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update applications (for status updates)
CREATE POLICY "Authenticated users can update helper applications" ON helper_applications
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Grant access to authenticated users
GRANT SELECT, INSERT, UPDATE ON helper_applications TO authenticated;