import { bookKeywords } from "@/content/bookKeywords";

export const SITE_URL = "https://onlinknow.co.za";
export const SITE_NAME = "onlinknow.co.za";
export const DEFAULT_OG_IMAGE =
  "https://media.base44.com/images/public/6a2ad37fbe803f09dd15b92c/b42cb7d19_generated_image.png";

export const slugify = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

/** Canonical, SEO-friendly path for a book: /book/science-of-getting-rich */
export const bookPath = (book) =>
  `/book/${book?.slug || (book?.title ? slugify(book.title) : book?.id)}`;

export const bookUrl = (book) => `${SITE_URL}${bookPath(book)}`;

export const bookSeo = (book, chapterParagraphs = []) => {
  const title = `${book.title} by ${book.author || "Unknown author"} - Read Free Online - onlinknow.co.za`;
  const opening = chapterParagraphs.join(" ").split(/\s+/).filter(Boolean).slice(0, 20).join(" ");
  const description = `Read ${book.title} by ${book.author || "Unknown author"} free online. ${
    opening ? `${opening}.` : book.description || ""
  } Full book, public domain, free forever.`.replace(/\s+/g, " ");

  return {
    title,
    description,
    keywords: [
      `${book.title} free`,
      `${book.author || "public domain"} free book`,
      `read ${book.title} online free`,
      "free public domain books",
      "read books free online no download",
      ...bookKeywords(book.slug),
    ].join(", "),
    canonical: bookUrl(book),
  };
};

export const bookSchema = (book) => ({
  "@context": "https://schema.org",
  "@type": "Book",
  name: book.title,
  author: { "@type": "Person", name: book.author || "Unknown author" },
  bookFormat: "https://schema.org/EBook",
  isAccessibleForFree: true,
  isFamilyFriendly: true,
  inLanguage: "en",
  publisher: { "@type": "Organization", name: SITE_NAME },
  datePublished: book.published_year || undefined,
  numberOfPages: undefined,
  url: bookUrl(book),
  image: book.cover_url || DEFAULT_OG_IMAGE,
  description: book.description || undefined,
  genre: book.category || undefined,
});