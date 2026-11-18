import React, { useState } from "react";
import { splitIntoChapters } from "@/lib/textParsing";
import { saveBook } from "@/lib/saveBook";

export default function PasteBookForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Add a book title first.");
      return;
    }
    if (text.trim().length < 40) {
      setError("Paste the book text first.");
      return;
    }

    setBusy(true);
    try {
      const chapters = splitIntoChapters(text);
      const paragraphCount = chapters.reduce(
        (total, chapter) => total + chapter.paragraphs.length,
        0
      );

      const book = await saveBook({
        title: title.trim(),
        author: author.trim(),
        category: category.trim(),
        chapters,
      });

      onCreated(book);
      setText("");
      setTitle("");
      setAuthor("");
      setCategory("");
      setSuccess(
        `Book created with ${paragraphCount} paragraphs in ${chapters.length} chapter${
          chapters.length > 1 ? "s" : ""
        }.`
      );
    } catch (err) {
      setError(err?.message || "Could not create that book.");
    } finally {
      setBusy(false);
    }
  };

  const inputClass =
    "mt-1 w-full border border-border bg-background px-3 py-2 text-[13px] outline-none focus:border-foreground";

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          ---- OR ----
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <label className="mt-4 block text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        OR Paste Book Text Directly (If PDF fails)
      </label>

      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <input
          className={inputClass}
          placeholder="Book title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          className={inputClass}
          placeholder="Author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <input
          className={inputClass}
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
      </div>

      <textarea
        className={`${inputClass} font-reading`}
        style={{ height: "300px" }}
        placeholder="Paste the full book text here... You can copy from PDF and paste here. Then click Create Book From Text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />

      <button
        type="submit"
        disabled={busy}
        className="mt-2 w-full bg-foreground px-4 py-2.5 text-[13px] font-semibold text-background disabled:opacity-60"
      >
        {busy ? "Creating book…" : "Create Book From Pasted Text"}
      </button>

      {error ? <p className="mt-2 text-[13px] text-destructive">{error}</p> : null}
      {success ? <p className="mt-2 text-[13px] font-medium">{success}</p> : null}
    </form>
  );
}