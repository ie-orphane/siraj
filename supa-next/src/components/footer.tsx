import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-sm flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" width={100} height={100} />
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex justify-center gap-8 mb-8 flex-wrap">
          <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
            الرئيسية
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
            انضم إلينا
          </a>
        </nav>

        {/* Social media and copyright */}
        <div className="flex justify-between items-center pt-8 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>تابعنا سراج</span>
          </div>
          <Instagram className="w-5 h-5" />
          <div>
            <span>تصميم من طرف</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
