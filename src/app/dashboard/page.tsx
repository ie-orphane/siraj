import { createClient } from '@/lib/supabase/server'
import { signOut } from '../actions'
import { getSession } from '@/lib/session'

export default async function Dashboard() {
  const session = await getSession()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!session && !user) {
    // In a real app you'd redirect with headers in a middleware or use a route handler
    return <a href="/login" className="underline">Go to login</a>
  }

  // Fetch form submissions
  const { data: submissions, error } = await supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching submissions:', error)
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard - نادي سراج</h1>
          {session && (
            <p className="text-sm text-muted-foreground mt-1">
              مرحباً، {session.user?.name || session.user?.email}
            </p>
          )}
        </div>
        <form action={signOut}>
          <button className="rounded-xl border p-2">Sign out</button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Form Submissions ({submissions?.length || 0})</h2>
        
        {submissions && submissions.length > 0 ? (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{submission.fullname}</h3>
                    <p className="text-gray-600">@{submission.username}</p>
                    <p className="text-blue-600">{submission.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(submission.created_at).toLocaleString('ar-SA', {
                        timeZone: 'Asia/Riyadh',
                        dateStyle: 'short',
                        timeStyle: 'short'
                      })}
                    </p>
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        submission.email_sent 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {submission.email_sent ? 'Email Sent' : 'Email Pending'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <p><strong>Team:</strong> {submission.team}</p>
                  <p><strong>Skills:</strong> {submission.skills.join(', ')}</p>
                  <p><strong>Time Availability:</strong> {submission.time_availability}</p>
                  <p><strong>About:</strong> {submission.about}</p>
                  {submission.notes && (
                    <p><strong>Notes:</strong> {submission.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No form submissions yet.</p>
        )}
      </div>
    </main>
  )
}
