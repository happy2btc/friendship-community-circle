import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const envContent = readFileSync('.env', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key] = value.replace(/['"]/g, '');
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function testCirclePulseQuery() {
  try {
    console.log('Testing Circle Pulse query for positive_impact...');

    const result = await supabase
      .from('positive_impact')
      .select('contributor_id,date,type,details,points_awarded')
      .order('date', { ascending: false })
      .limit(10);

    console.log('Query result:', result);

    if (result.data && result.data.length > 0) {
      console.log('Found records:');
      result.data.forEach(record => {
        console.log(`- ${record.type}: ${record.details} (${record.points_awarded} pts) - ${record.date}`);
      });
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

testCirclePulseQuery();