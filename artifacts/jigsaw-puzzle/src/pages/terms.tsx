import { useEffect } from "react";
import { useSeo } from "@/lib/use-seo";

export default function Terms() {
  useSeo({
    title: "Terms of Service",
    description: "jigsaw-puzzle.fun terms of service. Free to use, no accounts required, no ads.",
    path: "/terms",
  });
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-3xl">
      <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: May 2, 2025</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/90 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using jigsaw-puzzle.fun ("the site", "the service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Service</h2>
          <p>
            jigsaw-puzzle.fun provides a free, browser-based online jigsaw puzzle game. The service is provided "as is" without any warranty. We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Acceptable Use</h2>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Use the service for any unlawful purpose or in violation of these terms.</li>
            <li>Attempt to disrupt, overload, or impair the service or its servers.</li>
            <li>Scrape, crawl, or systematically download content in a manner that places unreasonable load on the service.</li>
            <li>Reverse-engineer or attempt to extract source code for commercial purposes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Intellectual Property</h2>
          <p className="mb-3">
            The jigsaw-puzzle.fun name, logo, and original code are the property of their respective owners. Puzzle images are sourced from Unsplash and Picsum Photos and are subject to their respective licenses:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>
              Unsplash images are licensed under the{" "}
              <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Unsplash License
              </a>
              .
            </li>
            <li>
              Picsum Photos images are provided for free use under their respective original licenses.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Disclaimer of Warranties</h2>
          <p>
            The service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the service will be uninterrupted, error-free, or free of viruses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, jigsaw-puzzle.fun and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Links to Third-Party Sites</h2>
          <p>
            The site may contain links to external websites. We are not responsible for the content or privacy practices of those sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Changes to These Terms</h2>
          <p>
            We reserve the right to update these terms at any time. The "Last updated" date at the top reflects the most recent revision. Continued use of the site after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">9. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with applicable law, without regard to conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">10. Contact</h2>
          <p>
            Questions about these terms? Visit our <a href="/contact" className="text-primary hover:underline">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
