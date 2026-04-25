export type Category = "Nature" | "Animals" | "Cities" | "Art" | "Space";

export interface PuzzleImage {
  id: string;
  title: string;
  category: Category;
  url: string;
  description: string;
}

export const PUZZLE_IMAGES: PuzzleImage[] = [
  {
    id: "mountains",
    title: "Majestic Mountains",
    category: "Nature",
    url: "/images/mountains.png",
    description: "A beautiful, serene mountain landscape at sunset."
  },
  {
    id: "dog",
    title: "Golden Retriever",
    category: "Animals",
    url: "/images/dog.png",
    description: "A happy golden retriever in a sunny field."
  },
  {
    id: "paris",
    title: "Paris Sunset",
    category: "Cities",
    url: "/images/paris.png",
    description: "Paris at sunset with the Eiffel tower in the background."
  },
  {
    id: "abstract",
    title: "Abstract Flow",
    category: "Art",
    url: "/images/abstract.png",
    description: "A vibrant abstract painting with bold strokes."
  },
  {
    id: "galaxy",
    title: "Deep Galaxy",
    category: "Space",
    url: "/images/galaxy.png",
    description: "A stunning spiral galaxy in deep space."
  },
  {
    id: "forest",
    title: "Enchanted Forest",
    category: "Nature",
    url: "/images/forest.png",
    description: "A lush, magical old-growth forest."
  },
  {
    id: "waterfall",
    title: "Tropical Waterfall",
    category: "Nature",
    url: "/images/waterfall.png",
    description: "A majestic cascading waterfall in a tropical jungle."
  },
  {
    id: "cat",
    title: "Window Cat",
    category: "Animals",
    url: "/images/cat.png",
    description: "A beautiful fluffy cat resting on a windowsill."
  },
  {
    id: "tokyo",
    title: "Tokyo Neon",
    category: "Cities",
    url: "/images/tokyo.png",
    description: "A bustling Tokyo street at night."
  },
  {
    id: "venice",
    title: "Venice Canals",
    category: "Cities",
    url: "/images/venice.png",
    description: "A romantic Venice canal at sunset."
  }
];

export const DIFFICULTIES = [
  { id: "easy", name: "Easy", cols: 4, rows: 3, pieces: 12 },
  { id: "medium", name: "Medium", cols: 6, rows: 4, pieces: 24 },
  { id: "hard", name: "Hard", cols: 8, rows: 6, pieces: 48 },
  { id: "expert", name: "Expert", cols: 12, rows: 8, pieces: 96 }
];
