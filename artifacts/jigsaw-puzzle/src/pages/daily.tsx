import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { PUZZLE_IMAGES, DIFFICULTIES } from "@/lib/images";

function getUtcDayIndex(d: Date): number {
  return Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86_400_000);
}

function formatDate(d: Date): string {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function Daily() {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    document.title = "Daily Jigsaw Puzzle — jigsaw-puzzle.fun";
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const { puzzle, msUntilNext } = useMemo(() => {
    const dayIndex = getUtcDayIndex(now);
    const idx = ((dayIndex % PUZZLE_IMAGES.length) + PUZZLE_IMAGES.length) % PUZZLE_IMAGES.length;
    const nextUtcMidnight = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0, 0, 0, 0
    );
    return {
      puzzle: PUZZLE_IMAGES[idx],
      msUntilNext: nextUtcMidnight - now.getTime(),
    };
  }, [now]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-3">
          {formatDate(now)}
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
          Daily Jigsaw Puzzle
        </h1>
        <p className="text-muted-foreground text-lg">
          A fresh puzzle every day — same one for everyone, picked at midnight UTC.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Next puzzle in{" "}
          <span className="font-mono font-semibold text-foreground tabular-nums">
            {formatCountdown(msUntilNext)}
          </span>
        </p>
      </div>

      <motion.div
        key={puzzle.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-card border border-border rounded-3xl overflow-hidden shadow-lg"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={puzzle.url}
            alt={puzzle.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
            Today's Puzzle
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-3 gap-4">
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-foreground leading-tight">
              {puzzle.title}
            </h2>
            <span className="shrink-0 text-xs font-medium px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md uppercase tracking-wider">
              {puzzle.category}
            </span>
          </div>
          <p className="text-muted-foreground text-base mb-6">{puzzle.description}</p>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-semibold text-foreground mb-3">Choose your difficulty</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {DIFFICULTIES.map((diff) => (
                <Link
                  key={diff.id}
                  href={`/play?image=${puzzle.id}&pieces=${diff.pieces}`}
                  className="group flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-xl bg-secondary/50 hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary text-foreground transition-colors"
                >
                  <span className="font-semibold">{diff.name}</span>
                  <span className="text-xs text-muted-foreground group-hover:text-primary-foreground/80">
                    {diff.pieces} pieces
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="text-center mt-10">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Browse all puzzles →
        </Link>
      </div>
    </div>
  );
}
