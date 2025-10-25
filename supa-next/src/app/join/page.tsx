import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { JoinForm } from "@/components/join-form"
import { BackgroundPattern } from "@/components/background-pattern"
import { checkFormCompletionStatus } from "@/lib/form-status"
import { redirect } from "next/navigation"

export default async function JoinPage() {
  const formStatus = await checkFormCompletionStatus()

  // If user is not logged in, redirect to login
  if (!formStatus.isLoggedIn) {
    redirect('/login')
  }

  // If user has already submitted the form, redirect to success page
  if (formStatus.hasSubmittedForm) {
    redirect('/succ-join')
  }

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundPattern />
      <div className="relative z-10">
        <Header />
        <main className="pt-24">
          <JoinForm />
        </main>
        <Footer />
      </div>
    </div>
  )
}
