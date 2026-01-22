import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
    return (
        <section className="w-full bg-white dark:bg-background py-16 px-4 text-center select-none border-b border-primary/5 shadow-sm z-10 transition-all duration-300 ease-in-out">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight">
                    Discover Insights That Matter
                </h1>

                <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Expert perspectives on finance, technology, and innovation.
                </p>

                <div className="pt-2 flex justify-center">
                    <Button
                        size="sm"
                        className="rounded-full px-8 h-10 text-sm font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
                    >
                        View All Stories
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
