import { useEffect } from "react";
import { useSeo } from "@/lib/use-seo";

export default function PrivacyPolicy() {
  useSeo({
    title: "Privacy Policy",
    description: "Read the jigsaw-puzzle.fun privacy policy. We store no personal data — all progress is kept locally in your browser.",
    path: "/privacy-policy",
  });
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-3xl">
      <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: May 2, 2025</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/90 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Overview</h2>
          <p>
            jigsaw-puzzle.fun ("we", "our", "the site") is a free, browser-based jigsaw puzzle game. We are committed to protecting your privacy. This policy explains what information we collect, how we use it, and your choices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
          <h3 className="text-base font-semibold text-foreground mb-1">Data stored only in your browser</h3>
          <p className="mb-3">
            All puzzle progress, daily streaks, best times, and completion history are stored exclusively in your browser's <code className="text-xs bg-muted px-1 py-0.5 rounded">localStorage</code>. This data never leaves your device and is never sent to our servers.
          </p>
          <h3 className="text-base font-semibold text-foreground mb-1">Server logs</h3>
          <p>
            Like any web server, our hosting provider may automatically record standard access log information such as IP addresses, browser type, referring URLs, and pages visited. These logs are used only for security and operational monitoring and are not shared with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Cookies</h2>
          <p>
            We do not use tracking cookies, advertising cookies, or analytics cookies. The site may use a single session cookie that is strictly necessary for the service to function. We do not use any third-party advertising networks.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Third-Party Services</h2>
          <p className="mb-3">
            Puzzle images are served from <strong>Unsplash</strong> and <strong>Picsum Photos</strong>. When your browser loads an image, your IP address is visible to those services. Please review their respective privacy policies:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>
              <a href="https://unsplash.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Unsplash Privacy Policy
              </a>
            </li>
            <li>
              <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Picsum Photos
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Children's Privacy</h2>
          <p>
            jigsaw-puzzle.fun is suitable for all ages and does not knowingly collect personal data from children under 13. Because we collect no personal information at all, no special handling is required.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Data Retention & Deletion</h2>
          <p>
            Because all game data is stored locally in your browser, you can delete it at any time by clearing your browser's site data or localStorage. We hold no data on our servers that is linked to you personally.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. The "Last updated" date at the top of this page will always reflect the most recent revision. Continued use of the site after changes constitutes acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Contact</h2>
          <p>
            If you have any questions about this privacy policy, please visit our <a href="/contact" className="text-primary hover:underline">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
