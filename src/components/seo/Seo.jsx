import React, { useEffect } from "react";

const setMeta = (attr, key, content) => {
  if (content === undefined || content === null || content === "") return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href) => {
  if (!href) return;
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

/**
 * Per-page SEO head: title, description, keywords, canonical, Open Graph and
 * an optional JSON-LD block (Book / WebSite / CollectionPage schema).
 */
export default function Seo({
  title,
  description,
  keywords,
  canonical,
  image,
  type = "website",
  jsonLd = null,
}) {
  const schema = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    if (title) document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:site_name", "onlinknow.co.za");
    setMeta("property", "og:image", image);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
    setCanonical(canonical);
  }, [title, description, keywords, canonical, image, type]);

  useEffect(() => {
    if (!schema) return undefined;
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.setAttribute("data-seo", "page");
    tag.textContent = schema;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, [schema]);

  return null;
}