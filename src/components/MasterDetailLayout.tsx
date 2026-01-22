import { useState } from "react"
import { Outlet, Link, useParams } from "react-router-dom"

import { useBlogs } from "@/hooks/useBlogs"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, GraduationCap, Scale, BrainCircuit, Cpu, FileText, Search } from "lucide-react"
import { Hero } from "@/components/Hero"
import { Footer } from "@/components/Footer"

// Map categories to icons
const getCategoryIcon = (category: string) => {
    const mainCat = category.toLowerCase()
    if (mainCat.includes('finance') || mainCat.includes('audit')) return <TrendingUp className="h-3 w-3" />
    if (mainCat.includes('career') || mainCat.includes('study')) return <GraduationCap className="h-3 w-3" />
    if (mainCat.includes('regulation') || mainCat.includes('tax')) return <Scale className="h-3 w-3" />
    if (mainCat.includes('ai') || mainCat.includes('tech')) return <Cpu className="h-3 w-3" />
    if (mainCat.includes('skills')) return <BrainCircuit className="h-3 w-3" />
    return <FileText className="h-3 w-3" />
}

export default function MasterDetailLayout() {
    const { data: blogs, isLoading } = useBlogs()
    const { id: selectedId } = useParams<{ id: string }>()

    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    // Filter Logic
    const filteredBlogs = blogs?.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory ? blog.category.some(c => c.includes(selectedCategory)) : true
        return matchesSearch && matchesCategory
    })

    // Unique Categories from actual data
    const allCategories = Array.from(new Set(blogs?.flatMap(b => b.category) || []))

    return (
        <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-background">
            <Hero />
            <div className="flex flex-1 flex-col md:flex-row container mx-auto gap-8 px-4 py-8">
                {/* Left Panel: Blog List (Available if no ID on mobile, or always on desktop) */}
                <aside className={cn(
                    "w-full md:w-[380px] flex-shrink-0 flex flex-col gap-6",
                    selectedId ? "hidden md:flex" : "flex"
                )}>
                    <div className="pb-4 border-b-2 border-primary/5 space-y-4">
                        <h2 className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-primary italic">Latest Stories</h2>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                placeholder="Search articles..."
                                className="w-full pl-8 pr-4 py-2 text-sm bg-background border border-primary/10 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all font-serif placeholder:italic"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Category Chips */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={cn(
                                    "px-2 py-1 text-[10px] font-bold uppercase tracking-wider border border-primary/10 hover:bg-primary/5 transition-colors",
                                    selectedCategory === null ? "bg-primary text-primary-foreground border-primary" : "text-primary/60"
                                )}
                            >
                                All
                            </button>
                            {allCategories.slice(0, 6).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                                    className={cn(
                                        "px-2 py-1 text-[10px] font-bold uppercase tracking-wider border border-primary/10 hover:bg-primary/5 transition-colors",
                                        selectedCategory === cat ? "bg-primary text-primary-foreground border-primary" : "text-primary/60"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="w-12 h-1 bg-primary mt-2"></div>
                    </div>

                    <div className="space-y-6">
                        {isLoading ? (
                            [...Array(5)].map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <div className="h-px bg-border w-full" />
                                </div>
                            ))
                        ) : filteredBlogs?.length === 0 ? (
                            <div className="text-center py-10 text-muted-foreground font-serif italic">
                                No stories found.
                            </div>
                        ) : (
                            filteredBlogs?.map((blog) => (
                                <Link
                                    key={blog.id}
                                    to={`/blogs/${blog.id}`}
                                    className={cn(
                                        "group block transition-all duration-300 bg-white dark:bg-card p-4 rounded-lg border border-transparent hover:border-primary/10 hover:shadow-sm",
                                        selectedId === blog.id ? "ring-1 ring-primary/20 bg-primary/5" : ""
                                    )}
                                >
                                    <div className="space-y-3">
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center border-b border-primary/5 pb-2 mb-2 group-hover:border-primary/20 transition-colors">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-primary/70">
                                                {getCategoryIcon(blog.category[0])}
                                                <span>{blog.category[0]}</span>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground font-serif italic">
                                                {new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className={cn(
                                            "font-['Playfair_Display'] text-xl leading-tight text-foreground group-hover:text-primary transition-colors",
                                            selectedId === blog.id && "text-primary"
                                        )}>
                                            {blog.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-serif">
                                            {blog.description}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </aside>

                {/* Right Panel: Blog Detail (Hidden on mobile if no ID, always visible on desktop) */}
                <main className={cn(
                    "flex-1 min-w-0 bg-white dark:bg-background border border-primary/5 shadow-sm rounded-xl overflow-hidden min-h-[500px]",
                    selectedId ? "flex flex-col" : "hidden md:flex flex-col"
                )}>
                    {selectedId && (
                        <div className="md:hidden p-4 border-b border-primary/5">
                            <Link to="/" className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-wider">
                                ← Back to Stories
                            </Link>
                        </div>
                    )}
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    )
}
