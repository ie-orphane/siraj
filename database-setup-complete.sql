-- Complete database setup for the form submissions system
-- Run this in your Supabase SQL editor

-- Create the form_submissions table
CREATE TABLE IF NOT EXISTS public.form_submissions (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    fullname TEXT NOT NULL,
    email TEXT NOT NULL,
    team TEXT NOT NULL,
    skills TEXT[] NOT NULL,
    about TEXT NOT NULL,
    time_availability TEXT NOT NULL,
    notes TEXT,
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at TIMESTAMP WITH TIME ZONE,
    form_completed BOOLEAN DEFAULT FALSE,
    form_completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_user_id ON public.form_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON public.form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON public.form_submissions(created_at);

-- Create a unique constraint to prevent duplicate submissions from the same user
ALTER TABLE public.form_submissions 
ADD CONSTRAINT IF NOT EXISTS unique_user_submission UNIQUE (user_id);

-- Enable Row Level Security
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can insert their own submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Users can update their own submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.form_submissions;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.form_submissions;
DROP POLICY IF EXISTS "Enable update for all users" ON public.form_submissions;

-- Create new policies for user-based access
CREATE POLICY "Users can view their own submissions" ON public.form_submissions
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Authenticated users can insert their own submissions" ON public.form_submissions
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own submissions" ON public.form_submissions
    FOR UPDATE USING (auth.uid()::text = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_form_submissions_updated_at ON public.form_submissions;
CREATE TRIGGER update_form_submissions_updated_at
    BEFORE UPDATE ON public.form_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON public.form_submissions TO authenticated;
GRANT ALL ON public.form_submissions TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.form_submissions_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.form_submissions_id_seq TO anon;
