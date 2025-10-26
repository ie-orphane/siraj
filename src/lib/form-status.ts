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
      .from('form_submissions')
      .select('id, created_at')
      .eq('user_id', session.user.id)
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

export async function markFormAsCompleted(userId: string) {
  try {
    const supabase = await createClient()
    
    // Update the form submission to mark as completed
    const { error } = await supabase
      .from('form_submissions')
      .update({ form_completed: true, form_completed_at: new Date().toISOString() })
      .eq('user_id', userId)

    if (error) {
      console.error('Error marking form as completed:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error marking form as completed:', error)
    return false
  }
}
