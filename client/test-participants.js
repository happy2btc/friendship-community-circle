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

  // Test the new query approach
  console.log('Testing new query approach...');
  const { data: participantsData, error: participantsDataError } = await supabase
    .from('group_project_participants')
    .select('user_id, joined_at')
    .limit(1);

  console.log('Participants data query:', participantsData, participantsDataError);

  if (participantsData && participantsData.length > 0) {
    const participant = participantsData[0];
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', participant.user_id)
      .single();

    console.log('Profile lookup result:', { participant, profile, profileError });
  }

  console.log('Table structure test passed:', !participantsError && !profilesError);
}

// Run the test
testParticipantsTable();