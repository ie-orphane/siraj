-- Verify database setup
-- Run this after running setup-database.sql to confirm everything is working

-- Check if table exists
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'form_submissions' 
ORDER BY ordinal_position;

-- Check constraints
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'form_submissions';

-- Check policies
SELECT policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'form_submissions';
