import { useEffect } from "react";

/**
 * NOTE: The production hostname for this site is not committed to the repo.
 * Update SITE_URL when the studio's real domain is known so canonical URLs,
 * absolute OG/Twitter image URLs, and sitemap.xml entries all point to the
 * live origin. Keep all three in sync (this file + public/sitemap.xml).
 */
export const SITE_URL = "https://architect-portfolio-website.app";
export const SITE_NAME = "ARCH STUDIO";
export const SITE_DESCRIPTION =
  "Award-winning architectural firm specializing in minimal design. Creating extraordinary spaces through thoughtful architecture, residential, commercial and renovation projects.";
export const SITE_OG_IMAGE = `${SITE_URL}/social-preview.svg`;

export interface SEOProps {
  /** Page-specific title fragment. Rendered as `${title} | ${SITE_NAME}` unless `titleOverride` is true. */
  title?: string;
  /** If true, sets the title verbatim without the site-name suffix. */
  titleOverride?: boolean;
  description?: string;
  /** Path portion of the canonical URL, e.g. "/work" or "/blog/post-id". */
  path?: string;
  /** Absolute or root-relative image URL. Resolved to absolute against SITE_URL when given a relative path. */
  image?: string;
  ogType?: "website" | "article" | "profile";
  /** Set to true on auth-walled, search, or otherwise low-value routes. */
  noindex?: boolean;
  /** Optional JSON-LD object that will be rendered as <script type="application/ld+json">. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function removeMeta(attr: "name" | "property", key: string) {
  document.head.querySelectorAll(`meta[${attr}="${key}"]`).forEach((el) => el.remove());
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function resolveImage(image?: string): string {
  if (!image) return SITE_OG_IMAGE;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

/**
 * Per-route SEO. Mount once near the top of each route component.
 * Works in this Vite SPA by mutating document.head on mount.
 *
 * Static crawlers without JS will see the defaults in index.html;
 * Googlebot and other JS-rendering crawlers will see the per-route values
 * applied here.
 */
export function SEO({
  title,
  titleOverride = false,
  description = SITE_DESCRIPTION,
  path = "/",
  image,
  ogType = "website",
  noindex = false,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title
      ? titleOverride
        ? title
        : `${title} | ${SITE_NAME}`
      : `${SITE_NAME} - Minimal Architecture & Design`;
    const canonical = `${SITE_URL}${path}`;
    const resolvedImage = resolveImage(image);

    const previousTitle = document.title;
    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertLink("canonical", canonical);

    if (noindex) {
      upsertMeta("name", "robots", "noindex,nofollow");
    } else {
      upsertMeta("name", "robots", "index,follow");
    }

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", resolvedImage);
    upsertMeta("property", "og:site_name", SITE_NAME);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", resolvedImage);

    let scriptEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.setAttribute("data-route-jsonld", "true");
      scriptEl.text = JSON.stringify(jsonLd);
      document.head.appendChild(scriptEl);
    }

    return () => {
      document.title = previousTitle;
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
      // Leave canonical/og/twitter/description set; the next route's SEO call
      // will overwrite them. Removing them here causes a brief invalid state.
      if (noindex) {
        // Reset robots so routes that don't explicitly opt-in to noindex
        // aren't accidentally marked noindex after navigating away.
        removeMeta("name", "robots");
      }
    };
  }, [title, titleOverride, description, path, image, ogType, noindex, jsonLd]);

  return null;
}

/** Helper for building BlogPosting JSON-LD on the blog post route. */
export function buildBlogPostJsonLd(args: {
  id: string;
  title: string;
  description: string;
  image?: string;
  author: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${args.id}`,
    headline: args.title,
    description: args.description,
    image: resolveImage(args.image),
    author: { "@type": "Person", name: args.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: SITE_OG_IMAGE },
    },
    datePublished: args.datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${args.id}` },
  } satisfies Record<string, unknown>;
}
