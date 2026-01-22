import { useBlogs } from "@/hooks/useBlogs"
import { BlogCard } from "@/components/BlogCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { PlusCircle } from "lucide-react"

export default function Home() {
    const { data: blogs, isLoading, error } = useBlogs()

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 space-y-8">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[350px] rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-4">
                            <Skeleton className="h-48 w-full rounded-md" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto py-8 text-center text-destructive">
                Error loading blogs. Please make sure the backend is running.
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">CA Monk Blog</h1>
                    <p className="text-muted-foreground mt-2">
                        Stay updated with the latest trends in finance, accounting, and career growth.
                    </p>
                </div>
                <Button asChild>
                    <Link to="/create" className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Create New Blog
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs?.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
                {blogs?.length === 0 && (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        No blogs found. Be the first to create one!
                    </div>
                )}
            </div>
        </div>
    )
}
