import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background border-b-2 border-primary/10">
            <div className="container mx-auto flex h-20 items-center px-8 relative">
                {/* Left: Classic Logomark */}
                <div className="flex-1 flex justify-start">
                    <Link to="/" className="flex flex-col items-start group">
                        <span className="font-['Playfair_Display'] font-black text-2xl tracking-tight leading-none text-primary group-hover:opacity-80 transition-opacity">
                            CA MONK.
                        </span>
                        <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-medium">
                            Journal
                        </span>
                    </Link>
                </div>

                {/* Center: Navigation (Serif, elegant spacing) */}
                <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-10 text-sm font-medium text-foreground/80">
                    <Link to="/" className="border-b-2 border-transparent hover:border-primary hover:text-primary transition-all py-1 font-serif italic">Blog</Link>
                    <Link to="#" className="border-b-2 border-transparent hover:border-primary hover:text-primary transition-all py-1 font-serif">Podcasts</Link>
                    <Link to="#" className="border-b-2 border-transparent hover:border-primary hover:text-primary transition-all py-1 font-serif">Events</Link>
                    <Link to="#" className="border-b-2 border-transparent hover:border-primary hover:text-primary transition-all py-1 font-serif">Membership</Link>
                </nav>

                {/* Right: Actions */}
                <div className="flex-1 flex justify-end items-center space-x-4">
                    <Button variant="ghost" size="icon" className="text-foreground hover:bg-primary/5">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button asChild className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-serif italic tracking-wide">
                        <Link to="/create">Write Article</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
