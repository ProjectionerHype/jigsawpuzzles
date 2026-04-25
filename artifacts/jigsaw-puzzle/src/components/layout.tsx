import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export function Header() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-xl group-hover:rotate-12 transition-transform">
            J
          </div>
          <span className="font-serif font-bold text-2xl tracking-tight text-foreground">Jigscape</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/gallery" className={`text-sm font-medium transition-colors hover:text-primary ${location === "/gallery" ? "text-primary" : "text-muted-foreground"}`}>
            Play
          </Link>
          <Link href="/how-to-play" className={`text-sm font-medium transition-colors hover:text-primary ${location === "/how-to-play" ? "text-primary" : "text-muted-foreground"}`}>
            How to Play
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/gallery" className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
            Start Puzzle
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 mt-20">
      <div className="container mx-auto px-4 md:px-6 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 justify-center md:justify-start mb-4">
              <div className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-sm">
                J
              </div>
              <span className="font-serif font-bold text-xl tracking-tight text-foreground">Jigscape</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md mx-auto md:mx-0">
              A premium, calming online jigsaw puzzle experience. Unwind, focus, and enjoy the tactile satisfaction of a real puzzle on your screen.
            </p>
          </div>
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/gallery" className="text-muted-foreground hover:text-primary text-sm transition-colors">Puzzle Gallery</Link></li>
              <li><Link href="/gallery?category=nature" className="text-muted-foreground hover:text-primary text-sm transition-colors">Nature Puzzles</Link></li>
              <li><Link href="/gallery?category=art" className="text-muted-foreground hover:text-primary text-sm transition-colors">Art Puzzles</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">Learn</h3>
            <ul className="space-y-2">
              <li><Link href="/how-to-play" className="text-muted-foreground hover:text-primary text-sm transition-colors">How to Play</Link></li>
              <li><Link href="/how-to-play#benefits" className="text-muted-foreground hover:text-primary text-sm transition-colors">Benefits of Puzzles</Link></li>
              <li><Link href="/#faq" className="text-muted-foreground hover:text-primary text-sm transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jigscape. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/how-to-play" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/how-to-play" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
