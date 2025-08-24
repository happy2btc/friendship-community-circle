// index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const body = await req.json();
  const { title, description } = body;

  if (!title || !description) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  // TODO: Insert into Supabase DB using REST or client
  return new Response(JSON.stringify({ message: "📝 Suggestion received and remembered." }), {
    headers: { "Content-Type": "application/json" },
  });
});
