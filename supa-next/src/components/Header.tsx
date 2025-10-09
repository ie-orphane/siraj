import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Right side - Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-sm flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" width={100} height={100} />
          </div>
        </div>
        
        
        {/* Left side - Join button */}
        <Button
          variant="default"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-md"
        >
          طلب الانضمام
        </Button>
      </div>

    </header>
  )
}
