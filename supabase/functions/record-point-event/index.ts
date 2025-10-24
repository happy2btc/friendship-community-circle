// Simple Supabase Edge Function (Deno) to securely record a member point event.
// Expects JSON body: { profile_id, display_name, action, meta, points }
// Requires environment variables set for deployment:
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY

import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  try {
    if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

    const body = await req.json().catch(() => ({}));
    const type = body?.type || 'record-event';

    // 1) Record a member point event (existing behavior)
    if (type === 'record-event') {
      const { profile_id = null, display_name = null, action = null, meta = null, points = 0 } = body || {};
      if (!action) return new Response(JSON.stringify({ error: 'Missing required field: action' }), { status: 400 });
      const payload = { profile_id, display_name, action, meta, points };
      const { data, error } = await supabase.from('member_point_events').insert([payload]).select();
      if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      return new Response(JSON.stringify({ data }), { status: 200 });
    }

    // 2) Map a visitor_id to a profile_id (upsert into visitor_mappings and optionally update historic site_visits)
    if (type === 'map-visitor') {
      const { visitor_id, profile_id } = body || {};
      if (!visitor_id || !profile_id) return new Response(JSON.stringify({ error: 'Missing visitor_id or profile_id' }), { status: 400 });

      // upsert mapping
      const { error: upsertErr } = await supabase.from('visitor_mappings').upsert([{ visitor_id, profile_id, created_at: new Date().toISOString() }], { onConflict: 'visitor_id' });
      if (upsertErr) return new Response(JSON.stringify({ error: upsertErr.message }), { status: 500 });

      // update historic site_visits rows that match visitor_id and don't have profile_id set
      const { error: updErr } = await supabase.from('site_visits').update({ profile_id }).eq('visitor_id', visitor_id).is('profile_id', null);
      if (updErr) console.warn('site_visits update warning', updErr.message);

      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // 3) Sync local visits: accept an array of visit objects and insert into site_visits
    if (type === 'sync-visits') {
      const visits = Array.isArray(body?.visits) ? body.visits : [];
      if (visits.length === 0) return new Response(JSON.stringify({ error: 'No visits provided' }), { status: 400 });

      // insert in a single batch (be mindful of row limits)
      const { data, error } = await supabase.from('site_visits').insert(visits).select();
      if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      return new Response(JSON.stringify({ data }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: 'Unknown request type' }), { status: 400 });
  } catch (err) {
    console.error('Function error', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
