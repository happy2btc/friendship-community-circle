import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role key for admin access
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get all profiles with full_name
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('id, full_name')
      .not('full_name', 'is', null)
      .neq('full_name', '')

    if (profilesError) {
      throw new Error('Failed to fetch profiles: ' + profilesError.message)
    }

    // Get user emails from auth.users
    const contacts = []

    for (const profile of profiles) {
      try {
        const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(profile.id)

        if (userError) {
          console.warn(`Could not get email for user ${profile.id}:`, userError.message)
          continue
        }

        if (userData?.user?.email) {
          contacts.push({
            name: profile.full_name,
            email: userData.user.email
          })
        }
      } catch (err) {
        console.warn(`Error getting email for user ${profile.id}:`, err)
      }
    }

    // Sort contacts by name
    contacts.sort((a, b) => a.name.localeCompare(b.name))

    return new Response(
      JSON.stringify({
        success: true,
        contacts: contacts,
        count: contacts.length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in get-contact-list function:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})