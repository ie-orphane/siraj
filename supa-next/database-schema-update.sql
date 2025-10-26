-- Update the form_submissions table to include user tracking and form completion status
-- Run this in your Supabase SQL editor

-- Add new columns to the existing table
ALTER TABLE form_submissions 
ADD COLUMN IF NOT EXISTS user_id TEXT,
ADD COLUMN IF NOT EXISTS form_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS form_completed_at TIMESTAMP WITH TIME ZONE;

-- Create an index on user_id for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_user_id ON form_submissions(user_id);

-- Create a unique constraint to prevent duplicate submissions from the same user
-- (This will prevent users from submitting the form multiple times)
ALTER TABLE form_submissions 
ADD CONSTRAINT unique_user_submission UNIQUE (user_id);

-- Update RLS policies to include user-based access
-- Drop existing policies first
DROP POLICY IF EXISTS "Enable read access for all users" ON form_submissions;
DROP POLICY IF EXISTS "Enable insert for all users" ON form_submissions;
DROP POLICY IF EXISTS "Enable update for all users" ON form_submissions;

-- Create new policies that respect user authentication
CREATE POLICY "Users can view their own submissions" ON form_submissions
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Authenticated users can insert their own submissions" ON form_submissions
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own submissions" ON form_submissions
    FOR UPDATE USING (auth.uid()::text = user_id);

-- Enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
