import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { motion } from "framer-motion";
import { PUZZLE_IMAGES, Category, DIFFICULTIES } from "@/lib/images";

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

  useEffect(() => {
    document.title = "Free Online Jigsaw Puzzle Game";
  }, []);

  useEffect(() => {
    setActiveCategory(readCategoryFromQuery(search));
  }, [search]);

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
              
              <div className="mt-auto pt-4 border-t border-border flex flex-wrap gap-2">
                {DIFFICULTIES.map(diff => (
                  <Link 
                    key={diff.id} 
                    href={`/play?image=${img.id}&pieces=${diff.pieces}`}
                    className="text-xs px-3 py-1.5 rounded-md bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {diff.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
