import { Footer } from "@/components/footer";
import { Header } from "@/components/Header";
import LoginButton from "@/components/login-button";
import { checkFormCompletionStatus } from "@/lib/form-status";
import { redirect } from "next/navigation";

export default async function Page() {
  const formStatus = await checkFormCompletionStatus();
  if (formStatus.isLoggedIn) redirect("/");

  return (
    <>
      <Header />
      <main className="min-h-[75vh] mt-20 flex items-center justify-center bg-background">
        <div className="mx-auto max-w-xl p-6 flex flex-col gap-6 items-center w-full">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground font-kufam">
              مرحباً بك في نادي سراج
            </h1>

            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg mb-2">
              سجل دخولك باستخدام حساب 42 للانضمام إلى النادي.
            </p>
          </div>

          <LoginButton />
        </div>
      </main>
      <Footer />
    </>
  );
}
