-- Add phone number column to existing form_submissions table
-- Copy and paste this into your Supabase SQL Editor

-- Add the tel column to the existing table
ALTER TABLE public.form_submissions 
ADD COLUMN IF NOT EXISTS tel TEXT;

-- Update existing records to have empty tel field (optional)
-- UPDATE public.form_submissions SET tel = '' WHERE tel IS NULL;
