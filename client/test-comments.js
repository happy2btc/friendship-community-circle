// Script to check and approve comments for testing
// Run this in browser console on the group-projects page

async function checkAndApproveComments() {
  console.log('=== Checking Comments Status ===');

  try {
    // Check if user is logged in
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      console.log('❌ Please log in first');
      return;
    }

    // Get all comments (admin view)
    const { data: allComments, error: allError } = await supabase
      .from('group_project_comments')
      .select('*')
      .order('created_at', { ascending: false });

    if (allError) {
      console.log('❌ Error fetching comments:', allError);
      return;
    }

    console.log('Found', allComments?.length || 0, 'total comments:');
    allComments?.forEach((comment, index) => {
      console.log(`${index + 1}. Project: ${comment.project_id.substring(0, 8)}...`);
      console.log(`   Comment: "${comment.comment.substring(0, 50)}${comment.comment.length > 50 ? '...' : ''}"`);
      console.log(`   Approved: ${comment.approved}`);
      console.log(`   Author: ${comment.author_name}`);
      console.log('---');
    });

    // Count approved vs unapproved
    const approved = allComments?.filter(c => c.approved) || [];
    const unapproved = allComments?.filter(c => !c.approved) || [];

    console.log(`✅ Approved comments: ${approved.length}`);
    console.log(`⏳ Pending approval: ${unapproved.length}`);

    // If there are unapproved comments, offer to approve them
    if (unapproved.length > 0) {
      console.log('🔧 To approve all pending comments, run: approveAllComments()');
    }

  } catch (err) {
    console.log('❌ Error:', err);
  }
}

async function approveAllComments() {
  console.log('=== Approving All Comments ===');

  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      console.log('❌ Please log in first');
      return;
    }

    // Check if user is admin
    const uid = userData.user.id;
    const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', uid).single();

    if (!profile?.is_admin) {
      console.log('❌ You must be an admin to approve comments');
      console.log('� To make yourself an admin, run this SQL in Supabase:');
      console.log(`UPDATE profiles SET is_admin = true WHERE id = '${uid}';`);
      return;
    }

    // Approve all unapproved comments
    const { data: approvedComments, error } = await supabase
      .from('group_project_comments')
      .update({ approved: true })
      .eq('approved', false)
      .select();

    if (error) {
      console.log('❌ Error approving comments:', error);
    } else {
      console.log(`✅ Approved ${approvedComments?.length || 0} comments`);
      console.log('🔄 Refresh the page to see the approved comments');
    }

  } catch (err) {
    console.log('❌ Error:', err);
  }
}

// Make functions available globally
window.checkAndApproveComments = checkAndApproveComments;
window.approveAllComments = approveAllComments;

// Run the check
checkAndApproveComments();