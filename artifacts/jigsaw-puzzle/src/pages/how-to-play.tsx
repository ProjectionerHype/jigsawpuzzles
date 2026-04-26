import { useEffect } from "react";
import { Link } from "wouter";

export default function HowToPlay() {
  useEffect(() => {
    document.title = "How to Play - Free Online Jigsaw Puzzle Game";
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <article className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-a:text-primary hover:prose-a:text-primary/80">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">How to Play Online Jigsaw Puzzles</h1>
        
        <img 
          src="/images/mountains.png" 
          alt="A beautiful mountain landscape puzzle" 
          className="w-full h-[400px] object-cover rounded-2xl shadow-md mb-12"
        />

        <p className="lead text-xl text-muted-foreground text-center mb-12">
          Welcome to Jigscape. Whether you're a seasoned puzzle master or looking for a new relaxing hobby, our premium online jigsaw puzzle game is designed to provide a calming, satisfying experience.
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Getting Started</h2>
          <p>
            Playing Jigscape is simple and intuitive. Just follow these steps to start your puzzle journey:
          </p>
          <ol className="space-y-4 my-6">
            <li><strong>Select an Image:</strong> Browse our <Link href="/gallery">Puzzle Gallery</Link> and pick an image that appeals to you. We offer high-quality nature, art, city, and animal photography.</li>
            <li><strong>Choose Your Difficulty:</strong> Select how many pieces you want. We recommend starting with Easy (12 pieces) or Medium (24 pieces) to get a feel for the mechanics, then challenging yourself with Hard (48 pieces) or Expert (96 pieces).</li>
            <li><strong>Organize Your Pieces:</strong> When the game loads, your pieces will be scattered around the board. A good strategy is to find the edge pieces first!</li>
            <li><strong>Drag and Snap:</strong> Click and drag a piece towards its correct position or a matching neighbor. You'll feel a satisfying "snap" when pieces lock together correctly.</li>
          </ol>
        </section>

        <section className="mb-12 bg-secondary/30 p-8 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">Pro Tips for Solving Faster</h2>
          <ul className="space-y-3">
            <li><strong>Start with the border:</strong> Look for pieces with one or more flat edges. Assembling the frame first gives you a structural foundation.</li>
            <li><strong>Group by color and pattern:</strong> Sort the inner pieces by dominant colors or distinct textures (like sky, water, or foliage).</li>
            <li><strong>Use the Preview button:</strong> If you get stuck, hold the "Preview" button in the controls bar to see a ghosted version of the final image overlaid on your board.</li>
            <li><strong>Shuffle when needed:</strong> The "Shuffle" button is great for bringing scattered, hard-to-find pieces closer to the play area.</li>
          </ul>
        </section>

        <section id="benefits" className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">The Brain Benefits of Jigsaw Puzzles</h2>
          <p>
            Jigsaw puzzles aren't just fun—they are incredibly good for your cognitive health. Here is why you should make puzzle-solving a regular habit:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">1. Improves Short-Term Memory</h3>
              <p className="text-muted-foreground">Solving a puzzle requires you to remember shapes, colors, and the larger picture, strengthening your short-term memory.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">2. Enhances Problem-Solving</h3>
              <p className="text-muted-foreground">Puzzles require trial and error, formulation of theories, and testing hypotheses—all key elements of problem-solving.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">3. Lowers Stress Levels</h3>
              <p className="text-muted-foreground">Focusing on a puzzle shifts your brain into an alpha state, similar to dreaming or meditation, providing deep relaxation.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">4. Boosts Visual-Spatial Reasoning</h3>
              <p className="text-muted-foreground">You must look at individual pieces and figure out where they fit into the larger picture, exercising your spatial awareness.</p>
            </div>
          </div>
        </section>

        <div className="text-center mt-16 pt-8 border-t border-border">
          <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Ready to relax and play?</h3>
          <Link href="/gallery" className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg">
            Browse Puzzles
          </Link>
        </div>
      </article>
    </div>
  );
}
