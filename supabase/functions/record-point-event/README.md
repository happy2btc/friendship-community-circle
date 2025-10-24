Record Point Event Edge Function

Purpose
-------
This Edge Function securely records a member point event into the `member_point_events` table using your Supabase service role key.

How to deploy
-------------
1. Install the Supabase CLI (if not already):

   ```powershell
   npm install -g supabase
   ```

2. Log in and link your project (see Supabase docs).

3. Deploy the function:

   ```powershell
   supabase functions deploy record-point-event --project-ref YOUR_PROJECT_REF
   ```

4. Set required environment variables in the Supabase dashboard (or via CLI):
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY

Usage
-----
POST JSON to the function endpoint (returned by Supabase Functions after deploy):

```json
{
  "profile_id": "<uuid>",
  "display_name": "Alice",
  "action": "submitted-reflection",
  "meta": { "refId": 123 },
  "points": 5
}
```

Security
--------
This function uses the service role key and must be protected. Call it from your trusted backend or Cloudflare Worker; do not call it directly from untrusted client code.
