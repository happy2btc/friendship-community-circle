import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project values
const supabaseUrl = 'https://guykaykkefwabnuhqcyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1eWtheWtrZWZ3YWJudWhxY3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5OTc3MTgsImV4cCI6MjA3MTU3MzcxOH0.jr-d5JffuthCIuSpYKxcm_toYNE7L071-OBIHBOR2KI';

export const supabase = createClient(supabaseUrl, supabaseKey);
