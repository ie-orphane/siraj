# Quick Setup Guide - Fix the Error

## 🚨 Current Error
```
[Error [TypeError]: Cannot read properties of undefined (reading 'custom')]
```

This error occurs because the environment variables are not properly configured.

## 🔧 **IMMEDIATE FIX**

### 1. Update your `.env.local` file with these values:

```env
# Email Configuration (already set)
ADMIN_EMAIL=mskerba13@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mskerba13@gmail.com
SMTP_PASS="uhhi nagg tdzy vqpn"

# 42 OAuth Configuration - REPLACE THESE
FORTY_TWO_CLIENT_ID=your_42_client_id_here
FORTY_TWO_CLIENT_SECRET=your_42_client_secret_here

# NextAuth Configuration - REPLACE THESE
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=HJst4WfAbUWA+2uI2cxNHszUq8iJ4fvsV0t57naveyM=

# Supabase Configuration - REPLACE THESE
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### 2. **REQUIRED ACTIONS:**

#### A. Get 42 OAuth Credentials:
1. Go to [42 Intranet](https://profile.intra.42.fr/)
2. Settings → API → Applications → New application
3. Name: `Siraj Club Form`
4. Redirect URI: `http://localhost:3000/api/auth/callback/42`
5. Copy Client ID and Client Secret

#### B. Get Supabase Credentials:
1. Go to your Supabase project dashboard
2. Settings → API
3. Copy:
   - Project URL
   - anon/public key
   - service_role key

### 3. **Replace in .env.local:**
- `your_42_client_id_here` → Your 42 Client ID
- `your_42_client_secret_here` → Your 42 Client Secret
- `your_supabase_url_here` → Your Supabase URL
- `your_supabase_anon_key_here` → Your Supabase anon key
- `your_supabase_service_role_key_here` → Your Supabase service role key

## 🧪 **Test the Fix:**

1. **Update the environment variables**
2. **Restart the development server:**
   ```bash
   npm run dev
   ```
3. **Check if the error is gone**

## 🔍 **If Still Getting Errors:**

The error might be due to missing Supabase adapter. Let me know if you need me to:
1. Remove the Supabase adapter temporarily
2. Use a simpler NextAuth configuration
3. Set up a basic OAuth flow without database storage

## 📞 **Quick Help:**

If you're still getting errors, please:
1. Share your updated `.env.local` (without sensitive values)
2. Let me know which step you're stuck on
3. I'll help you fix it step by step
