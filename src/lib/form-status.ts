import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/session'

export async function checkFormCompletionStatus() {
  try {
    const session = await getSession()
    
    if (!session?.user?.id) {
      return { isLoggedIn: false, hasSubmittedForm: false }
    }

    const supabase = await createClient()
    
    // Check if user has already submitted the form
    const { data: existingSubmission, error } = await supabase
      .from('submissions')
      .select('created_at')
      .eq('id', session.user.id)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking form status:', error)
      return { isLoggedIn: true, hasSubmittedForm: false, error: true }
    }

    return {
      isLoggedIn: true,
      hasSubmittedForm: !!existingSubmission,
      submissionDate: existingSubmission?.created_at
    }
  } catch (error) {
    console.error('Error checking form completion status:', error)
    return { isLoggedIn: false, hasSubmittedForm: false, error: true }
  }
}
