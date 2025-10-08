-- Table for Writer's Wall with user profile linkage
CREATE TABLE writers_wall (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
    author_name text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    points int NOT NULL
);

-- RLS Policies
ALTER TABLE writers_wall ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read posts
CREATE POLICY "Allow read for all" ON writers_wall
    FOR SELECT USING (true);

-- Policy: Only authenticated users can insert
CREATE POLICY "Allow insert for authenticated" ON writers_wall
    FOR INSERT USING (auth.role() = 'authenticated');

-- Policy: Only the author can update/delete their own posts
CREATE POLICY "Allow update/delete by author" ON writers_wall
    FOR UPDATE USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Allow delete by author" ON writers_wall
    FOR DELETE USING (auth.uid() = author_id);
