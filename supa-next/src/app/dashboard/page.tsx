import { createClient } from '@/lib/supabase/server'
import { signOut } from '../actions'

export default async function Dashboard() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // In a real app you’d redirect with headers in a middleware or use a route handler
    return <a href="/login" className="underline">Go to login</a>
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
      <form action={signOut}>
        <button className="rounded-xl border p-2">Sign out</button>
      </form>
    </main>
  )
}
