// supabase/functions/get-suggestion-by-id/index.ts
import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

serve(async (req) => {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  if (!id) return new Response('Missing ID', { status: 400 })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  )

  const { data, error } = await supabase
    .from('suggestions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify(data), { status: 200 })
})
