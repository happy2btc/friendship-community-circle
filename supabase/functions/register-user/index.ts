// supabase/functions/register-user/index.ts
import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  )

  const { user_id, wallet_address, display_name } = await req.json()

  const { data, error } = await supabase
    .from('user_profiles')
    .upsert([{ user_id, wallet_address, display_name }], { onConflict: 'user_id' })

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  return new Response(JSON.stringify({ success: true, data }), { status: 200 })
})
