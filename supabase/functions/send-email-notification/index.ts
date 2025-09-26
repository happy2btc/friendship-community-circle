// Supabase Edge Function: send-email-notification
// Sends an email via Mailgun using fetch (native API)
// Expects POST with JSON: { to, subject, text }

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILGUN_API_KEY = Deno.env.get("MAILGUN_API_KEY");
const MAILGUN_DOMAIN = Deno.env.get("MAILGUN_DOMAIN");

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { to, subject, text } = body;
  if (!to || !subject || !text) {
    return new Response("Missing required fields", { status: 400 });
  }

  const url = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
  const params = new URLSearchParams({
    from: `no-reply@${MAILGUN_DOMAIN}`,
    to,
    subject,
    text,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa("api:" + MAILGUN_API_KEY)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    return new Response(`Mailgun error: ${error}`, { status: 500 });
  }

  return new Response("Email sent successfully", { status: 200 });
});
