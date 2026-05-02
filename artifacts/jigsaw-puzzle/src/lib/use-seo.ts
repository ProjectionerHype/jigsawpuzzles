import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const SITE = "jigsaw-puzzle.fun";
const BASE_URL = "https://jigsaw-puzzle.fun";
const DEFAULT_IMAGE = `${BASE_URL}/opengraph.jpg`;

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (el) {
    el.setAttribute(attr, value);
  }
}

function setLink(selector: string, value: string) {
  let el = document.querySelector<HTMLLinkElement>(selector);
  if (el) el.setAttribute("href", value);
}

export function useSeo({ title, description, path = "/", image }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title.includes(SITE) ? title : `${title} — ${SITE}`;
    const img = image ?? DEFAULT_IMAGE;
    const url = `${BASE_URL}${path}`;

    document.title = fullTitle;

    setMeta('meta[name="description"]', "content", description);

    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", img);

    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", img);

    setLink('link[rel="canonical"]', url);
  }, [title, description, path, image]);
}
