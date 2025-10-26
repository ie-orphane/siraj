import { NextRequest, NextResponse } from 'next/server'
import { get42AuthUrl } from '@/lib/oauth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const state = searchParams.get('state')
    
    const authUrl = get42AuthUrl(state || undefined)
    
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('OAuth redirect error:', error)
    return NextResponse.redirect(new URL('/login?error=oauth_error', request.url))
  }
}
