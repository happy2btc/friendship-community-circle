const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key] = value.replace(/['"]/g, '');
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function checkRecords() {
  try {
    const result = await supabase.from('positive_impact').select('*');
    console.log('Records found:', result.data ? result.data.length : 0);
    if (result.data && result.data.length > 0) {
      console.log('Latest record:', result.data[result.data.length - 1]);
    }
    if (result.error) {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

checkRecords();