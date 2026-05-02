export type Category = "Nature" | "Animals" | "Cities" | "Art" | "Space" | "Surprise";

export interface PuzzleImage {
  id: string;
  title: string;
  category: Category;
  url: string;
  description: string;
}

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=900&h=900&fit=crop&q=80`;

export const PUZZLE_IMAGES: PuzzleImage[] = [
  // ---------- Local hero images (kept) ----------
  { id: "mountains", title: "Majestic Mountains", category: "Nature", url: "/images/mountains.png", description: "A beautiful, serene mountain landscape at sunset." },
  { id: "dog", title: "Golden Retriever", category: "Animals", url: "/images/dog.png", description: "A happy golden retriever in a sunny field." },
  { id: "paris", title: "Paris Sunset", category: "Cities", url: "/images/paris.png", description: "Paris at sunset with the Eiffel tower in the background." },
  { id: "abstract", title: "Abstract Flow", category: "Art", url: "/images/abstract.png", description: "A vibrant abstract painting with bold strokes." },
  { id: "galaxy", title: "Deep Galaxy", category: "Space", url: "/images/galaxy.png", description: "A stunning spiral galaxy in deep space." },
  { id: "forest", title: "Enchanted Forest", category: "Nature", url: "/images/forest.png", description: "A lush, magical old-growth forest." },
  { id: "waterfall", title: "Tropical Waterfall", category: "Nature", url: "/images/waterfall.png", description: "A majestic cascading waterfall in a tropical jungle." },
  { id: "cat", title: "Window Cat", category: "Animals", url: "/images/cat.png", description: "A beautiful fluffy cat resting on a windowsill." },
  { id: "tokyo", title: "Tokyo Neon", category: "Cities", url: "/images/tokyo.png", description: "A bustling Tokyo street at night." },
  { id: "venice", title: "Venice Canals", category: "Cities", url: "/images/venice.png", description: "A romantic Venice canal at sunset." },

  // ---------- Nature ----------
  { id: "alpine-lake", title: "Alpine Lake", category: "Nature", url: u("1506905925346-21bda4d32df4"), description: "A glassy alpine lake mirroring snowy peaks." },
  { id: "autumn-road", title: "Autumn Road", category: "Nature", url: u("1500382017468-9049fed747ef"), description: "A winding road through fiery autumn trees." },
  { id: "misty-pines", title: "Misty Pines", category: "Nature", url: u("1441974231531-c6227db76b6e"), description: "Tall pines shrouded in soft morning mist." },
  { id: "tropical-beach", title: "Tropical Beach", category: "Nature", url: u("1507525428034-b723cf961d3e"), description: "Turquoise water lapping a quiet white beach." },
  { id: "snow-peaks", title: "Snow Peaks", category: "Nature", url: u("1418065460487-3e41a6c84dc5"), description: "Crisp snow-capped peaks under a blue sky." },
  { id: "lavender-field", title: "Lavender Field", category: "Nature", url: u("1499002238440-d264edd596ec"), description: "Endless rows of purple lavender in summer." },
  { id: "northern-lights", title: "Northern Lights", category: "Nature", url: u("1483347756197-71ef80e95f73"), description: "Aurora dancing over a quiet arctic landscape." },
  { id: "cherry-blossom", title: "Cherry Blossoms", category: "Nature", url: u("1490604001847-b712b0c2f967"), description: "Pink cherry blossoms in full spring bloom." },
  { id: "desert-dunes", title: "Desert Dunes", category: "Nature", url: u("1473580044384-7ba9967e16a0"), description: "Rolling golden dunes at the edge of dusk." },
  { id: "ocean-cliffs", title: "Ocean Cliffs", category: "Nature", url: u("1505118380757-91f5f5632de0"), description: "Dramatic cliffs meeting the deep blue ocean." },

  // ---------- Animals ----------
  { id: "red-fox", title: "Red Fox", category: "Animals", url: u("1474511320723-9a56873867b5"), description: "A curious red fox resting in soft grass." },
  { id: "elephant", title: "Gentle Elephant", category: "Animals", url: u("1564349683136-77e08dba1ef7"), description: "A gentle elephant in golden savanna light." },
  { id: "tiger", title: "Bengal Tiger", category: "Animals", url: u("1561731216-c3a4d99437d5"), description: "A powerful Bengal tiger staring through the grass." },
  { id: "owl", title: "Snowy Owl", category: "Animals", url: u("1518791841217-8f162f1e1131"), description: "A snowy owl with piercing yellow eyes." },
  { id: "horse", title: "Wild Horse", category: "Animals", url: u("1553284965-83fd3e82fa5a"), description: "A wild horse running across an open plain." },
  { id: "panda", title: "Panda Cub", category: "Animals", url: u("1540979388789-6cee28a1cdc9"), description: "A panda cub munching fresh bamboo." },
  { id: "koala", title: "Sleepy Koala", category: "Animals", url: u("1459262838948-3e2de6c1ec80"), description: "A sleepy koala curled up in a eucalyptus tree." },
  { id: "macaw", title: "Scarlet Macaw", category: "Animals", url: u("1452570053594-1b985d6ea890"), description: "A vivid scarlet macaw with brilliant feathers." },
  { id: "deer", title: "Forest Deer", category: "Animals", url: u("1484406566174-9da000fda645"), description: "A quiet deer in a sun-dappled forest clearing." },
  { id: "kitten", title: "Curious Kitten", category: "Animals", url: u("1535268647677-300dbf3d78d1"), description: "A tiny kitten exploring the world for the first time." },

  // ---------- Cities ----------
  { id: "nyc-skyline", title: "New York Skyline", category: "Cities", url: u("1496442226666-8d4d0e62e6e9"), description: "The iconic Manhattan skyline at golden hour." },
  { id: "london-bridge", title: "London Bridge", category: "Cities", url: u("1513635269975-59663e0ac1ad"), description: "Tower Bridge lit up over the River Thames." },
  { id: "santorini", title: "Santorini White", category: "Cities", url: u("1467269204594-9661b134dd2b"), description: "Whitewashed Santorini houses above a deep blue sea." },
  { id: "dubai-burj", title: "Dubai Skyline", category: "Cities", url: u("1518684079-3c830dcef090"), description: "Dubai's futuristic skyline crowned by the Burj Khalifa." },
  { id: "rome", title: "Rome Colosseum", category: "Cities", url: u("1552832230-c0197dd311b5"), description: "The ancient Roman Colosseum at sunset." },
  { id: "barcelona", title: "Barcelona Streets", category: "Cities", url: u("1583422409516-2895a77efded"), description: "Gaudí-inspired streets of vibrant Barcelona." },
  { id: "kyoto", title: "Kyoto Temple", category: "Cities", url: u("1493976040374-85c8e12f0c0e"), description: "A traditional Kyoto temple framed by red gates." },
  { id: "amsterdam", title: "Amsterdam Canals", category: "Cities", url: u("1512470876302-972faa2aa9a4"), description: "Charming canals and gabled houses of Amsterdam." },
  { id: "hk-night", title: "Hong Kong Lights", category: "Cities", url: u("1536599018102-9f803c140fc1"), description: "Hong Kong's neon skyline glittering at night." },
  { id: "marrakech", title: "Marrakech Market", category: "Cities", url: u("1597212618440-806262de4f6b"), description: "Color and pattern fill a busy Marrakech bazaar." },

  // ---------- Art ----------
  { id: "paint-swirl", title: "Paint Swirl", category: "Art", url: u("1547891654-e66ed7ebb968"), description: "A swirling explosion of vivid liquid paint." },
  { id: "color-burst", title: "Color Burst", category: "Art", url: u("1541680670548-88e8cd23c0f4"), description: "A burst of bold, saturated color blocks." },
  { id: "watercolor", title: "Watercolor Bloom", category: "Art", url: u("1579783902614-a3fb3927b6a5"), description: "Soft watercolor blossoms bleeding into paper." },
  { id: "graffiti", title: "Street Mural", category: "Art", url: u("1502691876148-a84978e59af8"), description: "A bold mural painted across a city wall." },
  { id: "geometric", title: "Geometric Color", category: "Art", url: u("1549490349-8643362247b5"), description: "Crisp geometric shapes in primary tones." },
  { id: "marble", title: "Liquid Marble", category: "Art", url: u("1561214115-f2f134cc4912"), description: "Flowing marble patterns of pink and gold." },
  { id: "mosaic", title: "Stained Mosaic", category: "Art", url: u("1513364776144-60967b0f800f"), description: "An intricate stained-glass mosaic." },
  { id: "ink-flow", title: "Ink Flow", category: "Art", url: u("1605647540924-852290f6b0d5"), description: "Black ink swirling through clear water." },

  // ---------- Space ----------
  { id: "milky-way", title: "Milky Way", category: "Space", url: u("1465101046530-73398c7f28ca"), description: "The Milky Way arching over a quiet horizon." },
  { id: "starfield", title: "Star Field", category: "Space", url: u("1444703686981-a3abbc4d4fe3"), description: "A dense field of stars in the deep night." },
  { id: "moon", title: "Full Moon", category: "Space", url: u("1532453288672-3a27e9be9efd"), description: "A bright full moon in crisp detail." },
  { id: "nebula", title: "Cosmic Nebula", category: "Space", url: u("1419242902214-272b3f66ee7a"), description: "A glowing nebula drifting through deep space." },
  { id: "earth", title: "Earth from Orbit", category: "Space", url: u("1446776877081-d282a0f896e2"), description: "Our blue planet seen from low orbit." },
  { id: "saturn", title: "Saturn's Rings", category: "Space", url: u("1614314107768-6018061b5b72"), description: "Saturn glowing softly with its iconic rings." },

  // ---------- Surprise (mystery picks from a public photo CDN) ----------
  ...Array.from({ length: 500 }, (_, i): PuzzleImage => {
    const n = i + 1;
    return {
      id: `surprise-${n}`,
      title: `Mystery Puzzle #${n}`,
      category: "Surprise",
      url: `https://picsum.photos/seed/jpf-${n}/900/900`,
      description: "A mystery picture — discover what it is as you solve the puzzle!",
    };
  }),
];

export const DIFFICULTIES = [
  { id: "easy", name: "Easy", cols: 4, rows: 3, pieces: 12 },
  { id: "medium", name: "Medium", cols: 6, rows: 4, pieces: 24 },
  { id: "hard", name: "Hard", cols: 8, rows: 6, pieces: 48 },
  { id: "expert", name: "Expert", cols: 12, rows: 8, pieces: 96 }
];
