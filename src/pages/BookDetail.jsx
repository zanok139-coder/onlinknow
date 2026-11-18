import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import ChapterContent from "@/components/reader/ChapterContent";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/seo/Seo";
import { chapterHeading } from "@/lib/chapterTitle";
import { DEFAULT_OG_IMAGE, bookSchema, bookSeo, slugify } from "@/lib/seo";

export default function BookDetail() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
  let active = true;
  (async () => {
    try {
      let loadedBook = null;

      // 1. Try by slug - for old books like /book/as-a-man-thinketh
      const bySlug = await base44.entities.Book.filter({ slug: bookId });
      loadedBook = bySlug.items?.[0] || bySlug?.[0] || null;

      // 2. Try by id - for new books from text, they have no slug
      if (!loadedBook) {
        try {
          const byId = await base44.entities.Book.filter({ id: bookId });
          loadedBook = byId.items?.[0] || byId?.[0] || null;
        } catch (e) {}
      }

      // 3. Last try - list all and match id OR slug
      if (!loadedBook) {
        const all = await base44.entities.Book.list();
        const list = all.items || all || [];
        loadedBook = list.find(b =>
  b.id === bookId ||
  b.slug === bookId ||
  slugify(b.title || "") === bookId
) || null;
      }

      if (!loadedBook) throw new Error("not found");
      if (!active) return;
      setBook(loadedBook);

      // Chapters - try id first
      let page = await base44.entities.Chapter.filter(
        { book_id: loadedBook.id },
        { sort: "number", limit: 100 }
      );
      let chapters = page.items || page || [];

      // If no chapters, try slug as book_id
      if (chapters.length === 0 && loadedBook.slug) {
        page = await base44.entities.Chapter.filter(
          { book_id: loadedBook.slug },
          { sort: "number", limit: 100 }
        );
        chapters = page.items || page || [];
      }

      if (active) setChapters(chapters);
    } catch (e) {
      if (active) setNotFound(true);
    } finally {
      if (active) setLoading(false);
    }
  })();
  return () => { active = false; };
}, [bookId]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-[860px] px-4 py-8">
        <div className="h-6 w-2/3 animate-pulse bg-secondary" />
        <div className="mt-3 h-3 w-1/3 animate-pulse bg-secondary" />
        <div className="mt-8 space-y-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-3 w-full animate-pulse bg-secondary" />
          ))}
        </div>
      </div>
    );
  }

  if (notFound || !book) {
    return (
      <div className="mx-auto w-full max-w-[860px] px-4 py-10">
        <p className="font-reading text-[15px] text-muted-foreground">This book is not available.</p>
        <Link to="/" className="mt-3 inline-block text-[13px] font-medium text-link hover:underline">
          Back to library
        </Link>
      </div>
    );
  }

  const firstChapter = chapters[0];
  const preview = (firstChapter?.paragraphs || []).slice(0, 6);

  return (
    <div className="mx-auto w-full max-w-[860px] px-4 pb-16">
      <Seo
        {...bookSeo(book, (firstChapter?.paragraphs || []).slice(0, 3))}
        image={book.cover_url || DEFAULT_OG_IMAGE}
        type="book"
        jsonLd={bookSchema(book)}
      />
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Library", to: "/#library" },
          { label: book.category || "Books" },
          { label: book.title },
        ]}
      />

      <header className="pt-5">
        <h1 className="font-heading text-[22px] font-extrabold uppercase leading-tight tracking-tight sm:text-[26px]">
          {book.title}
        </h1>
        <p className="mt-1 font-reading text-[14px] text-muted-foreground">
          by {book.author || "Unknown author"}
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          {[
            chapters.length ? `${chapters.length} chapter${chapters.length > 1 ? "s" : ""}` : null,
            book.read_minutes ? `${book.read_minutes} min read` : null,
            book.published_year ? `Published ${book.published_year}` : null,
          ]
            .filter(Boolean)
            .join(" • ")}
        </p>
      </header>

      {book.description ? (
        <p className="mt-4 border-l-2 border-border pl-3 font-reading text-[14px] leading-relaxed text-muted-foreground">
          {book.description}
        </p>
      ) : null}

      
      

      {firstChapter && (
        <section className="mt-6">
          <h2 className="font-heading text-[16px] font-bold">
            {chapterHeading(firstChapter.number, firstChapter.title)}
          </h2>
          <div className="mt-3">
            <ChapterContent paragraphs={preview} />
          </div>

          <Link
            to={`/read/${book.id}/${firstChapter.number || 1}`}
            className="mt-2 inline-block bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background"
          >
            Start reading
          </Link>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Contents
        </h2>
        <ul className="mt-2 divide-y divide-border border-y border-border">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <Link
                to={`/read/${book.id}/${chapter.number || 1}`}
                className="flex items-baseline justify-between gap-4 py-3 font-reading text-[15px] hover:underline"
              >
                <span>
                  <span className="mr-2 text-[12px] font-semibold text-muted-foreground">
                    {chapter.number}
                  </span>
                  {chapter.title}
                </span>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {chapter.word_count ? `${Math.max(1, Math.round(chapter.word_count / 200))} min` : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </div>
  );
}