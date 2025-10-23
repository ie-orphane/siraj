import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Small badge */}
        <div className="inline-block mb-8">
          <span className="text-sm border border-primary/30 text-muted-foreground px-4 py-1.5 rounded-full">
            نادي طلابي
          </span>
        </div>

        {/* Main heading with Arabic calligraphy style */}
        <h1
          className="text-7xl md:text-8xl lg:text-9xl font-bold mb-14 tracking-tight"
          style={{ fontFamily: "var(--font-amiri)" }}
        >
          سراج
        </h1>

        {/* Quranic verse */}
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-foreground/80 mb-2" style={{ fontFamily: "var(--font-amiri)" }}>
            ﴿ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ ﴾
          </p>
          <p className="text-sm text-muted-foreground">[العصر - 3]</p>
        </div>

        {/* CTA Button */}
        <Link href="/join">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-lg"
          >
            تقديم طلب الانضمام
          </Button>
        </Link>
      </div>
    </section>
  )
}
