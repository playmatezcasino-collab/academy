-- Add optional name and phone columns to subscribers table.
-- Both are nullable: organic/social traffic may submit neither,
-- and the name field on the form is optional to protect conversion.
ALTER TABLE subscribers
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS phone text;