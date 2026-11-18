import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

/**
 * Visual breadcrumbs plus BreadcrumbList structured data.
 * items: [{ label, to? }] — the last item is the current page.
 */
export default function Breadcrumbs({ items = [] }) {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.to ? `${SITE_URL}${item.to === "/" ? "/" : item.to}` : `${SITE_URL}${window.location.pathname}`,
    })),
  });

  useEffect(() => {
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.setAttribute("data-seo", "breadcrumbs");
    tag.textContent = schema;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, [schema]);

  return (
    <nav aria-label="Breadcrumb" className="border-b border-border py-3">
      <ol className="flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {item.to && !last ? (
                <Link to={item.to} className="hover:text-foreground hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "text-foreground" : ""}>{item.label}</span>
              )}
              {!last && <ChevronRight className="h-3 w-3 opacity-50" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}