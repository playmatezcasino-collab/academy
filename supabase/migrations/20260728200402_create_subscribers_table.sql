/*
# Create subscribers table for Prediction Markets 101 landing page

## Purpose
Stores email addresses captured from the educational landing page at
predictionmarkets101.academy. This is a standalone lead-generation table
with no connection to any other project or database.

## New Tables
- `subscribers`
  - `id` (uuid, primary key, auto-generated)
  - `email` (text, unique, not null) — the visitor's email address
  - `created_at` (timestamptz, defaults to now) — when they subscribed

## Security (Row Level Security)
- RLS is ENABLED on `subscribers`.
- Only an INSERT policy is granted to the `anon` role, so the public
  landing-page form can submit emails without signing in.
- NO select, update, or delete policies exist for anon — the email list
  cannot be read, scraped, modified, or deleted from the client side.
- Authenticated/server-side access is intentionally not granted here;
  the table is managed exclusively through the Supabase dashboard or
  service-role key.

## Important Notes
1. The unique constraint on `email` prevents duplicate subscriptions.
  The frontend handles duplicate-insert errors gracefully.
2. This table is intentionally minimal — only what the landing page needs.
3. No foreign keys, no user_id, no auth integration — this is a public
  lead-capture form, not a signed-in application.
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Insert-only policy for the public landing page form (anon role).
-- No SELECT/UPDATE/DELETE policies are created for anon, so the list
-- cannot be read or scraped from the client.
DROP POLICY IF EXISTS "anon_insert_subscribers" ON subscribers;
CREATE POLICY "anon_insert_subscribers"
ON subscribers FOR INSERT
TO anon, authenticated
WITH CHECK (true);