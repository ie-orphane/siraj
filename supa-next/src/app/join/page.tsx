import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { JoinForm } from "@/components/join-form"

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <JoinForm />
      </main>
      <Footer />
    </div>
  )
}
