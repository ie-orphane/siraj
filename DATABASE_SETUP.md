# Database Setup Instructions

## 📊 Database Configuration

This application now stores form submissions in a Supabase database before sending emails. This ensures data persistence even if email delivery fails.

## 🚀 Setup Steps

### 1. Create Database Table

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `database-setup.sql` file
4. Click **Run** to execute the SQL

This will create:
- `form_submissions` table with all necessary fields
- Indexes for better performance
- Row Level Security (RLS) policies
- Automatic timestamp updates

### 2. Environment Variables

Make sure your `.env.local` file includes Supabase configuration:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Configuration (existing)
ADMIN_EMAIL=mskerba13@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 3. Database Schema

The `form_submissions` table includes:

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `username` | VARCHAR(100) | Username |
| `fullname` | VARCHAR(200) | Full name |
| `email` | VARCHAR(255) | Email address |
| `team` | VARCHAR(50) | Selected team |
| `skills` | TEXT[] | Array of skills |
| `about` | TEXT | About section |
| `time_availability` | VARCHAR(20) | Time availability |
| `notes` | TEXT | Optional notes |
| `email_sent` | BOOLEAN | Email delivery status |
| `email_sent_at` | TIMESTAMP | When email was sent |
| `created_at` | TIMESTAMP | Record creation time |
| `updated_at` | TIMESTAMP | Last update time |

## 🔄 How It Works

1. **Form Submission**: User submits the join form
2. **Database Storage**: Data is immediately stored in `form_submissions` table
3. **Email Sending**: Email is sent via SMTP
4. **Status Update**: Database record is updated with email delivery status

## 📊 Admin Dashboard

Access the admin dashboard at `/dashboard` to view:
- All form submissions
- Email delivery status
- Submission timestamps
- Complete applicant information

## 🔒 Security Features

- **Row Level Security (RLS)** enabled
- **Authenticated users only** can read submissions
- **Form submissions** are allowed for anonymous users
- **Email status updates** are permitted

## 🧪 Testing

1. Submit a test form at `/join`
2. Check the database in Supabase dashboard
3. Verify email delivery
4. Check admin dashboard at `/dashboard`

## 📈 Benefits

- **Data Persistence**: All submissions are stored even if email fails
- **Email Tracking**: Know which emails were sent successfully
- **Admin Management**: View and manage all submissions
- **Backup**: Database serves as backup for all form data
- **Analytics**: Track submission patterns and team preferences

## 🚨 Troubleshooting

### Database Connection Issues
- Verify Supabase URL and keys in `.env.local`
- Check if RLS policies are correctly set
- Ensure table was created successfully

### Email Issues
- Check SMTP configuration
- Verify email delivery status in database
- Check console logs for email errors

### Admin Access
- Ensure user is authenticated
- Check RLS policies for dashboard access
