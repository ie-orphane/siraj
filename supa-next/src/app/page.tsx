import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutSection />
      <Footer />
    </main>
  )
}
