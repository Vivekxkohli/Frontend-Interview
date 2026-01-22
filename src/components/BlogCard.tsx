import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Blog } from "@/services/api"
import { Link } from "react-router-dom"
import { CalendarDays } from "lucide-react"

interface BlogCardProps {
    blog: Blog
}

export function BlogCard({ blog }: BlogCardProps) {
    return (
        <Link to={`/blogs/${blog.id}`} className="block h-full transition-transform hover:-translate-y-1">
            <Card className="h-full overflow-hidden flex flex-col hover:shadow-lg transition-shadow bg-card text-card-foreground">
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <CardHeader className="p-4 space-y-2">
                    <div className="flex flex-wrap gap-2">
                        {blog.category.map((cat) => (
                            <Badge key={cat} variant="secondary" className="text-xs font-normal">
                                {cat}
                            </Badge>
                        ))}
                    </div>
                    <h3 className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary">
                        {blog.title}
                    </h3>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {blog.description}
                    </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex items-center gap-1 mt-auto">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(blog.date).toLocaleDateString()}
                </CardFooter>
            </Card>
        </Link>
    )
}
