// Simple 42 OAuth implementation without NextAuth
export const FORTY_TWO_OAUTH_CONFIG = {
  clientId: process.env.FORTY_TWO_CLIENT_ID!,
  clientSecret: process.env.FORTY_TWO_CLIENT_SECRET!,
  redirectUri: process.env.NODE_ENV === 'production' 
    ? `${process.env.NEXTAUTH_URL}/api/auth/callback/42`
    : 'http://localhost:3000/api/auth/callback/42',
  authorizationUrl: 'https://api.intra.42.fr/oauth/authorize',
  tokenUrl: 'https://api.intra.42.fr/oauth/token',
  userInfoUrl: 'https://api.intra.42.fr/v2/me',
}

// Debug environment variables
console.log('Environment Variables Debug:')
console.log('- FORTY_TWO_CLIENT_ID:', process.env.FORTY_TWO_CLIENT_ID)
console.log('- FORTY_TWO_CLIENT_SECRET:', process.env.FORTY_TWO_CLIENT_SECRET ? 'SET' : 'NOT SET')
console.log('- NEXTAUTH_URL:', process.env.NEXTAUTH_URL)

export function get42AuthUrl(state?: string): string {
  const params = new URLSearchParams({
    client_id: FORTY_TWO_OAUTH_CONFIG.clientId,
    redirect_uri: FORTY_TWO_OAUTH_CONFIG.redirectUri,
    response_type: 'code',
    scope: 'public',
    ...(state && { state }),
  })
  
  const authUrl = `${FORTY_TWO_OAUTH_CONFIG.authorizationUrl}?${params.toString()}`
  
  // Debug logging
  console.log('42 OAuth Debug Info:')
  console.log('- Client ID:', FORTY_TWO_OAUTH_CONFIG.clientId)
  console.log('- Redirect URI:', FORTY_TWO_OAUTH_CONFIG.redirectUri)
  console.log('- Auth URL:', authUrl)
  
  return authUrl
}

export async function exchangeCodeForToken(code: string): Promise<{ access_token: string }> {
  const response = await fetch(FORTY_TWO_OAUTH_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: FORTY_TWO_OAUTH_CONFIG.clientId,
      client_secret: FORTY_TWO_OAUTH_CONFIG.clientSecret,
      code,
      redirect_uri: FORTY_TWO_OAUTH_CONFIG.redirectUri,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to exchange code for token')
  }

  return response.json()
}

export async function getUserInfo(accessToken: string): Promise<{ id: number; displayname?: string; login: string; email: string; image?: { link: string } }> {
  const response = await fetch(FORTY_TWO_OAUTH_CONFIG.userInfoUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to get user info')
  }

  return response.json()
}
