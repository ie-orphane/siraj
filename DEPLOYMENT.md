# Vercel Deployment Guide

This guide will help you deploy your Next.js application to Vercel with all the necessary configurations.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A Supabase project
3. A 42 School OAuth application

## Step 1: Prepare Your Repository

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

## Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com) and sign in**
2. **Click "New Project"**
3. **Import your Git repository**
4. **Configure the project:**
   - Framework Preset: Next.js
   - Root Directory: `supa-next` (if your project is in a subdirectory)
   - Build Command: `npm run build`
   - Output Directory: `.next`

## Step 3: Configure Environment Variables

In your Vercel project dashboard, go to **Settings > Environment Variables** and add the following:

### Required Environment Variables

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 42 School OAuth Configuration
FORTY_TWO_CLIENT_ID=your_42_client_id
FORTY_TWO_CLIENT_SECRET=your_42_client_secret

# Next.js Configuration
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret_key
```

### Optional Environment Variables (for email functionality)

```bash
# Email Configuration
ADMIN_EMAIL=your_admin_email@example.com
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

## Step 4: Update OAuth Configuration

1. **Update your 42 School OAuth application:**
   - Go to your 42 School OAuth application settings
   - Update the redirect URI to: `https://your-domain.vercel.app/api/auth/callback/42`

2. **Update the NEXTAUTH_URL environment variable:**
   - Set it to your Vercel domain: `https://your-domain.vercel.app`

## Step 5: Deploy

1. **Click "Deploy" in Vercel**
2. **Wait for the deployment to complete**
3. **Test your application**

## Step 6: Post-Deployment Setup

### Database Setup

1. **Run the database setup scripts in your Supabase SQL editor:**
   - Execute `CREATE_TABLE.sql`
   - Execute `FIX_RLS.sql` (if needed)

2. **Verify your database tables:**
   - Check that `form_submissions` table exists
   - Verify RLS policies are properly configured

### Testing

1. **Test the OAuth flow:**
   - Visit your deployed application
   - Click "Login with 42"
   - Complete the OAuth flow

2. **Test form submission:**
   - Log in to your application
   - Fill out the join form
   - Verify the submission is stored in the database

## Troubleshooting

### Common Issues

1. **OAuth redirect errors:**
   - Ensure the redirect URI in your 42 OAuth app matches your Vercel domain
   - Check that `NEXTAUTH_URL` is set correctly

2. **Database connection issues:**
   - Verify Supabase environment variables are correct
   - Check that your Supabase project is active

3. **Build failures:**
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`

### Environment Variables Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- [ ] `FORTY_TWO_CLIENT_ID` - Your 42 OAuth client ID
- [ ] `FORTY_TWO_CLIENT_SECRET` - Your 42 OAuth client secret
- [ ] `NEXTAUTH_URL` - Your Vercel domain (https://your-domain.vercel.app)
- [ ] `NEXTAUTH_SECRET` - A random secret key for NextAuth
- [ ] `ADMIN_EMAIL` - Email for form notifications (optional)
- [ ] `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - SMTP settings (optional)

## Security Notes

1. **Never commit environment variables to your repository**
2. **Use strong, unique secrets for production**
3. **Regularly rotate your OAuth secrets**
4. **Enable RLS (Row Level Security) in Supabase**

## Monitoring

1. **Check Vercel Analytics** for performance metrics
2. **Monitor Supabase usage** in your dashboard
3. **Set up error tracking** (consider Sentry or similar)

## Support

If you encounter issues:
1. Check the Vercel deployment logs
2. Verify all environment variables are set correctly
3. Test the OAuth flow step by step
4. Ensure your Supabase database is properly configured
