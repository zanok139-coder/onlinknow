import { base44 } from "@/api/base44Client";
import { countWords, readMinutes } from "@/lib/textParsing";
import { slugify } from "@/lib/seo";

/** Creates a Book plus all its Chapter records from parsed chapters. */
export async function saveBook({ title, author, category, publishedYear, chapters, sourceFileUrl }) {
  const book = await base44.entities.Book.create({
  title,
  slug: slugify(title),
  author: author || "",
    category: category || "",
    published_year: publishedYear || "",
    read_minutes: readMinutes(chapters),
    total_chapters: chapters.length,
    status: "published",
    source_file_url: sourceFileUrl || "",
  });

  await base44.entities.Chapter.bulkCreate(
    chapters.map((chapter, index) => ({
      book_id: book.id,
      number: index + 1,
      title: chapter.title || `Chapter ${index + 1}`,
      paragraphs: chapter.paragraphs,
      word_count: chapter.paragraphs.reduce((total, paragraph) => total + countWords(paragraph), 0),
    }))
  );

  return book;
}