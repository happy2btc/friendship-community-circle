-- Create circles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.circles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create circle_members table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.circle_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    circle_id UUID REFERENCES circles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(circle_id, user_id)
);

-- Enable Row Level Security for circles
ALTER TABLE public.circles ENABLE ROW LEVEL SECURITY;

-- Enable Row Level Security for circle_members
ALTER TABLE public.circle_members ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view circles
CREATE POLICY "Anyone can view circles" ON public.circles
    FOR SELECT USING (true);

-- Policy: Authenticated users can create circles
CREATE POLICY "Authenticated users can create circles" ON public.circles
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = created_by);

-- Policy: Circle creators can update their circles
CREATE POLICY "Circle creators can update their circles" ON public.circles
    FOR UPDATE TO authenticated
    USING (auth.uid() = created_by);

-- Policy: Anyone can view circle memberships
CREATE POLICY "Anyone can view circle memberships" ON public.circle_members
    FOR SELECT USING (true);

-- Policy: Authenticated users can join circles
CREATE POLICY "Authenticated users can join circles" ON public.circle_members
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can leave circles they're members of
CREATE POLICY "Users can leave circles" ON public.circle_members
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

-- Insert a sample circle
INSERT INTO public.circles (name, description, created_by)
VALUES ('Welcome Circle', 'A place for new members to get started and connect with the community.', NULL)
ON CONFLICT DO NOTHING;