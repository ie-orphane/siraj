import { Footer } from "@/components/footer"
import { BackgroundPattern } from "@/components/background-pattern"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Header } from "@/components/Header"

export default function SuccJoin() {
  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <BackgroundPattern />
      <div className="relative z-10 flex-1 flex flex-col ">
        <Header />

        {/* Main Content - Centered */}
        <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
          <div className="container mx-auto max-w-2xl text-center">
            {/* Success Message */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
              style={{ fontFamily: "var(--font-amiri)" }}
            >
              !شكراً لتقديمك
            </h1>
            
            <div className="space-y-2 mb-10">
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                .سنتواصل معك قريباً بعد مراجعة طلبك بإذن الله
              </p>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                .تابعنا على وسائل التواصل لمواكبة جديدنا
              </p>
            </div>

            {/* Return Button */}
            <Link href="/">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-5 text-base rounded-lg shadow-lg hover:shadow-xl transition-all"
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
