import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Bookmark } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ChapterContent from "@/components/reader/ChapterContent";
import Footer from "@/components/layout/Footer";
import { chapterHeading, chapterName } from "@/lib/chapterTitle";
import { bookPath } from "@/lib/seo";

export default function Reader() {
  const { bookId, chapterNumber } = useParams();
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [loadedBook, page] = await Promise.all([
          base44.entities.Book.get(bookId),
          base44.entities.Chapter.filter({ book_id: bookId }, { sort: "number", limit: 200 }),
        ]);
        if (!active) return;
        setBook(loadedBook);
        setChapters(page.items || []);
      } catch {
        if (active) setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [bookId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [bookId, chapterNumber]);

  useEffect(() => {
    try {
      setSaved(localStorage.getItem(`onlink_bookmark_${bookId}`) === "1");
    } catch {
      setSaved(false);
    }
  }, [bookId]);

  const toggleBookmark = () => {
    const next = !saved;
    setSaved(next);
    try {
      if (next) localStorage.setItem(`onlink_bookmark_${bookId}`, "1");
      else localStorage.removeItem(`onlink_bookmark_${bookId}`);
    } catch {
      /* storage unavailable */
    }
  };

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-[750px] px-4 py-8">
        <div className="h-5 w-1/2 animate-pulse bg-secondary" />
        <div className="mt-6 space-y-3">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="h-3 w-full animate-pulse bg-secondary" />
          ))}
        </div>
      </div>
    );
  }

  if (notFound || !book) {
    return (
      <div className="mx-auto w-full max-w-[750px] px-4 py-10">
        <p className="font-reading text-[15px] text-muted-foreground">This book is not available.</p>
        <Link to="/" className="mt-3 inline-block text-[13px] font-medium text-link hover:underline">
          Back to library
        </Link>
      </div>
    );
  }

  if (chapters.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[750px] px-4 py-10">
        <p className="font-reading text-[15px] text-muted-foreground">This book has no chapters yet.</p>
        <Link to="/" className="mt-3 inline-block text-[13px] font-medium text-link hover:underline">
          Back to library
        </Link>
      </div>
    );
  }

  const activeIndex = Math.max(
    0,
    chapters.findIndex((chapter) => String(chapter.number) === String(chapterNumber))
  );
  const chapter = chapters[activeIndex];
  const nextChapter = chapters[activeIndex + 1] || null;

  return (
    <div className="mx-auto w-full max-w-[750px] px-4 pb-20">
      <header className="flex items-center justify-between gap-2 border-b border-border py-3">
        <Link
          to={bookPath(book)}
          className="flex items-center gap-1 text-[12px] font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-center text-[13px] font-semibold">
          Wisdom Vault <span className="font-normal text-muted-foreground">— onlinknow.co.za</span>
        </h1>
        <button
          type="button"
          onClick={toggleBookmark}
          aria-label={saved ? "Remove bookmark" : "Bookmark this book"}
          className="text-muted-foreground hover:text-foreground"
        >
          <Bookmark
            className={saved ? "h-[18px] w-[18px] fill-foreground text-foreground" : "h-[18px] w-[18px]"}
          />
        </button>
      </header>

      <div className="pt-4">
        <h2 className="font-heading text-[21px] font-extrabold uppercase leading-tight tracking-tight">
          {book.title}
        </h2>
        <p className="mt-1 font-reading text-[14px] text-muted-foreground">
          by {book.author || "Unknown author"}
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          {[
            `Chapter ${chapter.number} of ${chapters.length}`,
            book.read_minutes ? `${book.read_minutes} min read` : null,
            book.published_year ? `Published ${book.published_year}` : null,
          ]
            .filter(Boolean)
            .join(" • ")}
        </p>

        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-2">
          {chapters.map((item) => {
            const isActive = item.id === chapter.id;
            return (
              <Link
                key={item.id}
                to={`/read/${book.id}/${item.number}`}
                className={`shrink-0 border px-2.5 py-1 text-[11px] font-semibold ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                Ch {item.number}
              </Link>
            );
          })}
        </div>

        <h3 className="mb-4 mt-4 font-heading text-[17px] font-bold leading-snug">
          {chapterHeading(chapter.number, chapter.title)}
        </h3>

        <ChapterContent paragraphs={chapter.paragraphs || []} />
      </div>

      <footer className="mt-8 border-t border-border pt-5">
        {nextChapter ? (
          <Link
            to={`/read/${book.id}/${nextChapter.number}`}
            className="block w-full border border-border px-4 py-3 text-center font-heading text-[14px] font-semibold text-link hover:bg-secondary"
          >
            Continue to Chapter {nextChapter.number} - {chapterName(nextChapter.title)} →
          </Link>
        ) : (
          <Link
            to="/"
            className="block w-full border border-border px-4 py-3 text-center font-heading text-[14px] font-semibold text-link hover:bg-secondary"
          >
            Finished - Back to Library
          </Link>
        )}
      </footer>

      <Footer />
    </div>
  );
}