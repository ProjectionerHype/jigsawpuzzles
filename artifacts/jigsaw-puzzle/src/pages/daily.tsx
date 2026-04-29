import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, Flame, Share2, Trophy } from "lucide-react";
import { PUZZLE_IMAGES, DIFFICULTIES } from "@/lib/images";
import {
  getCurrentStreak,
  getRecentDays,
  isDayCompleted,
  todayKey,
  buildShareText,
  shareOrCopy,
} from "@/lib/daily-progress";
import { getBestTime, formatBestTime } from "@/lib/best-times";

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

const DAYS_TO_SHOW = 14;

export default function Daily() {
  const [now, setNow] = useState<Date>(() => new Date());
  // progressTick is bumped on focus / mount so localStorage changes show up
  const [progressTick, setProgressTick] = useState(0);
  const [shareLabel, setShareLabel] = useState<string>("Share Result");

  useEffect(() => {
    document.title = "Daily Jigsaw Puzzle — jigsaw-puzzle.fun";
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onFocus = () => setProgressTick((t) => t + 1);
    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onFocus);
    };
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

  const { streak, recent, completedToday, totalCompleted } = useMemo(() => {
    void progressTick;
    const recent = getRecentDays(DAYS_TO_SHOW, now);
    return {
      streak: getCurrentStreak(now),
      recent,
      completedToday: isDayCompleted(todayKey(now)),
      totalCompleted: recent.filter((d) => d.completed).length,
    };
  }, [now, progressTick]);

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

      {/* Streak strip */}
      <div className="max-w-3xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center text-accent">
            <Flame size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold font-serif text-foreground leading-none">{streak}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
              Day streak
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold font-serif text-foreground leading-none">
              {totalCompleted}
              <span className="text-sm text-muted-foreground font-normal"> / {DAYS_TO_SHOW}</span>
            </div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
              Last 14 days
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              completedToday ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}
          >
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="text-base font-semibold text-foreground leading-tight">
              {completedToday ? "Solved today" : "Not yet today"}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {completedToday ? "Come back tomorrow!" : "Solve it to extend your streak"}
            </div>
          </div>
        </div>
      </div>

      {/* History row */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Recent days
          </h2>
          <span className="text-xs text-muted-foreground">UTC</span>
        </div>
        <div className="grid grid-cols-7 md:grid-cols-14 gap-1.5">
          {recent.map((day) => {
            const label = day.date.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            });
            const dayNum = day.date.getUTCDate();
            return (
              <div
                key={day.key}
                title={`${label}${day.completed ? " — solved" : day.isToday ? " — today" : ""}`}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-semibold border transition-colors ${
                  day.completed
                    ? "bg-primary text-primary-foreground border-primary"
                    : day.isToday
                    ? "bg-card border-accent text-accent"
                    : "bg-card border-border text-muted-foreground"
                }`}
              >
                {day.completed ? <CheckCircle2 size={16} /> : dayNum}
              </div>
            );
          })}
        </div>
      </div>

      {/* Puzzle card */}
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
          {completedToday && (
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <CheckCircle2 size={14} /> Solved
            </div>
          )}
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
            <p className="text-sm font-semibold text-foreground mb-3">
              {completedToday ? "Play again at any difficulty" : "Choose your difficulty"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {DIFFICULTIES.map((diff) => {
                void progressTick;
                const best = getBestTime(puzzle.id, diff.pieces);
                return (
                  <Link
                    key={diff.id}
                    href={`/play?image=${puzzle.id}&pieces=${diff.pieces}&daily=1`}
                    className="group flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-xl bg-secondary/50 hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary text-foreground transition-colors"
                  >
                    <span className="font-semibold">{diff.name}</span>
                    <span className="text-xs text-muted-foreground group-hover:text-primary-foreground/80">
                      {diff.pieces} pieces
                    </span>
                    {best !== null && (
                      <span className="text-xs font-mono tabular-nums text-accent group-hover:text-primary-foreground/90 flex items-center gap-1 mt-0.5">
                        <Trophy size={11} />
                        {formatBestTime(best)}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
            {completedToday && (
              <button
                onClick={async () => {
                  const text = buildShareText({
                    puzzleTitle: puzzle.title,
                    difficultyName: "Daily",
                    streak,
                    now,
                  });
                  const result = await shareOrCopy(text);
                  if (result === "copied") setShareLabel("Copied!");
                  else if (result === "shared") setShareLabel("Shared!");
                  else setShareLabel("Could not share");
                  setTimeout(() => setShareLabel("Share Result"), 2000);
                }}
                className="mt-4 w-full bg-accent text-accent-foreground py-3 rounded-xl font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 size={18} />
                {shareLabel}
              </button>
            )}
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
