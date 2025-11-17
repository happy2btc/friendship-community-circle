-- Create skill_shares table for the skill sharing feature
CREATE TABLE IF NOT EXISTS skill_shares (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    skill_name TEXT NOT NULL,
    skill_description TEXT,
    presenter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE skill_shares ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view skill shares" ON skill_shares
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert skill shares" ON skill_shares
    FOR INSERT WITH CHECK (auth.uid() = presenter_id);

CREATE POLICY "Users can update their own skill shares" ON skill_shares
    FOR UPDATE USING (auth.uid() = presenter_id);

CREATE POLICY "Users can delete their own skill shares" ON skill_shares
    FOR DELETE USING (auth.uid() = presenter_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_skill_shares_updated_at
    BEFORE UPDATE ON skill_shares
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();