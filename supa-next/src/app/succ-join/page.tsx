import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { BackgroundPattern } from "@/components/background-pattern"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SuccJoin() {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundPattern />
      <div className="relative z-10">
        <Header />
        <main className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-2xl text-center">
            {/* Success Message */}
            <h1 
              className="text-5xl md:text-6xl font-bold mb-8 text-foreground" 
              style={{ fontFamily: "var(--font-amiri)" }}
            >
              !شكراً لتقديمك
            </h1>
            
            <div className="space-y-4 mb-12">
              <p className="text-lg text-foreground/80 leading-relaxed">
                سنتواصل معك قريباً بعد مراجعة طلبك بإذن الله.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                تابعنا على وسائل التواصل لمواكبة جديدنا.
              </p>
            </div>

            {/* Return Button */}
            <Link href="/">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-12 py-6 text-lg rounded-lg"
              >
                الرجوع إلى الرئيسية
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
