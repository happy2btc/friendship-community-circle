// supabase/functions/register-user/index.ts
import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

serve(async (req) => {
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
  const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY!
  )

  const { user_id, wallet_address, display_name, email } = await req.json()

  const { data, error } = await supabase
    .from('user_profiles')
    .upsert([{ user_id, wallet_address, display_name }], { onConflict: 'user_id' })

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 })

  // If an email was provided, enqueue a welcome email in email_queue
  try {
    if (email) {
      const subject = 'Welcome to the Community!'
      const body_text = `Hi ${display_name || 'new member'},\n\nWelcome — we're glad you're here!`;
      await supabase.from('email_queue').insert([{ recipient: email, subject, body_text, type: 'welcome' }]);
    }
  } catch (e) {
    // non-fatal: log and continue
    console.error('Failed to enqueue welcome email', e);
  }
  return new Response(JSON.stringify({ success: true, data }), { status: 200 })
})
