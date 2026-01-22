import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-white dark:bg-card border-t border-primary/10 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="md:col-span-1 space-y-4">
                        <Link to="/" className="block">
                            <span className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-primary">
                                CA MONK.
                                <span className="block text-[10px] font-sans font-bold tracking-[0.3em] text-primary/60 uppercase mt-1">
                                    Journal
                                </span>
                            </span>
                        </Link>
                        <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                            Empowering finance professionals with insights, trends, and knowledge for the modern era.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-primary">Explore</h4>
                        <ul className="space-y-2 text-sm font-serif text-muted-foreground">
                            <li><Link to="/" className="hover:text-primary transition-colors">Latest Stories</Link></li>
                            <li><Link to="/create" className="hover:text-primary transition-colors">Write for Us</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Podcast episodes</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-primary">Topics</h4>
                        <ul className="space-y-2 text-sm font-serif text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Finance & Audit</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Technology & AI</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Career Growth</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Regulations</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-primary">Stay Updated</h4>
                        <p className="font-serif text-sm text-muted-foreground">
                            Get the latest insights delivered weekly to your inbox.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 bg-background border border-primary/10 px-3 py-2 text-sm font-serif focus:outline-none focus:border-primary/40 transition-colors"
                            />
                            <button className="bg-primary text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-primary/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground font-serif">
                        &copy; {new Date().getFullYear()} CA Monk. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-primary/60">
                        <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-4 w-4" /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Linkedin className="h-4 w-4" /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Facebook className="h-4 w-4" /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Instagram className="h-4 w-4" /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
