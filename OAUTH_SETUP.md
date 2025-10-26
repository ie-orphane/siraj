# 42 OAuth Setup Instructions

## 🔐 42 OAuth Configuration

This application now supports automatic authentication with 42 (Intra) OAuth when users click any "طلب انضمام جديد" button.

## 🚀 Setup Steps

### 1. Create 42 OAuth Application

1. Go to [42 Intranet](https://profile.intra.42.fr/)
2. Navigate to **Settings** → **API** → **Applications**
3. Click **"New application"**
4. Fill in the details:
   - **Name**: `Siraj Club Form`
   - **Description**: `OAuth application for Siraj Club form submissions`
   - **Redirect URI**: `http://localhost:3000/api/auth/callback/42` (for development)
   - **Redirect URI**: `https://yourdomain.com/api/auth/callback/42` (for production)
5. Click **"Create application"**
6. Copy the **Client ID** and **Client Secret**

### 2. Environment Variables

Add these to your `.env.local` file:

```env
# 42 OAuth Configuration
FORTY_TWO_CLIENT_ID=your_42_client_id_here
FORTY_TWO_CLIENT_SECRET=your_42_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Supabase Configuration (existing)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Configuration (existing)
ADMIN_EMAIL=mskerba13@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 3. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

## 🔄 How It Works

1. **Button Detection**: The app automatically detects any button with:
   - Text containing "طلب انضمام جديد", "طلب الانضمام", or "تقديم طلب الانضمام"
   - `data-join-btn` attribute

2. **Authentication Flow**:
   - User clicks a join button
   - If not authenticated → Redirects to 42 OAuth
   - If authenticated → Proceeds to join form

3. **Loading State**: Button shows "جاري التحميل..." during authentication

4. **Callback**: After successful auth, user returns to the same page

## 🎯 Supported Buttons

The following buttons automatically trigger 42 OAuth:

- **Header button**: "طلب الانضمام"
- **Hero section**: "تقديم طلب الانضمام"
- **Any button** with `data-join-btn` attribute

## 🚀 Production Deployment

### Vercel Deployment

1. Add all environment variables in Vercel dashboard
2. Update `NEXTAUTH_URL` to your production domain
3. Update 42 OAuth redirect URI to production URL

### Environment Variables for Production

```env
NEXTAUTH_URL=https://yourdomain.com
FORTY_TWO_CLIENT_ID=your_production_client_id
FORTY_TWO_CLIENT_SECRET=your_production_client_secret
NEXTAUTH_SECRET=your_production_secret
```

## 🧪 Testing

1. Start the development server: `npm run dev`
2. Click any "طلب انضمام جديد" button
3. Should redirect to 42 OAuth login
4. After login, should return to the same page
5. Check that user is authenticated in the app

## 🔧 Troubleshooting

### Common Issues

1. **"Invalid redirect URI"**:
   - Check that redirect URI in 42 OAuth app matches your domain
   - Ensure `NEXTAUTH_URL` is set correctly

2. **"Client ID not found"**:
   - Verify `FORTY_TWO_CLIENT_ID` in environment variables
   - Check that the 42 OAuth app is active

3. **"Authentication failed"**:
   - Check `FORTY_TWO_CLIENT_SECRET`
   - Verify `NEXTAUTH_SECRET` is set

4. **Buttons not triggering OAuth**:
   - Check browser console for errors
   - Verify the button text matches the detection patterns
   - Ensure `data-join-btn` attribute is present

### Debug Mode

Add this to your `.env.local` for detailed logs:

```env
NEXTAUTH_DEBUG=true
```

## 📊 Features

- ✅ **Automatic Detection**: No manual imports needed
- ✅ **Loading States**: Visual feedback during authentication
- ✅ **Error Handling**: Graceful fallback on auth failures
- ✅ **Session Management**: Persistent authentication
- ✅ **Callback URLs**: Returns to original page after auth
- ✅ **Production Ready**: Works in development and production

## 🔒 Security

- Uses secure OAuth 2.0 flow
- Session tokens are encrypted
- CSRF protection enabled
- Secure cookie settings
- Row Level Security (RLS) in Supabase
