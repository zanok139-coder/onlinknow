import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Trash2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import PdfUploader from "@/components/admin/PdfUploader";
import PasteBookForm from "@/components/admin/PasteBookForm";
import { bookPath } from "@/lib/seo";

export default function AdminBooks() {
  const { user, isLoadingAuth, navigateToLogin } = useAuth();
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);

  useEffect(() => {
    if (!user) return;
    let active = true;
    base44.entities.Book.filter({}, { sort: "-created_date", limit: 50 })
      .then((page) => {
        if (active) setBooks(page.items || []);
      })
      .finally(() => {
        if (active) setLoadingBooks(false);
      });
    return () => {
      active = false;
    };
  }, [user]);

  const handleCreated = (book) => setBooks((prev) => [book, ...prev]);

  const handleDelete = async (book) => {
    await base44.entities.Chapter.deleteMany({ book_id: book.id });
    await base44.entities.Book.delete(book.id);
    setBooks((prev) => prev.filter((item) => item.id !== book.id));
  };

  if (isLoadingAuth) {
    return (
      <div className="mx-auto w-full max-w-[750px] px-4 py-10 text-[13px] text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-[750px] px-4 py-10">
        <h1 className="font-heading text-[18px] font-bold">Admin uploader</h1>
        <p className="mt-2 font-reading text-[14px] text-muted-foreground">
          Sign in with your admin account to upload books.
        </p>
        <button
          type="button"
          onClick={() => navigateToLogin()}
          className="mt-4 bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background"
        >
          Sign in
        </button>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="mx-auto w-full max-w-[750px] px-4 py-10">
        <h1 className="font-heading text-[18px] font-bold">Admin uploader</h1>
        <p className="mt-2 font-reading text-[14px] text-muted-foreground">
          This page is limited to app admins.
        </p>
        <Link to="/" className="mt-3 inline-block text-[13px] font-medium text-link hover:underline">
          Back to library
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[750px] px-4 pb-16">
      <nav className="flex items-center gap-1 border-b border-border py-3">
        <Link
          to="/"
          className="flex items-center gap-1 text-[12px] font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Library
        </Link>
      </nav>

      <h1 className="pt-5 font-heading text-[20px] font-extrabold uppercase tracking-tight">
        Upload a book
      </h1>
      <p className="mt-1 font-reading text-[14px] leading-relaxed text-muted-foreground">
        Upload a PDF (text or scanned) or paste the text. Every book is split into chapters and
        paragraphs, and the reader shows an ad after every 3 paragraphs.
      </p>

      <PdfUploader onCreated={handleCreated} />

      <PasteBookForm onCreated={handleCreated} />

      <section className="mt-8">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Books in library
        </h2>

        {loadingBooks ? (
          <div className="mt-3 space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-10 animate-pulse bg-secondary" />
            ))}
          </div>
        ) : books.length === 0 ? (
          <p className="mt-3 font-reading text-[14px] text-muted-foreground">No books uploaded yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {books.map((book) => (
              <li key={book.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <Link
                    to={bookPath(book)}
                    className="block truncate text-[14px] font-semibold hover:underline"
                  >
                    {book.title}
                  </Link>
                  <span className="text-[11px] text-muted-foreground">
                    {[book.author || "Unknown author", book.total_chapters ? `${book.total_chapters} chapters` : null]
                      .filter(Boolean)
                      .join(" • ")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(book)}
                  aria-label={`Delete ${book.title}`}
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}