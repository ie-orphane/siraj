import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForToken, getUserInfo } from '@/lib/oauth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    if (error) {
      console.error('OAuth error:', error)
      return NextResponse.redirect(new URL('/login?error=oauth_error', request.url))
    }

    if (!code) {
      return NextResponse.redirect(new URL('/login?error=no_code', request.url))
    }

    // Exchange code for access token
    const tokenData = await exchangeCodeForToken(code)
    const { access_token } = tokenData

    // Get user info
    const userInfo = await getUserInfo(access_token)

    // Create a simple session (you can store this in cookies or database)
    const sessionData = {
      user: {
        id: userInfo.id.toString(),
        name: userInfo.displayname || userInfo.login,
        email: userInfo.email,
        image: userInfo.image?.link,
      },
      accessToken: access_token,
    }

    // Determine redirect URL from state parameter
    const redirectUrl = state ? decodeURIComponent(state) : '/'
    
    // Set session cookie
    const response = NextResponse.redirect(new URL(redirectUrl, request.url))
    
    // Store session in cookie (simple implementation)
    response.cookies.set('42-session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(new URL('/login?error=callback_error', request.url))
  }
}
