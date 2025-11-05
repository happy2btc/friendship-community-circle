-- Create help_offers table for the Community Help Center
-- This table stores offers from helpers to assist with specific help requests

CREATE TABLE IF NOT EXISTS help_offers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_id UUID NOT NULL REFERENCES help_requests(id) ON DELETE CASCADE,
    helper_email TEXT NOT NULL,
    offer_message TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_help_offers_request_id ON help_offers(request_id);
CREATE INDEX IF NOT EXISTS idx_help_offers_helper_email ON help_offers(helper_email);
CREATE INDEX IF NOT EXISTS idx_help_offers_status ON help_offers(status);
CREATE INDEX IF NOT EXISTS idx_help_offers_created_at ON help_offers(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE help_offers ENABLE ROW LEVEL SECURITY;

-- Policies for help_offers table
-- Allow anyone to insert (create help offers)
CREATE POLICY "Anyone can submit help offers" ON help_offers
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view offers (for request owners and admins)
CREATE POLICY "Authenticated users can view help offers" ON help_offers
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update offers (for status updates)
CREATE POLICY "Authenticated users can update help offers" ON help_offers
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Grant access to authenticated users
GRANT SELECT, INSERT, UPDATE ON help_offers TO authenticated;