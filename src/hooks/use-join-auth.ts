'use client'

import { useEffect, useCallback, useState } from 'react'
import { toast } from 'sonner'

export function useJoinAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session')
        const session = await response.json()
        setIsAuthenticated(!!session?.user)
      } catch (error) {
        console.error('Error checking auth:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleJoinClick = useCallback(async (event: Event) => {
    const target = event.target as HTMLElement
    
    // Check if the button has the join text or data attribute
    const isJoinButton = 
      target.textContent?.includes('طلب انضمام جديد') ||
      target.textContent?.includes('طلب الانضمام') ||
      target.textContent?.includes('تقديم طلب الانضمام') ||
      target.hasAttribute('data-join-btn')

    if (!isJoinButton) return

    // Prevent default navigation
    event.preventDefault()
    event.stopPropagation()

    // If user is already authenticated, allow normal navigation
    if (isAuthenticated) {
      const link = target.closest('a')
      if (link) {
        window.location.href = link.href
      }
      return
    }

    // Show loading state
    const button = target.closest('button') || target
    const originalText = button.textContent
    const originalDisabled = button.hasAttribute('disabled')
    
    button.setAttribute('aria-busy', 'true')
    button.setAttribute('disabled', 'true')
    if (button.textContent) {
      button.textContent = 'جاري التحميل...'
    }

    try {
      // Get current URL for state parameter
      const currentUrl = window.location.href
      const state = encodeURIComponent(currentUrl)
      
      // Redirect to server-side OAuth endpoint
      const authUrl = `/api/auth/42?state=${state}`
      window.location.href = authUrl
    } catch (error) {
      console.error('Authentication error:', error)
      
      // Restore button state
      button.removeAttribute('aria-busy')
      button.removeAttribute('disabled')
      if (originalText) {
        button.textContent = originalText
      }
      if (!originalDisabled) {
        button.removeAttribute('disabled')
      }
      
      toast.error('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.')
    }
  }, [isAuthenticated])

  useEffect(() => {
    // Add event listener to document for event delegation
    document.addEventListener('click', handleJoinClick, true)
    
    return () => {
      document.removeEventListener('click', handleJoinClick, true)
    }
  }, [handleJoinClick])

  return {
    isAuthenticated,
    isLoading
  }
}
