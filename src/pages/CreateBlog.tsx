import { useCreateBlog } from "@/hooks/useBlogs"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Loader2, ArrowLeft } from "lucide-react"

export default function CreateBlog() {
    const navigate = useNavigate()
    const createBlogMutation = useCreateBlog()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        coverImage: "",
        category: "",
    })

    // Basic validation check
    const isFormValid = Object.values(formData).every(field => field.trim().length > 0)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isFormValid) return

        createBlogMutation.mutate({
            ...formData,
            category: formData.category.split(',').map(c => c.trim().toUpperCase()), // Basic CSV parsing
            date: new Date().toISOString(),
        }, {
            onSuccess: () => {
                navigate("/")
            }
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-2xl animate-in zoom-in-95 duration-300">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 -ml-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <Card className="border-primary/10 shadow-sm rounded-none">
                <CardHeader className="bg-[#FAFAF9] dark:bg-card/50 border-b border-primary/5 pb-8">
                    <CardTitle className="text-3xl font-['Playfair_Display'] font-bold text-primary italic">Create New Blog</CardTitle>
                    <CardDescription className="font-serif text-muted-foreground">
                        Share your thoughts with the world. All fields are required.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-bold uppercase tracking-wider text-primary/70">Title</label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="e.g. The Future of Fintech"
                                value={formData.title}
                                onChange={handleChange}
                                className="font-serif placeholder:italic border-primary/10 focus-visible:ring-primary/20 rounded-none bg-background/50"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="category" className="text-sm font-bold uppercase tracking-wider text-primary/70">Categories</label>
                                <Input
                                    id="category"
                                    name="category"
                                    placeholder="FINANCE, TECH..."
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="font-serif placeholder:italic border-primary/10 focus-visible:ring-primary/20 rounded-none bg-background/50"
                                    required
                                />
                                <p className="text-[10px] text-muted-foreground font-serif italic">Comma separated</p>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="coverImage" className="text-sm font-bold uppercase tracking-wider text-primary/70">Cover Image URL</label>
                                <Input
                                    id="coverImage"
                                    name="coverImage"
                                    type="url"
                                    placeholder="https://..."
                                    value={formData.coverImage}
                                    onChange={handleChange}
                                    className="font-serif placeholder:italic border-primary/10 focus-visible:ring-primary/20 rounded-none bg-background/50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-bold uppercase tracking-wider text-primary/70">Short Description</label>
                            <Input
                                id="description"
                                name="description"
                                placeholder="A brief summary..."
                                value={formData.description}
                                onChange={handleChange}
                                className="font-serif placeholder:italic border-primary/10 focus-visible:ring-primary/20 rounded-none bg-background/50"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="content" className="text-sm font-bold uppercase tracking-wider text-primary/70">Content</label>
                            <textarea
                                id="content"
                                name="content"
                                className="flex min-h-[300px] w-full border border-primary/10 bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 font-serif leading-relaxed rounded-none resize-y placeholder:italic"
                                placeholder="Write your full blog post here..."
                                value={formData.content}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider rounded-none h-12 text-sm"
                                disabled={!isFormValid || createBlogMutation.isPending}
                            >
                                {createBlogMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Publishing...
                                    </>
                                ) : (
                                    "Publish Article"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
