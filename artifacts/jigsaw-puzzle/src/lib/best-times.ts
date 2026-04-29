function safeStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

export function bestTimeKey(imageId: string, pieces: number): string {
  return `jigscape_best_${imageId}_${pieces}`;
}

export function getBestTime(imageId: string, pieces: number): number | null {
  const storage = safeStorage();
  if (!storage) return null;
  const raw = storage.getItem(bestTimeKey(imageId, pieces));
  if (!raw) return null;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function formatBestTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
