Record Point Event Edge Function (deprecated recording)

Purpose
-------
This Edge Function previously recorded member point events into a dedicated table. That behavior has been deprecated: the Circle Pulse UI now aggregates recent activity directly from the canonical tables (agreement_votes, suggestions, comments, celebrations, events, group_projects, writers_wall, etc.).

What this function now does
--------------------------
- map-visitor: upsert a mapping from a client-generated visitor_id to a `profile_id` and optionally update historic `site_visits` rows.
- sync-visits: accept an array of local visit objects and insert them into `site_visits` in a single batch.

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
Supported request types (POST JSON with a `type` field):

- Map a visitor to a profile (upsert):

```json
{
  "type": "map-visitor",
  "visitor_id": "v-...",
# record-point-event (deprecated)

This function's code has been removed from the repository. It previously provided `map-visitor` and `sync-visits` utilities and also contained a deprecated `record-event` action.

If you require the previous behaviors, reintroduce a new function with explicit intent and deployment instructions. The Circle Pulse UI now aggregates activity client-side and does not rely on server-side point-event recording.

This README was shortened to reflect that the function is deprecated and its code removed from the source tree.
{
