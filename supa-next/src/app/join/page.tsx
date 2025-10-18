import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { JoinForm } from "@/components/join-form"
import { BackgroundPattern } from "@/components/background-pattern"

export default function JoinPage() {
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
