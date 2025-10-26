-- Fix Row Level Security policies
-- Copy and paste this into your Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can insert their own submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Users can update their own submissions" ON public.form_submissions;

-- Create new policies that work with our custom OAuth system
CREATE POLICY "Enable read access for all users" ON public.form_submissions
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.form_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON public.form_submissions
    FOR UPDATE USING (true);

-- Also try disabling RLS temporarily to test
-- ALTER TABLE public.form_submissions DISABLE ROW LEVEL SECURITY;

