#!/bin/bash

echo "🔐 Setting up environment variables for 42 OAuth..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    exit 1
fi

# Add OAuth variables to .env.local
echo "" >> .env.local
echo "# 42 OAuth Configuration" >> .env.local
echo "FORTY_TWO_CLIENT_ID=your_42_client_id_here" >> .env.local
echo "FORTY_TWO_CLIENT_SECRET=your_42_client_secret_here" >> .env.local
echo "" >> .env.local
echo "# NextAuth Configuration" >> .env.local
echo "NEXTAUTH_URL=http://localhost:3000" >> .env.local
echo "NEXTAUTH_SECRET=your_nextauth_secret_here" >> .env.local
echo "" >> .env.local
echo "# Supabase Configuration" >> .env.local
echo "NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here" >> .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here" >> .env.local
echo "SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here" >> .env.local

echo "✅ Environment variables added to .env.local"
echo ""
echo "📋 Next steps:"
echo "1. Replace 'your_42_client_id_here' with your actual 42 OAuth Client ID"
echo "2. Replace 'your_42_client_secret_here' with your actual 42 OAuth Client Secret"
echo "3. Replace 'your_nextauth_secret_here' with a secure random string"
echo "4. Replace Supabase variables with your actual Supabase credentials"
echo ""
echo "🔧 To generate NextAuth secret, run:"
echo "openssl rand -base64 32"
