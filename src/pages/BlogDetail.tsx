import { useBlog, useBlogs } from "@/hooks/useBlogs"
import { useParams, Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

export default function BlogDetail() {
    const { id } = useParams<{ id: string }>()
    const { data: blog, isLoading, error } = useBlog(id!)
    const { data: allBlogs } = useBlogs()



    if (isLoading) {
        return (
            <div className="p-12 max-w-4xl mx-auto space-y-8">
                <Skeleton className="w-full aspect-[21/9]" />
                <div className="space-y-4 max-w-2xl mx-auto">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <div className="space-y-2 pt-8">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>
        )
    }

    if (error || !blog) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <h2 className="text-3xl font-serif font-bold text-primary">Article Unavailable</h2>
                <Button asChild variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white font-serif">
                    <Link to="/">Return to Journal</Link>
                </Button>
            </div>
        )
    }


    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
        // Simple alert for now - in production use a toast
        alert("Link copied to clipboard!")
    }


    const relatedBlogs = allBlogs?.filter(b => b.id !== blog.id && b.category.some(c => blog.category.includes(c)))
        .slice(0, 3) || []

    return (
        <div className="min-h-full bg-white dark:bg-background animate-in fade-in duration-700">
            <article className="max-w-[900px] mx-auto pb-20">
                {/* Hero Section */}
                <div className="w-full relative">
                    <div className="w-full aspect-[2.4/1] overflow-hidden">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover filter saturate-[.85] contrast-[1.1]"
                        />
                    </div>
                    {/* Floating Title Card */}
                    <div className="mx-auto max-w-3xl -mt-20 relative bg-white dark:bg-card p-10 border border-primary/10 shadow-sm text-center space-y-6">
                        <div className="flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-primary/60">
                            <span>{blog.category[0]}</span>
                            <span className="w-1 h-1 bg-primary/40 rounded-full" />
                            <span>5 Min Read</span>
                        </div>

                        <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold tracking-tight text-primary leading-[1.1]">
                            {blog.title}
                        </h1>

                        <div className="h-px w-24 bg-primary/20 mx-auto" />

                        <div className="flex justify-center pt-2">
                            <Button
                                variant="outline"
                                className="rounded-none border-primary/20 hover:border-primary text-primary font-serif italic gap-2 h-10 px-6 active:bg-primary/5 transition-all"
                                onClick={handleShare}
                            >
                                <Share2 className="h-4 w-4" />
                                Share Article
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-8 md:px-16 pt-12">
                    {/* Metadata Strip */}
                    <div className="flex justify-between items-center border-t border-b border-primary/10 py-4 mb-12 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <div>
                            By <span className="text-primary font-bold">CA Monk Team</span>
                        </div>
                        <div>
                            {new Date(blog.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none 
                        prose-headings:font-['Playfair_Display'] prose-headings:font-bold prose-headings:text-primary 
                        prose-p:font-serif prose-p:text-lg prose-p:leading-relaxed prose-p:text-foreground/80
                        prose-strong:text-primary/90 prose-a:text-primary prose-a:underline prose-a:decoration-primary/30 prose-a:underline-offset-2
                        first-letter:text-6xl first-letter:font-['Playfair_Display'] first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
                        {blog.content.split('\n').map((paragraph, index) => (
                            paragraph.trim() && <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* Related Stories */}
                {relatedBlogs.length > 0 && (
                    <div className="mt-20 px-8 md:px-16 pt-12 border-t border-primary/10">
                        <h3 className="font-['Playfair_Display'] text-2xl font-bold text-primary mb-8 italic">More like this</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedBlogs.map(related => (
                                <Link key={related.id} to={`/blogs/${related.id}`} className="group block space-y-3">
                                    <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
                                        <img src={related.coverImage} alt={related.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-primary/60">
                                            {related.category[0]}
                                        </div>
                                        <h4 className="font-['Playfair_Display'] text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                                            {related.title}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    )
}
