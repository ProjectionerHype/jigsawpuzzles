import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { PUZZLE_IMAGES, Category, DIFFICULTIES } from "@/lib/images";
import { getBestTime, formatBestTime } from "@/lib/best-times";

const CATEGORIES: (Category | "All")[] = ["All", "Nature", "Animals", "Cities", "Art", "Space", "Surprise"];

function readCategoryFromQuery(search: string): Category | "All" {
  const params = new URLSearchParams(search);
  const raw = (params.get("category") ?? "").toLowerCase();
  const match = CATEGORIES.find((c) => c.toLowerCase() === raw);
  return match ?? "All";
}

export default function Gallery() {
  const search = useSearch();
  const [activeCategory, setActiveCategory] = useState<Category | "All">(() => readCategoryFromQuery(search));
  const [bestTick, setBestTick] = useState(0);

  useEffect(() => {
    document.title = "Free Online Jigsaw Puzzle Game";
  }, []);

  useEffect(() => {
    setActiveCategory(readCategoryFromQuery(search));
  }, [search]);

  useEffect(() => {
    const refresh = () => setBestTick((t) => t + 1);
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const categories = CATEGORIES;

  const filteredImages = activeCategory === "All" 
    ? PUZZLE_IMAGES 
    : PUZZLE_IMAGES.filter(img => img.category === activeCategory);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Free Online Jigsaw Puzzle Game</h1>
        <p className="text-muted-foreground text-lg">Pick an image, choose a difficulty, and start playing — no signup, no ads.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-card text-card-foreground border border-border hover:bg-secondary hover:border-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredImages.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img 
                src={img.url} 
                alt={img.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <Link 
                  href={`/play?image=${img.id}&pieces=24`}
                  className="bg-white text-black px-6 py-2 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all"
                >
                  Play Now
                </Link>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-foreground font-serif leading-tight">{img.title}</h3>
                <span className="text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-md uppercase tracking-wider">{img.category}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{img.description}</p>
              
              <div className="mt-auto pt-4 border-t border-border grid grid-cols-4 gap-1.5">
                {DIFFICULTIES.map(diff => {
                  void bestTick;
                  const best = getBestTime(img.id, diff.pieces);
                  return (
                    <Link
                      key={diff.id}
                      href={`/play?image=${img.id}&pieces=${diff.pieces}`}
                      className="group/diff flex flex-col items-center gap-0.5 px-1.5 py-1.5 rounded-md bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-center"
                    >
                      <span className="text-xs font-semibold leading-tight">{diff.name}</span>
                      {best !== null ? (
                        <span className="text-[10px] font-mono tabular-nums text-accent group-hover/diff:text-primary-foreground/90 leading-tight flex items-center gap-0.5">
                          <Trophy size={9} className="shrink-0" />
                          {formatBestTime(best)}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-muted-foreground/60 group-hover/diff:text-primary-foreground/70 leading-tight">
                          —
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
