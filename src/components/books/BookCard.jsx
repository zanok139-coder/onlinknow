import React from "react";
import { Link } from "react-router-dom";
import { bookPath } from "@/lib/seo";

export default function BookCard({ book }) {
  return (
    <Link
      to={bookPath(book)}
      className="group flex gap-3 border-b border-border pb-4 transition-colors"
    >
      <div className="h-[92px] w-[64px] shrink-0 overflow-hidden border border-border bg-secondary">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={book.title}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-1 text-center">
            <span className="font-reading text-[11px] font-semibold text-muted-foreground">
              {book.title}
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-[15px] font-bold uppercase leading-snug text-foreground group-hover:underline">
          {book.title}
        </h3>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          by {book.author || "Unknown author"}
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
          {[book.category, book.published_year, book.read_minutes ? `${book.read_minutes} min read` : null]
            .filter(Boolean)
            .join(" • ")}
        </p>
      </div>
    </Link>
  );
}