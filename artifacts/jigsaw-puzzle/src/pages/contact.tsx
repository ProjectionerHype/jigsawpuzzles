import { useEffect } from "react";
import { Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact — jigsaw-puzzle.fun";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-2xl">
      <h1 className="text-4xl font-serif font-bold text-foreground mb-3">Contact Us</h1>
      <p className="text-muted-foreground mb-12 text-lg leading-relaxed">
        Have a question, found a bug, or want to suggest a new puzzle category? We'd love to hear from you.
      </p>

      <div className="grid gap-6">
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
          <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
            <Mail size={22} />
          </div>
          <div>
            <h2 className="font-semibold text-foreground mb-1">Email</h2>
            <p className="text-sm text-muted-foreground mb-2">
              For general inquiries, bug reports, or partnership opportunities.
            </p>
            <a
              href="mailto:hello@jigsaw-puzzle.fun"
              className="text-primary text-sm font-medium hover:underline"
            >
              hello@jigsaw-puzzle.fun
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
          <div className="p-3 rounded-xl bg-accent/10 text-accent shrink-0">
            <MessageSquare size={22} />
          </div>
          <div>
            <h2 className="font-semibold text-foreground mb-1">Feedback & Feature Requests</h2>
            <p className="text-sm text-muted-foreground">
              Got an idea to make jigsaw-puzzle.fun better? New categories, difficulty settings, accessibility improvements — we're all ears. Drop us an email and we'll read every message.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-secondary/40 border border-border text-center">
        <p className="text-sm text-muted-foreground">
          jigsaw-puzzle.fun is a passion project. We aim to respond to all messages within a few business days.
        </p>
      </div>
    </div>
  );
}
