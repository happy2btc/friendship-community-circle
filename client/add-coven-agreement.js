// Usage: node add-coven-agreement.js
// Fill in your Supabase URL, service role key, proposer_id, and Coven Community circle_id

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_SERVICE_ROLE_KEY = 'YOUR_SUPABASE_SERVICE_ROLE_KEY';
const COVEN_CIRCLE_ID = 'COVEN_COMMUNITY_ID'; // Replace with actual Coven circle_id
const PROPOSER_ID = 'YOUR_USER_ID'; // Replace with your user id

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function addAgreement() {
  const { data, error } = await supabase
    .from('agreements')
    .insert([
      {
        agreement_text: 'Sample agreement for Coven Community',
        proposer_id: PROPOSER_ID,
        status: 'voting',
        circle_id: COVEN_CIRCLE_ID
      }
    ]);
  if (error) {
    console.error('Error creating agreement:', error);
  } else {
    console.log('Agreement created:', data);
  }
}

addAgreement();
