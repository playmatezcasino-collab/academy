-- SECURITY DEFINER function that returns only the total subscriber count.
-- This lets the public landing page display honest social proof without
-- exposing any email addresses (RLS blocks anon SELECT on the table itself).
CREATE OR REPLACE FUNCTION public.get_subscriber_count()
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT count(*)::integer FROM public.subscribers;
$$;

GRANT EXECUTE ON FUNCTION public.get_subscriber_count() TO anon, authenticated;