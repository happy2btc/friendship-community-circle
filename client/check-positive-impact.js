import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const env = readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) acc[key] = value.replace(/['\"]/g, '');
  return acc;
}, {});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function checkPositiveImpact() {
  try {
    const result = await supabase.from('positive_impact').select('*');
    console.log('Positive impact records:', result.data?.length || 0);
    console.log('Sample records:', result.data?.slice(0, 3));
    if (result.error) {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

checkPositiveImpact();