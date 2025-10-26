import { Footer } from "@/components/footer";
import { BackgroundPattern } from "@/components/background-pattern";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/Header";
import { checkFormCompletionStatus } from "@/lib/form-status";
import { redirect } from "next/navigation";

export default async function SuccJoin() {
  const formStatus = await checkFormCompletionStatus();

  // If user is not logged in, redirect to login
  if (!formStatus.isLoggedIn) {
    redirect("/login");
  }

  // If user hasn't submitted the form yet, redirect to join page
  if (!formStatus.hasSubmittedForm) {
    redirect("/join");
  }

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <BackgroundPattern />
      <div className="relative z-10 flex-1 flex flex-col ">
        <Header />

        {/* Main Content - Centered */}
        <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
          <div className="container mx-auto max-w-2xl text-center">
            {/* Success Message */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground font-kufam">
              شكراً لتقديمك!
            </h1>

            <p className="text-base mb-10 md:text-lg text-foreground/70 leading-relaxed">
              سنتواصل معك قريباً بعد مراجعة طلبك بإذن الله.
            </p>

            {/* Return Button */}
            <Link href="/">
              <Button>الرجوع إلى الرئيسية</Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
