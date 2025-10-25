'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  const isJoinPage = pathname === "/"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="w-10 h-10 rounded-sm flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
              <img src="/logo.svg" alt="Logo" width={100} height={100} />
            </div>
          </Link>
        </div>

        {isJoinPage && (
          <Link href="/join">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-md"
              data-join-btn
            >
              طلب الانضمام
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}
