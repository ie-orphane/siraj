'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handle42Login = async () => {
    setIsLoading(true)
    try {
      const authUrl = '/api/auth/42'
      window.location.href = authUrl
    } catch (error) {
      console.error('Login error:', error)
      toast.error('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="mx-auto max-w-md p-6 space-y-6 w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">مرحباً بك في نادي سراج</h1>
          <p className="text-muted-foreground mb-8">
            سجل دخولك باستخدام حساب 42 للانضمام إلى النادي
          </p>
        </div>

        <Button
          onClick={handle42Login}
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-lg"
          aria-busy={isLoading}
        >
          {isLoading ? 'جاري التحميل...' : 'تسجيل الدخول بحساب 42'}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          <p>سيتم توجيهك إلى صفحة تسجيل الدخول في 42</p>
        </div>
      </div>
    </main>
  )
}
