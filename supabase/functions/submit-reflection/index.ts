// supabase/functions/submit-reflection/index.ts
import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  )

  const { suggestion_id, reflection_text, user_id } = await req.json()

  const { data, error } = await supabase
    .from('reflections')
    .insert([{ suggestion_id, reflection_text, user_id }])

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  return new Response(JSON.stringify({ success: true, data }), { status: 200 })
})
