-- Copy this entire code and paste it into your Supabase SQL Editor
-- Then click "Run" to create the table

CREATE TABLE public.form_submissions (
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

-- Add unique constraint
ALTER TABLE public.form_submissions 
ADD CONSTRAINT unique_user_submission UNIQUE (user_id);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own submissions" ON public.form_submissions
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Authenticated users can insert their own submissions" ON public.form_submissions
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own submissions" ON public.form_submissions
    FOR UPDATE USING (auth.uid()::text = user_id);

-- Grant permissions
GRANT ALL ON public.form_submissions TO authenticated;
GRANT ALL ON public.form_submissions TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.form_submissions_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.form_submissions_id_seq TO anon;
