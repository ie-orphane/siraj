'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function LoginPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const signInWithMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    setLoading(false)
    if (error) alert(error.message)
    else alert('Check your email for the magic link!')
  }

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' })
    if (error) alert(error.message)
  }

  return (
    <main className="mx-auto max-w-md p-6 space-y-6">
      <h1 className="text-2xl font-bold">Sign in</h1>

      <form onSubmit={signInWithMagicLink} className="space-y-3">
        <input
          className="w-full border rounded-xl p-3"
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />
        <button className="w-full rounded-xl p-3 border" disabled={loading}>
          {loading ? 'Sending…' : 'Send magic link'}
        </button>
      </form>

      <div className="text-center text-sm opacity-70">or</div>

      <button onClick={signInWithGitHub} className="w-full rounded-xl p-3 border">
        Continue with GitHub
      </button>
    </main>
  )
}
