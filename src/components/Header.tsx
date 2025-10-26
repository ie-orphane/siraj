import Link from "next/link";
import { Logo } from "./logo";
import LoginButton from "./login-button";
import Image from "next/image";
import { getSession } from "@/lib/session";
import { checkFormCompletionStatus } from "@/lib/form-status";

export async function Header() {
  const formStatus = await checkFormCompletionStatus();
  const session = await getSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 grid grid-cols-3 items-center">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo className="size-10 " />
          </Link>
        </div>

        <nav className="flex justify-center gap-6 md:gap-8 flex- text-sm md:text-base">
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            الرئيسية
          </Link>
          <Link
            href="/join"
            className="text-foreground hover:text-primary transition-colors"
          >
            انضم إلينا
          </Link>
        </nav>

        <div className="flex justify-end">
          {!formStatus.isLoggedIn ? (
            <LoginButton varient="secondary" size="sm" />
          ) : (
            <Link
              href={`https://profile.intra.42.fr/users/${session?.user.login}`}
              target="_blank"
            >
              <Image
                src={session?.user.image || ""}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border-2 border-[#0E0E0E]"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
