"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const isJoinPage = pathname === "/";

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

        {isJoinPage && (
          <div className="flex justify-end gap-4">
            <Link href="/join">
              <Button className="bg-secondary-container hover:bg-secondary-container/90 text-secondary-on-container font-semibold px-6 rounded-md">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
