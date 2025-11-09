// Test script to check group_project_participants table and comments
// Run this in browser console on the group-projects page

async function testCommentsTable() {
  console.log('=== Testing Comments Table ===');

  try {
    // Try to query the comments table
    const { data: comments, error } = await supabase
      .from('group_project_comments')
      .select('*')
      .limit(1);

    if (error) {
      console.log('❌ Comments table does not exist or has issues');
      console.log('Error:', error.message);
      return false;
    } else {
      console.log('✅ Comments table exists!');
      console.log('Sample data:', comments);
      return true;
    }
  } catch (err) {
    console.log('❌ Error testing comments table:', err);
    return false;
  }
}

async function createCommentsTable() {
  console.log('=== Creating Comments Table ===');

  try {
    // This won't work with standard Supabase client, but let's try
    console.log('Note: Table creation requires Supabase dashboard access');
    console.log('Please create the table manually in your Supabase dashboard with this SQL:');

    const sql = `
CREATE TABLE group_project_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES group_projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  author_name TEXT,
  display_name TEXT,
  comment TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes
CREATE INDEX idx_group_project_comments_project_id ON group_project_comments(project_id);
CREATE INDEX idx_group_project_comments_approved ON group_project_comments(approved);
CREATE INDEX idx_group_project_comments_created_at ON group_project_comments(created_at);

-- Enable RLS
ALTER TABLE group_project_comments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view approved comments" ON group_project_comments
  FOR SELECT USING (approved = true);

CREATE POLICY "Users can insert comments" ON group_project_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all comments" ON group_project_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update comments" ON group_project_comments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );
    `;

    console.log(sql);
    return sql;
  } catch (err) {
    console.log('❌ Error:', err);
  }
}

// Run the test
testCommentsTable().then(tableExists => {
  if (!tableExists) {
    createCommentsTable();
  }
});
testParticipantsTable();