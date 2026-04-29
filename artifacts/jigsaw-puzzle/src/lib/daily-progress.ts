const STORAGE_KEY = "jigscape_daily_completed_v1";

function safeStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

export function todayKey(d: Date = new Date()): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function dayKeyFromIndex(dayIndex: number): string {
  const ms = dayIndex * 86_400_000;
  return todayKey(new Date(ms));
}

export function getUtcDayIndex(d: Date = new Date()): number {
  return Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86_400_000);
}

export function getCompletedDays(): Set<string> {
  const storage = safeStorage();
  if (!storage) return new Set();
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((s) => typeof s === "string"));
  } catch {
    return new Set();
  }
}

export function markDayCompleted(dateKey: string = todayKey()): void {
  const storage = safeStorage();
  if (!storage) return;
  const days = getCompletedDays();
  if (days.has(dateKey)) return;
  days.add(dateKey);
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(Array.from(days).sort()));
  } catch {
    /* ignore quota errors */
  }
}

export function isDayCompleted(dateKey: string = todayKey()): boolean {
  return getCompletedDays().has(dateKey);
}

export function getCurrentStreak(now: Date = new Date()): number {
  const days = getCompletedDays();
  if (days.size === 0) return 0;
  const todayIdx = getUtcDayIndex(now);
  // Streak counts back from today (or yesterday if today not done yet)
  let cursor = todayIdx;
  if (!days.has(dayKeyFromIndex(cursor))) {
    cursor -= 1;
    if (!days.has(dayKeyFromIndex(cursor))) return 0;
  }
  let streak = 0;
  while (days.has(dayKeyFromIndex(cursor))) {
    streak += 1;
    cursor -= 1;
  }
  return streak;
}

export interface RecentDay {
  date: Date;
  key: string;
  completed: boolean;
  isToday: boolean;
}

export interface ShareTextOptions {
  puzzleTitle: string;
  difficultyName: string;
  timeSeconds?: number;
  streak: number;
  now?: Date;
  siteUrl?: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function buildShareText(opts: ShareTextOptions): string {
  const now = opts.now ?? new Date();
  const dateLabel = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const lines: string[] = [];
  lines.push(`🧩 jigsaw-puzzle.fun Daily — ${dateLabel}`);
  lines.push(`${opts.puzzleTitle} · ${opts.difficultyName}`);
  if (typeof opts.timeSeconds === "number") {
    lines.push(`⏱ ${formatTime(opts.timeSeconds)}`);
  }
  if (opts.streak > 0) {
    lines.push(`🔥 Streak: ${opts.streak} day${opts.streak === 1 ? "" : "s"}`);
  }
  lines.push(opts.siteUrl ?? "https://jigsaw-puzzle.fun/Daily-Jigsaw-Puzzle");
  return lines.join("\n");
}

export async function shareOrCopy(text: string, title = "Daily Jigsaw Puzzle"): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ title, text });
      return "shared";
    } catch {
      // user cancelled or share failed — fall through to clipboard
    }
  }
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return "copied";
    } catch {
      return "failed";
    }
  }
  return "failed";
}

export function getRecentDays(count: number, now: Date = new Date()): RecentDay[] {
  const days = getCompletedDays();
  const todayIdx = getUtcDayIndex(now);
  const result: RecentDay[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const idx = todayIdx - i;
    const date = new Date(idx * 86_400_000);
    const key = dayKeyFromIndex(idx);
    result.push({
      date,
      key,
      completed: days.has(key),
      isToday: idx === todayIdx,
    });
  }
  return result;
}
