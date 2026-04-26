import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export function LogoMark({ size = 32 }: { size?: number }) {
  const uid = "lm";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-[22%] shadow-sm group-hover:rotate-6 group-hover:scale-105 transition-transform shrink-0"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF8C5A" />
          <stop offset="0.55" stopColor="#E8593A" />
          <stop offset="1" stopColor="#C13E25" />
        </linearGradient>
        <linearGradient id={`${uid}-piece`} x1="0" y1="40" x2="0" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FCEBD9" />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <rect width="200" height="200" rx="44" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}-clip)`}>
        <rect width="200" height="200" fill={`url(#${uid}-bg)`} />
        <ellipse cx="60" cy="-10" rx="140" ry="70" fill="#FFFFFF" opacity="0.22" />
        <circle cx="170" cy="180" r="30" fill="#1F5C4D" opacity="0.18" />
        <g transform="rotate(-10 100 100)">
          <path d="M 40 55 L 84 55 A 16 16 0 0 1 116 55 L 140 55 L 140 89 A 16 16 0 0 1 140 121 L 140 155 L 40 155 Z"
                fill="#1F5C4D" opacity="0.30" transform="translate(4 6)" />
          <path d="M 40 55 L 84 55 A 16 16 0 0 1 116 55 L 140 55 L 140 89 A 16 16 0 0 1 140 121 L 140 155 L 40 155 Z"
                fill={`url(#${uid}-piece)`} />
          <circle cx="68" cy="92" r="7" fill="#E8B547" />
          <circle cx="100" cy="120" r="5" fill="#3A5A7A" />
          <circle cx="78" cy="135" r="3.5" fill="#1F5C4D" />
        </g>
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
              <li><Link href="/how-to-play" className="text-muted-foreground hover:text-primary text-sm transition-colors">How to Play</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} jigsaw-puzzle.fun — All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
