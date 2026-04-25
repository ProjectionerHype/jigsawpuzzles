import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { PUZZLE_IMAGES } from "@/lib/images";

export default function Home() {
  useEffect(() => {
    document.title = "Jigscape - Free Online Jigsaw Puzzle Game";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
                A Calming Jigsaw Puzzle Experience
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Unwind, focus, and enjoy the tactile satisfaction of a real puzzle on your screen. No clutter, just you and the pieces.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link href="/gallery" className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-base font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95">
                  Play Free Now
                </Link>
                <Link href="/how-to-play" className="bg-card text-card-foreground border border-border px-8 py-3 rounded-full text-base font-medium hover:bg-secondary transition-all active:scale-95">
                  How to Play
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50"
            >
              <img 
                src={PUZZLE_IMAGES[0].url} 
                alt="Jigsaw Puzzle Preview" 
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/10"></div>
              {/* Fake floating piece */}
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [-5, 5, -5]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
                className="absolute top-1/4 right-1/4 w-24 h-24 bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl shadow-xl flex items-center justify-center"
                style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)" }}
              >
                <div className="w-12 h-12 rounded-full border-2 border-white/50" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Why Play Jigscape?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Designed for adults who want a premium, relaxing puzzle experience without the ads and clutter of typical free games.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Tactile Satisfaction", desc: "Pieces snap together with a satisfying sound and feel, mimicking the real-world experience." },
              { title: "Beautiful Art", desc: "Curated high-resolution images across nature, cities, space, and art categories." },
              { title: "Play at Your Pace", desc: "Choose your difficulty from 12 to 96 pieces. Save your progress and come back anytime." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border/50"
              >
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-6 text-primary font-bold font-serif text-xl">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold font-serif mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Puzzles */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">Featured Puzzles</h2>
              <p className="text-muted-foreground">Start your journey with our most loved images.</p>
            </div>
            <Link href="/gallery" className="text-primary font-medium hover:underline hidden md:block">
              View All Puzzles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {PUZZLE_IMAGES.slice(0, 4).map((img, i) => (
              <motion.div 
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/play?image=${img.id}`} className="group block relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <span className="text-white font-medium">{img.title}</span>
                    <span className="text-white/80 text-xs">{img.category}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/gallery" className="text-primary font-medium hover:underline">
              View All Puzzles &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ / SEO Section */}
      <section id="faq" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-10 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-lg text-foreground mb-2">Is this online jigsaw puzzle game completely free?</h3>
              <p className="text-muted-foreground">Yes, Jigscape is a 100% free online jigsaw puzzle game. You can play all of our puzzles without any hidden fees or subscriptions. We focus on providing a premium, relaxing experience.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-lg text-foreground mb-2">Can I choose the number of puzzle pieces?</h3>
              <p className="text-muted-foreground">Absolutely. Before starting any puzzle, you can select from multiple difficulty levels: Easy (12 pieces), Medium (24 pieces), Hard (48 pieces), and Expert (96 pieces). This makes the game suitable for both quick breaks and longer sessions.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-lg text-foreground mb-2">Does the game save my progress?</h3>
              <p className="text-muted-foreground">We are working on adding a save feature. Currently, you can see your best completion times for each puzzle and difficulty level, which are saved locally in your browser.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-lg text-foreground mb-2">Are jigsaw puzzles good for your brain?</h3>
              <p className="text-muted-foreground">Yes! Solving jigsaw puzzles is excellent for cognitive health. It improves short-term memory, visual-spatial reasoning, and problem-solving skills. Additionally, the focused attention required can induce a meditative state, reducing stress and promoting relaxation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
