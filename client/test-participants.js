// Test script to check group_project_participants table
// Run this in browser console on the group-projects page

async function testParticipantsTable() {
  console.log('=== Testing Participants Table ===');

  // Check if user is logged in
  const { data: userData, error: userError } = await supabase.auth.getUser();
  console.log('User data:', userData);
  console.log('User error:', userError);

  if (!userData?.user) {
    console.log('❌ User not logged in!');
    return;
  }

  // Test selecting from participants table
  const { data: participants, error: participantsError } = await supabase
    .from('group_project_participants')
    .select('*')
    .limit(5);

  console.log('Participants table test:');
  console.log('Data:', participants);
  console.log('Error:', participantsError);

  // Test inserting a record (don't actually insert, just test)
  console.log('Table structure test passed:', !participantsError);

  // Check profiles table
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('id', userData.user.id)
    .single();

  console.log('Profiles test:');
  console.log('Profile data:', profiles);
  console.log('Profile error:', profilesError);
}

// Run the test
testParticipantsTable();