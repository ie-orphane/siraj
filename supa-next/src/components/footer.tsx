import { Instagram } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 px-4 mt-auto">
      <div className="container mx-auto max-w-6xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <div className="w-14 h-14 rounded-sm flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
              <img src="/logo.svg" alt="Logo" width={100} height={100} />
            </div>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="flex justify-center gap-6 md:gap-8 mb-8 flex-wrap text-sm md:text-base">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            الرئيسية
          </Link>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            الأنشطة
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            التبرعات
          </a>
          <Link href="/join" className="text-foreground hover:text-primary transition-colors">
            انضم إلينا
          </Link>
        </nav>

        {/* Instagram icon */}
        <div className="flex justify-center mb-8">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright and credits */}
        <div className="flex justify-between items-center text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>© 2025 سراج</span>
          </div>
          <div>
            <span>صمم من طرف سراج</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
