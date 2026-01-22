import { Newspaper } from "lucide-react"

export default function BlogPlaceholder() {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground animate-in fade-in zoom-in-95 duration-500 h-[calc(100vh-theme(spacing.20))]">
            <Newspaper className="h-24 w-24 mb-6 opacity-20" />
            <h2 className="text-2xl font-semibold mb-2">Select a blog</h2>
            <p className="max-w-xs">
                Choose a blog from the list on the left to read its full content here.
            </p>
        </div>
    )
}
