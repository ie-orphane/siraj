import { Footer } from "@/components/footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <div className="relative z-10 flex-1 flex flex-col">
        <Header />

        {/* Main Content - Centered */}
        <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
          <div className="container mx-auto max-w-2xl text-center">
            {/* Success Message */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-kufam mb-6 text-foreground">
              خطأ 404
            </h1>

            <p className="text-base md:text-lg lg:text-xl mb-10 text-foreground/70 leading-relaxed">
              الصفحة التي تبحث عنها غير موجودة.
            </p>

            {/* Return Button */}
            <Link href="/">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg px-8 py-6 rounded-xl"
              >
                الرجوع إلى الرئيسية
              </Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
