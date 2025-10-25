'use client'

import { useJoinAuth } from '@/hooks/use-join-auth'

export function JoinAuthHandler() {
  useJoinAuth()
  return null // This component doesn't render anything
}
