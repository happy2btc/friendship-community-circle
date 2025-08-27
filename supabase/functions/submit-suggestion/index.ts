// supabase/functions/submit-suggestion/index.ts
import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  )

  const { title, description, status } = await req.json()
  const id = title.toLowerCase().replace(/\s+/g, '-')

  const { data, error } = await supabase
    .from('suggestions')
    .insert([{ id, title, description, status }])

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  return new Response(JSON.stringify({ success: true, data }), { status: 200 })
})
