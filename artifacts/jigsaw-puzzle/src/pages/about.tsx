import { useEffect } from "react";
import { Link } from "wouter";
import { Puzzle, Flame, Image, Zap } from "lucide-react";
import { useSeo } from "@/lib/use-seo";

const FEATURES = [
  {
    icon: <Puzzle size={22} />,
    title: "Hundreds of puzzles",
    body: "Curated photos across Nature, Animals, Cities, Art, Space — plus 500 Surprise mystery picks. New themes added regularly.",
  },
  {
    icon: <Flame size={22} />,
    title: "Daily puzzle & streaks",
    body: "A fresh puzzle drops every day at midnight UTC. Keep your streak alive and share your result Wordle-style with friends.",
  },
  {
    icon: <Image size={22} />,
    title: "Beautiful imagery",
    body: "Every image is sourced from Unsplash and Picsum Photos — high-resolution, licensed photography from talented creators worldwide.",
  },
  {
    icon: <Zap size={22} />,
    title: "No friction, ever",
    body: "No ads, no sign-up, no tracking, no paywalls. Open the site, pick a puzzle, and start playing in seconds.",
  },
];

export default function About() {
  useSeo({
    title: "About",
    description: "Learn about jigsaw-puzzle.fun — a free, beautiful, zero-friction online jigsaw puzzle game. No ads, no signup, just play.",
    path: "/about",
  });
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-3xl">
      <h1 className="text-4xl font-serif font-bold text-foreground mb-4">About jigsaw-puzzle.fun</h1>
      <p className="text-xl text-muted-foreground leading-relaxed mb-14">
        A free, beautiful, zero-friction jigsaw puzzle game built for everyone — from kids killing time to adults who need a mindful break.
      </p>

      <section className="mb-14">
        <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Our story</h2>
        <div className="space-y-4 text-foreground/85 leading-relaxed">
          <p>
            Jigsaw puzzles are one of the oldest and most satisfying forms of play. They calm the mind, sharpen focus, and deliver a genuine sense of accomplishment when that last piece clicks into place. We wanted to bring that feeling to the browser — without the bloat that comes with most puzzle sites: ads every thirty seconds, compulsory accounts, premium paywalls for basic features.
          </p>
          <p>
            jigsaw-puzzle.fun was built from scratch to be fast, clean, and respectful of your time. Every design decision — from the satisfying snap mechanic to the daily puzzle streak — was made with one question in mind: <em>"Does this make the game more enjoyable?"</em>
          </p>
          <p>
            All your progress, best times, and streaks live only in your browser. We don't collect your data, we don't show ads, and we don't require an account. The game is the product.
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">What we offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Four difficulties, one image</h2>
        <p className="text-foreground/85 leading-relaxed">
          Every puzzle can be played at four difficulty levels — <strong>Easy</strong> (16 pieces), <strong>Medium</strong> (36 pieces), <strong>Hard</strong> (64 pieces), and <strong>Expert</strong> (100 pieces). Your personal best time is saved locally for each combination, so you can always chase a faster solve.
        </p>
      </section>

      <section className="p-8 rounded-2xl bg-secondary/40 border border-border text-center">
        <p className="text-foreground/85 mb-6 leading-relaxed">
          Ready to play? Pick a category and dive in — or try today's Daily Puzzle and start your streak.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Browse Puzzles
          </Link>
          <Link
            href="/Daily-Jigsaw-Puzzle"
            className="bg-background border border-border text-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
          >
            Today's Daily Puzzle
          </Link>
        </div>
      </section>
    </div>
  );
}
