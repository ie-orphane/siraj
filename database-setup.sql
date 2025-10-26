-- Database setup for Siraj Club form submissions
-- Run this SQL in your Supabase SQL editor

-- Create table for form submissions
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  fullname VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  team VARCHAR(50) NOT NULL,
  skills TEXT[] NOT NULL,
  about TEXT NOT NULL,
  time_availability VARCHAR(20) NOT NULL,
  notes TEXT,
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_team ON form_submissions(team);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_form_submissions_updated_at 
    BEFORE UPDATE ON form_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for form submissions)
CREATE POLICY "Allow form submissions" ON form_submissions
    FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users to read all submissions
CREATE POLICY "Allow authenticated users to read submissions" ON form_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy to allow updates for email status
CREATE POLICY "Allow email status updates" ON form_submissions
    FOR UPDATE USING (true);
