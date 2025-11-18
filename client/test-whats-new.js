import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const envContent = readFileSync('.env', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key] = value.replace(/['"]/g, '');
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function testWhatsNewQuery() {
  try {
    console.log('Testing what\'s new query for positive_impact...');

    // Simulate the cutoff date (14 days ago)
    const windowDays = 14;
    const cutoffDate = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000);
    const cutoff = cutoffDate.toISOString().split('.')[0] + 'Z';

    console.log('Cutoff date:', cutoff);

    const result = await supabase
      .from('positive_impact')
      .select('id, date, type, details')
      .gte('date', cutoff);

    console.log('Query result:', result);

    if (result.data && result.data.length > 0) {
      console.log('Found records:');
      result.data.forEach(record => {
        console.log(`- ${record.type}: ${record.details} (${record.created_at})`);
      });
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

testWhatsNewQuery();