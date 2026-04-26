import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { PUZZLE_IMAGES } from "@/lib/images";

const PIECE_COLORS = ["#E66B4F", "#1F5C4D", "#E8B547", "#3A5A7A"];

function FloatingPiece({
  color,
  className,
  delay = 0,
  rotate = 0,
}: {
  color: string;
  className: string;
  delay?: number;
  rotate?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`absolute drop-shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20, rotate: rotate - 10 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.8, delay }}
      aria-hidden="true"
    >
      <motion.path
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4 + delay, ease: "easeInOut" }}
        fill={color}
        d="M 15 35 l 0 -20 l 20 0 c 0 -8 18 -8 18 0 l 20 0 l 0 20 c 8 0 8 18 0 18 l 0 20 l -20 0 c 0 8 -18 8 -18 0 l -20 0 l 0 -20 c -8 0 -8 -18 0 -18 Z"
      />
    </motion.svg>
  );
}

function HeroPuzzleCollage() {
  return (
    <div className="relative aspect-square w-full max-w-[480px] mx-auto">
      {/* Decorative dots/grid background */}
      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/10 via-primary/10 to-amber-200/30 blur-2xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-4 rounded-[1.5rem] overflow-hidden shadow-2xl border-[6px] border-white"
        style={{
          backgroundImage: `url(${PUZZLE_IMAGES[0].url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Puzzle grid overlay */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full opacity-50 mix-blend-overlay"
          aria-hidden="true"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 100} x2="400" y2={i * 100} stroke="white" strokeWidth="1.5" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="400" stroke="white" strokeWidth="1.5" />
          ))}
        </svg>
      </motion.div>

      {/* Floating pieces around the image */}
      <FloatingPiece color="#E66B4F" className="w-20 h-20 -top-2 -left-2" delay={0.2} rotate={-12} />
      <FloatingPiece color="#E8B547" className="w-16 h-16 top-8 -right-4" delay={0.4} rotate={18} />
      <FloatingPiece color="#3A5A7A" className="w-24 h-24 -bottom-4 left-6" delay={0.6} rotate={8} />
      <FloatingPiece color="#1F5C4D" className="w-14 h-14 bottom-10 -right-6" delay={0.8} rotate={-22} />
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = "Free Online Jigsaw Puzzle Game";
  }, []);

  const featureIcons = ["🧩", "🎨", "⏱️"];
  const stats = [
    { num: "100%", label: "Free to play" },
    { num: "12–96", label: "Pieces per puzzle" },
    { num: "0", label: "Ads or signups" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-accent/15 blur-3xl -z-10" />
        <div className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full bg-primary/15 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/3 w-[380px] h-[380px] rounded-full bg-amber-300/20 blur-3xl -z-10" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6 text-center md:text-left"
            >
              <div className="inline-flex items-center gap-2 self-center md:self-start bg-card border border-border rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Free • No signup • No ads
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.05]">
                Free Online{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-br from-primary via-emerald-700 to-primary bg-clip-text text-transparent">
                    Jigsaw Puzzle
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-3 bg-amber-300/60 -z-0 rounded-sm -rotate-1" />
                </span>{" "}
                Game
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed">
                Beautiful images, satisfying snap-together pieces, and the calm focus of a real puzzle —
                right in your browser. Pick a picture and play.
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-2">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-base font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Play Free Now</span>
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/how-to-play"
                  className="inline-flex items-center gap-2 bg-card text-card-foreground border border-border px-7 py-3.5 rounded-full text-base font-semibold hover:bg-secondary transition-all active:scale-95"
                >
                  How to Play
                </Link>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-3 gap-2 mt-6 max-w-md mx-auto md:mx-0">
                {stats.map((s) => (
                  <div key={s.label} className="text-center md:text-left">
                    <div className="font-serif font-bold text-2xl md:text-3xl text-primary">{s.num}</div>
                    <div className="text-xs text-muted-foreground leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <HeroPuzzleCollage />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick category picker */}
      <section className="py-8 md:py-12 bg-card border-y border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Jump in</p>
              <h2 className="font-serif font-bold text-2xl text-foreground">Pick a vibe and start playing</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "🌲 Nature", q: "nature", color: "bg-emerald-100 text-emerald-900 hover:bg-emerald-200" },
                { label: "🏙 Cities", q: "cities", color: "bg-sky-100 text-sky-900 hover:bg-sky-200" },
                { label: "🎨 Art", q: "art", color: "bg-rose-100 text-rose-900 hover:bg-rose-200" },
                { label: "🌌 Space", q: "space", color: "bg-indigo-100 text-indigo-900 hover:bg-indigo-200" },
                { label: "🐾 Animals", q: "animals", color: "bg-amber-100 text-amber-900 hover:bg-amber-200" },
              ].map((c) => (
                <Link
                  key={c.q}
                  href={`/gallery?category=${c.q}`}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border border-border/60 transition-colors ${c.color}`}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Why play here</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              The puzzle game that actually feels good
            </h2>
            <p className="text-muted-foreground">
              Designed to be calming, premium, and addictive in the best way — no popups, no logins,
              no nonsense.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Tactile snap mechanics",
                desc: "Pieces click into place with a satisfying micro-feedback that mimics the real thing.",
                bg: "bg-rose-50",
                border: "border-rose-200",
                accent: "bg-rose-500",
              },
              {
                title: "Beautiful curated images",
                desc: "Hand-picked, high-resolution photos across nature, cities, space, animals, and art.",
                bg: "bg-emerald-50",
                border: "border-emerald-200",
                accent: "bg-emerald-600",
              },
              {
                title: "Play at your pace",
                desc: "12, 24, 48, or 96 pieces. Quick coffee break or a long, focused session — your call.",
                bg: "bg-amber-50",
                border: "border-amber-200",
                accent: "bg-amber-500",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative rounded-2xl p-7 border ${feature.bg} ${feature.border} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all`}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.accent} text-white flex items-center justify-center mb-5 text-2xl shadow-md`}>
                  {featureIcons[i]}
                </div>
                <h3 className="text-xl font-bold font-serif mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Puzzles */}
      <section className="py-20 bg-secondary/40 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-10 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Featured</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                Pick a puzzle, hit play
              </h2>
              <p className="text-muted-foreground">Start with our most-loved images.</p>
            </div>
            <Link href="/gallery" className="text-primary font-semibold hover:underline hidden md:block whitespace-nowrap">
              View all puzzles →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {PUZZLE_IMAGES.slice(0, 4).map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/play?image=${img.id}`}
                  className="group block relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all border-4 border-white"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className="absolute top-2 right-2 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: PIECE_COLORS[i % PIECE_COLORS.length] }}
                  >
                    {i + 1}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-100 flex flex-col justify-end p-4">
                    <span className="text-white font-semibold text-sm md:text-base leading-tight">{img.title}</span>
                    <span className="text-white/80 text-xs capitalize">{img.category}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/gallery" className="text-primary font-semibold hover:underline">
              View all puzzles →
            </Link>
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-emerald-800 to-emerald-900 px-8 py-14 md:px-16 md:py-20 text-center shadow-xl">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-amber-300/30 blur-2xl" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-rose-400/20 blur-2xl" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 max-w-2xl mx-auto leading-tight">
              Ready to lose track of time the good way?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Pick an image, choose your difficulty, and start snapping pieces together. It's free, forever.
            </p>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 px-8 py-4 rounded-full text-base font-bold hover:bg-amber-300 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-0.5 active:scale-95"
            >
              Start a Puzzle
              <span aria-hidden>🧩</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ / SEO Section */}
      <section id="faq" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3 text-center">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-10 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Is this online jigsaw puzzle game completely free?",
                a: "Yes — 100% free. Every puzzle, every difficulty, no signup, no ads, no hidden upgrades.",
              },
              {
                q: "Can I choose the number of puzzle pieces?",
                a: "Of course. Pick from Easy (12), Medium (24), Hard (48), or Expert (96) before you start. Quick break or long focused session — your call.",
              },
              {
                q: "Does the game save my progress?",
                a: "Your best completion times for each puzzle and difficulty are saved locally in your browser. Full save-and-resume is on the way.",
              },
              {
                q: "Are jigsaw puzzles actually good for your brain?",
                a: "Yes! Solving puzzles improves short-term memory, visual-spatial reasoning, and problem-solving — and the focused attention is genuinely calming.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="bg-card border border-border rounded-2xl p-5 group open:shadow-md transition-shadow"
              >
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-foreground list-none">
                  <span>{item.q}</span>
                  <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-muted-foreground mt-3 leading-relaxed text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
