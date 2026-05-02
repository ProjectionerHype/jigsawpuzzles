import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-md group-hover:rotate-6 transition-transform shrink-0"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="logo-rounded">
          <rect width="200" height="200" rx="44" />
        </clipPath>
      </defs>
      <g clipPath="url(#logo-rounded)">
        <path fill="#E66B4F" d="M 0 0 l 100 0 l 0 30 c 0 4 4.4 8 8.8 8 c 11 0 11 24 0 24 c -4.4 0 -8.8 4 -8.8 8 l 0 30 l -30 0 c -4 0 -8 4.4 -8 8.8 c 0 11 -24 11 -24 0 c 0 -4.4 -4 -8.8 -8 -8.8 l -30 0 l 0 -100 Z" />
        <path fill="#1F5C4D" d="M 100 0 l 100 0 l 0 100 l -30 0 c -4 0 -8 4.4 -8 8.8 c 0 11 -24 11 -24 0 c 0 -4.4 -4 -8.8 -8 -8.8 l -30 0 l 0 -30 c 0 -4 4.4 -8 8.8 -8 c 11 0 11 -24 0 -24 c -4.4 0 -8.8 -4 -8.8 -8 l 0 -30 Z" />
        <path fill="#E8B547" d="M 0 100 l 30 0 c 4 0 8 4.4 8 8.8 c 0 11 24 11 24 0 c 0 -4.4 4 -8.8 8 -8.8 l 30 0 l 0 30 c 0 4 4.4 8 8.8 8 c 11 0 11 24 0 24 c -4.4 0 -8.8 4 -8.8 8 l 0 30 l -100 0 l 0 -100 Z" />
        <path fill="#3A5A7A" d="M 100 100 l 30 0 c 4 0 8 4.4 8 8.8 c 0 11 24 11 24 0 c 0 -4.4 4 -8.8 8 -8.8 l 30 0 l 0 100 l -100 0 l 0 -30 c 0 -4 4.4 -8 8.8 -8 c 11 0 11 -24 0 -24 c -4.4 0 -8.8 -4 -8.8 -8 l 0 -30 Z" />
      </g>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-sans font-extrabold tracking-tight text-foreground ${className}`}>
      <span>jigsaw-puzzle</span>
      <span className="text-accent">.fun</span>
    </span>
  );
}

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
        <Link href="/" className="flex items-center gap-2.5 group">
          <LogoMark size={36} />
          <Wordmark className="text-xl md:text-2xl" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${location === "/" || location === "/gallery" ? "text-primary" : "text-muted-foreground"}`}>
            Play
          </Link>
          <Link href="/Daily-Jigsaw-Puzzle" className={`text-sm font-medium transition-colors hover:text-primary ${location === "/Daily-Jigsaw-Puzzle" ? "text-primary" : "text-muted-foreground"}`}>
            Daily Puzzle
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
            <Link href="/" className="flex items-center gap-2 justify-center md:justify-start mb-4 group">
              <LogoMark size={28} />
              <Wordmark className="text-lg" />
            </Link>
            <p className="text-muted-foreground text-sm max-w-md mx-auto md:mx-0">
              A free online jigsaw puzzle game. Beautiful images, satisfying snap mechanics, no ads, no signup — just play.
            </p>
          </div>
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/?category=nature" className="text-muted-foreground hover:text-primary text-sm transition-colors">Nature</Link></li>
              <li><Link href="/?category=animals" className="text-muted-foreground hover:text-primary text-sm transition-colors">Animals</Link></li>
              <li><Link href="/?category=cities" className="text-muted-foreground hover:text-primary text-sm transition-colors">Cities</Link></li>
              <li><Link href="/?category=art" className="text-muted-foreground hover:text-primary text-sm transition-colors">Art</Link></li>
              <li><Link href="/?category=space" className="text-muted-foreground hover:text-primary text-sm transition-colors">Space</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">Learn</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">All Puzzles</Link></li>
              <li><Link href="/Daily-Jigsaw-Puzzle" className="text-muted-foreground hover:text-primary text-sm transition-colors">Daily Puzzle</Link></li>
              <li><Link href="/how-to-play" className="text-muted-foreground hover:text-primary text-sm transition-colors">How to Play</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} jigsaw-puzzle.fun — All rights reserved.</p>
          <nav className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
