// Supabase Edge Function: process-email-queue
// Polls the email_queue table for unsent messages and sends them via Mailgun.
// Environment variables required:
// - MAILGUN_API_KEY
// - MAILGUN_DOMAIN
// - SUPABASE_URL
// - SUPABASE_SERVICE_ROLE_KEY

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const MAILGUN_API_KEY = Deno.env.get("MAILGUN_API_KEY");
const MAILGUN_DOMAIN = Deno.env.get("MAILGUN_DOMAIN");
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

serve(async (req) => {
  // This function accepts POST or GET; designed to be called from a scheduler
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Fetch up to 50 unsent emails, oldest first
  const { data: rows, error } = await supabase
    .from('email_queue')
    .select('*')
    .eq('sent', false)
    .lt('tries', 5)
    .order('created_at', { ascending: true })
    .limit(50);

  if (error) {
    console.error('Error fetching email_queue:', error);
    return new Response('Error fetching queue', { status: 500 });
  }

  if (!rows || rows.length === 0) {
    return new Response('No emails to send', { status: 200 });
  }

  // Mailgun endpoint
  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
    console.error('Missing MAILGUN env vars');
    return new Response('Missing MAILGUN env vars', { status: 500 });
  }

  const url = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

  for (const row of rows) {
    try {
      const params = new URLSearchParams();
      params.append('from', `no-reply@${MAILGUN_DOMAIN}`);
      params.append('to', row.recipient);
      params.append('subject', row.subject || '');
      if (row.body_text) params.append('text', row.body_text);
      if (row.body_html) params.append('html', row.body_html);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa('api:' + MAILGUN_API_KEY)}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Mailgun error for', row.id, errText);
        // increment tries
        await supabase.from('email_queue').update({ tries: (row.tries || 0) + 1 }).eq('id', row.id);
        continue;
      }

      // mark sent
      await supabase.from('email_queue').update({ sent: true, sent_at: new Date().toISOString() }).eq('id', row.id);
    } catch (e) {
      console.error('Exception sending email for', row.id, e);
      await supabase.from('email_queue').update({ tries: (row.tries || 0) + 1 }).eq('id', row.id);
    }
  }

  return new Response('Processed email queue', { status: 200 });
});
