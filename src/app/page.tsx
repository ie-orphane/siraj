import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Footer } from "@/components/footer"
import { BackgroundPattern } from "@/components/background-pattern"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <BackgroundPattern />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Footer />
      </div>
    </main>
  )
}
